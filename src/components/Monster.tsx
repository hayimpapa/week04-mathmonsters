import React from 'react';
import { Monster as MonsterType } from '../types';
import { EquippedItems } from '../utils';

interface MonsterProps {
  monster: MonsterType;
  isSelected: boolean;
  onClick: () => void;
  equippedItems?: EquippedItems;
}

export const HATS: Record<string, string> = {
  'crown': '👑',
  'party-hat': '🥳',
  'wizard-hat': '🧙',
  'pirate-hat': '🏴‍☠️',
};

export const ACCESSORIES: Record<string, string> = {
  'glasses': '🕶️',
  'bowtie': '🎀',
  'mustache': '🥸',
  'scarf': '🧣',
};

export const COLOR_EFFECTS: Record<string, string> = {
  'rainbow': 'rainbow-bg',
  'golden': 'golden-bg',
  'neon': 'neon-bg',
  'pastel': 'pastel-bg',
};

const Monster: React.FC<MonsterProps> = ({ monster, isSelected, onClick, equippedItems }) => {
  const getStageSize = (stage: number) => {
    switch (stage) {
      case 1: return 'w-24 h-24';
      case 2: return 'w-28 h-28';
      case 3: return 'w-32 h-32';
      case 4: return 'w-36 h-36';
      default: return 'w-24 h-24';
    }
  };

  const hat = equippedItems?.hat ? (HATS[equippedItems.hat] || '') : '';
  const accessory = equippedItems?.accessory ? (ACCESSORIES[equippedItems.accessory] || '') : '';
  const colorClass = equippedItems?.color ? (COLOR_EFFECTS[equippedItems.color] || '') : '';

  return (
    <button
      onClick={onClick}
      className={`relative ${getStageSize(monster.stage)} rounded-full border-4 transition-all duration-200 ${
        isSelected ? 'border-yellow-400 scale-110' : 'border-gray-300 hover:border-gray-400'
      } ${colorClass}`}
      style={{ backgroundColor: monster.color }}
    >
      {/* Monster body - simple shape */}
      <div className="absolute inset-2 rounded-full bg-white opacity-80"></div>
      <div className="absolute inset-4 rounded-full" style={{ backgroundColor: monster.color }}></div>

      {/* Eyes */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-black rounded-full"></div>
      <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-black rounded-full"></div>

      {/* Mouth */}
      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-5 h-2 border-b-2 border-black rounded-b-full"></div>

      {/* Hat - large and clearly above the monster */}
      {hat && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-3xl leading-none drop-shadow-lg">
          {hat}
        </div>
      )}

      {/* Accessory - placed clearly below the monster */}
      {accessory && (
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-2xl leading-none drop-shadow-lg">
          {accessory}
        </div>
      )}

      {/* Stage indicator */}
      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-black shadow-md">
        {monster.stage}
      </div>
    </button>
  );
};

export default Monster;