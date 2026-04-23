import { FirebaseService } from './firebase';
import { TeamRegistration, SponsorRegistration, VisitorRegistration, MediaPersonRegistration } from './firebase';
import { sendAdminNotificationEmail } from '../utils/firebaseEmailService';
import firebaseStorageService from '../services/firebaseStorageService';

// API service for handling registration operations with Firebase
export class RegistrationAPI {
  private firebaseService = new FirebaseService();

  // Registration Limits
  private readonly MOBA_TEAM_LIMIT = 32;
  private readonly MINI_TOURNAMENT_LIMIT = 16;

  // Check team registration limit
  async checkTeamRegistrationLimit(registrationType: 'college' | 'open_category'): Promise<{ allowed: boolean; current: number; limit: number }> {
    const current = await this.firebaseService.getTeamRegistrationCountByType(registrationType);
    return {
      allowed: current < this.MOBA_TEAM_LIMIT,
      current,
      limit: this.MOBA_TEAM_LIMIT
    };
  }

  // Check mini tournament registration limit
  async checkMiniTournamentLimit(gameName: string): Promise<{ allowed: boolean; current: number; limit: number }> {
    const current = await this.firebaseService.getMiniTournamentRegistrationCountByGame(gameName);
    return {
      allowed: current < this.MINI_TOURNAMENT_LIMIT,
      current,
      limit: this.MINI_TOURNAMENT_LIMIT
    };
  }

  // Get all mini tournament registration counts
  async getAllMiniTournamentCounts(): Promise<{ [gameName: string]: number }> {
    return this.firebaseService.getAllMiniTournamentCounts();
  }

