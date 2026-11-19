import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Bot, 
  BrainCircuit, 
  MessageSquare, 
  ShieldCheck, 
  Bell, 
  User as UserIcon, 
  Bookmark, 
  Award, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import logoImg from '../../assets/logo.png';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Beranda' },
    { path: '/ai-learning', label: 'AI Learning', isSpecial: true },
    { path: '/ekosistem', label: 'Pilar Ekosistem' },
    { path: '/explore', label: 'Eksplorasi Jurnal' },
    { path: '/critical-thinking-test', label: 'Tes Critical Thinking' },
    { path: '/forum', label: 'Ruang Diskusi' },
    { path: '/aspirasi', label: 'Ruang Aspirasi' },
  ];

  const isRouteActive = (itemPath: string) => {
    if (itemPath === '/') return location.pathname === '/' || location.pathname === '/beranda';
    if (itemPath === '/ai-learning') {
      return location.pathname === '/ai-learning' || location.pathname === '/critical-mind-ai';
    }
    if (itemPath === '/ekosistem') {
      return location.pathname === '/ekosistem' || location.pathname === '/pilar';
    }
    return location.pathname.startsWith(itemPath);
  };

  const notifications = [
    {
      id: '1',
      title: 'Hasil Tes Critical Thinking Tersimpan',
      desc: 'Skor modul Literasi Digital Anda: 86 (Advanced).',
      time: '10 mnt lalu',
      isUnread: true
    },
    {
      id: '2',
      title: 'Tanggapan Baru di Forum',
      desc: 'Siti Rahayu membalas topik di Room Anti-Bullying.',
      time: '1 jam lalu',
      isUnread: true
    },
    {
      id: '3',
      title: 'Aspirasi Anda Diverifikasi',
      desc: 'Aspirasi kode MBG-ANON-2847 telah terbit di feed publik.',
      time: '3 jam lalu',
      isUnread: false
    }
  ];

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    showToast('Anda berhasil keluar dari akun.', 'info');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-[#CFEAFF]/80 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-xl p-1">
            <div className="relative w-11 h-11 min-w-[44px] min-h-[44px] rounded-2xl bg-white p-1 border border-blue-100 shadow-sm group-hover:scale-105 transition-all overflow-hidden flex items-center justify-center">
              <img 
                src={logoImg} 
                alt="Mind Bridge Global Logo" 
                className="w-full h-full object-contain block"
              />
              <div className="absolute -inset-0.5 rounded-2xl bg-blue-400/20 blur-sm -z-10 group-hover:bg-blue-400/40 transition-colors" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl text-[#0F2747] tracking-tight group-hover:text-blue-600 transition-colors">
                  Mind Bridge
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                  Global
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                Indonesian EdTech & AI
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION MENU */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = isRouteActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-blue-600 font-semibold bg-blue-50/80 shadow-sm'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/40'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.isSpecial && <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />}
                    {item.label}
                  </span>

                  {/* Active Blue Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-blue-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* NOTIFICATION BUTTON */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Buka notifikasi"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-soft-lg border border-slate-100 p-4 z-50"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                      <h4 className="font-semibold text-sm text-slate-900">Pemberitahuan</h4>
                      <span className="text-[11px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
                        2 Baru
                      </span>
                    </div>

                    <div className="space-y-2">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                            notif.isUnread ? 'bg-blue-50/60 hover:bg-blue-50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="font-semibold text-slate-900 mb-0.5">{notif.title}</div>
                          <div className="text-slate-600 leading-snug">{notif.desc}</div>
                          <div className="text-[10px] text-slate-400 mt-1">{notif.time}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* USER PROFILE OR AUTH BUTTONS */}
            {isAuthenticated && user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-xl object-cover ring-1 ring-blue-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-slate-500" />
                    </div>
                  )}
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-900 leading-none">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-none">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-soft-lg border border-slate-100 p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <div className="text-xs font-bold text-slate-900">{user.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                      </div>

                      <div className="space-y-0.5 text-xs font-medium text-slate-700">
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-slate-400" />
                          Profil Saya
                        </Link>
                        <Link
                          to="/profile#activity"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Award className="w-4 h-4 text-slate-400" />
                          Aktivitas & Riwayat
                        </Link>
                        <Link
                          to="/profile#journals"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Bookmark className="w-4 h-4 text-slate-400" />
                          Jurnal Tersimpan
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 my-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Keluar Akun
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Menu navigasi"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-[#CFEAFF] px-4 pt-2 pb-6 space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = isRouteActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-3">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2 bg-blue-50/50 rounded-2xl">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-slate-500" />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.role}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Link
                      to="/profile"
                      className="p-2.5 rounded-xl border border-slate-200 text-center font-semibold text-slate-700"
                    >
                      Profil Saya
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2.5 rounded-xl border border-rose-200 text-rose-600 text-center font-semibold"
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    className="p-3 text-center rounded-xl border border-slate-200 text-sm font-bold text-slate-700"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="p-3 text-center rounded-xl bg-blue-600 text-white text-sm font-bold shadow"
                  >
                    Daftar Akun
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
