import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '@/lib/firebase';
import emailjs from '@emailjs/browser';

// Use the existing Firebase app instance with specific region
const functions = getFunctions(app, 'us-central1');

// Initialize EmailJS
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailData {
  toEmail: string;
  toName: string;
  registrationType: string;
  registrationId: string;
  status: 'approved' | 'rejected';
  teamName?: string;
  companyName?: string;
  collegeName?: string;
}

export const sendApprovalEmail = async (data: EmailData): Promise<boolean> => {
  try {
    console.log('=== Sending Email via Firebase Functions HTTP ===');
    console.log('Email data:', data);
    
    const functionUrl = 'https://sendapprovalemail-nxt63oucgq-uc.a.run.app';
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          toEmail: data.toEmail,
          toName: data.toName,
          registrationType: data.registrationType,
          registrationId: data.registrationId,
          status: data.status,
          teamName: data.teamName || '',
          companyName: data.companyName || '',
          collegeName: data.collegeName || ''
        }
      })
    });

    console.log('HTTP Response status:', response.status);
    const result = await response.json();
    console.log('Firebase function result:', result);
    
    if (response.ok && result.success) {
      console.log('Email sent successfully via Firebase Functions');
      return true;
    } else {
      console.error('Email sending failed:', result);
      return false;
    }
  } catch (error) {
    console.error('Failed to send email via Firebase Functions:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return false;
  }
};

export const getRegistrationTypeLabel = (type: string): string => {
  const typeLabels: { [key: string]: string } = {
    'college': 'Inter-College Tournament',
    'open_category': 'Open Category Tournament',
    'cosplayer': 'Cosplayer',
    'vendor': 'Vendor',
    'exhibitor': 'Exhibitor',
    'sponsor': 'Sponsor',
    'media': 'Media'
  };
  
  return typeLabels[type] || type;
};

export const sendAdminNotificationEmail = async (registration: any, registrationType: string): Promise<boolean> => {
  try {
    console.log('=== Sending Admin Notification Email via Firebase Functions ===');
    console.log('Registration data:', registration);
    console.log('Registration type:', registrationType);
    
    // Use the new dedicated admin notification Firebase Function
    const functionUrl = 'https://us-central1-nge2026-ness-event.cloudfunctions.net/sendAdminNotificationEmail';
    
    // Create admin notification data for the new dedicated function
    const adminNotificationData = {
      toEmail: 'vinotovzzhimo@gmail.com',
      toName: 'TXG Admin',
      registrationType: getRegistrationTypeLabel(registrationType),
      registrationId: registration.registrationId || '',
      teamName: registration.teamName || '',
      companyName: registration.companyName || '',
      collegeName: registration.collegeName || ''
    };
    
    console.log('Admin notification data:', adminNotificationData);

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: adminNotificationData
      })
    });

    console.log('Admin Notification HTTP Response status:', response.status);
    const result = await response.json();
    console.log('Admin Notification Firebase function result:', result);
    
    if (response.ok && result.success) {
      console.log('Admin notification email sent successfully via Firebase Functions');
      return true;
    } else {
      console.error('Admin notification email sending failed:', result);
      return false;
    }
  } catch (error) {
    console.error('Failed to send admin notification email via Firebase Functions:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return false;
  }
};

const getRegistrationDetailsForAdmin = (registration: any, registrationType: string) => {
  // Extract relevant details based on registration type for admin reference
  if (registrationType === 'college' || registrationType === 'open_category') {
    return {
      teamName: registration.teamName || '',
      collegeName: registration.collegeName || '',
      captainName: registration.captainName || '',
      captainEmail: registration.captainEmail || '',
      game: registration.gameId || ''
    };
  } else if (registrationType === 'sponsor' || registrationType === 'vendor' || registrationType === 'exhibitor') {
    return {
      companyName: registration.companyName || '',
      contactPerson: registration.contactPerson || '',
      contactEmail: registration.contactEmail || '',
      contactPhone: registration.contactPhone || ''
    };
  } else if (registrationType === 'cosplayer' || registrationType === 'visitor') {
    return {
      fullName: registration.fullName || '',
      email: registration.email || '',
      phone: registration.phone || ''
    };
  } else if (registrationType === 'media') {
    return {
      fullName: registration.fullName || '',
      email: registration.email || '',
      phone: registration.phone || '',
      organization: registration.organization || '',
      role: registration.role || ''
    };
  }
  return {};
};

export const getApprovalEmailContent = (registration: any, status: 'approved' | 'rejected') => {
  // Use the internal registration type directly, not the display label
  const registrationType = registration.registrationType || 'unknown';
  
  let recipientName = '';
  let teamOrCompanyName = '';
  
  // Extract relevant information based on registration type
  if (registrationType === 'sponsor' || registrationType === 'vendor' || registrationType === 'exhibitor') {
    // For sponsor-related registrations, prioritize contact person
    recipientName = registration.contactPerson || registration.fullName || registration.companyName || 'Valued Partner';
    teamOrCompanyName = registration.companyName || registration.fullName || 'Your Organization';
  } else if (registrationType === 'cosplayer') {
    // For cosplayers, use full name
    recipientName = registration.fullName || registration.contactPerson || 'Cosplayer';
    teamOrCompanyName = registration.fullName || 'Cosplayer Registration';
  } else if (registration.captainName) {
    // For teams (college/open category)
    recipientName = registration.captainName;
    teamOrCompanyName = registration.teamName || registration.collegeName || '';
  } else if (registration.fullName) {
    // For media and others
    recipientName = registration.fullName;
    teamOrCompanyName = registration.organization || registration.fullName || '';
  } else if (registration.contactPerson) {
    recipientName = registration.contactPerson;
    teamOrCompanyName = registration.companyName || '';
  }
  
  const emailData: EmailData = {
    toEmail: registration.captainEmail || registration.email || registration.contactEmail || '',
    toName: recipientName,
    registrationType: registrationType, // Send internal type directly
    registrationId: registration.registrationId || '',
    status: status,
    teamName: registration.teamName || '',
    companyName: registration.companyName || teamOrCompanyName,
    collegeName: registration.collegeName || ''
  };
  
  return emailData;
};
