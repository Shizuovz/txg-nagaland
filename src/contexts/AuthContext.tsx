import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { validateAdminCredentials } from '@/config/adminCredentials';
import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  User as FirebaseUser, 
  updateProfile 
} from 'firebase/auth';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      console.log('Auth state changed:', firebaseUser?.email || 'No user');
      
      if (firebaseUser) {
        // Firebase user is signed in
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
          role: validateAdminCredentials(firebaseUser.email || '', '') ? 'admin' : 'user'
        };
        
        console.log('Setting user data:', userData);
        setUser(userData);
      } else {
        // Check for admin session (admins don't use Firebase auth)
        const isAdminSession = localStorage.getItem('adminSession') === 'true';
        const adminEmail = localStorage.getItem('adminEmail');
        const adminName = localStorage.getItem('adminName');
        
        if (isAdminSession && adminEmail && adminName) {
          const adminUser = validateAdminCredentials(adminEmail, '');
          if (adminUser) {
            const userData: User = {
              id: `admin_${Date.now()}`,
              email: adminEmail,
              name: adminName,
              role: 'admin'
            };
            setUser(userData);
          } else {
            // Invalid admin session, clear it
            localStorage.removeItem('adminSession');
            localStorage.removeItem('adminEmail');
            localStorage.removeItem('adminName');
            setUser(null);
          }
        } else {
          // No Firebase user and no valid admin session
          setUser(null);
        }
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Check admin credentials first (admins don't use Firebase auth)
      const adminUser = validateAdminCredentials(email, password);
      
      if (adminUser) {
        // Admin login - bypass Firebase and use localStorage
        const userData: User = {
          id: `admin_${Date.now()}`,
          email: adminUser.email,
          name: adminUser.name,
          role: 'admin'
        };
        
        setUser(userData);
        localStorage.setItem('adminSession', 'true');
        localStorage.setItem('adminEmail', adminUser.email);
        localStorage.setItem('adminName', adminUser.name);
        return;
      }

      // For regular users, use Firebase Authentication
      // This will only succeed if the user has previously signed up
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Firebase auth state change will handle setting the user
      console.log('Login successful:', userCredential.user.email);
    } catch (error: unknown) {
      console.error('Login error:', error);
      
      // Handle specific Firebase auth errors
      const firebaseError = error as { code?: string; message?: string };
      if (firebaseError.code === 'auth/user-not-found') {
        throw new Error('No account found with this email. Please sign up first.');
      } else if (firebaseError.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      } else if (firebaseError.code === 'auth/invalid-email') {
        throw new Error('Invalid email address.');
      } else if (firebaseError.code === 'auth/user-disabled') {
        throw new Error('This account has been disabled. Please contact support.');
      } else if (firebaseError.code === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please try again later.');
      } else {
        throw new Error(firebaseError.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      // Create user account with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      if (name && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
      
      // User will be set by the auth state change listener
    } catch (error: unknown) {
      console.error('Signup error:', error);
      
      // Handle specific Firebase auth errors
      const firebaseError = error as { code?: string; message?: string };
      if (firebaseError.code === 'auth/email-already-in-use') {
        throw new Error('An account with this email already exists. Please try logging in instead.');
      } else if (firebaseError.code === 'auth/invalid-email') {
        throw new Error('Invalid email address.');
      } else if (firebaseError.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please choose a stronger password.');
      } else if (firebaseError.code === 'auth/operation-not-allowed') {
        throw new Error('Account creation is currently disabled. Please contact support.');
      } else {
        throw new Error(firebaseError.message || 'Signup failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Sign out from Firebase
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Firebase sign out error:', error);
    }
    
    // Clear local state and storage
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    signup,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
