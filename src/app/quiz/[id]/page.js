'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '../../../../store/quiz/quizStore';
import { quizQuestions } from '../../../../constants/quiz/quizQuestions';
import { quizStats } from '../../../../constants/quiz/quizStats';
import { Black_And_White_Picture } from 'next/font/google';
export default function QuizQuestionPage({ params }) {
  const router = useRouter();
  const questionId = Number(params.id);

  const question = quizQuestions.find((q) => q.id === questionId);
  const stat = quizStats.find((s) => s.id === questionId);

  const { answers, setAnswer } = useQuizStore();
  const [selected, setSelected] = useState(null);

  const record = answers[questionId];
  const isAnswered = record !== undefined;
  const isCorrect = record?.isCorrect;

  const handleAnswer = (index) => {
    if (isAnswered) return;
    const correct = index === question.correctIndex;
    setAnswer(questionId, correct, index); 
    setSelected(index);
  };

  const goNext = () => {
    const nextId = questionId + 1;
    if (nextId > quizQuestions.length) {
      router.push('/quiz/result');
    } else {
      router.push(`/quiz/${nextId}`);
    }
  };

  // 🔧 回答済みだったら選択状態を復元
  useEffect(() => {
    if (isAnswered) {
      setSelected(record.selectedIndex);
    }
  }, [isAnswered, record]);

  if (!question) {
    return <div>問題が見つかりませんでした。</div>;
  }

  return (
    <section style={{ padding: '2rem' }}>
      <h2>Q{question.id}. {question.question}</h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {question.options.map((option, index) => {
          const isUserChoice = index === selected;
          const isRightAnswer = index === question.correctIndex;

          let style = {
            color: 'black',
            padding: '0.5rem 1rem',
            margin: '0.5rem 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: isAnswered ? 'default' : 'pointer',
            backgroundColor: isAnswered
              ? isUserChoice
                ? isRightAnswer
                  ? '#c8f7c5' // 正解選択
                  : '#d0e9ff' // 不正解選択
                : isRightAnswer
                  ? '#f7c5c5' // 正解表示
                  : 'white'
              : 'white'
          };

          return (
            <li key={index} style={style} onClick={() => handleAnswer(index)}>
              {option}
            </li>
          );
        })}
      </ul>

      {isAnswered && (
        <div style={{ marginTop: '1.5rem' }}>
          <p>
            {isCorrect ? '正解！🎉' : '不正解 😢'}<br />
            <strong>解説:</strong> {question.explanation}
          </p>
          <p>
            <strong>全国正答率:</strong> {stat?.correctRate ?? '??'}%
          </p>
          <button
            onClick={goNext}
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '1rem' }}
          >
            {questionId === quizQuestions.length ? '結果を見る' : '次の問題へ'}
          </button>
        </div>
      )}
    </section>
  );
}
