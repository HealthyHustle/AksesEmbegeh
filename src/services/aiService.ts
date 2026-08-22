import { IssueTopicId, SocraticPhase, SocraticScore, ChatMessage } from '../types';

export type N8NActiveTopic = 'bullying' | 'literasi_digital' | 'ketimpangan_sosial';

export interface N8NStreamOptions {
  message: string;
  sessionId: string;
  conversationId: string;
  topic?: IssueTopicId;
  conversationHistory?: ChatMessage[];
  onChunk: (chunk: string) => void;
  onComplete?: (fullText: string) => void;
  onError?: (errorMessage: string) => void;
}

export class AIService {
  /**
   * Retrieves the production webhook endpoint for Critical Mind AI
   */
  private static getWebhookUrl(): string {
    const rawUrl =
      import.meta.env.VITE_N8N_WEBHOOK_URL ||
      (import.meta.env as any).N8N_WEBHOOK_URL ||
      'https://babah123.app.n8n.cloud/webhook/critical-mind';

    // In local development, use Vite proxy to prevent CORS preflight blocks
    if (
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
      rawUrl.includes('babah123.app.n8n.cloud')
    ) {
      return rawUrl.replace('https://babah123.app.n8n.cloud', '/n8n-proxy');
    }

    return rawUrl;
  }

  /**
   * Formats topic ID to exact n8n topic string value:
   * 'bullying' | 'literasi_digital' | 'ketimpangan_sosial'
   */
  public static formatTopicToN8N(topic?: IssueTopicId): N8NActiveTopic {
    if (topic === 'literasi-digital') return 'literasi_digital';
    if (topic === 'ketimpangan-sosial') return 'ketimpangan_sosial';
    return 'bullying';
  }

  /**
   * Returns human readable display label for topic
   */
  public static getTopicDisplayName(topic: N8NActiveTopic): string {
    switch (topic) {
      case 'bullying':
        return 'Bullying & Iklim Sekolah';
      case 'literasi_digital':
        return 'Literasi Digital & Etika Informasi';
      case 'ketimpangan_sosial':
        return 'Ketimpangan Sosial & Pendidikan 3T';
    }
  }

  /**
   * Streams or fetches AI responses from the new n8n Critical Mind workflow
   * Webhook: https://babah123.app.n8n.cloud/webhook/critical-mind
   */
  public static async streamFromN8N({
    message,
    sessionId,
    conversationId,
    topic = 'bullying',
    onChunk,
    onComplete,
    onError
  }: N8NStreamOptions): Promise<string> {
    const webhookUrl = this.getWebhookUrl();
    const activeTopic = this.formatTopicToN8N(topic);
    let accumulatedText = '';

    const payload = {
      message,
      sessionId,
      conversationId,
      topic: activeTopic
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream, application/json, text/plain, */*'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let errorData: any = null;
        try {
          errorData = await response.json();
        } catch {
          // ignore json parse error
        }

        const fallbackMsg = errorData?.message ||
          `Critical Mind AI sedang menghubungkan ke workflow n8n (HTTP ${response.status}). Pastikan workflow di n8n sudah diaktifkan (Active).`;
        
        onChunk(fallbackMsg);
        accumulatedText = fallbackMsg;
        if (onComplete) onComplete(accumulatedText);
        return accumulatedText;
      }

      // Check if response is streamable
      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullRawBuffer = '';
        let lineBuffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunkText = decoder.decode(value, { stream: true });
          fullRawBuffer += chunkText;
          lineBuffer += chunkText;

          const lines = lineBuffer.split('\n');
          lineBuffer = lines.pop() ?? '';

          for (const line of lines) {
            const content = this.extractContentFromLine(line);
            if (content) {
              accumulatedText += content;
              onChunk(content);
            }
          }
        }

        if (lineBuffer.trim()) {
          const content = this.extractContentFromLine(lineBuffer);
          if (content) {
            accumulatedText += content;
            onChunk(content);
          }
        }

        // If body was a single JSON object that wasn't SSE formatted
        if (!accumulatedText.trim() && fullRawBuffer.trim()) {
          const parsed = this.parseJsonPayload(fullRawBuffer);
          if (parsed) {
            accumulatedText = parsed;
            onChunk(parsed);
          }
        }

        if (accumulatedText.trim()) {
          if (onComplete) onComplete(accumulatedText);
          return accumulatedText;
        }

        // If response was 200 OK but body is empty
        const emptyHint = 
          `Webhook n8n merespons HTTP 200, namun tidak ada konten teks yang dikirimkan balik.\n\n` +
          `**Petunjuk Konfigurasi n8n:**\n` +
          `1. Buka workflow di n8n canvas.\n` +
          `2. Buka node pertama (**Webhook**).\n` +
          `3. Ganti parameter **"Respond"** dari *Immediately* menjadi 👉 **"Using 'Respond to Webhook' Node"** (atau *When Last Node Finishes*).\n` +
          `4. Simpan (*Save*) dan pastikan workflow dalam status **Active/Publish**.`;

        onChunk(emptyHint);
        accumulatedText = emptyHint;
        if (onComplete) onComplete(accumulatedText);
        return accumulatedText;
      }

      return accumulatedText;

    } catch (error: any) {
      console.error('[Critical Mind AI Connection Error]:', error);
      const errorMsg = 'Critical Mind AI sedang mengalami kendala jaringan atau workflow n8n belum aktif. Silakan coba kembali.';
      onChunk(errorMsg);
      accumulatedText = errorMsg;
      if (onError) onError(errorMsg);
      if (onComplete) onComplete(accumulatedText);
      return accumulatedText;
    }
  }

  /**
   * Parses JSON string and extracts message with priority:
   * output -> response -> message -> content
   */
  private static parseJsonPayload(rawText: string): string | null {
    const trimmed = rawText.trim();
    if (!trimmed) return null;

    try {
      const data = JSON.parse(trimmed);

      // If array of items
      if (Array.isArray(data)) {
        return data
          .map(item => this.extractValueFromObject(item))
          .filter(Boolean)
          .join('\n\n');
      }

      return this.extractValueFromObject(data);
    } catch {
      return null;
    }
  }

  /**
   * Extracts text value from JSON object adhering to priority:
   * output -> response -> message -> content -> text
   */
  private static extractValueFromObject(data: any): string {
    if (!data) return '';
    if (typeof data === 'string') return data;

    // 1. output
    if (data.output && typeof data.output === 'string') return data.output;
    if (data.output && typeof data.output === 'object') return this.extractValueFromObject(data.output);

    // 2. response
    if (data.response && typeof data.response === 'string') return data.response;
    if (data.response && typeof data.response === 'object') return this.extractValueFromObject(data.response);

    // 3. message
    if (data.message && typeof data.message === 'string') return data.message;
    if (data.message && typeof data.message === 'object') return this.extractValueFromObject(data.message);

    // 4. content / text
    if (data.content && typeof data.content === 'string') return data.content;
    if (data.text && typeof data.text === 'string') return data.text;

    // Out of topic handling (allowed: false)
    if (data.allowed === false && data.reason) {
      return data.reason;
    }

    try {
      return JSON.stringify(data);
    } catch {
      return String(data);
    }
  }

  /**
   * Extracts content from a single streaming chunk or SSE data line
   */
  private static extractContentFromLine(rawLine: string): string | null {
    const trimmed = rawLine.trim();
    if (!trimmed) return null;

    const cleaned = trimmed.startsWith('data:') ? trimmed.replace(/^data:\s*/, '').trim() : trimmed;
    if (cleaned === '[DONE]' || cleaned === 'event: message' || cleaned === 'event: done') {
      return null;
    }

    if ((cleaned.startsWith('{') && cleaned.endsWith('}')) || (cleaned.startsWith('[') && cleaned.endsWith(']'))) {
      try {
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed)) {
          return parsed
            .map(item => this.extractValueFromObject(item))
            .filter(Boolean)
            .join('');
        }

        const content =
          parsed.content ??
          parsed.text ??
          parsed.output ??
          parsed.response ??
          parsed.message ??
          parsed.delta?.content ??
          parsed.item?.content ??
          (parsed.type === 'item' ? parsed.content : null);

        if (typeof content === 'string' && content.length > 0) {
          return content;
        }

        if (content && typeof content === 'object') {
          return this.extractValueFromObject(content);
        }

        return null;
      } catch {
        return null;
      }
    }

    // Plain text line
    if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
      return trimmed + ' ';
    }

