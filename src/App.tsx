import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { BookmarkProvider } from './context/BookmarkContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { CriticalMindAI } from './pages/CriticalMindAI';
import { CriticalThinkingTest } from './pages/CriticalThinkingTest';
import { TestSession } from './pages/TestSession';
import { Forum } from './pages/Forum';
import { ForumThread } from './pages/ForumThread';
import { Aspirasi } from './pages/Aspirasi';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

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

export const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <BookmarkProvider>
            <div className="flex flex-col min-h-screen bg-[#FAFCFF] text-[#172B4D] selection:bg-blue-100 selection:text-blue-900">
              <ScrollToTop />
              <Navbar />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/critical-mind-ai" element={<CriticalMindAI />} />
                  <Route path="/critical-thinking-test" element={<CriticalThinkingTest />} />
                  <Route path="/critical-thinking-test/:topic" element={<TestSession />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="/forum/:threadId" element={<ForumThread />} />
                  <Route path="/aspirasi" element={<Aspirasi />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </BookmarkProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
