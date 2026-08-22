import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ThumbsUp, 
  MessageCircle, 
  Send, 
  Tag, 
  Share2, 
  Bookmark, 
  Flag, 
  ShieldCheck, 
  Lock,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { StorageService } from '../services/storageService';
import { ForumThread as ForumThreadType, ForumReply } from '../types';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const ForumThread: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [threads, setThreads] = useState<ForumThreadType[]>(() => StorageService.getForumThreads());
  const [replyText, setReplyText] = useState<string>('');

  const thread = threads.find(t => t.id === threadId);

  if (!thread) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <p className="text-slate-600 font-bold">Topik diskusi tidak ditemukan.</p>
          <Link to="/forum" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
            Kembali ke Forum
          </Link>
        </div>
      </div>
    );
  }

  const handleUpvoteThread = () => {
    if (!isAuthenticated) {
      showToast('Silakan login untuk mendukung diskusi ini.', 'info');
      return;
    }
    StorageService.toggleThreadUpvote(thread.id);
    setThreads(StorageService.getForumThreads());
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      showToast('Silakan login untuk membalas diskusi.', 'error');
      return;
    }
    if (!replyText.trim()) return;

    const newReply: ForumReply = {
      id: `rep-${Date.now()}`,
      threadId: thread.id,
      authorName: user.name,
      authorRole: user.role,
      authorAvatar: user.avatar,
      content: replyText.trim(),
      createdAt: 'Baru saja',
      upvotes: 1
    };

    StorageService.addForumReply(thread.id, newReply);
    setThreads(StorageService.getForumThreads());
    setReplyText('');
    showToast('Tanggapan Anda berhasil ditambahkan!', 'success');
  };

  return (
    <div className="bg-[#FAFCFF] min-h-screen pb-24">
      
      {/* TOP BREADCRUMB */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/forum"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Semua Forum</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* MAIN THREAD CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-soft-lg space-y-6">
          
          {/* Room Badge and Author */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src={thread.authorAvatar}
                alt={thread.authorName}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-100"
              />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-navy">
                  {thread.authorName}
                </h3>
                <div className="text-xs text-slate-500 font-medium">
                  {thread.authorRole} • <span className="text-slate-400">{thread.createdAt}</span>
                </div>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {thread.roomName}
            </span>
          </div>

          {/* Title & Body */}
          <div className="space-y-3">
            <h1 className="font-display font-black text-xl sm:text-2xl text-navy leading-snug">
              {thread.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {thread.content}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {thread.tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-xl flex items-center gap-1">
                <Tag className="w-3 h-3 text-slate-400" />
                {tag}
              </span>
            ))}
          </div>

          {/* Interactions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleUpvoteThread}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  thread.isLiked
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{thread.upvotes} Dukungan</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                <span>{thread.replies ? thread.replies.length : 0} Tanggapan Komunitas</span>
              </div>
            </div>

            <button
              onClick={() => showToast('Tautan diskusi telah disalin.', 'info')}
              className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50"
              aria-label="Bagikan diskusi"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REPLIES SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-xl text-navy">
            Tanggapan & Diskusi Nalar ({thread.replies ? thread.replies.length : 0})
          </h2>

          {/* Replies List */}
          <div className="space-y-4">
            {thread.replies && thread.replies.length > 0 ? (
              thread.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={reply.authorAvatar}
                        alt={reply.authorName}
                        className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-navy">
                          {reply.authorName}
                        </div>
                        <div className="text-[10px] sm:text-xs text-slate-500">
                          {reply.authorRole} • <span className="text-slate-400">{reply.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {reply.upvotes}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-12">
                    {reply.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2 text-slate-500 text-xs">
                <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                <p>Belum ada tanggapan pada topik ini. Jadilah yang pertama memberikan analisis!</p>
              </div>
            )}
          </div>

          {/* ADD REPLY FORM */}
          {isAuthenticated && user ? (
            <form onSubmit={handleAddReply} className="bg-white rounded-3xl p-6 border border-blue-200 shadow-soft space-y-4">
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover" />
                <span className="text-xs font-bold text-navy">Beri Tanggapan sebagai {user.name}</span>
              </div>

              <textarea
                rows={3}
                placeholder="Tuliskan pandangan nalar kritis, rujukan data, atau solusi alternatif Anda..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm disabled:opacity-40 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Tanggapan</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200 text-center space-y-3">
              <Lock className="w-6 h-6 text-blue-600 mx-auto" />
              <div className="text-xs font-bold text-navy">
                Login untuk menyuarakan analisis dan tanggapan Anda
              </div>
              <Link
                to="/login"
                className="inline-block px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm"
              >
                Masuk ke Akun
              </Link>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
