import { Monster, ShopItem } from './types';

export const MONSTERS: Monster[] = [
  {
    id: 'spark',
    name: 'Spark',
    personality: 'Enthusiastic fire monster who loves challenges!',
    powerType: 'streak',
    powerDescription: 'Get 3 right in a row for DOUBLE coins! 🔥',
    color: '#FF6B35',
    stage: 1,
  },
  {
    id: 'aqua',
    name: 'Aqua',
    personality: 'Calm water monster who thinks carefully.',
    powerType: 'consistency',
    powerDescription: 'Get 8 out of 10 right to earn a big bonus! 💧',
    color: '#4ECDC4',
    stage: 1,
  },
  {
    id: 'terra',
    name: 'Terra',
    personality: 'Strong earth monster who never gives up!',
    powerType: 'endurance',
    powerDescription: 'The last 3 questions give DOUBLE coins! 🪨',
    color: '#45B7D1',
    stage: 1,
  },
  {
    id: 'zephyr',
    name: 'Zephyr',
    personality: 'Quick air monster who solves puzzles fast.',
    powerType: 'speed',
    powerDescription: 'Answer in 5 seconds for DOUBLE coins! ⚡',
    color: '#96CEB4',
    stage: 1,
  },
];

// Shop items use tiered pricing + evolution gating so progression unlocks better cosmetics:
//   Stage 1 (Hatchling)   → cheap starter items, available immediately
//   Stage 2 (Junior)      → mid-tier items, unlocks after ~10 correct answers
//   Stage 3 (Adult)       → premium items, unlocks after ~25 correct answers
//   Stage 4 (Legendary)   → top-tier items, unlocks after ~50 correct answers
export const SHOP_ITEMS: ShopItem[] = [
  // ── Hats ─────────────────────────────────────────────────────────────────
  // Stage 1 — starters
  { id: 'beanie', name: 'Cozy Beanie', type: 'hat', emoji: '🧢', cost: 20, unlockStage: 1 },
  { id: 'party-hat', name: 'Party Hat', type: 'hat', emoji: '🎉', cost: 30, unlockStage: 1 },
  { id: 'pirate-hat', name: 'Pirate Hat', type: 'hat', emoji: '🏴‍☠️', cost: 45, unlockStage: 1 },
  // Stage 2 — junior
  { id: 'wizard-hat', name: 'Wizard Hat', type: 'hat', emoji: '🧙', cost: 90, unlockStage: 2 },
  { id: 'top-hat', name: 'Top Hat', type: 'hat', emoji: '🎩', cost: 120, unlockStage: 2 },
  // Stage 3 — premium
  { id: 'crown', name: 'Royal Crown', type: 'hat', emoji: '👑', cost: 250, unlockStage: 3 },
  { id: 'cowboy-hat', name: 'Cowboy Hat', type: 'hat', emoji: '🤠', cost: 220, unlockStage: 3 },
  // Stage 4 — legendary
  { id: 'halo', name: 'Glowing Halo', type: 'hat', emoji: '😇', cost: 600, unlockStage: 4 },

  // ── Accessories ──────────────────────────────────────────────────────────
  // Stage 1 — starters
  { id: 'mustache', name: 'Curly Mustache', type: 'accessory', emoji: '🧔', cost: 15, unlockStage: 1 },
  { id: 'bowtie', name: 'Bow Tie', type: 'accessory', emoji: '🎀', cost: 25, unlockStage: 1 },
  { id: 'glasses', name: 'Cool Glasses', type: 'accessory', emoji: '🕶️', cost: 35, unlockStage: 1 },
  { id: 'scarf', name: 'Warm Scarf', type: 'accessory', emoji: '🧣', cost: 50, unlockStage: 1 },
  // Stage 2 — junior
  { id: 'backpack', name: 'Adventure Pack', type: 'accessory', emoji: '🎒', cost: 100, unlockStage: 2 },
  // Stage 3 — premium
  { id: 'cape', name: 'Hero Cape', type: 'accessory', emoji: '🦸', cost: 200, unlockStage: 3 },
  { id: 'star-necklace', name: 'Star Necklace', type: 'accessory', emoji: '⭐', cost: 280, unlockStage: 3 },
  // Stage 4 — legendary
  { id: 'wings', name: 'Mystic Wings', type: 'accessory', emoji: '🪽', cost: 550, unlockStage: 4 },

  // ── Colors ───────────────────────────────────────────────────────────────
  // Stage 1 — starters
  { id: 'neon', name: 'Neon Bright', type: 'color', emoji: '💡', cost: 70, unlockStage: 1 },
  // Stage 2 — junior
  { id: 'pastel', name: 'Pastel Dream', type: 'color', emoji: '🦄', cost: 130, unlockStage: 2 },
  { id: 'fire', name: 'Fire Flicker', type: 'color', emoji: '🔥', cost: 160, unlockStage: 2 },
  // Stage 3 — premium
  { id: 'crystal', name: 'Crystal Shine', type: 'color', emoji: '💎', cost: 280, unlockStage: 3 },
  { id: 'golden', name: 'Golden Glow', type: 'color', emoji: '✨', cost: 320, unlockStage: 3 },
  { id: 'rainbow', name: 'Rainbow Skin', type: 'color', emoji: '🌈', cost: 400, unlockStage: 3 },
  // Stage 4 — legendary
  { id: 'galaxy', name: 'Galaxy Swirl', type: 'color', emoji: '🌌', cost: 750, unlockStage: 4 },
];
