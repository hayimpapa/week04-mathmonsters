import React, { useState, useEffect, useRef } from 'react';
import { GameState, Question } from '../types';
import { generateQuestion, generateOptions, speakText, incrementTotalCorrect, addMunchCoins, getBaseCoins, recordPlaySession } from '../utils';

interface GameScreenProps {
  gameState: GameState;
  onComplete: (score: number) => void;
  onQuit: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, onComplete, onQuit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  // Spark: track consecutive correct answers
  const [streak, setStreak] = useState(0);
  // Zephyr: countdown display
  const [timeLeft, setTimeLeft] = useState(5);
  // Coins earned on the current answer (for result feedback)
  const [coinsEarned, setCoinsEarned] = useState(0);
  // Daily streak multiplier (1x–10x), locked in at session start
  const [streakMultiplier, setStreakMultiplier] = useState(1);

  const isMounted = useRef(true);
  const questionStartTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    isMounted.current = false;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  }, []);

  const monster = gameState.selectedMonster;
  const monsterPower = monster?.powerType;

  useEffect(() => {
    setStreakMultiplier(recordPlaySession());

    const newQuestions: Question[] = [];
    for (let i = 0; i < 10; i++) {
      const q = generateQuestion(gameState.difficulty, gameState.operations);
      const options = generateOptions(q.answer, gameState.difficulty);
      newQuestions.push({ ...q, options });
    }
    setQuestions(newQuestions);
    if (newQuestions.length > 0) speakQuestion(newQuestions[0]);
  }, [gameState.difficulty, gameState.operations]);

  // Reset the start timestamp and (for Zephyr) restart the countdown on each new question
  useEffect(() => {
    if (questions.length === 0) return;
    questionStartTimeRef.current = Date.now();

    if (monsterPower === 'speed') {
      setTimeLeft(5);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      const id = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(id);
            if (timerIntervalRef.current === id) timerIntervalRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      timerIntervalRef.current = id;
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [currentQuestionIndex, questions.length, monsterPower]);

  const speakQuestion = (question: Question) => {
    const opWord: Record<string, string> = {
      '+': 'plus', '-': 'minus', '−': 'minus', '×': 'times', '÷': 'divided by',
    };
    const spoken = opWord[question.operation] ?? question.operation;
    speakText(`What is ${question.num1} ${spoken} ${question.num2}?`);
  };

  const handleAnswerSelect = (answer: number) => {
    if (showResult) return;

    // Stop Zephyr's countdown
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    setSelectedAnswer(answer);
    setShowResult(true);

    const currentQ = questions[currentQuestionIndex];
    const isCorrect = answer === currentQ.answer;
    const elapsedMs = Date.now() - questionStartTimeRef.current;

    let coins = 0;
    let newStreak = streak;

    if (isCorrect) {
      setScore(prev => prev + 1);
      incrementTotalCorrect();
      newStreak = streak + 1;
      setStreak(newStreak);

      const base = getBaseCoins(gameState.difficulty);
      let powerMultiplier = 1;
      switch (monsterPower) {
        case 'streak':
          if (newStreak >= 3) powerMultiplier = 2;
          break;
        case 'endurance':
          if (currentQuestionIndex >= 7) powerMultiplier = 2;
          break;
        case 'speed':
          if (elapsedMs <= 5000) powerMultiplier = 2;
          break;
      }
      coins = base * powerMultiplier * streakMultiplier;
      addMunchCoins(coins);
    } else {
      // Wrong answer resets Spark's streak
      newStreak = 0;
      setStreak(0);
      coins = 0;
    }

    setCoinsEarned(coins);

    const nextScore = score + (isCorrect ? 1 : 0);
    const advance = () => {
      if (!isMounted.current) return;
      if (currentQuestionIndex < 9) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        speakQuestion(questions[currentQuestionIndex + 1]);
      } else {
        if (monsterPower === 'consistency' && nextScore >= 8) {
          addMunchCoins(getBaseCoins(gameState.difficulty) * 3 * streakMultiplier);
        }
        onComplete(nextScore);
      }
    };

    const reactionText = isCorrect ? 'Correct! Great job!' : `Oops! The answer is ${currentQ.answer}`;
    speakText(reactionText, advance, isCorrect ? 400 : 1200);
  };

  if (questions.length === 0) {
    return <div className="text-center">Loading questions...</div>;
  }

  const currentQ = questions[currentQuestionIndex];
  const progressPercent = (currentQuestionIndex / 10) * 100;
  const isPowerQuestion = currentQuestionIndex >= 7; // Terra's last-3 indicator

  // Power status banner shown below the progress bar
  const renderPowerStatus = () => {
    switch (monsterPower) {
      case 'streak':
        return (
          <div className={`text-sm font-bold px-3 py-1 rounded-full transition-colors ${
            streak >= 3
              ? 'bg-orange-100 text-orange-600'
              : 'bg-gray-100 text-gray-500'
          }`}>
            🔥 Streak: {streak}
            {streak >= 3 ? ' — DOUBLE COINS!' : streak === 2 ? ' — one more!' : ''}
          </div>
        );
      case 'consistency':
        return (
          <div className={`text-sm font-bold px-3 py-1 rounded-full ${
            score >= 8 ? 'bg-teal-100 text-teal-600' : 'bg-blue-50 text-blue-500'
          }`}>
            💧 {score} right so far
            {score >= 8 ? ' — Bonus unlocked! ✨' : ` — get ${8 - score} more for bonus!`}
          </div>
        );
      case 'endurance':
        return (
          <div className={`text-sm font-bold px-3 py-1 rounded-full transition-colors ${
            isPowerQuestion ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
          }`}>
            🪨 {isPowerQuestion
              ? '⚡ POWER QUESTION — double coins!'
              : `Power questions in ${7 - currentQuestionIndex} more!`}
          </div>
        );
      case 'speed':
        return (
          <div className={`text-sm font-bold px-3 py-1 rounded-full transition-colors ${
            showResult
              ? 'bg-gray-100 text-gray-400'
              : timeLeft <= 2
              ? 'bg-red-100 text-red-600'
              : timeLeft <= 4
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-teal-100 text-teal-600'
          }`}>
            ⚡ {showResult
              ? 'Next question coming…'
              : timeLeft > 0
              ? `${timeLeft}s — answer fast for double coins!`
              : 'Too slow — no bonus this time!'}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-center">
      {/* Quit confirmation modal */}
      {showQuitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 mx-4 max-w-sm w-full shadow-2xl text-center">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Really quit?</h3>
            <p className="text-gray-500 mb-6">You'll lose your progress for this round.</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl text-lg min-h-[56px]"
              >
                Keep Playing!
              </button>
              <button
                onClick={onQuit}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-6 rounded-xl text-lg min-h-[56px]"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header: progress bar + quit button */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-700">
            Question {currentQuestionIndex + 1} of 10
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Score: {score}</span>
            <button
              onClick={() => setShowQuitConfirm(true)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-3 rounded-lg text-sm min-h-[48px] min-w-[48px]"
              aria-label="Quit game"
            >
              🏠
            </button>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
          <div
            className="bg-purple-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {/* Power status banner */}
        <div className="flex justify-center">
          {renderPowerStatus()}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
        <div className="text-3xl font-bold mb-4 text-gray-800">
          {currentQ.num1} {currentQ.operation} {currentQ.num2} = ?
        </div>

        <div className="grid grid-cols-2 gap-4">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
              className={`p-4 rounded-lg border-2 text-2xl font-bold transition-all min-h-[80px] ${
                showResult
                  ? option === currentQ.answer
                    ? 'bg-green-500 border-green-600 text-white'
                    : option === selectedAnswer
                    ? 'bg-red-500 border-red-600 text-white'
                    : 'bg-gray-100 border-gray-300'
                  : 'bg-blue-500 hover:bg-blue-600 border-blue-600 text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="text-xl font-semibold">
          {selectedAnswer === currentQ.answer ? (
            <span className="text-green-600">
              ✅ Correct! +{coinsEarned} Munch Coins
              {streakMultiplier > 1 ? ` (${streakMultiplier}x streak!)` : ''}
            </span>
          ) : (
            <span className="text-red-600">❌ The answer was {currentQ.answer}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default GameScreen;
