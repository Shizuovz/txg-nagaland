import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import GamingIcon, { GamingIcons } from "./GamingIcons";
import { useRegistrationAPI } from "@/hooks/useRegistrationAPI";
import { Game, College, SponsorshipTier } from '@/lib/firebase';
import { useState, useEffect } from "react";

const RegistrationSection = () => {
  const [registrationType, setRegistrationType] = useState<"college" | "open" | "sponsor" | "visitor" | "media" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  
  // API hook
  const { 
    loading, 
    error, 
    submitTeamRegistration, 
    submitSponsorRegistration, 
    submitVisitorRegistration,
    submitMediaRegistration,
    getGames,
    getColleges,
    getSponsorshipTiers 
  } = useRegistrationAPI();
  
  // Reference data
  const [games, setGames] = useState<Game[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [sponsorshipTiers, setSponsorshipTiers] = useState<SponsorshipTier[]>([]);

  // Load reference data on component mount
  useEffect(() => {
    const loadReferenceData = async () => {
      const [gamesData, collegesData, tiersData] = await Promise.all([
        getGames(),
        getColleges(),
        getSponsorshipTiers(),
      ]);
      
      if (gamesData) setGames(gamesData);
      if (collegesData) setColleges(collegesData);
      if (tiersData) setSponsorshipTiers(tiersData);
    };
    
    loadReferenceData();
  }, [getGames, getColleges, getSponsorshipTiers]);
  
  // Helper function to map sponsor type string to tier ID
  const getSponsorshipTierId = (sponsorType: string, tiers: any[]) => {
    const directMapping: { [key: string]: number } = {
      'Title Sponsor': 1,
      'Powered By Sponsor': 2,
      'Associate Sponsor': 3,
      'Category Partner': 4
    };
    
    return directMapping[sponsorType] || null;
  };
  
  const [formData, setFormData] = useState({
    teamName: "",
    collegeName: "",
    captainName: "",
    captainEmail: "",
    captainPhone: "",
    game: "",
    category: "",
    sponsorType: "",
    companyName: "",
    contactPerson: "",
    companyEmail: "",
    companyPhone: "",
    message: "",
    agreeTerms: false,
    address: "",
    city: "",
    state: "",
    pinCode: "",
    teamMembers: [
      { ign: "", gameId: "" },
      { ign: "", gameId: "" },
      { ign: "", gameId: "" },
      { ign: "", gameId: "" },
      { ign: "", gameId: "" }
    ],
    substitute: { ign: "", gameId: "" }
  });

  // Generate registration ID when type is selected
  useEffect(() => {
    if (registrationType && !registrationId) {
      const generateId = () => {
        const prefix = registrationType === 'college' ? 'CLG' : 
                       registrationType === 'open' ? 'OPN' : 
                       registrationType === 'sponsor' ? 'SPN' : 
                       registrationType === 'media' ? 'MDA' : 'VST';
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const id = `${prefix}${randomNum}`;
        setRegistrationId(id);
      };
      generateId();
    }
  }, [registrationType, registrationId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTeamMemberChange = (index: number, field: 'ign' | 'gameId', value: string) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, teamMembers: updatedMembers }));
  };

  const handleSubstituteChange = (field: 'ign' | 'gameId', value: string) => {
    setFormData(prev => ({
      ...prev,
      substitute: { ...prev.substitute, [field]: value }
    }));
  };

  const getRequiredTeamSize = () => {
    if (!formData.game) return 5;
    const game = games.find(g => g.id.toString() === formData.game);
    return game?.teamSize || 5;
  };

  const getTeamMemberFields = () => {
    const size = getRequiredTeamSize();
    return formData.teamMembers.slice(0, size);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (registrationType === 'college' || registrationType === 'open') {
        await submitTeamRegistration({
          ...formData,
          registrationType,
          registrationId
        });
      } else if (registrationType === 'sponsor') {
        await submitSponsorRegistration({
          ...formData,
          registrationId
        });
      } else if (registrationType === 'visitor') {
        await submitVisitorRegistration({
          fullName: formData.captainName,
          email: formData.captainEmail,
          phone: formData.captainPhone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode
        });
      } else if (registrationType === 'media') {
        await submitMediaRegistration({
          fullName: formData.captainName,
          email: formData.captainEmail,
          phone: formData.captainPhone,
          organization: formData.collegeName,
          role: formData.message,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode
        });
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRegistrationForm = () => {
    if (!registrationType) return null;

    const forms = {
      college: (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.USERS} size={20} color="#00ff88" />
              Inter-College Tournament Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teamName">Team Name *</Label>
                  <Input
                    id="teamName"
                    value={formData.teamName}
                    onChange={(e) => handleInputChange("teamName", e.target.value)}
                    placeholder="Enter your team name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="collegeName">College Name *</Label>
                  <Input
                    id="collegeName"
                    value={formData.collegeName}
                    onChange={(e) => handleInputChange("collegeName", e.target.value)}
                    placeholder="Enter your college name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="captainName">Team Captain Name *</Label>
                  <Input
                    id="captainName"
                    value={formData.captainName}
                    onChange={(e) => handleInputChange("captainName", e.target.value)}
                    placeholder="Captain's full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="captainEmail">Captain Email *</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    value={formData.captainEmail}
                    onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                    placeholder="captain@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="captainPhone">Captain Phone *</Label>
                <Input
                  id="captainPhone"
                  value={formData.captainPhone}
                  onChange={(e) => handleInputChange("captainPhone", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Region *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State/Region"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pinCode">PIN Code *</Label>
                <Input
                  id="pinCode"
                  value={formData.pinCode}
                  onChange={(e) => handleInputChange("pinCode", e.target.value)}
                  placeholder="PIN/Zip Code"
                  required
                />
              </div>

              <div>
                <Label htmlFor="game">Select Game *</Label>
                <Select value={formData.game} onValueChange={(value) => handleInputChange("game", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your tournament game" />
                  </SelectTrigger>
                  <SelectContent>
                    {games.map((game) => (
                      <SelectItem key={game.id} value={game.id.toString()}>
                        {game.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Team Members Section */}
              {formData.game && (
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Team Members ({getRequiredTeamSize()} Players Required)
                  </Label>
                  <div className="space-y-4">
                    {getTeamMemberFields().map((member, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-card">
                        <div>
                          <Label htmlFor={`member-${index}-ign`}>Player {index + 1} IGN *</Label>
                          <Input
                            id={`member-${index}-ign`}
                            value={member.ign}
                            onChange={(e) => handleTeamMemberChange(index, 'ign', e.target.value)}
                            placeholder="In-game name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`member-${index}-gameId`}>Game ID *</Label>
                          <Input
                            id={`member-${index}-gameId`}
                            value={member.gameId}
                            onChange={(e) => handleTeamMemberChange(index, 'gameId', e.target.value)}
                            placeholder="Game-specific ID"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label className="text-base font-semibold mb-4 block">Substitute Player (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-card">
                  <div>
                    <Label htmlFor="sub-ign">Substitute IGN</Label>
                    <Input
                      id="sub-ign"
                      value={formData.substitute.ign}
                      onChange={(e) => handleSubstituteChange('ign', e.target.value)}
                      placeholder="Substitute player IGN"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sub-gameId">Game ID</Label>
                    <Input
                      id="sub-gameId"
                      value={formData.substitute.gameId}
                      onChange={(e) => handleSubstituteChange('gameId', e.target.value)}
                      placeholder="Substitute game ID"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                />
                <Label htmlFor="agreeTerms" className="text-sm">
                  I agree to the tournament rules and terms of participation *
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={!formData.agreeTerms || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit College Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),

      open: (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.TROPHY} size={20} color="#ff8800" />
              Open Category Tournament Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teamName">Team Name *</Label>
                  <Input
                    id="teamName"
                    value={formData.teamName}
                    onChange={(e) => handleInputChange("teamName", e.target.value)}
                    placeholder="Enter your team name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Team Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="mixed">Mixed Category</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="captainName">Team Captain Name *</Label>
                  <Input
                    id="captainName"
                    value={formData.captainName}
                    onChange={(e) => handleInputChange("captainName", e.target.value)}
                    placeholder="Captain's full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="captainEmail">Captain Email *</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    value={formData.captainEmail}
                    onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                    placeholder="captain@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="captainPhone">Captain Phone *</Label>
                <Input
                  id="captainPhone"
                  value={formData.captainPhone}
                  onChange={(e) => handleInputChange("captainPhone", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Region *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State/Region"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pinCode">PIN Code *</Label>
                <Input
                  id="pinCode"
                  value={formData.pinCode}
                  onChange={(e) => handleInputChange("pinCode", e.target.value)}
                  placeholder="PIN/Zip Code"
                  required
                />
              </div>

              <div>
                <Label htmlFor="game">Select Game *</Label>
                <Select value={formData.game} onValueChange={(value) => handleInputChange("game", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your tournament game" />
                  </SelectTrigger>
                  <SelectContent>
                    {games.map((game) => (
                      <SelectItem key={game.id} value={game.id.toString()}>
                        {game.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Team Members Section */}
              {formData.game && (
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Team Members ({getRequiredTeamSize()} Players Required)
                  </Label>
                  <div className="space-y-4">
                    {getTeamMemberFields().map((member, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-card">
                        <div>
                          <Label htmlFor={`member-${index}-ign`}>Player {index + 1} IGN *</Label>
                          <Input
                            id={`member-${index}-ign`}
                            value={member.ign}
                            onChange={(e) => handleTeamMemberChange(index, 'ign', e.target.value)}
                            placeholder="In-game name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`member-${index}-gameId`}>Game ID *</Label>
                          <Input
                            id={`member-${index}-gameId`}
                            value={member.gameId}
                            onChange={(e) => handleTeamMemberChange(index, 'gameId', e.target.value)}
                            placeholder="Game-specific ID"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                />
                <Label htmlFor="agreeTerms" className="text-sm">
                  I agree to the tournament rules and terms of participation *
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register Team"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),

      sponsor: (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.PARTNERSHIP} size={20} color="#00ffff" />
              Sponsorship Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="sponsorType">Sponsorship Tier *</Label>
                <Select value={formData.sponsorType} onValueChange={(value) => setFormData({ ...formData, sponsorType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sponsorship tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Title Sponsor">Title Sponsor (₹5,00,000+)</SelectItem>
                    <SelectItem value="Powered By Sponsor">Powered By Sponsor (₹2,50,000)</SelectItem>
                    <SelectItem value="Associate Sponsor">Associate Sponsor (₹1,00,000)</SelectItem>
                    <SelectItem value="Category Partner">Category Partner (₹50,000)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Your company name"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    placeholder="Name of contact person"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyEmail">Company Email *</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={formData.companyEmail}
                    onChange={(e) => handleInputChange("companyEmail", e.target.value)}
                    placeholder="company@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="companyPhone">Company Phone *</Label>
                <Input
                  id="companyPhone"
                  value={formData.companyPhone}
                  onChange={(e) => handleInputChange("companyPhone", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Region *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State/Region"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pinCode">PIN Code *</Label>
                <Input
                  id="pinCode"
                  value={formData.pinCode}
                  onChange={(e) => handleInputChange("pinCode", e.target.value)}
                  placeholder="PIN/Zip Code"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us about your sponsorship interests or any specific requirements"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Sponsorship Inquiry"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),

      visitor: (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.EYE} size={20} color="#ff00ff" />
              Visitor Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="captainName">Full Name *</Label>
                  <Input
                    id="captainName"
                    value={formData.captainName}
                    onChange={(e) => handleInputChange("captainName", e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="captainEmail">Email Address *</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    value={formData.captainEmail}
                    onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="captainPhone">Phone Number *</Label>
                <Input
                  id="captainPhone"
                  value={formData.captainPhone}
                  onChange={(e) => handleInputChange("captainPhone", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Region *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State/Region"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pinCode">PIN Code *</Label>
                <Input
                  id="pinCode"
                  value={formData.pinCode}
                  onChange={(e) => handleInputChange("pinCode", e.target.value)}
                  placeholder="PIN/Zip Code"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Reason for Visiting (Optional)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us what interests you about TXG TechXGames Expo"
                  rows={3}
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Visitor Benefits:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Free entry to the expo</li>
                  <li>• Watch live tournament matches</li>
                  <li>• Access to expo zones and showcases</li>
                  <li>• Networking opportunities</li>
                  <li>• Exclusive merchandise discounts</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register as Visitor"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),

      media: (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.EYE} size={20} color="#a855f7" />
              Media Person Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="captainName">Full Name *</Label>
                  <Input
                    id="captainName"
                    value={formData.captainName}
                    onChange={(e) => handleInputChange("captainName", e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="captainEmail">Email Address *</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    value={formData.captainEmail}
                    onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="captainPhone">Phone Number *</Label>
                  <Input
                    id="captainPhone"
                    value={formData.captainPhone}
                    onChange={(e) => handleInputChange("captainPhone", e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="collegeName">Organization/Media House</Label>
                  <Input
                    id="collegeName"
                    value={formData.collegeName}
                    onChange={(e) => handleInputChange("collegeName", e.target.value)}
                    placeholder="e.g., Nagaland Post, YouTube Channel"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">Role/Position (Optional)</Label>
                <Input
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="e.g., Journalist, Photographer, Content Creator"
                />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Region *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State/Region"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pinCode">PIN Code *</Label>
                <Input
                  id="pinCode"
                  value={formData.pinCode}
                  onChange={(e) => handleInputChange("pinCode", e.target.value)}
                  placeholder="PIN/Zip Code"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register as Media"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )
    };

    return forms[registrationType as keyof typeof forms];
  };

  if (registrationType) {
    return (
      <section id="register" className="py-20 md:py-28" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              onClick={() => setRegistrationType(null)}
              className="mb-4"
            >
              ← Back to Registration Options
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {renderRegistrationForm()}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold mb-4">
            Register for <span className="text-5xl md:text-[64px]" style={{ fontFamily: "'Neo_Triad', sans-serif", color: "#00ff88" }}>TXG</span> 
          </h2>
          <p className="text-[#d0d0d0] text-lg max-w-2xl mx-auto font-['Nonito']">
            Join Southeast Asia's premier gaming event. Choose your registration type below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center hover:shadow-xl transition-all group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 * 0.15 }}
            onClick={() => setRegistrationType("college")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
              <GamingIcon iconId={GamingIcons.USERS} size={24} color="#00ff88" />
            </div>
            <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">College Team</h3>
            <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
              Register your college team for BGMI or Mobile Legends tournaments
            </p>
            <Button className="w-full text-sm sm:text-base">Register Now</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center hover:shadow-xl transition-all group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => setRegistrationType("open")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
              <GamingIcon iconId={GamingIcons.TROPHY} size={24} color="#ff8800" />
            </div>
            <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Open Category</h3>
            <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
              Professionals, semi-pros, and community teams
            </p>
            <Button className="w-full text-sm sm:text-base" variant="outline">Register Now</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center hover:shadow-xl transition-all group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setRegistrationType("sponsor")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
              <GamingIcon iconId={GamingIcons.PARTNERSHIP} size={24} color="#00ffff" />
            </div>
            <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Sponsorship</h3>
            <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
              Partner with us and showcase your brand
            </p>
            <Button className="w-full text-sm sm:text-base" variant="outline">Become Partner</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center hover:shadow-xl transition-all group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            onClick={() => setRegistrationType("visitor")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
              <GamingIcon iconId={GamingIcons.EYE} size={24} color="#ff00ff" />
            </div>
            <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Visitor</h3>
            <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
              Free entry for spectators and gaming enthusiasts
            </p>
            <Button className="w-full text-sm sm:text-base" variant="outline">Register Free</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center hover:shadow-xl transition-all group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => setRegistrationType("media")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
              <GamingIcon iconId={GamingIcons.EYE} size={24} color="#a855f7" />
            </div>
            <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Media</h3>
            <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
              Press access for journalists, photographers, and content creators
            </p>
            <Button className="w-full text-sm sm:text-base" variant="outline">Register as Media</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
