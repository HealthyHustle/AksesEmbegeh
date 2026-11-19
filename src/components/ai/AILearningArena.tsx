import React, { useState, useEffect, useCallback } from 'react';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  Lock, 
  HelpCircle, 
  ShieldAlert, 
  Smartphone, 
  Scale, 
  LogIn,
  UserCheck
} from 'lucide-react';
import { IssueTopicId, SocraticPhase, ChatMessage as ChatMessageType, SocraticScore, AIQuotaStatus } from '../../types';
import { AIService } from '../../services/aiService';
import { AILimitService } from '../../services/aiLimitService';
import { ChatMessage } from './ChatMessage';
import { PhaseProgress } from './PhaseProgress';
import { ScoreCardModal } from './ScoreCardModal';
import { HOOK_QUESTIONS } from '../../data/hooks';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

interface AILearningArenaProps {
  initialTopic?: IssueTopicId;
  compact?: boolean;
}

export const AILearningArena: React.FC<AILearningArenaProps> = ({ 
  initialTopic = 'literasi-digital',
  compact = false 
}) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { showToast } = useToast();

  const [activeTopic, setActiveTopic] = useState<IssueTopicId>(initialTopic);
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

  const [sessionId] = useState<string>(() => `mbg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`);

  // Active hook question based on topic
  const currentHook = HOOK_QUESTIONS.find(h => h.topic === activeTopic) || HOOK_QUESTIONS[0];

  // Initialize welcome message based on selected hook
  const getInitialMessagesForTopic = useCallback((topic: IssueTopicId): ChatMessageType[] => {
    const timestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const hook = HOOK_QUESTIONS.find(h => h.topic === topic) || HOOK_QUESTIONS[0];

    return [
      {
        id: `init-${topic}`,
        sender: 'ai',
        text: `Halo, Rekan Calon Pendidik! Saya **Critical Mind AI**, mitra berpikir kritis dan dialektika Anda di Mind Bridge Global.

Dalam perspektif **Critical Pedagogy of Place**, saya tidak bertugas memberikan jawaban instan, melainkan mengajak Anda membedah asumsi, menimbang bukti empiris, dan menelaah konteks sosio-kultural sekolah tempat Anda akan mengabdi.

Mari kita mulai dengan pertanyaan pemantik ini:
**"${hook.question}"**

*Apa analisis awal atau pengamatan Anda mengenai persoalan tersebut?*`,
        timestamp,
        phase: 1,
        phaseName: 'Fase 1: Validasi Premis dan Konteks',
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
    if (newTopic === activeTopic) return;
    setActiveTopic(newTopic);
  };

  const handleResetSession = () => {
    setMessages(getInitialMessagesForTopic(activeTopic));
    setCurrentPhase(1);
    setActiveScoreCard(null);
    showToast('Sesi dialektika telah diperbarui.', 'info');
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isStreaming) return;

    // Check Quota Limit
    const canRequest = AILimitService.canMakeRequest(isAuthenticated, user?.id);
    if (!canRequest) {
      if (!isAuthenticated) {
        openAuthModal(
          'Anda telah mencapai batas 3 pertanyaan untuk pengguna anonim. Masuk dengan akun gratis untuk melanjutkan dialektika kritis tanpa hambatan.',
          '/'
        );
      } else {
        showToast('Anda telah mencapai batas kuota harian. Silakan lanjutkan kembali esok hari.', 'info');
      }
      return;
    }

    const userText = text.trim();
    const userTimestamp = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    // Consume 1 quota point on ACTUAL message dispatch
    const updatedQuota = AILimitService.consumeQuota(isAuthenticated, user?.id);
    setQuotaStatus(updatedQuota);

    // Append user message
    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: userTimestamp
    };

    // Append empty AI placeholder
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
        onComplete: (fullText: string) => {
          setIsStreaming(false);
          setIsTyping(false);

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
                phaseName: 'Fase 4: Kesimpulan dan Skor',
                scoreCard,
                suggestedPrompts: [
                  'Uji nalar di Tes Kasus 15 Soal',
                  'Diskusikan hasil di Ruang Diskusi Guru',
                  'Mulai refleksi baru dengan topik lain'
                ]
              } : m)
            );
            showToast('🎉 Rapor nalar kritis berhasil disusun!', 'success');
          } else {
            setMessages(prev =>
              prev.map(m => m.id === aiMsgId ? {
                ...m,
                phase: nextPhase,
                phaseName: nextPhase === 2 ? 'Fase 2: Penggalian Bukti' : 'Fase 3: Sudut Pandang',
                suggestedPrompts: nextPhase === 2 ? [
                  'Berdasarkan pengamatan di sekolah tempat saya magang...',
                  'Bagaimana jika kita melihat dari perspektif regulasi Kemendikbud?',
                  'Ada faktor relasi kuasa budaya lokal yang memengaruhinya...'
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
    <div className="w-full bg-white rounded-3xl border border-blue-100 shadow-soft-lg overflow-hidden flex flex-col">
      
      {/* TOP HEADER: TOPIC SELECTION TABS & QUOTA COUNTER */}
      <div className="bg-gradient-to-r from-blue-50/90 via-white to-blue-50/70 p-4 sm:p-5 border-b border-blue-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Topic Selectors */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Pilih Fokus Diskusi Kritis:</span>
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleTopicChange('literasi-digital')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTopic === 'literasi-digital'
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                    : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>AI & Literasi Digital</span>
              </button>

              <button
                onClick={() => handleTopicChange('bullying')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTopic === 'bullying'
                    ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-300'
                    : 'bg-white text-slate-700 hover:bg-red-50 border border-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Bullying & Relasi Kuasa</span>
              </button>

              <button
                onClick={() => handleTopicChange('ketimpangan-sosial')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTopic === 'ketimpangan-sosial'
                    ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Ketimpangan Sosial 3T</span>
              </button>
            </div>
          </div>

          {/* Quota Counter Badge & Auth Gate Indicator */}
          <div className="flex items-center gap-3 self-start lg:self-center">
            {quotaStatus.isAnonymous ? (
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white border border-blue-200 shadow-xs">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-slate-800">
                    Sisa Kuota Uji Coba: <span className="text-blue-600 font-black">{quotaStatus.remaining}</span> / {quotaStatus.max}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">Pengguna Anonim</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <div className="text-left">
                  <div className="text-[11px] font-bold text-emerald-900">
                    Akun Calon Guru: <span className="font-black">{user?.name}</span>
                  </div>
                  <div className="text-[10px] text-emerald-700">
                    Sisa Kuota: {quotaStatus.remaining} / {quotaStatus.max}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleResetSession}
              title="Mulai Sesi Baru"
              className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Phase Progress Dialektika */}
        <div className="mt-4 pt-3 border-t border-blue-100/70">
          <PhaseProgress currentPhase={currentPhase} />
        </div>
      </div>

      {/* CHAT MESSAGES STREAMING CONTAINER */}
      <div className={`p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FCFDFF] ${compact ? 'min-h-[360px] max-h-[460px]' : 'min-h-[420px] max-h-[560px]'}`}>
        
        {/* Contextual Hook Sticky Header */}
        <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/60 text-xs flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-blue-950">Fokus Pertanyaan Pemantik:</span>
            <p className="text-slate-700 font-medium italic">"{currentHook.question}"</p>
            <p className="text-[11px] text-slate-500">{currentHook.contextNote}</p>
          </div>
        </div>

        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onSelectPrompt={(prompt) => handleSendMessage(prompt)}
            onViewScoreCard={(score) => setActiveScoreCard(score)}
          />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 text-xs text-slate-500 bg-white rounded-2xl border border-blue-100 shadow-xs w-fit">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
            <span className="font-medium text-slate-600">Critical Mind AI sedang menimbang premis...</span>
          </div>
        )}

      </div>

      {/* BOTTOM ACTION / INPUT AREA */}
      <div className="p-4 sm:p-5 bg-white border-t border-blue-100 space-y-3">
        
        {/* QUOTA EXHAUSTED BANNER (Strict Validator Requirement) */}
        {quotaStatus.isExhausted && quotaStatus.isAnonymous ? (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-blue-50 border-2 border-amber-300 shadow-soft space-y-3">
            <div className="flex items-center gap-2.5 text-amber-900">
              <Lock className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-display font-bold text-sm">
                  Kuota Uji Coba Anonim Selesai (3/3 Pertanyaan)
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Anda telah mencoba Critical Mind AI. Untuk melanjutkan sesi dialektika, menyimpan progres refleksi, dan membuka ruang diskusi calon guru, silakan masuk ke akun Anda.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => openAuthModal('Masuk untuk melanjutkan interaksi tak terbatas dengan Critical Mind AI.', '/')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk Akun Sekarang</span>
              </button>

              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>Daftar Akun Calon Guru</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  AILimitService.resetAnonQuota();
                  showToast('Kuota anonim direset untuk pengujian.', 'info');
                }}
                className="text-[11px] text-slate-400 hover:text-slate-600 underline ml-auto cursor-pointer"
              >
                Reset Kuota (Mode Pengujian)
              </button>
            </div>
          </div>
        ) : (
          /* Normal Input Box */
          <div className="relative bg-slate-50/70 rounded-2xl border border-slate-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
              placeholder={
                currentPhase === 4 
                  ? 'Ketik "selesai" untuk melihat rapor evaluasi nalar kritis Anda...' 
                  : 'Tuliskan argumen, analisis bukti, atau respons Anda terhadap pertanyaan di atas...'
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
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>
            Pendekatan Socratic: AI tidak memberikan jawaban instan, melainkan menstimulasi nalar kritis.
          </span>
          <span className="font-semibold text-blue-600">
            Ketik "selesai" kapan saja untuk meminta skor.
          </span>
        </div>

      </div>

      {/* Scorecard Modal if triggered */}
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
