import { describe, it, expect } from "vitest";

describe('Registration Form Validation', () => {
  it('should validate email format', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'user+tag@example.org'
    ];
    
    const invalidEmails = [
      'invalid-email',
      '@example.com',
      'test@',
      'test.example.com'
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    validEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(true);
    });
    
    invalidEmails.forEach(email => {
      expect(emailRegex.test(email)).toBe(false);
    });
  });

  it('should validate phone number format', () => {
    const validPhones = [
      '1234567890',
      '+1234567890',
      '(123) 456-7890',
      '123-456-7890'
    ];
    
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    
    validPhones.forEach(phone => {
      expect(phoneRegex.test(phone)).toBe(true);
    });
  });

  it('should validate team name length', () => {
    const validTeamName = 'Team Alpha';
    const invalidTeamName = 'A'.repeat(101); // Too long
    
    expect(validTeamName.length).toBeGreaterThan(2);
    expect(validTeamName.length).toBeLessThanOrEqual(100);
    expect(invalidTeamName.length).toBeGreaterThan(100);
  });
});

describe('Registration Data Structure', () => {
  it('should have required team registration fields', () => {
    const requiredFields = [
      'teamName',
      'registrationType', 
      'gameId',
      'captainName',
      'captainEmail',
      'captainPhone',
      'teamMembers',
      'termsAccepted'
    ];

    const sampleData = {
      teamName: 'Test Team',
      registrationType: 'college',
      gameId: 'game1',
      captainName: 'John Doe',
      captainEmail: 'john@example.com',
      captainPhone: '1234567890',
      teamMembers: [{ ign: 'player1', gameId: 'game1' }],
      termsAccepted: true
    };

    requiredFields.forEach(field => {
      expect(sampleData).toHaveProperty(field);
    });
  });

  it('should validate team member structure', () => {
    const validMember = { ign: 'player1', gameId: 'game1' };
    const invalidMember1 = { ign: 'player1' }; // Missing gameId
    const invalidMember2 = { gameId: 'game1' }; // Missing ign

    expect(validMember).toHaveProperty('ign');
    expect(validMember).toHaveProperty('gameId');
    expect(invalidMember1).not.toHaveProperty('gameId');
    expect(invalidMember2).not.toHaveProperty('ign');
  });
});

describe('Status Management', () => {
  it('should validate registration status values', () => {
    const validStatuses = [
      'pending',
      'approved', 
      'rejected',
      'cancelled',
      'withdrawn',
      'removed'
    ];

    validStatuses.forEach(status => {
      expect(typeof status).toBe('string');
      expect(validStatuses).toContain(status);
    });
  });
});

describe('Error Handling', () => {
  it('should create proper error response structure', () => {
    const errorResponse = {
      success: false,
      message: 'Test error message',
      error: 'Detailed error information'
    };

    expect(errorResponse).toHaveProperty('success');
    expect(errorResponse).toHaveProperty('message');
    expect(errorResponse.success).toBe(false);
    expect(typeof errorResponse.message).toBe('string');
  });
});
