// Local database service - no external dependencies

export interface Game {
  id: number;
  name: string;
  teamSize: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface College {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SponsorshipTier {
  id: number;
  name: string;
  price: string;
  description: string;
  benefits: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamRegistration {
  id: number;
  registrationId: string;
  teamName: string;
  registrationType: 'college' | 'open_category';
  gameId: number;
  collegeName?: string;
  teamCategory?: string;
  captainName: string;
  captainEmail: string;
  captainPhone: string;
  teamMembers: { ign: string; gameId: string }[];
  substitute?: { ign: string; gameId: string };
  additionalMessage?: string;
  termsAccepted: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface SponsorRegistration {
  id: number;
  registrationId: string;
  companyName: string;
  sponsorshipTierId: number;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface VisitorRegistration {
  id: number;
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Local database service
export class DatabaseService {
  // Mock data
  private games: Game[] = [
    { id: 1, name: 'BGMI', teamSize: 4, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 2, name: 'Mobile Legends', teamSize: 5, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  ];

  private colleges: College[] = [
    { id: 1, name: 'Kohima College', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 2, name: 'Patkai Christian College', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 3, name: 'St. Joseph College', isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  ];

  private sponsorshipTiers: SponsorshipTier[] = [
    { 
      id: 1, 
      name: '🏆 TITLE SPONSOR', 
      price: '', 
      description: 'Top-tier sponsorship', 
      benefits: ['Naming rights', 'Premium branding'], 
      isActive: true, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    },
    { 
      id: 2, 
      name: '🥈 POWERED BY SPONSOR', 
      price: '', 
      description: 'Prominent branding', 
      benefits: ['Stage branding', 'Booth space'], 
      isActive: true, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    },
    { 
      id: 3, 
      name: '🥉 ASSOCIATE SPONSOR', 
      price: '', 
      description: 'Associate level sponsorship', 
      benefits: ['Event branding', 'Promotional materials'], 
      isActive: true, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    },
    { 
      id: 4, 
      name: '🎮 CATEGORY PARTNERS', 
      price: '', 
      description: 'Category specific partnership', 
      benefits: ['Category branding', 'Targeted promotion'], 
      isActive: true, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    }
  ];

  // In-memory storage
  private teamRegistrations: TeamRegistration[] = [];
  private sponsorRegistrations: SponsorRegistration[] = [];
  private visitorRegistrations: VisitorRegistration[] = [];

  // Reference Data
  async getGames(): Promise<Game[]> {
    console.log('Using local games data');
    return this.games;
  }

  async getColleges(): Promise<College[]> {
    console.log('Using local colleges data');
    return this.colleges;
  }

  async getSponsorshipTiers(): Promise<SponsorshipTier[]> {
    console.log('Using local sponsorship tiers data');
    return this.sponsorshipTiers;
  }

  // Team Registration
  async createTeamRegistration(data: Omit<TeamRegistration, 'id' | 'registrationId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<TeamRegistration> {
    const registration: TeamRegistration = {
      ...data,
      id: Date.now(),
      registrationId: `CLG${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.teamRegistrations.push(registration);
    console.log('Team registration created:', registration);
    return registration;
  }

  async getTeamRegistration(id: string): Promise<TeamRegistration | null> {
    return this.teamRegistrations.find(reg => reg.registrationId === id) || null;
  }

  async getAllTeamRegistrations(): Promise<TeamRegistration[]> {
    return [...this.teamRegistrations].reverse();
  }

  // Sponsor Registration
  async createSponsorRegistration(data: Omit<SponsorRegistration, 'id' | 'registrationId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<SponsorRegistration> {
    const registration: SponsorRegistration = {
      ...data,
      id: Date.now(),
      registrationId: `SPN${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.sponsorRegistrations.push(registration);
    console.log('Sponsor registration created:', registration);
    return registration;
  }

  async getSponsorRegistration(id: string): Promise<SponsorRegistration | null> {
    return this.sponsorRegistrations.find(reg => reg.registrationId === id) || null;
  }

  async getAllSponsorRegistrations(): Promise<SponsorRegistration[]> {
    return [...this.sponsorRegistrations].reverse();
  }

  // Visitor Registration
  async createVisitorRegistration(data: Omit<VisitorRegistration, 'id' | 'registrationId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<VisitorRegistration> {
    const registration: VisitorRegistration = {
      ...data,
      id: Date.now(),
      registrationId: `VST${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.visitorRegistrations.push(registration);
    console.log('Visitor registration created:', registration);
    return registration;
  }

  async getVisitorRegistration(id: string): Promise<VisitorRegistration | null> {
    return this.visitorRegistrations.find(reg => reg.registrationId === id) || null;
  }

  async getAllVisitorRegistrations(): Promise<VisitorRegistration[]> {
    return [...this.visitorRegistrations].reverse();
  }

  // Dashboard Stats
  async getDashboardStats() {
    return {
      totalTeams: this.teamRegistrations.length,
      pendingTeams: this.teamRegistrations.filter(t => t.status === 'pending').length,
      approvedTeams: this.teamRegistrations.filter(t => t.status === 'approved').length,
      rejectedTeams: this.teamRegistrations.filter(t => t.status === 'rejected').length,
      totalSponsors: this.sponsorRegistrations.length,
      pendingSponsors: this.sponsorRegistrations.filter(s => s.status === 'pending').length,
      approvedSponsors: this.sponsorRegistrations.filter(s => s.status === 'approved').length,
      rejectedSponsors: this.sponsorRegistrations.filter(s => s.status === 'rejected').length,
      totalVisitors: this.visitorRegistrations.length,
      pendingVisitors: this.visitorRegistrations.filter(v => v.status === 'pending').length,
      approvedVisitors: this.visitorRegistrations.filter(v => v.status === 'approved').length,
      rejectedVisitors: this.visitorRegistrations.filter(v => v.status === 'rejected').length,
    };
  }
}
