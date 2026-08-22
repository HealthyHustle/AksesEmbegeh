import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Users, 
  Smartphone, 
  ShieldAlert, 
  Scale, 
  Search, 
  Send, 
  ThumbsUp, 
  Sparkles, 
  Lock, 
  Pin, 
  X, 
  Tag, 
  Flame, 
  CheckCircle2, 
  HelpCircle, 
  CornerDownRight, 
  Share2, 
  Menu, 
  ArrowRight,
  Lightbulb,
  Award
} from 'lucide-react';
import { FORUM_ROOMS, ROOM_PINNED_PROMPTS, INITIAL_ROOM_PARTICIPANTS } from '../data/forum';
import { IssueTopicId, RoomChatMessage, RoomParticipant } from '../types';
import { StorageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Forum: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [activeRoomId, setActiveRoomId] = useState<IssueTopicId>('bullying');
  const [messages, setMessages] = useState<RoomChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('💡 Solusi Konkret');
  const [replyingTo, setReplyingTo] = useState<RoomChatMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeRoom = useMemo(() => {
    return FORUM_ROOMS.find(r => r.slug === activeRoomId) || FORUM_ROOMS[0];
  }, [activeRoomId]);

  const activePrompt = useMemo(() => {
    return ROOM_PINNED_PROMPTS[activeRoomId];
  }, [activeRoomId]);

  const activeParticipants = useMemo(() => {
    return INITIAL_ROOM_PARTICIPANTS[activeRoomId] || [];
  }, [activeRoomId]);

  // Load messages for current room
  useEffect(() => {
    const roomMsgs = StorageService.getRoomMessages(activeRoomId);
    setMessages(roomMsgs);
    setReplyingTo(null);
  }, [activeRoomId]);

  // Filter messages by search query
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    const q = searchQuery.toLowerCase();
    return messages.filter(
      m => m.content.toLowerCase().includes(q) ||
           m.authorName.toLowerCase().includes(q) ||
           m.authorRole.toLowerCase().includes(q) ||
           (m.tag && m.tag.toLowerCase().includes(q))
    );
  }, [messages, searchQuery]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    if (!isAuthenticated) {
      showToast('Silakan login terlebih dahulu untuk berpartisipasi dalam ruang chat.', 'info');
      return;
    }

    const currentAuthorName = user?.name || 'Faisal';
    const currentAuthorRole = user?.role || 'Mahasiswa Pendidikan';
    const currentAuthorAvatar = user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const newMsg: RoomChatMessage = {
      id: `msg-${Date.now()}`,
      roomId: activeRoomId,
      authorName: currentAuthorName,
      authorRole: currentAuthorRole,
      authorAvatar: currentAuthorAvatar,
      isCurrentUser: true,
      content: inputText.trim(),
      timestamp: timeStr,
      upvotes: 1,
      insightfulCount: 1,
      tag: selectedTag,
      replyTo: replyingTo ? {
        authorName: replyingTo.authorName,
        content: replyingTo.content.slice(0, 75) + (replyingTo.content.length > 75 ? '...' : '')
      } : undefined
    };

    const updated = StorageService.addRoomMessage(newMsg);
    setMessages(updated);
    setInputText('');
    setReplyingTo(null);
    showToast('Tanggapan berhasil dikirim ke room!', 'success');

    // Simulate occasional live peer follow-up response from community participant
    setTimeout(() => {
      const participant = activeParticipants[Math.floor(Math.random() * activeParticipants.length)];
      if (participant) {
        let followUpText = '';
        if (activeRoomId === 'bullying') {
          followUpText = `Menarik poin dari ${currentAuthorName}! Menurut pengamatan kami di lapangan, konsistensi tim TPPK bersama pihak orang tua menjadi faktor kunci keberhasilan solusi tersebut.`;
        } else if (activeRoomId === 'literasi-digital') {
          followUpText = `Setuju dengan ${currentAuthorName}. Integrasi verifikasi fakta langsung ke penugasan mingguan terbukti meningkatkan retensi nalar kritis siswa secara terukur.`;
        } else {
          followUpText = `Apresiasi atas gagasan dari ${currentAuthorName}! Model tepat guna berbasis luring memang sangat adaptif untuk sekolah dengan keterbatasan listrik di wilayah kepulauan.`;
        }

        const peerMsg: RoomChatMessage = {
          id: `peer-${Date.now()}`,
          roomId: activeRoomId,
          authorName: participant.name,
          authorRole: participant.role,
          authorAvatar: participant.avatar,
          content: followUpText,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          upvotes: 4,
          insightfulCount: 3,
          tag: '💡 Solusi Konkret',
          replyTo: {
            authorName: currentAuthorName,
            content: newMsg.content.slice(0, 60) + '...'
          }
        };

        const withPeer = StorageService.addRoomMessage(peerMsg);
        setMessages(withPeer);
      }
    }, 2800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReaction = (msgId: string, type: 'upvote' | 'insightful') => {
    if (!isAuthenticated) {
      showToast('Silakan login untuk memberikan apresiasi tanggapan.', 'info');
      return;
    }
    const updated = StorageService.toggleMessageReaction(msgId, type);
    setMessages(updated.filter(m => m.roomId === activeRoomId));
  };

  const getRoomIcon = (slug: IssueTopicId) => {
    switch (slug) {
      case 'bullying':
        return ShieldAlert;
      case 'literasi-digital':
        return Smartphone;
      case 'ketimpangan-sosial':
        return Scale;
    }
  };

  const tagOptions = [
    '💡 Solusi Konkret',
    '📊 Berbasis Data Lapangan',
    '❓ Pertanyaan Kritis',
    '⚖️ Perspektif Kebijakan'
  ];

  return (
    <div className="bg-[#FAFCFF] min-h-[calc(100vh-5rem)] flex flex-col py-4 sm:py-6">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
        
        {/* ========================================================================= */}
        {/* TOP BANNER */}
        {/* ========================================================================= */}
        <div className="mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-navy via-blue-900 to-navy text-white rounded-3xl p-5 sm:p-6 shadow-soft-lg border border-blue-400/20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-300 mb-2 border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Live Community Chat & Forum
            </div>
            <h1 className="font-display font-black text-xl sm:text-2xl text-white">
              Ruang Chat Diskusi Pendidikan Nusantara
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl mt-1">
              Diskusikan 3 isu strategis secara langsung, tukar bukti empiris, dan bangun jejaring bersama pendidik, peneliti muda, dan calon guru seluruh Indonesia.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <div className="text-xs font-bold text-white">
                {FORUM_ROOMS.reduce((acc, r) => acc + r.activeOnline, 0)} Pendidik & Peneliti Aktif
              </div>
              <div className="text-[10px] text-cyan-200">Tersebar di 3 Room Tematik</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN CHAT ROOM CONTAINER */}
        {/* ========================================================================= */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-blue-100 shadow-soft-lg overflow-hidden min-h-[640px]">
          
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR: ROOM SELECTOR & ONLINE PARTICIPANTS */}
          {/* ========================================================================= */}
          <aside className={`lg:col-span-4 bg-gradient-to-b from-[#F0F6FF] via-[#FAFCFF] to-white border-r border-blue-100 p-5 flex flex-col justify-between ${
            isSidebarOpenMobile ? 'fixed inset-0 z-50 bg-white' : 'hidden lg:flex'
          }`}>
            <div className="space-y-6">
              
              {/* Header & Mobile Close */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-base text-navy">
                    Room Tematik Aktif
                  </h3>
                </div>

                <button
                  onClick={() => setIsSidebarOpenMobile(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 3 THEMATIC ROOM CARDS */}
              <div className="space-y-2.5">
                {FORUM_ROOMS.map((room) => {
                  const isSelected = activeRoomId === room.slug;
                  const Icon = getRoomIcon(room.slug);

                  return (
                    <button
                      key={room.id}
                      onClick={() => {
                        setActiveRoomId(room.slug);
                        setIsSidebarOpenMobile(false);
                      }}
                      className={`w-full p-3.5 rounded-2xl text-left transition-all border ${
                        isSelected
                          ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-100'
                          : 'bg-white/70 hover:bg-white text-slate-700 border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl ${
                            room.slug === 'bullying' ? 'bg-red-50 text-red-600' :
                            room.slug === 'literasi-digital' ? 'bg-blue-50 text-blue-600' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-navy flex items-center gap-1.5">
                              {room.name}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {room.tagline}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                        )}
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                        <span className="flex items-center gap-1 text-emerald-600 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {room.activeOnline} Online
                        </span>
                        <span>{room.threadsCount} Pesan Terindeks</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* LIVE ACTIVE PARTICIPANTS PANEL */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    Anggota Aktif di Room Ini
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                    Live
                  </span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {activeParticipants.map((p) => (
                    <div
                      key={p.id}
                      className="p-2 rounded-xl bg-white/80 border border-slate-200/80 flex items-center gap-2.5 text-xs shadow-2xs"
                    >
                      <div className="relative">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-navy text-[11px] truncate">{p.name}</div>
                        <div className="text-[10px] text-blue-600 font-semibold truncate">{p.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Community Guidelines Badge */}
            <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100 mt-4">
              <div className="font-bold text-navy flex items-center gap-1.5 mb-1">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                Etika Diskusi Komunitas:
              </div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside text-[10px]">
                <li>Gunakan argumentasi berbasis bukti atau pengalaman nyata.</li>
                <li>Hargai keberagaman sudut pandang antar-institusi.</li>
                <li>Fokus pada perumusan rekomendasi konstruktif.</li>
              </ul>
            </div>
          </aside>

          {/* ========================================================================= */}
          {/* RIGHT PANEL: ACTIVE LIVE CHAT STREAM */}
          {/* ========================================================================= */}
          <main className="lg:col-span-8 flex flex-col justify-between bg-white relative">
            
            {/* ROOM CHAT HEADER */}
            <div className="px-5 py-3.5 border-b border-blue-100 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSidebarOpenMobile(true)}
                  className="p-2 rounded-xl text-slate-600 hover:bg-blue-50 lg:hidden"
                  aria-label="Buka navigasi room"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-bold text-base sm:text-lg text-navy leading-none">
                      Room {activeRoom.name}
                    </h2>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {activeRoom.activeOnline} Pendidik & Peneliti Sedang Terhubung
                  </span>
                </div>
              </div>

              {/* In-chat Search Input */}
              <div className="relative max-w-xs hidden sm:block">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari pesan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all w-36 focus:w-48"
                />
              </div>
            </div>

            {/* PINNED TOPIC PROMPT BANNER */}
            <div className="bg-gradient-to-r from-blue-50 via-cyan-50/50 to-blue-50 border-b border-blue-100 p-3.5 sm:p-4">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-600 text-white mt-0.5">
                  <Pin className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-blue-900 flex items-center justify-between">
                    <span>{activePrompt.title}</span>
                    <span className="text-[10px] text-blue-600 font-medium">{activePrompt.facilitator}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5 leading-snug">
                    "{activePrompt.prompt}"
                  </p>
                </div>
              </div>
            </div>

            {/* CHAT MESSAGES SCROLL LIST */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[460px]">
              {filteredMessages.map((msg) => {
                const isMine = msg.isCurrentUser || (user && msg.authorName === user.name);

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${isMine ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Author Avatar */}
                    <img
                      src={msg.authorAvatar}
                      alt={msg.authorName}
                      className="w-9 h-9 rounded-2xl object-cover border border-slate-200 shadow-xs flex-shrink-0 mt-1"
                    />

                    {/* Message Bubble Card */}
                    <div className={`max-w-[85%] sm:max-w-[75%] space-y-1.5 ${isMine ? 'text-right' : ''}`}>
                      
                      {/* Meta Header */}
                      <div className={`flex items-center gap-2 text-xs ${isMine ? 'justify-end' : ''}`}>
                        <span className="font-bold text-navy text-[12px]">{msg.authorName}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          isMine 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {msg.authorRole}
                        </span>
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>

                      {/* Quoted Message Preview (if reply) */}
                      {msg.replyTo && (
                        <div className={`text-[11px] p-2 rounded-xl border flex items-start gap-1.5 ${
                          isMine 
                            ? 'bg-blue-50/70 border-blue-200 text-left' 
                            : 'bg-slate-50 border-slate-200 text-left'
                        }`}>
                          <CornerDownRight className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-blue-800 text-[10px]">Membalas {msg.replyTo.authorName}:</span>
                            <p className="text-slate-600 line-clamp-1 italic">"{msg.replyTo.content}"</p>
                          </div>
                        </div>
                      )}

                      {/* Main Message Text Card */}
                      <div className={`p-3.5 rounded-2xl text-xs sm:text-sm text-left leading-relaxed shadow-xs ${
                        isMine
                          ? 'bg-blue-600 text-white rounded-tr-xs'
                          : 'bg-[#F8FAFC] border border-slate-200/90 text-slate-800 rounded-tl-xs'
                      }`}>
                        {msg.tag && (
                          <div className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md mb-1.5 ${
                            isMine ? 'bg-white/20 text-white' : 'bg-blue-100/70 text-blue-800'
                          }`}>
                            {msg.tag}
                          </div>
                        )}
                        <p className="whitespace-pre-line">{msg.content}</p>
                      </div>

                      {/* Reaction / Reply Buttons */}
                      <div className={`flex items-center gap-2 pt-0.5 text-xs text-slate-400 ${isMine ? 'justify-end' : ''}`}>
                        <button
                          onClick={() => handleReaction(msg.id, 'upvote')}
                          className={`px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all ${
                            msg.isLiked 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{msg.upvotes} Setuju</span>
                        </button>

                        <button
                          onClick={() => handleReaction(msg.id, 'insightful')}
                          className={`px-2 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all ${
                            msg.isInsightful 
                              ? 'bg-amber-100 text-amber-700' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                          }`}
                        >
                          <Lightbulb className="w-3 h-3 text-amber-500" />
                          <span>{msg.insightfulCount} Kritis</span>
                        </button>

                        {!isMine && (
                          <button
                            onClick={() => {
                              setReplyingTo(msg);
                              textareaRef.current?.focus();
                            }}
                            className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 flex items-center gap-1 transition-all"
                          >
                            <CornerDownRight className="w-3 h-3" />
                            <span>Balas</span>
                          </button>
                        )}
                      </div>

                    </div>
                  </motion.div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* CHAT INPUT AREA */}
            <div className="p-4 bg-[#FAFCFF] border-t border-blue-100">
              
              {/* Replying Banner */}
              {replyingTo && (
                <div className="mb-2.5 p-2 px-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-blue-900 truncate">
                    <CornerDownRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>Membalas <strong>{replyingTo.authorName}</strong>:</span>
                    <span className="text-slate-500 truncate italic">"{replyingTo.content}"</span>
                  </div>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Tag Selector Chips */}
              <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Kategori Nalar:
                </span>
                {tagOptions.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                      selectedTag === tag
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-blue-50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Tuliskan tanggapan, bukti lapangan, atau pertanyaan kritis Anda di Room ${activeRoom.name}...`}
                  rows={2}
                  className="w-full p-3.5 pr-24 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none"
                />

                {/* Action Send Button */}
                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                  <span className="hidden sm:inline text-[10px] text-slate-400 font-medium">
                    Enter ↵
                  </span>
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:hover:bg-blue-600 transition-all shadow-sm flex items-center gap-1.5"
                    aria-label="Kirim tanggapan"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                <span>Tekan <strong>Shift + Enter</strong> untuk baris baru.</span>
                <span>Mengirim sebagai: <strong>{user?.name || 'Faisal'} ({user?.role || 'Mahasiswa Pendidikan'})</strong></span>
              </div>
            </div>

          </main>

        </div>

      </div>
    </div>
  );
};
