import { IssueTopicId, SocraticScore, ChatMessage } from '../types';

// ============================================================
// CENTRALIZED API CONFIGURATION: MIND BRIDGE GLOBAL
// Production Webhook URL: Critical Mind AI
// ============================================================
export const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/mind-bridge-ai';

export const API_CONFIG = {
  PRODUCTION_WEBHOOK_URL: N8N_WEBHOOK_URL,
  DEV_PROXY_PATH: '/n8n-local/webhook/mind-bridge-ai',
  REQUEST_TIMEOUT_MS: 30000,
} as const;

/**
 * Resolves active endpoint URL:
 * In Vite local dev, uses the Vite proxy (/n8n-local) to prevent CORS issues.
 * In production builds, uses the direct URL.
 */
export function resolveN8NUrl(): string {
  const envOverride = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;
  if (envOverride && !envOverride.includes('localhost') && !envOverride.includes('127.0.0.1')) {
    return envOverride;
  }

  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    return API_CONFIG.DEV_PROXY_PATH;
  }

  return API_CONFIG.PRODUCTION_WEBHOOK_URL;
}

// ============================================================
// STRICT TOPIC TYPES: must match n8n backend accepted values
// Values: 'ketimpangan_sosial_3t' | 'literasi_digital' | 'bullying'
// ============================================================
export type N8NSelectedTopic = 'ketimpangan_sosial_3t' | 'literasi_digital' | 'bullying';
export type N8NActiveTopic = 'bullying' | 'literasi_digital' | 'ketimpangan_sosial';

/**
 * Maps frontend IssueTopicId to valid n8n selected_topic
 */
export function mapTopicToSelectedTopic(topic?: IssueTopicId | string): N8NSelectedTopic {
  if (topic === 'literasi-digital' || topic === 'literasi_digital') return 'literasi_digital';
  if (topic === 'ketimpangan-sosial' || topic === 'ketimpangan_sosial' || topic === 'ketimpangan_sosial_3t') {
    return 'ketimpangan_sosial_3t';
  }
  return 'bullying';
}

// ============================================================
// REQUEST & RESPONSE INTERFACES
// ============================================================
export interface CriticalMindRequest {
  session_id: string;
  selected_topic: N8NSelectedTopic;
  message: string;
}

export interface N8NCriticalMindResponse {
  success: boolean;
  session_id: string;
  selected_topic: N8NSelectedTopic | string;
  status: 'WAITING_FOR_ANSWER' | 'READY_FOR_NEXT_QUESTION' | string;
  response: string;
  next_question?: string;
  formattedText?: string;
}

export interface N8NStreamOptions {
  message: string;
  userId?: string;
  sessionId: string;
  topic?: IssueTopicId;
  conversationHistory?: ChatMessage[];
  onChunk: (chunk: string) => void;
  onComplete?: (fullText: string, rawResponse?: N8NCriticalMindResponse) => void;
  onError?: (errorMessage: string) => void;
}

