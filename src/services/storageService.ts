import { User, TestResult, Aspiration, ForumThread, ForumReply, RoomChatMessage, IssueTopicId } from '../types';
import { INITIAL_THREADS, INITIAL_ROOM_MESSAGES } from '../data/forum';
import { INITIAL_ASPIRATIONS } from '../data/aspirations';

const KEYS = {
  USER: 'mbg_user',
  REGISTERED_ACCOUNTS: 'mbg_registered_accounts',
  AUTH_SESSION: 'mbg_auth_session',
  BOOKMARKED_JOURNALS: 'mbg_bookmarked_journals',
  TEST_RESULTS: 'mbg_test_results',
  ASPIRATIONS: 'mbg_aspirations',
  THREADS: 'mbg_forum_threads',
  ROOM_MESSAGES: 'mbg_room_chat_messages',
  UPVOTED_ITEMS: 'mbg_upvoted_items',
  AI_SESSIONS: 'mbg_ai_sessions'
};

export interface RegisteredAccount {
  user: User;
  passwordHash: string;
}

export class StorageService {
  // User Auth & Session
  public static async hashPassword(password: string): Promise<string> {
    try {
      const msgBuffer = new TextEncoder().encode(password + '_mbg_salt_2026');
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      let hash = 0;
      for (let i = 0; i < password.length; i++) {
        hash = (hash << 5) - hash + password.charCodeAt(i);
        hash |= 0;
      }
      return 'h_' + Math.abs(hash).toString(16);
    }
  }

