import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import GamingIcon, { GamingIcons } from "./GamingIcons";
import { useRegistrationAPI } from "@/hooks/useRegistrationAPI";
import { Game, College, SponsorshipTier } from '@/lib/firebase';

// Mini tournaments data
const miniTournaments = [
  { name: "FC 26", logo: "/logos/FC26 White.png" },
  { name: "Clash Royale", logo: "/logos/Clash Royale.png" },
  { name: "Tekken 8", logo: "/logos/Tekken-8-logo White.png" },
  { name: "Dirt Rally 2.0", logo: "/logos/Dirt_Rally_2.0_Logo.svg.png" },
  { name: "Street Fighter 6", logo: "/logos/Street_Fighter_6_Logo.png" },
  { name: "Ludo", logo: "/logos/Ludo Logo.png" },
];
import { useState, useEffect } from "react";
import TermsAndConditions from "./TermsAndConditions";
import firebaseStorageService from "@/services/firebaseStorageService";
import { AlertCircle, Users, Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Component to display registration limit status
interface RegistrationLimitDisplayProps {
  limit: { current: number; limit: number; isFull: boolean } | null;
  isLoading: boolean;
  type: 'college' | 'moba-open' | 'mini-tournament';
}

const RegistrationLimitDisplay = ({ limit, isLoading, type }: RegistrationLimitDisplayProps) => {
  if (isLoading) {
    return (
      <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-center gap-2 text-blue-400 text-sm">
          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          Checking registration availability...
        </div>
      </div>
    );
  }

  if (!limit) return null;

  const percentage = (limit.current / limit.limit) * 100;
  const isNearFull = percentage >= 75 && !limit.isFull;

  if (limit.isFull) {
    return (
      <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
          <div>
            <p className="font-semibold text-red-400">
              Registration Closed
            </p>
            <p className="text-sm text-red-300/80 mt-1">
              We have reached the maximum capacity of {limit.limit} {type === 'mini-tournament' ? 'participants' : 'teams'} for this tournament.
              Registration is now closed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mb-4 p-3 rounded-lg border ${isNearFull ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className={`w-4 h-4 ${isNearFull ? 'text-yellow-400' : 'text-green-400'}`} />
          <span className={`text-sm font-medium ${isNearFull ? 'text-yellow-400' : 'text-green-400'}`}>
            {isNearFull ? 'Limited Spots Available!' : 'Registration Open'}
          </span>
        </div>
        <span className={`text-sm ${isNearFull ? 'text-yellow-400' : 'text-green-400'}`}>
          {limit.current} / {limit.limit} {type === 'mini-tournament' ? 'players' : 'teams'}
        </span>
      </div>
      {isNearFull && (
        <p className="text-xs text-yellow-400/80 mt-2">
          Hurry! Only {limit.limit - limit.current} spots remaining.
        </p>
      )}
      <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isNearFull ? 'bg-yellow-500' : 'bg-green-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const initialFormData = {
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
    { ign: "", gameId: "", fullName: "", studentIdUpload: null as File | null, aadhaarUpload: null as File | null },
    { ign: "", gameId: "", fullName: "", studentIdUpload: null as File | null, aadhaarUpload: null as File | null },
    { ign: "", gameId: "", fullName: "", studentIdUpload: null as File | null, aadhaarUpload: null as File | null },
    { ign: "", gameId: "", fullName: "", studentIdUpload: null as File | null, aadhaarUpload: null as File | null },
    { ign: "", gameId: "", fullName: "", studentIdUpload: null as File | null, aadhaarUpload: null as File | null }
  ],
  substitute: { ign: "", gameId: "", fullName: "", studentIdUpload: null as File | null, aadhaarUpload: null as File | null },
  nickName: "",
  whatsappPhone: "",
  phoneCallNumber: "",
  age: "",
  gender: "",
  characterName: "",
  gameName: "",
  studentIdUpload: null as File | null,
  aadhaarUpload: null as File | null,
  collegeLogoUpload: null as File | null,
  institutionDeclaration: false,
  livestreamConsent: false,
  coordinatorName: "",
  coordinatorPhone: "",
  deviceType: "",
  otherDeviceType: "",
  digitalArtSoftware: "",
  emergencyContact: "",
  instagram: "",
  performanceDuration: "",
  characterReferenceUpload: null as File | null,
  backgroundAudioUpload: null as File | null,
  participantType: "",
  entryType: "",
  aiVideoTitle: "",
  aiVideoDescription: "",
  aiToolsUsed: "",
  aiVideoUpload: null as File | null,
  originalWorkDeclaration: false
};

const RegistrationSection = () => {
  const [registrationType, setRegistrationType] = useState<"college" | "moba-open" | "cosplayer" | "vendor" | "exhibitor" | "media" | "sponsor" | "mini-tournament" | "digital-art" | "ai-video" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const { toast } = useToast();

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
    getSponsorshipTiers,
    checkTeamRegistrationLimit,
    checkMiniTournamentLimit
  } = useRegistrationAPI();

  // Reference data
  const [games, setGames] = useState<Game[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [sponsorshipTiers, setSponsorshipTiers] = useState<SponsorshipTier[]>([]);

  // Registration limits state
  const [registrationLimit, setRegistrationLimit] = useState<{ current: number; limit: number; isFull: boolean } | null>(null);
  const [isCheckingLimit, setIsCheckingLimit] = useState(false);

  // Load reference data on component mount (only once)
  useEffect(() => {
    let isMounted = true;
    const loadReferenceData = async () => {
      const [gamesData, collegesData, tiersData] = await Promise.all([
        getGames(),
        getColleges(),
        getSponsorshipTiers(),
      ]);

      if (isMounted) {
        if (gamesData) setGames(gamesData);
        if (collegesData) setColleges(collegesData);
        if (tiersData) setSponsorshipTiers(tiersData);
      }
    };

    loadReferenceData();
    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check registration limits when registration type changes
  useEffect(() => {
    let isMounted = true;
    const checkLimit = async () => {
      if (!registrationType) {
        if (isMounted) setRegistrationLimit(null);
        return;
      }

      if (isMounted) setIsCheckingLimit(true);

      try {
        if (registrationType === 'college') {
          const result = await checkTeamRegistrationLimit('college');
          if (isMounted) {
            setRegistrationLimit({
              current: result.current,
              limit: result.limit,
              isFull: !result.allowed
            });
          }
        } else if (registrationType === 'moba-open') {
          const result = await checkTeamRegistrationLimit('open_category');
          if (isMounted) {
            setRegistrationLimit({
              current: result.current,
              limit: result.limit,
              isFull: !result.allowed
            });
          }
        } else if (registrationType === 'mini-tournament') {
          // Don't show limit until a game is selected
          if (isMounted) setRegistrationLimit(null);
        }
      } catch (err) {
        console.error('Error checking registration limit:', err);
      } finally {
        if (isMounted) setIsCheckingLimit(false);
      }
    };

    checkLimit();
    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationType]);

  // Helper function to map sponsor type string to tier ID
  const getSponsorshipTierId = (sponsorType: string, tiers: SponsorshipTier[]) => {
    const directMapping: { [key: string]: number } = {
      'Title Sponsor': 1,
      'Powered By Sponsor': 2,
      'Associate Sponsor': 3,
      'Category Partner': 4
    };

    return directMapping[sponsorType] || null;
  };

  const [formData, setFormData] = useState(initialFormData);

  // Generate registration ID and set default game when type is selected
  useEffect(() => {
    if (registrationType && !registrationId) {
      const generateId = () => {
        const prefix = registrationType === 'college' ? 'CLG' :
          registrationType === 'moba-open' ? 'MOB' :
            registrationType === 'cosplayer' ? 'COS' :
              registrationType === 'vendor' ? 'VEN' :
                registrationType === 'exhibitor' ? 'EXH' :
                  registrationType === 'sponsor' ? 'SPN' :
                    registrationType === 'media' ? 'MDA' :
                      registrationType === 'mini-tournament' ? 'MIN' : 
                        registrationType === 'digital-art' ? 'ART' : 
                          registrationType === 'ai-video' ? 'AIV' : 'VST';
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const id = `${prefix}${randomNum}`;
        setRegistrationId(id);
      };
      generateId();

      // Auto-set Mobile Legends for college and moba-open registrations
      if (registrationType === 'college' || registrationType === 'moba-open') {
        const mobileLegendsGame = games.find(g => g.name === 'Mobile Legends');
        if (mobileLegendsGame) {
          setFormData(prev => ({ ...prev, game: mobileLegendsGame.id.toString() }));
        }
      }
    }
  }, [registrationType, registrationId, games]);

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTeamMemberChange = (index: number, field: 'ign' | 'gameId' | 'fullName' | 'studentIdUpload' | 'aadhaarUpload', value: string | File | null) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, teamMembers: updatedMembers }));
  };

  // Check mini-tournament limit when game is selected
  useEffect(() => {
    let isMounted = true;
    const checkMiniLimit = async () => {
      if (registrationType === 'mini-tournament' && formData.game) {
        if (isMounted) setIsCheckingLimit(true);
        try {
          const result = await checkMiniTournamentLimit(formData.game);
          if (isMounted) {
            setRegistrationLimit({
              current: result.current,
              limit: result.limit,
              isFull: !result.allowed
            });
          }
        } catch (err) {
          console.error('Error checking mini tournament limit:', err);
        } finally {
          if (isMounted) setIsCheckingLimit(false);
        }
      }
    };

    checkMiniLimit();
    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.game, registrationType]);

  const handleSubstituteChange = (field: 'ign' | 'gameId' | 'fullName' | 'studentIdUpload' | 'aadhaarUpload', value: string | File | null) => {
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
    if (registrationType === 'college') {
      return formData.teamMembers.slice(0, 5); // Always 5 players for college Mobile Legends
    }
    const size = getRequiredTeamSize();
    return formData.teamMembers.slice(0, size);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation for college and MOBA open tournaments
    if ((registrationType === 'college' || registrationType === 'moba-open')) {
      // Check if all team members have full names
      const teamMembersWithFullName = getTeamMemberFields();
      for (let i = 0; i < teamMembersWithFullName.length; i++) {
        if (!teamMembersWithFullName[i].fullName.trim()) {
          alert(`Please enter the full name for Player ${i + 1}`);
          setIsSubmitting(false);
          return;
        }
      }

      // Check mandatory fields - different for college vs MOBA
      const teamMembersWithDocs = getTeamMemberFields();

      if (registrationType === 'college') {
        // Check all team members have student ID
        for (let i = 0; i < teamMembersWithDocs.length; i++) {
          if (!teamMembersWithDocs[i].studentIdUpload) {
            alert(`Please upload Student ID for Player ${i + 1}`);
            setIsSubmitting(false);
            return;
          }
        }
        // Check substitute has student ID if any substitute details are filled
        if (formData.substitute.fullName || formData.substitute.ign) {
          if (!formData.substitute.studentIdUpload) {
            alert('Please upload Student ID for Substitute Player');
            setIsSubmitting(false);
            return;
          }
        }

        if (!formData.institutionDeclaration) {
          alert('Please confirm the institution declaration');
          setIsSubmitting(false);
          return;
        }
      } else if (registrationType === 'moba-open') {
        // Check all team members have Aadhaar
        for (let i = 0; i < teamMembersWithDocs.length; i++) {
          if (!teamMembersWithDocs[i].aadhaarUpload) {
            alert(`Please upload Aadhaar for Player ${i + 1}`);
            setIsSubmitting(false);
            return;
          }
        }
        // Check substitute has Aadhaar if any substitute details are filled
        if (formData.substitute.fullName || formData.substitute.ign) {
          if (!formData.substitute.aadhaarUpload) {
            alert('Please upload Aadhaar for Substitute Player');
            setIsSubmitting(false);
            return;
          }
        }
      }

      if (!formData.livestreamConsent) {
        alert('Please provide consent for livestream and photography');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      if (registrationType === 'college') {
        await submitTeamRegistration({
          teamName: formData.teamName,
          collegeName: formData.collegeName,
          captainName: formData.captainName,
          captainEmail: formData.captainEmail,
          captainPhone: formData.captainPhone,
          gameId: formData.game,
          teamCategory: formData.category,
          registrationType,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
          teamMembers: formData.teamMembers,
          substitute: formData.substitute,
          termsAccepted: formData.agreeTerms,
          studentIdUpload: formData.studentIdUpload,
          collegeLogoUpload: formData.collegeLogoUpload,
          institutionDeclaration: formData.institutionDeclaration,
          livestreamConsent: formData.livestreamConsent,
          coordinatorName: formData.coordinatorName,
          coordinatorPhone: formData.coordinatorPhone
        });
      } else if (registrationType === 'moba-open') {
        await submitTeamRegistration({
          teamName: formData.teamName,
          collegeName: formData.collegeName,
          captainName: formData.captainName,
          captainEmail: formData.captainEmail,
          captainPhone: formData.captainPhone,
          gameId: formData.game,
          teamCategory: 'open',
          registrationType: 'open_category',
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
          teamMembers: formData.teamMembers,
          substitute: formData.substitute,
          termsAccepted: formData.agreeTerms,
          aadhaarUpload: formData.aadhaarUpload,
          livestreamConsent: formData.livestreamConsent
        });
      } else if (registrationType === 'cosplayer') {
        let characterReferenceUrl = '';
        let backgroundAudioUrl = '';

        if (formData.characterReferenceUpload) {
          try {
            const ext = formData.characterReferenceUpload.name.split('.').pop() || 'jpg';
            const fileName = `${registrationId}_character_ref.${ext}`;
            const result = await firebaseStorageService.uploadFile('cosplay-uploads', fileName, formData.characterReferenceUpload);
            characterReferenceUrl = result.url;
          } catch (e) {
            console.error("Failed to upload character reference", e);
            alert("Failed to upload character reference photo. Please try again.");
            setIsSubmitting(false);
            return;
          }
        }
        
        if (formData.backgroundAudioUpload) {
          try {
            const ext = formData.backgroundAudioUpload.name.split('.').pop() || 'mp3';
            const fileName = `${registrationId}_bg_audio.${ext}`;
            const result = await firebaseStorageService.uploadFile('cosplay-uploads', fileName, formData.backgroundAudioUpload);
            backgroundAudioUrl = result.url;
          } catch (e) {
            console.error("Failed to upload background audio", e);
            alert("Failed to upload background audio/video. Please try again.");
            setIsSubmitting(false);
            return;
          }
        }

        const messageData = [
          `Instagram: ${formData.instagram}`,
          `Performance Duration: ${formData.performanceDuration}`,
          characterReferenceUrl ? `Character Reference: ${characterReferenceUrl}` : '',
          backgroundAudioUrl ? `Background Audio/Video: ${backgroundAudioUrl}` : ''
        ].filter(Boolean).join('\n');

        // Use visitor registration for cosplayers with custom success message
        await submitVisitorRegistration({
          fullName: formData.captainName,
          email: formData.captainEmail,
          phone: formData.captainPhone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
          message: messageData,
          characterName: formData.characterName,
          gameName: formData.gameName,
          registrationId: registrationId
        }, 'Cosplayer registration submitted successfully!');
      } else if (registrationType === 'vendor') {
        // Use sponsor registration for vendors with custom success message
        await submitSponsorRegistration({
          companyName: formData.collegeName,
          sponsorshipTierId: '1', // Default tier for vendors
          contactPerson: formData.captainName,
          contactEmail: formData.captainEmail,
          contactPhone: formData.captainPhone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
          message: `Vendor Type: ${formData.category}\n\n${formData.message}`, // Include vendor type in message
          registrationId: registrationId
        }, 'Vendor registration submitted successfully!');
      } else if (registrationType === 'exhibitor') {
        // Use sponsor registration for exhibitors with custom success message
        await submitSponsorRegistration({
          companyName: formData.collegeName,
          sponsorshipTierId: '2', // Default tier for exhibitors
          contactPerson: formData.captainName,
          contactEmail: formData.captainEmail,
          contactPhone: formData.captainPhone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
          message: `Exhibition Description: ${formData.message}\n\nBooth/Space Requirements: ${formData.teamName}`, // Include both fields
          registrationId: registrationId
        }, 'Exhibitor registration submitted successfully!');
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
      } else if (registrationType === 'sponsor') {
        await submitSponsorRegistration({
          companyName: formData.teamName,
          sponsorshipTierId: formData.sponsorType,
          contactPerson: formData.captainName,
          contactEmail: formData.captainEmail,
          contactPhone: formData.captainPhone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
          message: formData.message
        });
      } else if (registrationType === 'mini-tournament') {
        // Submit visitor registration with all mini-tournament details
        await submitVisitorRegistration({
          fullName: formData.captainName,
          email: formData.captainEmail,
          phone: formData.whatsappPhone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode,
          registrationId: registrationId,
          // Store nickname in collegeName field so dashboard can display it
          collegeName: formData.nickName || 'N/A',
          message: `Game: ${formData.game}\nPhone Call: ${formData.phoneCallNumber || 'N/A'}\nAge: ${formData.age || 'N/A'}\nGender: ${formData.gender || 'N/A'}`
        }, 'Mini tournament registration submitted successfully!');

        console.log('Mini tournament registration completed');
      } else if (registrationType === 'digital-art') {
        await submitVisitorRegistration({
          fullName: formData.captainName,
          email: formData.captainEmail,
          phone: formData.whatsappPhone,
          address: formData.city, // Storing District/Town in address
          city: formData.city,
          state: 'Nagaland', // Default or user input
          pinCode: '000000', // Default if unused
          registrationId: registrationId,
          collegeName: formData.deviceType === 'Other' ? formData.otherDeviceType : formData.deviceType, // Using unused field
          message: `Age: ${formData.age}\nEmergency Contact: ${formData.emergencyContact}\nDevice Type: ${formData.deviceType === 'Other' ? formData.otherDeviceType : formData.deviceType}\nSoftware: ${formData.digitalArtSoftware}`
        }, 'Digital Art Competition registration submitted successfully!');
      } else if (registrationType === 'ai-video') {
        // Validation for AI Video
        if (!formData.captainName || !formData.age || !formData.gender || !formData.captainPhone || !formData.captainEmail || !formData.city || !formData.participantType || !formData.entryType || !formData.aiVideoTitle || !formData.aiVideoDescription || !formData.aiToolsUsed || !formData.aiVideoUpload) {
          toast({
            title: "Error",
            description: "Please fill in all required fields and upload your video.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }

        if (formData.entryType === 'Team' && (!formData.teamName || !formData.teamMembers[0].fullName)) {
          toast({
            title: "Error",
            description: "Please provide a team name and team members.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
        
        const wordCount = formData.aiVideoDescription.trim().split(/\s+/).length;
        if (wordCount > 50) {
          toast({
            title: "Error",
            description: "Video description must not exceed 50 words.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }

        if (!formData.agreeTerms || !formData.originalWorkDeclaration) {
          toast({
            title: "Error",
            description: "You must accept the terms, conditions, and the original work declaration.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }

        if (!formData.aiVideoUpload) {
          toast({
            title: "Error",
            description: "Please select a video file to upload.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }

        // Upload Video
        let videoUrl = '';
        try {
          const uploadResult = await firebaseStorageService.uploadFile('ai-video-uploads', `${registrationId}_video.mp4`, formData.aiVideoUpload as File);
          videoUrl = uploadResult.url;
        } catch (uploadError) {
          console.error("Failed to upload AI video", uploadError);
          toast({
            title: "Upload Failed",
            description: "Failed to upload video file. Please ensure it meets the size limits and try again.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
        
        let teamInfo = '';
        if (formData.entryType === 'Team') {
          const formattedTeamMembers = formData.teamMembers[0].fullName.replace(/\n/g, ', ');
          teamInfo = `\nTeam Name: ${formData.teamName}\nTeam Members: ${formattedTeamMembers}`;
        }

        await submitVisitorRegistration({
          fullName: formData.captainName,
          email: formData.captainEmail,
          phone: formData.captainPhone,
          address: formData.city, // Storing District in address
          city: formData.city,
          state: 'Nagaland',
          pinCode: '000000',
          registrationId: registrationId,
          collegeName: formData.collegeName || 'N/A', // Storing Institution
          message: `Age: ${formData.age}\nGender: ${formData.gender}\nWhatsApp: ${formData.whatsappPhone || formData.captainPhone}\nParticipant Type: ${formData.participantType}\nEntry Type: ${formData.entryType}${teamInfo}\nVideo Title: ${formData.aiVideoTitle}\nVideo Description: ${formData.aiVideoDescription.replace(/\n/g, ' ')}\nAI Tools Used: ${formData.aiToolsUsed.replace(/\n/g, ', ')}\nVideo URL: ${videoUrl}\nOriginal Work Declaration: Yes`
        }, 'AI Creative Video Challenge registration submitted successfully!');
      }

      // Reset form state after successful submission
      setFormData(initialFormData);
      setRegistrationType(null);
      setRegistrationId('');

    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRegistrationForm = () => {
    if (!registrationType) return null;

    if (registrationType === 'college') {
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.USERS} size={20} color="#00ff88" />
              Inter-College Nagaland Tournament Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-2">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-2">Registrations Closed</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thank you for your interest! The Inter-College Nagaland Tournament registrations are now closed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (registrationType === 'moba-open') {
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.TROPHY} size={20} color="#ff6b6b" />
              MOBA 5v5 Open Tournament Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-2">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-2">Registrations Closed</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thank you for your interest! The MOBA 5v5 Open Tournament registrations are now closed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    const forms = {
      college: (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.USERS} size={20} color="#00ff88" />
              Inter-College Nagaland Tournament Registration
            </CardTitle>
            {registrationId && (
              <p className="hidden text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            {/* NOTE: Registration restriction */}
            <p className="text-lg font-semibold bg-amber-500/20 p-2 rounded mb-2">We will accept registration from only Student Body President. Any other will be rejected.</p>
            <RegistrationLimitDisplay
              limit={registrationLimit}
              isLoading={isCheckingLimit}
              type="college"
            />
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

              <div>
                <Label htmlFor="collegeLogo">College Logo (High Quality)</Label>
                <Input
                  id="collegeLogo"
                  type="file"
                  accept=".jpg,.jpeg,.png,.svg,.webp"
                  onChange={(e) => handleInputChange("collegeLogoUpload", e.target.files?.[0] || null)}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload a high quality transparent logo of your college if possible (Optional but recommended)
                </p>
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

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Tournament Game: Mobile Legends</h4>
                <p className="text-sm text-muted-foreground">
                  College registration is exclusively for Mobile Legends: Bang Bang tournament with 5 players per team.
                </p>
              </div>

              {/* Team Members Section */}
              {registrationType === 'college' && (
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Team Members (5 Players Required)
                  </Label>
                  <div className="space-y-4">
                    {getTeamMemberFields().map((member, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-card">
                        <div>
                          <Label htmlFor={`member-${index}-fullName`}>Player {index + 1} Full Name *</Label>
                          <Input
                            id={`member-${index}-fullName`}
                            value={member.fullName}
                            onChange={(e) => handleTeamMemberChange(index, 'fullName', e.target.value)}
                            placeholder="Full name"
                            required
                          />
                        </div>
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
                        <div>
                          <Label htmlFor={`member-${index}-studentId`}>Player {index + 1} Student ID *</Label>
                          <Input
                            id={`member-${index}-studentId`}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleTeamMemberChange(index, 'studentIdUpload', e.target.files?.[0] || null)}
                            className="mt-1"
                            required
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Upload student ID card or bonafide certificate
                          </p>
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
                    <Label htmlFor="sub-fullName">Substitute Full Name</Label>
                    <Input
                      id="sub-fullName"
                      value={formData.substitute.fullName}
                      onChange={(e) => handleSubstituteChange('fullName', e.target.value)}
                      placeholder="Substitute full name"
                    />
                  </div>
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
                  {registrationType === 'college' && (
                    <div>
                      <Label htmlFor="sub-studentId">Substitute Student ID</Label>
                      <Input
                        id="sub-studentId"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleSubstituteChange('studentIdUpload', e.target.files?.[0] || null)}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Required if substitute details are provided
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Declarations and Consent */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="institutionDeclaration"
                    checked={formData.institutionDeclaration}
                    onChange={(e) => handleInputChange("institutionDeclaration", e.target.checked)}
                    required
                    className="w-5 h-5 mt-0.5"
                  />
                  <div>
                    <Label htmlFor="institutionDeclaration" className="text-sm font-medium">
                      Declaration that all players belong to the same institution *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I declare that all registered players belong to the same institution unless otherwise permitted by the organizers
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="livestreamConsent"
                    checked={formData.livestreamConsent}
                    onChange={(e) => handleInputChange("livestreamConsent", e.target.checked)}
                    required
                    className="w-5 h-5 mt-0.5"
                  />
                  <div>
                    <Label htmlFor="livestreamConsent" className="text-sm font-medium">
                      Consent for livestream, photography, and recording *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I consent to photographs, videos, and livestreaming of tournament participation for promotional purposes
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="coordinatorName">Institutional Coordinator Name (Optional)</Label>
                    <Input
                      id="coordinatorName"
                      value={formData.coordinatorName}
                      onChange={(e) => handleInputChange("coordinatorName", e.target.value)}
                      placeholder="Faculty coordinator or institutional representative name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coordinatorPhone">Institutional Coordinator Phone (Optional)</Label>
                    <Input
                      id="coordinatorPhone"
                      value={formData.coordinatorPhone}
                      onChange={(e) => handleInputChange("coordinatorPhone", e.target.value)}
                      placeholder="Coordinator phone number"
                    />
                  </div>
                </div>
              </div>

              <TermsAndConditions
                accepted={formData.agreeTerms}
                onAccept={(accepted) => handleInputChange("agreeTerms", accepted)}
                registrationType="college"
              />

              <Button type="submit" className="w-full" disabled={!formData.agreeTerms || isSubmitting || registrationLimit?.isFull}>
                {registrationLimit?.isFull ? 'Registration Full' : isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />Submitting...</> : 'Submit College Registration'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),

      'moba-open': (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.TROPHY} size={20} color="#ff6b6b" />
              MOBA 5v5 Open Tournament Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <RegistrationLimitDisplay
              limit={registrationLimit}
              isLoading={isCheckingLimit}
              type="moba-open"
            />
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
                  <Label htmlFor="collegeName">Organization/Team Name *</Label>
                  <Input
                    id="collegeName"
                    value={formData.collegeName}
                    onChange={(e) => handleInputChange("collegeName", e.target.value)}
                    placeholder="Enter your organization or team name"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="orgLogo">Organization Logo (High Quality)</Label>
                <Input
                  id="orgLogo"
                  type="file"
                  accept=".jpg,.jpeg,.png,.svg,.webp"
                  onChange={(e) => handleInputChange("collegeLogoUpload", e.target.files?.[0] || null)}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload a high quality transparent logo of your organization if possible (Optional)
                </p>
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

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Tournament Game: Mobile Legends</h4>
                <p className="text-sm text-muted-foreground">
                  Open tournament for Mobile Legends: Bang Bang with 5 players per team. Open to all participants.
                </p>
              </div>

              {/* Team Members Section */}
              <div>
                <Label className="text-base font-semibold mb-4 block">
                  Team Members (5 Players Required)
                </Label>
                <div className="space-y-4">
                  {getTeamMemberFields().map((member, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-card">
                      <div>
                        <Label htmlFor={`member-${index}-fullName`}>Player {index + 1} Full Name *</Label>
                        <Input
                          id={`member-${index}-fullName`}
                          value={member.fullName}
                          onChange={(e) => handleTeamMemberChange(index, 'fullName', e.target.value)}
                          placeholder="Full name"
                          required
                        />
                      </div>
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
                      <div>
                        <Label htmlFor={`member-${index}-aadhaar`}>Player {index + 1} Aadhaar *</Label>
                        <Input
                          id={`member-${index}-aadhaar`}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleTeamMemberChange(index, 'aadhaarUpload', e.target.files?.[0] || null)}
                          className="mt-1"
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Upload Aadhaar card
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-4 block">Substitute Player (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-card">
                  <div>
                    <Label htmlFor="sub-fullName">Substitute Full Name</Label>
                    <Input
                      id="sub-fullName"
                      value={formData.substitute.fullName}
                      onChange={(e) => handleSubstituteChange('fullName', e.target.value)}
                      placeholder="Substitute full name"
                    />
                  </div>
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
                  <div>
                    <Label htmlFor="sub-aadhaar">Substitute Aadhaar</Label>
                    <Input
                      id="sub-aadhaar"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleSubstituteChange('aadhaarUpload', e.target.files?.[0] || null)}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Required if substitute details are provided
                    </p>
                  </div>
                </div>
              </div>

              {/* Consent Section */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="livestreamConsent"
                    checked={formData.livestreamConsent}
                    onChange={(e) => handleInputChange("livestreamConsent", e.target.checked)}
                    required
                    className="w-5 h-5 mt-0.5"
                  />
                  <div>
                    <Label htmlFor="livestreamConsent" className="text-sm font-medium">
                      Consent for livestream, photography, and recording *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I consent to photographs, videos, and livestreaming of tournament participation for promotional purposes
                    </p>
                  </div>
                </div>
              </div>

              <TermsAndConditions
                accepted={formData.agreeTerms}
                onAccept={(accepted) => handleInputChange("agreeTerms", accepted)}
                registrationType="moba-open"
              />

              <Button type="submit" className="w-full" disabled={!formData.agreeTerms || isSubmitting || registrationLimit?.isFull}>
                {registrationLimit?.isFull ? 'Registration Full' : isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />Submitting...</> : 'Submit MOBA Tournament Registration'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),

      cosplayer: (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.STAR} size={20} color="#ec4899" />
              Cosplayer Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cosplay Character Rule Warning */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-400">
                      Cosplay Character Restriction
                    </p>
                    <p className="text-sm text-amber-300/80 mt-1">
                      Cosplay entries must be based on officially recognised video game characters. Characters from anime, films, comics, or other media are allowed only if they have an official video game appearance or belong to a recognised game franchise.
                      Any other characters will be rejected.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rules Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-pink-500/50 text-pink-400 hover:bg-pink-500/10 hover:text-pink-300">
                    View Full Guidelines & Prizes
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-[#131313] border-[#353534] text-[#e5e2e1]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-pink-400 font-['Neo_Triad'] uppercase tracking-wider border-b border-[#353534] pb-4 mb-4">Cosplay Competition Guidelines</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 font-['Nonito'] text-sm leading-relaxed">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 uppercase">Guidelines</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-[#c8c6c5]">
                        <li>Cosplayers are requested to refrain from using obscene/vulgar language/gestures while performing on stage.</li>
                        <li>Use of open flames, confetti, liquids, sharpened or loaded props are prohibited.</li>
                        <li>Original characters or characters which are not of game origin will not be qualified to participate in the TXG Cosplay Competition.</li>
                        <li>No additional points will be awarded or deducted for background visual or audio edits and/or stage props.</li>
                        <li>Cosplayers are responsible for their own personal belongings at the venue. The management will not be held responsible for loss or damage of personal items.</li>
                        <li>All are requested to be mindful and respectful towards those around you. Kindly adhere to venue guidelines.</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 uppercase">Judging Criteria</h4>
                      <ul className="list-disc pl-5 space-y-2 text-[#c8c6c5]">
                        <li><strong className="text-[#ffb4a8]">COSTUME DETAIL (10 Points):</strong> All elements of the character's original design, as shown in the game, must be present. All details must match the character reference photo which was submitted during registration.</li>
                        <li><strong className="text-[#ffb4a8]">CRAFTSMANSHIP (10 Points):</strong> Foamwork, needlework, functionality, durability and overall quality of the cosplay.</li>
                        <li><strong className="text-[#ffb4a8]">Stage Performance (10 Points):</strong> Overall entertainment value.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 uppercase">Contest Categories</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-[#1c1b1b] p-3 border border-[#353534] rounded flex justify-between items-center">
                          <span>Grand Winner</span>
                          <strong className="text-[#00ff88]">₹60,000</strong>
                        </div>
                        <div className="bg-[#1c1b1b] p-3 border border-[#353534] rounded flex justify-between items-center">
                          <span>Best Foam work</span>
                          <strong className="text-[#00ff88]">₹10,000</strong>
                        </div>
                        <div className="bg-[#1c1b1b] p-3 border border-[#353534] rounded flex justify-between items-center">
                          <span>Best Needlework</span>
                          <strong className="text-[#00ff88]">₹10,000</strong>
                        </div>
                        <div className="bg-[#1c1b1b] p-3 border border-[#353534] rounded flex justify-between items-center">
                          <span>Fan Favorite</span>
                          <strong className="text-[#00ff88]">₹10,000</strong>
                        </div>
                        <div className="bg-[#1c1b1b] p-3 border border-[#353534] rounded flex flex-col justify-center sm:col-span-2">
                          <div className="flex justify-between items-center">
                            <span>Best MOBA 5V5 character cosplay</span>
                            <strong className="text-[#00ff88]">₹10,000</strong>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">Sponsored by Community Heroes Nagaland</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div>
                <Label htmlFor="captainName">Name *</Label>
                <Input
                  id="captainName"
                  value={formData.captainName}
                  onChange={(e) => handleInputChange("captainName", e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Complete address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pinCode">PIN Code *</Label>
                  <Input
                    id="pinCode"
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange("pinCode", e.target.value)}
                    placeholder="PIN Code"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="captainPhone">Phone number *</Label>
                <Input
                  id="captainPhone"
                  value={formData.captainPhone}
                  onChange={(e) => handleInputChange("captainPhone", e.target.value)}
                  placeholder="Phone number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                  placeholder="Your Instagram handle/link"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="characterName">Character Name *</Label>
                  <Input
                    id="characterName"
                    value={formData.characterName}
                    onChange={(e) => handleInputChange("characterName", e.target.value)}
                    placeholder="Character Name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gameName">Character origin(Game) *</Label>
                  <Input
                    id="gameName"
                    value={formData.gameName}
                    onChange={(e) => handleInputChange("gameName", e.target.value)}
                    placeholder="Character origin(Game)"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="characterReferenceUpload">Character reference photo *</Label>
                <Input
                  id="characterReferenceUpload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 10 * 1024 * 1024) {
                      alert("File size exceeds 10MB limit.");
                      e.target.value = '';
                      handleInputChange("characterReferenceUpload", null);
                    } else {
                      handleInputChange("characterReferenceUpload", file || null);
                    }
                  }}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum number of file: 1 | Maximum file size: 10MB
                </p>
              </div>

              <div>
                <Label htmlFor="backgroundAudioUpload">Background Audio/video</Label>
                <Input
                  id="backgroundAudioUpload"
                  type="file"
                  accept="audio/*,video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 10 * 1024 * 1024) {
                      alert("File size exceeds 10MB limit.");
                      e.target.value = '';
                      handleInputChange("backgroundAudioUpload", null);
                    } else {
                      handleInputChange("backgroundAudioUpload", file || null);
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum number of file: 1 | Maximum file size: 10MB
                </p>
              </div>

              <div>
                <Label htmlFor="performanceDuration">Performance Duration *</Label>
                <Input
                  id="performanceDuration"
                  value={formData.performanceDuration}
                  onChange={(e) => handleInputChange("performanceDuration", e.target.value)}
                  placeholder="e.g., 2 minutes"
                  required
                />
              </div>

              <div>
                <Label htmlFor="captainEmail">Email address *</Label>
                <Input
                  id="captainEmail"
                  type="email"
                  value={formData.captainEmail}
                  onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </div>

              <TermsAndConditions
                accepted={formData.agreeTerms}
                onAccept={(accepted) => handleInputChange("agreeTerms", accepted)}
                registrationType="cosplayer"
              />

              <Button type="submit" className="w-full" disabled={!formData.agreeTerms || isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />Submitting...</> : "Register as Cosplayer"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),

      vendor: (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.TARGET} size={20} color="#3b82f6" />
              Vendor Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="collegeName">Company/Business Name *</Label>
                <Input
                  id="collegeName"
                  value={formData.collegeName}
                  onChange={(e) => handleInputChange("collegeName", e.target.value)}
                  placeholder="Your company or business name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="vendorType">Vendor Type *</Label>
                <select
                  id="vendorType"
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select vendor type</option>
                  <option value="food">Food</option>
                  <option value="beverage">Beverage</option>
                  <option value="merchandise">Merchandise (Toys, Clothes, Footwears etc)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="message">Products/Services Description *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Describe the products or services you'll be offering"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="captainName">Contact Person *</Label>
                  <Input
                    id="captainName"
                    value={formData.captainName}
                    onChange={(e) => handleInputChange("captainName", e.target.value)}
                    placeholder="Contact person name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="captainEmail">Email *</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    value={formData.captainEmail}
                    onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                    placeholder="Contact email address"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="captainPhone">Phone *</Label>
                <Input
                  id="captainPhone"
                  value={formData.captainPhone}
                  onChange={(e) => handleInputChange("captainPhone", e.target.value)}
                  placeholder="Contact phone number"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Business Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Complete business address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pinCode">PIN Code *</Label>
                  <Input
                    id="pinCode"
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange("pinCode", e.target.value)}
                    placeholder="PIN Code"
                    required
                  />
                </div>
              </div>

              <TermsAndConditions
                accepted={formData.agreeTerms}
                onAccept={(accepted) => handleInputChange("agreeTerms", accepted)}
                registrationType="vendor"
              />

              <Button type="submit" className="w-full" disabled={!formData.agreeTerms || isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />Submitting...</> : "Register as Vendor"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),

      exhibitor: (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.MONITOR} size={20} color="#eab308" />
              Exhibitor Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="collegeName">Company/Organization Name *</Label>
                <Input
                  id="collegeName"
                  value={formData.collegeName}
                  onChange={(e) => handleInputChange("collegeName", e.target.value)}
                  placeholder="Your company or organization name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Exhibition Description *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Describe what you'll be exhibiting or demonstrating"
                  required
                />
              </div>

              <div>
                <Label htmlFor="teamName">Booth/Space Requirements</Label>
                <Textarea
                  id="teamName"
                  value={formData.teamName}
                  onChange={(e) => handleInputChange("teamName", e.target.value)}
                  placeholder="Describe your booth/space requirements (size, equipment, etc.)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="captainName">Contact Person *</Label>
                  <Input
                    id="captainName"
                    value={formData.captainName}
                    onChange={(e) => handleInputChange("captainName", e.target.value)}
                    placeholder="Contact person name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="captainEmail">Email *</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    value={formData.captainEmail}
                    onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                    placeholder="Contact email address"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="captainPhone">Phone *</Label>
                <Input
                  id="captainPhone"
                  value={formData.captainPhone}
                  onChange={(e) => handleInputChange("captainPhone", e.target.value)}
                  placeholder="Contact phone number"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Organization Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Complete organization address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pinCode">PIN Code *</Label>
                  <Input
                    id="pinCode"
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange("pinCode", e.target.value)}
                    placeholder="PIN Code"
                    required
                  />
                </div>
              </div>

              <TermsAndConditions
                accepted={formData.agreeTerms}
                onAccept={(accepted) => handleInputChange("agreeTerms", accepted)}
                registrationType="exhibitor"
              />

              <Button type="submit" className="w-full" disabled={!formData.agreeTerms || isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />Submitting...</> : "Register as Exhibitor"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),

      media: (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.VIDEO} size={20} color="#a855f7" />
              Media Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="captainEmail">Email *</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    value={formData.captainEmail}
                    onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                    placeholder="Your email address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="captainPhone">Phone *</Label>
                  <Input
                    id="captainPhone"
                    value={formData.captainPhone}
                    onChange={(e) => handleInputChange("captainPhone", e.target.value)}
                    placeholder="Your phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="collegeName">Media Organization *</Label>
                <Input
                  id="collegeName"
                  value={formData.collegeName}
                  onChange={(e) => handleInputChange("collegeName", e.target.value)}
                  placeholder="Your media organization"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Role/Position *</Label>
                <Input
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Your role (Journalist, Photographer, Content Creator, etc.)"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Complete address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pinCode">PIN Code *</Label>
                  <Input
                    id="pinCode"
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange("pinCode", e.target.value)}
                    placeholder="PIN Code"
                    required
                  />
                </div>
              </div>

              <TermsAndConditions
                accepted={formData.agreeTerms}
                onAccept={(accepted) => handleInputChange("agreeTerms", accepted)}
                registrationType="media"
              />

              <Button type="submit" className="w-full" disabled={!formData.agreeTerms || isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />Submitting...</> : "Register as Media"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),

      sponsor: (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.PARTNERSHIP} size={20} color="#50D075" />
              Sponsor Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="teamName">Company Name *</Label>
                <Input
                  id="teamName"
                  value={formData.teamName}
                  onChange={(e) => handleInputChange("teamName", e.target.value)}
                  placeholder="Your company name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="sponsorType">Sponsorship Tier *</Label>
                <select
                  id="sponsorType"
                  value={formData.sponsorType}
                  onChange={(e) => handleInputChange("sponsorType", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select sponsorship tier</option>
                  <option value="1">🏆 TITLE SPONSOR</option>
                  <option value="2">🥈 POWERED BY SPONSOR</option>
                  <option value="3">🥉 ASSOCIATE SPONSOR</option>
                  <option value="4">🎮 CATEGORY PARTNERS</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="captainName">Contact Person *</Label>
                  <Input
                    id="captainName"
                    value={formData.captainName}
                    onChange={(e) => handleInputChange("captainName", e.target.value)}
                    placeholder="Contact person name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="captainEmail">Email *</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    value={formData.captainEmail}
                    onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                    placeholder="Contact email address"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="captainPhone">Phone *</Label>
                <Input
                  id="captainPhone"
                  value={formData.captainPhone}
                  onChange={(e) => handleInputChange("captainPhone", e.target.value)}
                  placeholder="Contact phone number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Any additional information or special requirements"
                />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Company Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Complete company address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pinCode">PIN Code *</Label>
                  <Input
                    id="pinCode"
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange("pinCode", e.target.value)}
                    placeholder="PIN Code"
                    required
                  />
                </div>
              </div>

              <TermsAndConditions
                accepted={formData.agreeTerms}
                onAccept={(accepted) => handleInputChange("agreeTerms", accepted)}
                registrationType="sponsor"
              />

              <Button type="submit" className="w-full" disabled={!formData.agreeTerms || isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />Submitting...</> : "Register as Sponsor"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),

      'mini-tournament': (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.GAMEPAD} size={20} color="#ff6b6b" />
              Mini Tournament Registration
            </CardTitle>
            {registrationId && (
              <p className="text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <RegistrationLimitDisplay
              limit={registrationLimit}
              isLoading={isCheckingLimit}
              type="mini-tournament"
            />
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Game Selection */}
              <div>
                <Label htmlFor="miniGame">Select Tournament *</Label>
                <select
                  id="miniGame"
                  value={formData.game || ''}
                  onChange={(e) => handleInputChange("game", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select a mini tournament</option>
                  {miniTournaments.map((tournament, index) => (
                    <option key={index} value={tournament.name}>
                      {tournament.name}
                    </option>
                  ))}
                </select>
              </div>

              {formData.game === "Dirt Rally 2.0" ? (
                <div className="bg-muted/30 p-6 rounded-lg border border-border mt-6">
                  <h3 className="text-xl font-bold text-white mb-4">DiRT Rally 2.0 – Driving Simulator Time Trial Challenge</h3>
                  <div className="space-y-4 text-sm text-[#d0d0d0] font-['Nonito'] leading-relaxed">
                    <p>
                      The DiRT Rally 2.0 competition will be conducted as an open time-trial challenge on a dedicated driving simulator rig. No prior registration will be required. Participants may walk in during the event and attempt the challenge within the allotted competition hours.
                    </p>
                    <p>
                      To ensure fairness, the competition will use one fixed track, one fixed car, and one fixed gameplay setting for all participants. The same simulator setup, controller configuration, assist settings, weather condition, and race parameters will be maintained throughout the competition.
                    </p>
                    <p>
                      The challenge will remain open across both days of TXG Expo. Participants may attempt multiple runs during the event period, subject to crowd management and slot availability. Each participant's best valid lap time will be recorded on the official leaderboard.
                    </p>
                    <p>
                      At the end of the event, the participant with the fastest valid lap time will be declared the winner.
                    </p>
                    
                    <h4 className="text-lg font-bold text-white mt-6 mb-2">Format Summary</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong className="text-white">Game:</strong> DiRT Rally 2.0</li>
                      <li><strong className="text-white">Mode:</strong> Time Trial</li>
                      <li><strong className="text-white">Registration:</strong> Not required</li>
                      <li><strong className="text-white">Setup:</strong> Driving simulator rig</li>
                      <li><strong className="text-white">Duration:</strong> Open across 2 event days</li>
                      <li><strong className="text-white">Track:</strong> One fixed track for all participants</li>
                      <li><strong className="text-white">Car:</strong> One fixed car for all participants</li>
                      <li><strong className="text-white">Settings:</strong> Same fixed settings for all participants</li>
                      <li><strong className="text-white">Winning Criteria:</strong> Fastest valid lap time by the end of the event</li>
                    </ul>

                    <h4 className="text-lg font-bold text-white mt-6 mb-2">Fair Play Rules</h4>
                    <p>
                      All participants must use the official simulator setup provided at the venue. No custom settings, external devices, personal controllers, or changes to the game configuration will be allowed. Any attempt involving reset abuse, shortcut exploitation, tampering with the simulator, or unsporting behaviour may be disqualified at the discretion of the organisers.
                    </p>
                    <p>
                      The organisers' recorded leaderboard will be considered final.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Label htmlFor="nickName">Nick Name (for tournament overlay) *</Label>
                      <Input
                        id="nickName"
                        value={formData.nickName}
                        onChange={(e) => handleInputChange("nickName", e.target.value)}
                        placeholder="Your gaming nickname"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="captainEmail">Email Address *</Label>
                    <Input
                      id="captainEmail"
                      type="email"
                      value={formData.captainEmail}
                      onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="whatsappPhone">WhatsApp Phone Number *</Label>
                      <Input
                        id="whatsappPhone"
                        value={formData.whatsappPhone}
                        onChange={(e) => handleInputChange("whatsappPhone", e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneCallNumber">Phone Call Number *</Label>
                      <Input
                        id="phoneCallNumber"
                        value={formData.phoneCallNumber}
                        onChange={(e) => handleInputChange("phoneCallNumber", e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="Your age"
                        min="12"
                        max="60"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <select
                        id="gender"
                        value={formData.gender || ''}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
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

                  <TermsAndConditions
                    accepted={formData.agreeTerms}
                    onAccept={(accepted) => handleInputChange("agreeTerms", accepted)}
                    registrationType="mini-tournament"
                  />

                  <Button type="submit" className="w-full" disabled={!formData.agreeTerms || isSubmitting || registrationLimit?.isFull}>
                    {registrationLimit?.isFull ? 'Registration Full' : isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />Submitting...</> : 'Register for Mini Tournament'}
                  </Button>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      ),
      'digital-art': (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.GAMEPAD} size={20} color="#ff6b6b" />
              Digital Art Competition Registration
            </CardTitle>
            {registrationId && (
              <p className="hidden text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Your age"
                    min="12"
                    max="60"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="whatsappPhone">Mobile / WhatsApp Number *</Label>
                  <Input
                    id="whatsappPhone"
                    value={formData.whatsappPhone}
                    onChange={(e) => handleInputChange("whatsappPhone", e.target.value)}
                    placeholder="+91 98765 43210"
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
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">District / Town *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Your district or town"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact Number *</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deviceType">Device you will use *</Label>
                  <select
                    id="deviceType"
                    value={formData.deviceType}
                    onChange={(e) => handleInputChange("deviceType", e.target.value)}
                    className="w-full p-2 border rounded-md bg-background text-foreground"
                    required
                  >
                    <option value="">Select device</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Tablet / iPad">Tablet / iPad</option>
                    <option value="Other">Other</option>
                  </select>
                  {formData.deviceType === "Other" && (
                    <div className="mt-4">
                      <Label htmlFor="otherDeviceType">Specify Device *</Label>
                      <Input
                        id="otherDeviceType"
                        value={formData.otherDeviceType}
                        onChange={(e) => handleInputChange("otherDeviceType", e.target.value)}
                        placeholder="Please specify"
                        required
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="digitalArtSoftware">Preferred Digital Art Software *</Label>
                  <Input
                    id="digitalArtSoftware"
                    value={formData.digitalArtSoftware}
                    onChange={(e) => handleInputChange("digitalArtSoftware", e.target.value)}
                    placeholder="e.g. Photoshop, Procreate, Krita"
                    required
                  />
                </div>
              </div>

              <TermsAndConditions
                accepted={formData.agreeTerms}
                onAccept={(accepted) => handleInputChange("agreeTerms", accepted)}
                registrationType="digital-art"
              />

              <Button type="submit" className="w-full" disabled={!formData.agreeTerms || isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />Submitting...</> : 'Register for Digital Art Competition'}
              </Button>
            </form>
          </CardContent>
        </Card>
      ),
      'ai-video': (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GamingIcon iconId={GamingIcons.GAMEPAD} size={20} color="#be0000" />
              AI Creative Video Challenge Registration
            </CardTitle>
            {registrationId && (
              <p className="hidden text-sm text-muted-foreground">Registration ID: {registrationId}</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="captainName">Full Name</Label>
                  <Input
                    id="captainName"
                    value={formData.captainName}
                    onChange={(e) => handleInputChange("captainName", e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Your age"
                    min="12"
                    max="99"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                    className="w-full p-2 border rounded-md bg-background text-foreground"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="captainPhone">Mobile Number</Label>
                  <Input
                    id="captainPhone"
                    value={formData.captainPhone}
                    onChange={(e) => handleInputChange("captainPhone", e.target.value)}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="whatsappPhone">WhatsApp Number (if different)</Label>
                  <Input
                    id="whatsappPhone"
                    value={formData.whatsappPhone}
                    onChange={(e) => handleInputChange("whatsappPhone", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <Label htmlFor="captainEmail">Email Address</Label>
                  <Input
                    id="captainEmail"
                    type="email"
                    value={formData.captainEmail}
                    onChange={(e) => handleInputChange("captainEmail", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">District</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Your district"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="collegeName">Institution / College / University / Organisation (if applicable)</Label>
                  <Input
                    id="collegeName"
                    value={formData.collegeName}
                    onChange={(e) => handleInputChange("collegeName", e.target.value)}
                    placeholder="If applicable"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="participantType">Participant Type</Label>
                  <select
                    id="participantType"
                    value={formData.participantType}
                    onChange={(e) => handleInputChange("participantType", e.target.value)}
                    className="w-full p-2 border rounded-md bg-background text-foreground"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Student">Student</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="entryType">Entry Type</Label>
                  <select
                    id="entryType"
                    value={formData.entryType}
                    onChange={(e) => handleInputChange("entryType", e.target.value)}
                    className="w-full p-2 border rounded-md bg-background text-foreground"
                    required
                  >
                    <option value="">Select entry type</option>
                    <option value="Individual">Individual</option>
                    <option value="Team">Team</option>
                  </select>
                </div>
              </div>

              {formData.entryType === 'Team' && (
                <div className="grid grid-cols-1 gap-4 p-4 border rounded-md bg-primary/5">
                  <div>
                    <Label htmlFor="teamName">Team Name (for team entries)</Label>
                    <Input
                      id="teamName"
                      value={formData.teamName}
                      onChange={(e) => handleInputChange("teamName", e.target.value)}
                      placeholder="Enter team name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamMembers">Team Member Names (for team entries)</Label>
                    <Textarea
                      id="teamMembers"
                      value={formData.teamMembers[0].fullName}
                      onChange={(e) => {
                        const newMembers = [...formData.teamMembers];
                        newMembers[0].fullName = e.target.value;
                        handleInputChange("teamMembers", newMembers);
                      }}
                      placeholder="List all team members separated by commas"
                      required
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="aiVideoTitle">Video Title</Label>
                  <Input
                    id="aiVideoTitle"
                    value={formData.aiVideoTitle}
                    onChange={(e) => handleInputChange("aiVideoTitle", e.target.value)}
                    placeholder="Enter the title of your video"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="aiVideoDescription">Brief Description of Video (maximum 50 words)</Label>
                  <Textarea
                    id="aiVideoDescription"
                    value={formData.aiVideoDescription}
                    onChange={(e) => handleInputChange("aiVideoDescription", e.target.value)}
                    placeholder="Provide a brief description"
                    required
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Word count: {formData.aiVideoDescription ? formData.aiVideoDescription.trim().split(/\s+/).length : 0} / 50
                  </p>
                </div>
                <div>
                  <Label htmlFor="aiToolsUsed">AI Tool(s) Used</Label>
                  <Input
                    id="aiToolsUsed"
                    value={formData.aiToolsUsed}
                    onChange={(e) => handleInputChange("aiToolsUsed", e.target.value)}
                    placeholder="e.g. Midjourney, Runway, Sora, ElevenLabs"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aiVideoUpload">Upload Your Video</Label>
                <p className="text-xs text-muted-foreground">Duration: 30 seconds • Recommended format: MP4 • Max size: ~50MB</p>
                <div className="flex items-center gap-4">
                  <Input
                    id="aiVideoUpload"
                    type="file"
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={(e) => handleInputChange("aiVideoUpload", e.target.files?.[0] || null)}
                    className="hidden"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("aiVideoUpload")?.click()}
                    className="w-full h-24 border-dashed border-2 flex flex-col items-center justify-center gap-2"
                  >
                    <Upload className="w-6 h-6" />
                    <span className="text-sm">Click to upload video</span>
                    {formData.aiVideoUpload && (
                      <span className="text-xs text-green-500">{formData.aiVideoUpload.name}</span>
                    )}
                  </Button>
                </div>
              </div>

              <div className="p-4 border rounded-md bg-[#131313] border-[#353534] flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-[#e5e2e1] uppercase">Creative Guidelines</h4>
                  <p className="text-xs text-[#c8c6c5]">Please review the rules before submitting.</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" type="button" className="shrink-0 border-[#be0000] text-[#be0000] hover:bg-[#be0000] hover:text-white">
                      View Guidelines
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-[#131313] border-[#353534] text-[#e5e2e1]">
                    <DialogHeader>
                      <DialogTitle className="text-xl md:text-2xl font-bold text-[#e5e2e1] uppercase border-b border-[#353534] pb-4 mb-4">
                        AI Creative Video Challenge — Creative Guidelines
                      </DialogTitle>
                      <DialogDescription className="hidden">
                        Guidelines for the AI Creative Video Challenge
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 text-sm md:text-base leading-relaxed">
                      <p className="text-[#ffb4a8] font-bold tracking-widest uppercase text-xs md:text-sm">30 Seconds • Open Theme • Create Anything</p>
                      <ul className="list-disc pl-5 space-y-3 text-[#c8c6c5]">
                        <li><strong className="text-white">Be Original</strong> — Create your own concept. Do not copy, recreate, or closely imitate existing videos or another creator's work.</li>
                        <li><strong className="text-white">Make It Unique</strong> — Creativity and originality matter. Avoid simply reproducing common AI trends, templates, or prompts.</li>
                        <li><strong className="text-white">Use AI Meaningfully</strong> — AI video-generation tools must form a significant part of the video creation process.</li>
                        <li><strong className="text-white">Keep It Appropriate</strong> — No sexually explicit or indecent content, excessive violence, hate, discrimination, harassment, or material unsuitable for a public all-age event.</li>
                        <li><strong className="text-white">No Misleading Deepfakes</strong> — Do not falsely depict real people saying or doing things they did not do.</li>
                        <li><strong className="text-white">Respect Copyright</strong> — Only use music, images, footage, characters, logos, voices, or other material you have the right to use.</li>
                        <li><strong className="text-white">30-Second Limit</strong> — The complete video, including titles and credits, must be within 30 seconds.</li>
                        <li><strong className="text-white">Top 10 Showcase</strong> — The Top 10 selected videos will be screened throughout the TXG Expo.</li>
                      </ul>
                      <div className="bg-[#1c1b1b] p-4 border-l-4 border-[#be0000] text-[#e5e2e1] italic text-xs md:text-sm">
                        <strong className="text-[#ffb4a8] not-italic">Important:</strong> Open theme means creative freedom, not unrestricted content. Entries that are copied, inappropriate, misleading, or violate these guidelines may be disqualified.
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#353534]">
                <h4 className="font-bold text-[#e5e2e1] uppercase">Declaration</h4>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="originalWorkDeclaration"
                    checked={formData.originalWorkDeclaration}
                    onChange={(e) => handleInputChange("originalWorkDeclaration", e.target.checked)}
                  />
                  <label
                    htmlFor="originalWorkDeclaration"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I confirm that this submission is my/our original work and complies with the Creative Guidelines.
                  </label>
                </div>
                
                <TermsAndConditions
                  accepted={formData.agreeTerms}
                  onAccept={(accepted) => handleInputChange("agreeTerms", accepted)}
                  registrationType="ai-video"
                />
              </div>

              <Button type="submit" className="w-full bg-[#be0000] hover:bg-[#a00000] text-white" disabled={!formData.agreeTerms || !formData.originalWorkDeclaration || isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />Submitting...</> : 'Register for AI Video Challenge'}
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
          {/* <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold mb-4">
            Register for <span className="text-5xl md:text-[64px]" style={{ fontFamily: "'Neo_Triad', sans-serif", color: "#00ff88" }}>TXG</span> 
          </h2> */}
          <h2 className="font-['Neiko'] text-4xl md:text-6xl font-bold text-white mb-6">
            Register for{" "}
            <span
              className="font-['Neo_Triad'] inline-flex tracking-normal"
              style={{ fontFamily: "'Neo_Triad', sans-serif" }}
            >
              {/* Red 'T' with minimal vertical gradient */}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#FF5F4F] via-[#EA4335] to-[#FF00FF]"
              >
                T
              </span>
              {/* Green 'X' with minimal vertical gradient */}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#50D075] via-[#34A853] to-[#FFFF00]">
                X
              </span>
              {/* Blue 'G' with minimal vertical gradient */}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#50D075] via-[#FFFF00] to-[#50D075]">
                G
              </span>
            </span>
          </h2>
          <p className="text-[#d0d0d0] text-lg max-w-2xl mx-auto font-['Nonito']">
            Join Southeast Asia's premier gaming event. Choose your registration type below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center transition-all cursor-not-allowed opacity-60 h-full flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 * 0.15 }}
            // onClick={() => setRegistrationType("college")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform">
              <GamingIcon iconId={GamingIcons.USERS} size={24} color="#00ff88" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Inter College</h3>
              <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
                Register your college team for Mobile Legends tournament
              </p>
            </div>
            <Button className="w-full text-sm sm:text-base" variant="outline" disabled>Closed</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center transition-all cursor-not-allowed opacity-60 h-full flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          // onClick={() => setRegistrationType("moba-open")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform">
              <GamingIcon iconId={GamingIcons.TROPHY} size={24} color="#ff6b6b" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">MOBA 5v5 Open</h3>
              <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
                Open tournament for Mobile Legends 5v5 competition
              </p>
            </div>
            <Button className="w-full text-sm sm:text-base" variant="outline" disabled>Closed</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 cursor-pointer h-full flex flex-col group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => setRegistrationType("mini-tournament")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform group-hover:scale-110">
              <GamingIcon iconId={GamingIcons.GAMEPAD} size={24} color="#ff6b6b" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Mini Tournaments</h3>
              <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
                Register for quick action games and instant rewards
              </p>
            </div>
            <Button className="w-full text-sm sm:text-base group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-colors" variant="outline">Register Now</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center transition-all hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10 cursor-pointer h-full flex flex-col group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            onClick={() => setRegistrationType("cosplayer")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform group-hover:scale-110">
              <GamingIcon iconId={GamingIcons.STAR} size={24} color="#ec4899" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Cosplayers</h3>
              <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
                Register as a cosplayer and showcase your talent
              </p>
            </div>
            <Button className="w-full text-sm sm:text-base group-hover:bg-pink-500 group-hover:text-white group-hover:border-pink-500 transition-colors" variant="outline">Register Now</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center transition-all hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10 cursor-pointer h-full flex flex-col group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setRegistrationType("digital-art")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform group-hover:scale-110">
              <GamingIcon iconId={GamingIcons.MONITOR} size={24} color="#14b8a6" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Digital Art</h3>
              <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
                Compete in the live digital art creation challenge
              </p>
            </div>
            <Button className="w-full text-sm sm:text-base group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 transition-colors" variant="outline">Register Now</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center transition-all hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 cursor-pointer h-full flex flex-col group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onClick={() => setRegistrationType("ai-video")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform group-hover:scale-110">
              <GamingIcon iconId={GamingIcons.GAMEPAD} size={24} color="#be0000" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">AI Video Challenge</h3>
              <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
                Submit your 30-second AI-generated masterpiece
              </p>
            </div>
            <Button className="w-full text-sm sm:text-base group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-colors" variant="outline">Register Now</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center transition-all cursor-not-allowed opacity-60 h-full flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          // onClick={() => setRegistrationType("vendor")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform">
              <GamingIcon iconId={GamingIcons.TARGET} size={24} color="#3b82f6" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Vendors</h3>
              <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
                Sell your products and services at the event
              </p>
            </div>
            <Button className="w-full text-sm sm:text-base" variant="outline" disabled>Coming Soon</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center transition-all cursor-not-allowed opacity-60 h-full flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          // onClick={() => setRegistrationType("exhibitor")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform">
              <GamingIcon iconId={GamingIcons.MONITOR} size={24} color="#eab308" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Exhibitor</h3>
              <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
                Exhibit your products and connect with attendees
              </p>
            </div>
            <Button className="w-full text-sm sm:text-base" variant="outline" disabled>Coming Soon</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center transition-all cursor-not-allowed opacity-60 h-full flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          // onClick={() => setRegistrationType("media")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform">
              <GamingIcon iconId={GamingIcons.VIDEO} size={24} color="#a855f7" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Media</h3>
              <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
                Press access for journalists, photographers, and content creators
              </p>
            </div>
            <Button className="w-full text-sm sm:text-base" variant="outline" disabled>Coming Soon</Button>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-center transition-all cursor-not-allowed opacity-60 h-full flex flex-col"
            data-registration-type="sponsor"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          // onClick={() => setRegistrationType("sponsor")}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-transform">
              <GamingIcon iconId={GamingIcons.PARTNERSHIP} size={24} color="#50D075" />
            </div>
            <div className="flex-grow flex flex-col justify-between">
              <h3 className="font-['Neiko'] text-lg sm:text-xl font-bold text-white mb-3">Sponsors</h3>
              <p className="text-[#d0d0d0] text-xs sm:text-sm leading-relaxed mb-4 font-['Nonito']">
                Partner with us and showcase your brand
              </p>
            </div>
            <Button className="w-full text-sm sm:text-base" variant="outline" disabled>Coming Soon</Button>
          </motion.div>
        </div>

        {/* Become a Partner Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 text-[#d0d0d0] hover:text-white transition-colors cursor-pointer group"
            onClick={() => {
              setRegistrationType("sponsor");
              // Scroll to sponsor card after it renders
              setTimeout(() => {
                // Try multiple selectors to find the sponsor card
                let element = document.querySelector('[data-registration-type="sponsor"]');
                if (!element) {
                  // Fallback: look for any card with sponsor text
                  element = Array.from(document.querySelectorAll('.motion-div')).find(el =>
                    el.textContent?.includes('Sponsor') || el.textContent?.includes('Partner')
                  );
                }
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }, 500);
            }}>
            <span className="text-lg font-['Nonito']">Interested in partnership opportunities?</span>
            <span className="text-[#50D075] group-hover:text-[#00ff88] font-semibold transition-colors">
              Become a Partner →
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationSection;
