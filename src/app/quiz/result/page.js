'use client';

import { useQuizStore } from '../../../../store/quiz/quizStore';
import { quizQuestions } from '../../../../constants/quiz/quizQuestions';
import { quizStats } from '../../../../constants/quiz/quizStats';
import { useRouter } from 'next/navigation';

export default function QuizResultPage() {
  const { answers } = useQuizStore();
  const router = useRouter();

  const totalQuestions = quizQuestions.length;
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length;
  const correctRate = Math.round((correctCount / totalQuestions) * 100);

  return (
    <section style={{ padding: '2rem' }}>
      <h1>結果一覧</h1>

      <div style={{ marginBottom: '1rem' }}>
        <strong>成績：</strong>
        {correctCount}問正解 / {totalQuestions}問中（正答率：{correctRate}%）
      </div>

      <ul style={{ padding: 0, listStyle: 'none' }}>
        {quizQuestions.map((question) => {
          const record = answers[question.id];
          const stat = quizStats.find((s) => s.id === question.id);

          const isCorrect = record?.isCorrect;
          const selectedIndex = record?.selectedIndex;

          return (
            <li
              key={question.id}
              style={{
                color:'black',
                marginBottom: '1.5rem',
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: isCorrect === true
                  ? '#e1fbe1'
                  : isCorrect === false
                    ? '#fbe1e1'
                    : '#f5f5f5',
              }}
            >
              <strong>Q{question.id}.</strong> {question.question}

              <div style={{ marginTop: '0.5rem' }}>
                {isCorrect === true && <span style={{ color: 'green' }}>〇 正解</span>}
                {isCorrect === false && <span style={{ color: 'red' }}>✕ 不正解</span>}
                {isCorrect === undefined && <span style={{ color: '#888' }}>未回答</span>}
              </div>

              <div style={{ marginTop: '0.3rem' }}>
                <strong>あなたの選択：</strong>
                {selectedIndex !== undefined
                  ? question.options[selectedIndex]
                  : '—'}
              </div>

              <div style={{ marginTop: '0.3rem' }}>
                <strong>正答：</strong> {question.options[question.correctIndex]}
              </div>

              <div style={{ marginTop: '0.3rem' }}>
                <strong>全国正答率：</strong> {stat?.correctRate ?? '??'}%
              </div>
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          トップへ戻る
        </button>
      </div>
    </section>
  );
}