  public static getRegisteredAccounts(): RegisteredAccount[] {
    const data = localStorage.getItem(KEYS.REGISTERED_ACCOUNTS);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  public static saveRegisteredAccount(account: RegisteredAccount): void {
    const current = this.getRegisteredAccounts();
    const filtered = current.filter(a => a.user.email.toLowerCase() !== account.user.email.toLowerCase());
    filtered.push(account);
    localStorage.setItem(KEYS.REGISTERED_ACCOUNTS, JSON.stringify(filtered));
  }

  public static getUser(): User | null {
    const session = localStorage.getItem(KEYS.AUTH_SESSION);
    if (!session) return null;
    const data = localStorage.getItem(KEYS.USER);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  public static setUser(user: User | null): void {
    if (user) {
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
      localStorage.setItem(KEYS.AUTH_SESSION, JSON.stringify({
        token: `mbg_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now()
      }));
    } else {
      localStorage.removeItem(KEYS.USER);
      localStorage.removeItem(KEYS.AUTH_SESSION);
    }
  }

  // --- BOOKMARKED JOURNALS ---
  public static getBookmarkedJournals(): string[] {
    const data = localStorage.getItem(KEYS.BOOKMARKED_JOURNALS);
    if (!data) return ['jrn-01', 'jrn-04'];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  public static toggleJournalBookmark(journalId: string): boolean {
    const current = this.getBookmarkedJournals();
    const index = current.indexOf(journalId);
    let isBookmarked = false;
    if (index >= 0) {
      current.splice(index, 1);
      isBookmarked = false;
    } else {
      current.push(journalId);
      isBookmarked = true;
    }
    localStorage.setItem(KEYS.BOOKMARKED_JOURNALS, JSON.stringify(current));
    return isBookmarked;
  }

  // --- TEST RESULTS ---
  public static getTestResults(): TestResult[] {
    const data = localStorage.getItem(KEYS.TEST_RESULTS);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  public static saveTestResult(result: TestResult): void {
    const current = this.getTestResults();
    current.unshift(result);
    localStorage.setItem(KEYS.TEST_RESULTS, JSON.stringify(current));
  }

  // --- ASPIRATIONS ---
  public static getAspirations(): Aspiration[] {
    const data = localStorage.getItem(KEYS.ASPIRATIONS);
    if (!data) {
      localStorage.setItem(KEYS.ASPIRATIONS, JSON.stringify(INITIAL_ASPIRATIONS));
      return INITIAL_ASPIRATIONS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_ASPIRATIONS;
    }
  }

  public static addAspiration(aspiration: Aspiration): void {
    const current = this.getAspirations();
    current.unshift(aspiration);
    localStorage.setItem(KEYS.ASPIRATIONS, JSON.stringify(current));
  }

  public static toggleAspirationUpvote(aspirationId: string): number {
    const current = this.getAspirations();
    const upvotedMap = this.getUpvotedMap();
    const isUpvoted = !!upvotedMap[aspirationId];
    
    let newCount = 0;
    const updated = current.map(asp => {
      if (asp.id === aspirationId) {
        newCount = isUpvoted ? Math.max(0, asp.upvotes - 1) : asp.upvotes + 1;
        return {
          ...asp,
          upvotes: newCount,
          isUpvoted: !isUpvoted
        };
      }
      return asp;
    });

    upvotedMap[aspirationId] = !isUpvoted;
    localStorage.setItem(KEYS.UPVOTED_ITEMS, JSON.stringify(upvotedMap));
    localStorage.setItem(KEYS.ASPIRATIONS, JSON.stringify(updated));
    return newCount;
  }

  // --- LIVE CHAT ROOM MESSAGES ---
  public static getRoomMessages(roomId?: IssueTopicId): RoomChatMessage[] {
    const data = localStorage.getItem(KEYS.ROOM_MESSAGES);
    let allMessages: RoomChatMessage[] = INITIAL_ROOM_MESSAGES;
    if (data) {
      try {
        allMessages = JSON.parse(data);
      } catch {
        allMessages = INITIAL_ROOM_MESSAGES;
      }
    } else {
      localStorage.setItem(KEYS.ROOM_MESSAGES, JSON.stringify(INITIAL_ROOM_MESSAGES));
    }

    if (roomId) {
      return allMessages.filter(m => m.roomId === roomId);
    }
    return allMessages;
  }

  public static addRoomMessage(msg: RoomChatMessage): RoomChatMessage[] {
    const current = this.getRoomMessages();
    const updated = [...current, msg];
    localStorage.setItem(KEYS.ROOM_MESSAGES, JSON.stringify(updated));
    return updated.filter(m => m.roomId === msg.roomId);
  }

  public static toggleMessageReaction(msgId: string, type: 'upvote' | 'insightful'): RoomChatMessage[] {
    const current = this.getRoomMessages();
    const key = `${type}_${msgId}`;
    const upvotedMap = this.getUpvotedMap();
    const isReacted = !!upvotedMap[key];

    const updated = current.map(m => {
      if (m.id === msgId) {
        if (type === 'upvote') {
          const upvotes = isReacted ? Math.max(0, m.upvotes - 1) : m.upvotes + 1;
          return { ...m, upvotes, isLiked: !isReacted };
        } else {
          const insightfulCount = isReacted ? Math.max(0, m.insightfulCount - 1) : m.insightfulCount + 1;
          return { ...m, insightfulCount, isInsightful: !isReacted };
        }
      }
      return m;
    });

    upvotedMap[key] = !isReacted;
    localStorage.setItem(KEYS.UPVOTED_ITEMS, JSON.stringify(upvotedMap));
    localStorage.setItem(KEYS.ROOM_MESSAGES, JSON.stringify(updated));
    return updated;
  }

  // --- LEGACY FORUM THREADS & REPLIES ---
  public static getForumThreads(): ForumThread[] {
    const data = localStorage.getItem(KEYS.THREADS);
    if (!data) {
      localStorage.setItem(KEYS.THREADS, JSON.stringify(INITIAL_THREADS));
      return INITIAL_THREADS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_THREADS;
    }
  }

  public static addForumThread(thread: ForumThread): void {
    const current = this.getForumThreads();
    current.unshift(thread);
    localStorage.setItem(KEYS.THREADS, JSON.stringify(current));
  }

  public static addForumReply(threadId: string, reply: ForumReply): void {
    const current = this.getForumThreads();
    const updated = current.map(thr => {
      if (thr.id === threadId) {
        const replies = thr.replies ? [...thr.replies, reply] : [reply];
        return {
          ...thr,
          replies,
          repliesCount: replies.length
        };
      }
      return thr;
    });
    localStorage.setItem(KEYS.THREADS, JSON.stringify(updated));
  }

  public static toggleThreadUpvote(threadId: string): number {
    const current = this.getForumThreads();
    const upvotedMap = this.getUpvotedMap();
    const isUpvoted = !!upvotedMap[threadId];

    let count = 0;
    const updated = current.map(t => {
      if (t.id === threadId) {
        count = isUpvoted ? Math.max(0, t.upvotes - 1) : t.upvotes + 1;
        return { ...t, upvotes: count, isLiked: !isUpvoted };
      }
      return t;
    });

    upvotedMap[threadId] = !isUpvoted;
    localStorage.setItem(KEYS.UPVOTED_ITEMS, JSON.stringify(upvotedMap));
    localStorage.setItem(KEYS.THREADS, JSON.stringify(updated));
    return count;
  }

  private static getUpvotedMap(): Record<string, boolean> {
    const data = localStorage.getItem(KEYS.UPVOTED_ITEMS);
    if (!data) return {};
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
}
