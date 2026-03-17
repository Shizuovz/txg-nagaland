import { useState } from 'react';
import { toast } from 'sonner';
import { RegistrationAPI } from '@/lib/api';
import { TeamRegistration, SponsorRegistration, VisitorRegistration } from '@/lib/firebase';

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface TeamRegistrationData {
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
}

export interface SponsorRegistrationData {
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
}

export interface VisitorRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

export interface MediaPersonRegistrationData {
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  role?: string;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

// Create a single instance of the API
const registrationAPI = new RegistrationAPI();

export const useRegistrationAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAPIResponse = <T>(response: APIResponse<T>, successMessage?: string): T | null => {
    if (response.success && response.data) {
      if (successMessage) {
        toast.success(successMessage);
      }
      return response.data;
    } else {
      const errorMessage = response.error || response.message || 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    }
  };

  // Team Registration
  const submitTeamRegistration = async (data: TeamRegistrationData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.submitTeamRegistration(data);
      return handleAPIResponse(response, 'Team registration submitted successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit team registration';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Sponsor Registration
  const submitSponsorRegistration = async (data: SponsorRegistrationData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.submitSponsorRegistration(data);
      return handleAPIResponse(response, 'Sponsor registration submitted successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit sponsor registration';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Visitor Registration
  const submitVisitorRegistration = async (data: VisitorRegistrationData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.submitVisitorRegistration(data);
      return handleAPIResponse(response, 'Visitor registration submitted successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit visitor registration';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Media Person Registration
  const submitMediaRegistration = async (data: MediaPersonRegistrationData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.submitMediaRegistration(data);
      return handleAPIResponse(response, 'Media person registration submitted successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit media registration';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Reference Data
  const getGames = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.getGames();
      return handleAPIResponse(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch games';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getColleges = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.getColleges();
      return handleAPIResponse(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch colleges';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSponsorshipTiers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.getSponsorshipTiers();
      return handleAPIResponse(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sponsorship tiers';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Dashboard Stats
  const getDashboardStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.getDashboardStats();
      return handleAPIResponse(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard statistics';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Admin methods
  const getAllTeamRegistrations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.getAllTeamRegistrations();
      return handleAPIResponse(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch team registrations';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAllSponsorRegistrations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.getAllSponsorRegistrations();
      return handleAPIResponse(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sponsor registrations';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAllVisitorRegistrations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.getAllVisitorRegistrations();
      return handleAPIResponse(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch visitor registrations';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Status Update Methods
  const updateTeamStatus = async (id: string, status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'withdrawn' | 'removed') => {
    console.log('=== updateTeamStatus Called ===');
    console.log('Team ID:', id, 'Status:', status);
    
    setLoading(true);
    setError(null);

    try {
      console.log('Calling registrationAPI.updateTeamRegistrationStatus...');
      const result = await registrationAPI.updateTeamRegistrationStatus(id, status);
      console.log('API Result:', result);
      
      if (result.success) {
        toast.success(`Team registration ${status} successfully`);
        return true;
      } else {
        const errorMessage = result.message || 'Failed to update team status';
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    } catch (error: any) {
      console.error('Error in updateTeamStatus:', error);
      const errorMessage = error.message || 'Failed to update team status';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateSponsorStatus = async (id: string, status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'withdrawn' | 'removed') => {
    setLoading(true);
    setError(null);

    try {
      await registrationAPI.updateSponsorRegistrationStatus(id, status);
      toast.success(`Sponsor registration ${status} successfully`);
      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update sponsor status';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateVisitorStatus = async (id: string, status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'withdrawn' | 'removed') => {
    setLoading(true);
    setError(null);

    try {
      await registrationAPI.updateVisitorRegistrationStatus(id, status);
      toast.success(`Visitor registration ${status} successfully`);
      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update visitor status';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateMediaStatus = async (id: string, status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'withdrawn' | 'removed') => {
    setLoading(true);
    setError(null);

    try {
      await registrationAPI.updateMediaRegistrationStatus(id, status);
      toast.success(`Media registration ${status} successfully`);
      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update media status';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Admin registration fetching methods
  const getAllMediaRegistrations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await registrationAPI.getAllMediaRegistrations();
      return handleAPIResponse(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch media registrations';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };
    return {
    loading,
    error,
    submitTeamRegistration,
    submitSponsorRegistration,
    submitVisitorRegistration,
    submitMediaRegistration,
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
  };
};
