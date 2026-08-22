import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  RotateCcw, 
  MessageSquare, 
  Clock, 
  HelpCircle, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUESTIONS_DATA } from '../data/questions';
import { IssueTopicId, Question, TestResult, CriticalThinkingLevel, DomainScore, CriticalThinkingDomain } from '../types';
import { StorageService } from '../services/storageService';
import { useToast } from '../context/ToastContext';

export const TestSession: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const validTopic = (topic === 'bullying' || topic === 'literasi-digital' || topic === 'ketimpangan-sosial')
    ? (topic as IssueTopicId)
    : 'bullying';

  const topicQuestions = React.useMemo(() => {
    return QUESTIONS_DATA.filter(q => q.topic === validTopic);
  }, [validTopic]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [confirmSubmitModal, setConfirmSubmitModal] = useState<boolean>(false);

  const currentQuestion: Question | undefined = topicQuestions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const totalCount = topicQuestions.length;

  const topicTitles: Record<IssueTopicId, string> = {
    'bullying': 'Bullying & Iklim Sekolah',
    'literasi-digital': 'Literasi Digital & Etika Informasi',
    'ketimpangan-sosial': 'Ketimpangan Sosial & Akses 3T'
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const calculateResult = () => {
    let correct = 0;
    const domainMap: Record<CriticalThinkingDomain, { correct: number; total: number }> = {
      'Memahami Masalah': { correct: 0, total: 0 },
      'Evaluasi Bukti': { correct: 0, total: 0 },
      'Fakta vs Opini': { correct: 0, total: 0 },
      'Evaluasi Argumen': { correct: 0, total: 0 },
      'Sudut Pandang': { correct: 0, total: 0 },
      'Inferensi': { correct: 0, total: 0 },
      'Pengambilan Keputusan': { correct: 0, total: 0 }
    };

    topicQuestions.forEach((q, idx) => {
      const userAns = selectedAnswers[idx];
      const isCorrect = userAns === q.correctAnswer;
      if (isCorrect) correct++;

      if (domainMap[q.category]) {
        domainMap[q.category].total += 1;
        if (isCorrect) domainMap[q.category].correct += 1;
      }
    });

    const score = Math.round((correct / totalCount) * 100);

    let level: CriticalThinkingLevel = 'Needs Development';
    if (score >= 81) level = 'Advanced Critical Thinker';
    else if (score >= 61) level = 'Critical Thinker';
    else if (score >= 41) level = 'Developing';

    const domainScores: DomainScore[] = Object.entries(domainMap).map(([dom, data]) => ({
      domain: dom as CriticalThinkingDomain,
      correct: data.correct,
      total: data.total,
      percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
    }));

    // Strengths and weaknesses based on domain performance
    const sortedDomains = [...domainScores].sort((a, b) => b.percentage - a.percentage);
    const topDomains = sortedDomains.slice(0, 2).map(d => d.domain);
    const lowestDomains = sortedDomains.slice(-2).map(d => d.domain);

    const strengths = [
      `Memiliki ketajaman tinggi pada domain: ${topDomains.join(' & ')}.`,
      'Mampu mengidentifikasi asumsi tersembunyi dalam narasi studi kasus kebijakan.',
      'Menunjukkan konsistensi logika dalam penalaran deduktif.'
    ];

    const weaknesses = [
      `Perlu penguatan lebih lanjut pada domain: ${lowestDomains.join(' & ')}.`,
      'Perhatikan pembedaan antara klaim data statistik terverifikasi vs pernyataan moralistis.'
    ];

    const recommendations = [
      `Kaji artikel penelitian terkait ${topicTitles[validTopic]} di menu Eksplorasi & Jurnal.`,
      'Latih penalaran dialektika melalui simulasi Socratic AI untuk menguji bias kognitif.',
      'Bergabunglah di Forum Diskusi untuk bertukar pandangan dengan para praktisi dan pendidik.'
    ];

    const result: TestResult = {
      id: `test-${Date.now()}`,
      topic: validTopic,
      topicTitle: topicTitles[validTopic],
      score,
      level,
      totalQuestions: totalCount,
      correctAnswers: correct,
      domainScores,
      strengths,
      weaknesses,
      recommendations,
      completedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    StorageService.saveTestResult(result);
    setTestResult(result);
    setIsSubmitted(true);
    setConfirmSubmitModal(false);

    // Confetti effect
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}

    showToast('Tes berhasil diselesaikan! Rapor Anda telah tersimpan.', 'success');
  };

  const handleRetakeTest = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsSubmitted(false);
    setTestResult(null);
    setShowReview(false);
  };

  if (!currentQuestion && !isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <p className="text-slate-600 font-bold">Modul soal tidak ditemukan.</p>
          <Link to="/critical-thinking-test" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
            Kembali ke Daftar Tes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFCFF] min-h-screen pb-20">
      
      {/* ========================================================================= */}
      {/* RESULT SCREEN */}
      {/* ========================================================================= */}
      {isSubmitted && testResult ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
          
          {/* TOP RESULT CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 lg:p-10 border border-blue-100 shadow-soft-lg text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Rapor Skor Critical Thinking</span>
            </div>

            <div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-navy">
                Hasil Asesmen: {testResult.topicTitle}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Diselesaikan pada {testResult.completedAt} • 15 Soal Studi Kasus
              </p>
            </div>

            {/* GAUGE SCORE CIRCLE */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#E2E8F0"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={testResult.score >= 80 ? '#10B981' : testResult.score >= 60 ? '#3B82F6' : '#F59E0B'}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * testResult.score) / 100}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * testResult.score) / 100 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display font-black text-4xl text-navy">
                    {testResult.score}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {testResult.correctAnswers} / {testResult.totalQuestions} Benar
                  </span>
                </div>
              </div>

              {/* LEVEL BADGE */}
              <div className="mt-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                  testResult.level === 'Advanced Critical Thinker'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : testResult.level === 'Critical Thinker'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  Level: {testResult.level}
                </span>
              </div>
            </div>

            {/* DOMAIN SCORES BREAKDOWN */}
            <div className="text-left bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-4">
              <h3 className="font-display font-bold text-sm text-navy uppercase tracking-wider">
                Analisis Capaian 7 Domain Kompetensi
              </h3>

              <div className="space-y-3">
                {testResult.domainScores.map((ds, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{ds.domain} ({ds.correct}/{ds.total})</span>
                      <span className="font-bold text-blue-700">{ds.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${ds.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STRENGTHS AND WEAKNESSES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Kekuatan Nalar Teridentifikasi
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {testResult.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Area Pengembangan Nalar
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {testResult.weaknesses.map((wk, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{wk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowReview(!showReview)}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-navy font-bold text-xs border border-slate-300 shadow-xs transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>{showReview ? 'Sembunyikan Kunci Jawaban' : 'Tinjau Pembahasan 15 Soal'}</span>
              </button>

              <button
                onClick={handleRetakeTest}
                className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Tes</span>
              </button>

              <Link
                to="/forum"
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Bagikan Perspektif di Forum</span>
              </Link>
            </div>

          </motion.div>

          {/* ========================================================================= */}
          {/* ANSWER REVIEW ACCORDION LIST */}
          {/* ========================================================================= */}
          <AnimatePresence>
            {showReview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xl text-navy">
                    Tinjauan & Pembahasan Kasus
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">15 Soal Lengkap</span>
                </div>

                {topicQuestions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className={`p-6 rounded-2xl border bg-white shadow-soft space-y-4 ${
                        isCorrect ? 'border-emerald-200' : 'border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400">Soal {idx + 1}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            {q.category}
                          </span>
                        </div>

                        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                          {isCorrect ? 'Jawaban Tepat' : 'Kurang Tepat'}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 text-xs text-slate-700 italic border border-slate-200/70">
                        “{q.caseStudy}”
                      </div>

                      <div className="font-semibold text-sm text-navy">
                        {q.question}
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isUserChoice = userAns === optIdx;
                          const isCorrectOption = q.correctAnswer === optIdx;

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-xl text-xs flex items-center justify-between border ${
                                isCorrectOption
                                  ? 'bg-emerald-50 text-emerald-950 border-emerald-300 font-bold'
                                  : isUserChoice
                                  ? 'bg-rose-50 text-rose-950 border-rose-300 font-medium'
                                  : 'bg-white text-slate-600 border-slate-200'
                              }`}
                            >
                              <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                              {isCorrectOption && <span className="text-emerald-600 text-[11px] font-bold">Kunci Jawaban ✓</span>}
                              {isUserChoice && !isCorrectOption && <span className="text-rose-600 text-[11px] font-bold">Pilihan Anda ✗</span>}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-950 space-y-1">
                        <span className="font-bold text-blue-700 block">💡 Landasan Nalar Kritis:</span>
                        <p>{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      ) : (
        /* ========================================================================= */
        /* QUESTION ENGINE INTERFACE */
        /* ========================================================================= */
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          
          {/* HEADER NAV & PROGRESS */}
          <div className="flex items-center justify-between">
            <Link
              to="/critical-thinking-test"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Keluar dari Tes</span>
            </Link>

            <div className="text-right">
              <span className="text-xs font-bold text-navy">
                Soal {currentIndex + 1} dari {totalCount}
              </span>
              <span className="block text-[10px] text-slate-400 font-medium">
                {answeredCount} Terjawab
              </span>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <motion.div
              className="bg-blue-600 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* QUESTION SELECTOR CHIPS */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {topicQuestions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold flex-shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-navy text-white ring-4 ring-blue-100 shadow-md'
                      : isAnswered
                      ? 'bg-blue-100 text-blue-800 font-extrabold border border-blue-300'
                      : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* MAIN QUESTION CARD */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-soft-lg space-y-6"
          >
            {/* Category & Topic Badges */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                {currentQuestion.category}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {topicTitles[validTopic]}
              </span>
            </div>

            {/* Case Study Section */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Studi Kasus Nyata:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {currentQuestion.caseStudy}
              </p>
            </div>

            {/* Question Text */}
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-navy leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            {/* 4 Options Choices */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 border-2 ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-bold shadow-soft ring-4 ring-blue-100'
                        : 'bg-white hover:bg-blue-50/30 border-slate-200 text-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* BOTTOM CONTROLS */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs transition-all flex items-center gap-2 disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentIndex < totalCount - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(totalCount - 1, prev + 1))}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Selanjutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setConfirmSubmitModal(true)}
                className="px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kumpulkan & Lihat Skor</span>
              </button>
            )}
          </div>

        </div>
      )}

      {/* CONFIRM SUBMIT MODAL */}
      <AnimatePresence>
        {confirmSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-blue-100 space-y-5 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl text-navy">
                  Kumpulkan Jawaban Tes?
                </h3>
                <p className="text-xs text-slate-500">
                  Anda telah menjawab <strong>{answeredCount}</strong> dari <strong>{totalCount}</strong> soal.
                </p>
                {answeredCount < totalCount && (
                  <p className="text-xs text-amber-600 font-semibold bg-amber-50 p-2 rounded-xl border border-amber-200 mt-2">
                    ⚠️ Masih ada {totalCount - answeredCount} soal yang belum Anda jawab.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setConfirmSubmitModal(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Periksa Lagi
                </button>
                <button
                  onClick={calculateResult}
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                >
                  Ya, Kumpulkan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