  // Team Registration API
  async submitTeamRegistration(data: {
    teamName: string;
    registrationType: 'college' | 'open_category';
    gameId: string;
    collegeName?: string;
    teamCategory?: string;
    captainName: string;
    captainEmail: string;
    captainPhone: string;
    address?: string;
    city?: string;
    state?: string;
    pinCode?: string;
    teamMembers: { ign: string; gameId: string; fullName: string; studentIdUpload?: File | null; aadhaarUpload?: File | null }[];
    substitute?: { ign: string; gameId: string; fullName: string; studentIdUpload?: File | null; aadhaarUpload?: File | null };
    additionalMessage?: string;
    termsAccepted: boolean;
    studentIdUpload?: File | null;
    aadhaarUpload?: File | null;
    institutionDeclaration?: boolean;
    livestreamConsent?: boolean;
    coordinatorName?: string;
    coordinatorPhone?: string;
  }): Promise<{ success: boolean; data?: TeamRegistration; message?: string; error?: string }> {
    try {
      // Check registration limit before submitting
      const limitCheck = await this.checkTeamRegistrationLimit(data.registrationType);
      if (!limitCheck.allowed) {
        return {
          success: false,
          message: `Registration is full. We have reached the maximum limit of ${limitCheck.limit} teams for this tournament.`,
          error: 'REGISTRATION_LIMIT_REACHED'
        };
      }
      // Handle student ID uploads for each team member (college registrations)
      const teamMembersWithDocs = await Promise.all(
        data.teamMembers.map(async (member, index) => {
          if (data.registrationType === 'college' && member.studentIdUpload) {
            try {
              console.log(`Uploading Student ID for Player ${index + 1}...`);
              const studentIdData = await firebaseStorageService.uploadStudentIdDocument(
                member.studentIdUpload,
                `REG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_player${index + 1}`
              );
              console.log(`Student ID uploaded successfully for Player ${index + 1}:`, studentIdData);
              return { ...member, studentIdData } as any;
            } catch (error) {
              console.error(`Error uploading Student ID for Player ${index + 1}:`, error);
              return { 
                ...member, 
                studentIdData: {
                  url: '',
                  fileName: `REG_${Date.now()}_player${index + 1}_student_id.pdf`,
                  uploadedAt: new Date(),
                  error: 'Upload failed'
                }
              } as any;
            }
          }
          return member;
        })
      );

      // Handle Aadhaar uploads for each team member (MOBA open registrations)
      const teamMembersWithAadhaar = await Promise.all(
        teamMembersWithDocs.map(async (member, index) => {
          if (data.registrationType === 'open_category' && member.aadhaarUpload) {
            try {
              console.log(`Uploading Aadhaar for Player ${index + 1}...`);
              const aadhaarData = await firebaseStorageService.uploadStudentIdDocument(
                member.aadhaarUpload,
                `REG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_player${index + 1}`
              );
              console.log(`Aadhaar uploaded successfully for Player ${index + 1}:`, aadhaarData);
              return { ...member, aadhaarData } as any;
            } catch (error) {
              console.error(`Error uploading Aadhaar for Player ${index + 1}:`, error);
              return { 
                ...member, 
                aadhaarData: {
                  url: '',
                  fileName: `REG_${Date.now()}_player${index + 1}_aadhaar.pdf`,
                  uploadedAt: new Date(),
                  error: 'Upload failed'
                }
              } as any;
            }
          }
          return member;
        })
      );

      // Handle substitute document upload
      let substituteWithDoc = data.substitute;
      if (data.substitute) {
        if (data.registrationType === 'college' && data.substitute.studentIdUpload) {
          try {
            console.log('Uploading Student ID for Substitute...');
            const substituteStudentIdData = await firebaseStorageService.uploadStudentIdDocument(
              data.substitute.studentIdUpload,
              `REG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_substitute`
            );
            console.log('Substitute Student ID uploaded successfully:', substituteStudentIdData);
            substituteWithDoc = { ...data.substitute, studentIdData: substituteStudentIdData } as any;
          } catch (error) {
            console.error('Error uploading Substitute Student ID:', error);
            substituteWithDoc = { 
              ...data.substitute, 
              studentIdData: {
                url: '',
                fileName: `REG_${Date.now()}_substitute_student_id.pdf`,
                uploadedAt: new Date(),
                error: 'Upload failed'
              }
            } as any;
          }
        } else if (data.registrationType === 'open_category' && data.substitute.aadhaarUpload) {
          try {
            console.log('Uploading Aadhaar for Substitute...');
            const substituteAadhaarData = await firebaseStorageService.uploadStudentIdDocument(
              data.substitute.aadhaarUpload,
              `REG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}_substitute`
            );
            console.log('Substitute Aadhaar uploaded successfully:', substituteAadhaarData);
            substituteWithDoc = { ...data.substitute, aadhaarData: substituteAadhaarData } as any;
          } catch (error) {
            console.error('Error uploading Substitute Aadhaar:', error);
            substituteWithDoc = { 
              ...data.substitute, 
              aadhaarData: {
                url: '',
                fileName: `REG_${Date.now()}_substitute_aadhaar.pdf`,
                uploadedAt: new Date(),
                error: 'Upload failed'
              }
            } as any;
          }
        }
      }

      // Clean data to remove undefined fields and File objects (Firebase can't store Files)
      const registrationId = `REG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Strip File objects from team members (keep only the upload metadata)
      const cleanTeamMembers = teamMembersWithAadhaar.map((member: any) => {
        const { studentIdUpload, aadhaarUpload, ...cleanMember } = member;
        return cleanMember;
      });
      
      // Strip File objects from substitute
      const cleanSubstitute = substituteWithDoc ? (() => {
        const { studentIdUpload, aadhaarUpload, ...cleanSub } = substituteWithDoc as any;
        return cleanSub;
      })() : null;
      
      const cleanData = {
        ...data,
        teamMembers: cleanTeamMembers,
        substitute: cleanSubstitute,
        collegeName: data.collegeName || null,
        teamCategory: data.teamCategory || null,
        additionalMessage: data.additionalMessage || null,
        registrationId: registrationId,
        status: 'pending' as const,
        institutionDeclaration: data.institutionDeclaration || false,
        livestreamConsent: data.livestreamConsent || false,
        coordinatorName: data.coordinatorName || null,
        coordinatorPhone: data.coordinatorPhone || null,
        // Strip root-level File objects
        studentIdUpload: null,
        aadhaarUpload: null
      };
      
      const result = await this.firebaseService.createTeamRegistration(cleanData);
      
      // Send admin notification email
      try {
        await sendAdminNotificationEmail(cleanData, data.registrationType);
        console.log('Admin notification sent for team registration');
      } catch (emailError) {
        console.error('Failed to send admin notification for team registration:', emailError);
        // Don't fail registration if email fails
      }
      
      return {
        success: true,
        data: result,
        message: 'Team registration submitted successfully!',
      };
    } catch (error) {
      console.error('Team registration error:', error);
      return {
        success: false,
        message: 'Failed to submit team registration. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Sponsor Registration API
  async submitSponsorRegistration(data: {
    companyName: string;
    sponsorshipTierId: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
    address?: string;
    city?: string;
    state?: string;
    pinCode?: string;
    message?: string;
    registrationId?: string;
  }): Promise<{ success: boolean; data?: SponsorRegistration; message?: string; error?: string }> {
    try {
      // Clean the data to remove undefined fields and add required fields
      const cleanData = {
        ...data,
        message: data.message || null,
        registrationId: data.registrationId || `SPR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending' as const
      };
      
      const result = await this.firebaseService.createSponsorRegistration(cleanData);
      
      // Send admin notification email
      try {
        await sendAdminNotificationEmail(cleanData, 'sponsor');
        console.log('Admin notification sent for sponsor registration');
      } catch (emailError) {
        console.error('Failed to send admin notification for sponsor registration:', emailError);
        // Don't fail the registration if email fails
      }
      
      return {
        success: true,
        data: result,
        message: 'Sponsor registration submitted successfully!',
      };
    } catch (error) {
      console.error('Sponsor registration error:', error);
      return {
        success: false,
        message: 'Failed to submit sponsor registration. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Visitor Registration API
  async submitVisitorRegistration(data: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    state?: string;
    pinCode?: string;
    registrationId?: string;
    collegeName?: string;
    message?: string;
  }): Promise<{ success: boolean; data?: VisitorRegistration; message?: string; error?: string }> {
    try {
      // Add required fields
      const cleanData = {
        ...data,
        registrationId: data.registrationId || `VIS_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending' as const
      };
      const result = await this.firebaseService.createVisitorRegistration(cleanData);
      
      // Send admin notification email
      try {
        await sendAdminNotificationEmail(cleanData, 'visitor');
        console.log('Admin notification sent for visitor registration');
      } catch (emailError) {
        console.error('Failed to send admin notification for visitor registration:', emailError);
        // Don't fail the registration if email fails
      }
      
      return {
        success: true,
        data: result,
        message: 'Visitor registration submitted successfully!',
      };
    } catch (error) {
      console.error('Visitor registration error:', error);
      return {
        success: false,
        message: 'Failed to submit visitor registration. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Mini Tournament Registration API
  async submitMiniTournamentRegistration(data: {
    fullName: string;
    email: string;
    phone: string;
    gameName: string;
    passportPhoto?: File | null;
    inGameName?: string;
    gameId?: string;
    address?: string;
    city?: string;
    state?: string;
    pinCode?: string;
    registrationId?: string;
  }): Promise<{ success: boolean; data?: VisitorRegistration; message?: string; error?: string }> {
    try {
      // Check registration limit before submitting
      const limitCheck = await this.checkMiniTournamentLimit(data.gameName);
      if (!limitCheck.allowed) {
        return {
          success: false,
          message: `Registration is full for ${data.gameName}. We have reached the maximum limit of ${limitCheck.limit} participants for this tournament.`,
          error: 'REGISTRATION_LIMIT_REACHED'
        };
      }

      // Handle passport photo upload
      let passportPhotoData = null;
      if (data.passportPhoto) {
        try {
          console.log('Uploading passport photo to Firebase Storage...');
          passportPhotoData = await firebaseStorageService.uploadPassportPhoto(
            data.passportPhoto,
            data.registrationId || `MIN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          );
          console.log('Passport photo uploaded successfully:', passportPhotoData);
        } catch (error) {
          console.error('Error uploading passport photo:', error);
          // Store placeholder to indicate upload was attempted
          passportPhotoData = {
            url: '',
            fileName: `${data.registrationId || 'MIN'}_passport.jpg`,
            uploadedAt: new Date(),
            error: 'Upload failed - likely due to Firebase Storage rules'
          };
        }
      }

      // Add required fields
      const cleanData = {
        ...data,
        message: `Game: ${data.gameName}${data.inGameName ? `\nIGN: ${data.inGameName}` : ''}${data.gameId ? `\nGame ID: ${data.gameId}` : ''}`,
        registrationId: data.registrationId || `MIN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending' as const
      };
      const result = await this.firebaseService.createVisitorRegistration(cleanData);

      // Send admin notification email
      try {
        await sendAdminNotificationEmail(cleanData, 'mini-tournament');
        console.log('Admin notification sent for mini-tournament registration');
      } catch (emailError) {
        console.error('Failed to send admin notification for mini-tournament registration:', emailError);
      }

      return {
        success: true,
        data: result,
        message: 'Mini-tournament registration submitted successfully!',
      };
    } catch (error) {
      console.error('Mini-tournament registration error:', error);
      return {
        success: false,
        message: 'Failed to submit mini-tournament registration. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Media Person Registration API
  async submitMediaRegistration(data: {
    fullName: string;
    email: string;
    phone: string;
    organization?: string;
    role?: string;
    address?: string;
    city?: string;
    state?: string;
    pinCode?: string;
    registrationId?: string;
  }): Promise<{ success: boolean; data?: MediaPersonRegistration; message?: string; error?: string }> {
    try {
      // Add required fields
      const cleanData = {
        ...data,
        registrationId: `MED_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending' as const
      };
      const result = await this.firebaseService.createMediaRegistration(cleanData);
      
      // Send admin notification email
      try {
        await sendAdminNotificationEmail(cleanData, 'media');
        console.log('Admin notification sent for media registration');
      } catch (emailError) {
        console.error('Failed to send admin notification for media registration:', emailError);
        // Don't fail the registration if email fails
      }
      
      return {
        success: true,
        data: result,
        message: 'Media person registration submitted successfully!',
      };
    } catch (error) {
      console.error('Media registration error:', error);
      return {
        success: false,
        message: 'Failed to submit media registration. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Dashboard API
  async getDashboardStats() {
    try {
      const stats = await this.firebaseService.getDashboardStats();
      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return {
        success: false,
        message: 'Failed to fetch dashboard statistics',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Reference Data API
  async getGames() {
    try {
      const games = await this.firebaseService.getGames();
      return {
        success: true,
        data: games,
      };
    } catch (error) {
      console.error('Get games error:', error);
      return {
        success: false,
        message: 'Failed to fetch games',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getColleges() {
    try {
      const colleges = await this.firebaseService.getColleges();
      return {
        success: true,
        data: colleges,
      };
    } catch (error) {
      console.error('Get colleges error:', error);
      return {
        success: false,
        message: 'Failed to fetch colleges',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getSponsorshipTiers() {
    try {
      const tiers = await this.firebaseService.getSponsorshipTiers();
      return {
        success: true,
        data: tiers,
      };
    } catch (error) {
      console.error('Get sponsorship tiers error:', error);
      return {
        success: false,
        message: 'Failed to fetch sponsorship tiers',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Admin API methods
  async getAllTeamRegistrations() {
    try {
      const registrations = await this.firebaseService.getAllTeamRegistrations();
      return {
        success: true,
        data: registrations,
      };
    } catch (error) {
      console.error('Get all team registrations error:', error);
      return {
        success: false,
        message: 'Failed to fetch team registrations',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getAllSponsorRegistrations() {
    try {
      const registrations = await this.firebaseService.getAllSponsorRegistrations();
      return {
        success: true,
        data: registrations,
      };
    } catch (error) {
      console.error('Get all sponsor registrations error:', error);
      return {
        success: false,
        message: 'Failed to fetch sponsor registrations',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getAllVisitorRegistrations() {
    try {
      const registrations = await this.firebaseService.getAllVisitorRegistrations();
      return {
        success: true,
        data: registrations,
      };
    } catch (error) {
      console.error('Get all visitor registrations error:', error);
      return {
        success: false,
        message: 'Failed to fetch visitor registrations',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getAllMediaRegistrations() {
    try {
      const registrations = await this.firebaseService.getAllMediaRegistrations();
      return {
        success: true,
        data: registrations,
      };
    } catch (error) {
      console.error('Get all media registrations error:', error);
      return {
        success: false,
        message: 'Failed to fetch media registrations',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Status Update Methods
  async updateTeamRegistrationStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'withdrawn') {
    console.log('=== API updateTeamRegistrationStatus Called ===');
    console.log('ID:', id, 'Status:', status);
    
    try {
      console.log('Calling Firebase service...');
      await this.firebaseService.updateTeamRegistrationStatus(id, status);
      console.log('Firebase service call completed successfully');
      
      return {
        success: true,
        message: `Team registration ${status} successfully`,
      };
    } catch (error) {
      console.error('Update team registration status error:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      
      return {
        success: false,
        message: 'Failed to update team registration status',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async updateSponsorRegistrationStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'withdrawn') {
    try {
      await this.firebaseService.updateSponsorRegistrationStatus(id, status);
      return {
        success: true,
        message: `Sponsor registration ${status} successfully`,
      };
    } catch (error) {
      console.error('Update sponsor registration status error:', error);
      return {
        success: false,
        message: 'Failed to update sponsor registration status',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async updateVisitorRegistrationStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'withdrawn') {
    try {
      await this.firebaseService.updateVisitorRegistrationStatus(id, status);
      return {
        success: true,
        message: `Visitor registration ${status} successfully`,
      };
    } catch (error) {
      console.error('Update visitor registration status error:', error);
      return {
        success: false,
        message: 'Failed to update visitor registration status',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async updateMediaRegistrationStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'withdrawn') {
    try {
      await this.firebaseService.updateMediaRegistrationStatus(id, status);
      return {
        success: true,
        message: `Media registration ${status} successfully`,
      };
    } catch (error) {
      console.error('Update media registration status error:', error);
      return {
        success: false,
        message: 'Failed to update media registration status',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Permanent Delete Functions
  async deleteTeamRegistration(id: string) {
    try {
      await this.firebaseService.deleteTeamRegistration(id);
      return {
        success: true,
        message: 'Team registration permanently deleted',
      };
    } catch (error) {
      console.error('Delete team registration error:', error);
      return {
        success: false,
        message: 'Failed to delete team registration',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async deleteSponsorRegistration(id: string) {
    try {
      await this.firebaseService.deleteSponsorRegistration(id);
      return {
        success: true,
        message: 'Sponsor registration permanently deleted',
      };
    } catch (error) {
      console.error('Delete sponsor registration error:', error);
      return {
        success: false,
        message: 'Failed to delete sponsor registration',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async deleteVisitorRegistration(id: string) {
    try {
      await this.firebaseService.deleteVisitorRegistration(id);
      return {
        success: true,
        message: 'Visitor registration permanently deleted',
      };
    } catch (error) {
      console.error('Delete visitor registration error:', error);
      return {
        success: false,
        message: 'Failed to delete visitor registration',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async deleteMediaRegistration(id: string) {
    try {
      await this.firebaseService.deleteMediaRegistration(id);
      return {
        success: true,
        message: 'Media registration permanently deleted',
      };
    } catch (error) {
      console.error('Delete media registration error:', error);
      return {
        success: false,
        message: 'Failed to delete media registration',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
