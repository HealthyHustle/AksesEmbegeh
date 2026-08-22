import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Sparkles, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { ChatMessage as ChatMessageType, SocraticScore } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
  onSelectPrompt?: (prompt: string) => void;
  onViewScoreCard?: (score: SocraticScore) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onSelectPrompt,
  onViewScoreCard 
}) => {
  const isAI = message.sender === 'ai';

  // Basic markdown formatting helper for bold and italic
  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, pIdx) => {
      const parts = paragraph.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return (
        <p key={pIdx} className={pIdx > 0 ? 'mt-2.5' : ''}>
          {parts.map((part, idx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={idx} className="font-bold text-navy">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={idx} className="italic text-blue-800">{part.slice(1, -1)}</em>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 sm:gap-4 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {/* AI AVATAR */}
      {isAI && (
        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-100">
          <Bot className="w-5 h-5" />
        </div>
      )}

      {/* MESSAGE BODY */}
      <div className={`max-w-[88%] sm:max-w-[78%] space-y-2`}>
        {/* Phase / Badge Info for AI */}
        {isAI && message.phaseName && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full w-fit border border-blue-100">
            <Sparkles className="w-3 h-3 text-blue-500" />
            {message.phaseName}
          </div>
        )}

        <div
          className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl text-sm leading-relaxed ${
            isAI
              ? 'bg-white text-slate-800 border border-blue-100/90 shadow-soft'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/15 font-medium'
          }`}
        >
          {formatText(message.text)}

          {/* If there's a scoreCard attached */}
          {message.scoreCard && (
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Critical Thinking Score
                  </div>
                  <div className="font-display font-black text-2xl text-navy">
                    {message.scoreCard.score} <span className="text-sm font-semibold text-slate-500">/ 100</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-600 mt-0.5">
                    {message.scoreCard.level}
                  </div>
                </div>

                {onViewScoreCard && (
                  <button
                    onClick={() => onViewScoreCard(message.scoreCard!)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Award className="w-4 h-4" />
                    Buka Rapor Nalar
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts if AI */}
        {isAI && message.suggestedPrompts && message.suggestedPrompts.length > 0 && onSelectPrompt && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="w-full text-[11px] font-semibold text-slate-400 pl-1">
              💡 Rekomendasi Argumen Dialektika:
            </span>
            {message.suggestedPrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => onSelectPrompt(prompt)}
                className="text-left text-xs bg-white hover:bg-blue-50/80 hover:border-blue-300 text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs transition-all flex items-center gap-1 group"
              >
                <span>{prompt}</span>
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        <div className={`text-[10px] text-slate-400 ${isAI ? 'text-left pl-1' : 'text-right pr-1'}`}>
          {message.timestamp}
        </div>
      </div>

      {/* USER AVATAR */}
      {!isAI && (
        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center shadow-md ring-2 ring-slate-200">
          <User className="w-5 h-5 text-blue-200" />
        </div>
      )}
    </motion.div>
  );
};
