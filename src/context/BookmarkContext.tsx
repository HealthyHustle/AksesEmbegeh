import React, { createContext, useContext, useState } from 'react';
import { StorageService } from '../services/storageService';
import { useToast } from './ToastContext';

interface BookmarkContextType {
  bookmarks: string[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (id: string, title?: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>(() => StorageService.getBookmarkedJournals());
  const { showToast } = useToast();

  const isBookmarked = (id: string) => bookmarks.includes(id);

  const toggleBookmark = (id: string, title?: string) => {
    const isNowBookmarked = StorageService.toggleJournalBookmark(id);
    setBookmarks(StorageService.getBookmarkedJournals());
    
    if (isNowBookmarked) {
      showToast(`Jurnal "${title ? (title.slice(0, 30) + '...') : id}" berhasil disimpan ke daftar bacaan.`, 'success');
    } else {
      showToast(`Jurnal dihapus dari daftar bacaan tersimpan.`, 'info');
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = (): BookmarkContextType => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
