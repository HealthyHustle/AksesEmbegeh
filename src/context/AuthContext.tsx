import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { AuthService, StoredUserAccount } from '../services/authService';

export interface AuthResponse {
  success: boolean;
  message: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoadingSession: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword?: string,
    institution?: string,
    role?: string
  ) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateProfile: (updatedData: Partial<User>) => Promise<void>;
  isAuthModalOpen: boolean;
  authModalReason: string;
  authRedirectPath: string;
  openAuthModal: (reason?: string, redirectPath?: string) => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState(
    'Silakan masuk ke akun Anda untuk melanjutkan aktivitas pembelajaran.'
  );
  const [authRedirectPath, setAuthRedirectPath] = useState('/');

  // Pulihkan sesi pengguna saat aplikasi dimuat atau halaman di-refresh
  useEffect(() => {
    let isMounted = true;
    const restoreSession = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (isMounted && currentUser) {
          setUser(currentUser);
        }
      } catch (err) {
        console.error('Gagal memulihkan sesi pengguna:', err);
      } finally {
        if (isMounted) {
          setIsLoadingSession(false);
        }
      }
    };

    restoreSession();
    return () => {
      isMounted = false;
    };
  }, []);

  const openAuthModal = (reason?: string, redirectPath?: string) => {
    if (reason) setAuthModalReason(reason);
    if (redirectPath) setAuthRedirectPath(redirectPath);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  /**
   * Login autentikasi nyata berbasis validasi email & hash kata sandi
   */
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      return {
        success: false,
        message: 'Email dan kata sandi wajib diisi.'
      };
    }

    try {
      const account = await AuthService.getUserByEmail(cleanEmail);

      if (!account) {
        return {
          success: false,
          message: 'Akun belum terdaftar. Silakan daftar akun baru terlebih dahulu.'
        };
      }

      // Validasi hash kata sandi menggunakan salt unik milik akun
      const calculatedHash = await AuthService.hashPassword(password, account.salt);

      if (calculatedHash !== account.passwordHash) {
        return {
          success: false,
          message: 'Kata sandi tidak sesuai. Silakan periksa kembali.'
        };
      }

      // Buat dan simpan sesi aktif
      await AuthService.createSession(account);

      const cleanAvatar = (account.avatar && !account.avatar.includes('unsplash.com')) ? account.avatar : '';
      const publicUser: User = {
        id: account.id,
        name: account.name,
        email: account.email,
        role: account.role,
        avatar: cleanAvatar,
        institution: account.institution,
        bio: account.bio,
        joinedAt: account.joinedAt
      };

      setUser(publicUser);
      setIsAuthModalOpen(false);

      return {
        success: true,
        message: `Selamat datang kembali, ${account.name}!`
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Terjadi kendala saat memproses login. Silakan coba lagi.'
      };
    }
  };

  /**
   * Pendaftaran akun baru dengan validasi data dan penyimpanan hash aman
   */
  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword?: string,
    institution = '',
    role = 'Calon Guru'
  ): Promise<AuthResponse> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || !cleanEmail || !password) {
      return {
        success: false,
        message: 'Nama lengkap, email, dan kata sandi wajib diisi.'
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return {
        success: false,
        message: 'Format alamat email tidak valid.'
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: 'Kata sandi minimal 6 karakter.'
      };
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return {
        success: false,
        message: 'Konfirmasi kata sandi tidak cocok.'
      };
    }

    try {
      // Periksa apakah email sudah pernah didaftarkan
      const existingAccount = await AuthService.getUserByEmail(cleanEmail);
      if (existingAccount) {
        return {
          success: false,
          message: 'Alamat email ini sudah terdaftar. Silakan masuk menggunakan akun Anda.'
        };
      }

      // Buat salt dan hash kata sandi aman
      const salt = AuthService.generateSalt();
      const passwordHash = await AuthService.hashPassword(password, salt);

      const newAccount: StoredUserAccount = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: cleanName,
        email: cleanEmail,
        role: role || 'Calon Guru',
        avatar: '',
        institution: institution.trim() || 'Lembaga Pendidikan',
        bio: 'Calon pendidik yang berkomitmen mengembangkan nalar kritis di ruang kelas.',
        joinedAt: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
        salt,
        passwordHash,
        createdAt: Date.now()
      };

      await AuthService.saveUser(newAccount);
      await AuthService.createSession(newAccount);

      const publicUser: User = {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        role: newAccount.role,
        avatar: '',
        institution: newAccount.institution,
        bio: newAccount.bio,
        joinedAt: newAccount.joinedAt
      };

      setUser(publicUser);
      setIsAuthModalOpen(false);

      return {
        success: true,
        message: `Pendaftaran berhasil. Selamat datang di Mind Bridge Global, ${cleanName}!`
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Terjadi kendala saat mendaftarkan akun. Silakan coba lagi.'
      };
    }
  };

  /**
   * Logout mengakhiri sesi secara tuntas
   */
  const logout = async () => {
    try {
      await AuthService.terminateSession();
    } finally {
      setUser(null);
    }
  };

  /**
   * Perbarui data profil pengguna
   */
  const updateProfile = async (updatedData: Partial<User>) => {
    if (!user) return;
    try {
      await AuthService.updateUserProfile(user.email, updatedData);
      setUser(prev => prev ? { ...prev, ...updatedData } : null);
    } catch (err) {
      console.error('Gagal memperbarui profil:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoadingSession,
        login,
        register,
        logout,
        updateProfile,
        isAuthModalOpen,
        authModalReason,
        authRedirectPath,
        openAuthModal,
        closeAuthModal
      }}
    >
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
