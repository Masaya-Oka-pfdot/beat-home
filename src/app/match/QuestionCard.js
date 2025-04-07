// app/match/QuestionCard.js
import React from 'react';
import './question-card.css';

export default function QuestionCard({ question, onAnswer, currentIndex, totalQuestions ,onBack,}) {
  const { questionText, choices, labels } = question;
  const progressPercent = Math.round(((currentIndex) / totalQuestions) * 100);

  return (
    <div className="question-card">
      <div style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '14px' }}>
          <h2>問題 {currentIndex} / {totalQuestions}</h2>
        </div>
        <div style={{ height: '8px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#0055aa' }} />
        </div>
      </div>
      <h2>{questionText}</h2>
      <div className="choices">
        {choices.map((choice, index) => (
          <button key={index} onClick={() => onAnswer(choice)}>
            {labels[index]}
          </button>
        ))}
      </div>
      {currentIndex > 0 && (
        <button
          style={{ marginTop: '20px', backgroundColor: '#ccc',color:'black' }}
          onClick={onBack}
        >
          ← 前の質問に戻る
        </button>
      )}

    </div>
  );
}