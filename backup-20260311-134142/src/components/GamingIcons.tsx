import React from 'react';
import { 
  // Gaming Icons
  Gamepad2, 
  Trophy, 
  Target, 
  Monitor, 
  Zap,
  Users,
  Award,
  Star,
  Shield,
  
  // Event Icons
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Mic,
  
  // Business Icons
  Briefcase,
  Handshake,
  TrendingUp,
  BarChart3,
  Calculator,
  
  // Media Icons
  Camera,
  Video,
  Radio,
  
  // Social Icons
  Share2,
  Archive,
  Play,
  
  // Navigation Icons
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Eye,
  ArrowUp,
  Loader,
  
  // Additional Icons
  Globe,
  Target as TargetIcon,
  Home,
  Settings,
  ChevronRight,
  ArrowRight,
  
  // Contact Icons
  Mail,
  Phone,
} from 'lucide-react';

// Icon component using Lucide React icons
interface GamingIconProps {
  iconId: string;
  size?: number;
  color?: string;
  className?: string;
  alt?: string;
}

const GamingIcon: React.FC<GamingIconProps> = ({
  iconId,
  size = 24,
  color = '#00ff88', // Default to gaming green
  className = '',
  alt = 'Icon'
}) => {
  // Map icon IDs to Lucide components
  const iconMap: Record<string, React.ComponentType<any>> = {
    // Gaming Icons
    '12345': Gamepad2,
    '23456': Trophy,
    '34567': Target,
    '45678': Users,
    '56789': Monitor,
    '67890': Zap,
    '78901': Users,
    '89012': Target,
    '90123': Gamepad2,
    '01234': Monitor,
    '11223': TargetIcon,
    
    // Event Icons
    '11111': Calendar,
    '22222': Clock,
    '33333': MapPin,
    '44444': Ticket,
    '55555': Mic,
    
    // Social/Community Icons
    '66666': Users,
    '77777': Users,
    '88888': Users,
    '99999': Share2,
    
    // Business Icons
    '10101': Briefcase,
    '20202': Handshake,
    '30303': Handshake,
    '40404': TrendingUp,
    
    // Media Icons
    '50505': Camera,
    '60606': Video,
    '70707': Radio,
    '80808': Radio,
    
    // Achievement Icons
    '90909': Award,
    '10111': Award,
    '20222': Star,
    '30333': Star,
    '40444': Shield,
    
    // Analytics Icons
    '50555': Calculator,
    '60666': BarChart3,
    
    // Contact Icons
    '70777': Mail,
    '80888': Phone,
    
    // Social/Media Icons
    '90999': Share2,
    '91000': Archive,
    '92000': Play,
    
    // Navigation Icons
    '93000': Menu,
    '94000': X,
    '95000': User,
    '96000': LogOut,
    '97000': ChevronDown,
    '98000': Home,
    '99000': User,
    '10000': Eye,
    '11000': ArrowRight,
    '12000': Loader,
    
    // Additional Icons
    '13000': Globe,
    '14000': Zap,
    // '11223': TargetIcon,
  };

  // Get the Lucide component, fallback to a default icon
  const IconComponent = iconMap[iconId] || Gamepad2;

  // Dynamic color class for hover effects
  const colorClass = color === '#00ff88' ? 'text-green-400' : 
                    color === '#00ffff' ? 'text-cyan-400' : 
                    color === '#ff00ff' ? 'text-purple-400' : 
                    color === '#ffffff' ? 'text-white' : 
                    'text-gray-400';

  return (
    <div 
      className={`gaming-icon-container inline-flex items-center justify-center transition-all duration-300 ${className}`}
      style={{ 
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <IconComponent 
        size={size * 0.8} // Slightly smaller for better proportions
        className={`${colorClass} transition-all duration-300 hover:scale-110`}
        style={{ 
          filter: `drop-shadow(0 0 3px ${color}40)`,
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
      />
    </div>
  );
};

// Pre-configured gaming icon constants for easy access
export const GamingIcons = {
  // Gaming Icons
  GAMEPAD: '12345',
  TROPHY: '23456',
  ESPORTS: '34567',
  TOURNAMENT: '45678',
  GAMING_CHAIR: '56789',
  HEADSET: '67890',
  KEYBOARD: '78901',
  MOUSE: '89012',
  CONTROLLER: '90123',
  MONITOR: '01234',
  TARGET: '11223',
  
  // Event Icons
  CALENDAR: '11111',
  CLOCK_ICON: '22222',
  LOCATION: '33333',
  TICKET: '44444',
  STAGE: '55555',
  
  // Social/Community Icons
  USERS: '66666',
  TEAM: '77777',
  COMMUNITY: '88888',
  NETWORK: '99999',
  
  // Business Icons
  BRIEFCASE: '10101',
  HANDSHAKE: '20202',
  PARTNERSHIP: '30303',
  INVESTMENT: '40404',
  
  // Media Icons
  CAMERA: '50505',
  VIDEO: '60606',
  STREAMING: '70707',
  BROADCAST: '80808',
  
  // Achievement Icons
  MEDAL: '90909',
  AWARD: '10111',
  BADGE: '20222',
  STAR: '30333',
  SHIELD: '40444',
  
  // Analytics Icons
  CALCULATOR: '50555',
  TRENDING_UP: '60666',
  
  // Contact Icons
  MAIL: '70777',
  PHONE: '80888',
  
  // Social/Media Icons
  SHARE: '90999',
  ARCHIVE: '91000',
  PLAY: '92000',
  
  // Navigation Icons
  MENU: '93000',
  CLOSE: '94000',
  USER: '95000',
  LOGOUT: '96000',
  CHEVRON_DOWN: '97000',
  DASHBOARD: '98000',
  USER_PLUS: '99000',
  EYE: '10000',
  ARROW_LEFT: '11000',
  LOADER: '12000',
  
  // Additional Icons
  GLOBE: '13000',
  ZAP: '14000',
  // TARGET: '11223',
};

export default GamingIcon;
