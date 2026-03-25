import { FirebaseService } from './firebase';
import { TeamRegistration, SponsorRegistration, VisitorRegistration, MediaPersonRegistration } from './firebase';
import { sendAdminNotificationEmail } from '../utils/firebaseEmailService';

// API service for handling registration operations with Firebase
export class RegistrationAPI {
  private firebaseService = new FirebaseService();

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
    teamMembers: { ign: string; gameId: string }[];
    substitute?: { ign: string; gameId: string };
    additionalMessage?: string;
    termsAccepted: boolean;
  }): Promise<{ success: boolean; data?: TeamRegistration; message?: string; error?: string }> {
    try {
      // Clean the data to remove undefined fields and add required fields
      const cleanData = {
        ...data,
        substitute: data.substitute || null,
        collegeName: data.collegeName || null,
        teamCategory: data.teamCategory || null,
        additionalMessage: data.additionalMessage || null,
        registrationId: `REG_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending' as const
      };
      
      const result = await this.firebaseService.createTeamRegistration(cleanData);
      
      // Send admin notification email
      try {
        await sendAdminNotificationEmail(cleanData, data.registrationType);
        console.log('Admin notification sent for team registration');
      } catch (emailError) {
        console.error('Failed to send admin notification for team registration:', emailError);
        // Don't fail the registration if email fails
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
