import { useState, useEffect } from 'react';

// Types for content management
export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface StatItem {
  id: string;
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  iconId: string;
  isActive: boolean;
}

export interface EventInfo {
  eventName: string;
  eventDate: string;
  eventVenue: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    twitter: string;
    instagram: string;
    youtube: string;
    discord: string;
  };
}

export interface ContentData {
  hero: HeroContent;
  stats: StatItem[];
  eventInfo: EventInfo;
}

// Default content data
const defaultContent: ContentData = {
  hero: {
    title: 'TECH X Gaming',
    subtitle: 'Expo Nagaland',
    description: 'Experience the ultimate gaming festival in Northeast India. Join us for tournaments, showcases, and the future of gaming.',
    image: '/images/carousel/hero1.png'
  },
  stats: [
    { id: '1', value: 300000, prefix: '₹', suffix: '', label: 'Prize Pool', iconId: 'trophy', isActive: true },
    { id: '2', value: 15000, prefix: '', suffix: '-20,000', label: 'Expected Attendees', iconId: 'users', isActive: true },
    { id: '3', value: 200000, prefix: '', suffix: '+', label: 'Digital Reach', iconId: 'trending-up', isActive: true },
    { id: '4', value: 2, prefix: '', suffix: '', label: 'Day Event', iconId: 'gamepad', isActive: true }
  ],
  eventInfo: {
    eventName: 'TECH X Gaming Expo Nagaland',
    eventDate: '2026-04-15',
    eventVenue: 'Nagaland Olympic Park, Dimapur',
    contactEmail: 'nagalandesportsociety@gmail.com',
    contactPhone: '+91-9876543210',
    socialLinks: {
      twitter: 'https://twitter.com/techxgaming',
      instagram: 'https://instagram.com/techxgaming',
      youtube: 'https://youtube.com/techxgaming',
      discord: 'https://discord.gg/techxgaming'
    }
  }
};

const useContentManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for content data (using localStorage for persistence)
  const [contentData, setContentData] = useState<ContentData>(defaultContent);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);

        // Auto-migrate old expected attendees stat
        if (parsed.stats) {
          let migrated = false;
          parsed.stats = parsed.stats.map((stat: any) => {
            if (stat.label === 'Expected Attendees' && (stat.value === 6000 || stat.value === 20000)) {
              migrated = true;
              return { ...stat, value: 15000, suffix: '-20,000' };
            }
            if (stat.label === 'Expected Visitors' && stat.value === 15000) {
              migrated = true;
              return { ...stat, label: 'Expected Attendees' };
            }
            return stat;
          });
          if (migrated) {
            localStorage.setItem('websiteContent', JSON.stringify(parsed));
          }
        }

        setContentData({
          ...defaultContent,
          ...parsed,
          hero: {
            ...defaultContent.hero,
            ...(parsed.hero || {})
          },
          eventInfo: {
            ...defaultContent.eventInfo,
            ...(parsed.eventInfo || {})
          }
        });
      } catch (error) {
        console.error('Error loading content from localStorage:', error);
      }
    }
  }, []);

  // Listen to storage events to keep tabs synchronized in real-time
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'websiteContent' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setContentData({
            ...defaultContent,
            ...parsed,
            hero: {
              ...defaultContent.hero,
              ...(parsed.hero || {})
            },
            eventInfo: {
              ...defaultContent.eventInfo,
              ...(parsed.eventInfo || {})
            }
          });
        } catch (err) {
          console.error('Error parsing synced storage:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save content to localStorage
  const saveContentToStorage = (data: ContentData) => {
    try {
      const jsonString = JSON.stringify(data);
      // Check if data is too large for localStorage (typically 5-10MB limit)
      if (jsonString.length > 4 * 1024 * 1024) { // 4MB limit
        console.warn('Content data is large, may exceed localStorage limits');
      }
      localStorage.setItem('websiteContent', jsonString);
    } catch (error) {
      console.error('Error saving content to localStorage:', error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded. Consider reducing image sizes or using server storage.');
      }
    }
  };

  // Update hero content
  const updateHero = (hero: HeroContent) => {
    const updatedContent = { ...contentData, hero };
    setContentData(updatedContent);
    saveContentToStorage(updatedContent);
  };

  // Update stats
  const updateStats = (stats: StatItem[]) => {
    const updatedContent = { ...contentData, stats };
    setContentData(updatedContent);
    saveContentToStorage(updatedContent);
  };

  // Update event info
  const updateEventInfo = (eventInfo: EventInfo) => {
    const updatedContent = { ...contentData, eventInfo };
    setContentData(updatedContent);
    saveContentToStorage(updatedContent);
  };

  // Update entire content data
  const updateContent = (newContent: Partial<ContentData>) => {
    const updatedContent = { ...contentData, ...newContent };
    setContentData(updatedContent);
    saveContentToStorage(updatedContent);
  };

  // Reset to default content
  const resetToDefault = () => {
    setContentData(defaultContent);
    saveContentToStorage(defaultContent);
  };

  // Get active stats only
  const getActiveStats = () => {
    return contentData.stats.filter(stat => stat.isActive);
  };

  return {
    contentData,
    loading,
    error,
    updateHero,
    updateStats,
    updateEventInfo,
    updateContent,
    resetToDefault,
    getActiveStats,
    setLoading,
    setError
  };
};

export default useContentManagement;
