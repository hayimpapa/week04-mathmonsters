import React from 'react';
import { Difficulty } from '../types';

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect }) => {
  const difficulties = [
    {
      key: 'easy' as Difficulty,
      label: 'Starter',
      description: 'Numbers 1-5, + and - only',
      color: 'bg-green-500 hover:bg-green-600',
      emoji: '🌱'
    },
    {
      key: 'medium' as Difficulty,
      label: 'Explorer',
      description: 'Numbers 1-10, all operations',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      emoji: '🌟'
    },
    {
      key: 'hard' as Difficulty,
      label: 'Champion',
      description: 'Numbers 1-20, all operations',
      color: 'bg-red-500 hover:bg-red-600',
      emoji: '🔥'
    }
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Choose Difficulty</h2>
      <p className="text-gray-600 mb-6">Pick a level that challenges you just right!</p>

      <div className="space-y-4">
        {difficulties.map((diff) => (
          <button
            key={diff.key}
            onClick={() => onSelect(diff.key)}
            className={`${diff.color} text-white font-bold py-4 px-6 rounded-lg w-full text-left transition-colors min-h-[60px]`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-4">{diff.emoji}</span>
              <div>
                <div className="text-lg">{diff.label}</div>
                <div className="text-sm opacity-90">{diff.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;