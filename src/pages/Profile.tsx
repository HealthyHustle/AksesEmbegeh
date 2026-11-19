import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Award, 
  Bookmark, 
  ShieldCheck, 
  BookOpen, 
  LogOut, 
  RotateCcw, 
  FileText, 
  Sparkles,
  ArrowRight,
  School,
  Mail,
  Calendar,
  X,
  Camera,
  Trash2,
  Upload,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../context/BookmarkContext';
import { StorageService } from '../services/storageService';
import { JOURNALS_DATA } from '../data/journals';
import { TestResult, Journal } from '../types';
import { useToast } from '../context/ToastContext';

export const Profile: React.FC = () => {
  const location = useLocation();
  const { user, logout, updateProfile } = useAuth();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { showToast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewMeta, setPreviewMeta] = useState<{ name: string; sizeKb: number } | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<'tests' | 'journals' | 'aspirations'>('tests');
  const [testResults, setTestResults] = useState<TestResult[]>(() => StorageService.getTestResults());
  const [readingJournal, setReadingJournal] = useState<Journal | null>(null);

  // Sync hash links #journals or #activity
  useEffect(() => {
    if (location.hash === '#journals') {
      setActiveTab('journals');
    } else if (location.hash === '#activity') {
      setActiveTab('tests');
    }
  }, [location.hash]);

  const bookmarkedJournals = JOURNALS_DATA.filter(j => bookmarks.includes(j.id));
  const userAspirations = StorageService.getAspirations();

  // Helper kompresi dan optimasi gambar foto profil menggunakan Canvas HTML5
  const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          // Batasi resolusi maksimal 400x400 agar performa cepat & hemat penyimpanan
          const maxDim = 400;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const dataUrl = canvas.toDataURL(mimeType, 0.88);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Gagal memproses file gambar.'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
      reader.readAsDataURL(file);
    });
  };

  const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // Maksimal 2 MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi format JPG, JPEG, PNG
    const fileType = file.type.toLowerCase();
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const isValidFormat = 
      ALLOWED_TYPES.includes(fileType) || 
      fileExtension === 'jpg' || 
      fileExtension === 'jpeg' || 
      fileExtension === 'png';

    if (!isValidFormat) {
      showToast('Format gambar harus berupa JPG, JPEG, atau PNG.', 'error');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validasi batas ukuran file (maks 2MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      showToast('Ukuran gambar maksimal 2 MB agar performa website tetap optimal.', 'error');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    try {
      setIsProcessingImage(true);
      const optimizedDataUrl = await processImageFile(file);
      setPreviewImage(optimizedDataUrl);
      setPreviewMeta({
        name: file.name,
        sizeKb: Math.round(file.size / 1024)
      });
    } catch {
      showToast('Gagal memuat gambar. Silakan coba file lain.', 'error');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleSavePhoto = async () => {
    if (!previewImage) return;
    setIsSavingPhoto(true);
    try {
      await updateProfile({ avatar: previewImage });
      setPreviewImage(null);
      setPreviewMeta(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      showToast('Foto profil berhasil disimpan!', 'success');
    } catch {
      showToast('Gagal menyimpan foto profil. Silakan coba lagi.', 'error');
    } finally {
      setIsSavingPhoto(false);
    }
  };

  const handleCancelPreview = () => {
    setPreviewImage(null);
    setPreviewMeta(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeletePhoto = async () => {
    try {
      await updateProfile({ avatar: '' });
      setIsConfirmDeleteOpen(false);
      showToast('Foto profil berhasil dihapus.', 'info');
    } catch {
      showToast('Gagal menghapus foto profil.', 'error');
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <p className="text-slate-600 font-bold">Silakan login untuk mengakses halaman profil Anda.</p>
          <Link to="/login" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm inline-block">
            Masuk Akun
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFCFF] min-h-screen pb-24">
      
      {/* PROFILE BANNER */}
      <section className="bg-gradient-to-b from-blue-50/80 via-white to-[#FAFCFF] pt-12 pb-10 border-b border-blue-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-soft-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* User Avatar & Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              
              {/* Avatar Box with interactive upload */}
              <div className="relative flex-shrink-0 group">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {user.avatar ? (
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden ring-4 ring-blue-100 shadow-md">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      title="Ganti Foto Profil"
                      className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold gap-1 cursor-pointer"
                    >
                      <Camera className="w-5 h-5 text-white" />
                      <span>Ganti</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Tambah Foto Profil"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/40 transition-all flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 shadow-2xs group cursor-pointer"
                  >
                    <User className="w-9 h-9 sm:w-11 sm:h-11 text-slate-400 group-hover:text-blue-500 transition-colors stroke-[1.5]" />
                    <span className="text-[10px] font-semibold text-slate-400 group-hover:text-blue-600 transition-colors mt-0.5">
                      Unggah
                    </span>
                  </button>
                )}
              </div>

              {/* Info & Photo Action Buttons */}
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-navy">
                    {user.name}
                  </h1>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    {user.role}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {user.email}
                  </span>
                  {user.institution && (
                    <span className="flex items-center gap-1">
                      <School className="w-3.5 h-3.5 text-slate-400" />
                      {user.institution}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Bergabung {user.joinedAt}
                  </span>
                </div>

                {user.bio && (
                  <p className="text-xs sm:text-sm text-slate-600 italic pt-1 max-w-xl">
                    “{user.bio}”
                  </p>
                )}

                {/* Photo Action Row */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {!user.avatar ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessingImage}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{isProcessingImage ? 'Memproses...' : 'Tambah Foto Profil'}</span>
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isProcessingImage}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5 text-slate-500" />
                        <span>Ganti Foto</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsConfirmDeleteOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus Foto</span>
                      </button>
                    </>
                  )}
                  <span className="text-[11px] text-slate-400">
                    JPG, JPEG, PNG (Maks. 2 MB)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-4 bg-blue-50/70 p-4 rounded-2xl border border-blue-100 flex-shrink-0 w-full md:w-auto justify-around">
              <div className="text-center">
                <div className="font-display font-black text-xl text-navy">{testResults.length}</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase">Tes Selesai</div>
              </div>
              <div className="h-8 w-[1px] bg-blue-200" />
              <div className="text-center">
                <div className="font-display font-black text-xl text-blue-600">{bookmarkedJournals.length}</div>
                <div className="text-[10px] font-semibold text-slate-500 uppercase">Jurnal Disimpan</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* TABS SELECTOR */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'tests'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Riwayat Tes Nalar Kritis ({testResults.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('journals')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'journals'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Jurnal Tersimpan ({bookmarkedJournals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('aspirations')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'aspirations'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Aspirasi Terproteksi ({userAspirations.length})</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: TEST RESULTS HISTORY */}
        {/* ========================================================================= */}
        {activeTab === 'tests' && (
          <div className="space-y-4">
            {testResults.length > 0 ? (
              testResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {result.topicTitle}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {result.completedAt}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-navy">
                      Skor Capaian: {result.score} / 100
                    </h3>

                    <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {result.level}
                    </div>

                    <p className="text-xs text-slate-500 pt-1">
                      Menjawab benar <strong>{result.correctAnswers}</strong> dari <strong>{result.totalQuestions}</strong> studi kasus.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <Link
                      to={`/critical-thinking-test/${result.topic}`}
                      className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Ulangi Tes</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4">
                <Award className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-display font-bold text-lg text-navy">Belum ada riwayat tes</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Uji kemampuan berpikir kritis Anda melalui 15 studi kasus interaktif untuk melihat analisis level nalar.
                </p>
                <Link
                  to="/critical-thinking-test"
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Mulai Tes Sekarang
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BOOKMARKED JOURNALS */}
        {/* ========================================================================= */}
        {activeTab === 'journals' && (
          <div className="space-y-4">
            {bookmarkedJournals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedJournals.map((journal) => (
                  <div
                    key={journal.id}
                    className="bg-white rounded-3xl p-6 border border-blue-100 shadow-soft flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {journal.issueLabel}
                        </span>
                        <button
                          onClick={() => toggleBookmark(journal.id, journal.title)}
                          className="text-rose-500 hover:text-rose-700 text-xs font-semibold"
                        >
                          Hapus Simpan
                        </button>
                      </div>

                      <h4 className="font-display font-bold text-base text-navy leading-snug">
                        {journal.title}
                      </h4>
                      <div className="text-xs text-slate-500">
                        {journal.author} ({journal.year})
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {journal.abstract}
                      </p>
                    </div>

                    <button
                      onClick={() => setReadingJournal(journal)}
                      className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Baca Jurnal</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-display font-bold text-lg text-navy">Belum ada jurnal tersimpan</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Jelajahi kumpulan riset pendidikan di menu Eksplorasi & Jurnal untuk menandai kajian rujukan.
                </p>
                <Link
                  to="/explore"
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Buka Jurnal Penelitian
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: USER ASPIRATIONS */}
        {/* ========================================================================= */}
        {activeTab === 'aspirations' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userAspirations.map((asp) => (
                <div
                  key={asp.id}
                  className="bg-white rounded-3xl p-6 border border-blue-100 shadow-soft space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-black text-xs text-navy bg-slate-100 px-2.5 py-1 rounded-lg">
                      {asp.anonymousId}
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {asp.status}
                    </span>
                  </div>

                  <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {asp.topic}
                  </span>

                  <p className="text-xs text-slate-700 italic leading-relaxed">
                    “{asp.content}”
                  </p>

                  <div className="pt-2 text-[11px] text-slate-400">
                    {asp.upvotes} Dukungan Komunitas
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* READ JOURNAL MODAL */}
      <AnimatePresence>
        {readingJournal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-blue-100 space-y-4 my-8"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                  {readingJournal.issueLabel}
                </span>
                <button
                  onClick={() => setReadingJournal(null)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="font-display font-bold text-xl text-navy">
                {readingJournal.title}
              </h3>
              <div className="text-xs text-slate-500 font-medium">
                {readingJournal.author} • {readingJournal.year}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 bg-blue-50/50 p-4 rounded-2xl border border-blue-100 leading-relaxed">
                {readingJournal.abstract}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setReadingJournal(null)}
                  className="px-5 py-2 rounded-xl bg-navy text-white text-xs font-bold cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PHOTO PREVIEW MODAL */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-blue-100 space-y-5 text-center relative"
            >
              <button
                type="button"
                onClick={handleCancelPreview}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Tutup pratinjau"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-xl text-navy">
                  Pratinjau Foto Profil
                </h3>
                <p className="text-xs text-slate-500">
                  Periksa tampilan foto profil Anda sebelum disimpan ke akun.
                </p>
              </div>

              {/* Photo preview frame */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-3xl overflow-hidden ring-4 ring-blue-100 shadow-md border-2 border-white bg-slate-100">
                <img
                  src={previewImage}
                  alt="Pratinjau Foto Profil"
                  className="w-full h-full object-cover"
                />
              </div>

              {previewMeta && (
                <div className="text-[11px] text-slate-500 bg-slate-50 py-1.5 px-3 rounded-xl inline-block border border-slate-200">
                  <span className="font-medium text-slate-700 truncate max-w-[180px] inline-block align-bottom">{previewMeta.name}</span>
                  <span className="mx-1">•</span>
                  <span>{previewMeta.sizeKb} KB</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancelPreview}
                  disabled={isSavingPhoto}
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSavePhoto}
                  disabled={isSavingPhoto}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSavingPhoto ? 'Menyimpan...' : 'Simpan Foto'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {isConfirmDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-rose-100 space-y-4 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-navy">
                  Hapus Foto Profil?
                </h3>
                <p className="text-xs text-slate-500">
                  Foto profil Anda akan dihapus dan tampilan akan kembali ke placeholder minimalis.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsConfirmDeleteOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleDeletePhoto}
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
