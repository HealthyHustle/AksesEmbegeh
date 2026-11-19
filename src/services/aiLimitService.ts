import { AIQuotaStatus } from '../types';

/**
 * System limit configuration for Critical Mind AI
 * STRICT VALIDATOR REQUIREMENT:
 * - Pengguna tanpa login: TEPAT 1 (SATU) KALI kesempatan gratis mencoba AI.
 * - Pengguna terautentikasi: kuota harian terkelola (default 25 pertanyaan).
 */
export const AI_LIMIT_CONFIG = {
  // Anonymous guest users: EXACTLY 1 AI thinking request
  ANONYMOUS_MAX_REQUESTS: 1,
  // Authenticated pre-service teachers
  AUTHENTICATED_MAX_REQUESTS: 25,
};

const STORAGE_KEYS = {
  ANON_COUNT: 'mbg_anon_ai_used_count',
  USER_COUNT_PREFIX: 'mbg_user_ai_used_count_',
};

type QuotaListener = (status: AIQuotaStatus) => void;

export class AILimitService {
  private static listeners: Set<QuotaListener> = new Set();

  /**
   * Retrieves current quota status without modifying count
   * Guarantees that component re-renders do NOT increment count
   */
  public static getStatus(isAuthenticated: boolean, userId?: string): AIQuotaStatus {
    if (!isAuthenticated) {
      // Check both localStorage and sessionStorage for robust client tracking
      const localVal = localStorage.getItem(STORAGE_KEYS.ANON_COUNT);
      const sessionVal = sessionStorage.getItem(STORAGE_KEYS.ANON_COUNT);
      const raw = localVal || sessionVal;
      const used = raw ? Math.max(0, parseInt(raw, 10) || 0) : 0;
      const max = AI_LIMIT_CONFIG.ANONYMOUS_MAX_REQUESTS;
      const remaining = Math.max(0, max - used);
      return {
        used,
        max,
        remaining,
        isExhausted: remaining <= 0,
        isAnonymous: true,
      };
    }

    const key = `${STORAGE_KEYS.USER_COUNT_PREFIX}${userId || 'default'}`;
    const raw = localStorage.getItem(key);
    const used = raw ? Math.max(0, parseInt(raw, 10) || 0) : 0;
    const max = AI_LIMIT_CONFIG.AUTHENTICATED_MAX_REQUESTS;
    const remaining = Math.max(0, max - used);
    return {
      used,
      max,
      remaining,
      isExhausted: remaining <= 0,
      isAnonymous: false,
    };
  }

  /**
   * Checks whether the user is eligible to send a new prompt to AI
   */
  public static canMakeRequest(isAuthenticated: boolean, userId?: string): boolean {
    const status = this.getStatus(isAuthenticated, userId);
    return !status.isExhausted;
  }

  /**
   * Checks if anonymous user has already used their 1 free trial
   */
  public static hasUsedFreeTrial(): boolean {
    const status = this.getStatus(false);
    return status.used >= AI_LIMIT_CONFIG.ANONYMOUS_MAX_REQUESTS;
  }

  /**
   * Consumes exactly 1 quota point ONLY AFTER AI response is successfully received and rendered.
   * If an API error happens, this is NOT called, protecting the user's trial.
   */
  public static recordSuccessfulCompletion(isAuthenticated: boolean, userId?: string): AIQuotaStatus {
    const current = this.getStatus(isAuthenticated, userId);

    const newUsed = current.used + 1;
    if (!isAuthenticated) {
      localStorage.setItem(STORAGE_KEYS.ANON_COUNT, newUsed.toString());
      sessionStorage.setItem(STORAGE_KEYS.ANON_COUNT, newUsed.toString());
    } else {
      const key = `${STORAGE_KEYS.USER_COUNT_PREFIX}${userId || 'default'}`;
      localStorage.setItem(key, newUsed.toString());
    }

    const updated = this.getStatus(isAuthenticated, userId);
    this.notifyListeners(updated);
    return updated;
  }

  /**
   * Legacy alias for recordSuccessfulCompletion
   */
  public static consumeQuota(isAuthenticated: boolean, userId?: string): AIQuotaStatus {
    return this.recordSuccessfulCompletion(isAuthenticated, userId);
  }

  /**
   * Resets anonymous counter (useful for validator demonstration and testing)
   */
  public static resetAnonQuota(): AIQuotaStatus {
    localStorage.removeItem(STORAGE_KEYS.ANON_COUNT);
    sessionStorage.removeItem(STORAGE_KEYS.ANON_COUNT);
    const updated = this.getStatus(false);
    this.notifyListeners(updated);
    return updated;
  }

  /**
   * Subscribes to quota changes across the application
   */
  public static subscribe(listener: QuotaListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private static notifyListeners(status: AIQuotaStatus): void {
    this.listeners.forEach((fn) => {
      try {
        fn(status);
      } catch (err) {
        console.error('Error notifying quota listener:', err);
      }
    });
  }
}
