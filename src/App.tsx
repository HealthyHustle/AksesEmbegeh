import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { BookmarkProvider } from './context/BookmarkContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/common/AuthModal';

import { Home } from './pages/Home';
import { AILearning } from './pages/AILearning';
import { Pillars } from './pages/Pillars';
import { Explore } from './pages/Explore';
import { CriticalThinkingTest } from './pages/CriticalThinkingTest';
import { TestSession } from './pages/TestSession';
import { Forum } from './pages/Forum';
import { ForumThread } from './pages/ForumThread';
import { Aspirasi } from './pages/Aspirasi';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

// Minimal Footer for unauthenticated landing page (AI Learning)
const MinimalFooter: React.FC = () => (
  <footer className="py-6 px-4 bg-white border-t border-blue-100 text-center text-xs text-slate-500">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="font-bold text-[#0F2747]">Mind Bridge Global</span>
        <span>•</span>
        <span>Indonesian EdTech & Socratic AI Thinking Partner</span>
      </div>
      <p className="text-[11px] text-slate-400">
        © 2026 Mind Bridge Global. Mematuhi UU Perlindungan Data Pribadi (PDP) & Prinsip Etika AI.
      </p>
    </div>
  </footer>
);

// Scroll restoration on navigation
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoadingSession } = useAuth();

  if (isLoadingSession) {
    return (
      <div className="min-h-screen bg-[#FAFCFF] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin" />
          <span className="text-xs font-semibold text-slate-500">Memuat sesi Mind Bridge Global...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFCFF] text-[#172B4D] selection:bg-blue-100 selection:text-blue-900">
      <ScrollToTop />
      
      {/* 
        Akses Autentikasi:
        1. Navbar utama hanya tampil setelah pengguna masuk ke akun.
        2. Pengguna yang belum masuk memiliki akses halaman awal dan form masuk/daftar.
      */}
      {isAuthenticated && <Navbar />}

      <main className="flex-1">
        <Routes>
          {isAuthenticated ? (
            <>
              {/* Rute pengguna terautentikasi */}
              <Route path="/" element={<Home />} />
              <Route path="/beranda" element={<Home />} />
              <Route path="/ai-learning" element={<AILearning />} />
              <Route path="/critical-mind-ai" element={<AILearning />} />
              <Route path="/ekosistem" element={<Pillars />} />
              <Route path="/pilar" element={<Pillars />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/critical-thinking-test" element={<CriticalThinkingTest />} />
              <Route path="/critical-thinking-test/:topic" element={<TestSession />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/forum/:threadId" element={<ForumThread />} />
              <Route path="/aspirasi" element={<Aspirasi />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Navigate to="/ai-learning" replace />} />
              <Route path="/register" element={<Navigate to="/ai-learning" replace />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              {/* 
                Rute pengguna publik / belum login:
                Halaman awal mengarah ke AI Learning.
                Dashboard (/profile) dilindungi dan diarahkan ke login.
              */}
              <Route path="/" element={<AILearning />} />
              <Route path="/ai-learning" element={<AILearning />} />
              <Route path="/critical-mind-ai" element={<AILearning />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Navigate to="/login?redirect=/profile" replace />} />
              {/* Rute lainnya diarahkan ke halaman awal */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </main>

      {/* Footer: Lengkap saat terautentikasi, minimalis saat publik */}
      {isAuthenticated ? <Footer /> : <MinimalFooter />}

      {/* Dialog Interaktif Autentikasi */}
      <AuthModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <BookmarkProvider>
            <AppContent />
          </BookmarkProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
