import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  RotateCcw, 
  Sparkles, 
  ShieldAlert, 
  Smartphone, 
  Scale, 
  PlusCircle, 
  History, 
  Menu, 
  X, 
  Award, 
  HelpCircle, 
  BrainCircuit
} from 'lucide-react';
import { IssueTopicId, SocraticPhase, ChatMessage as ChatMessageType, SocraticScore } from '../types';
import { AIService } from '../services/aiService';
import { AILimitService } from '../services/aiLimitService';
import { ChatMessage } from '../components/ai/ChatMessage';
import { PhaseProgress } from '../components/ai/PhaseProgress';
import { ScoreCardModal } from '../components/ai/ScoreCardModal';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

interface SavedSession {
  id: string;
  sessionId: string;
  topic: IssueTopicId;
  title: string;
  date: string;
  messages: ChatMessageType[];
}

export const CriticalMindAI: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<IssueTopicId>('bullying');
  const [currentPhase, setCurrentPhase] = useState<SocraticPhase>(1);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeScoreCard, setActiveScoreCard] = useState<SocraticScore | null>(null);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  // Persistent Session IDs for n8n Memory
  const [sessionId, setSessionId] = useState<string>(() => `mbg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`);

  const [savedSessions, setSavedSessions] = useState<SavedSession[]>(() => {
    const saved = localStorage.getItem('mbg_saved_ai_sessions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'sess-1',
        sessionId: 'mbg_init_sess_1',
        topic: 'bullying',
        title: 'Dialektika Relasi Kuasa Guru-Siswa',
        date: 'Kemarin',
        messages: []
      },
      {
        id: 'sess-2',
        sessionId: 'mbg_init_sess_2',
        topic: 'literasi-digital',
        title: 'Uji Asumsi Video Deepfake',
        date: '2 hari lalu',
        messages: []
      }
    ];
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { showToast } = useToast();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [quotaStatus, setQuotaStatus] = useState(() =>
    AILimitService.getStatus(isAuthenticated, user?.id)
  );

  useEffect(() => {
    setQuotaStatus(AILimitService.getStatus(isAuthenticated, user?.id));
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    const unsub = AILimitService.subscribe((updated) => setQuotaStatus(updated));
    return unsub;
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem('mbg_saved_ai_sessions', JSON.stringify(savedSessions));
  }, [savedSessions]);

  // Initial welcome message per topic
  const getInitialMessages = useCallback((topic: IssueTopicId): ChatMessageType[] => {
    const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    if (topic === 'bullying') {
      return [
        {
          id: 'init-1',
          sender: 'ai',
          text: `Halo! Saya **Critical Mind AI**, asisten dialektika berpikir kritis Anda pada isu **Bullying & Iklim Keamanan Sekolah**.\n\nDi sini saya tidak akan memberikan jawaban langsung, melainkan mendampingi Anda membedah premis, menguji bukti, dan mengurai sudut pandang baru.\n\n*Apa pandangan atau asumsi awal Anda mengenai akar penyebab perundungan di lingkungan sekolah Indonesia saat ini?*`,
          timestamp,
          phase: 1,
          phaseName: 'Fase 1: Validasi dan Eksplorasi',
          suggestedPrompts: [
            'Menurut saya bullying terjadi karena kurangnya pengawasan guru.',
            'Akar masalahnya adalah normalisasi ejekan verbal dalam pergaulan sebaya.',
            'Pelaku bullying biasanya meniru perilaku kekerasan di lingkungan keluarga.'
          ]
        }
      ];
    }

    if (topic === 'literasi-digital') {
      return [
        {
          id: 'init-1',
          sender: 'ai',
          text: `Selamat datang di modul dialektika **Literasi Digital & Etika Informasi**.\n\nKecakapan digital melampaui kemampuan teknis gawai; ini adalah tentang bagaimana kita bernalar di tengah derasnya arus informasi dan kecerdasan buatan.\n\n*Menurut Anda, mengapa begitu banyak masyarakat terpelajar yang tetap rentan mempercayai dan menyebarkan hoaks atau informasi palsu?*`,
          timestamp,
          phase: 1,
          phaseName: 'Fase 1: Validasi dan Eksplorasi',
          suggestedPrompts: [
            'Karena judul informasi yang sensasional memicu emosi sebelum nalar bekerja.',
            'Kurangnya kebiasaan verifikasi sumber silang (lateral reading) di sekolah.',
            'Algoritma media sosial menciptakan ruang gema (echo chamber) yang memperkuat bias.'
          ]
        }
      ];
    }

    return [
      {
        id: 'init-1',
        sender: 'ai',
        text: `Selamat datang di ruang kajian **Ketimpangan Sosial & Pendidikan Daerah 3T**.\n\nMari kita bedah kompleksitas disparitas akses, fasilitas, dan kualitas pendidikan dengan kacamata keadilan distributif (*equity vs equality*).\n\n*Bagaimana Anda melihat solusi paling mendesak untuk mengatasi ketertinggalan fasilitas belajar di daerah pelosok Indonesia?*`,
        timestamp,
        phase: 1,
        phaseName: 'Fase 1: Validasi dan Eksplorasi',
        suggestedPrompts: [
          'Pemerintah harus memastikan pemerataan listrik dan infrastruktur dasar terlebih dahulu.',
          'Pemberian insentif dan jaminan fasilitas tempat tinggal bagi guru perintis 3T.',
          'Penggunaan teknologi pembelajaran offline yang tidak bergantung pada sinyal internet.'
        ]
      }
    ];
  }, []);

  // Initialize or Reset on Topic Switch
  const startNewSession = useCallback((topicToSet?: IssueTopicId) => {
    const nextTopic = topicToSet || activeTopic;
    const newSessId = `mbg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    setSessionId(newSessId);
    if (topicToSet) {
      setActiveTopic(topicToSet);
    }
    setMessages(getInitialMessages(nextTopic));
    setCurrentPhase(1);
    setActiveScoreCard(null);
    setIsStreaming(false);
    setIsTyping(false);
  }, [activeTopic, getInitialMessages]);

  useEffect(() => {
    startNewSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopic]);

  // Handle User Message Submission with Real-Time Streaming
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isStreaming) return;

    // Strict Anonymous & Authenticated Limit Check
    const canRequest = AILimitService.canMakeRequest(isAuthenticated, user?.id);
    if (!canRequest) {
      if (!isAuthenticated) {
        openAuthModal(
          'Anda telah mencapai batas 3 pertanyaan untuk pengguna anonim. Masuk dengan akun gratis untuk melanjutkan dialektika kritis.',
          '/critical-mind-ai'
        );
      } else {
        showToast('Anda telah mencapai batas kuota harian akun.', 'info');
      }
      return;
    }

    const updatedQuota = AILimitService.consumeQuota(isAuthenticated, user?.id);
    setQuotaStatus(updatedQuota);

    const userText = text.trim();
    const userTimestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    // 1 & 2: Append user message
    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: userTimestamp
    };

    // 3: Append empty AI message placeholder
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

    // Check if user requested conclusion
    const isConclusionRequest = 
      userText.toLowerCase() === 'selesai' || 
      userText.toLowerCase().includes('selesaikan diskusi') || 
      userText.toLowerCase().includes('minta skor');

    try {
      // Stream from n8n production webhook
      await AIService.streamFromN8N({
        message: userText,
        userId: isAuthenticated && user?.id ? user.id : 'anonymous',
        sessionId,
        topic: activeTopic,
        conversationHistory: updatedHistory,
        onChunk: (chunk: string) => {
          setIsTyping(false); // First chunk received, hide initial spinner
          setMessages(prev =>
            prev.map(m => m.id === aiMsgId ? { ...m, text: m.text + chunk } : m)
          );
        },
        onComplete: (fullText: string) => {
          setIsStreaming(false);
          setIsTyping(false);

          // Advance phase
          const nextPhase = (currentPhase < 3 ? (currentPhase + 1) as SocraticPhase : 3);
          setCurrentPhase(nextPhase);

          // If conclusion requested or phase 4
          if (isConclusionRequest) {
            const scoreCard = AIService.generateScoreCard(activeTopic, updatedHistory);
            setActiveScoreCard(scoreCard);
            setCurrentPhase(4);
            setMessages(prev =>
              prev.map(m => m.id === aiMsgId ? {
                ...m,
                phase: 4,
                phaseName: 'Fase 4: Kesimpulan dan Skor',
                scoreCard,
                suggestedPrompts: [
                  'Mulai sesi diskusi baru dengan topik lain',
                  'Lanjut ke Tes Critical Thinking (15 Soal)',
                  'Bagikan perspektif di Forum Diskusi'
                ]
              } : m)
            );
            showToast('🎉 Lembar evaluasi nalar kritis berhasil disusun!', 'success');
          } else {
            // Add suggested follow-ups
            setMessages(prev =>
              prev.map(m => m.id === aiMsgId ? {
                ...m,
                phase: nextPhase,
                phaseName: nextPhase === 2 ? 'Fase 2: Penggalian Bukti' : 'Fase 3: Analisis Sudut Pandang',
                suggestedPrompts: nextPhase === 2 ? [
                  'Data survei menunjukkan peran penting iklim sekolah.',
                  'Berdasarkan pengamatan di sekolah saya...',
                  'Ada faktor relasi kuasa yang perlu dipertimbangkan.'
                ] : [
                  'Bagaimana jika kita melihat dari sudut pandang pembuat kebijakan?',
                  'Perlu kolaborasi antara keluarga, sekolah, dan masyarakat.',
                  'Selesai, berikan evaluasi skor nalar kritis saya.'
                ]
              } : m)
            );
          }

          // 12: Update saved sessions history
          setSavedSessions(prev => {
            const existingIndex = prev.findIndex(s => s.sessionId === sessionId);
            const sessionTitle = userText.slice(0, 38) + (userText.length > 38 ? '...' : '');
            if (existingIndex >= 0) {
              const copy = [...prev];
              copy[existingIndex] = {
                ...copy[existingIndex],
                date: 'Hari ini',
                messages: updatedHistory
              };
              return copy;
            } else {
              return [
                {
                  id: `sess-${Date.now()}`,
                  sessionId,
                  topic: activeTopic,
                  title: sessionTitle,
                  date: 'Hari ini',
                  messages: updatedHistory
                },
                ...prev
              ];
            }
          });
        },
        onError: (errMsg: string) => {
          setIsStreaming(false);
          setIsTyping(false);
          setMessages(prev =>
            prev.map(m => m.id === aiMsgId ? {
              ...m,
              text: errMsg
            } : m)
          );
          showToast(errMsg, 'error');
        }
      });
    } catch {
      setIsStreaming(false);
      setIsTyping(false);
      const friendlyError = 'Critical Mind AI sedang mengalami kendala. Silakan coba lagi.';
      setMessages(prev =>
        prev.map(m => m.id === aiMsgId ? {
          ...m,
          text: friendlyError
        } : m)
      );
      showToast(friendlyError, 'error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const topicConfigs = [
    { id: 'bullying' as IssueTopicId, name: 'Bullying', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'literasi-digital' as IssueTopicId, name: 'Literasi Digital', icon: Smartphone, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'ketimpangan-sosial' as IssueTopicId, name: 'Ketimpangan Sosial', icon: Scale, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="bg-[#FAFCFF] min-h-[calc(100vh-5rem)] flex flex-col">
      
      {/* SCORECARD MODAL */}
      <ScoreCardModal
        scoreCard={activeScoreCard}
        topic={activeTopic}
        onClose={() => setActiveScoreCard(null)}
        onReset={() => startNewSession()}
      />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1 flex flex-col">
        
        {/* TOP PHASE PROGRESS BAR */}
        <div className="mb-4">
          <PhaseProgress currentPhase={currentPhase} />
        </div>

        {/* MAIN CHAT CONTAINER GRID */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-blue-100 shadow-soft-lg overflow-hidden min-h-[620px]">
          
          {/* ========================================================================= */}
          {/* SIDEBAR (DESKTOP + MOBILE DRAWER) */}
          {/* ========================================================================= */}
          <aside className={`lg:col-span-4 bg-gradient-to-b from-[#F0F6FF] via-[#FAFCFF] to-white border-r border-blue-100 p-5 flex flex-col justify-between ${
            isSidebarOpenMobile ? 'fixed inset-0 z-50 bg-white' : 'hidden lg:flex'
          }`}>
            <div className="space-y-6">
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-navy">
                      Critical Mind AI
                    </h3>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-full">
                      Socratic Learning Assistant
                    </span>
                  </div>
                </div>

                {/* Mobile Close Button */}
                <button
                  onClick={() => setIsSidebarOpenMobile(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    startNewSession();
                    showToast('Sesi dialektika baru telah dibuat.', 'info');
                    setIsSidebarOpenMobile(false);
                  }}
                  className="w-full py-2.5 px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Sesi Dialektika Baru</span>
                </button>
              </div>

              {/* TOPIC SELECTOR */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <span>Pilih Isu Penelitian</span>
                </label>

                <div className="space-y-1.5">
                  {topicConfigs.map((t) => {
                    const isSelected = activeTopic === t.id;
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          startNewSession(t.id);
                          setIsSidebarOpenMobile(false);
                        }}
                        className={`w-full p-3 rounded-2xl text-left text-xs font-bold flex items-center justify-between transition-all border ${
                          isSelected
                            ? 'bg-white border-blue-600 text-blue-900 shadow-sm ring-2 ring-blue-100'
                            : 'bg-white/70 hover:bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-xl ${t.bg}`}>
                            <Icon className={`w-4 h-4 ${t.color}`} />
                          </div>
                          <span>{t.name}</span>
                        </div>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SAVED CONVERSATION SESSIONS */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" />
                    Riwayat Sesi
                  </span>
                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-semibold">
                    {savedSessions.length} Tersimpan
                  </span>
                </div>

                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {savedSessions.map((sess) => (
                    <div
                      key={sess.id}
                      onClick={() => {
                        setActiveTopic(sess.topic);
                        setSessionId(sess.sessionId);
                        if (sess.messages && sess.messages.length > 0) {
                          setMessages(sess.messages);
                        }
                        setIsSidebarOpenMobile(false);
                      }}
                      className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer space-y-0.5 ${
                        sess.sessionId === sessionId
                          ? 'bg-blue-50/90 border-blue-300 text-blue-900 font-medium'
                          : 'bg-white/80 hover:bg-white border-slate-200/80 text-slate-700'
                      }`}
                    >
                      <div className="font-semibold truncate">{sess.title}</div>
                      <div className="text-[10px] text-slate-400 flex justify-between">
                        <span>{sess.date}</span>
                        <span>{sess.topic}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Socratic Hint / Protocol Info */}
            <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 space-y-1 bg-blue-50/50 p-3 rounded-2xl border border-blue-100 mt-4">
              <div className="font-bold text-navy flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                Live Socratic AI Stream:
              </div>
              <p className="leading-snug text-slate-600">
                AI merespons argumen secara <em>real-time streaming</em>. Sampaikan penalaran Anda, lalu ketik <strong>"selesai"</strong> untuk merangkum evaluasi nalar kritis.
              </p>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* CHAT AREA */}
          {/* ========================================================================= */}
          <main className="lg:col-span-8 flex flex-col justify-between bg-white relative">
            
            {/* CHAT HEADER */}
            <div className="px-5 py-4 border-b border-blue-100 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSidebarOpenMobile(true)}
                  className="p-2 rounded-xl text-slate-600 hover:bg-blue-50 lg:hidden"
                  aria-label="Buka navigasi sesi"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-bold text-lg text-navy leading-none">
                      Critical Mind AI
                    </h2>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Topik Aktif: <strong className="text-blue-600">{topicConfigs.find(t => t.id === activeTopic)?.name}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {quotaStatus.isAnonymous ? (
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Sisa Kuota: {quotaStatus.remaining} / {quotaStatus.max}
                  </span>
                ) : (
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Calon Guru: {quotaStatus.remaining} tersisa
                  </span>
                )}

                {/* End Discussion Quick Button */}
                <button
                  onClick={() => handleSendMessage('selesai')}
                  disabled={isStreaming || messages.length < 2}
                  className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 transition-all flex items-center gap-1.5 disabled:opacity-40"
                >
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Selesaikan & Minta Skor</span>
                </button>
              </div>
            </div>

            {/* MESSAGES SCROLL AREA */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 max-h-[520px]">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  onSelectPrompt={(prompt) => handleSendMessage(prompt)}
                  onViewScoreCard={(score) => setActiveScoreCard(score)}
                />
              ))}

              {/* Initial Loading Spinner while waiting for first chunk */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="bg-blue-50/80 border border-blue-200 px-4 py-3 rounded-2xl flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-blue-700">Critical Mind AI sedang menelaah nalar...</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* CHAT INPUT FORM */}
            <div className="p-4 bg-[#FAFCFF] border-t border-blue-100">
              {quotaStatus.isExhausted && quotaStatus.isAnonymous ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-center space-y-2">
                  <div className="text-xs font-bold text-amber-900">
                    Batas Kuota Uji Coba Anonim Telah Habis (3/3 Pertanyaan)
                  </div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Masuk ke akun calon guru Anda untuk melanjutkan diskusi tanpa batas, menyimpan riwayat dialektika, dan menerbitkan sertifikasi skor nalar kritis.
                  </p>
                  <div className="pt-1 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => openAuthModal('Masuk akun untuk melanjutkan dialektika AI.', '/critical-mind-ai')}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
                    >
                      Masuk Akun Sekarang
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        AILimitService.resetAnonQuota();
                        showToast('Kuota anonim direset untuk uji coba.', 'info');
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 underline"
                    >
                      Reset Kuota (Mode Evaluasi)
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <textarea
                      ref={textareaRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isStreaming}
                      placeholder={
                        isStreaming
                          ? 'Critical Mind AI sedang merespons...'
                          : `Tuliskan argumen atau tanggapan kritis Anda mengenai ${topicConfigs.find(t => t.id === activeTopic)?.name}...`
                      }
                      rows={2}
                      className="w-full p-3.5 pr-24 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none disabled:bg-slate-50"
                    />

                    {/* Send Button & Helper */}
                    <div className="absolute right-3 bottom-3 flex items-center gap-2">
                      <span className="hidden sm:inline text-[10px] text-slate-400 font-medium">
                        Enter ↵
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSendMessage();
                        }}
                        disabled={!inputText.trim() || isStreaming}
                        className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:hover:bg-blue-600 transition-all shadow-sm"
                        aria-label="Kirim argumen"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                    <span>Tekan <strong>Shift + Enter</strong> untuk baris baru.</span>
                    <span>Ketik <strong>"selesai"</strong> untuk merangkum evaluasi skor.</span>
                  </div>
                </>
              )}
            </div>

          </main>

        </div>

      </div>

    </div>
  );
};
