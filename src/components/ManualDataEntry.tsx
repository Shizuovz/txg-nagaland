import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Save, Users, Building2, Eye, Camera, Star, Target, Monitor } from 'lucide-react';
import { useRegistrationAPI } from '@/hooks/useRegistrationAPI';
import { toast } from 'sonner';

const ManualDataEntry = () => {
  const { 
    submitTeamRegistration, 
    submitSponsorRegistration, 
    submitVisitorRegistration,
    submitMediaRegistration,
    getGames,
    getColleges,
    getSponsorshipTiers,
    loading
  } = useRegistrationAPI();

  const [activeEntryType, setActiveEntryType] = useState('inter-college');
  const [games, setGames] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [sponsorshipTiers, setSponsorshipTiers] = useState<any[]>([]);

  // Inter-College registration state
  const [collegeData, setCollegeData] = useState({
    teamName: '',
    collegeName: '',
    captainName: '',
    captainEmail: '',
    captainPhone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    teamMembers: [
      { ign: '', gameId: '' },
      { ign: '', gameId: '' },
      { ign: '', gameId: '' },
      { ign: '', gameId: '' },
      { ign: '', gameId: '' }
    ],
    substitute: { ign: '', gameId: '' },
    termsAccepted: false
  });

  // Cosplayer registration state
  const [cosplayerData, setCosplayerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    groupName: '',
    experience: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    termsAccepted: false
  });

  // Vendor registration state
  const [vendorData, setVendorData] = useState({
    companyName: '',
    vendorType: '',
    description: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    termsAccepted: false
  });

  // Exhibitor registration state
  const [exhibitorData, setExhibitorData] = useState({
    companyName: '',
    description: '',
    boothRequirements: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    termsAccepted: false
  });

  // Sponsor registration state
  const [sponsorData, setSponsorData] = useState({
    companyName: '',
    sponsorshipTier: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    marketingGoals: '',
    termsAccepted: false
  });

  // Media registration state
  const [mediaData, setMediaData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    termsAccepted: false
  });

  useEffect(() => {
    loadReferenceData();
  }, []);

  const loadReferenceData = async () => {
    const [gamesData, collegesData, sponsorshipTiersData] = await Promise.all([
      getGames(),
      getColleges(),
      getSponsorshipTiers()
    ]);
    
    if (gamesData) setGames(gamesData);
    if (collegesData) setColleges(collegesData);
    if (sponsorshipTiersData) setSponsorshipTiers(sponsorshipTiersData);
  };

  const handleCollegeSubmit = async () => {
    if (!collegeData.teamName || !collegeData.captainName || !collegeData.captainEmail || !collegeData.captainPhone || !collegeData.address || !collegeData.city || !collegeData.state || !collegeData.pinCode) {
      toast.error('Please fill all required college registration fields');
      return;
    }

    const result = await submitTeamRegistration({
      teamName: collegeData.teamName,
      registrationType: 'college',
      gameId: games.find(g => g.name === 'Mobile Legends')?.id || '',
      collegeName: collegeData.collegeName,
      captainName: collegeData.captainName,
      captainEmail: collegeData.captainEmail,
      captainPhone: collegeData.captainPhone,
      address: collegeData.address,
      city: collegeData.city,
      state: collegeData.state,
      pinCode: collegeData.pinCode,
      teamMembers: collegeData.teamMembers,
      substitute: collegeData.substitute,
      termsAccepted: collegeData.termsAccepted
    });

    if (result) {
      toast.success('College team registration added manually');
      // Reset form
      setCollegeData({
        teamName: '',
        collegeName: '',
        captainName: '',
        captainEmail: '',
        captainPhone: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
        teamMembers: [
          { ign: '', gameId: '' },
          { ign: '', gameId: '' },
          { ign: '', gameId: '' },
          { ign: '', gameId: '' },
          { ign: '', gameId: '' }
        ],
        substitute: { ign: '', gameId: '' },
        termsAccepted: false
      });
    }
  };

  const handleCosplayerSubmit = async () => {
    if (!cosplayerData.fullName || !cosplayerData.email || !cosplayerData.phone || !cosplayerData.address || !cosplayerData.city || !cosplayerData.state || !cosplayerData.pinCode) {
      toast.error('Please fill all required cosplayer fields');
      return;
    }

    // Generate registration ID for cosplayer
    const registrationId = `COS${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    const result = await submitVisitorRegistration({
      fullName: cosplayerData.fullName,
      email: cosplayerData.email,
      phone: cosplayerData.phone,
      address: cosplayerData.address,
      city: cosplayerData.city,
      state: cosplayerData.state,
      pinCode: cosplayerData.pinCode,
      registrationId: registrationId
    }, 'Cosplayer registration added manually');

    if (result) {
      toast.success('Cosplayer registration added manually');
      setCosplayerData({
        fullName: '',
        email: '',
        phone: '',
        groupName: '',
        experience: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
        termsAccepted: false
      });
    }
  };

  const handleVendorSubmit = async () => {
    if (!vendorData.companyName || !vendorData.vendorType || !vendorData.description || !vendorData.contactPerson || !vendorData.contactEmail || !vendorData.contactPhone || !vendorData.address || !vendorData.city || !vendorData.state || !vendorData.pinCode) {
      toast.error('Please fill all required vendor fields');
      return;
    }

    // Generate registration ID for vendor
    const registrationId = `VEN${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    const result = await submitSponsorRegistration({
      companyName: vendorData.companyName,
      sponsorshipTierId: '1', // Default tier for vendors
      contactPerson: vendorData.contactPerson,
      contactEmail: vendorData.contactEmail,
      contactPhone: vendorData.contactPhone,
      address: vendorData.address,
      city: vendorData.city,
      state: vendorData.state,
      pinCode: vendorData.pinCode,
      message: `Vendor Type: ${vendorData.vendorType}\n\n${vendorData.description}`, // Include vendor type in message
      registrationId: registrationId
    }, 'Vendor registration added manually');

    if (result) {
      toast.success('Vendor registration added manually');
      setVendorData({
        companyName: '',
        vendorType: '',
        description: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
        termsAccepted: false
      });
    }
  };

  const handleExhibitorSubmit = async () => {
    if (!exhibitorData.companyName || !exhibitorData.description || !exhibitorData.contactPerson || !exhibitorData.contactEmail || !exhibitorData.contactPhone || !exhibitorData.address || !exhibitorData.city || !exhibitorData.state || !exhibitorData.pinCode) {
      toast.error('Please fill all required exhibitor fields');
      return;
    }

    // Generate registration ID for exhibitor
    const registrationId = `EXH${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    const result = await submitSponsorRegistration({
      companyName: exhibitorData.companyName,
      sponsorshipTierId: '2', // Default tier for exhibitors
      contactPerson: exhibitorData.contactPerson,
      contactEmail: exhibitorData.contactEmail,
      contactPhone: exhibitorData.contactPhone,
      address: exhibitorData.address,
      city: exhibitorData.city,
      state: exhibitorData.state,
      pinCode: exhibitorData.pinCode,
      message: `Booth Requirements: ${exhibitorData.boothRequirements}\n\n${exhibitorData.description}`,
      registrationId: registrationId
    }, 'Exhibitor registration added manually');

    if (result) {
      toast.success('Exhibitor registration added manually');
      setExhibitorData({
        companyName: '',
        description: '',
        boothRequirements: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
        termsAccepted: false
      });
    }
  };

  const handleSponsorSubmit = async () => {
    if (!sponsorData.companyName || !sponsorData.contactPerson || !sponsorData.contactEmail || !sponsorData.contactPhone || !sponsorData.sponsorshipTier) {
      toast.error('Please fill all required sponsor fields');
      return;
    }

    // Map sponsorship tier to tier ID
    const tierMapping: { [key: string]: string } = {
      'title': '1',
      'powered-by': '2', 
      'associate': '3',
      'category': '4'
    };

    const result = await submitSponsorRegistration({
      companyName: sponsorData.companyName,
      sponsorshipTierId: tierMapping[sponsorData.sponsorshipTier] || '1',
      contactPerson: sponsorData.contactPerson,
      contactEmail: sponsorData.contactEmail,
      contactPhone: sponsorData.contactPhone,
      message: sponsorData.marketingGoals
    }, 'Sponsor registration added manually');

    if (result) {
      toast.success('Sponsor registration added manually');
      setSponsorData({
        companyName: '',
        sponsorshipTier: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: '',
        marketingGoals: '',
        termsAccepted: false
      });
    }
  };

  const handleMediaSubmit = async () => {
    if (!mediaData.fullName || !mediaData.email || !mediaData.phone) {
      toast.error('Please fill all required media fields');
      return;
    }

    const result = await submitMediaRegistration({
      fullName: mediaData.fullName,
      email: mediaData.email,
      phone: mediaData.phone,
      organization: mediaData.organization,
      role: mediaData.role,
      address: mediaData.address,
      city: mediaData.city,
      state: mediaData.state,
      pinCode: mediaData.pinCode
    });

    if (result) {
      toast.success('Media registration added manually');
      setMediaData({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
        termsAccepted: false
      });
    }
  };

  const updateTeamMember = (index: number, field: 'ign' | 'gameId', value: string) => {
    setCollegeData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Manual Data Entry
            </CardTitle>
            <p className="text-sm text-gray-600">
              Enter registration data manually when automatic collection fails
            </p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeEntryType} onValueChange={setActiveEntryType}>
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="inter-college">Inter-College</TabsTrigger>
                <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
                <TabsTrigger value="cosplayers">Cosplayers</TabsTrigger>
                <TabsTrigger value="vendors">Vendors</TabsTrigger>
                <TabsTrigger value="exhibitors">Exhibitors</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>

              {/* Inter-College Registration Form */}
              <TabsContent value="inter-college" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="teamName">Team Name *</Label>
                    <Input
                      id="teamName"
                      value={collegeData.teamName}
                      onChange={(e) => setCollegeData(prev => ({ ...prev, teamName: e.target.value }))}
                      placeholder="Enter team name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="collegeName">College Name *</Label>
                    <Select value={collegeData.collegeName} onValueChange={(value) => setCollegeData(prev => ({ ...prev, collegeName: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select college" />
                      </SelectTrigger>
                      <SelectContent>
                        {colleges.map((college) => (
                          <SelectItem key={college.id} value={college.name}>
                            {college.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="captainName">Team Captain Name *</Label>
                    <Input
                      id="captainName"
                      value={collegeData.captainName}
                      onChange={(e) => setCollegeData(prev => ({ ...prev, captainName: e.target.value }))}
                      placeholder="Enter captain name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="captainEmail">Captain Email *</Label>
                    <Input
                      id="captainEmail"
                      type="email"
                      value={collegeData.captainEmail}
                      onChange={(e) => setCollegeData(prev => ({ ...prev, captainEmail: e.target.value }))}
                      placeholder="Enter captain email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="captainPhone">Captain Phone *</Label>
                    <Input
                      id="captainPhone"
                      value={collegeData.captainPhone}
                      onChange={(e) => setCollegeData(prev => ({ ...prev, captainPhone: e.target.value }))}
                      placeholder="Enter captain phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={collegeData.city}
                      onChange={(e) => setCollegeData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={collegeData.state}
                      onChange={(e) => setCollegeData(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pinCode">PIN Code *</Label>
                    <Input
                      id="pinCode"
                      value={collegeData.pinCode}
                      onChange={(e) => setCollegeData(prev => ({ ...prev, pinCode: e.target.value }))}
                      placeholder="Enter pin code"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={collegeData.address}
                    onChange={(e) => setCollegeData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter complete address"
                    rows={3}
                  />
                </div>

                {/* Team Members */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Team Members (5 Players Required for Mobile Legends)
                  </Label>
                  <div className="space-y-4">
                    {collegeData.teamMembers.map((member, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-card">
                        <div>
                          <Label htmlFor={`member-${index}-ign`}>Player {index + 1} IGN *</Label>
                          <Input
                            id={`member-${index}-ign`}
                            value={member.ign}
                            onChange={(e) => updateTeamMember(index, 'ign', e.target.value)}
                            placeholder="In-game name"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`member-${index}-gameId`}>Game ID *</Label>
                          <Input
                            id={`member-${index}-gameId`}
                            value={member.gameId}
                            onChange={(e) => updateTeamMember(index, 'gameId', e.target.value)}
                            placeholder="Game-specific ID"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Substitute */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Substitute Player (Optional)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-card">
                    <div>
                      <Label htmlFor="sub-ign">Substitute IGN</Label>
                      <Input
                        id="sub-ign"
                        value={collegeData.substitute.ign}
                        onChange={(e) => setCollegeData(prev => ({ 
                          ...prev, 
                          substitute: { ...prev.substitute, ign: e.target.value } 
                        }))}
                        placeholder="Substitute player IGN"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sub-gameId">Game ID</Label>
                      <Input
                        id="sub-gameId"
                        value={collegeData.substitute.gameId}
                        onChange={(e) => setCollegeData(prev => ({ 
                          ...prev, 
                          substitute: { ...prev.substitute, gameId: e.target.value } 
                        }))}
                        placeholder="Substitute game ID"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="termsAccepted"
                    checked={collegeData.termsAccepted}
                    onChange={(e) => setCollegeData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                  />
                  <Label htmlFor="termsAccepted">Terms and conditions accepted</Label>
                </div>

                <Button onClick={handleCollegeSubmit} disabled={loading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save College Registration'}
                </Button>
              </TabsContent>

              {/* Sponsors Registration Form */}
              <TabsContent value="sponsors" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sponsorCompanyName">Company Name *</Label>
                    <Input
                      id="sponsorCompanyName"
                      value={sponsorData.companyName}
                      onChange={(e) => setSponsorData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sponsorshipTier">Sponsorship Tier *</Label>
                    <Select value={sponsorData.sponsorshipTier} onValueChange={(value) => setSponsorData(prev => ({ ...prev, sponsorshipTier: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sponsorship tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="title">Title Sponsor</SelectItem>
                        <SelectItem value="powered-by">Powered By</SelectItem>
                        <SelectItem value="associate">Associate</SelectItem>
                        <SelectItem value="category">Category Partner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sponsorContactPerson">Contact Person *</Label>
                    <Input
                      id="sponsorContactPerson"
                      value={sponsorData.contactPerson}
                      onChange={(e) => setSponsorData(prev => ({ ...prev, contactPerson: e.target.value }))}
                      placeholder="Enter contact person name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sponsorContactEmail">Contact Email *</Label>
                    <Input
                      id="sponsorContactEmail"
                      type="email"
                      value={sponsorData.contactEmail}
                      onChange={(e) => setSponsorData(prev => ({ ...prev, contactEmail: e.target.value }))}
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sponsorContactPhone">Contact Phone *</Label>
                    <Input
                      id="sponsorContactPhone"
                      value={sponsorData.contactPhone}
                      onChange={(e) => setSponsorData(prev => ({ ...prev, contactPhone: e.target.value }))}
                      placeholder="Enter contact phone"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="sponsorMarketingGoals">Marketing Goals & Objectives</Label>
                  <Textarea
                    id="sponsorMarketingGoals"
                    value={sponsorData.marketingGoals}
                    onChange={(e) => setSponsorData(prev => ({ ...prev, marketingGoals: e.target.value }))}
                    placeholder="Tell us about your marketing goals and what you hope to achieve through this partnership..."
                    rows={4}
                  />
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Building2 className="h-4 w-4 text-secondary" />
                    Sponsorship Benefits
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Brand visibility across all event materials</li>
                    <li>• Live streaming mentions and logo placement</li>
                    <li>• On-stage recognition and prize distribution</li>
                    <li>• Social media promotion and content creation</li>
                    <li>• Premium booth space and networking opportunities</li>
                  </ul>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sponsorTermsAccepted"
                    checked={sponsorData.termsAccepted}
                    onChange={(e) => setSponsorData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                  />
                  <Label htmlFor="sponsorTermsAccepted">I agree to the sponsorship terms and conditions</Label>
                </div>

                <Button onClick={handleSponsorSubmit} disabled={loading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Sponsor Registration'}
                </Button>
              </TabsContent>

              {/* Cosplayers Registration Form */}
              <TabsContent value="cosplayers" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cosplayerFullName">Full Name *</Label>
                    <Input
                      id="cosplayerFullName"
                      value={cosplayerData.fullName}
                      onChange={(e) => setCosplayerData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cosplayerEmail">Email *</Label>
                    <Input
                      id="cosplayerEmail"
                      type="email"
                      value={cosplayerData.email}
                      onChange={(e) => setCosplayerData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cosplayerPhone">Phone *</Label>
                    <Input
                      id="cosplayerPhone"
                      value={cosplayerData.phone}
                      onChange={(e) => setCosplayerData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cosplayerGroupName">Cosplay Group/Team Name</Label>
                    <Input
                      id="cosplayerGroupName"
                      value={cosplayerData.groupName}
                      onChange={(e) => setCosplayerData(prev => ({ ...prev, groupName: e.target.value }))}
                      placeholder="Enter group/team name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cosplayerCity">City *</Label>
                    <Input
                      id="cosplayerCity"
                      value={cosplayerData.city}
                      onChange={(e) => setCosplayerData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cosplayerState">State *</Label>
                    <Input
                      id="cosplayerState"
                      value={cosplayerData.state}
                      onChange={(e) => setCosplayerData(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cosplayerPinCode">PIN Code *</Label>
                    <Input
                      id="cosplayerPinCode"
                      value={cosplayerData.pinCode}
                      onChange={(e) => setCosplayerData(prev => ({ ...prev, pinCode: e.target.value }))}
                      placeholder="Enter pin code"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cosplayerExperience">Cosplay Experience</Label>
                  <Textarea
                    id="cosplayerExperience"
                    value={cosplayerData.experience}
                    onChange={(e) => setCosplayerData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="Tell us about cosplay experience and characters portrayed"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="cosplayerAddress">Address *</Label>
                  <Textarea
                    id="cosplayerAddress"
                    value={cosplayerData.address}
                    onChange={(e) => setCosplayerData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter complete address"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cosplayerTermsAccepted"
                    checked={cosplayerData.termsAccepted}
                    onChange={(e) => setCosplayerData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                  />
                  <Label htmlFor="cosplayerTermsAccepted">Terms and conditions accepted</Label>
                </div>

                <Button onClick={handleCosplayerSubmit} disabled={loading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Cosplayer Registration'}
                </Button>
              </TabsContent>

              {/* Vendors Registration Form */}
              <TabsContent value="vendors" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vendorCompanyName">Company/Business Name *</Label>
                    <Input
                      id="vendorCompanyName"
                      value={vendorData.companyName}
                      onChange={(e) => setVendorData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Enter company or business name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorType">Vendor Type *</Label>
                    <Select value={vendorData.vendorType} onValueChange={(value) => setVendorData(prev => ({ ...prev, vendorType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vendor type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="beverage">Beverage</SelectItem>
                        <SelectItem value="both">Both Food & Beverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vendorContactPerson">Contact Person *</Label>
                    <Input
                      id="vendorContactPerson"
                      value={vendorData.contactPerson}
                      onChange={(e) => setVendorData(prev => ({ ...prev, contactPerson: e.target.value }))}
                      placeholder="Enter contact person name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorContactEmail">Contact Email *</Label>
                    <Input
                      id="vendorContactEmail"
                      type="email"
                      value={vendorData.contactEmail}
                      onChange={(e) => setVendorData(prev => ({ ...prev, contactEmail: e.target.value }))}
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorContactPhone">Contact Phone *</Label>
                    <Input
                      id="vendorContactPhone"
                      value={vendorData.contactPhone}
                      onChange={(e) => setVendorData(prev => ({ ...prev, contactPhone: e.target.value }))}
                      placeholder="Enter contact phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorCity">City *</Label>
                    <Input
                      id="vendorCity"
                      value={vendorData.city}
                      onChange={(e) => setVendorData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorState">State *</Label>
                    <Input
                      id="vendorState"
                      value={vendorData.state}
                      onChange={(e) => setVendorData(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vendorPinCode">PIN Code *</Label>
                    <Input
                      id="vendorPinCode"
                      value={vendorData.pinCode}
                      onChange={(e) => setVendorData(prev => ({ ...prev, pinCode: e.target.value }))}
                      placeholder="Enter pin code"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="vendorDescription">Products/Services Description *</Label>
                  <Textarea
                    id="vendorDescription"
                    value={vendorData.description}
                    onChange={(e) => setVendorData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe products or services you'll be offering"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="vendorAddress">Business Address *</Label>
                  <Textarea
                    id="vendorAddress"
                    value={vendorData.address}
                    onChange={(e) => setVendorData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter complete business address"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vendorTermsAccepted"
                    checked={vendorData.termsAccepted}
                    onChange={(e) => setVendorData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                  />
                  <Label htmlFor="vendorTermsAccepted">Terms and conditions accepted</Label>
                </div>

                <Button onClick={handleVendorSubmit} disabled={loading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Vendor Registration'}
                </Button>
              </TabsContent>

              {/* Exhibitors Registration Form */}
              <TabsContent value="exhibitors" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="exhibitorCompanyName">Company/Organization Name *</Label>
                    <Input
                      id="exhibitorCompanyName"
                      value={exhibitorData.companyName}
                      onChange={(e) => setExhibitorData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Enter company or organization name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exhibitorContactPerson">Contact Person *</Label>
                    <Input
                      id="exhibitorContactPerson"
                      value={exhibitorData.contactPerson}
                      onChange={(e) => setExhibitorData(prev => ({ ...prev, contactPerson: e.target.value }))}
                      placeholder="Enter contact person name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exhibitorContactEmail">Contact Email *</Label>
                    <Input
                      id="exhibitorContactEmail"
                      type="email"
                      value={exhibitorData.contactEmail}
                      onChange={(e) => setExhibitorData(prev => ({ ...prev, contactEmail: e.target.value }))}
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exhibitorContactPhone">Contact Phone *</Label>
                    <Input
                      id="exhibitorContactPhone"
                      value={exhibitorData.contactPhone}
                      onChange={(e) => setExhibitorData(prev => ({ ...prev, contactPhone: e.target.value }))}
                      placeholder="Enter contact phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exhibitorCity">City *</Label>
                    <Input
                      id="exhibitorCity"
                      value={exhibitorData.city}
                      onChange={(e) => setExhibitorData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exhibitorState">State *</Label>
                    <Input
                      id="exhibitorState"
                      value={exhibitorData.state}
                      onChange={(e) => setExhibitorData(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exhibitorPinCode">PIN Code *</Label>
                    <Input
                      id="exhibitorPinCode"
                      value={exhibitorData.pinCode}
                      onChange={(e) => setExhibitorData(prev => ({ ...prev, pinCode: e.target.value }))}
                      placeholder="Enter pin code"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="exhibitorDescription">Exhibition Description *</Label>
                  <Textarea
                    id="exhibitorDescription"
                    value={exhibitorData.description}
                    onChange={(e) => setExhibitorData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what you'll be exhibiting or demonstrating"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="exhibitorBoothRequirements">Booth/Space Requirements</Label>
                  <Textarea
                    id="exhibitorBoothRequirements"
                    value={exhibitorData.boothRequirements}
                    onChange={(e) => setExhibitorData(prev => ({ ...prev, boothRequirements: e.target.value }))}
                    placeholder="Describe your booth/space requirements (size, equipment, etc.)"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="exhibitorAddress">Organization Address *</Label>
                  <Textarea
                    id="exhibitorAddress"
                    value={exhibitorData.address}
                    onChange={(e) => setExhibitorData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter complete organization address"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="exhibitorTermsAccepted"
                    checked={exhibitorData.termsAccepted}
                    onChange={(e) => setExhibitorData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                  />
                  <Label htmlFor="exhibitorTermsAccepted">Terms and conditions accepted</Label>
                </div>

                <Button onClick={handleExhibitorSubmit} disabled={loading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Exhibitor Registration'}
                </Button>
              </TabsContent>

              {/* Media Registration Form */}
              <TabsContent value="media" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mediaFullName">Full Name *</Label>
                    <Input
                      id="mediaFullName"
                      value={mediaData.fullName}
                      onChange={(e) => setMediaData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mediaEmail">Email *</Label>
                    <Input
                      id="mediaEmail"
                      type="email"
                      value={mediaData.email}
                      onChange={(e) => setMediaData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mediaPhone">Phone *</Label>
                    <Input
                      id="mediaPhone"
                      value={mediaData.phone}
                      onChange={(e) => setMediaData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mediaOrganization">Organization</Label>
                    <Input
                      id="mediaOrganization"
                      value={mediaData.organization}
                      onChange={(e) => setMediaData(prev => ({ ...prev, organization: e.target.value }))}
                      placeholder="Enter organization"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mediaRole">Role</Label>
                    <Input
                      id="mediaRole"
                      value={mediaData.role}
                      onChange={(e) => setMediaData(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="Enter role"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mediaCity">City</Label>
                    <Input
                      id="mediaCity"
                      value={mediaData.city}
                      onChange={(e) => setMediaData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mediaState">State</Label>
                    <Input
                      id="mediaState"
                      value={mediaData.state}
                      onChange={(e) => setMediaData(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mediaPinCode">PIN Code</Label>
                    <Input
                      id="mediaPinCode"
                      value={mediaData.pinCode}
                      onChange={(e) => setMediaData(prev => ({ ...prev, pinCode: e.target.value }))}
                      placeholder="Enter pin code"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mediaAddress">Address</Label>
                  <Textarea
                    id="mediaAddress"
                    value={mediaData.address}
                    onChange={(e) => setMediaData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter complete address"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="mediaTermsAccepted"
                    checked={mediaData.termsAccepted}
                    onChange={(e) => setMediaData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                  />
                  <Label htmlFor="mediaTermsAccepted">Terms and conditions accepted</Label>
                </div>

                <Button onClick={handleMediaSubmit} disabled={loading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Media Registration'}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ManualDataEntry;
