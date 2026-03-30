import React from 'react';
import Monster from './Monster';
import { Monster as MonsterType } from '../types';
import { getOwnedItems } from '../utils';

interface MonsterSelectorProps {
  monsters: MonsterType[];
  onSelect: (monster: MonsterType) => void;
  selectedMonster: MonsterType | null;
  onShopClick: () => void;
}

const MonsterSelector: React.FC<MonsterSelectorProps> = ({ monsters, onSelect, selectedMonster, onShopClick }) => {
  const ownedItems = getOwnedItems();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Choose Your Monster!</h2>
      <p className="text-gray-600 mb-6">Each monster has a unique personality to help you learn math.</p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {monsters.map((monster) => (
          <div key={monster.id} className="flex flex-col items-center">
            <Monster
              monster={monster}
              isSelected={selectedMonster?.id === monster.id}
              onClick={() => onSelect(monster)}
              ownedItems={ownedItems}
            />
            <h3 className="text-lg font-semibold mt-2 text-gray-800">{monster.name}</h3>
            <p className="text-sm text-gray-600 text-center">{monster.personality}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 items-center">
        <button
          onClick={() => selectedMonster && onSelect(selectedMonster)}
          disabled={!selectedMonster}
          className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors w-full max-w-xs"
        >
          Start Adventure! 🚀
        </button>
        <button
          onClick={onShopClick}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg transition-colors w-full max-w-xs"
        >
          Monster Shop 🛍️
        </button>
      </div>
    </div>
  );
};

export default MonsterSelector;