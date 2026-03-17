import React from 'react';

// The Noun Project API Configuration
const NOUN_PROJECT_API_KEY = import.meta.env.VITE_NOUN_PROJECT_API_KEY || 'demo-key';

// Icon component using The Noun Project
interface NounIconProps {
  iconId: string;
  size?: number;
  color?: string;
  className?: string;
  alt?: string;
}

export const NounIcon: React.FC<NounIconProps> = ({
  iconId,
  size = 24,
  color = '#00ff88', // Default to gaming green
  className = '',
  alt = 'Icon'
}) => {
  // For now, use placeholder SVG icons since we don't have real API keys
  // This prevents the app from crashing and allows development to continue
  const iconSvg = getPlaceholderIcon(iconId);
  
  // Replace currentColor in SVG with the actual color
  const coloredIconSvg = iconSvg.replace(/currentColor/g, color);
  
  return (
    <span 
      className={`gaming-icon-container inline-block ${className}`}
      style={{ 
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-block'
      }}
    >
      <img 
        src={coloredIconSvg}
        alt={alt}
        width={size}
        height={size}
        className="gaming-icon"
        style={{ 
          filter: `drop-shadow(0 0 3px ${color}20)`,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          opacity: 1
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.filter = `drop-shadow(0 0 6px ${color}40)`;
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.filter = `drop-shadow(0 0 3px ${color}20)`;
          e.currentTarget.style.opacity = '1';
        }}
      />
    </span>
  );
};

