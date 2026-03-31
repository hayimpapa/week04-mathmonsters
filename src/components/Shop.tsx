import React, { useState, useEffect } from 'react';
import { ShopItem } from '../types';
import { SHOP_ITEMS } from '../data';
import {
  getMunchCoins, spendMunchCoins, addOwnedItem, getOwnedItems,
  getEquippedItems, setEquippedItem, speakText, EquippedItems
} from '../utils';

interface ShopProps {
  onContinue: () => void;
}

const Shop: React.FC<ShopProps> = ({ onContinue }) => {
  const [munchCoins, setMunchCoins] = useState(0);
  const [ownedItems, setOwnedItems] = useState<string[]>([]);
  const [equipped, setEquipped] = useState<EquippedItems>({ hat: null, accessory: null, color: null });

  useEffect(() => {
    setMunchCoins(getMunchCoins());
    setOwnedItems(getOwnedItems());
    setEquipped(getEquippedItems());
  }, []);

  const handlePurchase = (item: ShopItem) => {
    if (munchCoins >= item.cost && !ownedItems.includes(item.id)) {
      if (spendMunchCoins(item.cost)) {
        addOwnedItem(item.id);
        // Auto-equip on purchase
        setEquippedItem(item.type, item.id);
        setMunchCoins(prev => prev - item.cost);
        setOwnedItems(prev => [...prev, item.id]);
        setEquipped(prev => ({ ...prev, [item.type]: item.id }));
        speakText(`You bought ${item.name}!`);
      }
    }
  };

  const handleEquipToggle = (item: ShopItem) => {
    const isEquipped = equipped[item.type] === item.id;
    const newValue = isEquipped ? null : item.id;
    setEquippedItem(item.type, newValue);
    setEquipped(prev => ({ ...prev, [item.type]: newValue }));
    if (!isEquipped) {
      speakText(`${item.name} equipped!`);
    }
  };

  const groupedItems = SHOP_ITEMS.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, ShopItem[]>);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Monster Shop</h2>
      <div className="text-xl font-semibold mb-6 text-yellow-600">
        🍪 {munchCoins} Munch Coins
      </div>

      {Object.entries(groupedItems).map(([type, items]) => (
        <div key={type} className="mb-8">
          <h3 className="text-xl font-bold mb-4 capitalize text-gray-700">
            {type === 'hat' ? '🎩 Hats' : type === 'accessory' ? '💍 Accessories' : '🎨 Colors'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {items.map((item) => {
              const isOwned = ownedItems.includes(item.id);
              const isEquipped = equipped[item.type] === item.id;
              const canAfford = munchCoins >= item.cost;

              return (
                <div key={item.id} className="flex flex-col gap-1">
                  <button
                    onClick={() => isOwned ? handleEquipToggle(item) : handlePurchase(item)}
                    disabled={!isOwned && !canAfford}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isEquipped
                        ? 'bg-purple-100 border-purple-500 ring-2 ring-purple-400'
                        : isOwned
                        ? 'bg-green-50 border-green-400 hover:border-purple-400 hover:bg-purple-50'
                        : canAfford
                        ? 'bg-white border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                        : 'bg-gray-100 border-gray-300 text-gray-500'
                    }`}
                  >
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm mt-1">
                      {isEquipped ? (
                        <span className="text-purple-600 font-bold">Wearing ✅</span>
                      ) : isOwned ? (
                        <span className="text-green-600">Tap to wear</span>
                      ) : (
                        <span className="text-gray-600">{item.cost} 🍪</span>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={onContinue}
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
      >
        Back to Monsters! 🐲
      </button>
    </div>
  );
};

export default Shop;
