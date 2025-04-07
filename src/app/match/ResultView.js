import React from 'react';
import './result-view.css';

export default function ResultView({ result }) {
  const { topParty, scoreMap } = result;

  return (
    <div className="result-view">
      <h2>診断結果</h2>
      <p>あなたと最も価値観の合うのは <strong>{topParty}</strong> です！</p>
      <h3>政党ごとのスコア:</h3>
      <ul>
        {Object.entries(scoreMap).map(([party, score]) => (
          <li key={party}>{party}: {score}点</li>
        ))}
      </ul>
    </div>
  );
}
