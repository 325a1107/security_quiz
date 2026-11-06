export type Difficulty = 'easy' | 'normal' | 'hard';

export type MessageMedium = 'email' | 'sms' | 'chat' | 'browser_alert';

export type PsychologicalTriggerType = 
  | 'urgency'         // 緊急性・時間制限（今すぐ〜しないと）
  | 'fear'            // 恐怖・不安（口座凍結、アカウント削除、法的手続き）
  | 'authority'       // 権威・組織（社長、情シス、警察、国税庁）
  | 'greed'           // 欲求・利得（還付金、当選、昇給、特別ボーナス）
  | 'social_proof'    // 同調圧力・標準化（全社員が完了済み、皆使っている）
  | 'familiarity'     // 好意・親近感（同僚、友人、急な出張先からの依頼）
  | 'confusion';      // 混乱・専門用語の煙幕（システム例外エラー、SSL失効）

export interface InspectionClue {
  id: string;
  targetArea: 'sender' | 'subject' | 'body' | 'url' | 'attachment' | 'header';
  label: string;
  isSuspicious: boolean;
  explanation: string;
}

export interface Scenario {
  id: string;
  difficulty: Difficulty;
  medium: MessageMedium;
  title: string;
  senderDisplay: string;
  senderAddress: string;
  recipientDisplay: string;
  subject?: string;
  timestamp: string;
  content: string;
  isSpoofed: boolean; // true = なりすまし/攻撃, false = 正規/安全
  attackType: string; // e.g. "フィッシング詐欺", "スミッシング", "BEC(ビジネスメール詐欺)", "正規通知"
  
  // リンクや添付ファイルなどのメタ情報
  urlInfo?: {
    displayText: string;
    actualUrl: string;
    isSuspicious: boolean;
  };
  attachmentInfo?: {
    fileName: string;
    fileSize: string;
    isSuspicious: boolean;
    note: string;
  };
  headers?: Record<string, string>;

  // 心理的誘導トリガー（なりすましの場合）
  psychologicalTriggers: {
    type: PsychologicalTriggerType;
    label: string;
    description: string;
  }[];

  // インスペクト（詳細調査）で確認できる手がかり
  clues: InspectionClue[];

  // 詳しい解説データ（リザルト画面・回答直後用）
  explanation: {
    summary: string;
    whySafeOrSpoofed: string;
    psychologicalTrap: string;
    checklistPoints: string[];
    defenseRule: string;
  };
}

export interface UserAnswerRecord {
  scenarioId: string;
  scenario: Scenario;
  userJudgedSpoofed: boolean;
  isCorrect: boolean;
  selectedTrigger?: PsychologicalTriggerType;
  cluesFound: string[];
  timeSpentSeconds: number;
}

export interface GameStats {
  difficulty: Difficulty;
  totalQuestions: number;
  correctCount: number;
  score: number;
  streak: number;
  maxStreak: number;
  livesRemaining: number;
  answers: UserAnswerRecord[];
  completedAt: string;
}

export interface DifficultyConfig {
  id: Difficulty;
  name: string;
  subTitle: string;
  badge: string;
  description: string;
  questionCount: number;
  initialLives: number;
  timeLimitPerQuestion?: number; // 秒数（hard用など）
  hintAllowed: boolean;
  targetAudience: string;
  features: string[];
}
