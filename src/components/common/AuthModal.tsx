import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogIn, UserPlus, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.png';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalReason, authRedirectPath, closeAuthModal } = useAuth();
  const navigate = useNavigate();

  if (!isAuthModalOpen) return null;

  const handleGoToLogin = () => {
    closeAuthModal();
    navigate(`/login?redirect=${encodeURIComponent(authRedirectPath || '/')}`);
  };

  const handleGoToRegister = () => {
    closeAuthModal();
    navigate(`/register?redirect=${encodeURIComponent(authRedirectPath || '/')}`);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-2xl space-y-6 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-3 pt-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 p-2 mx-auto flex items-center justify-center shadow-soft">
              <img src={logoImg} alt="Mind Bridge Global" className="w-full h-full object-contain" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Akses Penuh Fitur</span>
            </div>

            <h2 id="auth-modal-title" className="font-display font-extrabold text-2xl text-navy">
              Masuk untuk Melanjutkan
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              {authModalReason}
            </p>
          </div>

          {/* Benefits summary */}
          <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-100 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
              Akses Pengguna Terdaftar:
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Interaksi penuh bersama AI dan penyimpanan riwayat sesi.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Akses ke Ruang Diskusi dan Forum Calon Pendidik.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Hasil asesmen dan rapor capaian nalar kritis.</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={handleGoToLogin}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk ke Akun Anda</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleGoToRegister}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-navy font-bold text-xs border border-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-blue-600" />
              <span>Belum punya akun? Daftar sekarang</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
