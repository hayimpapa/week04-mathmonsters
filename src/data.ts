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

export const SHOP_ITEMS: ShopItem[] = [
  // Hats
  { id: 'crown', name: 'Royal Crown', type: 'hat', emoji: '👑', cost: 50 },
  { id: 'party-hat', name: 'Party Hat', type: 'hat', emoji: '🎉', cost: 30 },
  { id: 'wizard-hat', name: 'Wizard Hat', type: 'hat', emoji: '🧙', cost: 40 },
  { id: 'pirate-hat', name: 'Pirate Hat', type: 'hat', emoji: '🏴‍☠️', cost: 35 },

  // Accessories
  { id: 'glasses', name: 'Cool Glasses', type: 'accessory', emoji: '🕶️', cost: 25 },
  { id: 'bowtie', name: 'Bow Tie', type: 'accessory', emoji: '🎀', cost: 20 },
  { id: 'mustache', name: 'Curly Mustache', type: 'accessory', emoji: '🧔', cost: 15 },
  { id: 'scarf', name: 'Warm Scarf', type: 'accessory', emoji: '🧣', cost: 30 },

  // Colors
  { id: 'rainbow', name: 'Rainbow Skin', type: 'color', emoji: '🌈', cost: 100 },
  { id: 'golden', name: 'Golden Glow', type: 'color', emoji: '✨', cost: 80 },
  { id: 'neon', name: 'Neon Bright', type: 'color', emoji: '💡', cost: 60 },
  { id: 'pastel', name: 'Pastel Dream', type: 'color', emoji: '🦄', cost: 70 },
];