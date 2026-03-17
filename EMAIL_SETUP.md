# Email Notification Setup Guide

This guide explains how to set up automatic email notifications when admins approve or reject registrations in the TXG TechXGames Expo admin dashboard.

## Overview

The system now sends automatic email notifications to users when their registration status is updated to "approved" or "rejected". This uses EmailJS, a client-side email service that doesn't require a backend server.

## Setup Instructions

### 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service

1. In EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account and authorize EmailJS
5. Note your **Service ID** (it will be something like `service_xxxxx`)

### 3. Create Email Templates

#### Approval Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use the following template:

**Subject:** `Your Registration for {{event_name}} has been {{status}}!`

**HTML Content:**
```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #9333ea; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 28px; font-weight: bold; color: #9333ea; margin-bottom: 10px; }
        .content { line-height: 1.6; color: #333; }
        .details { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
        .status { font-size: 24px; font-weight: bold; color: #28a745; text-align: center; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🎮 TXG TechXGames Expo 2026</div>
            <h2>Registration Status Update</h2>
        </div>
        
        <div class="content">
            <p>Dear {{to_name}},</p>
            
            <div class="status">✅ {{status}}</div>
            
            <p>We're pleased to inform you that your registration for <strong>{{event_name}}</strong> has been <strong>{{status}}</strong>!</p>
            
            <div class="details">
                <h3>Registration Details:</h3>
                <p><strong>Registration Type:</strong> {{registration_type}}</p>
                <p><strong>Registration ID:</strong> {{registration_id}}</p>
                {{#team_name}}<p><strong>Team Name:</strong> {{team_name}}</p>{{/team_name}}
                {{#company_name}}<p><strong>Company Name:</strong> {{company_name}}</p>{{/company_name}}
                {{#college_name}}<p><strong>College Name:</strong> {{college_name}}</p>{{/college_name}}
            </div>
            
            <p>{{additional_info}}</p>
            
            <p>Please keep this email for your records. If you have any questions, don't hesitate to contact us.</p>
        </div>
        
        <div class="footer">
            <p>Best regards,<br>
            TXG TechXGames Expo Team<br>
            <small>This is an automated message. Please do not reply to this email.</small></p>
        </div>
    </div>
</body>
</html>
```

#### Rejection Email Template
1. Create another template for rejections:

**Subject:** `Your Registration for {{event_name}} - Status Update`

**HTML Content:**
```html
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #dc3545; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 28px; font-weight: bold; color: #9333ea; margin-bottom: 10px; }
        .content { line-height: 1.6; color: #333; }
        .details { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
        .status { font-size: 24px; font-weight: bold; color: #dc3545; text-align: center; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🎮 TXG TechXGames Expo 2026</div>
            <h2>Registration Status Update</h2>
        </div>
        
        <div class="content">
            <p>Dear {{to_name}},</p>
            
            <div class="status">❌ {{status}}</div>
            
            <p>We regret to inform you that your registration for <strong>{{event_name}}</strong> could not be <strong>approved</strong> at this time.</p>
            
            <div class="details">
                <h3>Registration Details:</h3>
                <p><strong>Registration Type:</strong> {{registration_type}}</p>
                <p><strong>Registration ID:</strong> {{registration_id}}</p>
                {{#team_name}}<p><strong>Team Name:</strong> {{team_name}}</p>{{/team_name}}
                {{#company_name}}<p><strong>Company Name:</strong> {{company_name}}</p>{{/company_name}}
                {{#college_name}}<p><strong>College Name:</strong> {{college_name}}</p>{{/college_name}}
            </div>
            
            <p>{{additional_info}}</p>
            
            <p>Thank you for your interest in TXG TechXGames Expo. We encourage you to apply for future events.</p>
        </div>
        
        <div class="footer">
            <p>Best regards,<br>
            TXG TechXGames Expo Team<br>
            <small>This is an automated message. Please do not reply to this email.</small></p>
        </div>
    </div>
</body>
</html>
```

### 4. Update Environment Variables

1. Get your EmailJS credentials:
   - **Public Key**: From EmailJS dashboard → Account → General
   - **Service ID**: From Email Services page
   - **Template IDs**: From each template page

2. Update your `.env` file:
```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
VITE_EMAILJS_SERVICE_ID=your_actual_service_id_here
VITE_EMAILJS_TEMPLATE_ID_APPROVAL=your_approval_template_id_here
VITE_EMAILJS_TEMPLATE_ID_REJECTION=your_rejection_template_id_here
```

### 5. Test the Setup

1. Restart your development server
2. Go to the admin dashboard
3. Approve or reject any registration
4. Check if the email is sent successfully
5. Monitor the browser console for any email-related errors

## EmailJS Variables

The system sends these variables to your EmailJS templates:

- `to_email`: Recipient's email address
- `to_name`: Recipient's name
- `registration_type`: Type of registration (Team, Sponsor, etc.)
- `registration_id`: Unique registration ID
- `team_name`: Team name (if applicable)
- `company_name`: Company name (if applicable)
- `college_name`: College name (if applicable)
- `event_name`: Event name (TXG TechXGames Expo 2026)
- `status`: "approved" or "rejected"
- `additional_info`: Additional message based on status
- `reply_to`: Reply-to email address

## Troubleshooting

### Common Issues

1. **Email not sending**: Check your EmailJS credits and API limits
2. **Template not found**: Verify template IDs in environment variables
3. **Service not working**: Ensure your email service is properly connected
4. **Environment variables not loading**: Restart your development server

### Debug Mode

The system logs detailed information to the browser console. Check the console for:
- Email initialization status
- Template parameter values
- Email sending success/failure
- Any error messages

## Security Notes

- EmailJS is secure for client-side use as it doesn't expose your email credentials
- The public key has limited permissions and can only send emails through your templates
- Consider upgrading to EmailJS Pro for higher volume and additional features

## Support

For EmailJS-specific issues:
- Check [EmailJS Documentation](https://www.emailjs.com/docs/)
- Contact EmailJS support through their dashboard

For application-specific issues:
- Check the browser console for error messages
- Verify all environment variables are correctly set
- Ensure registration data contains valid email addresses
