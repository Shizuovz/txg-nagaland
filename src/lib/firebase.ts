// Firebase configuration and service
import { initializeApp, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User, 
  updateProfile 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs,
  doc,
  DocumentSnapshot,
  QuerySnapshot
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  StorageReference
} from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your_api_key_here",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "your_app_id_here",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "your_measurement_id_here"
};

// Initialize Firebase
let app: ReturnType<typeof initializeApp> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} catch (error: unknown) {
  // If app already exists, get the existing app
  const firebaseError = error as { code?: string };
  if (firebaseError.code === 'app/duplicate-app') {
    app = getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } else {
    console.error('Firebase initialization error:', error);
  }
}

// Types
export interface Game {
  id: string;
  name: string;
  teamSize: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface College {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SponsorshipTier {
  id: string;
  name: string;
  price: string;
  description: string;
  benefits: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamRegistration {
  id: string;
  registrationId: string;
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
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
  createdAt: Date;
  updatedAt: Date;
}

export interface SponsorRegistration {
  id: string;
  registrationId: string;
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
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
  createdAt: Date;
  updatedAt: Date;
}

export interface VisitorRegistration {
  id: string;
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  // Cosplayer specific fields
  collegeName?: string; // Used for Cosplay Group/Team Name
  message?: string; // Used for Cosplay Experience
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaPersonRegistration {
  id: string;
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  role?: string;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
  createdAt: Date;
  updatedAt: Date;
}

// Firebase Database Service
export class FirebaseService {
  private gamesCollection = collection(db, 'games');
  private collegesCollection = collection(db, 'colleges');
  private sponsorshipTiersCollection = collection(db, 'sponsorship_tiers');
  private teamRegistrationsCollection = collection(db, 'team_registrations');
  private sponsorRegistrationsCollection = collection(db, 'sponsor_registrations');
  private visitorRegistrationsCollection = collection(db, 'visitor_registrations');
  private mediaRegistrationsCollection = collection(db, 'media_registrations');

  constructor() {
    // Initialize with sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    console.log('Firebase initialized - ready for use');
  }

  // Reference Data
  async getGames(): Promise<Game[]> {
    const snapshot = await getDocs(this.gamesCollection);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      name: doc.data().name, 
      teamSize: doc.data().teamSize, 
      isActive: doc.data().isActive, 
      createdAt: doc.data().createdAt?.toDate() || new Date(), 
      updatedAt: doc.data().updatedAt?.toDate() || new Date() 
    }));
  }

  async getColleges(): Promise<College[]> {
    const snapshot = await getDocs(this.collegesCollection);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      name: doc.data().name, 
      isActive: doc.data().isActive, 
      createdAt: doc.data().createdAt?.toDate() || new Date(), 
      updatedAt: doc.data().updatedAt?.toDate() || new Date() 
    }));
  }

  async getSponsorshipTiers(): Promise<SponsorshipTier[]> {
    const snapshot = await getDocs(this.sponsorshipTiersCollection);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      name: doc.data().name, 
      price: doc.data().price, 
      description: doc.data().description, 
      benefits: doc.data().benefits || [], 
      isActive: doc.data().isActive, 
      createdAt: doc.data().createdAt?.toDate() || new Date(), 
      updatedAt: doc.data().updatedAt?.toDate() || new Date() 
    }));
  }

  // Team Registration
  async createTeamRegistration(data: Omit<TeamRegistration, 'id' | 'createdAt' | 'updatedAt'>): Promise<TeamRegistration> {
    const registration: TeamRegistration = {
      ...data,
      id: `team_${Date.now()}`,
      registrationId: `CLG${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Remove undefined fields to prevent Firebase errors
    const cleanData = {
      ...registration,
      substitute: registration.substitute || null,
      collegeName: registration.collegeName || null,
      teamCategory: registration.teamCategory || null,
      additionalMessage: registration.additionalMessage || null
    };
    
    await addDoc(this.teamRegistrationsCollection, cleanData);
    console.log('Team registration created:', registration);
    return registration;
  }

  async getTeamRegistration(id: string): Promise<TeamRegistration | null> {
    const docRef = doc(this.teamRegistrationsCollection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { 
      id: docSnap.id, 
      ...docSnap.data() as Omit<TeamRegistration, 'id' | 'createdAt' | 'updatedAt'>,
      createdAt: docSnap.data()?.createdAt?.toDate() || new Date(),
      updatedAt: docSnap.data()?.updatedAt?.toDate() || new Date()
    } : null;
  }

  async getAllTeamRegistrations(): Promise<TeamRegistration[]> {
    const snapshot = await getDocs(this.teamRegistrationsCollection);
    return snapshot.docs
      .map(doc => ({ 
        ...doc.data() as Omit<TeamRegistration, 'id' | 'createdAt' | 'updatedAt'>,
        id: doc.id, // Firebase document ID should override document data id
        createdAt: doc.data()?.createdAt?.toDate() || new Date(),
        updatedAt: doc.data()?.updatedAt?.toDate() || new Date()
      }))
      .reverse();
  }

  // Sponsor Registration
  async createSponsorRegistration(data: Omit<SponsorRegistration, 'id' | 'createdAt' | 'updatedAt'>): Promise<SponsorRegistration> {
    
    const registration: SponsorRegistration = {
      ...data,
      id: data.registrationId ? `sponsor_${data.registrationId}` : `sponsor_${Date.now()}`,
      registrationId: data.registrationId || `SPN${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('Created registration:', registration);
    console.log('Registration ID in created object:', registration.registrationId);
    
    // Remove undefined fields to prevent Firebase errors
    const cleanData = {
      ...registration,
      message: registration.message || null
    };
    
    await addDoc(this.sponsorRegistrationsCollection, cleanData);
    console.log('Sponsor registration created:', registration);
    return registration;
  }

  async getSponsorRegistration(id: string): Promise<SponsorRegistration | null> {
    const docRef = doc(this.sponsorRegistrationsCollection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { 
      id: docSnap.id, 
      ...docSnap.data() as Omit<SponsorRegistration, 'id' | 'createdAt' | 'updatedAt'>,
      createdAt: docSnap.data()?.createdAt?.toDate() || new Date(),
      updatedAt: docSnap.data()?.updatedAt?.toDate() || new Date()
    } : null;
  }

  async getAllSponsorRegistrations(): Promise<SponsorRegistration[]> {
    const snapshot = await getDocs(this.sponsorRegistrationsCollection);
    return snapshot.docs
      .map(doc => ({ 
        ...doc.data() as Omit<SponsorRegistration, 'id' | 'createdAt' | 'updatedAt'>,
        id: doc.id,
        createdAt: doc.data()?.createdAt?.toDate() || new Date(),
        updatedAt: doc.data()?.updatedAt?.toDate() || new Date()
      }))
      .reverse();
  }

  // Status Update Methods
  async updateTeamRegistrationStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'withdrawn'): Promise<void> {
    console.log('=== Firebase updateTeamRegistrationStatus Called ===');
    console.log('Document ID (should be Firebase doc ID):', id, 'New Status:', status);
    
    try {
      const docRef = doc(this.teamRegistrationsCollection, id);
      console.log('Document reference created:', docRef.path);
      
      // First check if document exists
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.error('Document does not exist!');
        throw new Error('Document does not exist');
      }
      
      console.log('Document exists, current data:', docSnap.data());
      
      await updateDoc(docRef, { 
        status, 
        updatedAt: new Date() 
      });
      
      console.log('Firebase update successful');
    } catch (error) {
      console.error('Firebase update error:', error);
      throw error;
    }
  }

  async updateSponsorRegistrationStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'withdrawn'): Promise<void> {
    const docRef = doc(this.sponsorRegistrationsCollection, id);
    await updateDoc(docRef, { 
      status, 
      updatedAt: new Date() 
    });
  }

  async updateVisitorRegistrationStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'withdrawn'): Promise<void> {
    const docRef = doc(this.visitorRegistrationsCollection, id);
    await updateDoc(docRef, { 
      status, 
      updatedAt: new Date() 
    });
  }
  async createVisitorRegistration(data: Omit<VisitorRegistration, 'id' | 'createdAt' | 'updatedAt'>): Promise<VisitorRegistration> {
    const registration: VisitorRegistration = {
      ...data,
      id: data.registrationId ? `visitor_${data.registrationId}` : `visitor_${Date.now()}`,
      registrationId: data.registrationId || `VST${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await addDoc(this.visitorRegistrationsCollection, registration);
    console.log('Visitor registration created:', registration);
    return registration;
  }

  async getVisitorRegistration(id: string): Promise<VisitorRegistration | null> {
    const docRef = doc(this.visitorRegistrationsCollection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { 
      id: docSnap.id, 
      ...docSnap.data() as Omit<VisitorRegistration, 'id' | 'createdAt' | 'updatedAt'>,
      createdAt: docSnap.data()?.createdAt?.toDate() || new Date(),
      updatedAt: docSnap.data()?.updatedAt?.toDate() || new Date()
    } : null;
  }

  async getAllVisitorRegistrations(): Promise<VisitorRegistration[]> {
    const snapshot = await getDocs(this.visitorRegistrationsCollection);
    return snapshot.docs
      .map(doc => ({ 
        ...doc.data() as Omit<VisitorRegistration, 'id' | 'createdAt' | 'updatedAt'>,
        id: doc.id,
        createdAt: doc.data()?.createdAt?.toDate() || new Date(),
        updatedAt: doc.data()?.updatedAt?.toDate() || new Date()
      }))
      .reverse();
  }

  // Media Person Registration
  async createMediaRegistration(data: Omit<MediaPersonRegistration, 'id' | 'createdAt' | 'updatedAt'>): Promise<MediaPersonRegistration> {
    const registration: MediaPersonRegistration = {
      ...data,
      id: `media_${Date.now()}`,
      registrationId: `MDA${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Clean the data to remove undefined fields
    const cleanData = {
      ...registration,
      organization: registration.organization || null,
      role: registration.role || null
    };
    
    await addDoc(this.mediaRegistrationsCollection, cleanData);
    console.log('Media person registration created:', registration);
    return registration;
  }

  async getMediaRegistration(id: string): Promise<MediaPersonRegistration | null> {
    const docRef = doc(this.mediaRegistrationsCollection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { 
      id: docSnap.id, 
      ...docSnap.data() as Omit<MediaPersonRegistration, 'id' | 'createdAt' | 'updatedAt'>,
      createdAt: docSnap.data()?.createdAt?.toDate() || new Date(),
      updatedAt: docSnap.data()?.updatedAt?.toDate() || new Date()
    } : null;
  }

  async getAllMediaRegistrations(): Promise<MediaPersonRegistration[]> {
    const snapshot = await getDocs(this.mediaRegistrationsCollection);
    return snapshot.docs
      .map(doc => ({ 
        ...doc.data() as Omit<MediaPersonRegistration, 'id' | 'createdAt' | 'updatedAt'>,
        id: doc.id,
        createdAt: doc.data()?.createdAt?.toDate() || new Date(),
        updatedAt: doc.data()?.updatedAt?.toDate() || new Date()
      }))
      .reverse();
  }

  async updateMediaRegistrationStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'withdrawn'): Promise<void> {
    const docRef = doc(this.mediaRegistrationsCollection, id);
    await updateDoc(docRef, { 
      status, 
      updatedAt: new Date() 
    });
  }

  // Registration Count Methods for Entry Limits
  async getTeamRegistrationCountByType(registrationType: 'college' | 'open_category'): Promise<number> {
    const q = query(
      this.teamRegistrationsCollection,
      where('registrationType', '==', registrationType)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.length;
  }

  async getMiniTournamentRegistrationCountByGame(gameName: string): Promise<number> {
    // Mini tournament registrations are stored in visitor registrations with game info in the message
    const q = query(
      this.visitorRegistrationsCollection,
      where('message', '>=', `Game: ${gameName}`),
      where('message', '<', `Game: ${gameName}\uf8ff`)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.filter(doc => {
      const message = doc.data().message || '';
      return message.includes(`Game: ${gameName}`);
    }).length;
  }

  async getAllMiniTournamentCounts(): Promise<{ [gameName: string]: number }> {
    const miniTournamentGames = [
      'Clash Royale', 'Street Fighter 6', 'Dragon Ball Fighter Z', 'FC 26',
      'Guilty Gear Strive', 'King Of Fighters XV', 'Mortal Kombat 1',
      'Ludo', 'NBA 2K26', 'Dirt Rally 2.0', 'Tekken 8', 'Tetris'
    ];

    const counts: { [gameName: string]: number } = {};
    
    for (const game of miniTournamentGames) {
      counts[game] = await this.getMiniTournamentRegistrationCountByGame(game);
    }
    
    return counts;
  }

  // Dashboard Stats
  async getDashboardStats() {
    const [teams, sponsors, visitors] = await Promise.all([
      getDocs(this.teamRegistrationsCollection),
      getDocs(this.sponsorRegistrationsCollection),
      getDocs(this.visitorRegistrationsCollection)
    ]);

    return {
      totalTeams: teams.docs.length,
      pendingTeams: teams.docs.filter(doc => doc.data().status === 'pending').length,
      approvedTeams: teams.docs.filter(doc => doc.data().status === 'approved').length,
      rejectedTeams: teams.docs.filter(doc => doc.data().status === 'rejected').length,
      totalSponsors: sponsors.docs.length,
      pendingSponsors: sponsors.docs.filter(doc => doc.data().status === 'pending').length,
      approvedSponsors: sponsors.docs.filter(doc => doc.data().status === 'approved').length,
      rejectedSponsors: sponsors.docs.filter(doc => doc.data().status === 'rejected').length,
      totalVisitors: visitors.docs.length,
      pendingVisitors: visitors.docs.filter(doc => doc.data().status === 'pending').length,
      approvedVisitors: visitors.docs.filter(doc => doc.data().status === 'approved').length,
      rejectedVisitors: visitors.docs.filter(doc => doc.data().status === 'rejected').length,
    };
  }

  // Permanent Delete Functions
  async deleteTeamRegistration(id: string): Promise<void> {
    const docRef = doc(this.teamRegistrationsCollection, id);
    await deleteDoc(docRef);
  }

  async deleteSponsorRegistration(id: string): Promise<void> {
    const docRef = doc(this.sponsorRegistrationsCollection, id);
    await deleteDoc(docRef);
  }

  async deleteVisitorRegistration(id: string): Promise<void> {
    const docRef = doc(this.visitorRegistrationsCollection, id);
    await deleteDoc(docRef);
  }

  async deleteMediaRegistration(id: string): Promise<void> {
    const docRef = doc(this.mediaRegistrationsCollection, id);
    await deleteDoc(docRef);
  }
}

export { app, db, auth, storage };

// Create and export a singleton instance
export const firebaseService = new FirebaseService();
