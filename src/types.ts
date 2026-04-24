export type MonsterPower = 'streak' | 'consistency' | 'endurance' | 'speed';

export type Monster = {
  id: string;
  name: string;
  personality: string;
  powerType: MonsterPower;
  powerDescription: string;
  color: string;
  stage: number;
};

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Operation = '+' | '-' | '×' | '÷';

export type Question = {
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  options: number[];
};

export type GameState = {
  selectedMonster: Monster | null;
  difficulty: Difficulty;
  operations: Operation[];
  currentQuestion: number;
  questions: Question[];
  score: number;
  munchCoins: number;
  sessionHistory: number[];
};

export type ShopItem = {
  id: string;
  name: string;
  type: 'hat' | 'accessory' | 'color';
  emoji: string;
  cost: number;
  // Minimum monster evolution stage required to purchase. 1 = available immediately.
  unlockStage?: number;
};

// Tracks the consecutive-day play streak. The multiplier cycles 1x → 10x → 1x.
export type DailyStreak = {
  // ISO date string (YYYY-MM-DD) of the most recent day the user completed a session.
  lastPlayDate: string;
  // Raw uncapped streak length. Multiplier is derived as ((rawStreakDay - 1) % 10) + 1.
  rawStreakDay: number;
};