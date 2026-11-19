import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BatikPattern } from '../components/common/BatikPattern';
import logoImg from '../assets/logo.png';

export const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/ai-learning';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMessage('Harap isi alamat email dan kata sandi.');
      showToast('Harap isi alamat email dan kata sandi.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(cleanEmail, password);
      if (result.success) {
        showToast(result.message, 'success');
        navigate(redirectTarget);
      } else {
        setErrorMessage(result.message);
        showToast(result.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-[#FAFCFF] relative overflow-hidden">
      <BatikPattern opacity={0.04} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-blue-100 shadow-soft-lg space-y-6 relative z-10"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-white p-1.5 border border-blue-100 shadow-md mx-auto flex items-center justify-center overflow-hidden">
            <img 
              src={logoImg} 
              alt="Mind Bridge Global" 
              className="w-full h-full object-contain block"
            />
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-navy">
            Masuk Akun
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Masuk untuk mengakses materi pembelajaran, dialektika AI, dan forum diskusi.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi Anda"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span>Ingat saya di perangkat ini</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Memeriksa akun...' : 'Masuk Sekarang'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="text-center pt-2 text-xs text-slate-600">
          Belum punya akun?{' '}
          <Link 
            to={`/register?redirect=${encodeURIComponent(redirectTarget)}`} 
            className="font-bold text-blue-600 hover:underline"
          >
            Daftar sekarang
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
