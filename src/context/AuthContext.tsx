import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { StorageService, DEFAULT_USER } from '../services/storageService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email?: string, password?: string) => boolean;
  register: (name: string, email: string, password?: string, institution?: string, role?: string) => boolean;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = StorageService.getUser();
    return saved || DEFAULT_USER; // Start with default logged-in demo user "Faisal"
  });

  useEffect(() => {
    StorageService.setUser(user);
  }, [user]);

  const login = (email?: string, _password?: string): boolean => {
    const newUser: User = {
      ...DEFAULT_USER,
      name: email ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) : 'Faisal',
      email: email || 'faisal.edukasi@gmail.com',
    };
    setUser(newUser);
    return true;
  };

  const register = (name: string, email: string, _password?: string, institution?: string, role?: string): boolean => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name || 'Pendidik Muda',
      email: email,
      role: role || 'Mahasiswa Pendidikan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      institution: institution || 'Universitas Indonesia',
      bio: 'Pemerhati pendidikan inklusif dan penalaran kritis.',
      joinedAt: 'Hari ini'
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    StorageService.setUser(null);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
