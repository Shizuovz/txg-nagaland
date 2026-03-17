# Firebase Cloud Functions Email Setup Guide

This guide explains how to set up automatic email notifications using Firebase Cloud Functions when admins approve or reject registrations.

## Overview

Instead of using EmailJS (third-party service), we'll use Firebase Cloud Functions with Nodemailer to send emails directly from your Firebase project. This is more secure, professional, and integrates seamlessly with your existing Firebase setup.

## Prerequisites

1. Firebase project already set up
2. Node.js 18+ installed on your machine
3. Firebase CLI installed (`npm install -g firebase-tools`)
4. Gmail account or other email service for sending emails

## Setup Instructions

### 1. Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### 2. Initialize Firebase Functions

```bash
cd "c:\projects\NGE2026(NESS)"
firebase login
firebase init functions
```

When prompted:
- Choose "Use an existing project"
- Select your Firebase project: `nge2026-ness-event`
- Choose TypeScript as the language
- Choose to install dependencies with npm
- Choose to overwrite existing files if prompted

### 3. Install Dependencies

```bash
cd functions
npm install firebase-admin firebase-functions nodemailer
npm install --save-dev @types/nodemailer typescript
```

### 4. Set Up Email Service

#### Option A: Gmail (Recommended for development)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings → Security
   - Enable 2-factor authentication
   - Go to App passwords
   - Generate a new app password for "Mail"
   - Copy the password (it's a 16-character string)

#### Option B: Other Email Services

You can use any email service supported by Nodemailer:
- Outlook/Hotmail
- SendGrid
- Mailgun
- AWS SES
- Custom SMTP

### 5. Configure Environment Variables

Create a file `functions/.env`:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_SERVICE=gmail
```

### 6. Deploy the Cloud Function

```bash
cd functions
npm run build
firebase deploy --only functions
```

### 7. Update Firebase Security Rules

Make sure your Firebase security rules allow authenticated users to call the function:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

## How It Works

### Frontend (Admin Dashboard)
1. When admin clicks "Approve" or "Reject"
2. System calls Firebase Cloud Function via HTTPS callable function
3. Passes registration details and email information

### Backend (Cloud Function)
1. Receives the request
2. Verifies the user is authenticated (admin)
3. Uses Nodemailer to send email via your email service
4. Returns success/failure response

### Email Templates
The function generates professional HTML email templates with:
- Event branding
- Registration details
- Approval/rejection status
- Professional styling

## Testing the Setup

### 1. Test Locally with Firebase Emulator

```bash
cd functions
npm run build
firebase emulators:start --only functions
```

### 2. Test from Admin Dashboard

1. Open your admin dashboard
2. Approve or reject any registration
3. Check browser console for logs
4. Check your email inbox

### 3. Monitor Function Logs

```bash
firebase functions:log
```

## Configuration Options

### Email Service Settings

In `functions/src/index.ts`, you can customize:

```typescript
const transporter = nodemailer.createTransporter({
  service: 'gmail', // Change to 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Additional options
  secure: true,
  port: 465,
});
```

### Custom SMTP Configuration

```typescript
const transporter = nodemailer.createTransporter({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Security Considerations

1. **Admin Verification**: The function checks if the caller is authenticated
2. **Environment Variables**: Email credentials are stored securely in environment variables
3. **Rate Limiting**: Consider implementing rate limiting for production
4. **Email Validation**: Validate email addresses before sending

## Production Considerations

### 1. Email Service Limits
- Gmail: ~500 emails/day
- SendGrid: 100 emails/day (free tier)
- Consider dedicated email service for high volume

### 2. Error Handling
- Monitor function logs regularly
- Set up error alerts in Firebase console
- Implement retry logic for failed emails

### 3. Performance
- Cold starts may cause delays
- Consider keeping functions warm for frequent use
- Monitor function execution time

## Troubleshooting

### Common Issues

1. **"Invalid login" error**
   - Check email/password in environment variables
   - Ensure you're using app password for Gmail
   - Verify 2-factor authentication is enabled

2. **"Function not found" error**
   - Ensure function is deployed: `firebase deploy --only functions`
   - Check function name matches exactly

3. **"Permission denied" error**
   - Ensure user is authenticated in Firebase
   - Check Firebase security rules

4. **Email not sending**
   - Check function logs: `firebase functions:log`
   - Verify email service configuration
   - Check spam folder

### Debug Mode

Enable detailed logging:
```typescript
logger.info('Sending email to:', toEmail);
logger.debug('Email content:', emailContent);
```

## Alternative: Use Email Service Providers

For production, consider using dedicated email services:

### SendGrid Setup
```bash
npm install @sendgrid/mail
```

### Mailgun Setup
```bash
npm install mailgun-js
```

These provide better deliverability, analytics, and higher sending limits.

## Migration from EmailJS

If you were previously using EmailJS:

1. Remove EmailJS dependencies
2. Update imports in AdminDashboard.tsx
3. Deploy Firebase Functions
4. Update environment variables
5. Test the new system

## Support

- Firebase Functions documentation: https://firebase.google.com/docs/functions
- Nodemailer documentation: https://nodemailer.com/
- Firebase support: https://firebase.google.com/support
