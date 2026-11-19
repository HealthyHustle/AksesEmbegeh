import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BrainCircuit, 
  Send, 
  RotateCcw, 
  HelpCircle, 
  ShieldAlert, 
  Smartphone, 
  Scale, 
  LogIn, 
  ArrowLeft,
  Bot,
  CheckCircle2,
  UserPlus
} from 'lucide-react';
import { IssueTopicId, SocraticPhase, ChatMessage as ChatMessageType, SocraticScore, AIQuotaStatus } from '../types';
import { AIService } from '../services/aiService';
import { AILimitService } from '../services/aiLimitService';
import { ChatMessage } from '../components/ai/ChatMessage';
import { ScoreCardModal } from '../components/ai/ScoreCardModal';
import { HOOK_QUESTIONS } from '../data/hooks';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BatikPattern } from '../components/common/BatikPattern';
import logoImg from '../assets/logo.png';

export const AILearning: React.FC = () => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { showToast } = useToast();

  const [activeTopic, setActiveTopic] = useState<IssueTopicId>('literasi-digital');
  const [currentPhase, setCurrentPhase] = useState<SocraticPhase>(1);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeScoreCard, setActiveScoreCard] = useState<SocraticScore | null>(null);

  // Quota Status tracked via AILimitService
  const [quotaStatus, setQuotaStatus] = useState<AIQuotaStatus>(() =>
    AILimitService.getStatus(isAuthenticated, user?.id)
  );

  // Sync quota status on auth change
  useEffect(() => {
    setQuotaStatus(AILimitService.getStatus(isAuthenticated, user?.id));
  }, [isAuthenticated, user?.id]);

  // Subscribe to quota changes
  useEffect(() => {
    const unsubscribe = AILimitService.subscribe((updated) => {
      setQuotaStatus(updated);
    });
    return unsubscribe;
  }, []);

  // Session Management: unique session per topic maintained in sessionStorage
  const getOrCreateSessionId = useCallback((topic: IssueTopicId): string => {
    const key = `mbg_ai_sess_${topic}`;
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const newId = `mbg_${topic.replace('-', '_')}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    sessionStorage.setItem(key, newId);
    return newId;
  }, []);

  const [sessionId, setSessionId] = useState<string>(() => getOrCreateSessionId('literasi-digital'));
  const [conversationStatus, setConversationStatus] = useState<string>('READY_FOR_NEXT_QUESTION');
  const [pendingReflectionQuestion, setPendingReflectionQuestion] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Active hook question based on topic
  const currentHook = HOOK_QUESTIONS.find(h => h.topic === activeTopic) || HOOK_QUESTIONS[0];

  // Initialize greeting & hook
  const getInitialMessagesForTopic = useCallback((topic: IssueTopicId): ChatMessageType[] => {
    const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const hook = HOOK_QUESTIONS.find(h => h.topic === topic) || HOOK_QUESTIONS[0];

    return [
      {
        id: `init-${topic}`,
        sender: 'ai',
        text: `Halo! Selamat datang di **AI Learning: Critical Mind AI**.

Saya hadir sebagai mitra berpikir kritis Anda. Di sini kita tidak mencari jawaban instan, melainkan bersama-sama menguji asumsi, memeriksa bukti nyata, dan menelaah konteks sekolah tempat Anda akan mengabdi.

Mari kita mulai dengan pertanyaan pemantik berikut:
**"${hook.question}"**

*Bagaimana pandangan atau pengamatan Anda mengenai persoalan ini?*`,
        timestamp,
        phase: 1,
        phaseName: 'Fase 1: Validasi Premis & Konteks',
        suggestedPrompts: hook.suggestedAnswerStarts
      }
    ];
  }, []);

  // Set initial messages on topic change
  useEffect(() => {
    setMessages(getInitialMessagesForTopic(activeTopic));
    setCurrentPhase(1);
    setActiveScoreCard(null);
  }, [activeTopic, getInitialMessagesForTopic]);


  const handleTopicChange = (newTopic: IssueTopicId) => {
    if (newTopic === activeTopic || isStreaming) return;
    if (!isAuthenticated && quotaStatus.isExhausted) {
      openAuthModal(
        'Masuk dengan akun calon guru untuk mengeksplorasi dialektika AI pada topik isu kritis lainnya.',
        '/ai-learning'
      );
      return;
    }
    setActiveTopic(newTopic);
    // Switch to dedicated session for this topic
    const topicSessionId = getOrCreateSessionId(newTopic);
    setSessionId(topicSessionId);
    setConversationStatus('READY_FOR_NEXT_QUESTION');
    setPendingReflectionQuestion(null);
  };

  const handleResetSession = () => {
    if (isStreaming) return;
    if (!isAuthenticated && quotaStatus.isExhausted) {
      openAuthModal(
        'Kamu telah menggunakan satu kesempatan belajar gratis. Silakan login terlebih dahulu untuk memulai sesi baru dan mengeksplorasi lebih banyak kasus bersama AI.',
        '/ai-learning'
      );
      return;
    }
    // Generate fresh session ID for this topic and persist in sessionStorage
    const key = `mbg_ai_sess_${activeTopic}`;
    const freshSessionId = `mbg_${activeTopic.replace('-', '_')}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    sessionStorage.setItem(key, freshSessionId);
    setSessionId(freshSessionId);

    setMessages(getInitialMessagesForTopic(activeTopic));
    setCurrentPhase(1);
    setActiveScoreCard(null);
    setConversationStatus('READY_FOR_NEXT_QUESTION');
    setPendingReflectionQuestion(null);
    showToast('Sesi belajar AI untuk topik ini telah diatur ulang.', 'info');
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isStreaming) return;

    // RULE: Anonymous user only gets EXACTLY 1 attempt without login
    if (!isAuthenticated && quotaStatus.isExhausted) {
      // Strictly prevent sending second question to AI API
      openAuthModal(
        'Anda telah menggunakan 1 kesempatan uji coba gratis. Masuk atau daftar akun untuk melanjutkan diskusi dan menyimpan hasil belajar Anda.',
        '/ai-learning'
      );
      return;
    }

    if (isAuthenticated && quotaStatus.isExhausted) {
      showToast('Batas kuota harian akun Anda telah tercapai. Silakan coba kembali esok hari.', 'info');
      return;
    }

    const userText = text.trim();
    const userTimestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: userTimestamp
    };

    // Append AI placeholder
    const aiMsgId = `ai-${Date.now()}`;
    const aiTimestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const emptyAiMsg: ChatMessageType = {
      id: aiMsgId,
      sender: 'ai',
      text: '',
      timestamp: aiTimestamp,
      phase: currentPhase,
      phaseName: currentPhase === 1 ? 'Fase 1: Validasi' : currentPhase === 2 ? 'Fase 2: Penggalian Bukti' : 'Fase 3: Sudut Pandang'
    };

    const updatedHistory = [...messages, userMsg, emptyAiMsg];
    setMessages(updatedHistory);
    setInputText('');
    setIsTyping(true);
    setIsStreaming(true);

    const isConclusionRequest = 
      userText.toLowerCase() === 'selesai' || 
      userText.toLowerCase().includes('selesaikan diskusi') || 
      userText.toLowerCase().includes('minta skor');

    try {
      await AIService.streamFromN8N({
        message: userText,
        userId: isAuthenticated && user?.id ? user.id : 'anonymous',
        sessionId,
        topic: activeTopic,
        conversationHistory: updatedHistory,
        onChunk: (chunk: string) => {
          setIsTyping(false);
          setMessages(prev =>
            prev.map(m => m.id === aiMsgId ? { ...m, text: m.text + chunk } : m)
          );
        },
        onComplete: (_fullText: string, rawResponse?: any) => {
          setIsStreaming(false);
          setIsTyping(false);

          // ONLY NOW: Record successful completion so trial is officially consumed
          const updatedQuota = AILimitService.recordSuccessfulCompletion(isAuthenticated, user?.id);
          setQuotaStatus(updatedQuota);

          // Update backend conversation status and reflection prompt
          if (rawResponse) {
            setConversationStatus(rawResponse.status || 'READY_FOR_NEXT_QUESTION');
            if (rawResponse.next_question && rawResponse.next_question.trim()) {
              setPendingReflectionQuestion(rawResponse.next_question);
            }
          }

          // If backend indicates reflection answer was off-topic (success === false), maintain current phase
          if (rawResponse && rawResponse.success === false) {
            showToast('Pertanyaan reflektif perlu dijawab secara relevan untuk melanjutkan pemahaman.', 'info');
            return;
          }

          const nextPhase = (currentPhase < 3 ? (currentPhase + 1) as SocraticPhase : 3);
          setCurrentPhase(nextPhase);

          if (isConclusionRequest) {
            const scoreCard = AIService.generateScoreCard(activeTopic, updatedHistory);
            setActiveScoreCard(scoreCard);
            setCurrentPhase(4);
            setMessages(prev =>
              prev.map(m => m.id === aiMsgId ? {
                ...m,
                phase: 4,
                phaseName: 'Fase 4: Kesimpulan & Skor',
                scoreCard,
                suggestedPrompts: [
                  'Uji nalar di Tes Critical Thinking 15 Soal',
                  'Diskusikan hasil di Ruang Diskusi Guru',
                  'Mulai refleksi baru dengan topik lain'
                ]
              } : m)
            );
            showToast('Rapor nalar kritis berhasil disusun!', 'success');
          } else {
            setMessages(prev =>
              prev.map(m => m.id === aiMsgId ? {
                ...m,
                phase: nextPhase,
                phaseName: nextPhase === 2 ? 'Fase 2: Penggalian Bukti' : 'Fase 3: Sudut Pandang',
                suggestedPrompts: nextPhase === 2 ? [
                  'Berdasarkan pengamatan di sekolah tempat saya mengajar/magang...',
                  'Bagaimana jika kita menimbang dari sudut pandang pembuat kebijakan?',
                  'Ada faktor relasi kuasa budaya setempat yang memengaruhinya...'
                ] : [
                  'Kaitkan dengan prinsip keadilan distributif (equity vs equality).',
                  'Bagaimana guru mendesain ruang kelas yang aman dan partisipatif?',
                  'Selesai, saya ingin melihat rapor skor nalar kritis saya.'
                ]
              } : m)
            );
          }
        },
        onError: (errMsg: string) => {
          setIsStreaming(false);
          setIsTyping(false);
          setMessages(prev =>
            prev.map(m => m.id === aiMsgId ? { ...m, text: errMsg } : m)
          );
          showToast('Terjadi kendala jaringan saat memproses jawaban AI.', 'info');
        }
      });
    } catch {
      setIsStreaming(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-[#FAFCFF] min-h-screen pb-24 relative overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HEADER SECTION: AI LEARNING: CRITICAL MIND AI */}
      {/* ========================================================================= */}
      <section className="relative pt-10 pb-10 bg-gradient-to-b from-blue-50/80 via-white to-[#FAFCFF] border-b border-blue-100/70 overflow-hidden">
        <BatikPattern opacity={0.04} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
            
            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white p-1.5 border border-blue-200 shadow-sm flex items-center justify-center overflow-hidden">
                  <img src={logoImg} alt="Mind Bridge Global Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-base text-[#0F2747] tracking-tight">Mind Bridge</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Global</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">Ekosistem Pembelajaran Calon Guru</span>
                </div>
              </div>
            ) : (
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors w-fit"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Beranda</span>
              </Link>
            )}

            {/* Quota Badge Indicator */}
            <div className="self-start sm:self-auto">
              {!isAuthenticated ? (
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                  quotaStatus.isExhausted 
                    ? 'bg-amber-50 text-amber-900 border-amber-300' 
                    : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${quotaStatus.isExhausted ? 'bg-amber-500' : 'bg-blue-600 animate-pulse'}`} />
                  <span>
                    {quotaStatus.isExhausted 
                      ? '1 Kesempatan Uji Coba Gratis Telah Digunakan' 
                      : 'Uji Coba Gratis: 1 Pertanyaan Tanpa Login'}
                  </span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Calon Guru: <strong>{user?.name}</strong> (Sisa Kuota: {quotaStatus.remaining})</span>
                </div>
              )}
            </div>

          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              <BrainCircuit className="w-3.5 h-3.5 text-blue-600" />
              <span>Ruang Berpikir Kritis Calon Guru</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-navy tracking-tight">
              AI Learning: <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Critical Mind AI</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Critical Mind AI hadir sebagai mitra berdiskusi untuk calon guru. Gunakan ruang ini untuk menguji gagasan, membedah situasi di sekolah, dan melatih penalaran kontekstual.
            </p>

            {/* Notice for anonymous guests */}
            {!isAuthenticated && (
              <p className="text-xs text-amber-800 font-medium bg-amber-50/90 p-2.5 rounded-xl border border-amber-200/80 inline-block">
                <strong>Coba Gratis:</strong> Anda dapat mengirim 1 pertanyaan awal tanpa login. Masuk ke akun Anda untuk melanjutkan diskusi dan menyimpan hasil belajar.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CHAT ARENA CONTAINER */}
      {/* ========================================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* TOPIC TABS */}
        <div className="bg-white rounded-2xl p-3 border border-blue-100 shadow-soft flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Pilih Isu Kritis:
            </span>

            <button
              onClick={() => handleTopicChange('literasi-digital')}
              disabled={isStreaming}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTopic === 'literasi-digital'
                  ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-300'
                  : 'bg-slate-50 text-slate-700 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>AI & Literasi Digital</span>
            </button>

            <button
              onClick={() => handleTopicChange('bullying')}
              disabled={isStreaming}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTopic === 'bullying'
                  ? 'bg-red-600 text-white shadow-xs ring-2 ring-red-300'
                  : 'bg-slate-50 text-slate-700 hover:bg-red-50 border border-slate-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Bullying & Relasi Kuasa</span>
            </button>

            <button
              onClick={() => handleTopicChange('ketimpangan-sosial')}
              disabled={isStreaming}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTopic === 'ketimpangan-sosial'
                  ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-300'
                  : 'bg-slate-50 text-slate-700 hover:bg-amber-50 border border-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Ketimpangan Sosial 3T</span>
            </button>
          </div>

          <button
            onClick={handleResetSession}
            disabled={isStreaming}
            title="Mulai Sesi Baru"
            className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Sesi</span>
          </button>
        </div>

        {/* MAIN CHAT CARD */}
        <div className="bg-white rounded-3xl border border-blue-100 shadow-soft-lg overflow-hidden flex flex-col">
          
          {/* Active Hook Banner */}
          <div className="bg-blue-50/70 p-4 border-b border-blue-100 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-xs">
              <span className="font-bold text-navy">Pertanyaan Pemantik Isu {activeTopic.replace('-', ' ').toUpperCase()}:</span>
              <p className="text-slate-800 font-semibold italic">"{currentHook.question}"</p>
              <p className="text-[11px] text-slate-500">{currentHook.contextNote}</p>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="p-4 sm:p-6 min-h-[400px] max-h-[560px] overflow-y-auto space-y-4 bg-[#FCFDFF]">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onSelectPrompt={(prompt) => handleSendMessage(prompt)}
                onViewScoreCard={(score) => setActiveScoreCard(score)}
              />
            ))}

            {/* AI Loading State */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-blue-100 shadow-xs w-fit"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-800">
                  <span>Critical Mind AI sedang menimbang premis nalar Anda...</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}

          </div>

          {/* FRIENDLY NOTICE AFTER 1ST FREE TRIAL CONSUMED (STRICT VALIDATOR REQUIREMENT) */}
          {!isAuthenticated && quotaStatus.isExhausted && !isStreaming && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="m-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-amber-50 border-2 border-amber-300 shadow-soft space-y-3"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm text-navy">
                    Terima kasih telah mencoba Critical Mind AI!
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Kamu telah menggunakan <strong>kesempatan belajar gratis</strong>. Login untuk melanjutkan perjalanan belajarmu dan mengakses seluruh ekosistem Mind Bridge Global.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1 pl-8">
                <Link
                  to="/login?redirect=/ai-learning"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login untuk Melanjutkan</span>
                </Link>

                <Link
                  to="/register?redirect=/ai-learning"
                  className="px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
                >
                  <UserPlus className="w-3.5 h-3.5 text-blue-600" />
                  <span>Daftar Akun</span>
                </Link>
              </div>
            </motion.div>
          )}

          {/* INPUT FORM AREA */}
          <div className="p-4 sm:p-5 bg-white border-t border-blue-100 space-y-3">
            
            {/* Socratic Question Gate Notice */}
            {conversationStatus === 'WAITING_FOR_ANSWER' && pendingReflectionQuestion && (
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 shadow-xs">
                <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-bold flex items-center gap-1.5">
                    <span>Pertanyaan Reflektif Wajib Direspons:</span>
                    <span className="text-[10px] uppercase font-semibold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
                      Question Gate Aktif
                    </span>
                  </div>
                  <p className="italic text-slate-700">"{pendingReflectionQuestion}"</p>
                </div>
              </div>
            )}

            <div className="relative bg-slate-50/70 rounded-2xl border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isStreaming}
                placeholder={
                  !isAuthenticated && quotaStatus.isExhausted
                    ? 'Kesempatan gratis telah digunakan. Masuk akun untuk melanjutkan percakapan...'
                    : isStreaming
                    ? 'Critical Mind AI sedang menyusun tanggapan dialektika...'
                    : conversationStatus === 'WAITING_FOR_ANSWER'
                    ? 'Ketik analisis atau jawaban reflektif Anda untuk melanjutkan...'
                    : 'Ketikkan analisis, pertanyaan kritis, atau tanggapan Anda di sini...'
                }
                rows={2}
                className="w-full p-3.5 pr-28 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent resize-none focus:outline-none"
              />

              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <span className="hidden sm:inline text-[10px] text-slate-400 font-medium">
                  Enter ↵
                </span>
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isStreaming}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:hover:bg-blue-600 transition-all shadow-sm flex items-center gap-1.5 font-bold text-xs"
                >
                  <span>Kirim</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
              <span>
                Pendekatan Socratic: AI tidak memberikan kesimpulan instan tanpa memancing pemikiran mandiri Anda.
              </span>
              <span className="font-semibold text-blue-600">
                Ketik "selesai" untuk menerbitkan skor evaluasi nalar kritis.
              </span>
            </div>

          </div>

        </div>

      </main>

      {/* Scorecard Modal */}
      {activeScoreCard && (
        <ScoreCardModal
          scoreCard={activeScoreCard}
          topic={activeTopic}
          onClose={() => setActiveScoreCard(null)}
          onReset={() => handleResetSession()}
        />
      )}

    </div>
  );
};
