import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-[#FAFCFF]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-blue-100 shadow-soft text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="font-display font-black text-4xl text-navy">404</h1>
        <h2 className="font-display font-bold text-xl text-navy">Halaman Tidak Ditemukan</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Jembatan yang Anda tuju belum terhubung. Mari kembali ke beranda utama Mind Bridge Global.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            <span>Kembali ke Beranda</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
