// store/quizStore.js
import { create } from 'zustand';

export const useQuizStore = create((set) => ({
  currentQuestionIndex: 0,  // 現在の問題インデックス（0〜9）
  answers: {},              // 回答履歴: { [questionId]: true/false }
  
  setAnswer: (id, isCorrect, selectedIndex) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [id]: { isCorrect, selectedIndex },
      },
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),

  resetQuizStore: () =>
    set({
      currentQuestionIndex: 0,
      answers: {},
    }),
}));
