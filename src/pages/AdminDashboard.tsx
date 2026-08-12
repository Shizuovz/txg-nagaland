import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Gamepad2, Search, RefreshCw, FileText, Settings, Download, Eye, Trash2, ExternalLink } from 'lucide-react';
import GamingIcon, { GamingIcons } from "@/components/GamingIcons";
import { useRegistrationAPI } from '@/hooks/useRegistrationAPI';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { TeamRegistration, SponsorRegistration, MediaPersonRegistration } from '@/lib/firebase';
import { sendApprovalEmail, getApprovalEmailContent } from '@/utils/firebaseEmailService';
import ManualDataEntry from '@/components/ManualDataEntry';
import ContentManagement from '@/components/ContentManagement';
import firebaseStorageService from '@/services/firebaseStorageService';

// Helper function to format dates in day/month/year format
const formatDate = (dateInput: string | Date) => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper function to get mini tournament game name from registration message
const getMiniTournamentGame = (registration: any): string => {
  if (!registration.message) return 'Unknown';
  const gameMatch = registration.message.match(/Game:\s*([^\n]+)/);
  return gameMatch ? gameMatch[1].trim() : 'Unknown';
};

// Separate component for passport photo to properly use hooks
const PassportPhotoDisplay = ({ registrationId }: { registrationId: string }) => {
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const url = await firebaseStorageService.getPassportPhotoURL(registrationId);
        setPhotoURL(url);
      } catch (error) {
        console.error('Error fetching passport photo:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();
  }, [registrationId]);
  
  if (loading) {
    return <span className="text-gray-500 text-sm">Loading...</span>;
  }
  
  if (!photoURL) {
    return <span className="text-gray-500 text-sm">No photo available</span>;
  }
  
  return (
    <div className="space-y-2">
      <img 
        src={photoURL} 
        alt="Passport Photo"
        className="w-24 h-24 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => window.open(photoURL, '_blank')}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <Button
        size="sm"
        variant="outline"
        className="text-xs h-7 px-2 w-full"
        onClick={async () => {
          if (photoURL) {
            await firebaseStorageService.downloadFile(photoURL, `${registrationId}_passport_photo.jpg`);
          } else {
            alert('Passport photo not found');
          }
        }}
      >
        <Download className="w-3 h-3 mr-1" />
        Download
      </Button>
    </div>
  );
};

