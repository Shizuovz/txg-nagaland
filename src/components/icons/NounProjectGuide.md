# The Noun Project Icons Integration Guide

## 📦 Installation

The Noun Project package has been installed:
```bash
npm install the-noun-project-v2
```

## 🔑 API Key Setup

1. Get your API key from [The Noun Project](https://thenounproject.com/developers/)
2. Add it to your environment variables:
```env
VITE_NOUN_PROJECT_API_KEY=your-api-key-here
```

## 🎮 Usage Examples

### Basic Icon Usage
```tsx
import { NounIcon } from './icons/NounProjectIcons';

<NounIcon 
  iconId="12345" 
  size={24} 
  color="#00ff88" 
  alt="Gamepad icon"
/>
```

### Pre-configured Gaming Icons
```tsx
import { NounIcon, GamingIcons } from './icons/NounProjectIcons';

// Gaming icons
<NounIcon iconId={GamingIcons.GAMEPAD} size={32} color="#00ff88" />
<NounIcon iconId={GamingIcons.TROPHY} size={32} color="#00ffff" />
<NounIcon iconId={GamingIcons.ESPORTS} size={32} color="#ff00ff" />

// Event icons
<NounIcon iconId={GamingIcons.CALENDAR} size={24} color="#ffffff" />
<NounIcon iconId={GamingIcons.LOCATION} size={24} color="#ffffff" />

// Business icons
<NounIcon iconId={GamingIcons.PARTNERSHIP} size={24} color="#00ff88" />
<NounIcon iconId={GamingIcons.INVESTMENT} size={24} color="#00ffff" />
```

## 🎨 Available Icon Categories

### Gaming Icons
- `GAMEPAD` - Game controller
- `TROPHY` - Achievement trophy
- `ESPORTS` - Esports competition
- `TOURNAMENT` - Tournament bracket
- `GAMING_CHAIR` - Gaming chair
- `HEADSET` - Gaming headset
- `KEYBOARD` - Gaming keyboard
- `MOUSE` - Gaming mouse
- `CONTROLLER` - Game controller
- `MONITOR` - Gaming monitor
- `TARGET` - Target/bullseye

### Event Icons
- `CALENDAR` - Event calendar
- `CLOCK` - Time/clock
- `LOCATION` - Location/pin
- `TICKET` - Event ticket
- `STAGE` - Performance stage

### Social/Community Icons
- `USERS` - Multiple users
- `TEAM` - Team/group
- `COMMUNITY` - Community network
- `NETWORK` - Social network

### Business/Sponsor Icons
- `BRIEFCASE` - Business briefcase
- `HANDSHAKE` - Partnership handshake
- `PARTNERSHIP` - Business partnership
- `INVESTMENT` - Investment/growth

### Media/Content Icons
- `CAMERA` - Camera/photography
- `VIDEO` - Video/film
- `STREAMING` - Live streaming
- `BROADCAST` - Broadcasting

### Achievement Icons
- `MEDAL` - Achievement medal
- `AWARD` - Award ribbon
- `BADGE` - Achievement badge
- `STAR` - Star rating

## 🔄 Migration from Lucide Icons

### Before (Lucide)
```tsx
import { Gamepad2, Users, Trophy } from "lucide-react";

const features = [
  { icon: Gamepad2, title: "Gaming" },
  { icon: Users, title: "Community" },
  { icon: Trophy, title: "Prizes" },
];
```

### After (The Noun Project)
```tsx
import { NounIcon, GamingIcons } from "./icons/NounProjectIcons";

const features = [
  { iconId: GamingIcons.GAMEPAD, title: "Gaming" },
  { iconId: GamingIcons.USERS, title: "Community" },
  { iconId: GamingIcons.TROPHY, title: "Prizes" },
];
```

## 🎯 Component Integration

### In Feature Cards
```tsx
<div className="feature-card">
  <div className="icon-container">
    <NounIcon 
      iconId={GamingIcons.GAMEPAD} 
      size={32} 
      color="#00ff88" 
      alt="Gaming icon"
    />
  </div>
  <h3 className="font-['Neiko']">{title}</h3>
  <p className="font-['Nonito']">{description}</p>
</div>
```

### In Navigation
```tsx
<nav>
  <NounIcon iconId={GamingIcons.GAMEPAD} size={20} color="#ffffff" />
  <span>Gaming</span>
</nav>
```

### In Buttons
```tsx
<button className="btn-primary">
  <NounIcon iconId={GamingIcons.TROPHY} size={16} color="#ffffff" />
  Register Now
</button>
```

## 🎨 Customization

### Size Options
```tsx
<NounIcon iconId={GamingIcons.GAMEPAD} size={16} /> // Small
<NounIcon iconId={GamingIcons.GAMEPAD} size={24} /> // Medium
<NounIcon iconId={GamingIcons.GAMEPAD} size={32} /> // Large
<NounIcon iconId={GamingIcons.GAMEPAD} size={48} /> // Extra Large
```

### Color Options
```tsx
<NounIcon iconId={GamingIcons.GAMEPAD} color="#00ff88" /> // Neon Green
<NounIcon iconId={GamingIcons.GAMEPAD} color="#00ffff" /> // Neon Cyan
<NounIcon iconId={GamingIcons.GAMEPAD} color="#ff00ff" /> // Neon Magenta
<NounIcon iconId={GamingIcons.GAMEPAD} color="#ffffff" /> // White
<NounIcon iconId={GamingIcons.GAMEPAD} color="#000000" /> // Black
```

### CSS Classes
```tsx
<NounIcon 
  iconId={GamingIcons.GAMEPAD} 
  className="hover:scale-110 transition-transform"
/>
```

## 📝 Notes

- The icon IDs used are placeholders. Replace them with actual The Noun Project icon IDs
- You'll need a valid API key from The Noun Project to use the icons
- Icons are loaded via API calls, so ensure proper error handling
- Consider caching for better performance
- The Noun Project icons are high-quality and professional-looking
- Perfect for gaming/esports websites with consistent visual style

## 🚀 Next Steps

1. Get your The Noun Project API key
2. Replace placeholder icon IDs with actual icon IDs
3. Update existing components to use The Noun Project icons
4. Test the icons in different contexts (buttons, cards, navigation)
5. Optimize loading and caching for production