// ============================================================
// STANDALONE SEND MESSAGE FUNCTION (as specified in Task Contract)
// ============================================================
export async function sendMessage(
  message: string,
  selectedTopic: N8NSelectedTopic,
  sessionId: string
): Promise<N8NCriticalMindResponse> {
  const targetUrl = resolveN8NUrl();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.REQUEST_TIMEOUT_MS);

  const payload: CriticalMindRequest = {
    session_id: sessionId,
    selected_topic: selectedTopic,
    message: message.trim(),
  };

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle HTTP Error Codes
    if (!response.ok) {
      let errorDetail = '';
      try {
        const errJson = await response.json();
        errorDetail = errJson.message || errJson.error || errJson.response || '';
      } catch {
        errorDetail = response.statusText;
      }

      if (response.status === 400) {
        throw new Error(
          errorDetail || 'Permintaan atau topik pembelajaran tidak valid (HTTP 400). Pastikan topik telah dipilih dengan benar.'
        );
      }

      if (response.status === 404) {
        throw new Error(
          'Endpoint Webhook n8n tidak ditemukan (HTTP 404). Silakan hubungi administrator.'
        );
      }

      if (response.status === 503) {
        throw new Error(
          'Layanan AI n8n sedang dalam pemeliharaan atau kelebihan beban (HTTP 503). Silakan coba beberapa saat lagi.'
        );
      }

      if (response.status >= 500) {
        throw new Error(
          `Layanan AI n8n mengalami kendala internal (HTTP ${response.status}). Silakan coba beberapa saat lagi.`
        );
      }

      throw new Error(`Permintaan ke AI gagal (HTTP ${response.status}): ${errorDetail || response.statusText}`);
    }

    // Parse JSON Response
    let data: any;
    try {
      data = await response.json();
    } catch {
      throw new Error('Respons dari server AI tidak berformat JSON yang valid.');
    }

    const rawResponse = data.response || data.output || data.message || '';
    const nextQuestion = data.next_question || '';
    const status = data.status || (nextQuestion ? 'WAITING_FOR_ANSWER' : 'READY_FOR_NEXT_QUESTION');
    const isSuccess = data.success !== false;

    // Compose formatted text for Chat UI
    let formattedText = rawResponse;
    if (nextQuestion && nextQuestion.trim()) {
      if (!isSuccess) {
        // AI indicates user response was off-topic or needs deeper thought
        formattedText = `⚠️ **Perlu Pendalaman Refleksi:**\n\n${rawResponse}\n\n---\n**Pertanyaan Reflektif:**\n*${nextQuestion}*`;
      } else {
        // Standard Socratic dialogue turn
        formattedText = `${rawResponse}\n\n---\n**Pertanyaan Reflektif:**\n*${nextQuestion}*`;
      }
    }

    return {
      success: isSuccess,
      session_id: data.session_id || sessionId,
      selected_topic: data.selected_topic || selectedTopic,
      status,
      response: rawResponse,
      next_question: nextQuestion,
      formattedText,
    };

  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new Error(
        'Waktu tunggu koneksi ke server AI habis (Request Timeout). Silakan periksa koneksi internet Anda dan coba lagi.'
      );
    }

    // Network / CORS Error
    if (err instanceof TypeError && (err.message.includes('fetch') || err.message.includes('NetworkError'))) {
      throw new Error(
        'Layanan AI sementara tidak dapat dihubungi. Pastikan koneksi internet Anda aktif dan Webhook n8n sedang berjalan.'
      );
    }

    // Rethrow friendly error message
    throw err;
  }
}

// ============================================================
// SERVICE CLASS (For Application-wide Integration)
// ============================================================
export class AIService {
  /**
   * Primary method to send a message to n8n webhook
   */
  public static async sendMessage(
    message: string,
    selectedTopic: N8NSelectedTopic,
    sessionId: string
  ): Promise<N8NCriticalMindResponse> {
    return sendMessage(message, selectedTopic, sessionId);
  }

  /**
   * Helper to map frontend topic ID to n8n selected_topic
   */
  public static formatTopicToSelectedTopic(topic?: IssueTopicId | string): N8NSelectedTopic {
    return mapTopicToSelectedTopic(topic);
  }

  /**
   * Backwards compatible aliases
   */
  public static formatTopicToActiveIssue(topic?: IssueTopicId | string): N8NActiveTopic {
    if (topic === 'literasi-digital' || topic === 'literasi_digital') return 'literasi_digital';
    if (topic === 'ketimpangan-sosial' || topic === 'ketimpangan_sosial') return 'ketimpangan_sosial';
    return 'bullying';
  }

  public static formatTopicToN8N(topic?: IssueTopicId): N8NActiveTopic {
    return this.formatTopicToActiveIssue(topic);
  }

  /**
   * Human-readable label for display
   */
  public static getTopicDisplayName(topic: string): string {
    switch (topic) {
      case 'bullying':
        return 'Bullying & Iklim Sekolah';
      case 'literasi_digital':
      case 'literasi-digital':
        return 'Literasi Digital & Etika Informasi';
      case 'ketimpangan_sosial_3t':
      case 'ketimpangan_sosial':
      case 'ketimpangan-sosial':
        return 'Ketimpangan Sosial & Pendidikan 3T';
      default:
        return topic;
    }
  }

