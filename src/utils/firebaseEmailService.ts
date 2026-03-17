import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '@/lib/firebase';

// Use the existing Firebase app instance with specific region
const functions = getFunctions(app, 'us-central1');

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
    
    const functionUrl = 'https://us-central1-nge2026-ness-event.cloudfunctions.net/sendApprovalEmail';
    
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

export const getApprovalEmailContent = (registration: any, status: 'approved' | 'rejected') => {
  const registrationType = getRegistrationTypeLabel(registration.registrationType || 'unknown');
  
  let recipientName = '';
  let teamOrCompanyName = '';
  
  // Extract relevant information based on registration type
  if (registration.captainName) {
    recipientName = registration.captainName;
  } else if (registration.fullName) {
    recipientName = registration.fullName;
  } else if (registration.contactPerson) {
    recipientName = registration.contactPerson;
  }
  
  if (registration.teamName) {
    teamOrCompanyName = registration.teamName;
  } else if (registration.companyName) {
    teamOrCompanyName = registration.companyName;
  } else if (registration.collegeName) {
    teamOrCompanyName = registration.collegeName;
  }
  
  const emailData: EmailData = {
    toEmail: registration.captainEmail || registration.email || registration.contactEmail || '',
    toName: recipientName,
    registrationType: registrationType,
    registrationId: registration.registrationId || '',
    status: status,
    teamName: registration.teamName || '',
    companyName: registration.companyName || '',
    collegeName: registration.collegeName || ''
  };
  
  return emailData;
};
