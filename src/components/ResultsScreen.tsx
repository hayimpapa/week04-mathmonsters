import React, { useEffect } from 'react';
import { addSessionScore, speakText, getStreakMultiplier } from '../utils';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onContinue: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, onContinue }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const streakMultiplier = getStreakMultiplier();

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

  const getStreakMessage = () => {
    if (streakMultiplier >= 10) return 'MAX STREAK! Incredible dedication!';
    if (streakMultiplier >= 5) return 'Amazing streak! Keep coming back!';
    if (streakMultiplier > 1) return 'Come back tomorrow to grow your streak!';
    return 'Play again tomorrow to start a streak!';
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
        <div className="text-lg text-gray-600 mb-4">
          {getMessage()}
        </div>

        <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
          streakMultiplier >= 5
            ? 'bg-yellow-100 text-yellow-700'
            : streakMultiplier > 1
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-600'
        }`}>
          🔥 Daily Streak: {streakMultiplier}x — {getStreakMessage()}
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