  /**
   * Streams response progressively into the Chat UI
   */
  public static async streamFromN8N({
    message,
    sessionId,
    topic = 'literasi-digital',
    onChunk,
    onComplete,
    onError,
  }: N8NStreamOptions): Promise<string> {
    const selectedTopic = mapTopicToSelectedTopic(topic);

    try {
      const n8nResult = await sendMessage(message, selectedTopic, sessionId);
      const fullText = n8nResult.formattedText || n8nResult.response;

      if (!fullText.trim()) {
        const emptyErr = 'Critical Mind AI mengembalikan tanggapan kosong. Silakan kirimkan kembali pertanyaan Anda.';
        if (onError) onError(emptyErr);
        return '';
      }

      // Smooth progressive rendering for reading comfort
      const words = fullText.split(' ');
      const chunkSize = 3;

      for (let i = 0; i < words.length; i += chunkSize) {
        const chunk = words.slice(i, i + chunkSize).join(' ') + (i + chunkSize < words.length ? ' ' : '');
        onChunk(chunk);
        await new Promise((resolve) => setTimeout(resolve, 25));
      }

      if (onComplete) {
        onComplete(fullText, n8nResult);
      }

      return fullText;

    } catch (error: any) {
      const errorMsg = error?.message || 'Layanan AI sementara tidak dapat dihubungi.';
      if (onError) {
        onError(`⚠️ **Koneksi Critical Mind AI Terkendala**\n\n${errorMsg}\n\n*Riwayat chat Anda tetap tersimpan. Silakan coba kirim kembali.*`);
      }
      return '';
    }
  }

  /**
   * Local scorecard compilation when concluding session
   */
  public static generateScoreCard(topic: IssueTopicId, conversationHistory: ChatMessage[]): SocraticScore {
    const userMsgCount = conversationHistory.filter(m => m.sender === 'user').length;
    const baseScore = userMsgCount >= 4 ? 88 : userMsgCount >= 3 ? 82 : userMsgCount >= 2 ? 75 : 68;

    let strengths: string[] = [];
    let weaknesses: string[] = [];
    let recommendations: string[] = [];
    let reasoningSummary = '';

    if (topic === 'bullying') {
      strengths = [
        'Mampu membedakan relasi kuasa antara pelaku dan korban secara kritis.',
        'Mengidentifikasi urgensi iklim keamanan sekolah yang preventif dan empatik.',
        'Mendorong peran aktif guru BK dan keadilan restoratif.',
      ];
      weaknesses = [
        'Perlu memperkuat rujukan data prevalensi cyberbullying di luar jam sekolah.',
        'Pertimbangkan faktor psikososial dan latar belakang pengasuhan pelaku.',
      ];
      recommendations = [
        'Pelajari lebih lanjut instrumen iklim keamanan sekolah Permendikbudristek No. 46/2023.',
        'Ikuti Tes Critical Thinking modul Bullying (15 Soal) untuk menguji nalar kasus.',
      ];
      reasoningSummary = 'Analisis Anda menunjukkan penalaran progresif dalam menghubungkan pengawasan sekolah dengan empati sosial peserta didik.';
    } else if (topic === 'literasi-digital') {
      strengths = [
        'Kritis terhadap fenomena bias konfirmasi dan filter bubble media sosial.',
        'Menekankan pentingnya teknik lateral reading dalam verifikasi fakta.',
        'Memahami risiko manipulasi konten berbasis AI generatif.',
      ];
      weaknesses = [
        'Perlu memperdalam aspek regulasi perlindungan data pribadi (UU PDP).',
        'Pertimbangkan strategi pembelajaran etika digital sejak jenjang dasar.',
      ];
      recommendations = [
        'Kaji jurnal literasi digital di menu Eksplorasi & Jurnal.',
        'Uji kemampuan identifikasi hoaks pada Tes Critical Thinking Literasi Digital.',
      ];
      reasoningSummary = 'Struktur argumen Anda berakar kuat pada pemahaman ekosistem informasi modern dan tanggung jawab etis bermedia.';
    } else {
      strengths = [
        'Memahami disparitas sarana belajar di wilayah 3T secara struktural.',
        'Menekankan prinsip keadilan distributif (equity vs equality).',
        'Mendorong solusi inovasi teknologi offline untuk daerah terisolir.',
      ];
      weaknesses = [
        'Dapat memperdalam analisis retensi guru perintis dan tunjangan afirmasi.',
        'Pertimbangkan integrasi kearifan lokal dalam kurikulum kontekstual.',
      ];
      recommendations = [
        'Diskusikan gagasan offline learning hub di Forum Diskusi Ketimpangan Sosial.',
        'Ikuti Tes Critical Thinking modul Ketimpangan Sosial 15 Soal.',
      ];
      reasoningSummary = 'Penalaran Anda berorientasi pada keadilan sistemik dan solusi adaptif bagi peserta didik di daerah pelosok Indonesia.';
    }

    const level = baseScore >= 81 ? 'Advanced Critical Thinker' : baseScore >= 61 ? 'Critical Thinker' : 'Developing';

    return { score: baseScore, level, strengths, weaknesses, reasoningSummary, recommendations };
  }
}
