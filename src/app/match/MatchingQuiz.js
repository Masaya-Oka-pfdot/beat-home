// app/match/MatchingQuiz.js
'use client';
import { useState } from 'react';
import QuestionCard from './QuestionCard';
import ResultView from './ResultView';
import questions from '../../../constants/match/questions';
import parties from '../../../constants/match/partyPolicies';

const calculateResult = (answers) => {
  
    const scores = {};
    for (const party in parties) {
      let score = 0;
      for (let i = 0; i < answers.length; i++) {
        if (answers[i] === parties[party][i]) {
          score += 2;
        } else if (
          answers[i] !== 0 &&
          parties[party][i] !== 0 &&
          answers[i] !== parties[party][i]
        ) {
          score -= 1;
        }
      }
      scores[party] = score;
    }
  
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return {
      topParty: sorted[0][0],
      scoreMap: scores,
    };
  };
  

  

  export default function MatchingQuiz() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
  
    const handleAnswer = (value) => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsComplete(true);
      }
    };
    const handleBack = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setAnswers(answers.slice(0, -1)); // 最後の回答を削除
        }
      };
  
    return (
      <div>
        {!isComplete ? (
          <QuestionCard
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            onBack={handleBack}
          />
        ) : (
          <ResultView result={calculateResult(answers)} />
        )}
      </div>
    );
  }
  