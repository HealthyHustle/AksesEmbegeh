import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Bookmark, 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  ShieldAlert, 
  Smartphone, 
  Scale, 
  X, 
  ArrowRight,
  Download,
  Share2,
  FileText
} from 'lucide-react';
import { IndonesiaMap } from '../components/map/IndonesiaMap';
import { ISSUES_DATA } from '../data/issues';
import { JOURNALS_DATA } from '../data/journals';
import { IssueTopicId, Journal, Region } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import { Link } from 'react-router-dom';

export const Explore: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<IssueTopicId | 'semua'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReadingJournal, setActiveReadingJournal] = useState<Journal | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Filtered Journals List
  const filteredJournals = useMemo(() => {
    return JOURNALS_DATA.filter(jrn => {
      const matchTopic = selectedTopic === 'semua' || jrn.issue === selectedTopic;
      const matchSearch = 
        jrn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jrn.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jrn.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jrn.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchTopic && matchSearch;
    });
  }, [selectedTopic, searchQuery]);

  const handleIssueCardClick = (issueId: IssueTopicId) => {
    setSelectedTopic(prev => prev === issueId ? 'semua' : issueId);
    // Smooth scroll to journals section
    const el = document.getElementById('jurnal-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getIssueIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-red-600" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-blue-600" />;
      case 'Scale': return <Scale className="w-6 h-6 text-amber-600" />;
      default: return <BookOpen className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="bg-[#FAFCFF] min-h-screen pb-20">
      
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-b from-blue-50/80 via-white to-[#FAFCFF] pt-12 pb-10 border-b border-blue-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100/80 text-blue-800 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Data Geografis & Basis Riset Empiris</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-navy tracking-tight">
              Eksplorasi Isu Pendidikan Indonesia
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              “Kenali berbagai persoalan pendidikan melalui data, wilayah, dan perspektif penelitian.”
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. INDONESIA MAP SECTION */}
        {/* ========================================================================= */}
        <section>
          <IndonesiaMap onSelectRegion={(region) => setSelectedRegion(region)} />
        </section>

        {/* ========================================================================= */}
        {/* 2. ISSUE TOPICS (3 INTERACTIVE CARDS) */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Pilar Permasalahan Utama
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy">
                Tiga Isu Kritis Pendidikan Nasional
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Pilih topik untuk memfilter kumpulan jurnal dan modul penalaran yang relevan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ISSUES_DATA.map((issue) => {
              const isSelected = selectedTopic === issue.id;
              return (
                <motion.div
                  key={issue.id}
                  whileHover={{ y: -4 }}
                  onClick={() => handleIssueCardClick(issue.id)}
                  className={`cursor-pointer rounded-3xl p-6 transition-all border-2 relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-soft-lg ring-4 ring-blue-100'
                      : 'bg-white hover:bg-blue-50/30 border-blue-100 shadow-soft'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon & Percentage */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                        {getIssueIcon(issue.icon)}
                      </div>

                      <div className="text-right">
                        <span className="font-display font-black text-3xl text-navy">
                          {issue.percentage}%
                        </span>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Urgensi Isu
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-display font-bold text-xl text-navy mb-1.5">
                        {issue.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {issue.description}
                      </p>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${issue.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: issue.color }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Button / Indicator */}
                  <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold">
                    <span className={isSelected ? 'text-blue-600' : 'text-slate-500'}>
                      {isSelected ? '✓ Kategori Terpilih' : 'Klik untuk filter jurnal'}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-400'}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. JOURNAL SECTION */}
        {/* ========================================================================= */}
        <section id="jurnal-section" className="space-y-8 pt-4">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-blue-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Pusat Sumber Belajar
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy">
                Jurnal & Referensi Penelitian
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kajian ilmiah dan artikel rujukan untuk memperkuat argumentasi nalar kritis.
              </p>
            </div>

            {/* SEARCH AND FILTER BAR */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Input */}
              <div className="relative min-w-[280px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari jurnal atau topik penelitian..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {[
                  { id: 'semua', label: 'Semua' },
                  { id: 'bullying', label: 'Bullying' },
                  { id: 'literasi-digital', label: 'Literasi Digital' },
                  { id: 'ketimpangan-sosial', label: 'Ketimpangan Sosial' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTopic(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedTopic === tab.id
                        ? 'bg-navy text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* JOURNALS GRID */}
          {filteredJournals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJournals.map((journal) => {
                const bookmarked = isBookmarked(journal.id);

                return (
                  <motion.div
                    key={journal.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="bg-white rounded-3xl p-6 border border-blue-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          journal.issue === 'bullying'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : journal.issue === 'literasi-digital'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {journal.issueLabel}
                        </span>

                        <button
                          onClick={() => toggleBookmark(journal.id, journal.title)}
                          className={`p-2 rounded-xl border transition-all ${
                            bookmarked
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border-slate-200'
                          }`}
                          aria-label="Simpan jurnal"
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-base sm:text-lg text-navy leading-snug group-hover:text-blue-600 transition-colors">
                        {journal.title}
                      </h3>

                      {/* Author & Year */}
                      <div className="text-xs text-slate-500 font-medium">
                        <span>{journal.author}</span> • <span className="font-bold text-slate-700">{journal.year}</span>
                      </div>

                      {/* Abstract Preview */}
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {journal.abstract}
                      </p>

                      {/* Source Citation */}
                      <div className="text-[11px] text-slate-400 italic">
                        {journal.source}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {journal.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer Action */}
                    <div className="pt-6 mt-4 border-t border-slate-100">
                      <button
                        onClick={() => setActiveReadingJournal(journal)}
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Baca Jurnal</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-display font-bold text-lg text-navy">Jurnal tidak ditemukan</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Coba sesuaikan kata kunci pencarian atau ubah filter kategori topik di atas.
              </p>
              <button
                onClick={() => {
                  setSelectedTopic('semua');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* INTERCONNECTED USER JOURNEY CTA */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-soft-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Langkah Selanjutnya
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white">
                Ingin menguji cara berpikirmu setelah membaca data?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100">
                Latih dialektika bersama Socratic AI atau uji 15 studi kasus di Tes Critical Thinking.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/ai-learning"
                className="px-5 py-3 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs shadow-sm transition-all"
              >
                Diskusi dengan AI
              </Link>
              <Link
                to="/critical-thinking-test"
                className="px-5 py-3 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-extrabold text-xs shadow-sm transition-all flex items-center gap-2"
              >
                <span>Mulai Tes Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </section>

      </div>

      {/* ========================================================================= */}
      {/* 4. READ JOURNAL MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeReadingJournal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="bg-navy p-6 sm:p-8 text-white relative">
                <button
                  onClick={() => setActiveReadingJournal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Tutup jendela jurnal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                    {activeReadingJournal.issueLabel}
                  </span>
                  <span className="text-xs text-slate-300">
                    Tahun {activeReadingJournal.year} • Peer-Reviewed
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug">
                  {activeReadingJournal.title}
                </h3>
                <div className="text-xs text-blue-200 mt-2">
                  {activeReadingJournal.author} • {activeReadingJournal.institution}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Abstract */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Abstrak Penelitian
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-blue-50/40 p-4 rounded-2xl border border-blue-100/70">
                    {activeReadingJournal.abstract}
                  </p>
                </div>

                {/* Methodology */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Metodologi & Desain Riset
                  </h4>
                  <div className="text-xs font-semibold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {activeReadingJournal.methodology}
                  </div>
                </div>

                {/* Source Publication */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                  <div className="font-bold">Publikasi & Sitasi:</div>
                  <div>{activeReadingJournal.source}</div>
                  <div className="text-[11px] text-amber-700">Telah disitasi sebanyak {activeReadingJournal.citationCount} kali dalam literatur pendidikan nasional.</div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => toggleBookmark(activeReadingJournal.id, activeReadingJournal.title)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                    isBookmarked(activeReadingJournal.id)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>{isBookmarked(activeReadingJournal.id) ? 'Tersimpan di Akun' : 'Simpan Jurnal'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveReadingJournal(null)}
                    className="px-5 py-2.5 rounded-xl bg-navy hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                  >
                    Tutup Bacaan
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
