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

export const sendAdminNotificationEmail = https.onRequest(async (req, res) => {
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
    console.log('Admin Notification Function called via HTTP request');
    console.log('Request body:', req.body);

    const { toEmail, toName, registrationType, registrationId, teamName, companyName, collegeName } = req.body.data || req.body;

    // Validate required fields
    if (!toEmail || !toName || !registrationType || !registrationId) {
      res.status(400).json({ error: 'Missing required fields for admin notification' });
      return;
    }

    const emailContent = {
      from: `"TXG TechXGames Expo" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: `New User Registration - TXG TechXGames Expo 2026`,
      html: generateAdminNotificationTemplate({
        toName,
        registrationType,
        registrationId,
        teamName,
        companyName,
        collegeName,
        eventName: 'TXG TechXGames Expo 2026'
      })
    };

    console.log('Sending admin notification email to:', toEmail);
    const result = await transporter.sendMail(emailContent);
    logger.info(`Admin notification email sent successfully to ${toEmail}`, result);
    
    res.status(200).json({ success: true, messageId: result.messageId });
  } catch (error) {
    logger.error('Error sending admin notification email:', error);
    console.error('Admin notification email sending error details:', error);
    res.status(500).json({ error: 'Failed to send admin notification email: ' + (error as Error).message });
  }
});

function generateAdminNotificationTemplate(data: {
  toName: string;
  registrationType: string;
  registrationId: string;
  teamName?: string;
  companyName?: string;
  collegeName?: string;
  eventName: string;
}) {
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
            .alert { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
            .btn { display: inline-block; padding: 12px 24px; background-color: #9333ea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🎮 TXG TechXGames Expo 2026</div>
                <h2>New User Registration Alert</h2>
            </div>
            
            <div class="content">
                <p>Dear ${data.toName},</p>
                
                <div class="alert">
                    <strong>🔔 NEW USER REGISTRATION RECEIVED</strong><br>
                    A new user has registered for <strong>${data.eventName}</strong>. Please review and take appropriate action.
                </div>
                
                <div class="details">
                    <h3>Registration Details:</h3>
                    <p><strong>Registration Type:</strong> ${data.registrationType}</p>
                    <p><strong>Registration ID:</strong> ${data.registrationId}</p>
                    ${data.teamName ? `<p><strong>Team Name:</strong> ${data.teamName}</p>` : ''}
                    ${data.companyName ? `<p><strong>Company Name:</strong> ${data.companyName}</p>` : ''}
                    ${data.collegeName ? `<p><strong>College Name:</strong> ${data.collegeName}</p>` : ''}
                </div>
                
                <h3>Required Action:</h3>
                <p>Please review this registration in your admin dashboard and either:</p>
                <ul>
                    <li>Approve the registration</li>
                    <li>Reject the registration</li>
                    <li>Request additional information</li>
                </ul>
                
                <p><strong>Next Steps:</strong></p>
                <ol>
                    <li>Log into your admin dashboard</li>
                    <li>Search for Registration ID: <strong>${data.registrationId}</strong></li>
                    <li>Review the registration details</li>
                    <li>Take appropriate action (approve/reject)</li>
                </ol>
                
                <p>This is an automated notification to ensure timely processing of new registrations.</p>
            </div>
            
            <div class="footer">
                <p>Best regards,<br>
                TXG TechXGames Expo Admin System<br>
                <small>This is an automated message. Please do not reply to this email.</small></p>
            </div>
        </div>
    </body>
    </html>
  `;
}

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
  
  // Generate specific template based on registration type
  switch (data.registrationType) {
    case 'college':
    case 'open_category':
      return generateTeamEmailTemplate(data, isApproved, statusColor, statusIcon);
    case 'sponsor':
      return generateSponsorEmailTemplate(data, isApproved, statusColor, statusIcon);
    case 'cosplayer':
      return generateCosplayerEmailTemplate(data, isApproved, statusColor, statusIcon);
    case 'vendor':
      return generateVendorEmailTemplate(data, isApproved, statusColor, statusIcon);
    case 'exhibitor':
      return generateExhibitorEmailTemplate(data, isApproved, statusColor, statusIcon);
    case 'media':
      return generateMediaEmailTemplate(data, isApproved, statusColor, statusIcon);
    default:
      return generateGenericEmailTemplate(data, isApproved, statusColor, statusIcon);
  }
}

function generateTeamEmailTemplate(data: any, isApproved: boolean, statusColor: string, statusIcon: string) {
  const tournamentType = data.registrationType === 'college' ? 'Inter-College' : 'Open Category';
  
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
            .game-info { background-color: #e8f4fd; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🎮 TXG TechXGames Expo 2026</div>
                <h2>Team Registration Status Update</h2>
            </div>
            
            <div class="content">
                <p>Dear ${data.toName} (Team Captain),</p>
                
                <div class="status">${statusIcon} ${data.status}</div>
                
                <p>${isApproved 
                  ? `🎉 Congratulations! Your team's registration for the <strong>${tournamentType} Tournament</strong> at <strong>${data.eventName}</strong> has been <strong>${data.status}</strong>!`
                  : `We regret to inform you that your team's registration for the <strong>${tournamentType} Tournament</strong> could not be <strong>approved</strong> at this time.`
                }</p>
                
                <div class="details">
                    <h3>Team Registration Details:</h3>
                    <p><strong>Registration Type:</strong> ${data.registrationType}</p>
                    <p><strong>Registration ID:</strong> ${data.registrationId}</p>
                    <p><strong>Team Name:</strong> ${data.teamName}</p>
                    ${data.collegeName ? `<p><strong>College Name:</strong> ${data.collegeName}</p>` : ''}
                </div>
                
                ${isApproved ? `
                <div class="game-info">
                    <h3>🏆 Next Steps for Your Team:</h3>
                    <ul>
                        <li>Check your email for tournament schedule and rules</li>
                        <li>Prepare your team for the competition</li>
                        <li>Arrive at the venue 30 minutes before your scheduled time</li>
                        <li>Bring valid ID proof for all team members</li>
                    </ul>
                </div>
                ` : `
                <div class="game-info">
                    <h3>📝 What You Can Do:</h3>
                    <ul>
                        <li>Review the registration requirements</li>
                        <li>Contact us for clarification on rejection reasons</li>
                        <li>Consider applying for future tournaments</li>
                    </ul>
                </div>
                `}
                
                <p>Good luck with the tournament! 🎮</p>
            </div>
            
            <div class="footer">
                <p>Best regards,<br>
                TXG TechXGames Expo Tournament Committee<br>
                <small>This is an automated message. Please do not reply to this email.</small></p>
            </div>
        </div>
    </body>
    </html>
  `;
}

function generateSponsorEmailTemplate(data: any, isApproved: boolean, statusColor: string, statusIcon: string) {
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
            .sponsor-info { background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🤝 TXG TechXGames Expo 2026</div>
                <h2>Sponsorship Partnership Status Update</h2>
            </div>
            
            <div class="content">
                <p>Dear Sponsor,</p>
                
                <div class="status">${statusIcon} ${data.status}</div>
                
                <p>${isApproved 
                  ? `🌟 Excellent news! Your sponsorship partnership for <strong>${data.eventName}</strong> has been <strong>${data.status}</strong>!`
                  : `Thank you for your interest in sponsoring <strong>${data.eventName}</strong>. We regret to inform you that your sponsorship application could not be <strong>approved</strong> at this time.`
                }</p>
                
                <div class="details">
                    <h3>Sponsorship Details:</h3>
                    <p><strong>Registration Type:</strong> Sponsor</p>
                    <p><strong>Registration ID:</strong> ${data.registrationId}</p>
                    <p><strong>Company Name:</strong> ${data.companyName}</p>
                    <p><strong>Contact Person:</strong> ${data.toName}</p>
                </div>
                
                ${isApproved ? `
                <div class="sponsor-info">
                    <h3>🎯 Partnership Benefits & Next Steps:</h3>
                    <ul>
                        <li>Our sponsorship team will contact you within 24-48 hours</li>
                        <li>Discuss customized partnership benefits and branding opportunities</li>
                        <li>Coordinate payment and promotional materials</li>
                        <li>Arrange venue visit and logistics planning</li>
                    </ul>
                </div>
                ` : `
                <div class="sponsor-info">
                    <h3>💼 Alternative Partnership Opportunities:</h3>
                    <ul>
                        <li>Consider different sponsorship tiers</li>
                        <li>Explore in-kind sponsorship options</li>
                        <li>Connect with our team for customized solutions</li>
                    </ul>
                </div>
                `}
                
                <p>We value your interest in partnering with us for this premier gaming event!</p>
            </div>
            
            <div class="footer">
                <p>Best regards,<br>
                TXG TechXGames Expo Sponsorship Team<br>
                <small>This is an automated message. Please do not reply to this email.</small></p>
            </div>
        </div>
    </body>
    </html>
  `;
}

function generateCosplayerEmailTemplate(data: any, isApproved: boolean, statusColor: string, statusIcon: string) {
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
            .cosplay-info { background-color: #f0e6ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🎭 TXG TechXGames Expo 2026</div>
                <h2>Cosplayer Registration Status Update</h2>
            </div>
            
            <div class="content">
                <p>Dear Cosplayer,</p>
                
                <div class="status">${statusIcon} ${data.status}</div>
                
                <p>${isApproved 
                  ? `🎨 Amazing! Your cosplayer registration for <strong>${data.eventName}</strong> has been <strong>${data.status}</strong>!`
                  : `Thank you for your interest in showcasing your cosplay talent at <strong>${data.eventName}</strong>. We regret to inform you that your registration could not be <strong>approved</strong> at this time.`
                }</p>
                
                <div class="details">
                    <h3>Cosplayer Registration Details:</h3>
                    <p><strong>Registration Type:</strong> Cosplayer</p>
                    <p><strong>Registration ID:</strong> ${data.registrationId}</p>
                    <p><strong>Cosplayer Name:</strong> ${data.toName}</p>
                </div>
                
                ${isApproved ? `
                <div class="cosplay-info">
                    <h3>🌟 Cosplayer Event Information:</h3>
                    <ul>
                        <li>Free entry to the expo venue</li>
                        <li>Dedicated cosplay showcase area</li>
                        <li>Photo opportunities with attendees</li>
                        <li>Chance to win best cosplay awards</li>
                        <li>Social media promotion features</li>
                    </ul>
                </div>
                ` : `
                <div class="cosplay-info">
                    <h3>📝 Cosplay Registration Tips:</h3>
                    <ul>
                        <li>Ensure your costume meets event guidelines</li>
                        <li>Provide clear photos in your application</li>
                        <li>Consider applying for future events</li>
                    </ul>
                </div>
                `}
                
                <p>Get ready to showcase your incredible cosplay talent! ✨</p>
            </div>
            
            <div class="footer">
                <p>Best regards,<br>
                TXG TechXGames Expo Cosplay Team<br>
                <small>This is an automated message. Please do not reply to this email.</small></p>
            </div>
        </div>
    </body>
    </html>
  `;
}

function generateVendorEmailTemplate(data: any, isApproved: boolean, statusColor: string, statusIcon: string) {
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
            .vendor-info { background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🛍️ TXG TechXGames Expo 2026</div>
                <h2>Vendor Stall Registration Status Update</h2>
            </div>
            
            <div class="content">
                <p>Dear Vendor,</p>
                
                <div class="status">${statusIcon} ${data.status}</div>
                
                <p>${isApproved 
                  ? `🏪 Great news! Your vendor stall application for <strong>${data.eventName}</strong> has been <strong>${data.status}</strong>!`
                  : `Thank you for your interest in setting up a vendor stall at <strong>${data.eventName}</strong>. We regret to inform you that your application could not be <strong>approved</strong> at this time.`
                }</p>
                
                <div class="details">
                    <h3>Vendor Registration Details:</h3>
                    <p><strong>Registration Type:</strong> Vendor</p>
                    <p><strong>Registration ID:</strong> ${data.registrationId}</p>
                    <p><strong>Vendor Name:</strong> ${data.toName}</p>
                    ${data.companyName ? `<p><strong>Company Name:</strong> ${data.companyName}</p>` : ''}
                </div>
                
                ${isApproved ? `
                <div class="vendor-info">
                    <h3>🎯 Vendor Stall Benefits:</h3>
                    <ul>
                        <li>Premium stall location in high-traffic area</li>
                        <li>Access to thousands of gaming enthusiasts</li>
                        <li>Inclusion in event marketing materials</li>
                        <li>Basic stall setup (table, chairs, electricity)</li>
                        <li>Opportunity for product demonstrations</li>
                    </ul>
                </div>
                ` : `
                <div class="vendor-info">
                    <h3>📝 Vendor Application Tips:</h3>
                    <ul>
                        <li>Ensure your products align with gaming theme</li>
                        <li>Provide complete business information</li>
                        <li>Consider different stall categories</li>
                    </ul>
                </div>
                `}
                
                <p>We look forward to having you as part of our vendor community! 🛍️</p>
            </div>
            
            <div class="footer">
                <p>Best regards,<br>
                TXG TechXGames Expo Vendor Team<br>
                <small>This is an automated message. Please do not reply to this email.</small></p>
            </div>
        </div>
    </body>
    </html>
  `;
}

function generateExhibitorEmailTemplate(data: any, isApproved: boolean, statusColor: string, statusIcon: string) {
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
            .exhibitor-info { background-color: #e6f3ff; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🏢 TXG TechXGames Expo 2026</div>
                <h2>Exhibitor Booth Registration Status Update</h2>
            </div>
            
            <div class="content">
                <p>Dear Exhibitor,</p>
                
                <div class="status">${statusIcon} ${data.status}</div>
                
                <p>${isApproved 
                  ? `🎯 Excellent! Your exhibitor booth application for <strong>${data.eventName}</strong> has been <strong>${data.status}</strong>!`
                  : `Thank you for your interest in exhibiting at <strong>${data.eventName}</strong>. We regret to inform you that your application could not be <strong>approved</strong> at this time.`
                }</p>
                
                <div class="details">
                    <h3>Exhibitor Registration Details:</h3>
                    <p><strong>Registration Type:</strong> Exhibitor</p>
                    <p><strong>Registration ID:</strong> ${data.registrationId}</p>
                    <p><strong>Exhibitor Name:</strong> ${data.toName}</p>
                    ${data.companyName ? `<p><strong>Company Name:</strong> ${data.companyName}</p>` : ''}
                </div>
                
                ${isApproved ? `
                <div class="exhibitor-info">
                    <h3>🚀 Exhibitor Booth Benefits:</h3>
                    <ul>
                        <li>Premium exhibition space in main hall</li>
                        <li>Professional booth setup with branding opportunities</li>
                        <li>Direct access to targeted gaming audience</li>
                        <li>Inclusion in official event guide</li>
                        <li>Networking opportunities with industry leaders</li>
                        <li>Product launch and demonstration platform</li>
                    </ul>
                </div>
                ` : `
                <div class="exhibitor-info">
                    <h3>📝 Exhibitor Application Tips:</h3>
                    <ul>
                        <li>Ensure your products/services are tech/gaming related</li>
                        <li>Provide detailed company information</li>
                        <li>Consider different booth sizes and locations</li>
                    </ul>
                </div>
                `}
                
                <p>We're excited to showcase your innovation at our tech expo! 🚀</p>
            </div>
            
            <div class="footer">
                <p>Best regards,<br>
                TXG TechXGames Expo Exhibitor Team<br>
                <small>This is an automated message. Please do not reply to this email.</small></p>
            </div>
        </div>
    </body>
    </html>
  `;
}

function generateMediaEmailTemplate(data: any, isApproved: boolean, statusColor: string, statusIcon: string) {
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
            .media-info { background-color: #ffe6e6; padding: 15px; border-radius: 5px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">📰 TXG TechXGames Expo 2026</div>
                <h2>Media Accreditation Status Update</h2>
            </div>
            
            <div class="content">
                <p>Dear Media Representative,</p>
                
                <div class="status">${statusIcon} ${data.status}</div>
                
                <p>${isApproved 
                  ? `📸 Great! Your media accreditation for <strong>${data.eventName}</strong> has been <strong>${data.status}</strong>!`
                  : `Thank you for your interest in covering <strong>${data.eventName}</strong>. We regret to inform you that your media accreditation could not be <strong>approved</strong> at this time.`
                }</p>
                
                <div class="details">
                    <h3>Media Accreditation Details:</h3>
                    <p><strong>Registration Type:</strong> Media</p>
                    <p><strong>Registration ID:</strong> ${data.registrationId}</p>
                    <p><strong>Media Representative:</strong> ${data.toName}</p>
                    ${data.companyName ? `<p><strong>Media Organization:</strong> ${data.companyName}</p>` : ''}
                </div>
                
                ${isApproved ? `
                <div class="media-info">
                    <h3>🎥 Media Access Benefits:</h3>
                    <ul>
                        <li>Full access to all expo areas and events</li>
                        <li>Dedicated media room with work stations</li>
                        <li>Interview opportunities with participants and sponsors</li>
                        <li>Press kit and event materials</li>
                        <li>Priority access to major announcements</li>
                        <li>Media badge and credentials</li>
                    </ul>
                </div>
                ` : `
                <div class="media-info">
                    <h3>📝 Media Accreditation Requirements:</h3>
                    <ul>
                        <li>Valid media credentials and press card</li>
                        <li>Letter of assignment from media organization</li>
                        <li>Recent examples of published work</li>
                        <li>Circulation/viewership verification</li>
                    </ul>
                </div>
                `}
                
                <p>We look forward to your media coverage of our premier gaming event! 📰</p>
            </div>
            
            <div class="footer">
                <p>Best regards,<br>
                TXG TechXGames Expo Media Relations Team<br>
                <small>This is an automated message. Please do not reply to this email.</small></p>
            </div>
        </div>
    </body>
    </html>
  `;
}

function generateGenericEmailTemplate(data: any, isApproved: boolean, statusColor: string, statusIcon: string) {
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
