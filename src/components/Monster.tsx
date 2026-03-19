import React from 'react';
import { Monster as MonsterType } from '../types';

interface MonsterProps {
  monster: MonsterType;
  isSelected: boolean;
  onClick: () => void;
  ownedItems?: string[];
}

const Monster: React.FC<MonsterProps> = ({ monster, isSelected, onClick, ownedItems = [] }) => {
  const getStageSize = (stage: number) => {
    switch (stage) {
      case 1: return 'w-20 h-20';
      case 2: return 'w-24 h-24';
      case 3: return 'w-28 h-28';
      case 4: return 'w-32 h-32';
      default: return 'w-20 h-20';
    }
  };

  const getHat = () => {
    if (ownedItems.includes('crown')) return '👑';
    if (ownedItems.includes('party-hat')) return '🎉';
    if (ownedItems.includes('wizard-hat')) return '🧙';
    if (ownedItems.includes('pirate-hat')) return '🏴‍☠️';
    return '';
  };

  const getAccessory = () => {
    if (ownedItems.includes('glasses')) return '🕶️';
    if (ownedItems.includes('bowtie')) return '🎀';
    if (ownedItems.includes('mustache')) return '🧔';
    if (ownedItems.includes('scarf')) return '🧣';
    return '';
  };

  const getColorEffect = () => {
    if (ownedItems.includes('rainbow')) return 'rainbow-bg';
    if (ownedItems.includes('golden')) return 'golden-bg';
    if (ownedItems.includes('neon')) return 'neon-bg';
    if (ownedItems.includes('pastel')) return 'pastel-bg';
    return '';
  };

  return (
    <button
      onClick={onClick}
      className={`relative ${getStageSize(monster.stage)} rounded-full border-4 transition-all duration-200 ${
        isSelected ? 'border-yellow-400 scale-110' : 'border-gray-300 hover:border-gray-400'
      } ${getColorEffect()}`}
      style={{ backgroundColor: monster.color }}
    >
      {/* Monster body - simple shape */}
      <div className="absolute inset-2 rounded-full bg-white opacity-80"></div>
      <div className="absolute inset-4 rounded-full" style={{ backgroundColor: monster.color }}></div>

      {/* Eyes */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-black rounded-full"></div>
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-black rounded-full"></div>

      {/* Mouth */}
      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-b-full"></div>

      {/* Hat */}
      {getHat() && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-lg">
          {getHat()}
        </div>
      )}

      {/* Accessory */}
      {getAccessory() && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-sm">
          {getAccessory()}
        </div>
      )}

      {/* Stage indicator */}
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-black">
        {monster.stage}
      </div>
    </button>
  );
};

export default Monster;