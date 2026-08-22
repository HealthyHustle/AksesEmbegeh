import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Sparkles, BrainCircuit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BatikPattern } from '../components/common/BatikPattern';
import logoImg from '../assets/logo.png';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('faisal.edukasi@gmail.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Harap isi email dan kata sandi.', 'error');
      return;
    }

    login(email, password);
    showToast('Selamat datang kembali di Mind Bridge Global!', 'success');
    navigate('/');
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
            Akses forum diskusi, simpan jurnal, dan catat skor nalar kritis Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="nama@kampus.ac.id"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
              <span>Ingat saya</span>
            </label>

            <span className="text-blue-600 hover:underline cursor-pointer font-semibold">
              Lupa kata sandi?
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Masuk Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Belum memiliki akun?{' '}
          <Link to="/register" className="font-bold text-blue-600 hover:underline">
            Daftar Akun Baru
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
