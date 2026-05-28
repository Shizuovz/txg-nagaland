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
import useContentManagement, { StatItem } from '@/hooks/useContentManagement';
import FirebaseStorageService from '@/services/firebaseStorageService';
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
    updateHero,
    updateStats,
    updateEventInfo,
    resetToDefault,
    setLoading: setHookLoading
  } = useContentManagement();
  
  const { hero, stats, eventInfo } = contentData;

  // Editing states
  const [editingStat, setEditingStat] = useState<string | null>(null);

  const iconOptions = [
    { value: 'trophy', label: '🏆 Trophy' },
    { value: 'users', label: '👥 Users' },
    { value: 'trending-up', label: '📈 Trending Up' },
    { value: 'gamepad', label: '🎮 Gamepad' },
    { value: 'calendar', label: '📅 Calendar' },
    { value: 'map-pin', label: '📍 Location' }
  ];

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
    updateHero({
      ...hero,
      image: '/images/carousel/hero1.png',
      video: '/videos/gaming-hero.mp4'
    });
    toast.success('Hero media reset to defaults');
  };

  const handleSaveAllChanges = async () => {
    setLoading(true);
    setHookLoading(true);
    try {
      // Simulate API call to save content
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Content is already being saved automatically through the hook
      console.log('Content saved:', { hero, stats, eventInfo });
      
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

  const handleHeroImageUpload = async (file: File) => {
    try {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return;
      }
      
      const compressedImage = await compressImage(file);
      updateHero({
        ...(hero || { title: '', subtitle: '', description: '', image: '', video: '' }),
        image: compressedImage
      });
      toast.success('Fallback image uploaded and compressed successfully');
    } catch (error) {
      console.error('Error uploading hero image:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleHeroVideoUpload = async (file: File) => {
    try {
      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast.error('Video size must be less than 50MB');
        return;
      }
      
      setLoading(true);
      toast.info('Uploading hero video to Firebase Storage, please wait...');
      
      const fileName = `hero-video-${Date.now()}.mp4`;
      const uploadedFile = await FirebaseStorageService.uploadFile('videos', fileName, file);
      
      updateHero({
        ...(hero || { title: '', subtitle: '', description: '', image: '', video: '' }),
        video: uploadedFile.url
      });
      toast.success('Hero video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading hero video:', error);
      toast.error('Failed to upload video to Firebase Storage');
    } finally {
      setLoading(false);
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
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Hero Section Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hero-title">Title</Label>
                      <Input
                        id="hero-title"
                        value={hero?.title || ''}
                        onChange={(e) => updateHero({
                          ...(hero || { title: '', subtitle: '', description: '', image: '', video: '' }),
                          title: e.target.value
                        })}
                        placeholder="TECH X Gaming"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle">Subtitle</Label>
                      <Input
                        id="hero-subtitle"
                        value={hero?.subtitle || ''}
                        onChange={(e) => updateHero({
                          ...(hero || { title: '', subtitle: '', description: '', image: '', video: '' }),
                          subtitle: e.target.value
                        })}
                        placeholder="Expo Nagaland"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="hero-description">Description</Label>
                    <Textarea
                      id="hero-description"
                      value={hero?.description || ''}
                      onChange={(e) => updateHero({
                        ...(hero || { title: '', subtitle: '', description: '', image: '', video: '' }),
                        description: e.target.value
                      })}
                      rows={3}
                      placeholder="Experience the ultimate gaming festival..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hero-image">Fallback Image (Poster)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="hero-image"
                          value={hero?.image || ''}
                          onChange={(e) => updateHero({
                            ...(hero || { title: '', subtitle: '', description: '', image: '', video: '' }),
                            image: e.target.value
                          })}
                          placeholder="/images/carousel/hero1.png"
                        />
                        <Button
                          variant="outline"
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) handleHeroImageUpload(file);
                            };
                            input.click();
                          }}
                        >
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="hero-video">Looping Background Video</Label>
                      <div className="flex gap-2">
                        <Input
                          id="hero-video"
                          value={hero?.video || ''}
                          onChange={(e) => updateHero({
                            ...(hero || { title: '', subtitle: '', description: '', image: '', video: '' }),
                            video: e.target.value
                          })}
                          placeholder="/videos/gaming-hero.mp4"
                          disabled={loading}
                        />
                        <Button
                          variant="outline"
                          disabled={loading}
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'video/*';
                            input.onchange = async (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) handleHeroVideoUpload(file);
                            };
                            input.click();
                          }}
                        >
                          <Upload className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
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