// Placeholder icon generator - creates simple SVG placeholders
const getPlaceholderIcon = (iconId: string): string => {
  // Create a mapping from icon IDs to their semantic names
  const iconIdToName: Record<string, string> = {
    // Gaming Icons
    '12345': 'gamepad',
    '23456': 'trophy', 
    '34567': 'esports',
    '45678': 'tournament',
    '56789': 'gaming chair',
    '67890': 'headset',
    '78901': 'keyboard',
    '89012': 'mouse',
    '90123': 'controller',
    '01234': 'monitor',
    
    // Event Icons
    '11111': 'schedule', // Calendar for scheduling
    '22222': 'timing', // Clock for timing
    '33333': 'venue', // Location for venue
    '44444': 'registration', // Ticket for registration
    '55555': 'performance', // Stage for performance
    
    // Social Icons
    '66666': 'audience', // Users for audience
    '77777': 'participants', // Team for participants
    '88888': 'networking', // Community for networking
    '99999': 'connections', // Network for connections
    
    // Business Icons
    '10101': 'briefcase',
    '20202': 'handshake',
    '30303': 'partnership',
    '40404': 'investment',
    
    // Media Icons
    '50505': 'content', // Camera for content creation
    '60606': 'media', // Video for media
    '70707': 'live', // Streaming for live content
    '80808': 'broadcast', // Broadcast for live streaming
    
    // Achievement Icons
    '90909': 'medal',
    '10111': 'award',
    '20222': 'badge',
    '30333': 'star',
    '40444': 'shield',
    
    // Analytics Icons
    '50555': 'budget', // Calculator for budget
    '60666': 'growth', // Trending for growth/analytics
    
    // Contact Icons
    '70777': 'mail',
    '80888': 'phone',
    
    // Social/Media Icons
    '90999': 'share',
    '91000': 'archive',
    '92000': 'play',
    
    // Navigation Icons
    '93000': 'menu',
    '94000': 'close',
    '95000': 'user',
    '96000': 'logout',
    '97000': 'chevron',
    '98000': 'dashboard',
    '99000': 'user plus',
    '10000': 'eye',
    '11000': 'arrow',
    '12000': 'loader',
    
    // Additional Icons
    '13000': 'globe',
    '14000': 'zap',
    '11223': 'target'
  };
  
  // Get the icon name from the ID, fallback to the ID itself
  const iconName = iconIdToName[iconId] || iconId;
  const iconType = iconName.toLowerCase();
  
  // Gaming Icons - Subtle Gaming Themed
  if (iconType.includes('gamepad') || iconType.includes('controller')) {
    return `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='4' y='8' width='16' height='8' rx='3' fill='%23333' stroke='%23666' stroke-width='2'/%3E%3Ccircle cx='8' cy='12' r='2' fill='%23111' stroke='%23999' stroke-width='1'/%3E%3Ccircle cx='16' cy='12' r='2' fill='%23111' stroke='%23999' stroke-width='1'/%3E%3Crect x='11' y='6' width='2' height='4' rx='1' fill='%23999'/%3E%3Crect x='11' y='14' width='2' height='4' rx='1' fill='%23999'/%3E%3Ccircle cx='12' cy='8' r='0.5' fill='%23aaa'/%3E%3Ccircle cx='12' cy='16' r='0.5' fill='%23aaa'/%3E%3C/svg%3E`;
  }
  
  if (iconType.includes('trophy')) {
    return `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 2C4.9 2 4 2.9 4 4V6C4 7.1 4.9 8 6 8H8V10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10V8H18C19.1 8 20 7.1 20 6V4C20 2.9 19.1 2 18 2H6Z' fill='%23444' stroke='%23777' stroke-width='2'/%3E%3Cpath d='M12 14V22' stroke='%23999' stroke-width='2'/%3E%3Cpath d='M8 18H16' stroke='%23999' stroke-width='2'/%3E%3Ccircle cx='12' cy='8' r='2' fill='%23111'/%3E%3Ctext x='12' y='10' text-anchor='middle' fill='%23ccc' font-size='8' font-weight='bold'%3E1%3C/text%3E%3C/svg%3E`;
  }
  
  if (iconType.includes('award') || iconType.includes('medal')) {
    return `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='8' r='6' fill='%23664' stroke='%23888' stroke-width='2'/%3E%3Cpath d='M12 14V20' stroke='%23888' stroke-width='2'/%3E%3Cpath d='M8 18H16' stroke='%23888' stroke-width='2'/%3E%3Ccircle cx='12' cy='8' r='3' fill='%23111'/%3E%3Ctext x='12' y='10' text-anchor='middle' fill='%23ddd' font-size='8' font-weight='bold'%3E*%3C/text%3E%3C/svg%3E`;
  }
  
  if (iconType.includes('esports')) {
    return `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='6' width='20' height='12' rx='3' fill='%23555' stroke='%23777' stroke-width='2'/%3E%3Crect x='6' y='10' width='2' height='4' rx='1' fill='%23999'/%3E%3Crect x='16' y='10' width='2' height='4' rx='1' fill='%23999'/%3E%3Crect x='6' y='14' width='2' height='4' rx='1' fill='%23999'/%3E%3Crect x='16' y='14' width='2' height='4' rx='1' fill='%23999'/%3E%3Ccircle cx='12' cy='12' r='3' fill='%23111'/%3E%3Ctext x='12' y='14' text-anchor='middle' fill='%23bbb' font-size='10' font-weight='bold'%3EE%3C/text%3E%3Cpath d='M10 4L12 2L14 4' stroke='%23777' stroke-width='2'/%3E%3Cpath d='M10 20L12 22L14 20' stroke='%23777' stroke-width='2'/%3E%3C/svg%3E`;
  }
  
  // User/People Icons - Modern Minimalist Style
  if (iconType.includes('user') || iconType.includes('people')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="7" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M6 17C6 14.9 7.3 13.5 9 13.5C10.7 13.5 12 14.9 12 17V19C12 20.1 11.1 21 10 21H14C12.9 21 12 20.1 12 19V17Z" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="12" cy="7" r="1" fill="currentColor"/>
        <circle cx="8" cy="15" r="1.5" fill="currentColor" opacity="0.6"/>
        <circle cx="16" cy="15" r="1.5" fill="currentColor" opacity="0.6"/>
      </svg>
    `)}`;
  }
  
  if (iconType.includes('team') || iconType.includes('community')) {
    return `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='7' r='3' fill='%23666' stroke='%23888' stroke-width='2'/%3E%3Ccircle cx='16' cy='7' r='3' fill='%23666' stroke='%23888' stroke-width='2'/%3E%3Cpath d='M5 14C5 12.3 6.3 11 8 11C9.7 11 11 12.3 11 14V16C11 16.6 10.6 17 10 17H6C5.4 17 5 16.6 5 16V14Z' fill='%23666' stroke='%23888' stroke-width='2'/%3E%3Cpath d='M13 14C13 12.3 14.3 11 16 11C17.7 11 19 12.3 19 14V16C19 16.6 18.6 17 18 17H14C13.4 17 13 16.6 13 16V14Z' fill='%23666' stroke='%23888' stroke-width='2'/%3E%3Ccircle cx='8' cy='7' r='1.5' fill='%23111'/%3E%3Ccircle cx='16' cy='7' r='1.5' fill='%23111'/%3E%3Ccircle cx='7' cy='6' r='0.5' fill='%23aaa'/%3E%3Ccircle cx='9' cy='6' r='0.5' fill='%23aaa'/%3E%3Ccircle cx='15' cy='6' r='0.5' fill='%23aaa'/%3E%3Ccircle cx='17' cy='6' r='0.5' fill='%23aaa'/%3E%3C/svg%3E`;
  }
  
  // Event/Time Icons - Subtle Gaming Themed
  if (iconType.includes('calendar') || iconType.includes('schedule')) {
    return `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='3' y='4' width='18' height='16' rx='2' fill='%23444' stroke='%23666' stroke-width='2'/%3E%3Cpath d='M3 8H21' stroke='%23111' stroke-width='2'/%3E%3Cpath d='M8 2V6' stroke='%23777' stroke-width='2'/%3E%3Cpath d='M16 2V6' stroke='%23777' stroke-width='2'/%3E%3Ccircle cx='8' cy='12' r='1.5' fill='%23111'/%3E%3Ccircle cx='12' cy='12' r='1.5' fill='%23777'/%3E%3Ccircle cx='16' cy='12' r='1.5' fill='%23111'/%3E%3Ctext x='8' y='16' text-anchor='middle' fill='%23aaa' font-size='6' font-weight='bold'%3E1%3C/text%3E%3Ctext x='12' y='16' text-anchor='middle' fill='%23aaa' font-size='6' font-weight='bold'%3E2%3C/text%3E%3Ctext x='16' y='16' text-anchor='middle' fill='%23aaa' font-size='6' font-weight='bold'%3E3%3C/text%3E%3C/svg%3E`;
  }
  
  if (iconType.includes('clock') || iconType.includes('time') || iconType.includes('timing')) {
    return `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23555' stroke='%23777' stroke-width='2'/%3E%3Cpath d='M12 6V12L16 14' stroke='%23111' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='12' cy='12' r='1' fill='%23777'/%3E%3Ccircle cx='12' cy='6' r='0.5' fill='%23999'/%3E%3Ccircle cx='18' cy='12' r='0.5' fill='%23999'/%3E%3Ccircle cx='12' cy='18' r='0.5' fill='%23999'/%3E%3Ccircle cx='6' cy='12' r='0.5' fill='%23999'/%3E%3C/svg%3E`;
  }
  
  // Location Icons
  if (iconType.includes('location') || iconType.includes('pin')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.58 7.03 2 12 2S21 5.58 21 10Z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="10" r="4" fill="white"/>
        <circle cx="12" cy="10" r="2" fill="currentColor"/>
      </svg>
    `)}`;
  }
  
  // Business/Work Icons
  if (iconType.includes('briefcase') || iconType.includes('work')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="16" height="12" rx="2" fill="currentColor" stroke="currentColor" stroke-width="2"/>
        <path d="M9 6V4C9 3.45 9.45 3 10 3H14C14.55 3 15 3.45 15 4V6" stroke="white" stroke-width="2"/>
        <path d="M9 13H15" stroke="white" stroke-width="2"/>
        <rect x="10" y="8" width="4" height="2" rx="1" fill="white"/>
      </svg>
    `)}`;
  }
  
  if (iconType.includes('partnership') || iconType.includes('handshake')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V12C2 13.1 2.9 14 4 14H8L12 18L16 14H20C21.1 14 22 13.1 22 12V7L12 2Z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
        <path d="M8 10H16" stroke="white" stroke-width="2"/>
        <circle cx="8" cy="10" r="1.5" fill="white"/>
        <circle cx="16" cy="10" r="1.5" fill="white"/>
      </svg>
    `)}`;
  }
  
  // Media Icons
  if (iconType.includes('video') || iconType.includes('play')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" stroke="currentColor" stroke-width="2"/>
        <polygon points="10,8 16,12 10,16" fill="white"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    `)}`;
  }
  
  if (iconType.includes('camera')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="20" height="12" rx="2" fill="currentColor" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <circle cx="18" cy="8" r="1.5" fill="white"/>
        <rect x="8" y="4" width="8" height="2" rx="1" fill="currentColor"/>
      </svg>
    `)}`;
  }
  
  if (iconType.includes('streaming') || iconType.includes('broadcast')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" fill="currentColor" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="white"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <path d="M12 4V2M12 22V20M20 12H22M2 12H4" stroke="white" stroke-width="2"/>
        <path d="M16 8L20 4M16 16L20 20M8 8L4 4M8 16L4 20" stroke="white" stroke-width="1"/>
      </svg>
    `)}`;
  }
  
  // Navigation Icons
  if (iconType.includes('menu') || iconType.includes('hamburger')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="18" height="3" rx="1.5" fill="currentColor"/>
        <rect x="3" y="10.5" width="18" height="3" rx="1.5" fill="currentColor"/>
        <rect x="3" y="16" width="18" height="3" rx="1.5" fill="currentColor"/>
      </svg>
    `)}`;
  }
  
  if (iconType.includes('close') || iconType.includes('x')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="currentColor" stroke-width="2"/>
        <path d="M9 9L15 15M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `)}`;
  }
  
  // Contact Icons
  if (iconType.includes('mail') || iconType.includes('email')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" stroke="currentColor" stroke-width="2"/>
        <path d="M2 6L12 12L22 6" stroke="white" stroke-width="2"/>
        <path d="M2 18L8 12M22 18L16 12" stroke="white" stroke-width="1"/>
      </svg>
    `)}`;
  }
  
  if (iconType.includes('phone')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="20" height="12" rx="3" fill="currentColor" stroke="currentColor" stroke-width="2"/>
        <rect x="6" y="10" width="2" height="4" rx="1" fill="white"/>
        <rect x="16" y="10" width="2" height="4" rx="1" fill="white"/>
        <rect x="10" y="10" width="4" height="4" rx="2" fill="white"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    `)}`;
  }
  
  // Achievement Icons
  if (iconType.includes('star')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor" stroke-width="2"/>
      </svg>
    `)}`;
  }
  
  if (iconType.includes('shield')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 7V12C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 12V7L12 2Z" stroke="currentColor" stroke-width="2"/>
        <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2"/>
      </svg>
    `)}`;
  }
  
  // Tech/Gaming Hardware Icons
  if (iconType.includes('monitor') || iconType.includes('screen')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
        <path d="M8 21H16M12 17V21" stroke="currentColor" stroke-width="2"/>
      </svg>
    `)}`;
  }
  
  if (iconType.includes('keyboard')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
        <rect x="4" y="8" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="8" y="8" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="12" y="8" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="16" y="8" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="20" y="8" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="6" y="12" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="10" y="12" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="14" y="12" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="18" y="12" width="2" height="2" rx="0.5" fill="currentColor"/>
      </svg>
    `)}`;
  }
  
  if (iconType.includes('mouse')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="2" width="12" height="20" rx="6" stroke="currentColor" stroke-width="2"/>
        <path d="M12 2V8" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    `)}`;
  }
  
  if (iconType.includes('headset')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12C3 7.58 7.03 4 12 4C16.97 4 21 7.58 21 12C21 12.55 20.55 13 20 13H19C18.45 13 18 12.55 18 12C18 8.69 15.31 6 12 6C8.69 6 6 8.69 6 12C6 12.55 5.55 13 5 13H4C3.45 13 3 12.55 3 12Z" stroke="currentColor" stroke-width="2"/>
        <path d="M12 13V16" stroke="currentColor" stroke-width="2"/>
        <circle cx="8" cy="13" r="2" stroke="currentColor" stroke-width="2"/>
        <circle cx="16" cy="13" r="2" stroke="currentColor" stroke-width="2"/>
      </svg>
    `)}`;
  }
  
  // Analytics Icons
  if (iconType.includes('trending') || iconType.includes('growth')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12L7 8L11 10L15 6L19 9L21 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 12L7 16L11 14L15 18L19 15L21 17" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
        <circle cx="3" cy="12" r="2" fill="currentColor"/>
        <circle cx="21" cy="7" r="2" fill="currentColor"/>
        <circle cx="21" cy="17" r="1.5" fill="currentColor" opacity="0.7"/>
      </svg>
    `)}`;
  }
  
  if (iconType.includes('calculator')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
        <rect x="6" y="4" width="12" height="4" rx="1" fill="currentColor"/>
        <rect x="6" y="10" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="10" y="10" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="14" y="10" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="6" y="14" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="10" y="14" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="14" y="14" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="6" y="18" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="10" y="18" width="2" height="2" rx="0.5" fill="currentColor"/>
        <rect x="14" y="18" width="4" height="2" rx="0.5" fill="currentColor"/>
      </svg>
    `)}`;
  }
  
  // Target Icons - Modern Minimalist Style
  if (iconType.includes('target')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1" fill="none"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
        <circle cx="12" cy="3" r="0.5" fill="currentColor" opacity="0.6"/>
        <circle cx="12" cy="21" r="0.5" fill="currentColor" opacity="0.6"/>
        <circle cx="3" cy="12" r="0.5" fill="currentColor" opacity="0.6"/>
        <circle cx="21" cy="12" r="0.5" fill="currentColor" opacity="0.6"/>
      </svg>
    `)}`;
  }
  
  // Eye Icon
  if (iconType.includes('eye')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
      </svg>
    `)}`;
  }
  
  // Social Icons
  if (iconType.includes('share')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
        <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
        <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2"/>
        <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" stroke-width="2"/>
      </svg>
    `)}`;
  }
  
  // Global Icons - Modern Minimalist Style
  if (iconType.includes('globe') || iconType.includes('world')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <path d="M12 3V21M3 12H21" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
        <path d="M6 6C8 8 16 16 18 18" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.7"/>
        <path d="M6 18C8 16 16 8 18 6" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.7"/>
        <circle cx="12" cy="3" r="1" fill="currentColor" opacity="0.8"/>
        <circle cx="12" cy="21" r="1" fill="currentColor" opacity="0.8"/>
        <circle cx="3" cy="12" r="1" fill="currentColor" opacity="0.8"/>
        <circle cx="21" cy="12" r="1" fill="currentColor" opacity="0.8"/>
        <circle cx="6" cy="6" r="0.5" fill="currentColor" opacity="0.6"/>
        <circle cx="18" cy="6" r="0.5" fill="currentColor" opacity="0.6"/>
        <circle cx="6" cy="18" r="0.5" fill="currentColor" opacity="0.6"/>
        <circle cx="18" cy="18" r="0.5" fill="currentColor" opacity="0.6"/>
      </svg>
    `)}`;
  }
  
  // Lightning/Energy Icons
  if (iconType.includes('zap') || iconType.includes('lightning')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="currentColor"/>
      </svg>
    `)}`;
  }
  
  // Dashboard Icons
  if (iconType.includes('dashboard')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
      </svg>
    `)}`;
  }
  
  // Archive Icons
  if (iconType.includes('archive')) {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
        <path d="M8 6H16M8 10H16M8 14H12" stroke="currentColor" stroke-width="2"/>
      </svg>
    `)}`;
  }
  
  // Default placeholder icon - Subtle
  return `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%23666' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='3' fill='%23777'/%3E%3Ccircle cx='12' cy='12' r='1' fill='%23999'/%3E%3C/svg%3E`;
};

