# Vercel Setup Guide

## ✅ Code Pushed to GitHub
Your code is now at: `https://github.com/lokixshrishi/theshriks1/`

## 🚀 Next Steps to Deploy on Vercel

### 1. Add Environment Variables in Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables (for Production, Preview, and Development):

```
MONGODB_URI
mongodb+srv://theshriks_db_user:67MlfE0urrK8e4NS@cluster0.e7yybsd.mongodb.net/shriks_agreements?retryWrites=true&w=majority&appName=Cluster0

NODE_ENV
production

DOMAIN
https://team.theshriks.space

EMAIL_USER
laukik@theshriks.space

EMAIL_PASS
rnxe fihj bzcw dmjl

NOTIFICATION_EMAIL
laukik@theshriks.space

HEMANSHU_EMAIL
shrusti@theshriks.space
```

### 2. Trigger Deployment

Since your repo is already connected to Vercel, it should automatically deploy when you push. If not:

- Go to Vercel Dashboard
- Click on your project
- Click "Redeploy" button

### 3. Configure Domain

**In Vercel Dashboard → Your Project → Settings → Domains:**

Add: `team.theshriks.space`

Vercel will show you DNS configuration. You need to add a CNAME record in your domain provider:

```
Type: CNAME
Name: team
Value: cname.vercel-dns.com
```

### 4. Test Your Deployment

Once deployed, visit:
- **Agreement Page:** `https://team.theshriks.space/hemanshu`
- **Send Invitation:** `https://team.theshriks.space/send-invitation.html`

### 5. Verify Everything Works

1. ✅ Open the agreement page
2. ✅ Check that signatures can be drawn
3. ✅ Save a signature and verify it appears after page reload
4. ✅ Sign all 3 signatures and verify emails are sent
5. ✅ Test the invitation email system

## 📝 Important Notes

- The app automatically detects if it's running on localhost or production
- API URLs switch automatically based on hostname
- All signatures are stored in MongoDB Atlas
- Emails are sent via Gmail SMTP

## 🔧 Troubleshooting

**If deployment fails:**
- Check Vercel deployment logs
- Verify all environment variables are set correctly
- Make sure `vercel.json` is in the repository

**If you see "Function Timeout":**
- Vercel free tier has 10-second timeout
- Consider upgrading to Pro if needed

**If emails don't send:**
- Verify Gmail app password in environment variables
- Check Vercel function logs for errors

## 🎯 What's Deployed

- ✅ Express.js server with API endpoints
- ✅ MongoDB integration for signature storage
- ✅ Email notifications (Gmail SMTP)
- ✅ Agreement document with signature functionality
- ✅ Invitation email system
- ✅ Admin page to send invitations

---

**Repository:** https://github.com/lokixshrishi/theshriks1/  
**Target URL:** https://team.theshriks.space/hemanshu
