import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldAlert, 
  Smartphone, 
  Scale, 
  Target, 
  BrainCircuit, 
  Compass, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  Award
} from 'lucide-react';
import { PILLARS_DATA } from '../data/pillars';
import { BatikPattern } from '../components/common/BatikPattern';
import { IssueTopicId } from '../types';

export const Pillars: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<IssueTopicId>('bullying');

  const selectedPillar = PILLARS_DATA.find(p => p.id === selectedPillarId) || PILLARS_DATA[0];

  const getPillarIcon = (id: IssueTopicId) => {
    switch (id) {
      case 'bullying':
        return <ShieldAlert className="w-6 h-6 text-red-600" />;
      case 'literasi-digital':
        return <Smartphone className="w-6 h-6 text-blue-600" />;
      case 'ketimpangan-sosial':
        return <Scale className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <div className="bg-[#FAFCFF] min-h-screen pb-24 relative overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER BANNER */}
      {/* ========================================================================= */}
      <section className="relative pt-14 pb-16 bg-gradient-to-b from-blue-50/80 via-white to-[#FAFCFF] border-b border-blue-100/70 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-tr from-blue-100/40 via-cyan-50/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
        <BatikPattern opacity={0.04} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100/90 text-blue-800 border border-blue-200">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Pilar Kurikulum & Riset Empiris</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>Critical Pedagogy of Place</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-navy tracking-tight leading-tight">
              Pilar Ekosistem <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Mind Bridge Global</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
              “Tiga pilar esensial yang membedah persoalan riil pendidikan Indonesia: membekali calon guru dengan kepekaan sosio-kultural lokal, nalar etika digital, dan keberpihakan pada keadilan distributif.”
            </p>

            {/* Quick stats ribbon */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                3 Isu Prioritas Nasional
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Integrasi 4 Kompetensi Guru
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                Berbasis Data Riset Wilayah
              </span>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* ========================================================================= */}
        {/* 2. CRITICAL PEDAGOGY OF PLACE EXPLANATION BOX */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-[#0B1E3B] to-[#102A4E] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-400/30 relative overflow-hidden">
          <BatikPattern opacity={0.06} />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-300/30">
                Landasan Filosofis & Pedagogis
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Mengapa Critical Pedagogy of Place?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Pendidikan tidak pernah berlangsung di ruang hampa. Seorang calon guru tidak dapat mengajar anak-anak di kepulauan terluar, kawasan industri perkotaan, maupun pedalaman terisolir dengan metode yang diseragamkan secara kaku.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Critical Pedagogy of Place</strong> (Gruenewald / Paulo Freire) mengajarkan bahwa sekolah harus menjadi ruang pembebasan di mana peserta didik diajak mengenali akar budayanya, memahami relasi kuasa sosial yang membelenggunya, dan merancang solusi nyata bagi kelestarian komunitasnya.
              </p>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                Prinsip Calon Guru MBG:
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span><strong>Place-Conscious:</strong> Peka terhadap konteks ekologis, geografis, dan budaya lokal sekolah.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span><strong>De-Centering Bias:</strong> Menolak anggapan bahwa tolok ukur kota metropolitan adalah satu-satunya standar kecerdasan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span><strong>Transformative Action:</strong> Mendorong murid menjadi agen pemecah masalah bagi lingkungan hidupnya.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. THREE INTERACTIVE PILLAR SELECTOR CARDS */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Pilih Pilar Telaah
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-navy">
                Tiga Pilar Kajian Pendidikan
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Klik pada pilar di bawah ini untuk melihat detail tujuan pembelajaran, studi kasus kontekstual Indonesia, dan keterkaitannya dengan kompetensi calon guru.
            </p>
          </div>

          {/* 3 Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS_DATA.map((pillar) => {
              const isSelected = selectedPillarId === pillar.id;
              return (
                <motion.div
                  key={pillar.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  className={`cursor-pointer rounded-3xl p-6 sm:p-7 transition-all border-2 flex flex-col justify-between relative overflow-hidden ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-soft-lg ring-4 ring-blue-100'
                      : 'bg-white hover:bg-blue-50/30 border-blue-100 shadow-soft'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: pillar.bgLight }}>
                        {getPillarIcon(pillar.id)}
                      </div>
                      <div className="text-right">
                        <span className="font-display font-black text-2xl text-navy">
                          {pillar.urgencyMetric.percentage}%
                        </span>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Urgensi Isu
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: pillar.color }}>
                        {pillar.badge}
                      </span>
                      <h3 className="font-display font-bold text-xl text-navy mt-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold" style={{ color: pillar.color }}>
                    <span>{isSelected ? 'Sedang Ditelaah' : 'Lihat Analisis Mendalam'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* 4. ACTIVE PILLAR DEEP DIVE SECTION */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl border border-blue-200 shadow-soft-lg p-6 sm:p-8 lg:p-10 space-y-10">
            
            {/* Pillar Header Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: selectedPillar.bgLight, color: selectedPillar.color }}>
                  {getPillarIcon(selectedPillar.id)}
                  <span>{selectedPillar.badge}</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-navy">
                  {selectedPillar.title}
                </h3>
                <p className="text-sm font-semibold text-slate-500">
                  {selectedPillar.subtitle}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/ai-learning"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2"
                >
                  <BrainCircuit className="w-4 h-4" />
                  <span>Dialog Dialektika AI</span>
                </Link>

                <Link
                  to={selectedPillar.actionLinks.testRoute}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-navy font-bold text-xs border border-slate-300 transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Ikuti Tes 15 Soal</span>
                </Link>
              </div>
            </div>

            {/* Critical Pedagogy of Place Narrative */}
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-blue-900 uppercase tracking-wider">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Perspektif Critical Pedagogy of Place</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {selectedPillar.placeContext}
              </p>
            </div>

            {/* 2-Columns: Learning Objectives & Contextual Problem in Indonesia */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Learning Objectives */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>Tujuan Pembelajaran Calon Guru</span>
                </div>
                <h4 className="font-display font-bold text-lg text-navy">
                  Kompetensi Nalar yang Ditargetkan
                </h4>

                <div className="space-y-3">
                  {selectedPillar.learningObjectives.map((obj, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                        {obj}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Contextual Case in Indonesia */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-red-500" />
                  <span>Contoh Permasalahan Kontekstual di Indonesia</span>
                </div>
                <h4 className="font-display font-bold text-lg text-navy">
                  {selectedPillar.contextualCase.headline}
                </h4>

                <div className="p-5 rounded-2xl bg-[#FFFBF8] border border-amber-200/90 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-[11px] font-bold">
                    <span>Lokasi Kasus:</span>
                    <span className="font-medium text-slate-700">{selectedPillar.contextualCase.locationExample}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {selectedPillar.contextualCase.problemDescription}
                  </p>

                  <div className="pt-2 border-t border-amber-200/60">
                    <div className="text-[11px] font-bold text-amber-900 uppercase">
                      Pertanyaan Reflektif Calon Guru:
                    </div>
                    <p className="text-xs text-slate-800 italic font-medium mt-1">
                      "{selectedPillar.contextualCase.reflectionPrompt}"
                    </p>
                  </div>
                </div>

                {/* Key Empirical Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {selectedPillar.urgencyMetric.stats.map((st, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <div className="font-display font-extrabold text-lg text-navy">
                        {st.value}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* Connection to 4 Teacher Competencies (Standar Nasional Pendidik) */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Keterkaitan dengan Pengembangan 4 Kompetensi Guru</span>
              </div>
              <h4 className="font-display font-bold text-lg text-navy">
                Dampak terhadap Profil Pendidik Profesional
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedPillar.competencies.map((comp, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100/80 space-y-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-blue-600 text-white">
                      Kompetensi {comp.domain}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed pt-1">
                      {comp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. NAVIGATION BACK TO AI & EXPLORATION */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-cyan-200">
              Langkah Selanjutnya
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Siap Menguji Pemikiran Kritis Anda?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              Diskusikan premis Anda langsung dengan Socratic AI di Halaman AI Learning atau uji nalar Anda dalam modul 15 soal studi kasus nyata.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            <Link
              to="/ai-learning"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-blue-50 text-blue-800 font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <BrainCircuit className="w-4 h-4 text-blue-600" />
              <span>Buka AI Learning</span>
            </Link>

            <Link
              to="/critical-thinking-test"
              className="px-6 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Mulai Tes 15 Soal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
