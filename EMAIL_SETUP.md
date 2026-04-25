# Email Setup Guide

## Gmail App Password Setup

To enable email notifications, you need to create a Gmail App Password:

### Steps:

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Enable 2-Step Verification** (if not already enabled)
   - Go to Security → 2-Step Verification
   - Follow the setup process

3. **Create App Password**:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Name it "The Shriks Agreement System"
   - Click "Generate"
   - Copy the 16-character password

4. **Update .env file**:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   NOTIFICATION_EMAIL=laukik@theshriks.space
   ```

5. **Restart the server**:
   ```bash
   npm start
   ```

## What Happens:

✅ When Sutariya Hemanshu signs → Email sent to you  
✅ Email contains: Name, Role, Timestamp  
✅ After Hemanshu signs → Document disappears → "Welcome to The Shriks" message appears

## Test Email:

To test if email is working, sign with any name and check your inbox.