const AdminDashboard = () => {
  const { adminUser, logout } = useAdminAuth();
  const { 
    loading, 
    getGames,
    getColleges,
    getSponsorshipTiers,
    getDashboardStats,
    getAllTeamRegistrations,
    getAllSponsorRegistrations,
    getAllVisitorRegistrations,
    getAllMediaRegistrations,
    updateTeamStatus,
    updateSponsorStatus,
    updateVisitorStatus,
    updateMediaStatus,
    deleteTeamRegistration,
    deleteSponsorRegistration,
    deleteMediaRegistration,
    deleteVisitorRegistration
  } = useRegistrationAPI();

  const [stats, setStats] = useState<any>(null);
  const [teamRegistrations, setTeamRegistrations] = useState<TeamRegistration[]>([]);
  const [sponsorRegistrations, setSponsorRegistrations] = useState<SponsorRegistration[]>([]);
  const [mediaRegistrations, setMediaRegistrations] = useState<MediaPersonRegistration[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [sponsorshipTiers, setSponsorshipTiers] = useState<any[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Advanced filters for each registration type
  const [teamFilters, setTeamFilters] = useState({
    game: '',
    college: '',
    status: 'all',
    dateRange: 'all'
  });
  
  const [sponsorFilters, setSponsorFilters] = useState({
    tier: '',
    status: 'all',
    dateRange: 'all'
  });
  
  const [mediaFilters, setMediaFilters] = useState({
    status: 'all',
    dateRange: 'all'
  });

  // Filtered registrations for different types
  const [cosplayerRegistrations, setCosplayerRegistrations] = useState<any[]>([]);
  const [vendorRegistrations, setVendorRegistrations] = useState<SponsorRegistration[]>([]);
  const [exhibitorRegistrations, setExhibitorRegistrations] = useState<SponsorRegistration[]>([]);
  const [visitorRegistrations, setVisitorRegistrations] = useState<any[]>([]);
  const [miniTournamentRegistrations, setMiniTournamentRegistrations] = useState<any[]>([]);
  const [digitalArtRegistrations, setDigitalArtRegistrations] = useState<any[]>([]);
  const [aiVideoRegistrations, setAiVideoRegistrations] = useState<any[]>([]);
  const [mobaOpenRegistrations, setMobaOpenRegistrations] = useState<TeamRegistration[]>([]);

  // Mini Tournament Games List
  const miniTournamentGames = [
    'Tekken 8',
    'Street Fighter 6',
    'Clash Royale',
    'FC 26',
    'Ludo',
    'Dirt Rally 2.0'
  ];

  // State for selected mini game tab
  const [selectedMiniGame, setSelectedMiniGame] = useState<string>('all');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setDashboardLoading(true);
    try {
      const [statsData, teams, sponsors, visitors, media, gamesData, sponsorshipTiersData] = await Promise.all([
        getDashboardStats(),
        getAllTeamRegistrations(),
        getAllSponsorRegistrations(),
        getAllVisitorRegistrations(),
        getAllMediaRegistrations(),
        getGames(),
        getSponsorshipTiers()
      ]);

      setStats(statsData);
      const allTeams = teams || [];
      
      // MOBA 5v5 Open Tournament: Team registrations with MOB prefix in registrationId or teamCategory 'open'
      const mobaOpen = allTeams.filter(t => 
        (t.registrationId && t.registrationId.startsWith('MOB')) || 
        (t.teamCategory === 'open')
      );
      
      // Inter-College: Teams that are NOT in the MOBA Open category
      const interCollege = allTeams.filter(t => 
        !(t.registrationId && t.registrationId.startsWith('MOB')) && 
        (t.teamCategory !== 'open')
      );

      setTeamRegistrations(interCollege);
      setMobaOpenRegistrations(mobaOpen);
      
      setSponsorRegistrations(sponsors || []);
      setVisitorRegistrations(visitors || []);
      setMediaRegistrations(media || []);
      setGames(gamesData || []);
      setSponsorshipTiers(sponsorshipTiersData || []);

      // Filter registrations by type
      // Cosplayers: Visitor registrations with COS prefix in registrationId
      const cosplayers = (visitors || []).filter(v => v.registrationId && v.registrationId.startsWith('COS'));
      setCosplayerRegistrations(cosplayers);

      // Vendors: Sponsor registrations with VEN prefix in registrationId or "Vendor Type:" in message
      const vendors = (sponsors || []).filter(s => 
        (s.registrationId && s.registrationId.startsWith('VEN')) || 
        (s.message && s.message.includes('Vendor Type:'))
      );
      setVendorRegistrations(vendors);

      // Exhibitors: Sponsor registrations with EXH prefix in registrationId
      const exhibitors = (sponsors || []).filter(s => s.registrationId && s.registrationId.startsWith('EXH'));
      setExhibitorRegistrations(exhibitors);

      // Mini Tournaments: Visitor registrations with MIN prefix in registrationId or "Game:" in message
      const miniTournaments = (visitors || []).filter(v => 
        (v.registrationId && v.registrationId.startsWith('MIN')) || 
        (v.message && v.message.includes('Game:'))
      );
      setMiniTournamentRegistrations(miniTournaments);

      // Digital Art: Visitor registrations with ART prefix
      const digitalArt = (visitors || []).filter(v => v.registrationId && v.registrationId.startsWith('ART'));
      setDigitalArtRegistrations(digitalArt);
      
      // AI Video: Visitor registrations with AIV prefix
      const aiVideo = (visitors || []).filter(v => v.registrationId && v.registrationId.startsWith('AIV'));
      setAiVideoRegistrations(aiVideo);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setDashboardLoading(false);
    }
  };

  const getGameName = (gameId: string) => {
    
    // Handle null/undefined/empty cases
    if (!gameId || gameId === '' || gameId === 'undefined' || gameId === 'null') {
      return 'Unknown Game';
    }
    
    // Ensure gameId is a string - most robust conversion
    let gameIdStr = '';
    
    try {
      if (gameId === null || gameId === undefined) {
        gameIdStr = '';
      } else if (typeof gameId === 'string') {
        gameIdStr = gameId;
      } else if (typeof gameId === 'number') {
        gameIdStr = (gameId as any).toString();
      } else if (typeof gameId === 'object') {
        // Handle different object structures
        if ((gameId as any).id) {
          gameIdStr = String((gameId as any).id);
        } else if ((gameId as any).gameId) {
          gameIdStr = String((gameId as any).gameId);
        } else {
          // Last resort - convert entire object to string and extract potential ID
          const objStr = JSON.stringify(gameId);
          // Try to extract ID from JSON string
          const idMatch = objStr.match(/"id":\s*"([^"]+)"/);
          if (idMatch && idMatch[1]) {
            gameIdStr = idMatch[1];
          } else {
            // Try to extract any string that looks like an ID
            const anyStringMatch = objStr.match(/"([^"]{4,})"/);
            if (anyStringMatch && anyStringMatch[1]) {
              gameIdStr = anyStringMatch[1];
            } else {
              gameIdStr = objStr; // Fallback to full JSON string
            }
          }
        }
      } else {
        gameIdStr = String(gameId);
      }
    } catch (error) {
      gameIdStr = String(gameId);
    }
    
    // Try to find in Firebase games first
    if (games.length > 0) {
      const foundGame = games.find(g => g.id === gameIdStr);
      if (foundGame) {
        return foundGame.name;
      }
    }
    
    // Direct fallback mapping for known problematic IDs
    const directMap: { [key: string]: string } = {
      '34t2nogh': 'BGMI',
      '123450': 'BGMI',
      '123451': 'Mobile Legends',
      '123452': 'BGMI',
      'nkf9ZYPZH9YQQ2MkBciB': 'BGMI',
      'T55Ke4o48q7zaOfw3SMj': 'Mobile Legends'
    };
    
    // Check direct mapping first
    if (directMap[gameIdStr]) {
      return directMap[gameIdStr];
    }
    
    // Pattern matching
    if (gameIdStr.includes('bgmi') || gameIdStr.includes('450') || gameIdStr.includes('nkf9')) {
      return 'BGMI';
    }
    if (gameIdStr.includes('mobile') || gameIdStr.includes('legends') || gameIdStr.includes('451') || gameIdStr.includes('T55Ke')) {
      return 'Mobile Legends';
    }
    
    return 'Unknown Game';
  };

  const getSponsorshipTierName = (tierId: string) => {
    // Handle null/undefined/empty cases
    if (!tierId || tierId === '' || tierId === 'undefined' || tierId === 'null') {
      return 'Unknown Tier';
    }
    
    // First try to find in loaded tiers
    const tier = sponsorshipTiers.find(t => t.id === tierId);
    if (tier && tier.name) {
      return tier.name;
    }
    
    // Fallback mapping for common tier IDs
    const tierMap: { [key: string]: string } = {
      '1': '🏆 TITLE SPONSOR',
      '2': '🥈 POWERED BY SPONSOR',
      '3': '🥉 ASSOCIATE SPONSOR',
      '4': '🎮 CATEGORY PARTNERS',
      'title': '🏆 TITLE SPONSOR',
      'powered': '🥈 POWERED BY SPONSOR',
      'associate': '🥉 ASSOCIATE SPONSOR',
      'category': '🎮 CATEGORY PARTNERS',
      'gold': '🏆 TITLE SPONSOR',
      'silver': '🥈 POWERED BY SPONSOR',
      'bronze': '🥉 ASSOCIATE SPONSOR',
      'platinum': '🎮 CATEGORY PARTNERS',
      'tier_1': '🏆 TITLE SPONSOR',
      'tier_2': '🥈 POWERED BY SPONSOR',
      'tier_3': '🥉 ASSOCIATE SPONSOR',
      'tier_4': '🎮 CATEGORY PARTNERS'
    };
    
    const fallbackName = tierMap[tierId] || 'Unknown Tier';
    return fallbackName;
  };

  // Status Management Functions
  const handleStatusUpdate = async (id: string, type: 'inter-college' | 'moba-open' | 'sponsor' | 'cosplayer' | 'vendor' | 'exhibitor' | 'media' | 'mini-tournament' | 'digital-art' | 'ai-video', status: 'pending' | 'approved' | 'rejected' | 'withdrawn') => {
    let success = false;
    let registrationData: any = null;
    
    try {
      // Get registration data before updating for email
      switch (type) {
        case 'inter-college':
          registrationData = teamRegistrations.find(t => t.id === id);
          success = await updateTeamStatus(id, status);
          break;
        case 'moba-open':
          registrationData = mobaOpenRegistrations.find(t => t.id === id);
          success = await updateTeamStatus(id, status);
          break;
        case 'sponsor':
          registrationData = sponsorRegistrations.find(s => s.id === id);
          success = await updateSponsorStatus(id, status);
          break;
        case 'cosplayer':
          registrationData = cosplayerRegistrations.find(c => c.id === id);
          success = await updateVisitorStatus(id, status);
          break;
        case 'vendor':
          registrationData = vendorRegistrations.find(v => v.id === id);
          success = await updateSponsorStatus(id, status);
          break;
        case 'exhibitor':
          registrationData = exhibitorRegistrations.find(e => e.id === id);
          success = await updateSponsorStatus(id, status);
          break;
        case 'media':
          registrationData = mediaRegistrations.find(m => m.id === id);
          success = await updateMediaStatus(id, status);
          break;
        case 'mini-tournament':
          registrationData = miniTournamentRegistrations.find(m => m.id === id);
          success = await updateVisitorStatus(id, status);
          break;
        case 'digital-art':
          registrationData = digitalArtRegistrations.find(m => m.id === id);
          success = await updateVisitorStatus(id, status);
          break;
        case 'ai-video':
          registrationData = aiVideoRegistrations.find(m => m.id === id);
          success = await updateVisitorStatus(id, status);
          break;
      }
      
      if (success) {
        // Send email notification for approval/rejection
        if ((status === 'approved' || status === 'rejected') && registrationData) {
          // Create a copy of registration data with the correct registration type
          let finalRegistrationType = type;
          
          // Map admin dashboard types to email service types
          switch (type) {
            case 'inter-college':
              finalRegistrationType = 'college'; 
              break;
            case 'moba-open':
              finalRegistrationType = 'open_category';
              break;
            case 'sponsor':
              finalRegistrationType = 'sponsor';
              break;
            case 'cosplayer':
              finalRegistrationType = 'cosplayer';
              break;
            case 'vendor':
              finalRegistrationType = 'vendor';
              break;
            case 'exhibitor':
              finalRegistrationType = 'exhibitor';
              break;
            case 'media':
              finalRegistrationType = 'media';
              break;
          }
          
          const registrationDataWithType = {
            ...registrationData,
            registrationType: finalRegistrationType
          };
          
          const emailData = getApprovalEmailContent(registrationDataWithType, status);
          const emailSent = await sendApprovalEmail(emailData);
          if (emailSent) {
            console.log(`Email notification sent for ${status} registration`);
          } else {
            console.error('Failed to send email notification');
          }
        }
        
        // Reload data to reflect changes
        loadDashboardData();
      } else {
        console.error('Status update failed');
      }
    } catch (error) {
      console.error('Error in handleStatusUpdate:', error);
    }
  };

  // Delete Registration Function
  const handleDeleteRegistration = async (id: string, type: 'inter-college' | 'moba-open' | 'sponsor' | 'cosplayer' | 'vendor' | 'exhibitor' | 'media' | 'mini-tournament' | 'digital-art' | 'ai-video') => {
    if (!window.confirm('Are you sure you want to permanently delete this registration? This action cannot be undone.')) {
      return;
    }
    
    try {
      let result = null;
      switch (type) {
        case 'inter-college':
        case 'moba-open':
          result = await deleteTeamRegistration(id);
          break;
        case 'sponsor':
        case 'vendor':
        case 'exhibitor':
          result = await deleteSponsorRegistration(id);
          break;
        case 'cosplayer':
        case 'mini-tournament':
        case 'digital-art':
        case 'ai-video':
          result = await deleteVisitorRegistration(id);
          break;
        case 'media':
          result = await deleteMediaRegistration(id);
          break;
      }
      
      // If result is truthy, it means success (handleAPIResponse returns data on success, null on failure)
      if (result) {
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error deleting registration:', error);
    }
  };

  // Bulk Delete Functions
  const handleBulkDelete = async (type: 'all' | 'teams' | 'sponsors' | 'cosplayers' | 'vendors' | 'exhibitors' | 'media') => {
    const confirmMessage = {
      all: 'Are you sure you want to PERMANENTLY DELETE ALL registration data? This action cannot be undone and will remove data from the database.',
      teams: 'Are you sure you want to PERMANENTLY DELETE all team registrations? This action cannot be undone and will remove data from the database.',
      sponsors: 'Are you sure you want to PERMANENTLY DELETE all sponsor registrations? This action cannot be undone and will remove data from the database.',
      cosplayers: 'Are you sure you want to PERMANENTLY DELETE all cosplayer registrations? This action cannot be undone and will remove data from the database.',
      vendors: 'Are you sure you want to PERMANENTLY DELETE all vendor registrations? This action cannot be undone and will remove data from the database.',
      exhibitors: 'Are you sure you want to PERMANENTLY DELETE all exhibitor registrations? This action cannot be undone and will remove data from the database.',
      media: 'Are you sure you want to PERMANENTLY DELETE all media registrations? This action cannot be undone and will remove data from the database.'
    };

    if (!window.confirm(confirmMessage[type])) {
      return;
    }

    // Second confirmation for safety
    if (!window.confirm('WARNING: This will PERMANENTLY DELETE the data from the database. This action CANNOT BE UNDONE. Click OK to confirm.')) {
      return;
    }

    try {
      const registrationsToDelete = {
        teams: teamRegistrations,
        sponsors: getPureSponsorRegistrations(),
        cosplayers: cosplayerRegistrations,
        vendors: vendorRegistrations,
        exhibitors: exhibitorRegistrations,
        media: mediaRegistrations
      };

      const targets = type === 'all' 
        ? [...registrationsToDelete.teams, ...registrationsToDelete.sponsors, ...registrationsToDelete.cosplayers, ...registrationsToDelete.vendors, ...registrationsToDelete.exhibitors, ...registrationsToDelete.media]
        : registrationsToDelete[type];

      const deletePromises = targets.map(async (reg) => {
        if ('teamName' in reg) {
          return deleteTeamRegistration(reg.id);
        } else if ('companyName' in reg) {
          return deleteSponsorRegistration(reg.id);
        } else if ('fullName' in reg && 'organization' in reg) {
          return deleteMediaRegistration(reg.id);
        }
      });

      const results = await Promise.all(deletePromises);
      
      alert(`Successfully PERMANENTLY DELETED ${targets.length} registrations from the database.`);
      loadDashboardData();
    } catch (error) {
      console.error('Error in permanent bulk delete:', error);
      alert('Error permanently deleting data. Please try again.');
    }
  };

  // CSV Export Functions
  const downloadCSV = (data: any[], filename: string, headers: string[]) => {
    // Convert data to CSV format
    const csvContent = [
      headers.join(','), // Header row
      ...data.map(row => 
        headers.map(header => {
          const value = row[header] || '';
          // Escape commas and quotes in values
          const escapedValue = String(value).replace(/"/g, '""');
          return `"${escapedValue}"`;
        }).join(',')
      )
    ].join('\n');

    // Create blob with UTF-8 BOM so Excel opens it correctly
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadTeamRegistrationsCSV = () => {
    const headers = [
      'registrationId',
      'teamName', 
      'registrationType',
      'collegeName',
      'teamCategory',
      'captainName',
      'captainEmail', 
      'captainPhone',
      'address',
      'city',
      'state',
      'pinCode',
      'gameId',
      'status',
      'teamMembersCount',
      'teamMembers_FullNames',
      'teamMembers_IGNs',
      'teamMembers_IDs',
      'substitute_FullName',
      'substitute_IGN',
      'substitute_ID',
      'hasSubstitute',
      'coordinatorName',
      'coordinatorPhone',
      'additionalMessage',
      'termsAccepted',
      'institutionDeclaration',
      'livestreamConsent',
      'createdAt',
      'updatedAt'
    ];

    const csvData = filterTeamRegistrations(teamRegistrations).map(team => {
      // Extract team members names, IGNs and IDs
      const teamMemberFullNames = team.teamMembers?.map(member => member.fullName || '').join('; ') || '';
      const teamMemberIGNs = team.teamMembers?.map(member => member.ign || '').join('; ') || '';
      const teamMemberIDs = team.teamMembers?.map(member => member.gameId || '').join('; ') || '';
      
      // Extract substitute details if available
      const substituteFullName = team.substitute?.fullName || '';
      const substituteIGN = team.substitute?.ign || '';
      const substituteID = team.substitute?.gameId || '';

      return {
        registrationId: team.registrationId || '',
        teamName: team.teamName || '',
        registrationType: team.registrationType || '',
        collegeName: team.collegeName || '',
        teamCategory: team.teamCategory || '',
        captainName: team.captainName || '',
        captainEmail: team.captainEmail || '',
        captainPhone: team.captainPhone || '',
        address: team.address || '',
        city: team.city || '',
        state: team.state || '',
        pinCode: team.pinCode || '',
        gameId: getGameName(team.gameId || ''),
        status: team.status || '',
        teamMembersCount: team.teamMembers?.length || 0,
        teamMembers_FullNames: teamMemberFullNames,
        teamMembers_IGNs: teamMemberIGNs,
        teamMembers_IDs: teamMemberIDs,
        substitute_FullName: substituteFullName,
        substitute_IGN: substituteIGN,
        substitute_ID: substituteID,
        hasSubstitute: team.substitute ? 'Yes' : 'No',
        coordinatorName: team.coordinatorName || '',
        coordinatorPhone: team.coordinatorPhone || '',
        additionalMessage: team.additionalMessage || '',
        termsAccepted: team.termsAccepted ? 'Yes' : 'No',
        institutionDeclaration: team.institutionDeclaration ? 'Yes' : 'No',
        livestreamConsent: team.livestreamConsent ? 'Yes' : 'No',
        createdAt: formatDate(team.createdAt),
        updatedAt: formatDate(team.updatedAt)
      };
    });

    downloadCSV(csvData, 'team_registrations', headers);
  };

  const downloadSponsorRegistrationsCSV = () => {
    const headers = [
      'registrationId',
      'companyName',
      'sponsorshipTierId',
      'sponsorshipTierName',
      'sponsoredAmount',
      'contactPerson',
      'contactEmail',
      'contactPhone',
      'address',
      'city',
      'state',
      'pinCode',
      'message',
      'status',
      'createdAt',
      'updatedAt'
    ];

    const csvData = filterSponsorRegistrations(getPureSponsorRegistrations()).map(sponsor => {
      // Enhanced sponsored amount calculation with tier mapping
      const tier = sponsorshipTiers.find(t => String(t.id) === String(sponsor.sponsorshipTierId || ''));
      let sponsoredAmount = '';
      
      if (!tier) {
        // Map common tier IDs to amounts
        const tierMapping = {
          1: '₹5,00,000+',  // Title Sponsor
          2: '₹2,50,000',  // Powered By Sponsor  
          3: '₹1,00,000',  // Associate Sponsor
          4: 'Custom/In-Kind' // Category Partner
        };
        
        const mappedAmount = tierMapping[Number(sponsor.sponsorshipTierId) as keyof typeof tierMapping];
        sponsoredAmount = mappedAmount || 'Not specified';
      } else {
        sponsoredAmount = `₹${(tier.price || 0).toLocaleString()}`;
      }

      return {
        registrationId: sponsor.registrationId || '',
        companyName: sponsor.companyName || '',
        sponsorshipTierId: sponsor.sponsorshipTierId || '',
        sponsorshipTierName: getSponsorshipTierName(sponsor.sponsorshipTierId || ''),
        sponsoredAmount: sponsoredAmount,
        contactPerson: sponsor.contactPerson || '',
        contactEmail: sponsor.contactEmail || '',
        contactPhone: sponsor.contactPhone || '',
        address: sponsor.address || '',
        city: sponsor.city || '',
        state: sponsor.state || '',
        pinCode: sponsor.pinCode || '',
        message: cleanSponsorMessage(sponsor.message || ''),
        status: sponsor.status || '',
        createdAt: formatDate(sponsor.createdAt),
        updatedAt: formatDate(sponsor.updatedAt)
      };
    });

    downloadCSV(csvData, 'sponsor_registrations', headers);
  };

  
  const downloadMediaRegistrationsCSV = () => {
    const headers = [
      'registrationId',
      'fullName',
      'email',
      'phone',
      'organization',
      'role',
      'address',
      'city',
      'state',
      'pinCode',
      'status',
      'createdAt',
      'updatedAt'
    ];

    const csvData = filterMediaRegistrations(mediaRegistrations).map(media => ({
      registrationId: media.registrationId || '',
      fullName: media.fullName || '',
      email: media.email || '',
      phone: media.phone || '',
      organization: media.organization || '',
      role: media.role || '',
      address: media.address || '',
      city: media.city || '',
      state: media.state || '',
      pinCode: media.pinCode || '',
      status: media.status || '',
      createdAt: formatDate(media.createdAt),
      updatedAt: formatDate(media.updatedAt)
    }));

    downloadCSV(csvData, 'media_registrations', headers);
  };

  const downloadCosplayerRegistrationsCSV = () => {
    const headers = [
      'registrationId',
      'fullName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'pinCode',
      'additionalDetails',
      'cosplayCharacterName',
      'cosplayGameName',
      'status',
      'createdAt'
    ];

    const csvData = filterCosplayerRegistrations(cosplayerRegistrations).map((cosplayer) => ({
      registrationId: cosplayer.registrationId || '',
      fullName: cosplayer.fullName || '',
      email: cosplayer.email || '',
      phone: cosplayer.phone || '',
      address: cosplayer.address || '',
      city: cosplayer.city || '',
      state: cosplayer.state || '',
      pinCode: cosplayer.pinCode || '',
      additionalDetails: cosplayer.message || '', // Contains Instagram, Performance Duration, File URLs
      cosplayCharacterName: cosplayer.characterName || '',
      cosplayGameName: cosplayer.gameName || '',
      status: cosplayer.status || '',
      createdAt: formatDate(cosplayer.createdAt)
    }));

    downloadCSV(csvData, 'cosplayer_registrations', headers);
  };

  const downloadVendorRegistrationsCSV = () => {
    const headers = [
      'registrationId',
      'companyName',
      'contactPerson',
      'contactEmail',
      'contactPhone',
      'address',
      'city',
      'state',
      'pinCode',
      'vendorType', // Extracted from message
      'productsServices', // Extracted from message
      'status',
      'createdAt'
    ];

    const csvData = filterVendorRegistrations(vendorRegistrations).map((vendor) => {
      // Extract vendor type and products/services from message
      let vendorType = 'Not specified';
      let productsServices = '';
      
      if (vendor.message?.includes('Vendor Type:')) {
        vendorType = vendor.message.includes('Vendor Type: food') ? 'Food' :
                     vendor.message.includes('Vendor Type: beverage') ? 'Beverage' :
                     vendor.message.includes('Vendor Type: merchandise') ? 'Merchandise' :
                     vendor.message.includes('Vendor Type: both') ? 'Both Food & Beverage' : 'Not specified';
        
        // Extract products/services after vendor type
        const parts = vendor.message.split('\n\n');
        if (parts.length > 1) {
          productsServices = parts[1] || '';
        }
      }

      return {
        registrationId: vendor.registrationId || '',
        companyName: vendor.companyName || '',
        contactPerson: vendor.contactPerson || '',
        contactEmail: vendor.contactEmail || '',
        contactPhone: vendor.contactPhone || '',
        address: vendor.address || '',
        city: vendor.city || '',
        state: vendor.state || '',
        pinCode: vendor.pinCode || '',
        vendorType: vendorType,
        productsServices: productsServices,
        status: vendor.status || '',
        createdAt: formatDate(vendor.createdAt)
      };
    });

    downloadCSV(csvData, 'vendor_registrations', headers);
  };

  const downloadMobaOpenRegistrationsCSV = () => {
    const headers = [
      'registrationId',
      'teamName', 
      'registrationType',
      'collegeName',
      'captainName',
      'captainEmail', 
      'captainPhone',
      'address',
      'city',
      'state',
      'pinCode',
      'gameId',
      'status',
      'teamMembersCount',
      'teamMembers_FullNames',
      'teamMembers_IGNs',
      'teamMembers_IDs',
      'substitute_FullName',
      'substitute_IGN',
      'substitute_ID',
      'hasSubstitute',
      'additionalMessage',
      'termsAccepted',
      'institutionDeclaration',
      'livestreamConsent',
      'createdAt',
      'updatedAt'
    ];

    const csvData = filterMobaOpenRegistrations(mobaOpenRegistrations).map(team => {
      const teamMemberFullNames = team.teamMembers?.map(member => member.fullName || '').join('; ') || '';
      const teamMemberIGNs = team.teamMembers?.map(member => member.ign || '').join('; ') || '';
      const teamMemberIDs = team.teamMembers?.map(member => member.gameId || '').join('; ') || '';
      const substituteFullName = team.substitute?.fullName || '';
      const substituteIGN = team.substitute?.ign || '';
      const substituteID = team.substitute?.gameId || '';

      return {
        registrationId: team.registrationId || '',
        teamName: team.teamName || '',
        registrationType: team.registrationType || '',
        collegeName: team.collegeName || '',
        captainName: team.captainName || '',
        captainEmail: team.captainEmail || '',
        captainPhone: team.captainPhone || '',
        address: team.address || '',
        city: team.city || '',
        state: team.state || '',
        pinCode: team.pinCode || '',
        gameId: getGameName(team.gameId || ''),
        status: team.status || '',
        teamMembersCount: team.teamMembers?.length || 0,
        teamMembers_FullNames: teamMemberFullNames,
        teamMembers_IGNs: teamMemberIGNs,
        teamMembers_IDs: teamMemberIDs,
        substitute_FullName: substituteFullName,
        substitute_IGN: substituteIGN,
        substitute_ID: substituteID,
        hasSubstitute: team.substitute ? 'Yes' : 'No',
        additionalMessage: team.additionalMessage || '',
        termsAccepted: team.termsAccepted ? 'Yes' : 'No',
        institutionDeclaration: team.institutionDeclaration ? 'Yes' : 'No',
        livestreamConsent: team.livestreamConsent ? 'Yes' : 'No',
        createdAt: formatDate(team.createdAt),
        updatedAt: formatDate(team.updatedAt)
      };
    });

    downloadCSV(csvData, 'moba_open_registrations', headers);
  };

  const downloadMiniTournamentRegistrationsCSV = () => {
    const headers = [
      'registrationId',
      'fullName',
      'nickname',
      'email',
      'whatsapp',
      'phoneCall',
      'address',
      'city',
      'state',
      'pinCode',
      'age',
      'gender',
      'game',
      'status',
      'createdAt'
    ];

    const filteredRegistrations = selectedMiniGame === 'all'
      ? miniTournamentRegistrations
      : miniTournamentRegistrations.filter(r => getMiniTournamentGame(r) === selectedMiniGame);

    const csvData = filteredRegistrations.map((registration) => {
      const game = registration.message && registration.message.includes('Game:') 
        ? registration.message.split('Game:')[1]?.split('\n')[0]?.trim() 
        : 'Unknown';
      const phoneCall = registration.message && registration.message.includes('Phone Call:') 
        ? registration.message.split('Phone Call:')[1]?.split('\n')[0]?.trim() 
        : 'N/A';
      const age = registration.message && registration.message.includes('Age:') 
        ? registration.message.split('Age:')[1]?.split('\n')[0]?.trim() 
        : 'N/A';
      const gender = registration.message && registration.message.includes('Gender:') 
        ? registration.message.split('Gender:')[1]?.split('\n')[0]?.trim() 
        : 'N/A';

      return {
        registrationId: registration.registrationId || '',
        fullName: registration.fullName || '',
        nickname: registration.collegeName || 'N/A',
        email: registration.email || '',
        whatsapp: registration.phone || '',
        phoneCall: phoneCall,
        address: registration.address || '',
        city: registration.city || '',
        state: registration.state || '',
        pinCode: registration.pinCode || '',
        age: age,
        gender: gender,
        game: game,
        status: registration.status || '',
        createdAt: formatDate(registration.createdAt)
      };
    });

    downloadCSV(csvData, 'mini_tournament_registrations', headers);
  };

  const downloadDigitalArtRegistrationsCSV = () => {
    const headers = [
      'registrationId',
      'fullName',
      'mobileNumber',
      'whatsappNumber',
      'email',
      'address',
      'district',
      'schoolCollegeOrg',
      'deviceType',
      'software',
      'status',
      'createdAt'
    ];

    const csvData = digitalArtRegistrations.map((registration) => {
      const message = registration.message || '';
      const whatsappNumber = message.includes('WhatsApp:') ? message.split('WhatsApp:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const deviceType = message.includes('Device Type:') ? message.split('Device Type:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const software = message.includes('Software:') ? message.split('Software:')[1]?.split('\n')[0]?.trim() : 'N/A';

      return {
        registrationId: registration.registrationId || '',
        fullName: registration.fullName || '',
        mobileNumber: registration.phone || '',
        whatsappNumber: whatsappNumber,
        email: registration.email || '',
        address: registration.address || '',
        district: registration.city || '',
        schoolCollegeOrg: registration.collegeName || '',
        deviceType: deviceType,
        software: software,
        status: registration.status || '',
        createdAt: formatDate(registration.createdAt)
      };
    });

    downloadCSV(csvData, 'digital_art_registrations', headers);
  };

  const downloadAiVideoRegistrationsCSV = () => {
    const headers = [
      'registrationId',
      'fullName',
      'email',
      'mobilePhone',
      'whatsapp',
      'district',
      'institution',
      'age',
      'gender',
      'participantType',
      'entryType',
      'teamName',
      'teamMembers',
      'videoTitle',
      'videoDescription',
      'aiToolsUsed',
      'videoUrl',
      'status',
      'createdAt'
    ];

    const csvData = aiVideoRegistrations.map((registration) => {
      const message = registration.message || '';
      
      const age = message.includes('Age:') ? message.split('Age:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const gender = message.includes('Gender:') ? message.split('Gender:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const whatsapp = message.includes('WhatsApp:') ? message.split('WhatsApp:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const participantType = message.includes('Participant Type:') ? message.split('Participant Type:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const entryType = message.includes('Entry Type:') ? message.split('Entry Type:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const teamName = message.includes('Team Name:') ? message.split('Team Name:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const teamMembers = message.includes('Team Members:') ? message.split('Team Members:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const videoTitle = message.includes('Video Title:') ? message.split('Video Title:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const videoDescription = message.includes('Video Description:') ? message.split('Video Description:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const aiToolsUsed = message.includes('AI Tools Used:') ? message.split('AI Tools Used:')[1]?.split('\n')[0]?.trim() : 'N/A';
      const videoUrl = message.includes('Video URL:') ? message.split('Video URL:')[1]?.split('\n')[0]?.trim() : 'N/A';

      return {
        registrationId: registration.registrationId || '',
        fullName: registration.fullName || '',
        email: registration.email || '',
        mobilePhone: registration.phone || '',
        whatsapp: whatsapp,
        district: registration.address || '',
        institution: registration.collegeName || '',
        age,
        gender,
        participantType,
        entryType,
        teamName,
        teamMembers,
        videoTitle,
        videoDescription,
        aiToolsUsed,
        videoUrl,
        status: registration.status || '',
        createdAt: formatDate(registration.createdAt)
      };
    });

    downloadCSV(csvData, 'ai_video_registrations', headers);
  };

  const downloadExhibitorRegistrationsCSV = () => {
    const headers = [
      'registrationId',
      'companyName',
      'contactPerson',
      'contactEmail',
      'contactPhone',
      'address',
      'city',
      'state',
      'pinCode',
      'exhibitionDescription',
      'boothSpaceRequirements',
      'status',
      'createdAt'
    ];

    const csvData = exhibitorRegistrations.map((exhibitor) => {
      const exhibitionDescription = exhibitor.message?.includes('Exhibition Description:') 
        ? exhibitor.message.split('Exhibition Description:')[1]?.split('\n\n')[0]?.trim() 
        : 'Not specified';
      const boothRequirements = exhibitor.message?.includes('Booth/Space Requirements:') 
        ? exhibitor.message.split('Booth/Space Requirements:')[1]?.trim() 
        : 'Not specified';

      return {
        registrationId: exhibitor.registrationId || '',
        companyName: exhibitor.companyName || '',
        contactPerson: exhibitor.contactPerson || '',
        contactEmail: exhibitor.contactEmail || '',
        contactPhone: exhibitor.contactPhone || '',
        address: exhibitor.address || '',
        city: exhibitor.city || '',
        state: exhibitor.state || '',
        pinCode: exhibitor.pinCode || '',
        exhibitionDescription: exhibitionDescription,
        boothSpaceRequirements: boothRequirements,
        status: exhibitor.status || '',
        createdAt: formatDate(exhibitor.createdAt)
      };
    });

    downloadCSV(csvData, 'exhibitor_registrations', headers);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'withdrawn': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <span className="w-4 h-4 text-green-600">✓</span>;
      case 'rejected': return <span className="w-4 h-4 text-red-600">✗</span>;
      case 'withdrawn': return <span className="w-4 h-4 text-gray-600">←</span>;
      case 'pending': return <span className="w-4 h-4 text-blue-600">⏱</span>;
      default: return <span className="w-4 h-4 text-blue-600">⏱</span>;
    }
  };

  // Advanced filtering functions for each registration type
  const filterTeamRegistrations = (registrations: TeamRegistration[]) => {
    return registrations.filter(reg => {
      const matchesSearch = searchTerm === '' || 
        reg.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.captainName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.collegeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.captainEmail?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGame = teamFilters.game === '' || reg.gameId === teamFilters.game;
      const matchesCollege = teamFilters.college === '' || reg.collegeName === teamFilters.college;
      const matchesStatus = teamFilters.status === 'all' || reg.status === teamFilters.status;
      const matchesDateRange = filterByDateRange(reg.createdAt?.toString() || '', teamFilters.dateRange);
      
      return matchesSearch && matchesGame && matchesCollege && matchesStatus && matchesDateRange;
    });
  };

  const filterMobaOpenRegistrations = (registrations: TeamRegistration[]) => {
    return registrations.filter(reg => {
      const matchesSearch = searchTerm === '' || 
        reg.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.captainName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.collegeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.captainEmail?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = teamFilters.status === 'all' || reg.status === teamFilters.status;
      
      return matchesSearch && matchesStatus;
    });
  };

  const filterSponsorRegistrations = (registrations: SponsorRegistration[]) => {
    return registrations.filter(reg => {
      const matchesSearch = searchTerm === '' || 
        reg.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.contactEmail?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTier = sponsorFilters.tier === '' || reg.sponsorshipTierId === sponsorFilters.tier;
      const matchesStatus = sponsorFilters.status === 'all' || reg.status === sponsorFilters.status;
      const matchesDateRange = filterByDateRange(reg.createdAt?.toString() || '', sponsorFilters.dateRange);
      
      return matchesSearch && matchesTier && matchesStatus && matchesDateRange;
    });
  };

  // Filter for cosplayer registrations
  const filterCosplayerRegistrations = (registrations: any[]) => {
    return registrations.filter(reg => {
      const matchesSearch = searchTerm === '' || 
        reg.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.registrationId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.characterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.gameName?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = sponsorFilters.status === 'all' || reg.status === sponsorFilters.status;
      const matchesDateRange = filterByDateRange(reg.createdAt?.toString() || '', sponsorFilters.dateRange);
      
      return matchesSearch && matchesStatus && matchesDateRange;
    });
  };

  // Filter for vendor registrations
  const filterVendorRegistrations = (registrations: SponsorRegistration[]) => {
    return registrations.filter(reg => {
      const matchesSearch = searchTerm === '' || 
        reg.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.contactEmail?.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesTier = true;
      if (sponsorFilters.tier !== '') {
        const messageText = reg.message || '';
        if (sponsorFilters.tier === 'food') {
          matchesTier = messageText.includes('Vendor Type: food');
        } else if (sponsorFilters.tier === 'beverage') {
          matchesTier = messageText.includes('Vendor Type: beverage');
        } else if (sponsorFilters.tier === 'merchandise') {
          matchesTier = messageText.includes('Vendor Type: merchandise');
        } else if (sponsorFilters.tier === 'both') {
          matchesTier = messageText.includes('Vendor Type: both');
        } else {
          matchesTier = false;
        }
      }
      
      const matchesStatus = sponsorFilters.status === 'all' || reg.status === sponsorFilters.status;
      const matchesDateRange = filterByDateRange(reg.createdAt?.toString() || '', sponsorFilters.dateRange);
      
      return matchesSearch && matchesTier && matchesStatus && matchesDateRange;
    });
  };

  // Filter for pure sponsor registrations (exclude vendors and exhibitors)
  const getPureSponsorRegistrations = () => {
    return sponsorRegistrations.filter(reg => {
      // Exclude vendors and exhibitors
      const isVendor = (reg.registrationId && reg.registrationId.startsWith('VEN')) || 
                      (reg.message && reg.message.includes('Vendor Type:'));
      const isExhibitor = reg.registrationId && reg.registrationId.startsWith('EXH');
      
      return !isVendor && !isExhibitor;
    });
  };

  // Clean up sponsor message to remove any vendor/exhibitor content
  const cleanSponsorMessage = (message: string) => {
    if (!message) return message;
    
    // Remove vendor/exhibitor specific content
    let cleanedMessage = message;
    
    // Remove vendor type prefixes
    if (cleanedMessage.includes('Vendor Type:')) {
      const parts = cleanedMessage.split('\n\n');
      if (parts.length > 1) {
        cleanedMessage = parts.slice(1).join('\n\n').trim();
      } else {
        cleanedMessage = '';
      }
    }
    
    // Remove exhibition descriptions
    if (cleanedMessage.includes('Exhibition Description:')) {
      const parts = cleanedMessage.split('\n\n');
      if (parts.length > 1) {
        cleanedMessage = parts.slice(1).join('\n\n').trim();
      } else {
        cleanedMessage = '';
      }
    }
    
    return cleanedMessage || '';
  };

  
  const filterMediaRegistrations = (registrations: MediaPersonRegistration[]) => {
    return registrations.filter(reg => {
      const matchesSearch = searchTerm === '' || 
        reg.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.organization?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = mediaFilters.status === 'all' || reg.status === mediaFilters.status;
      const matchesDateRange = filterByDateRange(reg.createdAt?.toString() || '', mediaFilters.dateRange);
      
      return matchesSearch && matchesStatus && matchesDateRange;
    });
  };

  // Helper function to filter by date range
  const filterByDateRange = (createdAt: string, dateRange: string) => {
    if (dateRange === 'all') return true;
    
    const createdDate = new Date(createdAt);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (dateRange) {
      case 'today':
        return createdDate >= today;
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return createdDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return createdDate >= monthAgo;
      case 'quarter':
        const quarterAgo = new Date(today);
        quarterAgo.setMonth(quarterAgo.getMonth() - 3);
        return createdDate >= quarterAgo;
      default:
        return true;
    }
  };

  const downloadStatsCSV = () => {
    const categoriesStats = [
      { name: 'Inter-College Teams', data: teamRegistrations },
      { name: 'MOBA 5v5 Teams', data: mobaOpenRegistrations },
      { name: 'Sponsors', data: getPureSponsorRegistrations() },
      { name: 'Cosplayers', data: cosplayerRegistrations },
      { name: 'Vendors', data: vendorRegistrations },
      { name: 'Exhibitors', data: exhibitorRegistrations },
      { name: 'Media', data: mediaRegistrations },
      { name: 'Mini Tournaments', data: miniTournamentRegistrations },
      { name: 'Digital Art', data: digitalArtRegistrations },
      { name: 'AI Video', data: aiVideoRegistrations },
    ];

    let csv = 'Event Category,Total Registrations,Approved,Pending,Rejected / Other\n';

    let grandTotal = 0;
    let grandApproved = 0;
    let grandPending = 0;
    let grandOther = 0;

    categoriesStats.forEach(cat => {
      const total = cat.data.length;
      const approved = cat.data.filter(x => x.status === 'approved').length;
      const pending = cat.data.filter(x => x.status === 'pending').length;
      const other = total - approved - pending;
      
      grandTotal += total;
      grandApproved += approved;
      grandPending += pending;
      grandOther += other;

      csv += `"${cat.name}",${total},${approved},${pending},${other}\n`;
    });

    csv += `"Total Participants",${grandTotal},${grandApproved},${grandPending},${grandOther}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Registration_Statistics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (dashboardLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600">⟳</div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-start"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">TXG TechXGames Expo Admin Dashboard</h1>
            <p className="text-gray-600">Manage event registrations and monitor activity</p>
            <p className="text-sm text-purple-600 mt-1">Welcome, {adminUser?.name}</p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <span>→</span>
            Logout
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Inter-college</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {teamRegistrations.filter(t => t.registrationType === 'college').length || 0}
                  </p>
                </div>
                <GamingIcon iconId={GamingIcons.USERS} size={32} color="#9333ea" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">MOBA Open</p>
                  <p className="text-3xl font-bold text-green-600">{mobaOpenRegistrations.length || 0}</p>
                </div>
                <GamingIcon iconId={GamingIcons.PARTNERSHIP} size={32} color="#07f85f" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Mini Games</p>
                  <p className="text-3xl font-bold text-pink-600">{miniTournamentRegistrations.length || 0}</p>
                </div>
                <GamingIcon iconId={GamingIcons.EYE} size={32} color="#ec4899" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">AI Video</p>
                  <p className="text-3xl font-bold text-red-600">{aiVideoRegistrations.length || 0}</p>
                </div>
                <GamingIcon iconId={GamingIcons.GAMEPAD} size={32} color="#be0000" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-teal-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Digital Art</p>
                  <p className="text-3xl font-bold text-teal-600">{digitalArtRegistrations.length || 0}</p>
                </div>
                <GamingIcon iconId={GamingIcons.MONITOR} size={32} color="#14b8a6" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {teamRegistrations.filter(t => t.status === 'pending').length +
                     sponsorRegistrations.filter(s => s.status === 'pending').length +
                     mediaRegistrations.filter(m => m.status === 'pending').length +
                     miniTournamentRegistrations.filter(m => m.status === 'pending').length +
                     digitalArtRegistrations.filter(a => a.status === 'pending').length +
                     aiVideoRegistrations.filter(a => a.status === 'pending').length}
                  </p>
                </div>
                <GamingIcon iconId={GamingIcons.CLOCK_ICON} size={32} color="#ea580c" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
            <TabsList className="flex flex-wrap w-full mb-6 gap-1">
              <TabsTrigger value="overview" className="flex-1 min-w-fit">Overview</TabsTrigger>
              <TabsTrigger value="inter-college" className="flex-1 min-w-fit">Inter College</TabsTrigger>
              <TabsTrigger value="moba-open" className="flex-1 min-w-fit">MOBA 5v5</TabsTrigger>
              <TabsTrigger value="sponsors" className="flex-1 min-w-fit">Sponsors</TabsTrigger>
              <TabsTrigger value="cosplayers" className="flex-1 min-w-fit">Cosplayers</TabsTrigger>
              <TabsTrigger value="vendors" className="flex-1 min-w-fit">Vendors</TabsTrigger>
              <TabsTrigger value="exhibitors" className="flex-1 min-w-fit">Exhibitors</TabsTrigger>
              <TabsTrigger value="media" className="flex-1 min-w-fit">Media</TabsTrigger>
              <TabsTrigger value="mini-tournaments" className="flex-1 min-w-fit">Mini Tournaments</TabsTrigger>
              <TabsTrigger value="digital-art" className="flex-1 min-w-fit">Digital Art</TabsTrigger>
              <TabsTrigger value="ai-video" className="flex-1 min-w-fit">AI Video</TabsTrigger>
              <TabsTrigger value="manual-entry" className="flex-1 min-w-fit">Manual Entry</TabsTrigger>
              <TabsTrigger value="content" className="flex-1 min-w-fit">Content</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="max-w-5xl mx-auto space-y-6">
                <Card className="bg-white/95 backdrop-blur-sm border-purple-100 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-b border-purple-100 pb-5 pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <CardTitle className="flex items-center gap-2.5 text-xl font-bold text-gray-900">
                          <TrendingUp className="w-6 h-6 text-purple-600 animate-pulse" />
                          Registration Statistics Overview
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          A real-time overview of registration counts across all event categories. Click a row to view details.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs border-purple-200 text-purple-700 hover:bg-purple-50"
                          onClick={downloadStatsCSV}
                        >
                          <Download className="w-3.5 h-3.5 mr-1.5" />
                          Export CSV
                        </Button>
                        <Badge className="bg-purple-100 text-purple-800 border-none font-semibold px-3 py-1 text-xs">
                          Live Stats
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50/75 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                            <th className="py-4 px-6">Event Category</th>
                            <th className="py-4 px-4 text-center">Total Registrations</th>
                            <th className="py-4 px-4 text-center">Approved</th>
                            <th className="py-4 px-4 text-center">Pending</th>
                            <th className="py-4 px-4 text-center">Rejected / Other</th>
                            <th className="py-4 px-6 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {(() => {
                            const categoriesStats = [
                              {
                                name: 'Inter-College Teams',
                                tab: 'inter-college',
                                data: teamRegistrations,
                                color: 'bg-blue-500',
                              },
                              {
                                name: 'MOBA 5v5 Teams',
                                tab: 'moba-open',
                                data: mobaOpenRegistrations,
                                color: 'bg-indigo-500',
                              },
                              {
                                name: 'Sponsors',
                                tab: 'sponsors',
                                data: getPureSponsorRegistrations(),
                                color: 'bg-amber-500',
                              },
                              {
                                name: 'Cosplayers',
                                tab: 'cosplayers',
                                data: cosplayerRegistrations,
                                color: 'bg-pink-500',
                              },
                              {
                                name: 'Vendors',
                                tab: 'vendors',
                                data: vendorRegistrations,
                                color: 'bg-emerald-500',
                              },
                              {
                                name: 'Exhibitors',
                                tab: 'exhibitors',
                                data: exhibitorRegistrations,
                                color: 'bg-violet-500',
                              },
                              {
                                name: 'Media',
                                tab: 'media',
                                data: mediaRegistrations,
                                color: 'bg-sky-500',
                              },
                              {
                                name: 'Mini Tournaments',
                                tab: 'mini-tournaments',
                                data: miniTournamentRegistrations,
                                color: 'bg-fuchsia-500',
                              },
                              {
                                name: 'Digital Art',
                                tab: 'digital-art',
                                data: digitalArtRegistrations,
                                color: 'bg-teal-500',
                              },
                              {
                                name: 'AI Video',
                                tab: 'ai-video',
                                data: aiVideoRegistrations,
                                color: 'bg-red-500',
                              },
                            ];

                            const rows = categoriesStats.map(cat => {
                              const total = cat.data.length;
                              const approved = cat.data.filter(x => x.status === 'approved').length;
                              const pending = cat.data.filter(x => x.status === 'pending').length;
                              const other = total - approved - pending;
                              return { ...cat, total, approved, pending, other };
                            });

                            const grandTotals = rows.reduce(
                              (acc, cur) => ({
                                total: acc.total + cur.total,
                                approved: acc.approved + cur.approved,
                                pending: acc.pending + cur.pending,
                                other: acc.other + cur.other,
                              }),
                              { total: 0, approved: 0, pending: 0, other: 0 }
                            );

                            return (
                              <>
                                {rows.map((row) => (
                                  <tr 
                                    key={row.tab}
                                    onClick={() => setActiveTab(row.tab)}
                                    className="hover:bg-purple-50/40 cursor-pointer transition-colors duration-150 group"
                                  >
                                    <td className="py-4 px-6 flex items-center">
                                      <span className={`h-3 w-3 rounded-full ${row.color} mr-3 block flex-shrink-0`} />
                                      <span className="font-semibold text-gray-700 group-hover:text-purple-700 transition-colors">
                                        {row.name}
                                      </span>
                                    </td>
                                    <td className="py-4 px-4 text-center font-bold text-gray-800">
                                      {row.total}
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                        row.approved > 0 ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-50 text-gray-400'
                                      }`}>
                                        {row.approved}
                                      </span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                        row.pending > 0 ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 'bg-gray-50 text-gray-400'
                                      }`}>
                                        {row.pending}
                                      </span>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                        row.other > 0 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-50 text-gray-400'
                                      }`}>
                                        {row.other}
                                      </span>
                                    </td>
                                    <td className="py-4 px-6 text-right text-xs font-semibold text-purple-600 group-hover:text-purple-800 opacity-0 group-hover:opacity-100 transition-all">
                                      View Details &rarr;
                                    </td>
                                  </tr>
                                ))}
                                {/* Grand Total Row */}
                                <tr className="bg-gray-50/50 border-t-2 border-gray-200/80 font-bold text-gray-900">
                                  <td className="py-4 px-6 flex items-center">
                                    <span className="h-3 w-3 rounded-full bg-gray-900 mr-3 block flex-shrink-0" />
                                    <span>Total Participants</span>
                                  </td>
                                  <td className="py-4 px-4 text-center text-lg text-purple-700 font-extrabold">
                                    {grandTotals.total}
                                  </td>
                                  <td className="py-4 px-4 text-center text-green-700">
                                    {grandTotals.approved}
                                  </td>
                                  <td className="py-4 px-4 text-center text-yellow-700">
                                    {grandTotals.pending}
                                  </td>
                                  <td className="py-4 px-4 text-center text-red-600">
                                    {grandTotals.other}
                                  </td>
                                  <td className="py-4 px-6 text-right text-xs text-gray-400 font-normal">
                                    Summary
                                  </td>
                                </tr>
                              </>
                            );
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Inter College Tab */}
            <TabsContent value="inter-college">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search teams..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={teamFilters.game}
                      onChange={(e) => setTeamFilters(prev => ({ ...prev, game: e.target.value }))}
                    >
                      <option value="">All Games</option>
                      {games.map(game => (
                        <option key={game.id} value={game.id}>{game.name}</option>
                      ))}
                    </select>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={teamFilters.college}
                      onChange={(e) => setTeamFilters(prev => ({ ...prev, college: e.target.value }))}
                    >
                      <option value="">All Colleges</option>
                      {Array.from(new Set(teamRegistrations.map(t => t.collegeName).filter(Boolean))).map(college => (
                        <option key={college} value={college}>{college}</option>
                      ))}
                    </select>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={teamFilters.status}
                      onChange={(e) => setTeamFilters(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="withdrawn">Withdrawn</option>
                    </select>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={teamFilters.dateRange}
                      onChange={(e) => setTeamFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={loadDashboardData} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button onClick={downloadTeamRegistrationsCSV} variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Download CSV
                    </Button>
                    <Button onClick={() => window.print()} variant="outline" className="print:hidden">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {filterTeamRegistrations(teamRegistrations).map((team) => (
                    <Card key={team.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{team.teamName}</h3>
                            <p className="text-sm text-gray-600">ID: {team.registrationId}</p>
                            <p className="text-sm text-gray-600">Type: {team.registrationType}</p>
                          </div>
                          <Badge className={getStatusColor(team.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(team.status)}
                              {team.status}
                            </span>
                          </Badge>
                        </div>
                        
                        {/* Team Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 border-b pb-2">Team Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Team Name:</span>
                                <span className="font-medium">{team.teamName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Registration Type:</span>
                                <span className="font-medium capitalize">{team.registrationType.replace('_', ' ')}</span>
                              </div>
                              {team.collegeName && (
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-600">College Name:</span>
                                  <div className="flex flex-col items-end">
                                    <span className="font-medium">{team.collegeName}</span>
                                    {team.collegeLogoUrl && (
                                      <div className="mt-2 text-right">
                                        <img 
                                          src={team.collegeLogoUrl} 
                                          alt="College Logo"
                                          className="w-16 h-16 object-contain rounded border cursor-pointer hover:opacity-80 transition-opacity bg-gray-50"
                                          onClick={() => window.open(team.collegeLogoUrl, '_blank')}
                                          onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                          }}
                                        />
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="text-xs h-6 px-2 w-full mt-1"
                                          onClick={async (e) => {
                                            e.stopPropagation();
                                            if (team.collegeLogoUrl) {
                                              await firebaseStorageService.downloadFile(team.collegeLogoUrl, `${team.registrationId}_college_logo.png`);
                                            }
                                          }}
                                        >
                                          <Download className="w-3 h-3 mr-1" />
                                          DL
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              {team.teamCategory && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Team Category:</span>
                                  <span className="font-medium">{team.teamCategory}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-gray-600">Game Selected:</span>
                                <span className="font-medium">{team.gameId ? getGameName(team.gameId) : 'Game Not Selected'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Team Members:</span>
                                <span className="font-medium">{team.teamMembers?.length || 0} players</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Substitute:</span>
                                <span className="font-medium">{team.substitute ? 'Yes' : 'No'}</span>
                              </div>
                              {team.additionalMessage && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Additional Message:</span>
                                  <span className="font-medium text-xs max-w-xs truncate">{team.additionalMessage}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 border-b pb-2">Captain Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Name:</span>
                                <span className="font-medium">{team.captainName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium text-xs">{team.captainEmail}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium">{team.captainPhone}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Address Details */}
                        <div className="mt-4 space-y-3">
                          <h4 className="font-semibold text-gray-800 border-b pb-2">Address</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Address:</span>
                              <span className="font-medium">{team.address || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">City:</span>
                              <span className="font-medium">{team.city || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">State:</span>
                              <span className="font-medium">{team.state || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">PIN Code:</span>
                              <span className="font-medium">{team.pinCode || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Team Members */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800 border-b pb-2">Team Members</h4>
                          {team.teamMembers && team.teamMembers.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {team.teamMembers.map((member, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-sm">
                                    <div className="font-medium text-gray-800">Player {index + 1}</div>
                                    <div className="text-gray-600">Name: {member.fullName || 'N/A'}</div>
                                    <div className="text-gray-600">IGN: {member.ign || 'N/A'}</div>
                                    <div className="text-gray-600">Game ID: {member.gameId || 'N/A'}</div>
                                    {/* Student ID for each player */}
                                    {member.studentIdData && (
                                      <div className="mt-2 pt-2 border-t">
                                        <div className="text-xs text-blue-600 mb-1">Student ID</div>
                                        {member.studentIdData?.url && (
                                          <img 
                                            src={member.studentIdData.url} 
                                            alt={`Player ${index + 1} Student ID`}
                                            className="w-24 h-24 object-cover rounded border mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => window.open(member.studentIdData.url, '_blank')}
                                            onError={(e) => {
                                              (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                          />
                                        )}
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="text-xs h-7 px-2 w-full"
                                          onClick={async () => {
                                            if (member.studentIdData?.url) {
                                              await firebaseStorageService.downloadFile(member.studentIdData.url, `${team.registrationId}_player${index + 1}_student_id`);
                                            } else {
                                              alert('Student ID URL not available');
                                            }
                                          }}
                                        >
                                          <Download className="w-3 h-3 mr-1" />
                                          Download
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No team members registered</p>
                          )}
                        </div>

                        {/* Substitute */}
                        {team.substitute && (
                          <div className="mt-4 space-y-3">
                            <h4 className="font-semibold text-gray-800 border-b pb-2">Substitute Player</h4>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="text-sm">
                                <div className="font-medium text-gray-800">Substitute</div>
                                <div className="text-gray-600">Name: {(team.substitute as any)?.fullName || 'N/A'}</div>
                                <div className="text-gray-600">IGN: {team.substitute?.ign || 'N/A'}</div>
                                <div className="text-gray-600">Game ID: {team.substitute?.gameId || 'N/A'}</div>
                                <div className="text-gray-600">Game: {team.substitute?.gameId ? getGameName(team.substitute.gameId) : 'Game Not Selected'}</div>
                                {/* Student ID for substitute */}
                                {(team.substitute as any)?.studentIdData && (
                                  <div className="mt-2 pt-2 border-t border-blue-200">
                                    <div className="text-xs text-blue-600 mb-1">Student ID</div>
                                    {(team.substitute as any)?.studentIdData?.url && (
                                      <img 
                                        src={(team.substitute as any).studentIdData.url} 
                                        alt="Substitute Student ID"
                                        className="w-24 h-24 object-cover rounded border mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => window.open((team.substitute as any).studentIdData.url, '_blank')}
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                      />
                                    )}
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-xs h-7 px-2 w-full"
                                      onClick={async () => {
                                        const url = (team.substitute as any)?.studentIdData?.url;
                                        if (url) {
                                          await firebaseStorageService.downloadFile(url, `${team.registrationId}_substitute_student_id`);
                                        } else {
                                          alert('Student ID URL not available');
                                        }
                                      }}
                                    >
                                      <Download className="w-3 h-3 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Registration Info */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Registered: {formatDate(team.createdAt)}</span>
                            <span>Terms Accepted: {team.termsAccepted ? '✅ Yes' : '❌ No'}</span>
                            {(team.registrationType === 'college' || team.registrationType === 'open_category') && (
                              <span>Institution Declaration: {team.institutionDeclaration ? '✅ Yes' : '❌ No'}</span>
                            )}
                            {(team.registrationType === 'college' || team.registrationType === 'open_category') && (
                              <span>Livestream Consent: {team.livestreamConsent ? '✅ Yes' : '❌ No'}</span>
                            )}
                          </div>
                        </div>

                        {/* Status Management */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex gap-2 flex-wrap">
                            {team.status !== 'approved' && team.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  console.log('Full team object:', team);
                                  console.log('Team ID being used:', team.id);
                                  console.log('Team Registration ID:', team.registrationId);
                                  console.log('All team properties:', Object.keys(team));
                                  handleStatusUpdate(team.id, 'inter-college', 'approved');
                                }}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            )}
                            {team.status !== 'rejected' && team.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(team.id, 'inter-college', 'rejected')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Reject
                              </Button>
                            )}
                            {team.status !== 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(team.id, 'inter-college', 'pending')}
                              >
                                Reset to Pending
                              </Button>
                            )}
                            {team.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(team.id, 'inter-college', 'withdrawn')}
                                className="bg-gray-600 hover:bg-gray-700 text-white"
                              >
                                Withdraw
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteRegistration(team.id, 'inter-college')}
                              className="bg-red-800 hover:bg-red-900 text-white ml-auto"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* MOBA 5v5 Open Tournament Tab */}
            <TabsContent value="moba-open">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search MOBA teams..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={teamFilters.status}
                      onChange={(e) => setTeamFilters(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="withdrawn">Withdrawn</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={loadDashboardData} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button onClick={downloadMobaOpenRegistrationsCSV} variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Download CSV
                    </Button>
                    <Button onClick={() => window.print()} variant="outline" className="print:hidden">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {filterMobaOpenRegistrations(mobaOpenRegistrations).map((team) => (
                    <Card key={team.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{team.teamName}</h3>
                            <p className="text-sm text-gray-600">ID: {team.registrationId}</p>
                            <div className="flex items-center gap-3">
                              <p className="text-sm text-gray-600">Organization: {team.collegeName}</p>
                              {team.collegeLogoUrl && (
                                <div className="flex flex-col items-center">
                                  <img 
                                    src={team.collegeLogoUrl} 
                                    alt="Organization Logo"
                                    className="w-10 h-10 object-contain rounded border cursor-pointer hover:opacity-80 transition-opacity bg-gray-50"
                                    onClick={(e) => { e.stopPropagation(); window.open(team.collegeLogoUrl, '_blank'); }}
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge 
                            className={`${
                              team.status === 'approved' ? 'bg-green-100 text-green-800' :
                              team.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {team.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Captain</p>
                            <p className="text-sm">{team.captainName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Contact</p>
                            <p className="text-sm">{team.captainEmail}</p>
                            <p className="text-sm">{team.captainPhone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Game</p>
                            <p className="text-sm">{getGameName(team.gameId)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Registered</p>
                            <p className="text-sm">{formatDate(team.createdAt)}</p>
                          </div>
                        </div>

                        {/* Address Details */}
                        <div className="mt-4 mb-6 space-y-3">
                          <h4 className="font-semibold text-gray-800 border-b pb-2">Address</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Address:</span>
                              <span className="font-medium">{team.address || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">City:</span>
                              <span className="font-medium">{team.city || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">State:</span>
                              <span className="font-medium">{team.state || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">PIN Code:</span>
                              <span className="font-medium">{team.pinCode || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Team Members */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800 border-b pb-2">Team Members</h4>
                          {team.teamMembers && team.teamMembers.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {team.teamMembers.map((member, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="text-sm">
                                    <div className="font-medium text-gray-800">Player {index + 1}</div>
                                    <div className="text-gray-600">Name: {member.fullName || 'N/A'}</div>
                                    <div className="text-gray-600">IGN: {member.ign || 'N/A'}</div>
                                    <div className="text-gray-600">Game ID: {member.gameId || 'N/A'}</div>
                                    {/* Aadhaar for each player */}
                                    {(member as any).aadhaarData && (
                                      <div className="mt-2 pt-2 border-t">
                                        <div className="text-xs text-blue-600 mb-1">Aadhaar</div>
                                        {(member as any).aadhaarData?.url && (
                                          <img 
                                            src={(member as any).aadhaarData.url} 
                                            alt={`Player ${index + 1} Aadhaar`}
                                            className="w-24 h-24 object-cover rounded border mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                                            onClick={() => window.open((member as any).aadhaarData.url, '_blank')}
                                            onError={(e) => {
                                              (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                          />
                                        )}
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="text-xs h-7 px-2 w-full"
                                          onClick={async () => {
                                            const url = (member as any).aadhaarData?.url;
                                            if (url) {
                                              await firebaseStorageService.downloadFile(url, `${team.registrationId}_player${index + 1}_aadhaar`);
                                            } else {
                                              alert('Aadhaar URL not available');
                                            }
                                          }}
                                        >
                                          <Download className="w-3 h-3 mr-1" />
                                          Download
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">No team members registered</p>
                          )}
                        </div>

                        {/* Substitute */}
                        {team.substitute && (
                          <div className="mt-4 space-y-3">
                            <h4 className="font-semibold text-gray-800 border-b pb-2">Substitute Player</h4>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="text-sm">
                                <div className="font-medium text-gray-800">Substitute</div>
                                <div className="text-gray-600">Name: {(team.substitute as any)?.fullName || 'N/A'}</div>
                                <div className="text-gray-600">IGN: {team.substitute?.ign || 'N/A'}</div>
                                <div className="text-gray-600">Game ID: {team.substitute?.gameId || 'N/A'}</div>
                                <div className="text-gray-600">Game: {team.substitute?.gameId ? getGameName(team.substitute.gameId) : 'Game Not Selected'}</div>
                                {/* Aadhaar for substitute */}
                                {(team.substitute as any)?.aadhaarData && (
                                  <div className="mt-2 pt-2 border-t border-blue-200">
                                    <div className="text-xs text-blue-600 mb-1">Aadhaar</div>
                                    {(team.substitute as any)?.aadhaarData?.url && (
                                      <img 
                                        src={(team.substitute as any).aadhaarData.url} 
                                        alt="Substitute Aadhaar"
                                        className="w-24 h-24 object-cover rounded border mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => window.open((team.substitute as any).aadhaarData.url, '_blank')}
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                      />
                                    )}
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-xs h-7 px-2 w-full"
                                      onClick={async () => {
                                        const url = (team.substitute as any)?.aadhaarData?.url;
                                        if (url) {
                                          await firebaseStorageService.downloadFile(url, `${team.registrationId}_substitute_aadhaar`);
                                        } else {
                                          alert('Aadhaar URL not available');
                                        }
                                      }}
                                    >
                                      <Download className="w-3 h-3 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Registration Info */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Registered: {formatDate(team.createdAt)}</span>
                            <span>Terms Accepted: {team.termsAccepted ? '✅ Yes' : '❌ No'}</span>
                            <span>Institution Declaration: {team.institutionDeclaration ? '✅ Yes' : '❌ No'}</span>
                            <span>Livestream Consent: {team.livestreamConsent ? '✅ Yes' : '❌ No'}</span>
                          </div>
                        </div>

                        {/* Status Management */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(team.id, 'moba-open', 'approved')}
                              className="bg-green-600 hover:bg-green-700 text-white"
                              disabled={team.status === 'approved'}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(team.id, 'moba-open', 'rejected')}
                              className="bg-red-600 hover:bg-red-700 text-white"
                              disabled={team.status === 'rejected'}
                            >
                              Reject
                            </Button>
                            {team.status !== 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(team.id, 'moba-open', 'pending')}
                              >
                                Reset to Pending
                              </Button>
                            )}
                            {team.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(team.id, 'moba-open', 'withdrawn')}
                                className="bg-gray-600 hover:bg-gray-700 text-white"
                                disabled={team.status === 'withdrawn'}
                              >
                                Withdraw
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteRegistration(team.id, 'moba-open')}
                              className="bg-red-800 hover:bg-red-900 text-white ml-auto"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Sponsors Tab */}
            <TabsContent value="sponsors">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search sponsors..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={sponsorFilters.tier}
                      onChange={(e) => setSponsorFilters(prev => ({ ...prev, tier: e.target.value }))}
                    >
                      <option value="">All Tiers</option>
                      {sponsorshipTiers.map(tier => (
                        <option key={tier.id} value={tier.id}>{tier.name}</option>
                      ))}
                    </select>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={sponsorFilters.status}
                      onChange={(e) => setSponsorFilters(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="withdrawn">Withdrawn</option>
                    </select>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={sponsorFilters.dateRange}
                      onChange={(e) => setSponsorFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={loadDashboardData} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button onClick={downloadSponsorRegistrationsCSV} variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Download CSV
                    </Button>
                    <Button onClick={() => window.print()} variant="outline" className="print:hidden">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {filterSponsorRegistrations(getPureSponsorRegistrations()).map((sponsor) => (
                    <Card key={sponsor.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{sponsor.companyName}</h3>
                            <p className="text-sm text-gray-600">ID: {sponsor.registrationId}</p>
                            <p className="text-sm text-gray-600">Sponsorship Tier: {sponsor.sponsorshipTierId}</p>
                          </div>
                          <Badge className={getStatusColor(sponsor.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(sponsor.status)}
                              {sponsor.status}
                            </span>
                          </Badge>
                        </div>
                        
                        {/* Sponsor Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 border-b pb-2">Company Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Company Name:</span>
                                <span className="font-medium">{sponsor.companyName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Sponsorship Tier:</span>
                                <span className="font-medium">{getSponsorshipTierName(sponsor.sponsorshipTierId || '')}</span>
                              </div>
                              {sponsor.message && cleanSponsorMessage(sponsor.message) && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Message:</span>
                                  <span className="font-medium text-xs max-w-xs">{cleanSponsorMessage(sponsor.message)}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 border-b pb-2">Contact Person</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Name:</span>
                                <span className="font-medium">{sponsor.contactPerson}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium text-xs">{sponsor.contactEmail}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium">{sponsor.contactPhone}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Address Details */}
                        <div className="mt-4 space-y-3">
                          <h4 className="font-semibold text-gray-800 border-b pb-2">Address</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Address:</span>
                              <span className="font-medium">{sponsor.address || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">City:</span>
                              <span className="font-medium">{sponsor.city || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">State:</span>
                              <span className="font-medium">{sponsor.state || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">PIN Code:</span>
                              <span className="font-medium">{sponsor.pinCode || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Registration Info */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Registered: {formatDate(sponsor.createdAt)}</span>
                            <span>Last Updated: {formatDate(sponsor.updatedAt)}</span>
                          </div>
                        </div>

                        {/* Status Management */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex gap-2">
                            {sponsor.status !== 'approved' && sponsor.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(sponsor.id, 'sponsor', 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            )}
                            {sponsor.status !== 'rejected' && sponsor.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(sponsor.id, 'sponsor', 'rejected')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Reject
                              </Button>
                            )}
                            {sponsor.status !== 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(sponsor.id, 'sponsor', 'pending')}
                              >
                                Reset to Pending
                              </Button>
                            )}
                            {sponsor.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(sponsor.id, 'sponsor', 'withdrawn')}
                                className="bg-gray-600 hover:bg-gray-700 text-white"
                              >
                                Withdraw
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteRegistration(sponsor.id, 'sponsor')}
                              className="bg-red-800 hover:bg-red-900 text-white ml-auto"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search media..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={mediaFilters.status}
                      onChange={(e) => setMediaFilters(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="withdrawn">Withdrawn</option>
                    </select>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={mediaFilters.dateRange}
                      onChange={(e) => setMediaFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={loadDashboardData} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button onClick={downloadMediaRegistrationsCSV} variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Download CSV
                    </Button>
                    <Button onClick={() => window.print()} variant="outline" className="print:hidden">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {filterMediaRegistrations(mediaRegistrations).map((media) => (
                    <Card key={media.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{media.fullName}</h3>
                            <p className="text-sm text-gray-600">ID: {media.registrationId}</p>
                            <p className="text-sm text-gray-600">Media Person Registration</p>
                          </div>
                          <Badge className={getStatusColor(media.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(media.status)}
                              {media.status}
                            </span>
                          </Badge>
                        </div>
                        
                        {/* Media Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 border-b pb-2">Personal Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Full Name:</span>
                                <span className="font-medium">{media.fullName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium text-xs">{media.email}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium">{media.phone}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 border-b pb-2">Professional Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Organization:</span>
                                <span className="font-medium">{media.organization || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Role:</span>
                                <span className="font-medium">{media.role || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className="font-medium capitalize">{media.status}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Address Details */}
                        <div className="mt-4 space-y-3">
                          <h4 className="font-semibold text-gray-800 border-b pb-2">Address</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Address:</span>
                              <span className="font-medium">{media.address || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">City:</span>
                              <span className="font-medium">{media.city || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">State:</span>
                              <span className="font-medium">{media.state || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">PIN Code:</span>
                              <span className="font-medium">{media.pinCode || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Registration Info */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Registered: {formatDate(media.createdAt)}</span>
                            <span>Last Updated: {formatDate(media.updatedAt)}</span>
                          </div>
                        </div>

                        {/* Status Management */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex gap-2">
                            {media.status !== 'approved' && media.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(media.id, 'media', 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            )}
                            {media.status !== 'rejected' && media.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(media.id, 'media', 'rejected')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Reject
                              </Button>
                            )}
                            {media.status !== 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(media.id, 'media', 'pending')}
                              >
                                Reset to Pending
                              </Button>
                            )}
                            {media.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(media.id, 'media', 'withdrawn')}
                                className="bg-gray-600 hover:bg-gray-700 text-white"
                              >
                                Withdraw
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteRegistration(media.id, 'media')}
                              className="bg-red-800 hover:bg-red-900 text-white ml-auto"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Manual Data Entry Tab */}
            <TabsContent value="manual-entry">
              <ManualDataEntry />
            </TabsContent>

            {/* Cosplayers Tab */}
            <TabsContent value="cosplayers">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Cosplayer Registrations</h2>
                  <div className="flex gap-2">
                    <Button onClick={() => loadDashboardData()} variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button onClick={downloadCosplayerRegistrationsCSV} variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Download CSV
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search cosplayers..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={sponsorFilters.status}
                      onChange={(e) => setSponsorFilters(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="withdrawn">Withdrawn</option>
                    </select>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={sponsorFilters.dateRange}
                      onChange={(e) => setSponsorFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4">
                  {filterCosplayerRegistrations(cosplayerRegistrations).map((cosplayer) => (
                    <Card key={cosplayer.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{cosplayer.fullName}</h3>
                            <p className="text-sm text-gray-600">ID: {cosplayer.registrationId}</p>
                          </div>
                          <Badge className={getStatusColor(cosplayer.status)}>
                            {getStatusIcon(cosplayer.status)} {cosplayer.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{cosplayer.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">{cosplayer.phone}</span>
                          </div>
                        </div>

                        {/* Address Details */}
                        <div className="mt-4 space-y-3">
                          <h4 className="font-semibold text-gray-800 border-b pb-2">Address</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Address:</span>
                              <span className="font-medium">{cosplayer.address || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">City:</span>
                              <span className="font-medium">{cosplayer.city || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">State:</span>
                              <span className="font-medium">{cosplayer.state || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">PIN Code:</span>
                              <span className="font-medium">{cosplayer.pinCode || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Cosplay Details */}
                        <div className="mt-4 space-y-3">
                          <h4 className="font-semibold text-purple-850 border-b pb-2 flex items-center gap-1.5">
                            <span className="text-base">🎭</span> Cosplay Info
                          </h4>
                          <div className="space-y-2 text-sm">
                            {cosplayer.characterName && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Character Name:</span>
                                <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">{cosplayer.characterName}</span>
                              </div>
                            )}
                            {cosplayer.gameName && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Character origin(Game):</span>
                                <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{cosplayer.gameName}</span>
                              </div>
                            )}
                            {cosplayer.message && (
                              <div className="mt-2 pt-2 border-t border-gray-100">
                                <span className="text-gray-600 font-semibold mb-2 block">Additional Details:</span>
                                <div className="space-y-2">
                                  {cosplayer.message.split('\n').map((line: string, idx: number) => {
                                    const parts = line.split(': ');
                                    if (parts.length >= 2) {
                                      const key = parts[0];
                                      const value = parts.slice(1).join(': ');
                                      if (value.startsWith('http')) {
                                        // Extract a file extension from the URL if possible
                                        let ext = value.split('?')[0].split('.').pop() || 'file';
                                        if (ext.length > 5) ext = 'file'; // fallback if no valid extension
                                        const fileName = `${cosplayer.registrationId}_${key.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.${ext}`;
                                        
                                        return (
                                          <div key={idx} className="flex justify-between items-center">
                                            <span className="text-gray-600">{key}:</span>
                                            <div className="flex gap-3">
                                              <a href={value} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline text-sm flex items-center gap-1">
                                                <Eye className="w-3 h-3" />
                                                View
                                              </a>
                                              <button 
                                                onClick={() => firebaseStorageService.downloadFile(value, fileName)}
                                                className="font-medium text-green-600 hover:underline text-sm flex items-center gap-1"
                                              >
                                                <Download className="w-3 h-3" />
                                                Download
                                              </button>
                                            </div>
                                          </div>
                                        );
                                      }
                                      return (
                                        <div key={idx} className="flex justify-between">
                                          <span className="text-gray-600">{key}:</span>
                                          <span className="font-medium">{value}</span>
                                        </div>
                                      );
                                    }
                                    return <div key={idx} className="text-gray-800">{line}</div>;
                                  })}
                                </div>
                              </div>
                            )}
                            {!cosplayer.characterName && !cosplayer.gameName && !cosplayer.message && (
                              <div className="text-xs text-orange-600 italic">
                                Cosplay-specific details not available (may be from older registration)
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Registered: {formatDate(cosplayer.createdAt)}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex gap-2">
                            {cosplayer.status !== 'approved' && cosplayer.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(cosplayer.id, 'cosplayer', 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            )}
                            {cosplayer.status !== 'rejected' && cosplayer.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(cosplayer.id, 'cosplayer', 'rejected')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Reject
                              </Button>
                            )}
                            {cosplayer.status !== 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(cosplayer.id, 'cosplayer', 'pending')}
                              >
                                Reset to Pending
                              </Button>
                            )}
                            {cosplayer.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(cosplayer.id, 'cosplayer', 'withdrawn')}
                                className="bg-gray-600 hover:bg-gray-700 text-white"
                              >
                                Withdraw
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteRegistration(cosplayer.id, 'cosplayer')}
                              className="bg-red-800 hover:bg-red-900 text-white ml-auto"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Vendors Tab */}
            <TabsContent value="vendors">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Vendor Registrations</h2>
                  <div className="flex gap-2">
                    <Button onClick={() => loadDashboardData()} variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button onClick={downloadVendorRegistrationsCSV} variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Download CSV
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search vendors..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={sponsorFilters.tier}
                      onChange={(e) => setSponsorFilters(prev => ({ ...prev, tier: e.target.value }))}
                    >
                      <option value="">All Types</option>
                      <option value="food">Food Vendor</option>
                      <option value="beverage">Beverage Vendor</option>
                      <option value="merchandise">Merchandise Vendor</option>
                      <option value="both">Food & Beverage</option>
                    </select>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={sponsorFilters.status}
                      onChange={(e) => setSponsorFilters(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="withdrawn">Withdrawn</option>
                    </select>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={sponsorFilters.dateRange}
                      onChange={(e) => setSponsorFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4">
                  {filterVendorRegistrations(vendorRegistrations).map((vendor) => (
                    <Card key={vendor.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{vendor.companyName}</h3>
                            <p className="text-sm text-gray-600">ID: {vendor.registrationId}</p>
                          </div>
                          <Badge className={getStatusColor(vendor.status)}>
                            {getStatusIcon(vendor.status)} {vendor.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Contact Person:</span>
                            <span className="font-medium">{vendor.contactPerson}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium text-xs">{vendor.contactEmail}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">{vendor.contactPhone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Vendor Type:</span>
                            <span className="font-medium">
                              {vendor.message?.includes('Vendor Type: food') ? 'Food' :
                               vendor.message?.includes('Vendor Type: beverage') ? 'Beverage' :
                               vendor.message?.includes('Vendor Type: merchandise') ? 'Merchandise' :
                               vendor.message?.includes('Vendor Type: both') ? 'Both Food & Beverage' : 'Not specified'}
                            </span>
                          </div>
                          {vendor.message && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Products/Services:</span>
                              <span className="font-medium text-xs max-w-xs truncate" title={vendor.message.split('\n\n')[1]}>
                                {vendor.message.split('\n\n')[1] || 'Not specified'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Address Details */}
                        <div className="mt-4 space-y-3">
                          <h4 className="font-semibold text-gray-800 border-b pb-2">Business Address</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Address:</span>
                              <span className="font-medium">{vendor.address || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">City:</span>
                              <span className="font-medium">{vendor.city || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">State:</span>
                              <span className="font-medium">{vendor.state || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">PIN Code:</span>
                              <span className="font-medium">{vendor.pinCode || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Registered: {formatDate(vendor.createdAt)}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex gap-2">
                            {vendor.status !== 'approved' && vendor.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(vendor.id, 'vendor', 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            )}
                            {vendor.status !== 'rejected' && vendor.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(vendor.id, 'vendor', 'rejected')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Reject
                              </Button>
                            )}
                            {vendor.status !== 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(vendor.id, 'vendor', 'pending')}
                              >
                                Reset to Pending
                              </Button>
                            )}
                            {vendor.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(vendor.id, 'vendor', 'withdrawn')}
                                className="bg-gray-600 hover:bg-gray-700 text-white"
                              >
                                Withdraw
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteRegistration(vendor.id, 'vendor')}
                              className="bg-red-800 hover:bg-red-900 text-white ml-auto"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Exhibitors Tab */}
            <TabsContent value="exhibitors">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Exhibitor Registrations</h2>
                  <div className="flex gap-2">
                    <Button onClick={() => loadDashboardData()} variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button onClick={downloadExhibitorRegistrationsCSV} variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Download CSV
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search exhibitors..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={sponsorFilters.tier}
                      onChange={(e) => setSponsorFilters(prev => ({ ...prev, tier: e.target.value }))}
                    >
                      <option value="">All Types</option>
                      <option value="technology">Technology</option>
                      <option value="education">Education</option>
                      <option value="gaming">Gaming</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="other">Other</option>
                    </select>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={sponsorFilters.status}
                      onChange={(e) => setSponsorFilters(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="withdrawn">Withdrawn</option>
                    </select>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={sponsorFilters.dateRange}
                      onChange={(e) => setSponsorFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4">
                  {filterSponsorRegistrations(exhibitorRegistrations).map((exhibitor) => (
                    <Card key={exhibitor.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{exhibitor.companyName}</h3>
                            <p className="text-sm text-gray-600">ID: {exhibitor.registrationId}</p>
                          </div>
                          <Badge className={getStatusColor(exhibitor.status)}>
                            {getStatusIcon(exhibitor.status)} {exhibitor.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Contact Person:</span>
                            <span className="font-medium">{exhibitor.contactPerson}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium text-xs">{exhibitor.contactEmail}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">{exhibitor.contactPhone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Exhibition Description:</span>
                            <span className="font-medium text-xs max-w-xs truncate" title={exhibitor.message?.includes('Exhibition Description:') ? exhibitor.message.split('Exhibition Description:')[1]?.split('\n\n')[0]?.trim() : 'Not specified'}>
                              {exhibitor.message?.includes('Exhibition Description:') ? exhibitor.message.split('Exhibition Description:')[1]?.split('\n\n')[0]?.trim() : 'Not specified'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Booth/Space Requirements:</span>
                            <span className="font-medium text-xs max-w-xs truncate" title={exhibitor.message?.includes('Booth/Space Requirements:') ? exhibitor.message.split('Booth/Space Requirements:')[1]?.trim() : 'Not specified'}>
                              {exhibitor.message?.includes('Booth/Space Requirements:') ? exhibitor.message.split('Booth/Space Requirements:')[1]?.trim() : 'Not specified'}
                            </span>
                          </div>
                        </div>

                        {/* Address Details */}
                        <div className="mt-4 space-y-3">
                          <h4 className="font-semibold text-gray-800 border-b pb-2">Organization Address</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Address:</span>
                              <span className="font-medium">{exhibitor.address || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">City:</span>
                              <span className="font-medium">{exhibitor.city || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">State:</span>
                              <span className="font-medium">{exhibitor.state || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">PIN Code:</span>
                              <span className="font-medium">{exhibitor.pinCode || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Registered: {formatDate(exhibitor.createdAt)}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex gap-2">
                            {exhibitor.status !== 'approved' && exhibitor.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(exhibitor.id, 'exhibitor', 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            )}
                            {exhibitor.status !== 'rejected' && exhibitor.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(exhibitor.id, 'exhibitor', 'rejected')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Reject
                              </Button>
                            )}
                            {exhibitor.status !== 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(exhibitor.id, 'exhibitor', 'pending')}
                              >
                                Reset to Pending
                              </Button>
                            )}
                            {exhibitor.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(exhibitor.id, 'exhibitor', 'withdrawn')}
                                className="bg-gray-600 hover:bg-gray-700 text-white"
                              >
                                Withdraw
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteRegistration(exhibitor.id, 'exhibitor')}
                              className="bg-red-800 hover:bg-red-900 text-white ml-auto"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Mini Tournaments Tab */}
            <TabsContent value="mini-tournaments">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Mini Tournament Registrations</h2>
                  <div className="flex gap-4 items-center">
                    <Badge className="bg-blue-100 text-blue-800 h-6">
                      Total: {miniTournamentRegistrations.length}
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 h-6">
                      Pending: {miniTournamentRegistrations.filter(r => r.status === 'pending').length}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 h-6">
                      Approved: {miniTournamentRegistrations.filter(r => r.status === 'approved').length}
                    </Badge>
                    <Button onClick={downloadMiniTournamentRegistrationsCSV} variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Download CSV
                    </Button>
                    <Button onClick={() => window.print()} variant="outline" size="sm" className="print:hidden">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>

                {/* Mini Games Tabs */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-600 mb-3">Filter by Game:</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedMiniGame === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedMiniGame('all')}
                      className={selectedMiniGame === 'all' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                    >
                      All Games ({miniTournamentRegistrations.length})
                    </Button>
                    {miniTournamentGames.map(game => {
                      const count = miniTournamentRegistrations.filter(r => getMiniTournamentGame(r) === game).length;
                      return (
                        <Button
                          key={game}
                          variant={selectedMiniGame === game ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedMiniGame(game)}
                          className={selectedMiniGame === game ? 'bg-blue-600 hover:bg-blue-700' : ''}
                        >
                          {game} ({count})
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Filtered Registrations */}
                {(() => {
                  const filteredRegistrations = selectedMiniGame === 'all'
                    ? miniTournamentRegistrations
                    : miniTournamentRegistrations.filter(r => getMiniTournamentGame(r) === selectedMiniGame);

                  if (filteredRegistrations.length === 0) {
                    return (
                      <div className="text-center py-8 text-gray-500">
                        <p>No registrations found for {selectedMiniGame === 'all' ? 'any game' : selectedMiniGame}.</p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredRegistrations.map((registration, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GamingIcon iconId={GamingIcons.GAMEPAD} size={20} color="#ff6b6b" />
                            <span className="text-lg font-semibold">{registration.fullName}</span>
                          </div>
                          <Badge 
                            className={`${
                              registration.status === 'approved' ? 'bg-green-100 text-green-800' :
                              registration.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {registration.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Registration ID:</span>
                            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{registration.registrationId}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Game:</span>
                            <span className="text-sm font-semibold">
                              {registration.message && registration.message.includes('Game:') 
                                ? registration.message.split('Game:')[1]?.split('\n')[0]?.trim() 
                                : 'Unknown'}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Nickname:</span>
                            <span className="text-sm font-semibold">{registration.collegeName || 'N/A'}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">WhatsApp:</span>
                            <span className="text-sm">{registration.phone}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Phone:</span>
                            <span className="text-sm">{registration.message && registration.message.includes('Phone Call:') 
                              ? registration.message.split('Phone Call:')[1]?.split('\n')[0]?.trim() 
                              : 'N/A'}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Age:</span>
                            <span className="text-sm">{registration.message && registration.message.includes('Age:') 
                              ? registration.message.split('Age:')[1]?.split('\n')[0]?.trim() 
                              : 'N/A'}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Gender:</span>
                            <span className="text-sm">{registration.message && registration.message.includes('Gender:') 
                              ? registration.message.split('Gender:')[1]?.split('\n')[0]?.trim() 
                              : 'N/A'}</span>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-gray-600">Passport Photo:</span>
                            <div className="text-sm font-medium">
                              <PassportPhotoDisplay registrationId={registration.registrationId} />
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Email:</span>
                            <span className="text-sm">{registration.email}</span>
                          </div>

                          {/* Address Details */}
                          <div className="mt-4 space-y-2 pt-2 border-t">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs">Address:</span>
                                <span className="font-medium text-right ml-4">{registration.address || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs">City/State:</span>
                                <span className="font-medium text-right">{registration.city}, {registration.state}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 text-xs">PIN:</span>
                                <span className="font-medium text-right">{registration.pinCode || 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Registered:</span>
                            <span className="text-sm">{formatDate(registration.createdAt)}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(registration.id, 'mini-tournament', 'approved')}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={registration.status === 'approved'}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(registration.id, 'mini-tournament', 'rejected')}
                            className="bg-red-600 hover:bg-red-700 text-white"
                            disabled={registration.status === 'rejected'}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(registration.id, 'mini-tournament', 'withdrawn')}
                            className="bg-gray-600 hover:bg-gray-700 text-white"
                            disabled={registration.status === 'withdrawn'}
                          >
                            Withdraw
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteRegistration(registration.id, 'mini-tournament')}
                            className="bg-red-800 hover:bg-red-900 text-white ml-auto"
                          >
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                    </div>
                  );
                })()}
              </div>
            </TabsContent>

            {/* Digital Art Competition Tab */}
            <TabsContent value="digital-art">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Digital Art Competition Registrations</h2>
                  <div className="flex gap-4 items-center">
                    <Badge className="bg-teal-100 text-teal-800 h-6">
                      Total: {digitalArtRegistrations.length}
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 h-6">
                      Pending: {digitalArtRegistrations.filter(r => r.status === 'pending').length}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 h-6">
                      Approved: {digitalArtRegistrations.filter(r => r.status === 'approved').length}
                    </Badge>
                    <Button onClick={downloadDigitalArtRegistrationsCSV} variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {digitalArtRegistrations.map((registration) => (
                    <Card key={registration.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className={`h-2 w-full ${
                        registration.status === 'pending' ? 'bg-orange-400' :
                        registration.status === 'approved' ? 'bg-green-500' :
                        registration.status === 'rejected' ? 'bg-red-500' : 'bg-gray-400'
                      }`} />
                      <CardHeader className="pb-3 border-b bg-gray-50/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-gray-900">{registration.fullName}</CardTitle>
                            <CardDescription className="text-xs mt-1">ID: {registration.registrationId}</CardDescription>
                          </div>
                          <Badge variant={
                            registration.status === 'approved' ? 'default' :
                            registration.status === 'rejected' ? 'destructive' :
                            registration.status === 'pending' ? 'outline' : 'secondary'
                          } className={registration.status === 'approved' ? 'bg-green-600' : ''}>
                            {registration.status?.toUpperCase() || 'PENDING'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Email:</span>
                          <span className="text-sm">{registration.email}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Phone:</span>
                          <span className="text-sm">{registration.phone}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Address:</span>
                          <span className="text-sm">{registration.address || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">District:</span>
                          <span className="text-sm">{registration.city || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">WhatsApp:</span>
                          <span className="text-sm">
                            {registration.message && registration.message.includes('WhatsApp:') 
                              ? registration.message.split('WhatsApp:')[1]?.split('\n')[0]?.trim() 
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">School/College/Org:</span>
                          <span className="text-sm">{registration.collegeName || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Device Type:</span>
                          <span className="text-sm">
                            {registration.message && registration.message.includes('Device Type:') 
                              ? registration.message.split('Device Type:')[1]?.split('\n')[0]?.trim() 
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Software:</span>
                          <span className="text-sm truncate max-w-[120px]" title={
                            registration.message && registration.message.includes('Software:') 
                              ? registration.message.split('Software:')[1]?.split('\n')[0]?.trim() 
                              : 'N/A'
                          }>
                            {registration.message && registration.message.includes('Software:') 
                              ? registration.message.split('Software:')[1]?.split('\n')[0]?.trim() 
                              : 'N/A'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Registered:</span>
                          <span className="text-sm">{formatDate(registration.createdAt)}</span>
                        </div>
                        
                        <div className="flex gap-2 mt-4 pt-2 border-t">
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(registration.id, 'digital-art', 'approved')}
                            className="bg-green-600 hover:bg-green-700 text-white flex-1"
                            disabled={registration.status === 'approved'}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(registration.id, 'digital-art', 'rejected')}
                            className="bg-red-600 hover:bg-red-700 text-white flex-1"
                            disabled={registration.status === 'rejected'}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteRegistration(registration.id, 'digital-art')}
                            className="bg-red-800 hover:bg-red-900 text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {digitalArtRegistrations.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                      <GamingIcon iconId={GamingIcons.MONITOR} size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No registrations yet</p>
                      <p className="text-sm mt-1">Digital Art Competition registrations will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* AI Video Registrations Tab */}
            <TabsContent value="ai-video">
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">AI Video Challenge Registrations</h3>
                    <p className="text-sm text-gray-500">Manage participants for the AI Creative Video Challenge</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Badge className="bg-gray-100 text-gray-800 h-6">
                      Total: {aiVideoRegistrations.length}
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 h-6">
                      Pending: {aiVideoRegistrations.filter(r => r.status === 'pending').length}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 h-6">
                      Approved: {aiVideoRegistrations.filter(r => r.status === 'approved').length}
                    </Badge>
                    <Button onClick={downloadAiVideoRegistrationsCSV} variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Export CSV
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiVideoRegistrations.map((registration) => (
                    <Card key={registration.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className={`h-2 w-full ${
                        registration.status === 'pending' ? 'bg-orange-400' :
                        registration.status === 'approved' ? 'bg-green-500' :
                        registration.status === 'rejected' ? 'bg-red-500' : 'bg-gray-400'
                      }`} />
                      <CardHeader className="pb-3 border-b bg-gray-50/50">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg text-gray-900">{registration.fullName}</CardTitle>
                            <CardDescription className="text-xs mt-1">ID: {registration.registrationId}</CardDescription>
                          </div>
                          <Badge variant={
                            registration.status === 'approved' ? 'default' :
                            registration.status === 'rejected' ? 'destructive' :
                            registration.status === 'pending' ? 'outline' : 'secondary'
                          } className={registration.status === 'approved' ? 'bg-green-600' : ''}>
                            {registration.status?.toUpperCase() || 'PENDING'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3">
                        <div className="space-y-4">
                          {/* Video Info */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-800 border-b pb-1 text-sm">Video Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <span className="font-medium text-gray-600">Title:</span>
                              <span className="truncate" title={registration.message?.includes('Video Title:') ? registration.message.split('Video Title:')[1]?.split('\n')[0]?.trim() : 'N/A'}>
                                {registration.message?.includes('Video Title:') ? registration.message.split('Video Title:')[1]?.split('\n')[0]?.trim() : 'N/A'}
                              </span>
                              
                              <span className="font-medium text-gray-600">Description:</span>
                              <span className="truncate" title={registration.message?.includes('Video Description:') ? registration.message.split('Video Description:')[1]?.split('\n')[0]?.trim() : 'N/A'}>
                                {registration.message?.includes('Video Description:') ? registration.message.split('Video Description:')[1]?.split('\n')[0]?.trim() : 'N/A'}
                              </span>
                              
                              <span className="font-medium text-gray-600">AI Tools:</span>
                              <span className="truncate" title={registration.message?.includes('AI Tools Used:') ? registration.message.split('AI Tools Used:')[1]?.split('\n')[0]?.trim() : 'N/A'}>
                                {registration.message?.includes('AI Tools Used:') ? registration.message.split('AI Tools Used:')[1]?.split('\n')[0]?.trim() : 'N/A'}
                              </span>
                              
                              <span className="font-medium text-gray-600">Video Link:</span>
                              <span>
                                {registration.message?.includes('Video URL:') && registration.message.split('Video URL:')[1]?.split('\n')[0]?.trim() !== 'N/A' && registration.message.split('Video URL:')[1]?.split('\n')[0]?.trim() !== '' ? (
                                  <a href={registration.message.split('Video URL:')[1]?.split('\n')[0]?.trim()} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                                    <ExternalLink className="h-3 w-3" /> View Video
                                  </a>
                                ) : 'N/A'}
                              </span>
                            </div>
                          </div>

                          {/* Participant Info */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-800 border-b pb-1 text-sm">Participant Info</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <span className="font-medium text-gray-600">Email:</span>
                              <span className="truncate" title={registration.email}>{registration.email}</span>
                              
                              <span className="font-medium text-gray-600">Mobile:</span>
                              <span>{registration.phone}</span>
                              
                              <span className="font-medium text-gray-600">WhatsApp:</span>
                              <span>{registration.message?.includes('WhatsApp:') ? registration.message.split('WhatsApp:')[1]?.split('\n')[0]?.trim() : 'N/A'}</span>
                              
                              <span className="font-medium text-gray-600">Age:</span>
                              <span>{registration.message?.includes('Age:') ? registration.message.split('Age:')[1]?.split('\n')[0]?.trim() : 'N/A'}</span>
                              
                              <span className="font-medium text-gray-600">Gender:</span>
                              <span>{registration.message?.includes('Gender:') ? registration.message.split('Gender:')[1]?.split('\n')[0]?.trim() : 'N/A'}</span>
                              
                              <span className="font-medium text-gray-600">District:</span>
                              <span className="truncate" title={registration.address || 'N/A'}>{registration.address || 'N/A'}</span>
                              
                              <span className="font-medium text-gray-600">Institution:</span>
                              <span className="truncate" title={registration.collegeName || 'N/A'}>{registration.collegeName || 'N/A'}</span>
                              
                              <span className="font-medium text-gray-600">Type:</span>
                              <span>{registration.message?.includes('Participant Type:') ? registration.message.split('Participant Type:')[1]?.split('\n')[0]?.trim() : 'N/A'}</span>
                            </div>
                          </div>
                          
                          {/* Entry Info */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-gray-800 border-b pb-1 text-sm">Entry Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <span className="font-medium text-gray-600">Entry Type:</span>
                              <span>{registration.message?.includes('Entry Type:') ? registration.message.split('Entry Type:')[1]?.split('\n')[0]?.trim() : 'N/A'}</span>
                              
                              {registration.message?.includes('Team Name:') && registration.message.split('Team Name:')[1]?.split('\n')[0]?.trim() && registration.message.split('Team Name:')[1]?.split('\n')[0]?.trim() !== 'N/A' && (
                                <>
                                  <span className="font-medium text-gray-600">Team Name:</span>
                                  <span className="truncate" title={registration.message.split('Team Name:')[1]?.split('\n')[0]?.trim()}>{registration.message.split('Team Name:')[1]?.split('\n')[0]?.trim()}</span>
                                  
                                  <span className="font-medium text-gray-600">Team Members:</span>
                                  <span className="truncate" title={registration.message?.includes('Team Members:') ? registration.message.split('Team Members:')[1]?.split('\n')[0]?.trim() : 'N/A'}>{registration.message?.includes('Team Members:') ? registration.message.split('Team Members:')[1]?.split('\n')[0]?.trim() : 'N/A'}</span>
                                </>
                              )}
                              
                              <span className="font-medium text-gray-600">Registered:</span>
                              <span>{formatDate(registration.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4 pt-2 border-t">
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(registration.id, 'ai-video', 'approved')}
                            className="bg-green-600 hover:bg-green-700 text-white flex-1"
                            disabled={registration.status === 'approved'}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(registration.id, 'ai-video', 'rejected')}
                            className="bg-red-600 hover:bg-red-700 text-white flex-1"
                            disabled={registration.status === 'rejected'}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteRegistration(registration.id, 'ai-video')}
                            className="bg-red-800 hover:bg-red-900 text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {aiVideoRegistrations.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                      <GamingIcon iconId={GamingIcons.GAMEPAD} size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-lg font-medium">No registrations yet</p>
                      <p className="text-sm mt-1">AI Video Challenge registrations will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

          {/* Content Management Tab */}
            <TabsContent value="content">
              <ContentManagement />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