// Pre-configured gaming icons from The Noun Project
export const GamingIcons = {
  // Gaming-related icons
  GAMEPAD: '12345', // Gamepad icon ID
  TROPHY: '23456', // Trophy icon ID
  ESPORTS: '34567', // Esports icon ID
  TOURNAMENT: '45678', // Tournament icon ID
  GAMING_CHAIR: '56789', // Gaming chair icon ID
  HEADSET: '67890', // Gaming headset icon ID
  KEYBOARD: '78901', // Gaming keyboard icon ID
  MOUSE: '89012', // Gaming mouse icon ID
  CONTROLLER: '90123', // Game controller icon ID
  MONITOR: '01234', // Gaming monitor icon ID
  TARGET: '11223', // Target icon ID
  
  // Event-related icons
  CALENDAR: '11111', // Calendar icon ID
  CLOCK_ICON: '22222', // Clock icon ID
  LOCATION: '33333', // Location icon ID
  TICKET: '44444', // Ticket icon ID
  STAGE: '55555', // Stage icon ID
  
  // Social/Community icons
  USERS: '66666', // Users icon ID
  TEAM: '77777', // Team icon ID
  COMMUNITY: '88888', // Community icon ID
  NETWORK: '99999', // Network icon ID
  
  // Business/Sponsor icons
  BRIEFCASE: '10101', // Briefcase icon ID
  HANDSHAKE: '20202', // Handshake icon ID
  PARTNERSHIP: '30303', // Partnership icon ID
  INVESTMENT: '40404', // Investment icon ID
  
  // Media/Content icons
  CAMERA: '50505', // Camera icon ID
  VIDEO: '60606', // Video icon ID
  STREAMING: '70707', // Streaming icon ID
  BROADCAST: '80808', // Broadcast icon ID
  
  // Achievement icons
  MEDAL: '90909', // Medal icon ID
  AWARD: '10111', // Award icon ID
  BADGE: '20222', // Badge icon ID
  STAR: '30333', // Star icon ID
  SHIELD: '40444', // Shield icon ID
  
  // Business/Analytics icons
  CALCULATOR: '50555', // Calculator icon ID
  TRENDING_UP: '60666', // Trending up icon ID
  
  // Contact icons
  MAIL: '70777', // Mail icon ID
  PHONE: '80888', // Phone icon ID
  
  // Social/Media icons
  SHARE: '90999', // Share icon ID
  ARCHIVE: '91000', // Archive icon ID
  PLAY: '92000', // Play icon ID
  
  // Navigation/UI icons
  MENU: '93000', // Menu icon ID
  CLOSE: '94000', // Close/X icon ID
  USER: '95000', // User icon ID
  LOGOUT: '96000', // Logout icon ID
  CHEVRON_DOWN: '97000', // Chevron down icon ID
  DASHBOARD: '98000', // Dashboard icon ID
  USER_PLUS: '99000', // User plus icon ID
  EYE: '10000', // Eye icon ID
  ARROW_LEFT: '11000', // Arrow left icon ID
  LOADER: '12000', // Loader/spinner icon ID
  
  // Additional icons
  GLOBE: '13000', // Globe icon ID
  ZAP: '14000', // Zap/lightning icon ID
};

// Usage examples:
export const ExampleUsage = () => {
  return (
    <div className="flex gap-4">
      <NounIcon iconId={GamingIcons.GAMEPAD} size={32} color="#00ff88" />
      <NounIcon iconId={GamingIcons.TROPHY} size={32} color="#00ffff" />
      <NounIcon iconId={GamingIcons.ESPORTS} size={32} color="#ff00ff" />
    </div>
  );
};

export default NounIcon;
