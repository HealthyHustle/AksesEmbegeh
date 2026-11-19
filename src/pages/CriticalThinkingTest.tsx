import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  ShieldAlert, 
  Smartphone, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Layers, 
  Target,
  FileQuestion
} from 'lucide-react';
import { BatikPattern } from '../components/common/BatikPattern';
import { CriticalThinkingDomain } from '../types';

export const CriticalThinkingTest: React.FC = () => {
  const domains: { name: CriticalThinkingDomain; desc: string }[] = [
    { name: 'Memahami Masalah', desc: 'Identifikasi akar persoalan struktural vs gejala permukaan.' },
    { name: 'Evaluasi Bukti', desc: 'Menilai validitas data empiris, metodologi, dan sumber klaim.' },
    { name: 'Fakta vs Opini', desc: 'Memisahkan data terukur dari penilaian nilai moralistis subjektif.' },
    { name: 'Evaluasi Argumen', desc: 'Mendeteksi logical fallacies dan konsistensi premis silogisme.' },
    { name: 'Sudut Pandang', desc: 'Menganalisis motif pemangku kepentingan dan empati sosial.' },
    { name: 'Inferensi', desc: 'Menarik kesimpulan logis yang valid dari premis awal yang terbukti.' },
    { name: 'Pengambilan Keputusan', desc: 'Memilih intervensi proporsional berbasis keadilan distributif.' }
  ];

  return (
    <div className="bg-[#FAFCFF] min-h-screen pb-24">
      
      {/* HERO SECTION */}
      <section className="relative pt-14 pb-16 bg-gradient-to-b from-blue-50/80 via-white to-[#FAFCFF] border-b border-blue-100/70 overflow-hidden">
        <BatikPattern opacity={0.04} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100/90 text-blue-800 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Asesmen Penalaran Berbasis Studi Kasus</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-navy tracking-tight">
            TES KEMAMPUAN CRITICAL THINKING
          </h1>

          <p className="font-display font-bold text-lg sm:text-xl text-blue-600">
            “Seberapa kritis cara kamu memahami sebuah masalah?”
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Tes ini mengukur kemampuan Anda dalam memahami masalah, mengidentifikasi bukti, membedakan fakta dan opini, mengevaluasi argumen, melihat perspektif berbeda, menarik kesimpulan, dan membuat keputusan berbasis informasi.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* ========================================================================= */}
        {/* ISSUE SELECTION CARDS */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Pilih Modul Studi Kasus
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy">
              3 Modul Asesmen Kasus Pendidikan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Setiap modul memuat 15 soal kasus nyata yang dirancang khusus untuk menguji kedalaman penalaran Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CARD 01: BULLYING */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-red-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-red-600 tracking-wider">
                    01. Bullying
                  </span>
                  <span className="text-2xl">🤜</span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-red-600" />
                </div>

                <h3 className="font-display font-bold text-xl text-navy">
                  Bullying & Iklim Sekolah
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                  15 Soal Studi Kasus Perundungan & Cyberbullying di Satuan Pendidikan.
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    <span>Relasi Kuasa & Bystander Effect</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    <span>Evaluasi Bukti Iklim Keamanan</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to="/critical-thinking-test/bullying"
                  className="w-full py-3.5 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/20 group-hover:scale-[1.02]"
                >
                  <span>Mulai Tes Bullying</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* CARD 02: LITERASI DIGITAL */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border-2 border-blue-400 shadow-soft-lg hover:shadow-blue-glow transition-all flex flex-col justify-between group relative overflow-hidden ring-4 ring-blue-50"
            >
              <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                POPULER
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-blue-600 tracking-wider">
                    02. Literasi Digital
                  </span>
                  <span className="text-2xl">📱</span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>

                <h3 className="font-display font-bold text-xl text-navy">
                  Literasi Digital & Etika
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                  15 Soal Studi Kasus Evaluasi Informasi, Hoaks, & Etika Ruang Digital.
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                    <span>Lateral Reading & Deepfake AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                    <span>Bias Konfirmasi & Filter Bubble</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to="/critical-thinking-test/literasi-digital"
                  className="w-full py-3.5 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 group-hover:scale-[1.02]"
                >
                  <span>Mulai Tes Literasi</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* CARD 03: KETIMPANGAN SOSIAL */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-amber-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-600 tracking-wider">
                    03. Ketimpangan Sosial
                  </span>
                  <span className="text-2xl">⚖️</span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-amber-600" />
                </div>

                <h3 className="font-display font-bold text-xl text-navy">
                  Ketimpangan & Akses 3T
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                  15 Soal Studi Kasus Kesenjangan Akses & Kualitas Pendidikan 3T.
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Keadilan Distributif (Equity vs Equality)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Retensi Guru & Kurikulum Kontekstual</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  to="/critical-thinking-test/ketimpangan-sosial"
                  className="w-full py-3.5 px-5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20 group-hover:scale-[1.02]"
                >
                  <span>Mulai Tes Ketimpangan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7 COGNITIVE DOMAINS OVERVIEW */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-3xl p-8 lg:p-10 border border-blue-100 shadow-soft space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Rubrik Penilaian Standar
            </span>
            <h2 className="font-display font-bold text-2xl text-navy">
              7 Domain Kompetensi Nalar Kritis
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Setiap jawaban yang Anda pilih dievaluasi ke dalam tujuh pilar metakognitif untuk menghasilkan diagnosis belajar yang akurat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {domains.map((dom, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-navy">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{dom.name}</span>
                </div>
                <p className="text-xs text-slate-600 leading-snug pl-7">
                  {dom.desc}
                </p>
              </div>
            ))}

            {/* Level Standard Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-navy to-blue-900 text-white space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-cyan-300 uppercase">4 Tingkat Level:</div>
                <div className="text-[11px] text-slate-200 mt-1 space-y-0.5">
                  <div>• 81–100: Advanced Critical Thinker</div>
                  <div>• 61–80: Critical Thinker</div>
                  <div>• 41–60: Developing</div>
                  <div>• 0–40: Needs Development</div>
                </div>
              </div>
              <div className="text-[10px] text-blue-200 italic">Dilengkapi rekomendasi personal</div>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
};
