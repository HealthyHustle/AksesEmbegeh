export type IssueTopicId = 'bullying' | 'literasi-digital' | 'ketimpangan-sosial';

export interface Issue {
  id: IssueTopicId;
  title: string;
  shortTitle: string;
  description: string;
  percentage: number;
  icon: string;
  color: string;
  accentColor: string;
  bgLight: string;
  keyStats: { label: string; value: string }[];
  impactDescription: string;
}

export interface Region {
  id: string;
  name: string;
  island: string;
  description: string;
  mainIssue: string;
  articlesCount: number;
  percentage: number;
  schoolAccessIndex: number;
  digitalLiteracyIndex: number;
  bullyingReportRate: number;
  keyHighlight: string;
  mapCoords: { x: number; y: number }; // Relative percentage on custom SVG map
}

export interface Journal {
  id: string;
  title: string;
  author: string;
  institution: string;
  year: number;
  issue: IssueTopicId;
  issueLabel: string;
  abstract: string;
  source: string;
  methodology: string;
  citationCount: number;
  tags: string[];
  pdfUrl?: string;
  isPeerReviewed: boolean;
}

export type CriticalThinkingDomain = 
  | 'Memahami Masalah'
  | 'Evaluasi Bukti'
  | 'Fakta vs Opini'
  | 'Evaluasi Argumen'
  | 'Sudut Pandang'
  | 'Inferensi'
  | 'Pengambilan Keputusan';

export interface Question {
  id: string;
  topic: IssueTopicId;
  caseStudy: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  category: CriticalThinkingDomain;
}

export type CriticalThinkingLevel = 
  | 'Needs Development'
  | 'Developing'
  | 'Critical Thinker'
  | 'Advanced Critical Thinker';

export interface DomainScore {
  domain: CriticalThinkingDomain;
  correct: number;
  total: number;
  percentage: number;
}

export interface TestResult {
  id: string;
  userId?: string;
  topic: IssueTopicId;
  topicTitle: string;
  score: number; // 0 - 100
  level: CriticalThinkingLevel;
  totalQuestions: number;
  correctAnswers: number;
  domainScores: DomainScore[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  completedAt: string;
}

export interface ForumRoom {
  id: string;
  slug: IssueTopicId;
  name: string;
  tagline: string;
  description: string;
  activeOnline: number;
  threadsCount: number;
  iconName: string;
  badgeColor: string;
}

export interface ForumReply {
  id: string;
  threadId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  upvotes: number;
  isLiked?: boolean;
}

export interface RoomParticipant {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isOnline: boolean;
  statusText: string;
}

export interface RoomChatMessage {
  id: string;
  roomId: IssueTopicId;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  isCurrentUser?: boolean;
  content: string;
  timestamp: string;
  upvotes: number;
  insightfulCount: number;
  isLiked?: boolean;
  isInsightful?: boolean;
  replyTo?: {
    authorName: string;
    content: string;
  };
  tag?: string;
}

export interface ForumThread {
  id: string;
  roomSlug: IssueTopicId | 'umum';
  roomName: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  createdAt: string;
  upvotes: number;
  repliesCount: number;
  tags: string[];
  isBookmarked?: boolean;
  isLiked?: boolean;
  replies?: ForumReply[];
}

export type AspirationTopic = 
  | 'Bullying'
  | 'Literasi Digital'
  | 'Ketimpangan Sosial'
  | 'Kebijakan Pendidikan'
  | 'Akses Pendidikan'
  | 'Kualitas Pembelajaran'
  | 'Lainnya';

export interface Aspiration {
  id: string;
  anonymousId: string; // e.g. "MBG-ANON-2847"
  topic: AspirationTopic;
  content: string;
  region?: string;
  createdAt: string;
  upvotes: number;
  isUpvoted?: boolean;
  status: 'Diverifikasi' | 'Ditindaklanjuti' | 'Dalam Peninjauan';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  institution?: string;
  bio?: string;
  joinedAt: string;
}

export type SocraticPhase = 1 | 2 | 3 | 4;

export interface SocraticScore {
  score: number;
  level: CriticalThinkingLevel;
  strengths: string[];
  weaknesses: string[];
  reasoningSummary: string;
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  phase?: SocraticPhase;
  phaseName?: string;
  suggestedPrompts?: string[];
  scoreCard?: SocraticScore;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
  type: 'system' | 'forum' | 'test' | 'aspirasi';
}

export interface AIQuotaStatus {
  used: number;
  max: number;
  remaining: number;
  isExhausted: boolean;
  isAnonymous: boolean;
}

export interface HookQuestion {
  id: string;
  topic: IssueTopicId;
  question: string;
  contextNote: string;
  suggestedAnswerStarts: string[];
}

export interface PillarCompetency {
  domain: 'Pedagogik' | 'Kepribadian' | 'Sosial' | 'Profesional';
  description: string;
}

export interface PillarDetail {
  id: IssueTopicId;
  title: string;
  subtitle: string;
  badge: string;
  iconName: string;
  color: string;
  accentColor: string;
  bgLight: string;
  description: string;
  placeContext: string; // Critical Pedagogy of Place narrative
  learningObjectives: string[];
  contextualCase: {
    headline: string;
    locationExample: string;
    problemDescription: string;
    reflectionPrompt: string;
  };
  competencies: PillarCompetency[];
  urgencyMetric: {
    percentage: number;
    label: string;
    stats: { label: string; value: string }[];
  };
  actionLinks: {
    aiTopic: IssueTopicId;
    testRoute: string;
    forumTopic: IssueTopicId;
  };
}
