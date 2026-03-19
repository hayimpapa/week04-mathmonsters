import React from 'react';

interface SessionHistoryProps {
  history: number[];
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return <span className="text-sm text-gray-500">No games played yet</span>;
  }

  return (
    <div className="flex items-center space-x-1">
      <span className="text-sm text-gray-600">Last scores:</span>
      {history.slice(-5).map((score, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
        >
          {score}/10
        </span>
      ))}
    </div>
  );
};

export default SessionHistory;