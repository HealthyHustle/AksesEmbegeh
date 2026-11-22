/**
 * CLOUD SYNC SERVICE: MIND BRIDGE GLOBAL
 * 
 * Bertanggung jawab mengirimkan data pendaftaran dan hasil tes Critical Thinking
 * secara otomatis ke Google Spreadsheet peneliti, baik saat tes baru selesai
 * maupun saat 30 responden lama membuka kembali website (Auto-Sync).
 */

import { TestResult, User } from '../types';
import { StorageService } from './storageService';
import { AuthService } from './authService';

// Endpoint Google Apps Script Web App resmi untuk sinkronisasi data penelitian
export const GOOGLE_SHEET_WEBHOOK_URL = 
  import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || 
  'https://script.google.com/macros/s/AKfycbyFsd6h4cl-Ab9g8RxGXWWqGAvPoz7i7HwS6ORlN9HwtuzPGgnpDtPE0QsNx5ct1PdK/exec';

const SYNCED_TESTS_KEY = 'mbg_synced_test_ids';
const SYNCED_USER_KEY = 'mbg_synced_user_flag';

export interface SyncPayload {
  action: 'SYNC_USER' | 'SYNC_TEST' | 'SYNC_ALL';
  user?: Partial<User> | null;
  testResult?: TestResult | null;
  allTests?: TestResult[];
  deviceInfo?: string;
  timestamp?: string;
}

export class CloudSyncService {
  /**
   * Mengirim data ke Google Spreadsheet Webhook
   */
  public static async sendToGoogleSheet(payload: SyncPayload): Promise<boolean> {
    const webhookUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || GOOGLE_SHEET_WEBHOOK_URL;

    // Jika URL belum diatur, lewati pengiriman jaringan namun simpan lokal
    if (!webhookUrl || webhookUrl.includes('PENDING_CONFIG')) {
      console.warn('Google Sheet Webhook URL belum dikonfigurasi. Data tetap tersimpan secara aman di browser.');
      return false;
    }

    try {
      // Menggunakan mode 'no-cors' jika diperlukan, atau standard POST jika Apps Script mengizinkan JSON
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Format paling ramah untuk Google Apps Script
        },
        body: JSON.stringify({
          ...payload,
          timestamp: new Date().toISOString(),
          deviceInfo: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
        }),
      });

      return res.ok || res.type === 'opaque';
    } catch (err) {
      console.error('Gagal sinkronisasi ke Google Sheet:', err);
      return false;
    }
  }

  /**
   * Sinkronisasi data satu hasil tes yang baru selesai
   */
  public static async syncTestResult(result: TestResult, user?: User | null): Promise<void> {
    const activeUser = user || StorageService.getUser();
    
    await this.sendToGoogleSheet({
      action: 'SYNC_TEST',
      user: activeUser,
      testResult: result
    });

    // Tandai ID tes ini sudah disinkronkan
    this.markTestAsSynced(result.id);
  }

  /**
   * AUTO-SYNC OTOMATIS: Dijalankan saat responden lama membuka kembali website
   * Memeriksa seluruh hasil tes dan profil yang ada di browser HP mereka,
   * lalu mengirimkan yang belum tersinkronkan ke Google Spreadsheet.
   */
  public static async autoSyncPendingData(): Promise<{ syncedTests: number; userSynced: boolean }> {
    let syncedTestsCount = 0;
    let userSynced = false;

    try {
      // 1. Ambil data profil pengguna yang tersimpan di browser
      const currentUser = await AuthService.getCurrentUser() || StorageService.getUser();

      // 2. Ambil daftar hasil tes yang tersimpan di browser
      const allTests = StorageService.getTestResults();

      // 3. Cek hasil tes yang belum tersinkronkan
      const syncedIds = this.getSyncedTestIds();
      const pendingTests = allTests.filter(t => !syncedIds.includes(t.id));

      if (pendingTests.length > 0 || (currentUser && !localStorage.getItem(SYNCED_USER_KEY))) {
        // Kirim paket sinkronisasi gabungan
        const success = await this.sendToGoogleSheet({
          action: 'SYNC_ALL',
          user: currentUser,
          allTests: pendingTests.length > 0 ? pendingTests : allTests
        });

        if (success) {
          // Tandai semua tes sebagai sudah disinkronkan
          pendingTests.forEach(t => this.markTestAsSynced(t.id));
          syncedTestsCount = pendingTests.length;

          if (currentUser) {
            localStorage.setItem(SYNCED_USER_KEY, 'true');
            userSynced = true;
          }
        }
      }
    } catch (e) {
      console.warn('Proses auto-sync latar belakang mengalami penundaan:', e);
    }

    return { syncedTests: syncedTestsCount, userSynced };
  }

  /**
   * Helper riwayat ID tes yang sudah terkirim agar tidak dobel
   */
  private static getSyncedTestIds(): string[] {
    try {
      const saved = localStorage.getItem(SYNCED_TESTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  private static markTestAsSynced(testId: string): void {
    try {
      const ids = this.getSyncedTestIds();
      if (!ids.includes(testId)) {
        ids.push(testId);
        localStorage.setItem(SYNCED_TESTS_KEY, JSON.stringify(ids));
      }
    } catch {}
  }
}
