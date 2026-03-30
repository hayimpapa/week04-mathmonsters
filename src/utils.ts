import { Monster, Difficulty, Operation } from './types';

export const STORAGE_KEYS = {
  SELECTED_MONSTER: 'mathMonsters_selectedMonster',
  TOTAL_CORRECT: 'mathMonsters_totalCorrect',
  MUNICH_COINS: 'mathMonsters_munchCoins',
  OWNED_ITEMS: 'mathMonsters_ownedItems',
  SESSION_HISTORY: 'mathMonsters_sessionHistory',
  SOUND_ENABLED: 'mathMonsters_soundEnabled',
};

export const isSoundEnabled = (): boolean => {
  const stored = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
  // Sound is on by default
  return stored === null ? true : stored === 'true';
};

export const setSoundEnabled = (enabled: boolean) => {
  localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(enabled));
  if (!enabled) {
    stopSpeech();
  }
};

export const getStoredMonster = (): Monster | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_MONSTER);
  return stored ? JSON.parse(stored) : null;
};

export const setStoredMonster = (monster: Monster) => {
  localStorage.setItem(STORAGE_KEYS.SELECTED_MONSTER, JSON.stringify(monster));
};

export const getTotalCorrect = (): number => {
  const stored = localStorage.getItem(STORAGE_KEYS.TOTAL_CORRECT);
  return stored ? parseInt(stored, 10) : 0;
};

export const incrementTotalCorrect = () => {
  const current = getTotalCorrect();
  localStorage.setItem(STORAGE_KEYS.TOTAL_CORRECT, (current + 1).toString());
};

export const getMunchCoins = (): number => {
  const stored = localStorage.getItem(STORAGE_KEYS.MUNICH_COINS);
  return stored ? parseInt(stored, 10) : 0;
};

export const addMunchCoins = (amount: number) => {
  const current = getMunchCoins();
  localStorage.setItem(STORAGE_KEYS.MUNICH_COINS, (current + amount).toString());
};

export const spendMunchCoins = (amount: number): boolean => {
  const current = getMunchCoins();
  if (current >= amount) {
    localStorage.setItem(STORAGE_KEYS.MUNICH_COINS, (current - amount).toString());
    return true;
  }
  return false;
};

export const getOwnedItems = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.OWNED_ITEMS);
  return stored ? JSON.parse(stored) : [];
};

export const addOwnedItem = (itemId: string) => {
  const owned = getOwnedItems();
  if (!owned.includes(itemId)) {
    owned.push(itemId);
    localStorage.setItem(STORAGE_KEYS.OWNED_ITEMS, JSON.stringify(owned));
  }
};

export const getSessionHistory = (): number[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.SESSION_HISTORY);
  return stored ? JSON.parse(stored) : [];
};

export const addSessionScore = (score: number) => {
  const history = getSessionHistory();
  history.push(score);
  if (history.length > 5) {
    history.shift();
  }
  localStorage.setItem(STORAGE_KEYS.SESSION_HISTORY, JSON.stringify(history));
};

export const getMonsterStage = (totalCorrect: number): number => {
  if (totalCorrect <= 10) return 1;
  if (totalCorrect <= 25) return 2;
  if (totalCorrect <= 50) return 3;
  return 4;
};

export const generateQuestion = (
  difficulty: Difficulty,
  operations: Operation[]
): { num1: number; num2: number; operation: Operation; answer: number } => {
  const op = operations[Math.floor(Math.random() * operations.length)];
  let num1: number, num2: number, answer: number;

  switch (difficulty) {
    case 'easy':
      num1 = Math.floor(Math.random() * 5) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
      break;
    case 'medium':
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      break;
    case 'hard':
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      break;
  }

  switch (op) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      // Ensure positive result
      if (num1 < num2) [num1, num2] = [num2, num1];
      answer = num1 - num2;
      break;
    case '×':
      answer = num1 * num2;
      break;
    case '÷':
      // Round num1 down to the nearest multiple of num2 so both operands stay
      // within the difficulty range and the answer is always a whole number.
      num1 = Math.max(num2, Math.floor(num1 / num2) * num2);
      answer = num1 / num2;
      break;
  }

  return { num1, num2, operation: op, answer };
};

export const generateOptions = (correctAnswer: number, difficulty: Difficulty): number[] => {
  const options = [correctAnswer];
  const range = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 20;
  let attempts = 0;

  while (options.length < 4) {
    if (attempts < 20) {
      // Try random offsets first for variety
      const offset = Math.floor(Math.random() * range) - Math.floor(range / 2);
      const option = correctAnswer + offset;
      if (option > 0 && !options.includes(option)) {
        options.push(option);
      }
      attempts++;
    } else {
      // Fallback: walk upward from correctAnswer + 1 to guarantee termination
      const candidate = correctAnswer + options.length;
      if (!options.includes(candidate)) {
        options.push(candidate);
      }
    }
  }

  return options.sort(() => Math.random() - 0.5);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const speakText = (text: string, onEnd?: () => void) => {
  // When sound is off, skip speech entirely and advance quickly
  if (!isSoundEnabled()) {
    if (onEnd) {
      // Brief delay so the child can see correct/wrong feedback before advancing
      setTimeout(onEnd, 400);
    }
    return;
  }

  if ('speechSynthesis' in window) {
    // Cancel anything already playing before starting new speech
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    if (onEnd) {
      // Track whether the utterance was cancelled so we don't advance on cancel
      let interrupted = false;
      utterance.onerror = (e) => {
        if (e.error === 'interrupted') {
          interrupted = true;
        } else {
          // Unexpected error — still advance so the child isn't stuck
          onEnd();
        }
      };
      utterance.onend = () => {
        if (!interrupted) onEnd();
      };
    }
    window.speechSynthesis.speak(utterance);
  } else if (onEnd) {
    // No speech support — show result briefly then advance
    setTimeout(onEnd, 2000);
  }
};