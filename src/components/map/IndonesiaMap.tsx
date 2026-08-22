import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, BookOpen, ShieldAlert, Sparkles, ArrowRight, Activity, Award } from 'lucide-react';
import { Region } from '../../types';
import { REGIONS_DATA } from '../../data/regions';

interface IndonesiaMapProps {
  onSelectRegion?: (region: Region) => void;
  selectedRegionId?: string;
}

export const IndonesiaMap: React.FC<IndonesiaMapProps> = ({ 
  onSelectRegion,
  selectedRegionId: externalSelectedId
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string>('jawa');
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);

  const activeId = externalSelectedId || internalSelectedId;
  const activeRegion = REGIONS_DATA.find(r => r.id === activeId) || REGIONS_DATA[1];

  const handleRegionClick = (region: Region) => {
    setInternalSelectedId(region.id);
    if (onSelectRegion) {
      onSelectRegion(region);
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-[#F0F7FF] via-white to-[#F0F7FF] rounded-3xl p-5 sm:p-6 lg:p-8 border border-blue-100 shadow-soft-lg overflow-hidden">
      
      {/* Decorative Network Grid & Glow Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* MAP HEADER */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            Peta Isu Pendidikan 3D Interaktif
          </div>
          <h3 className="font-display font-bold text-xl lg:text-2xl text-navy">
            Distribusi Isu & Riset 7 Wilayah Nusantara
          </h3>
          <p className="text-xs lg:text-sm text-slate-500">
            Klik pada marker wilayah untuk menganalisis indeks pendidikan dan membaca kajian terkait.
          </p>
        </div>

        {/* Quick Region Pill Selector for accessibility */}
        <div className="flex flex-wrap gap-1.5">
          {REGIONS_DATA.map(region => {
            const isSelected = region.id === activeId;
            return (
              <button
                key={region.id}
                onClick={() => handleRegionClick(region)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-300'
                    : 'bg-white/80 hover:bg-blue-50 text-slate-700 border border-slate-200 shadow-xs'
                }`}
              >
                {region.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAP CANVAS WITH AUTHENTIC PETA.PNG & PRECISE REGION NODES */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full bg-gradient-to-b from-[#0B1E38] via-[#0F2B52] to-[#081528] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-blue-400/30 overflow-hidden">
        
        {/* Subtle Map Ambient Glow */}
        <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />

        {/* Proportional Map Canvas Wrapper */}
        <div className="relative w-full aspect-[2.45/1] min-h-[240px] max-h-[480px] flex items-center justify-center select-none">
          
          {/* Authentic Map Image */}
          <img
            src="/peta.png"
            alt="Peta Kepulauan Nusantara Indonesia"
            className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] pointer-events-none transition-all duration-500"
          />

          {/* SVG Glowing AI Neural Connection Lines between Regions */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Connection: Sumatera -> Jawa */}
            <line x1="17%" y1="38%" x2="36%" y2="76%" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            {/* Connection: Jawa -> Kalimantan */}
            <line x1="36%" y1="76%" x2="44%" y2="35%" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            {/* Connection: Jawa -> Bali-Nusra */}
            <line x1="36%" y1="76%" x2="60%" y2="84%" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            {/* Connection: Kalimantan -> Sulawesi */}
            <line x1="44%" y1="35%" x2="63%" y2="44%" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            {/* Connection: Sulawesi -> Maluku */}
            <line x1="63%" y1="44%" x2="77%" y2="44%" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
            {/* Connection: Bali-Nusra -> Maluku */}
            <line x1="60%" y1="84%" x2="77%" y2="44%" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
            {/* Connection: Maluku -> Papua */}
            <line x1="77%" y1="44%" x2="90%" y2="48%" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
          </svg>

          {/* INTERACTIVE GLOWING REGION PINS */}
          {REGIONS_DATA.map((region) => {
            const isSelected = region.id === activeId;
            const isHovered = hoveredRegion?.id === region.id;

            return (
              <div
                key={region.id}
                style={{ left: `${region.mapCoords.x}%`, top: `${region.mapCoords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                onClick={() => handleRegionClick(region)}
                onMouseEnter={() => setHoveredRegion(region)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                {/* Outer Pulsing Glow Wave */}
                <div className={`absolute -inset-2.5 rounded-full transition-all duration-300 ${
                  isSelected
                    ? 'bg-cyan-400/40 animate-ping'
                    : 'group-hover:bg-blue-400/30'
                }`} />

                {/* Second Glow Halo */}
                <div className={`absolute -inset-1.5 rounded-full blur-xs transition-all ${
                  isSelected ? 'bg-cyan-400 opacity-90' : 'bg-blue-500 opacity-40 group-hover:opacity-80'
                }`} />

                {/* Inner Core Pin */}
                <div className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform ${
                  isSelected 
                    ? 'bg-cyan-400 border-white shadow-[0_0_20px_#38BDF8] scale-125' 
                    : 'bg-blue-600 border-cyan-300 hover:bg-blue-500 shadow-md group-hover:scale-115'
                }`}>
                  <MapPin className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'text-navy' : 'text-white'}`} />
                </div>

                {/* Region Label Tooltip on Hover/Selection */}
                <div className={`absolute left-1/2 -translate-x-1/2 top-8 pointer-events-none transition-all duration-200 z-30 whitespace-nowrap ${
                  isSelected || isHovered
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-1 scale-95'
                }`}>
                  <div className="bg-navy/95 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-cyan-400/60 shadow-xl flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400 animate-pulse' : 'bg-blue-400'}`} />
                    <span>{region.name}</span>
                    <span className="text-[9px] text-cyan-300 font-semibold bg-white/10 px-1.5 py-0.5 rounded">
                      {region.percentage}% Urgensi
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

        </div>

      </div>

      {/* ========================================================================= */}
      {/* ACTIVE REGION METRICS & RESEARCH HIGHLIGHT CARD */}
      {/* ========================================================================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRegion.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 mt-6 bg-white rounded-2xl p-5 sm:p-6 border border-blue-100 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Region Info */}
            <div className="lg:col-span-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  {activeRegion.island}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {activeRegion.articlesCount} Jurnal Terindeks
                </span>
              </div>

              <h4 className="font-display font-bold text-xl text-navy">
                Kajian Wilayah {activeRegion.name}
              </h4>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeRegion.description}
              </p>
            </div>

            {/* Middle: 3 Educational Indices */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3">
              
              {/* Metric 1: Akses Sekolah */}
              <div className="bg-blue-50/60 rounded-2xl p-3.5 border border-blue-100/80 text-center">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Akses Sekolah
                </span>
                <div className="font-display font-extrabold text-xl sm:text-2xl text-blue-600 my-1">
                  {activeRegion.schoolAccessIndex}%
                </div>
                <div className="w-full bg-blue-200/60 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${activeRegion.schoolAccessIndex}%` }}
                  />
                </div>
              </div>

              {/* Metric 2: Literasi Digital */}
              <div className="bg-emerald-50/60 rounded-2xl p-3.5 border border-emerald-100/80 text-center">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Kecakapan Digital
                </span>
                <div className="font-display font-extrabold text-xl sm:text-2xl text-emerald-600 my-1">
                  {activeRegion.digitalLiteracyIndex}%
                </div>
                <div className="w-full bg-emerald-200/60 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${activeRegion.digitalLiteracyIndex}%` }}
                  />
                </div>
              </div>

              {/* Metric 3: Laporan Bullying */}
              <div className="bg-amber-50/60 rounded-2xl p-3.5 border border-amber-100/80 text-center">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Laporan Bullying
                </span>
                <div className="font-display font-extrabold text-xl sm:text-2xl text-amber-600 my-1">
                  {activeRegion.bullyingReportRate}%
                </div>
                <div className="w-full bg-amber-200/60 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${activeRegion.bullyingReportRate}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Right: Key Highlight & Direct Action */}
            <div className="lg:col-span-3 bg-gradient-to-br from-blue-600 to-navy text-white rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-md">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  Fokus Penelitian Lapangan
                </span>
                <p className="text-xs text-blue-100 leading-snug line-clamp-3">
                  "{activeRegion.keyHighlight}"
                </p>
              </div>

              <button
                onClick={() => {
                  const journalSection = document.getElementById('journals-section');
                  if (journalSection) {
                    journalSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-2 px-3 bg-white text-navy hover:bg-cyan-50 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Kaji Jurnal Wilayah Ini</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto text-slate-400" />
              </button>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};
