import { useState, useEffect } from 'react';
import MonsterSelector from './components/MonsterSelector';
import DifficultySelector from './components/DifficultySelector';
import OperationSelector from './components/OperationSelector';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import Shop from './components/Shop';
import SessionHistory from './components/SessionHistory';
import { GameState, Monster, Difficulty, Operation } from './types';
import { MONSTERS } from './data';
import {
  getStoredMonster,
  setStoredMonster,
  getTotalCorrect,
  getMunchCoins,
  getSessionHistory,
  getMonsterStage,
  speakText
} from './utils';

type Screen = 'monster-select' | 'difficulty-select' | 'operation-select' | 'game' | 'results' | 'shop';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('monster-select');
  const [gameState, setGameState] = useState<GameState>({
    selectedMonster: null,
    difficulty: 'easy',
    operations: ['+', '-'],
    currentQuestion: 0,
    questions: [],
    score: 0,
    munchCoins: 0,
    sessionHistory: [],
  });

  useEffect(() => {
    // Load initial data
    const storedMonster = getStoredMonster();
    const totalCorrect = getTotalCorrect();
    const munchCoins = getMunchCoins();
    const sessionHistory = getSessionHistory();

    if (storedMonster) {
      storedMonster.stage = getMonsterStage(totalCorrect);
      setStoredMonster(storedMonster);
    }

    setGameState(prev => ({
      ...prev,
      selectedMonster: storedMonster,
      munchCoins,
      sessionHistory,
    }));

    // Welcome message
    speakText("Welcome to Math Monsters! Let's have fun with math!");
  }, []);

  const selectMonster = (monster: Monster) => {
    const updatedMonster = { ...monster, stage: getMonsterStage(getTotalCorrect()) };
    setStoredMonster(updatedMonster);
    setGameState(prev => ({ ...prev, selectedMonster: updatedMonster }));
    setCurrentScreen('difficulty-select');
    speakText(`You chose ${monster.name}! ${monster.personality}`);
  };

  const selectDifficulty = (difficulty: Difficulty) => {
    if (difficulty === 'easy') {
      // Easy is + and − only per spec — skip OperationSelector entirely
      setGameState(prev => ({ ...prev, difficulty, operations: ['+', '-'] }));
      setCurrentScreen('game');
    } else {
      setGameState(prev => ({ ...prev, difficulty }));
      setCurrentScreen('operation-select');
    }
  };

  const selectOperations = (operations: Operation[]) => {
    setGameState(prev => ({ ...prev, operations }));
    setCurrentScreen('game');
    // Generate questions here
  };

  const handleGameComplete = (finalScore: number) => {
    setGameState(prev => ({ ...prev, score: finalScore }));
    setCurrentScreen('results');
  };

  const handleResultsContinue = () => {
    setCurrentScreen('shop');
  };

  const handleShopContinue = () => {
    setCurrentScreen('monster-select');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'monster-select':
        return (
          <MonsterSelector
            monsters={MONSTERS.map(m => ({ ...m, stage: getMonsterStage(getTotalCorrect()) }))}
            onSelect={selectMonster}
            selectedMonster={gameState.selectedMonster}
          />
        );
      case 'difficulty-select':
        return <DifficultySelector onSelect={selectDifficulty} />;
      case 'operation-select':
        return <OperationSelector onSelect={selectOperations} />;
      case 'game':
        return (
          <GameScreen
            gameState={gameState}
            onComplete={handleGameComplete}
            onQuit={() => setCurrentScreen('difficulty-select')}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            score={gameState.score}
            totalQuestions={10}
            onContinue={handleResultsContinue}
          />
        );
      case 'shop':
        return <Shop onContinue={handleShopContinue} />;
      default:
        return <div>Unknown screen</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">Math Monsters</h1>
          <div className="flex justify-between items-center text-sm">
            <span>🍪 {gameState.munchCoins} Munch Coins</span>
            <SessionHistory history={gameState.sessionHistory} />
          </div>
        </header>

        {renderScreen()}
      </div>
    </div>
  );
}

export default App;