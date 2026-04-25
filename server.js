const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://team.theshriks.space',
  'https://theshriks.space'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname));

// Serve the HTML file at /hemanshu route
app.get('/hemanshu', (req, res) => {
  res.sendFile(path.join(__dirname, 'team.html'));
});

// Also serve at root for backward compatibility
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'team.html'));
});

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email notification
async function sendSignatureNotification(signerName, signerRole) {
  try {
    // Email to founders
    const mailToFounders = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `Agreement Signed - ${signerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C8A96E;">The Shriks - Agreement Signature Notification</h2>
          <p><strong>${signerName}</strong> has signed the agreement.</p>
          <p><strong>Role:</strong> ${signerRole}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <hr style="border: 1px solid #C8A96E;">
          <p style="color: #666; font-size: 12px;">This is an automated notification from The Shriks Agreement System.</p>
        </div>
      `
    };

    await transporter.sendMail(mailToFounders);
    console.log(`📧 Notification sent to ${process.env.NOTIFICATION_EMAIL}`);

    // If Hemanshu signed, send welcome email to him
    if (signerName === 'Sutariya Hemanshu') {
      const mailToHemanshu = {
        from: process.env.EMAIL_USER,
        to: process.env.HEMANSHU_EMAIL,
        subject: 'Welcome to The Shriks',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 40px;">
              <div style="width: 100px; height: 3px; background: #C8A96E; margin: 0 auto 30px;"></div>
              <h1 style="font-size: 36px; color: #000000; margin: 0; font-weight: 900;">
                Welcome to The Shriks
              </h1>
              <p style="color: #C8A96E; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 10px;">
                Systems Architecture & AI Automation Venture
              </p>
            </div>
            
            <div style="background: #f5f5f5; padding: 30px; border-left: 3px solid #C8A96E; margin: 30px 0;">
              <p style="color: #000000; font-size: 16px; line-height: 1.8; margin: 0;">
                Dear <strong>Sutariya Hemanshu</strong>,
              </p>
              <p style="color: #333333; font-size: 15px; line-height: 1.8; margin-top: 20px;">
                Your agreement has been successfully signed and submitted. You are now officially part of The Shriks team as a <strong style="color: #C8A96E;">Brand, Growth & Business Development Associate</strong>.
              </p>
              <p style="color: #333333; font-size: 15px; line-height: 1.8; margin-top: 20px;">
                We're excited to have you on board and look forward to building something exceptional together.
              </p>
            </div>

            <div style="text-align: center; margin-top: 40px;">
              <p style="color: #666666; font-size: 12px;">
                Signed on: ${new Date().toLocaleString()}
              </p>
              <div style="width: 100px; height: 3px; background: #C8A96E; margin: 30px auto 0;"></div>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailToHemanshu);
      console.log(`📧 Welcome email sent to ${process.env.HEMANSHU_EMAIL}`);
    }
  } catch (error) {
    console.error('❌ Email error:', error.message);
  }
}

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://theshriks_db_user:67MlfE0urrK8e4NS@cluster0.e7yybsd.mongodb.net/shriks_agreements?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Signature Schema
const signatureSchema = new mongoose.Schema({
  documentId: { type: String, required: true, default: 'team_agreement_v1' },
  signerName: { type: String, required: true },
  signerRole: { type: String, required: true },
  signatureData: { type: String, required: true },
  signedAt: { type: Date, default: Date.now },
  ipAddress: String
});

const Signature = mongoose.model('Signature', signatureSchema);

// API Endpoints

// Get all signatures for the document
app.get('/api/signatures', async (req, res) => {
  try {
    const signatures = await Signature.find({ documentId: 'team_agreement_v1' }).sort({ signedAt: 1 });
    res.json({ success: true, signatures });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Save a signature
app.post('/api/signatures', async (req, res) => {
  try {
    const { signerName, signerRole, signatureData } = req.body;
    
    if (!signerName || !signerRole || !signatureData) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Check if this person already signed
    const existing = await Signature.findOne({ 
      documentId: 'team_agreement_v1',
      signerName 
    });

    if (existing) {
      return res.status(400).json({ success: false, error: 'This person has already signed' });
    }

    const signature = new Signature({
      documentId: 'team_agreement_v1',
      signerName,
      signerRole,
      signatureData,
      ipAddress: req.ip
    });

    await signature.save();
    console.log(`✅ Signature saved: ${signerName}`);

    // Send email notification
    await sendSignatureNotification(signerName, signerRole);

    // Check if all 3 signatures are complete
    const allSignatures = await Signature.find({ documentId: 'team_agreement_v1' });
    const allSigned = allSignatures.length === 3;

    res.json({ success: true, signature, allSigned });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Submit document (requires all signatures)
app.post('/api/submit', async (req, res) => {
  try {
    const signatures = await Signature.find({ documentId: 'team_agreement_v1' });
    
    if (signatures.length < 3) {
      return res.status(400).json({ 
        success: false, 
        error: 'All three parties must sign before submission' 
      });
    }

    console.log(`✅ Document submitted with ${signatures.length} signatures`);
    res.json({ 
      success: true, 
      message: 'Document submitted successfully',
      signatures: signatures.length,
      submittedAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Clear all signatures (for testing)
app.delete('/api/signatures/clear', async (req, res) => {
  try {
    await Signature.deleteMany({ documentId: 'team_agreement_v1' });
    console.log('🗑️ All signatures cleared');
    res.json({ success: true, message: 'All signatures cleared' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send invitation email
app.post('/api/send-invitation', async (req, res) => {
  try {
    const { recipientEmail, recipientName } = req.body;
    
    if (!recipientEmail || !recipientName) {
      return res.status(400).json({ success: false, error: 'Email and name required' });
    }

    // Read email template
    const fs = require('fs');
    let emailTemplate = fs.readFileSync(path.join(__dirname, 'email.html'), 'utf8');
    
    // Replace placeholders
    const domain = process.env.DOMAIN || `http://localhost:${PORT}`;
    const agreementUrl = `${domain}/hemanshu`;
    emailTemplate = emailTemplate.replace('{{AGREEMENT_URL}}', agreementUrl);
    emailTemplate = emailTemplate.replace(/Sutariya Hemanshu/g, recipientName);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: 'Invitation to Join The Shriks',
      html: emailTemplate
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Invitation sent to ${recipientEmail}`);
    
    res.json({ success: true, message: `Invitation sent to ${recipientEmail}` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const domain = process.env.DOMAIN || `http://localhost:${PORT}`;
  
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📄 Agreement page: ${domain}/hemanshu`);
  console.log(`🌍 Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}\n`);
});
