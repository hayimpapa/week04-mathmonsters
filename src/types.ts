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
};