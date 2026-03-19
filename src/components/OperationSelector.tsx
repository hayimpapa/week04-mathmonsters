import React, { useState } from 'react';
import { Operation } from '../types';

interface OperationSelectorProps {
  onSelect: (operations: Operation[]) => void;
}

const OperationSelector: React.FC<OperationSelectorProps> = ({ onSelect }) => {
  const [selectedOps, setSelectedOps] = useState<Operation[]>(['+', '-']);

  const operations: { key: Operation; label: string; emoji: string }[] = [
    { key: '+', label: 'Addition', emoji: '➕' },
    { key: '-', label: 'Subtraction', emoji: '➖' },
    { key: '×', label: 'Multiplication', emoji: '✖️' },
    { key: '÷', label: 'Division', emoji: '➗' }
  ];

  const toggleOperation = (op: Operation) => {
    setSelectedOps(prev => {
      if (prev.includes(op)) {
        return prev.filter(o => o !== op);
      } else {
        return [...prev, op];
      }
    });
  };

  const handleContinue = () => {
    if (selectedOps.length > 0) {
      onSelect(selectedOps);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Choose Operations</h2>
      <p className="text-gray-600 mb-6">Select the math operations you want to practice!</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {operations.map((op) => (
          <button
            key={op.key}
            onClick={() => toggleOperation(op.key)}
            className={`p-4 rounded-lg border-2 transition-all min-h-[80px] ${
              selectedOps.includes(op.key)
                ? 'border-purple-500 bg-purple-100'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="text-3xl mb-2">{op.emoji}</div>
            <div className="text-sm font-medium">{op.label}</div>
          </button>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={selectedOps.length === 0}
        className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
      >
        Start Game! 🎮
      </button>
    </div>
  );
};

export default OperationSelector;