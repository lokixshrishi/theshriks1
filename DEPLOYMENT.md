# Deployment Guide - The Shriks Agreement System

## 🚀 Deployment to Vercel

This application is configured to deploy to Vercel at `team.theshriks.space/hemanshu`.

### Prerequisites
- GitHub repository: `https://github.com/lokixshrishi/theshriks1/`
- Vercel account connected to GitHub
- Domain: `theshriks.space` configured in Vercel

### Environment Variables Required in Vercel

Go to your Vercel project settings → Environment Variables and add:

```
MONGODB_URI=mongodb+srv://theshriks_db_user:67MlfE0urrK8e4NS@cluster0.e7yybsd.mongodb.net/shriks_agreements?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
NODE_ENV=production
DOMAIN=https://team.theshriks.space

EMAIL_USER=laukik@theshriks.space
EMAIL_PASS=rnxe fihj bzcw dmjl
NOTIFICATION_EMAIL=laukik@theshriks.space
HEMANSHU_EMAIL=shrusti@theshriks.space
```

### Deployment Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy agreement system with MongoDB and email integration"
   git branch -M main
   git remote add origin https://github.com/lokixshrishi/theshriks1.git
   git push -u origin main
   ```

2. **Vercel will automatically deploy** when you push to the main branch.

3. **Configure Subdomain in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add domain: `team.theshriks.space`
   - Vercel will provide DNS configuration instructions

4. **Configure DNS (if not already done):**
   - Add a CNAME record in your domain provider:
     - Type: `CNAME`
     - Name: `team`
     - Value: `cname.vercel-dns.com`

### Access URLs

- **Agreement Page:** `https://team.theshriks.space/hemanshu`
- **Send Invitation:** `https://team.theshriks.space/send-invitation.html`
- **API Endpoints:** `https://team.theshriks.space/api/*`

### API Endpoints

- `GET /api/signatures` - Get all signatures
- `POST /api/signatures` - Save a signature
- `POST /api/submit` - Submit completed agreement
- `POST /api/send-invitation` - Send invitation email
- `DELETE /api/signatures/clear` - Clear all signatures (testing only)

### Testing Locally

```bash
npm install
npm start
```

Visit: `http://localhost:3000/hemanshu`

### Important Notes

1. **Email Configuration:** Gmail app password is configured. Ensure 2FA is enabled on the Gmail account.

2. **MongoDB:** Database is hosted on MongoDB Atlas. Connection string is in environment variables.

3. **CORS:** Configured to allow requests from:
   - `http://localhost:3000`
   - `https://team.theshriks.space`
   - `https://theshriks.space`

4. **Signature Flow:**
   - All 3 parties must sign (Laukik Rajput, Shrusti Rajput, Sutariya Hemanshu)
   - When Hemanshu signs, emails are sent to founders and Hemanshu
   - Document disappears after all signatures are complete

5. **Clear Signatures:** Run `node clear-signatures.js` to reset signatures in database

### Troubleshooting

**If deployment fails:**
- Check Vercel logs in the dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

**If emails don't send:**
- Verify Gmail app password is correct (with spaces: `rnxe fihj bzcw dmjl`)
- Check that EMAIL_USER and EMAIL_PASS are set in Vercel environment variables

**If signatures don't save:**
- Check MongoDB connection in Vercel logs
- Verify MONGODB_URI environment variable is set correctly

### File Structure

```
.
├── server.js                 # Express server with API endpoints
├── team.html                 # Agreement document with signature functionality
├── email.html                # Invitation email template
├── send-invitation.html      # Admin page to send invitations
├── package.json              # Dependencies
├── .env                      # Environment variables (local only, not in git)
├── .gitignore                # Git ignore file
├── vercel.json               # Vercel deployment configuration
├── clear-signatures.js       # Script to clear signatures
└── DEPLOYMENT.md             # This file
```

### Security Notes

- `.env` file is in `.gitignore` and should never be committed
- Environment variables must be set in Vercel dashboard
- MongoDB credentials are stored securely in environment variables
- Email credentials use Gmail app password (not main password)

---

**Deployed by:** The Shriks Team  
**Last Updated:** 2026-04-25
