import { useState, useEffect } from 'react';

// Types for content management
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gradient: string;
  particles: string[];
  isActive: boolean;
  order: number;
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
  heroSlides: HeroSlide[];
  stats: StatItem[];
  eventInfo: EventInfo;
}

const useContentManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default content data
  const defaultContent: ContentData = {
    heroSlides: [
      {
        id: '1',
        title: 'TECH X Gaming',
        subtitle: 'Expo Nagaland',
        description: 'Experience the ultimate gaming festival in Northeast India. Join us for tournaments, showcases, and the future of gaming.',
        image: '/images/carousel/hero1.png',
        gradient: 'from-yellow-900/80 via-amber-900/80 to-orange-900/80',
        particles: ['#FFD700', '#FFA500', '#FFFF00'],
        isActive: true,
        order: 1
      },
      {
        id: '2',
        title: 'Gaming Tournaments',
        subtitle: 'Compete & Win',
        description: 'Join intense gaming competitions with massive prize pools and professional esports events.',
        image: '/images/carousel/hero2.png',
        gradient: 'from-blue-900/80 via-cyan-900/80 to-indigo-900/80',
        particles: ['#00FFFF', '#4285F4', '#74A9FF'],
        isActive: true,
        order: 2
      },
      {
        id: '3',
        title: 'Tech Innovation',
        subtitle: 'Future of Gaming',
        description: 'Experience cutting-edge gaming technology, VR experiences, and the latest in gaming innovation.',
        image: '/images/carousel/hero3.png',
        gradient: 'from-purple-900/80 via-violet-900/80 to-pink-900/80',
        particles: ['#FF00FF', '#9333EA', '#EC4899'],
        isActive: true,
        order: 3
      }
    ],
    stats: [
      { id: '1', value: 300000, prefix: '₹', suffix: '', label: 'Prize Pool', iconId: 'trophy', isActive: true },
      { id: '2', value: 20000, prefix: '', suffix: '-30,000', label: 'Expected Attendees', iconId: 'users', isActive: true },
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

  // State for content data (using localStorage for persistence)
  const [contentData, setContentData] = useState<ContentData>(defaultContent);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      try {
        setContentData(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading content from localStorage:', error);
      }
    }
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

  // Update hero slides
  const updateHeroSlides = (slides: HeroSlide[]) => {
    const updatedContent = { ...contentData, heroSlides: slides };
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

  // Get active hero slides only
  const getActiveHeroSlides = () => {
    return contentData.heroSlides
      .filter(slide => slide.isActive)
      .sort((a, b) => a.order - b.order);
  };

  // Get active stats only
  const getActiveStats = () => {
    return contentData.stats.filter(stat => stat.isActive);
  };

  return {
    contentData,
    loading,
    error,
    updateHeroSlides,
    updateStats,
    updateEventInfo,
    updateContent,
    resetToDefault,
    getActiveHeroSlides,
    getActiveStats,
    setLoading,
    setError
  };
};

export default useContentManagement;
