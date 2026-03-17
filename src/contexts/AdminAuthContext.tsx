import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { validateAdminCredentials } from '@/config/adminCredentials';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session on mount
    const checkAdminAuth = () => {
      const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
      const adminEmail = localStorage.getItem('adminEmail');
      const adminName = localStorage.getItem('adminName');
      
      if (isAuthenticated && adminEmail && adminName) {
        setAdminUser({
          id: 'admin_1',
          email: adminEmail,
          name: adminName,
          role: 'admin'
        });
      }
      setIsLoading(false);
    };

    checkAdminAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate admin credentials
      const adminCredentials = validateAdminCredentials(email, password);
      
      if (!adminCredentials) {
        throw new Error('Invalid admin credentials');
      }
      
      // Admin login successful
      const userData: AdminUser = {
        id: `admin_${Date.now()}`,
        email: adminCredentials.email,
        name: adminCredentials.name,
        role: 'admin'
      };
      
      setAdminUser(userData);
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('adminEmail', adminCredentials.email);
      localStorage.setItem('adminName', adminCredentials.name);
    } catch (error) {
      throw new Error('Admin login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
  };

  const value: AdminAuthContextType = {
    adminUser,
    isAuthenticated: !!adminUser,
    login,
    logout,
    isLoading,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
