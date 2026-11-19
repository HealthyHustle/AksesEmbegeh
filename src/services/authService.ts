import { User } from '../types';

/**
 * PRODUCTION AUTHENTICATION & SECURE STORAGE SERVICE
 * Mind Bridge Global
 * 
 * Menggunakan IndexedDB (standar database transaksional browser)
 * dan Web Cryptography API (SubtleCrypto) untuk hashing kata sandi dengan salt unik.
 * Tidak menyimpan kata sandi dalam bentuk teks polos atau mengandalkan localStorage semata.
 */

const DB_NAME = 'MindBridgeGlobal_AuthDB';
const DB_VERSION = 1;
const USERS_STORE = 'users';
const SESSIONS_STORE = 'sessions';
const SESSION_KEY = 'mbg_active_session_token';

export interface StoredUserAccount {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  institution?: string;
  bio?: string;
  joinedAt: string;
  salt: string;
  passwordHash: string;
  createdAt: number;
}

export interface UserSession {
  token: string;
  userId: string;
  email: string;
  createdAt: number;
  lastActive: number;
}

export class AuthService {
  private static dbPromise: Promise<IDBDatabase> | null = null;

  /**
   * Inisialisasi basis data IndexedDB untuk autentikasi
   */
  private static getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB tidak didukung pada browser ini.'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(USERS_STORE)) {
          const userStore = db.createObjectStore(USERS_STORE, { keyPath: 'email' });
          userStore.createIndex('id', 'id', { unique: true });
        }

        if (!db.objectStoreNames.contains(SESSIONS_STORE)) {
          const sessionStore = db.createObjectStore(SESSIONS_STORE, { keyPath: 'token' });
          sessionStore.createIndex('userId', 'userId', { unique: false });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return this.dbPromise;
  }

  /**
   * Membuat salt acak kriptografis (16 byte hex)
   */
  public static generateSalt(): string {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  /**
   * Hash kata sandi menggunakan Web Cryptography API (SHA-256 + Salt)
   */
  public static async hashPassword(password: string, salt: string): Promise<string> {
    const rawData = `${salt}:${password}:mbg_auth_salt_v1`;
    try {
      if (typeof window !== 'undefined' && window.crypto?.subtle) {
        const encoder = new TextEncoder();
        const data = encoder.encode(rawData);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch {
      // Fallback hash jika WebCrypto subtle tidak tersedia
    }

    let hash = 0;
    for (let i = 0; i < rawData.length; i++) {
      hash = (hash << 5) - hash + rawData.charCodeAt(i);
      hash |= 0;
    }
    return 'h_' + Math.abs(hash).toString(16);
  }

  /**
   * Ambil akun pengguna berdasarkan email dari IndexedDB
   */
  public static async getUserByEmail(email: string): Promise<StoredUserAccount | null> {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(USERS_STORE, 'readonly');
        const store = tx.objectStore(USERS_STORE);
        const request = store.get(cleanEmail);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch {
      // Fallback sinkronisasi dari storage backup jika IndexedDB terkendala
      const backup = localStorage.getItem('mbg_secure_users_vault');
      if (backup) {
        try {
          const list: StoredUserAccount[] = JSON.parse(backup);
          return list.find(u => u.email === cleanEmail) || null;
        } catch {
          return null;
        }
      }
      return null;
    }
  }

  /**
   * Simpan akun pengguna baru ke IndexedDB
   */
  public static async saveUser(account: StoredUserAccount): Promise<void> {
    try {
      const db = await this.getDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(USERS_STORE, 'readwrite');
        const store = tx.objectStore(USERS_STORE);
        const request = store.put(account);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch {
      // Fallback
    }

    // Backup terenkripsi (salt + hash) di vault lokal untuk redundansi
    try {
      const backup = localStorage.getItem('mbg_secure_users_vault');
      const list: StoredUserAccount[] = backup ? JSON.parse(backup) : [];
      const filtered = list.filter(u => u.email !== account.email);
      filtered.push(account);
      localStorage.setItem('mbg_secure_users_vault', JSON.stringify(filtered));
    } catch {}
  }

  /**
   * Buat dan simpan sesi pengguna yang aktif
   */
  public static async createSession(user: StoredUserAccount): Promise<string> {
    const token = `mbg_auth_${Date.now()}_${this.generateSalt().substring(0, 12)}`;
    const session: UserSession = {
      token,
      userId: user.id,
      email: user.email,
      createdAt: Date.now(),
      lastActive: Date.now()
    };

    try {
      const db = await this.getDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(SESSIONS_STORE, 'readwrite');
        const store = tx.objectStore(SESSIONS_STORE);
        const request = store.put(session);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch {}

    // Simpan token sesi aktif di sessionStorage dan localStorage untuk redundansi refresh
    sessionStorage.setItem(SESSION_KEY, token);
    localStorage.setItem(SESSION_KEY, token);

    // Simpan data profil publik user (tanpa hash dan salt)
    const cleanAvatar = (user.avatar && !user.avatar.includes('unsplash.com')) ? user.avatar : '';
    const publicUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: cleanAvatar,
      institution: user.institution,
      bio: user.bio,
      joinedAt: user.joinedAt
    };
    sessionStorage.setItem('mbg_current_user', JSON.stringify(publicUser));
    localStorage.setItem('mbg_current_user', JSON.stringify(publicUser));

    return token;
  }

  /**
   * Ambil sesi dan profil pengguna aktif saat ini (saat refresh halaman)
   */
  public static async getCurrentUser(): Promise<User | null> {
    const token = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!token) return null;

    // Ambil profil cepat dari memory/session
    const cachedUser = sessionStorage.getItem('mbg_current_user') || localStorage.getItem('mbg_current_user');
    if (cachedUser) {
      try {
        const parsed = JSON.parse(cachedUser);
        if (parsed.avatar && parsed.avatar.includes('unsplash.com')) {
          parsed.avatar = '';
          sessionStorage.setItem('mbg_current_user', JSON.stringify(parsed));
          localStorage.setItem('mbg_current_user', JSON.stringify(parsed));
        }
        return parsed;
      } catch {}
    }

    try {
      const db = await this.getDB();
      const session = await new Promise<UserSession | null>((resolve, reject) => {
        const tx = db.transaction(SESSIONS_STORE, 'readonly');
        const store = tx.objectStore(SESSIONS_STORE);
        const request = store.get(token);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });

      if (!session) return null;

      const userAccount = await this.getUserByEmail(session.email);
      if (!userAccount) return null;

      const cleanUserAvatar = (userAccount.avatar && !userAccount.avatar.includes('unsplash.com')) ? userAccount.avatar : '';
      const publicUser: User = {
        id: userAccount.id,
        name: userAccount.name,
        email: userAccount.email,
        role: userAccount.role,
        avatar: cleanUserAvatar,
        institution: userAccount.institution,
        bio: userAccount.bio,
        joinedAt: userAccount.joinedAt
      };
      return publicUser;
    } catch {
      return null;
    }
  }

  /**
   * Akhiri sesi pengguna secara tuntas (Logout)
   */
  public static async terminateSession(): Promise<void> {
    const token = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (token) {
      try {
        const db = await this.getDB();
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(SESSIONS_STORE, 'readwrite');
          const store = tx.objectStore(SESSIONS_STORE);
          const request = store.delete(token);

          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      } catch {}
    }

    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('mbg_current_user');
    localStorage.removeItem('mbg_current_user');
    localStorage.removeItem('mbg_user');
    localStorage.removeItem('mbg_auth_session');
  }

  /**
   * Perbarui data profil pengguna di IndexedDB
   */
  public static async updateUserProfile(email: string, updated: Partial<User>): Promise<void> {
    const account = await this.getUserByEmail(email);
    if (!account) return;

    const merged: StoredUserAccount = {
      ...account,
      name: updated.name ?? account.name,
      institution: updated.institution ?? account.institution,
      bio: updated.bio ?? account.bio,
      avatar: updated.avatar !== undefined ? updated.avatar : (account.avatar || ''),
      role: updated.role ?? account.role
    };

    await this.saveUser(merged);

    const publicUser: User = {
      id: merged.id,
      name: merged.name,
      email: merged.email,
      role: merged.role,
      avatar: merged.avatar || '',
      institution: merged.institution,
      bio: merged.bio,
      joinedAt: merged.joinedAt
    };
    sessionStorage.setItem('mbg_current_user', JSON.stringify(publicUser));
    localStorage.setItem('mbg_current_user', JSON.stringify(publicUser));
  }
}
