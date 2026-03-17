import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Calendar, Gamepad2, Search, RefreshCw, FileText } from 'lucide-react';
import GamingIcon, { GamingIcons } from "@/components/GamingIcons";
import { useRegistrationAPI } from '@/hooks/useRegistrationAPI';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { TeamRegistration, SponsorRegistration, VisitorRegistration, MediaPersonRegistration } from '@/lib/firebase';

// Helper function to format dates in day/month/year format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const AdminDashboard = () => {
  const { adminUser, logout } = useAdminAuth();
  const { 
    loading, 
    error, 
    submitTeamRegistration, 
    submitSponsorRegistration, 
    submitVisitorRegistration,
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
    updateMediaStatus
  } = useRegistrationAPI();

  const [stats, setStats] = useState<any>(null);
  const [teamRegistrations, setTeamRegistrations] = useState<TeamRegistration[]>([]);
  const [sponsorRegistrations, setSponsorRegistrations] = useState<SponsorRegistration[]>([]);
  const [visitorRegistrations, setVisitorRegistrations] = useState<VisitorRegistration[]>([]);
  const [mediaRegistrations, setMediaRegistrations] = useState<MediaPersonRegistration[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [sponsorshipTiers, setSponsorshipTiers] = useState<any[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
      setTeamRegistrations(teams || []);
      setSponsorRegistrations(sponsors || []);
      setVisitorRegistrations(visitors || []);
      setMediaRegistrations(media || []);
      setGames(gamesData || []);
      setSponsorshipTiers(sponsorshipTiersData || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setDashboardLoading(false);
    }
  };

  const getGameName = (gameId: string | any) => {
    // Log every call to getGameName for debugging
    console.log('=== getGameName called ===');
    console.log('Raw gameId input:', gameId, 'Type:', typeof gameId, 'Value:', JSON.stringify(gameId));
    console.log('Available games in state:', games);
    
    // Handle null/undefined/empty cases
    if (!gameId || gameId === '' || gameId === 'undefined' || gameId === 'null') {
      console.log('Returning Unknown Game due to null/empty');
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
        gameIdStr = gameId.toString();
      } else if (typeof gameId === 'object') {
        // Handle different object structures
        if (gameId.id) {
          gameIdStr = String(gameId.id);
        } else if (gameId.gameId) {
          gameIdStr = String(gameId.gameId);
        } else {
          // Last resort - convert entire object to string and extract potential ID
          const objStr = JSON.stringify(gameId);
          console.log('Complex object detected:', objStr);
          // Try to extract ID from JSON string
          const idMatch = objStr.match(/"id":\s*"([^"]+)"/);
          if (idMatch && idMatch[1]) {
            gameIdStr = idMatch[1];
            console.log('Extracted ID from JSON:', gameIdStr);
          } else {
            // Try to extract any string that looks like an ID
            const anyStringMatch = objStr.match(/"([^"]{4,})"/);
            if (anyStringMatch && anyStringMatch[1]) {
              gameIdStr = anyStringMatch[1];
              console.log('Extracted any string from JSON:', gameIdStr);
            } else {
              gameIdStr = objStr; // Fallback to full JSON string
              console.log('Using full JSON as fallback:', gameIdStr);
            }
          }
        }
      } else {
        gameIdStr = String(gameId);
      }
    } catch (error) {
      console.log('Error converting gameId to string:', error);
      gameIdStr = String(gameId);
    }
    
    console.log('Final converted gameId string:', gameIdStr, 'from type:', typeof gameId);
    
    // Try to find in Firebase games first
    if (games.length > 0) {
      const foundGame = games.find(g => g.id === gameIdStr);
      if (foundGame) {
        console.log('Found in Firebase games:', foundGame.name);
        return foundGame.name;
      }
      console.log('Not found in Firebase games. Available IDs:', games.map(g => g.id));
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
      console.log('Direct match found:', gameIdStr, '->', directMap[gameIdStr]);
      return directMap[gameIdStr];
    }
    
    // Pattern matching
    if (gameIdStr.includes('bgmi') || gameIdStr.includes('450') || gameIdStr.includes('nkf9')) {
      console.log('Pattern match: BGMI');
      return 'BGMI';
    }
    if (gameIdStr.includes('mobile') || gameIdStr.includes('legends') || gameIdStr.includes('451') || gameIdStr.includes('T55Ke')) {
      console.log('Pattern match: Mobile Legends');
      return 'Mobile Legends';
    }
    
    console.log('No match found, returning Unknown Game for:', gameIdStr);
    console.log('Available direct mappings:', Object.keys(directMap));
    return 'Unknown Game';
  };

  const getSponsorshipTierName = (tierId: string) => {
    // Handle null/undefined/empty cases
    if (!tierId || tierId === '' || tierId === 'undefined' || tierId === 'null') {
      return 'Unknown Tier';
    }
    
    console.log('Looking for tier ID:', tierId, 'Available tiers:', sponsorshipTiers);
    
    // First try to find in loaded tiers
    const tier = sponsorshipTiers.find(t => t.id === tierId);
    if (tier && tier.name) {
      console.log('Found tier name:', tier.name);
      return tier.name;
    }
    
    // Fallback mapping for common tier IDs
    const tierMap: { [key: string]: string } = {
      '1': 'Title Sponsor',
      '2': 'Powered By Sponsor',
      '3': 'Associate Sponsor',
      '4': 'Category Partner',
      'title': 'Title Sponsor',
      'powered': 'Powered By Sponsor',
      'associate': 'Associate Sponsor',
      'category': 'Category Partner',
      'gold': 'Title Sponsor',
      'silver': 'Powered By Sponsor',
      'bronze': 'Associate Sponsor',
      'platinum': 'Category Partner',
      'tier_1': 'Title Sponsor',
      'tier_2': 'Powered By Sponsor',
      'tier_3': 'Associate Sponsor',
      'tier_4': 'Category Partner'
    };
    
    const fallbackName = tierMap[tierId] || 'Unknown Tier';
    console.log('Using fallback tier name:', fallbackName);
    return fallbackName;
  };

  // Status Management Functions
  const handleStatusUpdate = async (id: string, type: 'team' | 'sponsor' | 'visitor' | 'media', status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'withdrawn' | 'removed') => {
    console.log('=== Status Update Called ===');
    console.log('ID:', id, 'Type:', type, 'New Status:', status);
    
    let success = false;
    
    try {
      switch (type) {
        case 'team':
          console.log('Calling updateTeamStatus...');
          success = await updateTeamStatus(id, status);
          break;
        case 'sponsor':
          console.log('Calling updateSponsorStatus...');
          success = await updateSponsorStatus(id, status);
          break;
        case 'visitor':
          console.log('Calling updateVisitorStatus...');
          success = await updateVisitorStatus(id, status);
          break;
        case 'media':
          console.log('Calling updateMediaStatus...');
          success = await updateMediaStatus(id, status);
          break;
      }
      
      console.log('Status update result:', success);
      
      if (success) {
        console.log('Status update successful, reloading data...');
        // Reload data to reflect changes
        loadDashboardData();
      } else {
        console.log('Status update failed');
      }
    } catch (error) {
      console.error('Error in handleStatusUpdate:', error);
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

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
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
      'teamMembers_IGNs',
      'teamMembers_IDs',
      'substitute_IGN',
      'substitute_ID',
      'hasSubstitute',
      'termsAccepted',
      'createdAt',
      'updatedAt'
    ];

    const csvData = filterRegistrations(teamRegistrations).map(team => {
      // Extract team members IGNs and IDs
      const teamMemberIGNs = team.teamMembers?.map(member => member.ign || '').join('; ') || '';
      const teamMemberIDs = team.teamMembers?.map(member => member.gameId || '').join('; ') || '';
      
      // Extract substitute IGN and ID if available
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
        teamMembers_IGNs: teamMemberIGNs,
        teamMembers_IDs: teamMemberIDs,
        substitute_IGN: substituteIGN,
        substitute_ID: substituteID,
        hasSubstitute: team.substitute ? 'Yes' : 'No',
        termsAccepted: team.termsAccepted ? 'Yes' : 'No',
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
      'status',
      'createdAt',
      'updatedAt'
    ];

    const csvData = filterRegistrations(sponsorRegistrations).map(sponsor => {
      // Enhanced sponsored amount calculation with tier mapping
      let tier = sponsorshipTiers.find(t => String(t.id) === String(sponsor.sponsorshipTierId));
      let sponsoredAmount = '';
      
      if (!tier) {
        // Map common tier IDs to amounts
        const tierMapping = {
          1: '₹5,00,000+',  // Title Sponsor
          2: '₹2,50,000',  // Powered By Sponsor  
          3: '₹1,00,000',  // Associate Sponsor
          4: 'Custom/In-Kind' // Category Partner
        };
        
        const mappedAmount = tierMapping[sponsor.sponsorshipTierId as keyof typeof tierMapping];
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
        status: sponsor.status || '',
        createdAt: formatDate(sponsor.createdAt),
        updatedAt: formatDate(sponsor.updatedAt)
      };
    });

    downloadCSV(csvData, 'sponsor_registrations', headers);
  };

  const downloadVisitorRegistrationsCSV = () => {
    const headers = [
      'registrationId',
      'fullName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'pinCode',
      'status',
      'createdAt',
      'updatedAt'
    ];

    const csvData = filterRegistrations(visitorRegistrations).map(visitor => ({
      registrationId: visitor.registrationId || '',
      fullName: visitor.fullName || '',
      email: visitor.email || '',
      phone: visitor.phone || '',
      address: visitor.address || '',
      city: visitor.city || '',
      state: visitor.state || '',
      pinCode: visitor.pinCode || '',
      status: visitor.status || '',
      createdAt: formatDate(visitor.createdAt),
      updatedAt: formatDate(visitor.updatedAt)
    }));

    downloadCSV(csvData, 'visitor_registrations', headers);
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

    const csvData = filterRegistrations(mediaRegistrations).map(media => ({
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-orange-100 text-orange-800';
      case 'withdrawn': return 'bg-purple-100 text-purple-800';
      case 'removed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <span className="w-4 h-4 text-green-600">✓</span>;
      case 'rejected': return <span className="w-4 h-4 text-red-600">✗</span>;
      case 'cancelled': return <span className="w-4 h-4 text-orange-600">⊘</span>;
      case 'withdrawn': return <span className="w-4 h-4 text-gray-600">←</span>;
      case 'removed': return <span className="w-4 h-4 text-red-600">🗑</span>;
      case 'pending': return <span className="w-4 h-4 text-blue-600">⏱</span>;
      default: return <span className="w-4 h-4 text-blue-600">⏱</span>;
    }
  };

  const filterRegistrations = (registrations: any[]) => {
    return registrations.filter(reg => {
      const matchesSearch = searchTerm === '' || 
        reg.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.captainName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Teams</p>
                  <p className="text-3xl font-bold text-purple-600">{stats?.totalTeams || 0}</p>
                </div>
                <GamingIcon iconId={GamingIcons.USERS} size={32} color="#9333ea" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Sponsors</p>
                  <p className="text-3xl font-bold text-green-600">{stats?.totalSponsors || 0}</p>
                </div>
                <GamingIcon iconId={GamingIcons.PARTNERSHIP} size={32} color="#16a34a" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Visitors</p>
                  <p className="text-3xl font-bold text-blue-600">{stats?.totalVisitors || 0}</p>
                </div>
                <GamingIcon iconId={GamingIcons.EYE} size={32} color="#2563eb" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Media</p>
                  <p className="text-3xl font-bold text-pink-600">{mediaRegistrations.length || 0}</p>
                </div>
                <GamingIcon iconId={GamingIcons.EYE} size={32} color="#ec4899" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {(stats?.pendingTeams || 0) + (stats?.pendingSponsors || 0) + (stats?.pendingVisitors || 0) + mediaRegistrations.filter(m => m.status === 'pending').length}
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
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
              <TabsTrigger value="visitors">Visitors</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Registration Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Teams Approved</span>
                        <Badge className="bg-green-100 text-green-800">
                          {stats?.approvedTeams || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Sponsors Approved</span>
                        <Badge className="bg-green-100 text-green-800">
                          {stats?.approvedSponsors || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Visitors Approved</span>
                        <Badge className="bg-green-100 text-green-800">
                          {stats?.approvedVisitors || 0}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Media Approved</span>
                        <Badge className="bg-green-100 text-green-800">
                          {mediaRegistrations.filter(m => m.status === 'approved').length}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[...teamRegistrations.slice(0, 3), ...sponsorRegistrations.slice(0, 2)].map((reg, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">
                            {(reg as any).teamName || (reg as any).companyName || (reg as any).fullName}
                          </span>
                          <Badge className={getStatusColor((reg as any).status)}>
                            {(reg as any).status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5" />
                      Game Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">BGMI Teams</span>
                        <span className="font-semibold">Coming soon</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Mobile Legends Teams</span>
                        <span className="font-semibold">Coming soon</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Teams Tab */}
            <TabsContent value="teams">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
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
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
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
                  </div>
                </div>

                <div className="grid gap-4">
                  {filterRegistrations(teamRegistrations).map((team) => (
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
                                <div className="flex justify-between">
                                  <span className="text-gray-600">College Name:</span>
                                  <span className="font-medium">{team.collegeName}</span>
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
                                    <div className="text-gray-600">IGN: {member.ign || 'N/A'}</div>
                                    <div className="text-gray-600">Game: {team.gameId ? getGameName(team.gameId) : 'Game Not Selected'}</div>
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
                                <div className="text-gray-600">IGN: {team.substitute?.ign || 'N/A'}</div>
                                <div className="text-gray-600">Game ID: {team.substitute?.gameId || 'N/A'}</div>
                                <div className="text-gray-600">Game: {team.substitute?.gameId ? getGameName(team.substitute.gameId) : 'Game Not Selected'}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Registration Info */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Registered: {formatDate(team.createdAt)}</span>
                            <span>Terms Accepted: {team.termsAccepted ? '✅ Yes' : '❌ No'}</span>
                          </div>
                        </div>

                        {/* Status Management */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex gap-2 flex-wrap">
                            {team.status !== 'approved' && team.status !== 'cancelled' && team.status !== 'withdrawn' && team.status !== 'removed' && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  console.log('Full team object:', team);
                                  console.log('Team ID being used:', team.id);
                                  console.log('Team Registration ID:', team.registrationId);
                                  console.log('All team properties:', Object.keys(team));
                                  handleStatusUpdate(team.id, 'team', 'approved');
                                }}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            )}
                            {team.status !== 'rejected' && team.status !== 'cancelled' && team.status !== 'withdrawn' && team.status !== 'removed' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(team.id, 'team', 'rejected')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Reject
                              </Button>
                            )}
                            {team.status !== 'pending' && team.status !== 'cancelled' && team.status !== 'withdrawn' && team.status !== 'removed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(team.id, 'team', 'pending')}
                              >
                                Reset to Pending
                              </Button>
                            )}
                            {team.status !== 'cancelled' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(team.id, 'team', 'cancelled')}
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                              >
                                Cancel
                              </Button>
                            )}
                            {team.status !== 'withdrawn' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(team.id, 'team', 'withdrawn')}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                              >
                                Withdrawn
                              </Button>
                            )}
                            {team.status !== 'removed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(team.id, 'team', 'removed')}
                                className="bg-gray-600 hover:bg-gray-700 text-white"
                              >
                                Remove
                              </Button>
                            )}
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
                  <div className="flex gap-4">
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
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
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
                  </div>
                </div>

                <div className="grid gap-4">
                  {filterRegistrations(sponsorRegistrations).map((sponsor) => (
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
                              <div className="flex justify-between">
                                <span className="text-gray-600">Sponsored Amount:</span>
                                <span className="font-medium text-green-600">
                                  {(() => {
                                    // Try to find tier by ID first
                                    let tier = sponsorshipTiers.find(t => String(t.id) === String(sponsor.sponsorshipTierId));
                                    
                                    // If not found, try to match by tier name or create mapping
                                    if (!tier) {
                                      // Map common tier IDs to amounts
                                      const tierMapping = {
                                        1: '₹5,00,000+',  // Title Sponsor
                                        2: '₹2,50,000',  // Powered By Sponsor  
                                        3: '₹1,00,000',  // Associate Sponsor
                                        4: 'Custom/In-Kind' // Category Partner
                                      };
                                      
                                      const mappedAmount = tierMapping[sponsor.sponsorshipTierId as keyof typeof tierMapping];
                                      if (mappedAmount) {
                                        return mappedAmount;
                                      }
                                    }
                                    
                                    // Fallback: use first available tier
                                    const fallbackTier = tier || sponsorshipTiers[0];
                                    const amount = fallbackTier?.price || 0;
                                    
                                    return amount > 0 ? amount : 'Not specified';
                                  })()}
                                </span>
                              </div>
                              {sponsor.message && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Message:</span>
                                  <span className="font-medium text-xs max-w-xs">{sponsor.message}</span>
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
                            {sponsor.status !== 'approved' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(sponsor.id, 'sponsor', 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            )}
                            {sponsor.status !== 'rejected' && (
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
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Visitors Tab */}
            <TabsContent value="visitors">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search visitors..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={loadDashboardData} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button onClick={downloadVisitorRegistrationsCSV} variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Download CSV
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {filterRegistrations(visitorRegistrations).map((visitor) => (
                    <Card key={visitor.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{visitor.fullName}</h3>
                            <p className="text-sm text-gray-600">ID: {visitor.registrationId}</p>
                            <p className="text-sm text-gray-600">Visitor Registration</p>
                          </div>
                          <Badge className={getStatusColor(visitor.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(visitor.status)}
                              {visitor.status}
                            </span>
                          </Badge>
                        </div>
                        
                        {/* Visitor Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 border-b pb-2">Personal Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Full Name:</span>
                                <span className="font-medium">{visitor.fullName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium text-xs">{visitor.email}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium">{visitor.phone}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 border-b pb-2">Registration Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Registration ID:</span>
                                <span className="font-medium">{visitor.registrationId}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className="font-medium capitalize">{visitor.status}</span>
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
                              <span className="font-medium">{visitor.address || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">City:</span>
                              <span className="font-medium">{visitor.city || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">State:</span>
                              <span className="font-medium">{visitor.state || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">PIN Code:</span>
                              <span className="font-medium">{visitor.pinCode || 'N/A'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Registration Info */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Registered: {formatDate(visitor.createdAt)}</span>
                            <span>Last Updated: {formatDate(visitor.updatedAt)}</span>
                          </div>
                        </div>

                        {/* Status Management */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex gap-2">
                            {visitor.status !== 'approved' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(visitor.id, 'visitor', 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            )}
                            {visitor.status !== 'rejected' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(visitor.id, 'visitor', 'rejected')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Reject
                              </Button>
                            )}
                            {visitor.status !== 'pending' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(visitor.id, 'visitor', 'pending')}
                              >
                                Reset to Pending
                              </Button>
                            )}
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
                        placeholder="Search media persons..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
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
                  </div>
                </div>

                <div className="grid gap-4">
                  {filterRegistrations(mediaRegistrations).map((media) => (
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
                            {media.status !== 'approved' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(media.id, 'media', 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                            )}
                            {media.status !== 'rejected' && (
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
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
