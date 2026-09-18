export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameScreen = 'start' | 'playing' | 'result';

export interface Question {
  id: string;
  difficulty: Difficulty;
  sentence: string; // e.g., "The happy puppy runs in the park."
  highlightedWord: string; // e.g., "runs"
  koreanMeaning: string; // e.g., "행복한 강아지가 공원에서 달립니다."
  questionPrompt?: string; // e.g., "강조된 단어의 문법 명칭은?"
  correctAnswer: string; // e.g., "동사"
  options: string[]; // 4 choices e.g. ["동사", "명사", "형용사", "부사"]
  explanation: string; // 초등학생 눈높이 쉬운 1줄 해설
  category: string; // 문법 분류 (예: 품사, 시제, 조동사 등)
}

export interface UserAnswerRecord {
  question: Question;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpentMs: number;
}

export interface GameStats {
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  difficulty: Difficulty;
  records: UserAnswerRecord[];
  isGateDestroyed: boolean;
}
