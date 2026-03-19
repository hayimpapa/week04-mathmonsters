import React, { useEffect } from 'react';
import { addSessionScore, speakText } from '../utils';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onContinue: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onContinue }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    addSessionScore(score);
    speakText(`You got ${score} out of ${totalQuestions} correct! ${percentage}%! Great work!`);
  }, [score, totalQuestions, percentage]);

  const getMessage = () => {
    if (percentage >= 90) return "Amazing! You're a math superstar! 🌟";
    if (percentage >= 70) return "Great job! Keep practicing! 👍";
    if (percentage >= 50) return "Good effort! Try again to improve! 💪";
    return "Don't worry! Practice makes perfect! 🌱";
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Game Complete!</h2>

      <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
        <div className="text-6xl font-bold mb-4 text-purple-600">
          {score}/{totalQuestions}
        </div>
        <div className="text-2xl font-semibold text-gray-700 mb-4">
          {percentage}%
        </div>
        <div className="text-lg text-gray-600">
          {getMessage()}
        </div>
      </div>

      <button
        onClick={onContinue}
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
      >
        Visit Shop! 🛍️
      </button>
    </div>
  );
};

export default ResultsScreen;