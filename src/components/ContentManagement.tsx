import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import useContentManagement, { HeroSlide, StatItem } from '@/hooks/useContentManagement';
import { 
  Image, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Upload, 
  Eye, 
  EyeOff,
  RefreshCw,
  Settings,
  Palette,
  BarChart3,
  FileText,
  Calendar
} from 'lucide-react';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Use the content management hook
  const {
    contentData,
    updateHeroSlides,
    updateStats,
    updateEventInfo,
    resetToDefault,
    setLoading: setHookLoading
  } = useContentManagement();
  
  const { heroSlides, stats, eventInfo } = contentData;

  // Editing states
  const [editingSlide, setEditingSlide] = useState<string | null>(null);
  const [editingStat, setEditingStat] = useState<string | null>(null);

  const gradientOptions = [
    'from-yellow-900/80 via-amber-900/80 to-orange-900/80',
    'from-blue-900/80 via-cyan-900/80 to-indigo-900/80',
    'from-purple-900/80 via-violet-900/80 to-pink-900/80',
    'from-green-900/80 via-emerald-900/80 to-teal-900/80',
    'from-red-900/80 via-rose-900/80 to-pink-900/80'
  ];

  const iconOptions = [
    { value: 'trophy', label: '🏆 Trophy' },
    { value: 'users', label: '👥 Users' },
    { value: 'trending-up', label: '📈 Trending Up' },
    { value: 'gamepad', label: '🎮 Gamepad' },
    { value: 'calendar', label: '📅 Calendar' },
    { value: 'map-pin', label: '📍 Location' }
  ];

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: Date.now().toString(),
      title: 'New Slide',
      subtitle: 'Subtitle',
      description: 'Description',
      image: '/images/carousel/placeholder.png',
      gradient: gradientOptions[0],
      particles: ['#FFD700', '#FFA500'],
      isActive: true,
      order: heroSlides.length + 1
    };
    updateHeroSlides([...heroSlides, newSlide]);
    toast.success('New slide added');
  };

  const handleUpdateSlide = (slideId: string, updates: Partial<HeroSlide>) => {
    const updatedSlides = heroSlides.map(slide => 
      slide.id === slideId ? { ...slide, ...updates } : slide
    );
    updateHeroSlides(updatedSlides);
    toast.success('Slide updated');
  };

  const handleDeleteSlide = (slideId: string) => {
    const updatedSlides = heroSlides.filter(slide => slide.id !== slideId);
    updateHeroSlides(updatedSlides);
    toast.success('Slide deleted');
  };

  const handleAddStat = () => {
    const newStat: StatItem = {
      id: Date.now().toString(),
      value: 1000,
      prefix: '',
      suffix: '+',
      label: 'New Stat',
      iconId: 'trophy',
      isActive: true
    };
    updateStats([...stats, newStat]);
    toast.success('New stat added');
  };

  const handleUpdateStat = (statId: string, updates: Partial<StatItem>) => {
    const updatedStats = stats.map(stat => 
      stat.id === statId ? { ...stat, ...updates } : stat
    );
    updateStats(updatedStats);
    toast.success('Stat updated');
  };

  const handleDeleteStat = (statId: string) => {
    const updatedStats = stats.filter(stat => stat.id !== statId);
    updateStats(updatedStats);
    toast.success('Stat deleted');
  };

  const handleClearCache = () => {
    localStorage.removeItem('websiteContent');
    toast.success('Cache cleared successfully');
    // Reload the page to reset to defaults
    window.location.reload();
  };

  const handleResetImages = () => {
    const defaultSlides = [
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
    ];
    updateHeroSlides(defaultSlides);
    toast.success('Images reset to defaults');
  };

  const handleSaveAllChanges = async () => {
    setLoading(true);
    setHookLoading(true);
    try {
      // Simulate API call to save content
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Content is already being saved automatically through the hook
      console.log('Content saved:', { heroSlides, stats, eventInfo });
      
      toast.success('All changes saved successfully!');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setLoading(false);
      setHookLoading(false);
    }
  };

  const compressImage = (file: File, maxWidth = 1920, maxHeight = 1080, quality = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      const img = document.createElement('img');
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (slideId: string, file: File) => {
    try {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return;
      }
      
      // Compress image to base64
      const compressedImage = await compressImage(file);
      handleUpdateSlide(slideId, { image: compressedImage });
      toast.success('Image uploaded and compressed successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Management</h1>
              <p className="text-gray-600">Manage website content, hero carousel, stats, and event information</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2"
              >
                {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </Button>
              <Button
                onClick={handleSaveAllChanges}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save All Changes'}
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="hero" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Hero Carousel
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Statistics
              </TabsTrigger>
              <TabsTrigger value="event" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Event Info
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Hero Carousel Management */}
            <TabsContent value="hero" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Hero Carousel Slides
                    </CardTitle>
                    <Button onClick={handleAddSlide} className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Slide
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {heroSlides.map((slide, index) => (
                    <Card key={slide.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Slide {index + 1}</Badge>
                            {slide.isActive && <Badge className="bg-green-100 text-green-800">Active</Badge>}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingSlide(editingSlide === slide.id ? null : slide.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteSlide(slide.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {editingSlide === slide.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`title-${slide.id}`}>Title</Label>
                                <Input
                                  id={`title-${slide.id}`}
                                  value={slide.title}
                                  onChange={(e) => handleUpdateSlide(slide.id, { title: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`subtitle-${slide.id}`}>Subtitle</Label>
                                <Input
                                  id={`subtitle-${slide.id}`}
                                  value={slide.subtitle}
                                  onChange={(e) => handleUpdateSlide(slide.id, { subtitle: e.target.value })}
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor={`description-${slide.id}`}>Description</Label>
                              <Textarea
                                id={`description-${slide.id}`}
                                value={slide.description}
                                onChange={(e) => handleUpdateSlide(slide.id, { description: e.target.value })}
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`gradient-${slide.id}`}>Gradient</Label>
                                <Select
                                  value={slide.gradient}
                                  onValueChange={(value) => handleUpdateSlide(slide.id, { gradient: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {gradientOptions.map((gradient) => (
                                      <SelectItem key={gradient} value={gradient}>
                                        <div className={`w-4 h-4 rounded bg-gradient-to-r ${gradient}`} />
                                        {gradient}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor={`image-${slide.id}`}>Image</Label>
                                <div className="flex gap-2">
                                  <Input
                                    id={`image-${slide.id}`}
                                    value={slide.image}
                                    onChange={(e) => handleUpdateSlide(slide.id, { image: e.target.value })}
                                    placeholder="/images/carousel/hero.png"
                                  />
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      const input = document.createElement('input');
                                      input.type = 'file';
                                      input.accept = 'image/*';
                                      input.onchange = (e) => {
                                        const file = (e.target as HTMLInputElement).files?.[0];
                                        if (file) handleImageUpload(slide.id, file);
                                      };
                                      input.click();
                                    }}
                                  >
                                    <Upload className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`active-${slide.id}`}
                                checked={slide.isActive}
                                onChange={(e) => handleUpdateSlide(slide.id, { isActive: e.target.checked })}
                              />
                              <Label htmlFor={`active-${slide.id}`}>Active</Label>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">{slide.title}</h3>
                              <span className="text-sm text-gray-500">{slide.subtitle}</span>
                            </div>
                            <p className="text-gray-600">{slide.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="truncate max-w-xs">
                                Image: {slide.image.startsWith('data:') ? 'Base64 Image' : slide.image}
                              </span>
                              <div className={`w-8 h-8 rounded bg-gradient-to-r ${slide.gradient}`} />
                              {slide.image.startsWith('data:') && (
                                <Badge variant="secondary" className="text-xs">
                                  Uploaded
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Statistics Management */}
            <TabsContent value="stats" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Event Statistics
                    </CardTitle>
                    <Button onClick={handleAddStat} className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Stat
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.map((stat, index) => (
                    <Card key={stat.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Stat {index + 1}</Badge>
                            {stat.isActive && <Badge className="bg-green-100 text-green-800">Active</Badge>}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingStat(editingStat === stat.id ? null : stat.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteStat(stat.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {editingStat === stat.id ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor={`value-${stat.id}`}>Value</Label>
                              <Input
                                id={`value-${stat.id}`}
                                type="number"
                                value={stat.value}
                                onChange={(e) => handleUpdateStat(stat.id, { value: parseInt(e.target.value) })}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`prefix-${stat.id}`}>Prefix</Label>
                              <Input
                                id={`prefix-${stat.id}`}
                                value={stat.prefix}
                                onChange={(e) => handleUpdateStat(stat.id, { prefix: e.target.value })}
                                placeholder="₹, $, etc."
                              />
                            </div>
                            <div>
                              <Label htmlFor={`suffix-${stat.id}`}>Suffix</Label>
                              <Input
                                id={`suffix-${stat.id}`}
                                value={stat.suffix}
                                onChange={(e) => handleUpdateStat(stat.id, { suffix: e.target.value })}
                                placeholder="+, k, M, etc."
                              />
                            </div>
                            <div>
                              <Label htmlFor={`label-${stat.id}`}>Label</Label>
                              <Input
                                id={`label-${stat.id}`}
                                value={stat.label}
                                onChange={(e) => handleUpdateStat(stat.id, { label: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor={`icon-${stat.id}`}>Icon</Label>
                              <Select
                                value={stat.iconId}
                                onValueChange={(value) => handleUpdateStat(stat.id, { iconId: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {iconOptions.map((icon) => (
                                    <SelectItem key={icon.value} value={icon.value}>
                                      {icon.label} {icon.value}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`stat-active-${stat.id}`}
                                checked={stat.isActive}
                                onChange={(e) => handleUpdateStat(stat.id, { isActive: e.target.checked })}
                              />
                              <Label htmlFor={`stat-active-${stat.id}`}>Active</Label>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-2xl font-bold">
                                {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                              </div>
                              <div className="text-gray-600">{stat.label}</div>
                            </div>
                            <div className="text-sm text-gray-500">
                              Icon: {stat.iconId}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Event Information Management */}
            <TabsContent value="event" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Event Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventName">Event Name</Label>
                      <Input
                        id="eventName"
                        value={eventInfo.eventName}
                        onChange={(e) => updateEventInfo({ ...eventInfo, eventName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventDate">Event Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={eventInfo.eventDate}
                        onChange={(e) => updateEventInfo({ ...eventInfo, eventDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventVenue">Event Venue</Label>
                      <Input
                        id="eventVenue"
                        value={eventInfo.eventVenue}
                        onChange={(e) => updateEventInfo({ ...eventInfo, eventVenue: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={eventInfo.contactEmail}
                        onChange={(e) => updateEventInfo({ ...eventInfo, contactEmail: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        value={eventInfo.contactPhone}
                        onChange={(e) => updateEventInfo({ ...eventInfo, contactPhone: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input
                          id="twitter"
                          value={eventInfo.socialLinks.twitter}
                          onChange={(e) => updateEventInfo({ 
                            ...eventInfo, 
                            socialLinks: { ...eventInfo.socialLinks, twitter: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          value={eventInfo.socialLinks.instagram}
                          onChange={(e) => updateEventInfo({ 
                            ...eventInfo, 
                            socialLinks: { ...eventInfo.socialLinks, instagram: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="youtube">YouTube</Label>
                        <Input
                          id="youtube"
                          value={eventInfo.socialLinks.youtube}
                          onChange={(e) => updateEventInfo({ 
                            ...eventInfo, 
                            socialLinks: { ...eventInfo.socialLinks, youtube: e.target.value }
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="discord">Discord</Label>
                        <Input
                          id="discord"
                          value={eventInfo.socialLinks.discord}
                          onChange={(e) => updateEventInfo({ 
                            ...eventInfo, 
                            socialLinks: { ...eventInfo.socialLinks, discord: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Content Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Auto-save</h3>
                        <p className="text-sm text-gray-600">Automatically save changes every 30 seconds</p>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Preview Mode</h3>
                        <p className="text-sm text-gray-600">Show live preview of changes</p>
                      </div>
                      <input type="checkbox" checked={previewMode} onChange={(e) => setPreviewMode(e.target.checked)} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Image Optimization</h3>
                        <p className="text-sm text-gray-600">Automatically optimize uploaded images</p>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-semibold mb-4">Cache Management</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleClearCache}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Clear Cache
                      </Button>
                      <Button variant="outline" onClick={handleResetImages}>
                        <Image className="w-4 h-4 mr-2" />
                        Reset Images
                      </Button>
                      <Button variant="outline" onClick={resetToDefault}>
                        <FileText className="w-4 h-4 mr-2" />
                        Reset All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentManagement;
