import React, { useState, useEffect } from 'react';
import { GameState, Question } from '../types';
import { generateQuestion, generateOptions, speakText, incrementTotalCorrect, addMunchCoins } from '../utils';

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

  useEffect(() => {
    // Generate 10 questions
    const newQuestions: Question[] = [];
    for (let i = 0; i < 10; i++) {
      const q = generateQuestion(gameState.difficulty, gameState.operations);
      const options = generateOptions(q.answer, gameState.difficulty);
      newQuestions.push({
        ...q,
        options
      });
    }
    setQuestions(newQuestions);

    // Speak first question
    if (newQuestions.length > 0) {
      speakQuestion(newQuestions[0]);
    }
  }, [gameState.difficulty, gameState.operations]);

  const speakQuestion = (question: Question) => {
    const text = `What is ${question.num1} ${question.operation} ${question.num2}?`;
    speakText(text);
  };

  const handleAnswerSelect = (answer: number) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const currentQ = questions[currentQuestionIndex];
    const isCorrect = answer === currentQ.answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      incrementTotalCorrect();
      addMunchCoins(10);
      speakText("Correct! Great job!");
    } else {
      speakText(`Oops! The answer is ${currentQ.answer}`);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < 9) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        speakQuestion(questions[currentQuestionIndex + 1]);
      } else {
        // Game complete
        onComplete(score + (isCorrect ? 1 : 0));
      }
    }, 2000);
  };

  if (questions.length === 0) {
    return <div className="text-center">Loading questions...</div>;
  }

  const currentQ = questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex) / 10) * 100;

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
      <div className="mb-6">
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
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-purple-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
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
            <span className="text-green-600">✅ Correct! +10 Munch Coins</span>
          ) : (
            <span className="text-red-600">❌ The answer was {currentQ.answer}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default GameScreen;