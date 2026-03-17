import emailjs from '@emailjs/browser';

// Email service configuration
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID_APPROVAL = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_APPROVAL;
const EMAILJS_TEMPLATE_ID_REJECTION = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REJECTION;

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailData {
  to_email: string;
  to_name: string;
  registration_type: string;
  registration_id: string;
  team_name?: string;
  company_name?: string;
  college_name?: string;
  event_name?: string;
  status: 'approved' | 'rejected';
  additional_info?: string;
}

export const sendApprovalEmail = async (data: EmailData): Promise<boolean> => {
  try {
    const templateId = data.status === 'approved' ? EMAILJS_TEMPLATE_ID_APPROVAL : EMAILJS_TEMPLATE_ID_REJECTION;
    
    const templateParams = {
      to_email: data.to_email,
      to_name: data.to_name,
      registration_type: data.registration_type,
      registration_id: data.registration_id,
      team_name: data.team_name || '',
      company_name: data.company_name || '',
      college_name: data.college_name || '',
      event_name: data.event_name || 'TXG TechXGames Expo 2026',
      status: data.status,
      additional_info: data.additional_info || '',
      reply_to: 'noreply@txgtechxgames.com'
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      templateId,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
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
    to_email: registration.captainEmail || registration.email || registration.contactEmail || '',
    to_name: recipientName,
    registration_type: registrationType,
    registration_id: registration.registrationId || '',
    team_name: registration.teamName || '',
    company_name: registration.companyName || '',
    college_name: registration.collegeName || '',
    event_name: 'TXG TechXGames Expo 2026',
    status: status,
    additional_info: status === 'approved' 
      ? 'Your registration has been approved. Please check your email for further details and event information.'
      : 'Unfortunately, your registration could not be approved at this time. Thank you for your interest.'
  };
  
  return emailData;
};
