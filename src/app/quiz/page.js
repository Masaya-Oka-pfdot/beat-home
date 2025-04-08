'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '../../../store/quiz/quizStore'; 
import React from 'react';

export default function QuizStartPage() {
  const router = useRouter();
  const resetQuizStore = useQuizStore((state) => state.resetQuizStore);

  const handleStart = () => {
    resetQuizStore();
    router.push('/quiz/1');
  };

  return (
    <section style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>政治クイズに挑戦！</h1>
      <p>全10問、日本の行政に関する意外な事実を問います。</p>
      <button
        onClick={handleStart}
        style={{
          padding: '0.75rem 1.5rem',
          marginTop: '2rem',
          fontSize: '1.2rem',
          cursor: 'pointer',
        }}
      >
        クイズを始める
      </button>
    </section>
  );
}
