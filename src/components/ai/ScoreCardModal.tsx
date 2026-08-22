import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, RotateCcw, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SocraticScore, IssueTopicId } from '../../types';
import { Link } from 'react-router-dom';

interface ScoreCardModalProps {
  scoreCard: SocraticScore | null;
  topic: IssueTopicId;
  onClose: () => void;
  onReset: () => void;
}

export const ScoreCardModal: React.FC<ScoreCardModalProps> = ({
  scoreCard,
  topic,
  onClose,
  onReset
}) => {
  useEffect(() => {
    if (scoreCard) {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn('Confetti effect unavailable', e);
      }
    }
  }, [scoreCard]);

  if (!scoreCard) return null;

  const topicTestRoute = `/critical-thinking-test/${topic}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden my-8"
        >
          {/* TOP BANNER */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-navy p-6 sm:p-8 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Tutup modal evaluasi"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-cyan-300" />
              Lembar Evaluasi Nalar Dialektika
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Critical Thinking Scorecard
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-md">
              Hasil analisis penalaran Anda menggunakan kerangka Socratic Questioning.
            </p>

            {/* SCORE BADGE */}
            <div className="mt-6 flex flex-wrap items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-cyan-300">
                  {scoreCard.score}
                </span>
                <span className="text-sm font-semibold text-blue-200">/ 100</span>
              </div>

              <div className="h-10 w-[1px] bg-white/20 hidden sm:block" />

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cyan-400 text-slate-950">
                  {scoreCard.level}
                </span>
                <div className="text-[11px] text-blue-100 mt-1">
                  Penguasaan dialektika argumentasi & sintesis
                </div>
              </div>
            </div>
          </div>

          {/* MODAL CONTENT */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            
            {/* Reasoning Summary */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Ringkasan Penalaran (Reasoning Summary)
              </h4>
              <p className="text-sm text-slate-700 bg-blue-50/50 p-4 rounded-2xl border border-blue-100 leading-relaxed italic">
                “{scoreCard.reasoningSummary}”
              </p>
            </div>

            {/* Strengths and Weaknesses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Strengths */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Kekuatan Nalar Anda
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {scoreCard.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses / Area for Growth */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Peluang Pendalaman
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {scoreCard.weaknesses.map((wk, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{wk}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Recommendations */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                Rekomendasi Langkah Nyata
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {scoreCard.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-snug">
                    <span className="w-4 h-4 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* FOOTER ACTIONS */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => {
                onReset();
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Mulai Sesi AI Baru
            </button>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <Link
                to={topicTestRoute}
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Uji di Tes 15 Soal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
