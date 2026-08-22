import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  BrainCircuit, 
  Compass, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Users, 
  Globe2, 
  CheckCircle2,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { BatikPattern } from '../components/common/BatikPattern';
import { ISSUES_DATA } from '../data/issues';

export const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#FAFCFF]">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        
        {/* Ambient Gradient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-tr from-blue-100/50 via-soft-blue/30 to-cyan-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <BatikPattern opacity={0.04} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* HERO LEFT TEXT */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200 text-blue-700 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                <span>Modern EdTech + Socratic AI Platform</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-slate-500 font-medium">Indonesia 2026</span>
              </div>

              {/* Title */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-navy tracking-tight leading-[1.12]">
                Mind Bridge <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">Global</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg lg:text-xl text-[#172B4D]/80 leading-relaxed font-normal max-w-2xl">
                “Kaji isu pendidikan nasional secara interaktif, latih nalar kritis dengan pendekatan Socratic AI, suarakan aspirasi secara aman, dan bangun jembatan masa depan pendidikan Indonesia.”
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  to="/explore"
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm shadow-soft-lg hover:shadow-blue-glow transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Mulai Eksplorasi</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/critical-mind-ai"
                  className="px-7 py-3.5 rounded-2xl bg-white hover:bg-blue-50/60 text-navy font-bold text-sm border border-blue-200 shadow-soft hover:border-blue-400 transition-all flex items-center justify-center gap-2"
                >
                  <BrainCircuit className="w-4 h-4 text-blue-600" />
                  <span>Coba Critical Mind AI</span>
                </Link>
              </div>

              {/* Key Trust Stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg">
                <div>
                  <div className="font-display font-extrabold text-xl lg:text-2xl text-navy">7 Wilayah</div>
                  <div className="text-xs text-slate-500 font-medium">Peta Isu Nusantara</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-xl lg:text-2xl text-blue-600">4 Fase</div>
                  <div className="text-xs text-slate-500 font-medium">Socratic Dialektika</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-xl lg:text-2xl text-emerald-600">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Privasi Terproteksi</div>
                </div>
              </div>
            </motion.div>

            {/* HERO RIGHT VISUAL (3D Indonesia Map Illustration + Floating Badges) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              {/* Main Visual Container Card */}
              <div className="relative w-full max-w-md aspect-square bg-gradient-to-tr from-navy via-[#123055] to-blue-900 rounded-3xl p-6 shadow-2xl border border-blue-400/30 overflow-hidden flex flex-col justify-between">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-cyan-300 tracking-wide uppercase">
                      AI Neural Education Map
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full">
                    Live Nodes
                  </span>
                </div>

                {/* Center 3D Indonesian Archipelago with Neural Connection Lines */}
                <div className="relative my-auto py-2 select-none flex items-center justify-center">
                  <div className="relative w-full aspect-[2.45/1] max-w-sm">
                    {/* Authentic Map Graphic */}
                    <img
                      src="/peta.png"
                      alt="Peta Indonesia AI"
                      className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                    />

                    {/* SVG Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <path d="M 17% 38% Q 26% 56% 36% 76%" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                      <path d="M 36% 76% Q 40% 50% 44% 35%" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                      <path d="M 44% 35% Q 54% 40% 63% 44%" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                      <path d="M 63% 44% Q 70% 44% 77% 44%" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                      <path d="M 77% 44% Q 84% 46% 90% 48%" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                      <path d="M 36% 76% Q 48% 80% 60% 84%" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
                    </svg>

                    {/* Glowing AI Pulse Nodes on Key Regions */}
                    <div className="absolute left-[17%] top-[38%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#38BDF8] animate-pulse" />
                    <div className="absolute left-[36%] top-[76%] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_15px_#38BDF8] animate-ping" />
                    <div className="absolute left-[36%] top-[76%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#38BDF8]" />
                    <div className="absolute left-[44%] top-[35%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#38BDF8] animate-pulse" />
                    <div className="absolute left-[63%] top-[44%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#38BDF8]" />
                    <div className="absolute left-[60%] top-[84%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#38BDF8]" />
                    <div className="absolute left-[77%] top-[44%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#38BDF8]" />
                    <div className="absolute left-[90%] top-[48%] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_15px_#38BDF8] animate-pulse" />
                  </div>
                </div>

                {/* Visual Footer */}
                <div className="z-10 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-300" />
                    <span>Socratic Engine v2.4</span>
                  </div>
                  <span className="font-semibold text-cyan-300">Active</span>
                </div>
              </div>

              {/* FLOATING CARD 1: CRITICAL THINKING */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-soft-lg border border-blue-100 flex items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <BrainCircuit className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-navy">Critical Thinking</div>
                  <div className="text-[10px] text-slate-500 font-medium">15 Soal Kasus Nyata</div>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: AI LEARNING */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-soft-lg border border-blue-100 flex items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-navy">AI Learning</div>
                  <div className="text-[10px] text-slate-500 font-medium">Socratic Questioning</div>
                </div>
              </motion.div>

              {/* FLOATING CARD 3: EDUCATION ISSUES */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-3 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-soft-lg border border-blue-100 flex items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-navy">Education Issues</div>
                  <div className="text-[10px] text-slate-500 font-medium">Bullying, Literasi, 3T</div>
                </div>
              </motion.div>

              {/* FLOATING CARD 4: INDONESIA */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-soft-lg border border-blue-100 flex items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Globe2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-navy">Indonesia</div>
                  <div className="text-[10px] text-slate-500 font-medium">Masa Depan Bangsa</div>
                </div>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THREE CORE FEATURES SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-y border-blue-100/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy">
              Pilar Ekosistem Mind Bridge
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Tiga pilar terintegrasi yang menghubungkan riset data, penalaran dialektika, dan partisipasi demokratis pendidikan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* FEATURE CARD 1: EKSPLORASI ISU */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-[#FAFCFF] rounded-3xl p-8 border border-blue-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <Compass className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-display font-bold text-2xl text-navy">
                  Eksplorasi Isu
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  “Pelajari berbagai persoalan pendidikan Indonesia berdasarkan wilayah dan topik.”
                </p>
                <ul className="space-y-2 text-xs text-slate-500 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    Peta 3D Interaktif 7 Wilayah
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    Jurnal & Referensi Penelitian Teruji
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/explore"
                  className="w-full py-3 px-5 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <span>Buka Eksplorasi & Jurnal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* FEATURE CARD 2: CRITICAL MIND AI */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-gradient-to-b from-[#F3F8FF] to-white rounded-3xl p-8 border-2 border-blue-300 shadow-soft-lg transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Highlight Tag */}
              <div className="absolute top-4 right-4 px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white shadow-xs">
                FEATURE UTAMA
              </div>

              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl text-navy">
                  Critical Mind AI
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  “Latih kemampuan berpikir kritis melalui metode Socratic Questioning.”
                </p>
                <ul className="space-y-2 text-xs text-slate-500 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    4 Fase Socratic Dialectic Flow
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    Skor Nalar Kritis & Rekomendasi
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/critical-mind-ai"
                  className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
                >
                  <span>Mulai Dialog Socratic AI</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* FEATURE CARD 3: RUANG ASPIRASI */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-[#FAFCFF] rounded-3xl p-8 border border-blue-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="font-display font-bold text-2xl text-navy">
                  Ruang Aspirasi
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  “Sampaikan gagasan, kritik, dan pengalaman pendidikan secara aman dan anonim.”
                </p>
                <ul className="space-y-2 text-xs text-slate-500 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ID Anonim Otomatis (MBG-ANON-XXXX)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Suara Nyata Tanpa Ancaman Identitas
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/aspirasi"
                  className="w-full py-3 px-5 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-800 group-hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <span>Suarakan Aspirasi Aman</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. VISUAL METAPHOR: THE BRIDGE */}
      {/* ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-navy to-[#0A1B32] text-white relative overflow-hidden">
        <BatikPattern opacity={0.06} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
              Konsep Visual Metaphor
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Membangun Jembatan Nalar Indonesia
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Mind Bridge menghubungkan lima simpul esensial untuk transformasi pendidikan yang berkeadilan dan berwawasan ilmiah.
            </p>
          </div>

          {/* 5-Step Bridge Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Education', desc: 'Identifikasi persoalan riil dan data empiris persekolahan.' },
              { step: '02', title: 'AI Dialogue', desc: 'Debat dialektika berstruktur Socratic Questioning.' },
              { step: '03', title: 'Critical Thinking', desc: 'Dekonstruksi bias, verifikasi bukti, dan evaluasi argumen.' },
              { step: '04', title: 'Community', desc: 'Kolaborasi lintas ruang diskusi & advokasi aspirasi.' },
              { step: '05', title: 'Future Indonesia', desc: 'Terwujudnya ekosistem pendidikan yang kritis dan humanis.' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-cyan-400/40 transition-all group"
              >
                <div className="font-display font-extrabold text-2xl text-cyan-400 mb-2">
                  {item.step}
                </div>
                <h4 className="font-display font-bold text-lg text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Interconnected CTA Banner */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-blue-600/30 via-cyan-600/20 to-blue-600/30 border border-blue-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display font-bold text-xl text-white">
                Siap menguji kemampuan nalar kritismu sekarang?
              </h4>
              <p className="text-xs sm:text-sm text-blue-100 mt-1">
                Ikuti tes berbasis studi kasus 15 soal dan temukan profil berpikir kritismu.
              </p>
            </div>
            <Link
              to="/critical-thinking-test"
              className="px-6 py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all flex-shrink-0"
            >
              <span>Mulai Tes Critical Thinking</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};
