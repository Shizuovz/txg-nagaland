import { https } from 'firebase-functions/v2';
import { logger } from 'firebase-functions/v2';
import { initializeApp } from 'firebase-admin/app';
import nodemailer from 'nodemailer';

// Initialize Firebase Admin
initializeApp();

// Configure email transporter (you'll need to set this up)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your app password (not regular password)
  },
});

export const sendApprovalEmail = https.onRequest(async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    console.log('Function called via HTTP request');
    console.log('Request body:', req.body);

    const { toEmail, toName, registrationType, registrationId, status, teamName, companyName, collegeName } = req.body.data || req.body;

    // Validate required fields
    if (!toEmail || !toName || !registrationType || !registrationId || !status) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const emailContent = {
      from: `"TXG TechXGames Expo" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: `Your Registration for TXG TechXGames Expo 2026 has been ${status}!`,
      html: generateEmailTemplate({
        toName,
        registrationType,
        registrationId,
        status,
        teamName,
        companyName,
        collegeName,
        eventName: 'TXG TechXGames Expo 2026'
      })
    };

    console.log('Sending email to:', toEmail);
    const result = await transporter.sendMail(emailContent);
    logger.info(`Email sent successfully to ${toEmail}`, result);
    
    res.status(200).json({ success: true, messageId: result.messageId });
  } catch (error) {
    logger.error('Error sending email:', error);
    console.error('Email sending error details:', error);
    res.status(500).json({ error: 'Failed to send email: ' + (error as Error).message });
  }
});

function generateEmailTemplate(data: {
  toName: string;
  registrationType: string;
  registrationId: string;
  status: string;
  teamName?: string;
  companyName?: string;
  collegeName?: string;
  eventName: string;
}) {
  const isApproved = data.status === 'approved';
  const statusColor = isApproved ? '#28a745' : '#dc3545';
  const statusIcon = isApproved ? '✅' : '❌';
  
  return `
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
            .status { font-size: 24px; font-weight: bold; color: ${statusColor}; text-align: center; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🎮 TXG TechXGames Expo 2026</div>
                <h2>Registration Status Update</h2>
            </div>
            
            <div class="content">
                <p>Dear ${data.toName},</p>
                
                <div class="status">${statusIcon} ${data.status}</div>
                
                <p>${isApproved 
                  ? `We're pleased to inform you that your registration for <strong>${data.eventName}</strong> has been <strong>${data.status}</strong>!`
                  : `We regret to inform you that your registration for <strong>${data.eventName}</strong> could not be <strong>approved</strong> at this time.`
                }</p>
                
                <div class="details">
                    <h3>Registration Details:</h3>
                    <p><strong>Registration Type:</strong> ${data.registrationType}</p>
                    <p><strong>Registration ID:</strong> ${data.registrationId}</p>
                    ${data.teamName ? `<p><strong>Team Name:</strong> ${data.teamName}</p>` : ''}
                    ${data.companyName ? `<p><strong>Company Name:</strong> ${data.companyName}</p>` : ''}
                    ${data.collegeName ? `<p><strong>College Name:</strong> ${data.collegeName}</p>` : ''}
                </div>
                
                <p>${isApproved 
                  ? 'Your registration has been approved. Please check your email for further details and event information.'
                  : 'Thank you for your interest in TXG TechXGames Expo. We encourage you to apply for future events.'
                }</p>
                
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
  `;
}
