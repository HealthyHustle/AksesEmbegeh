import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Mail, Globe, MapPin } from 'lucide-react';
import { BatikPattern } from './BatikPattern';
import logoImg from '../../assets/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-navy text-white overflow-hidden pt-16 pb-12 border-t border-blue-900/40">
      {/* Subtle Batik Overlay */}
      <BatikPattern opacity={0.06} />

      {/* Decorative Glow Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">

          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-2xl bg-white p-1 shadow-lg shadow-blue-500/20 flex items-center justify-center overflow-hidden">
                <img
                  src={logoImg}
                  alt="Mind Bridge Global Logo"
                  className="w-full h-full object-contain block"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl text-white tracking-tight">
                  Mind Bridge Global
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              “Kaji isu pendidikan nasional secara interaktif, latih nalar kritis dengan pendekatan Socratic AI, suarakan aspirasi secara aman, dan bangun jembatan masa depan pendidikan Indonesia.”
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                Socratic AI Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Anonymous Protected
              </span>
            </div>
          </div>

          {/* NAV LINKS 1: EKOSISTEM */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">
              Ekosistem
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Beranda</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-blue-400 transition-colors">Eksplorasi & Jurnal</Link>
              </li>
              <li>
                <Link to="/critical-mind-ai" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  Critical Mind AI
                  <span className="text-[10px] bg-blue-600 px-1.5 py-0.2 rounded font-bold text-white">PRO</span>
                </Link>
              </li>
              <li>
                <Link to="/critical-thinking-test" className="hover:text-blue-400 transition-colors">Tes Critical Thinking</Link>
              </li>
            </ul>
          </div>

          {/* NAV LINKS 2: KOMUNITAS & ASPIRASI */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">
              Komunitas
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/forum" className="hover:text-blue-400 transition-colors">Forum Diskusi</Link>
              </li>
              <li>
                <Link to="/aspirasi" className="hover:text-blue-400 transition-colors">Ruang Aspirasi</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-blue-400 transition-colors">Profil & Riwayat Belajar</Link>
              </li>
              <li>
                <a href="#tentang-kami" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
            </ul>
          </div>

          {/* NAV LINKS 3: KONTAK & REGULASI */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">
              Pilar & Integritas
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Nusantara Education Hub</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Bandung, Jawa Barat, ID</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>gmaindbridge@gmail.com</span>
              </li>
              <li className="pt-2 text-xs text-slate-400">
                <span className="block font-medium text-slate-300">Privasi & Etika Data:</span>
                Tunduk pada prinsip anonimitas dan UU Perlindungan Data Pribadi (PDP).
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1.5">
            © 2026 <strong>Mind Bridge Global</strong>. “Bridging Education, Critical Thinking, and the Future of Indonesia.”
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Panduan Komunitas</span>
            <span className="hover:text-slate-300 cursor-pointer">Kebijakan Privasi</span>
            <span className="hover:text-slate-300 cursor-pointer">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
