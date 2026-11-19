import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  BrainCircuit, 
  Compass, 
  Globe2, 
  CheckCircle2, 
  MessageSquare, 
  HelpCircle, 
  Cpu, 
  Award,
  ShieldCheck,
  Zap,
  Users,
  BarChart3,
  Layers
} from 'lucide-react';
import { BatikPattern } from '../components/common/BatikPattern';
import { useAuth } from '../context/AuthContext';
import petaImg from '../assets/peta.png';

export const Home: React.FC = () => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleOpenForum = () => {
    if (!isAuthenticated) {
      openAuthModal('Masuk dengan akun calon guru untuk berpartisipasi aktif dalam Ruang Diskusi.', '/forum');
    } else {
      navigate('/forum');
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#FAFCFF] min-h-screen">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: PENGENALAN & TUJUAN PLATFORM MIND BRIDGE GLOBAL */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-blue-100/60">
        
        {/* Ambient Gradient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-tr from-blue-100/50 via-soft-blue/30 to-cyan-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <BatikPattern opacity={0.04} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
            
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
                <span>Ekosistem Pembelajaran Calon Guru</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-slate-600 font-semibold">Critical Pedagogy of Place</span>
              </div>

              {/* Headline emphasizing AI as thinking partner, NOT teacher replacement */}
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-navy tracking-tight leading-[1.15]">
                AI <span className="underline decoration-blue-500 decoration-wavy decoration-2">Bukan Pengganti Guru</span>, Melainkan Mitra Berpikir Kritis Calon Guru
              </h1>

              {/* Subheadline: Pengenalan integrasi 4 pilar */}
              <p className="text-sm sm:text-base lg:text-lg text-[#172B4D]/85 leading-relaxed font-normal max-w-2xl">
                Mind Bridge Global adalah ekosistem pembelajaran calon guru yang mengintegrasikan Artificial Intelligence berbasis <em>Socratic Questioning</em>, penalaran berpikir kritis, literasi digital etis, dan pendekatan <em>Critical Pedagogy of Place</em> untuk membedah dinamika persekolahan nusantara.
              </p>

              {/* CTAs: Direct navigation to AI Learning & Pilar Ekosistem */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  to="/ai-learning"
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm shadow-soft-lg hover:shadow-blue-glow transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <BrainCircuit className="w-4 h-4 text-cyan-300" />
                  <span>Mulai AI Learning</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/ekosistem"
                  className="px-7 py-3.5 rounded-2xl bg-white hover:bg-blue-50/60 text-navy font-bold text-sm border border-blue-200 shadow-soft hover:border-blue-400 transition-all flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-blue-600" />
                  <span>Jelajahi Pilar Ekosistem</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Key Trust Stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-lg">
                <div>
                  <div className="font-display font-extrabold text-xl lg:text-2xl text-navy">Socratic AI</div>
                  <div className="text-xs text-slate-500 font-medium">4 Fase Dialektika Nalar</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-xl lg:text-2xl text-blue-600">3 Pilar</div>
                  <div className="text-xs text-slate-500 font-medium">Isu Prioritas Nasional</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-xl lg:text-2xl text-emerald-600">Place-Based</div>
                  <div className="text-xs text-slate-500 font-medium">Konteks Sosial Budaya 3T</div>
                </div>
              </div>
            </motion.div>

            {/* HERO RIGHT VISUAL: PETA INDONESIA AI NEURAL NETWORK */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 w-full flex flex-col items-center justify-center"
            >
              <div className="relative w-full bg-gradient-to-tr from-[#0B1E3B] via-[#102A4E] to-[#0D3868] rounded-3xl p-5 sm:p-6 shadow-2xl border border-blue-400/30 overflow-hidden flex flex-col justify-between min-h-[300px]">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between z-10 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase">
                      CRITICAL PEDAGOGY MAP
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                    7 Wilayah Riset
                  </span>
                </div>

                {/* Indonesian Archipelago Neural Graphic */}
                <div className="relative my-auto py-3 select-none flex items-center justify-center">
                  <div className="relative w-full aspect-[2.45/1] max-w-md">
                    <img
                      src={petaImg}
                      alt="Peta Indonesia AI"
                      className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                    />

                    {/* Nodes */}
                    <div className="absolute left-[17%] top-[38%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#38BDF8] animate-pulse" />
                    <div className="absolute left-[36%] top-[76%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#38BDF8]" />
                    <div className="absolute left-[44%] top-[35%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#38BDF8] animate-pulse" />
                    <div className="absolute left-[63%] top-[44%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#38BDF8]" />
                    <div className="absolute left-[90%] top-[48%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#38BDF8] animate-pulse" />
                  </div>
                </div>

                {/* Footer badge */}
                <div className="z-10 mt-2 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-300" />
                    <span>Mitra Nalar Kritis Calon Guru</span>
                  </div>
                  <span className="text-[11px] font-bold text-cyan-300">Siap Digunakan</span>
                </div>
              </div>

              {/* 4 Informasi Button Tepat di Bawah Panel Peta Indonesia */}
              <div className="w-full mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {/* 1. Critical Thinking */}
                <Link
                  to="/critical-thinking-test"
                  className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white border border-blue-100 shadow-2xs hover:border-blue-300 hover:shadow-soft hover:-translate-y-0.5 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:scale-105 transition-transform">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-[11px] sm:text-xs text-navy leading-tight block truncate group-hover:text-blue-600 transition-colors">
                      Critical Thinking
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-tight block truncate mt-0.5">
                      15 Soal Kasus Nyata
                    </span>
                  </div>
                </Link>

                {/* 2. Education Issues */}
                <Link
                  to="/ekosistem"
                  className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white border border-rose-100 shadow-2xs hover:border-rose-300 hover:shadow-soft hover:-translate-y-0.5 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/60 flex items-center justify-center flex-shrink-0 text-rose-600 group-hover:scale-105 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-[11px] sm:text-xs text-navy leading-tight block truncate group-hover:text-rose-600 transition-colors">
                      Education Issues
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-tight block truncate mt-0.5">
                      Bullying, Literasi, 3T
                    </span>
                  </div>
                </Link>

                {/* 3. AI Learning */}
                <Link
                  to="/ai-learning"
                  className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white border border-cyan-100 shadow-2xs hover:border-cyan-300 hover:shadow-soft hover:-translate-y-0.5 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200/60 flex items-center justify-center flex-shrink-0 text-cyan-600 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-[11px] sm:text-xs text-navy leading-tight block truncate group-hover:text-cyan-600 transition-colors">
                      AI Learning
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-tight block truncate mt-0.5">
                      Socratic Questioning
                    </span>
                  </div>
                </Link>

                {/* 4. Indonesia */}
                <Link
                  to="/explore"
                  className="flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white border border-emerald-100 shadow-2xs hover:border-emerald-300 hover:shadow-soft hover:-translate-y-0.5 transition-all text-left group"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center flex-shrink-0 text-emerald-600 group-hover:scale-105 transition-transform">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-[11px] sm:text-xs text-navy leading-tight block truncate group-hover:text-emerald-600 transition-colors">
                      Indonesia
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-tight block truncate mt-0.5">
                      Masa Depan Bangsa
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PENGENALAN INTEGRASI 4 ELEMEN MIND BRIDGE GLOBAL */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Integrasi Kurikulum & Pedagogi
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-navy">
              Fondasi Pembelajaran Calon Guru Masa Depan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Mind Bridge Global memadukan empat pilar utama agar calon pendidik tidak hanya cakap mengoperasikan teknologi, melainkan memiliki kemerdekaan berpikir kritis dan empati sosio-kultural.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: AI & Socratic Questioning */}
            <div className="p-6 rounded-3xl bg-[#FAFCFF] border border-blue-100/80 shadow-xs hover:border-blue-300 hover:shadow-soft transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-navy">
                  Socratic AI Dialectics
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mitra berpikir kritis yang menantang premis awal calon guru, membimbing pembuktian empiris, dan menolak pemberian jawaban instan yang menumpulkan daya analisis.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>4 Fase Nalar Socratic</span>
              </div>
            </div>

            {/* Card 2: Berpikir Kritis */}
            <div className="p-6 rounded-3xl bg-[#FAFCFF] border border-indigo-100/80 shadow-xs hover:border-indigo-300 hover:shadow-soft transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-navy">
                  Penalaran Kritis Calon Guru
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mengembangkan 7 domain nalar kritis mencakup identifikasi bias, verifikasi klaim, pertimbangan etika profesi, serta perumusan solusi pedagogik berbasis data.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Asesmen 15 Soal Studi Kasus</span>
              </div>
            </div>

            {/* Card 3: Literasi Digital Kritis */}
            <div className="p-6 rounded-3xl bg-[#FAFCFF] border border-cyan-100/80 shadow-xs hover:border-cyan-300 hover:shadow-soft transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-navy">
                  Literasi Digital & Etika AI
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Membentengi calon pendidik dari halusinasi AI, plagiarisme terselubung, dan degradasi integritas akademik melalui pemahaman etika informasi mendalam.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-semibold text-cyan-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Integritas Akademik Guru</span>
              </div>
            </div>

            {/* Card 4: Critical Pedagogy of Place */}
            <div className="p-6 rounded-3xl bg-[#FAFCFF] border border-amber-100/80 shadow-xs hover:border-amber-300 hover:shadow-soft transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-navy">
                  Critical Pedagogy of Place
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menumbuhkan kepekaan terhadap realitas geografis sekolah nusantara, kearifan budaya lokal, dan disparitas sarana pendidikan di daerah 3T.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Kontekstual 7 Wilayah 3T</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. RINGKASAN MANFAAT PLATFORM MIND BRIDGE GLOBAL */}
      {/* ========================================================================= */}
      <section className="py-16 bg-gradient-to-b from-[#FAFCFF] via-white to-blue-50/30 border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <span>Nilai Tambah Platform</span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-navy">
                Ringkasan Manfaat bagi Mahasiswa Calon Guru
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mind Bridge Global dirancang bukan sekadar sebagai aplikasi materi bacaan, melainkan arena pelatihan penalaran pra-jabatan sebelum Anda memasuki dunia persekolahan sesungguhnya.
              </p>

              <div className="pt-2 space-y-3">
                <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200">
                  <span className="text-[11px] font-bold text-blue-900 block">Satu Kali Percobaan Gratis Tanpa Akun:</span>
                  <p className="text-xs text-slate-700">
                    Pengunjung baru dapat langsung mencoba satu pertanyaan dialektika bersama Critical Mind AI di halaman AI Learning tanpa perlu registrasi di awal.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-soft space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-sm text-navy">
                  1. Dialektika Terbimbing AI
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menguji asumsi terhadap permasalahan iklim sekolah, perundungan, dan disrupsi AI melalui dialog interaktif yang menantang.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-soft space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-sm text-navy">
                  2. Rapor Capaian 7 Domain
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Memperoleh evaluasi nalar kritis komprehensif untuk mengidentifikasi kekuatan dan area pengembangan profesional calon guru.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-soft space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-sm text-navy">
                  3. Kolaborasi Ruang Diskusi
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Menyambungkan mahasiswa calon pendidik antar universitas untuk bermusyawarah dan merumuskan solusi pendidikan yang adil.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-soft space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-sm text-navy">
                  4. Bank Kasus Wilayah 3T
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Akses langsung data empiris kesenjangan pendidikan nusantara agar tidak terjebak dalam bias sudut pandang perkotaan.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PREVIEW & NAVIGASI CEPAT MENUJU DUA HALAMAN UTAMA */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white border-b border-blue-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Struktur Halaman Utama
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-navy">
              Jelajahi Fitur Inti Mind Bridge Global
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Website ini tersusun atas tiga halaman utama yang terpisah: <strong>Beranda</strong> untuk pengenalan, <strong>AI Learning</strong> untuk berdialog langsung dengan AI, dan <strong>Pilar Ekosistem</strong> untuk telaah materi riset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* CARD A: MENUJU AI LEARNING */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border-2 border-blue-200/90 shadow-soft-lg space-y-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                    <BrainCircuit className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white">
                    1x Coba Gratis
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Halaman Khusus Interaksi
                  </span>
                  <h3 className="font-display font-black text-2xl text-navy mt-1">
                    AI Learning: Critical Mind AI
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Halaman khusus untuk berdialog langsung dengan Critical Mind AI. Diskusikan premis Anda mengenai isu bullying, etika AI, atau pendidikan 3T. Tanpa login, Anda dapat langsung mencoba 1 pertanyaan secara gratis.
                </p>

                <div className="p-3.5 rounded-xl bg-white/80 border border-blue-100 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Fitur di Halaman AI Learning:</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    • Kolom input pertanyaan responsif • Uji coba 1x tanpa akun • Dialog nalar dialektika Socratic • Akses login untuk percakapan mendalam.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/ai-learning"
                  className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>Mulai AI Learning Sekarang</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* CARD B: MENUJU PILAR EKOSISTEM */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-50/70 to-orange-50/40 border-2 border-amber-200/90 shadow-soft-lg space-y-6 flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <Compass className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-600 text-white">
                    3 Pilar Riset
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Halaman Telaah Komprehensif
                  </span>
                  <h3 className="font-display font-black text-2xl text-navy mt-1">
                    Pilar Ekosistem Mind Bridge Global
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Halaman terpisah yang memuat kajian ilmiah tiga pilar penelitian: <em>Bullying & Iklim Sekolah</em>, <em>Literasi Digital & AI</em>, dan <em>Ketimpangan Sosial 3T</em> beserta keterkaitannya dengan 4 Standar Guru Indonesia.
                </p>

                <div className="p-3.5 rounded-xl bg-white/80 border border-amber-100 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Fitur di Halaman Pilar Ekosistem:</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    • Landasan Critical Pedagogy of Place • Data urgensi & studi kasus nyata nusantara • Pemetaan 4 kompetensi guru.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/ekosistem"
                  className="w-full py-3.5 px-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>Jelajahi Pilar Ekosistem</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ALUR BELAJAR CALON GURU TERINTEGRASI */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#FAFCFF] border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Alur Belajar Calon Pendidik</span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-navy">
                Dari Pemikiran Mandiri Menuju Ruang Musyawarah Kolaboratif
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Setelah menguji nalar Anda bersama Critical Mind AI dan mempelajari pilar ekosistem, langkah berikutnya adalah menguji capaian Anda dalam tes 15 soal dan mendiskusikan gagasan tersebut bersama sesama calon guru se-Indonesia.
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900">
                  Pertanyaan Reflektif Calon Guru:
                </span>
                <p className="text-sm font-semibold text-slate-800 italic leading-snug">
                  “Jika kelak Anda ditempatkan di sekolah pedesaan dan menemukan kasus perundungan yang dinormalisasi sebagai 'tradisi senior', bagaimana Anda membangun aliansi dengan guru lain untuk mengubah iklim tersebut?”
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleOpenForum}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Buka Ruang Diskusi Calon Guru</span>
                </button>

                <Link
                  to="/critical-thinking-test"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Ikuti Asesmen 15 Soal</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-[#F2F7FF] rounded-3xl p-6 sm:p-8 border border-blue-200/80 space-y-4">
              <h3 className="font-display font-bold text-lg text-navy">
                4 Tahapan Pembelajaran
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-100">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">1</span>
                  <div className="text-xs">
                    <span className="font-bold text-navy block">Pelajari Pilar Ekosistem</span>
                    <span className="text-slate-500">Pahami konteks sosio-kultural dan keadilan tempat 3T.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-100">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">2</span>
                  <div className="text-xs">
                    <span className="font-bold text-navy block">Coba AI Learning (1x Uji Coba)</span>
                    <span className="text-slate-500">Ajukan 1 pertanyaan bebas tanpa login untuk menguji nalar Socratic.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-100">
                  <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">3</span>
                  <div className="text-xs">
                    <span className="font-bold text-navy block">Masuk Akun & Asesmen 15 Soal</span>
                    <span className="text-slate-500">Buka kuota penuh dialektika dan ukur rapor 7 domain nalar kritis.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-blue-100">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">4</span>
                  <div className="text-xs">
                    <span className="font-bold text-navy block">Kolaborasi di Ruang Diskusi</span>
                    <span className="text-slate-500">Diskusikan solusi nyata bersama rekan mahasiswa calon guru nusantara.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CALL TO ACTION PENUTUP MENUJU AI LEARNING & PILAR EKOSISTEM */}
      {/* ========================================================================= */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-r from-[#0B1E3B] via-[#102A4E] to-[#0D3868] text-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-blue-400/30 relative overflow-hidden">
            <BatikPattern opacity={0.06} />

            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                Langkah Awal Nalar Kritis Anda
              </span>

              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                Siap Menguji Pemikiran Kritis Anda Sebagai Calon Pendidik?
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed font-normal">
                Buka halaman <strong>AI Learning</strong> untuk mencoba interaksi dialektika Socratic bersama Critical Mind AI (1x kesempatan gratis tanpa login), atau telusuri <strong>Pilar Ekosistem</strong> untuk mendalami riset sosio-kultural persekolahan Indonesia.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/ai-learning"
                  className="px-7 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <BrainCircuit className="w-4 h-4 text-slate-950" />
                  <span>Mulai AI Learning</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/ekosistem"
                  className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-cyan-300" />
                  <span>Jelajahi Pilar Ekosistem</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
export default Home;