    return null;
  }

  /**
   * Generates scorecard if n8n returns completed evaluation
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
        'Mendorong peran aktif guru BK dan keadilan restoratif.'
      ];
      weaknesses = [
        'Perlu memperkuat rujukan data prevalensi cyberbullying di luar jam sekolah.',
        'Pertimbangkan faktor psikososial dan latar belakang pengasuhan pelaku.'
      ];
      recommendations = [
        'Pelajari lebih lanjut instrumen iklim keamanan sekolah Permendikbudristek No. 46/2023.',
        'Ikuti Tes Critical Thinking modul Bullying (15 Soal) untuk menguji nalar kasus.'
      ];
      reasoningSummary = 'Analisis Anda menunjukkan penalaran progresif dalam menghubungkan pengawasan sekolah dengan empati sosial peserta didik.';
    } else if (topic === 'literasi-digital') {
      strengths = [
        'Kritis terhadap fenomena bias konfirmasi dan filter bubble media sosial.',
        'Menekankan pentingnya teknik lateral reading dalam verifikasi fakta.',
        'Memahami risiko manipulasi konten berbasis AI generatif.'
      ];
      weaknesses = [
        'Perlu memperdalam aspek regulasi perlindungan data pribadi (UU PDP).',
        'Pertimbangkan strategi pembelajaran etika digital sejak jenjang dasar.'
      ];
      recommendations = [
        'Kaji jurnal literasi digital di menu Eksplorasi & Jurnal.',
        'Uji kemampuan identifikasi hoaks pada Tes Critical Thinking Literasi Digital.'
      ];
      reasoningSummary = 'Struktur argumen Anda berakar kuat pada pemahaman ekosistem informasi modern dan tanggung jawab etis bermedia.';
    } else {
      strengths = [
        'Memahami disparitas sarana belajar di wilayah 3T secara struktural.',
        'Menekankan prinsip keadilan distributif (equity vs equality).',
        'Mendorong solusi inovasi teknologi offline untuk daerah terisolir.'
      ];
      weaknesses = [
        'Dapat memperdalam analisis retensi guru perintis dan tunjangan afirmasi.',
        'Pertimbangkan integrasi kearifan lokal dalam kurikulum kontekstual.'
      ];
      recommendations = [
        'Diskusikan gagasan offline learning hub di Forum Diskusi Ketimpangan Sosial.',
        'Ikuti Tes Critical Thinking modul Ketimpangan Sosial 15 Soal.'
      ];
      reasoningSummary = 'Penalaran Anda berorientasi pada keadilan sistemik dan solusi adaptif bagi peserta didik di daerah pelosok Indonesia.';
    }

    const level = baseScore >= 81 ? 'Advanced Critical Thinker' : baseScore >= 61 ? 'Critical Thinker' : 'Developing';

    return {
      score: baseScore,
      level,
      strengths,
      weaknesses,
      reasoningSummary,
      recommendations
    };
  }
}
