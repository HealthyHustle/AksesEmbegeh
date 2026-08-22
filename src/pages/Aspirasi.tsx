import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Send, 
  ThumbsUp, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  X, 
  EyeOff, 
  MessageSquare,
  FileCheck,
  Tag,
  Filter
} from 'lucide-react';
import { Aspiration, AspirationTopic } from '../types';
import { StorageService } from '../services/storageService';
import { useToast } from '../context/ToastContext';
import { BatikPattern } from '../components/common/BatikPattern';

export const Aspirasi: React.FC = () => {
  const { showToast } = useToast();
  const [aspirations, setAspirations] = useState<Aspiration[]>(() => StorageService.getAspirations());

  const [topic, setTopic] = useState<AspirationTopic>('Bullying');
  const [content, setContent] = useState<string>('');
  const [region, setRegion] = useState<string>('Jawa Barat');
  const [agreed, setAgreed] = useState<boolean>(false);

  const [submittedModal, setSubmittedModal] = useState<boolean>(false);
  const [latestAnonId, setLatestAnonId] = useState<string>('');
  const [filterTopic, setFilterTopic] = useState<string>('Semua');

  const MAX_CHAR = 1000;

  const generateAnonymousId = (): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `MBG-ANON-${randomNum}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      showToast('Harap tuliskan isi aspirasi Anda.', 'error');
      return;
    }
    if (!agreed) {
      showToast('Harap centang persetujuan panduan privasi komunitas.', 'error');
      return;
    }

    const anonId = generateAnonymousId();
    const newAspiration: Aspiration = {
      id: `asp-${Date.now()}`,
      anonymousId: anonId,
      topic,
      content: content.trim(),
      region,
      createdAt: 'Baru saja',
      upvotes: 1,
      status: 'Diverifikasi'
    };

    StorageService.addAspiration(newAspiration);
    setAspirations(StorageService.getAspirations());
    setLatestAnonId(anonId);
    setSubmittedModal(true);

    // Reset Form
    setContent('');
    setAgreed(false);
  };

  const handleUpvote = (id: string) => {
    StorageService.toggleAspirationUpvote(id);
    setAspirations(StorageService.getAspirations());
    showToast('Dukungan suara Anda tercatat.', 'success');
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(latestAnonId);
    showToast(`ID Anonim ${latestAnonId} berhasil disalin ke clipboard.`, 'success');
  };

  const filteredAspirations = aspirations.filter(asp => {
    if (filterTopic === 'Semua') return true;
    return asp.topic === filterTopic;
  });

  return (
    <div className="bg-[#FAFCFF] min-h-screen pb-24">
      
      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-14 bg-gradient-to-b from-blue-50/80 via-white to-[#FAFCFF] border-b border-blue-100/70 overflow-hidden">
        <BatikPattern opacity={0.04} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/90 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Civic Education & Anonymous Protected Voice</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-navy tracking-tight">
              Ruang Aspirasi Pendidikan
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              “Suarakan kritik, pengalaman, dan ide secara bebas dan aman tanpa khawatir identitas terungkap.”
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. PRIVACY CARD */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-[#0F2747] via-[#14325A] to-[#0A1B32] rounded-3xl p-6 sm:p-8 text-white shadow-soft-lg border border-blue-400/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-start gap-4 z-10">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display font-bold text-xl text-white">
                  Jaminan Privasi
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400 text-slate-950">
                  Anonymous Protected
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-cyan-300 border border-white/20">
                  Identity Hidden
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                “Identitas pengguna sepenuhnya disembunyikan untuk menjaga keamanan dan kenyamanan dalam menyampaikan aspirasi. Username Anda diganti otomatis menjadi format anonim terproteksi.”
              </p>
            </div>
          </div>

          <div className="z-10 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 text-center flex-shrink-0">
            <div className="text-[10px] text-blue-200 font-semibold uppercase">Format Kode Publik:</div>
            <div className="font-display font-black text-lg text-cyan-300 tracking-wider">MBG-ANON-XXXX</div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. ASPIRATION FORM */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-100 shadow-soft-lg space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-display font-bold text-2xl text-navy">
              Tuliskan Aspirasi Anda
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Gagasan Anda akan diteruskan ke panel evaluasi kebijakan dan ditampilkan secara anonim di forum publik.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* TOPIC SELECTOR */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Pilih Topik Isu
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as AspirationTopic)}
                  className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Bullying">Bullying & Perundungan</option>
                  <option value="Literasi Digital">Literasi Digital & Etika</option>
                  <option value="Ketimpangan Sosial">Ketimpangan Sosial & 3T</option>
                  <option value="Kebijakan Pendidikan">Kebijakan Pendidikan</option>
                  <option value="Akses Pendidikan">Akses Pendidikan</option>
                  <option value="Kualitas Pembelajaran">Kualitas Pembelajaran</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* REGION CONTEXT */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Wilayah / Provinsi (Opsional)
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Sumatera">Sumatera</option>
                  <option value="DKI Jakarta">DKI Jakarta</option>
                  <option value="Jawa Barat">Jawa Barat</option>
                  <option value="Jawa Tengah & DIY">Jawa Tengah & DIY</option>
                  <option value="Jawa Timur">Jawa Timur</option>
                  <option value="Kalimantan">Kalimantan</option>
                  <option value="Sulawesi">Sulawesi</option>
                  <option value="Bali & Nusa Tenggara">Bali & Nusa Tenggara</option>
                  <option value="Maluku">Maluku</option>
                  <option value="Papua">Papua</option>
                </select>
              </div>
            </div>

            {/* TEXTAREA WITH 1000 CHAR LIMIT */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Isi Aspirasi, Pengalaman, atau Solusi
              </label>
              <textarea
                rows={5}
                maxLength={MAX_CHAR}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tuliskan kritik, pengalaman, ide, atau solusi yang ingin Anda sampaikan..."
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
                required
              />
              <div className="flex justify-between items-center text-[11px] text-slate-400 px-1">
                <span>Minimal 20 karakter untuk ulasan yang bermakna.</span>
                <span className={content.length >= 950 ? 'text-rose-500 font-bold' : ''}>
                  {content.length} / {MAX_CHAR} Karakter
                </span>
              </div>
            </div>

            {/* GUIDELINES CHECKBOX */}
            <label className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span className="text-xs text-slate-700 leading-snug">
                Saya memahami bahwa aspirasi saya akan ditampilkan secara <strong>anonim</strong> dan tetap mengikuti panduan etika komunitas serta bebas dari ujaran kebencian SARA.
              </span>
            </label>

            {/* SUBMIT BUTTON */}
            <div>
              <button
                type="submit"
                disabled={!content.trim() || !agreed}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Aspirasi Secara Anonim</span>
              </button>
            </div>

          </form>
        </section>

        {/* ========================================================================= */}
        {/* 3. PUBLIC ASPIRATIONS FEED */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-2xl text-navy">
                Aspirasi Terbuka Komunitas
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Suara otentik pendidik, mahasiswa, dan pemuda dari seluruh penjuru nusantara.
              </p>
            </div>

            {/* TOPIC FILTER PILLS */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {['Semua', 'Bullying', 'Literasi Digital', 'Ketimpangan Sosial', 'Kualitas Pembelajaran'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterTopic(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    filterTopic === t
                      ? 'bg-navy text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAspirations.map((asp) => (
              <motion.div
                key={asp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 border border-blue-100 shadow-soft space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-xs text-navy bg-slate-100 px-2.5 py-1 rounded-lg">
                        {asp.anonymousId}
                      </span>
                      {asp.region && (
                        <span className="text-[11px] text-slate-400 font-medium">
                          📍 {asp.region}
                        </span>
                      )}
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {asp.status}
                    </span>
                  </div>

                  <div className="inline-block px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                    {asp.topic}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line italic">
                    “{asp.content}”
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{asp.createdAt}</span>

                  <button
                    onClick={() => handleUpvote(asp.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold transition-all ${
                      asp.isUpvoted
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{asp.upvotes} Dukung Suara</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 4. SUCCESS MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {submittedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-blue-100 space-y-6 text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-black text-2xl text-navy">
                  Aspirasi Berhasil Dikirim
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  “Terima kasih telah menyuarakan gagasan untuk masa depan pendidikan Indonesia.”
                </p>
              </div>

              {/* ANONYMOUS BADGE */}
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Identitas Anonim Anda:
                </span>
                <div className="font-display font-black text-2xl text-blue-700 tracking-wider">
                  {latestAnonId}
                </div>
                <button
                  onClick={handleCopyId}
                  className="px-3 py-1 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin ID Anonim</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Nama asli Anda tidak akan pernah dipublikasikan di feed aspirasi.
              </p>

              <div>
                <button
                  onClick={() => setSubmittedModal(false)}
                  className="w-full py-3 rounded-2xl bg-navy hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  Tutup & Lihat Aspirasi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
