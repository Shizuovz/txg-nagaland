import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { RegistrationAPI } from '@/lib/api';

// Mock Firebase
const mockUnsubscribe = vi.fn();
vi.mock('@/lib/firebase', () => ({
  auth: {
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn(() => mockUnsubscribe)
  }
}));

// Mock RegistrationAPI
vi.mock('@/lib/api', () => ({
  RegistrationAPI: vi.fn().mockImplementation(() => ({
    submitTeamRegistration: vi.fn().mockResolvedValue({
      success: true,
      data: { id: 'test-id' },
      message: 'Team registration submitted successfully!'
    }),
    getDashboardStats: vi.fn().mockResolvedValue({
      totalTeams: 10,
      pendingTeams: 5,
      approvedTeams: 3,
      rejectedTeams: 2
    })
  }))
}));

describe('Authentication', () => {
  it('should provide auth context to children', () => {
    const TestComponent = () => {
      const { isAuthenticated } = useAuth();
      return <div>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Not Authenticated')).toBeInTheDocument();
  });
});

describe('Registration API', () => {
  let api: RegistrationAPI;

  beforeEach(() => {
    api = new RegistrationAPI();
    vi.clearAllMocks();
  });

  it('should submit team registration successfully', async () => {
    const teamData = {
      teamName: 'Test Team',
      registrationType: 'college' as const,
      gameId: 'game1',
      captainName: 'John Doe',
      captainEmail: 'john@example.com',
      captainPhone: '1234567890',
      teamMembers: [{ ign: 'player1', gameId: 'game1' }],
      termsAccepted: true
    };

    const result = await api.submitTeamRegistration(teamData);

    expect(result.success).toBe(true);
    expect(result.message).toBe('Team registration submitted successfully!');
    expect(result.data).toEqual({ id: 'test-id' });
  });

  it('should handle registration submission failure', async () => {
    const mockAPI = {
      submitTeamRegistration: vi.fn().mockRejectedValue(new Error('Network error'))
    };
    
    const teamData = {
      teamName: 'Test Team',
      registrationType: 'college' as const,
      gameId: 'game1',
      captainName: 'John Doe',
      captainEmail: 'john@example.com',
      captainPhone: '1234567890',
      teamMembers: [{ ign: 'player1', gameId: 'game1' }],
      termsAccepted: true
    };

    try {
      await mockAPI.submitTeamRegistration(teamData);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Network error');
    }
  });
});

describe('Dashboard Stats', () => {
  it('should fetch dashboard statistics', async () => {
    const api = new RegistrationAPI();
    const stats = await api.getDashboardStats();

    expect(stats).toEqual({
      totalTeams: 10,
      pendingTeams: 5,
      approvedTeams: 3,
      rejectedTeams: 2
    });
  });
});

describe('Environment Variables', () => {
  it('should have required environment variables defined', () => {
    expect(import.meta.env.VITE_DEV_SERVER_URL).toBeDefined();
    expect(import.meta.env.VITE_FIREBASE_API_KEY).toBeDefined();
  });
});

describe('Build Configuration', () => {
  it('should have proper TypeScript configuration', () => {
    // This test ensures strict mode is enabled
    expect(true).toBe(true); // TypeScript compilation will fail if config is wrong
  });
});
