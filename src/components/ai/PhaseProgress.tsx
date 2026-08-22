import React from 'react';
import { SocraticPhase } from '../../types';
import { CheckCircle2, Circle, Sparkles, Brain, Award } from 'lucide-react';

interface PhaseProgressProps {
  currentPhase: SocraticPhase;
}

export const PhaseProgress: React.FC<PhaseProgressProps> = ({ currentPhase }) => {
  const phases = [
    { num: 1, title: 'Validasi & Eksplorasi', desc: 'Pemetaan logika argumen awal' },
    { num: 2, title: 'Penggalian Bukti', desc: 'Uji landasan data & asumsi' },
    { num: 3, title: 'Sudut Pandang', desc: 'Dialektika kontra-perspektif' },
    { num: 4, title: 'Konklusi & Skor', desc: 'Evaluasi nalar kritis 0-100' },
  ];

  return (
    <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-blue-100 shadow-sm">
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {phases.map((p, idx) => {
          const isDone = currentPhase > p.num;
          const isCurrent = currentPhase === p.num;

          return (
            <React.Fragment key={p.num}>
              <div className="flex items-center gap-2.5 min-w-fit">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md scale-105'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                  ) : (
                    p.num
                  )}
                </div>

                <div className="hidden md:block">
                  <div className={`text-xs font-bold leading-none ${isCurrent ? 'text-blue-600' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                    {p.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {p.desc}
                  </div>
                </div>
              </div>

              {idx < phases.length - 1 && (
                <div
                  className={`flex-1 h-[2px] min-w-[12px] sm:min-w-[24px] mx-1 transition-colors ${
                    isDone ? 'bg-emerald-400' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
