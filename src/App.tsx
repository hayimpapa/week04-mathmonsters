import { useState, useEffect } from 'react';
import MonsterSelector from './components/MonsterSelector';
import DifficultySelector from './components/DifficultySelector';
import OperationSelector from './components/OperationSelector';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import Shop from './components/Shop';
import SessionHistory from './components/SessionHistory';
import AboutBuild from './components/AboutBuild';
import { GameState, Monster, Difficulty, Operation } from './types';
import { MONSTERS } from './data';
import {
  getStoredMonster,
  setStoredMonster,
  getTotalCorrect,
  getMunchCoins,
  getSessionHistory,
  getMonsterStage,
  getStreakMultiplier,
  speakText,
  stopSpeech,
  isSoundEnabled,
  setSoundEnabled
} from './utils';

type Screen = 'monster-select' | 'difficulty-select' | 'operation-select' | 'game' | 'results' | 'shop';

const LOGO_URL = 'https://raw.githubusercontent.com/hayimpapa/week00-main-page/main/public/w52.png';
const HOME_URL = 'https://52-app.com';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('monster-select');
  const [activeTab, setActiveTab] = useState<'app' | 'about'>('app');
  const [soundOn, setSoundOn] = useState(isSoundEnabled);
  const [streakMultiplier, setStreakMultiplier] = useState(1);

  const toggleSound = () => {
    const newValue = !soundOn;
    setSoundOn(newValue);
    setSoundEnabled(newValue);
  };
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

    setStreakMultiplier(getStreakMultiplier());

    setGameState(prev => ({
      ...prev,
      selectedMonster: storedMonster,
      munchCoins,
      sessionHistory,
    }));

    // Welcome message
    speakText("Welcome to Math Monsters! Let's have fun with math!");
  }, []);

  // Stop any ongoing speech whenever the screen changes
  useEffect(() => {
    stopSpeech();
  }, [currentScreen]);

  const selectMonster = (monster: Monster) => {
    const updatedMonster = { ...monster, stage: getMonsterStage(getTotalCorrect()) };
    setStoredMonster(updatedMonster);
    setGameState(prev => ({ ...prev, selectedMonster: updatedMonster }));
    setCurrentScreen('difficulty-select');
    speakText(`You chose ${monster.name}! ${monster.powerDescription}`);
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
    setStreakMultiplier(getStreakMultiplier());
    setGameState(prev => ({ ...prev, score: finalScore, munchCoins: getMunchCoins() }));
    setCurrentScreen('results');
  };

  const handleResultsContinue = () => {
    // Refresh session history after it was saved in ResultsScreen
    setGameState(prev => ({ ...prev, sessionHistory: getSessionHistory() }));
    setCurrentScreen('shop');
  };

  const handleShopContinue = () => {
    // Refresh coins from localStorage after shopping
    setGameState(prev => ({ ...prev, munchCoins: getMunchCoins() }));
    setCurrentScreen('monster-select');
  };

  const handleOpenShop = () => {
    setCurrentScreen('shop');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'monster-select':
        return (
          <MonsterSelector
            monsters={MONSTERS.map(m => ({ ...m, stage: getMonsterStage(getTotalCorrect()) }))}
            onSelect={selectMonster}
            selectedMonster={gameState.selectedMonster}
            onShopClick={handleOpenShop}
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
        <header className="mb-6">
          {/* Top row: home logo | title | about toggle */}
          <div className="flex items-center justify-between mb-2">
            <a
              href={HOME_URL}
              aria-label="Back to all apps"
              className="flex-shrink-0"
            >
              <img
                src={LOGO_URL}
                alt="Home"
                className="w-10 h-10 rounded-lg object-contain"
              />
            </a>

            <h1 className="text-3xl font-bold text-purple-600">Math Monsters</h1>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleSound}
                aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg shadow text-lg transition-colors ${
                  soundOn
                    ? 'bg-white hover:bg-purple-50'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {soundOn ? '🔊' : '🔇'}
              </button>
              <button
                onClick={() => {
                  stopSpeech();
                  setActiveTab(t => t === 'about' ? 'app' : 'about');
                }}
                aria-label={activeTab === 'about' ? 'Back to game' : 'About this build'}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow text-lg hover:bg-purple-50 transition-colors"
              >
                {activeTab === 'about' ? '✕' : 'ℹ️'}
              </button>
            </div>
          </div>

          {/* Second row: coins + streak + session history — hidden on About tab */}
          {activeTab === 'app' && (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-sm">
                <span>🍪 {gameState.munchCoins} Munch Coins</span>
                <SessionHistory history={gameState.sessionHistory} />
              </div>
              <div className={`text-xs font-bold text-center px-2 py-1 rounded-full ${
                streakMultiplier >= 5
                  ? 'bg-yellow-100 text-yellow-700'
                  : streakMultiplier > 1
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                🔥 Daily Streak: {streakMultiplier}x coin bonus
                {streakMultiplier >= 10 ? ' — MAX!' : ''}
              </div>
            </div>
          )}
        </header>

        {activeTab === 'about' ? <AboutBuild /> : renderScreen()}
      </div>
    </div>
  );
}

export default App;