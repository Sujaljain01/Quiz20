import create from 'zustand';
import { persist } from 'zustand/middleware';

type QuizStore = {
  currentQuestion: number;
  quizDuration: number;
  answers: Record<number, string>;
  language: string;
  timeRemaining: number;
  isQuizComplete: boolean;
  setCurrentQuestion: (questionIndex: number) => void;
  setAnswer: (questionId: number, answer: string) => void;
  setLanguage: (lang: string) => void;
  setTimeRemaining: (time: number) => void;
  completeQuiz: () => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      currentQuestion: 0,
      answers: {},
      quizDuration: 300,
      timeSpent: 0,
      language: 'en',
      timeRemaining: 300, // 5 minutes in seconds
      isQuizComplete: false,

      setCurrentQuestion: (questionIndex) => 
        set({ currentQuestion: questionIndex }),
      
      setAnswer: (questionId, answer) => 
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer }
        })),
      
      setLanguage: (lang) => 
        set({ language: lang }),
      
      setTimeRemaining: (time) => 
        set({ timeRemaining: time }),
      
      completeQuiz: () => 
        set({ isQuizComplete: true }),
      
      resetQuiz: () => 
        set({
          currentQuestion: 0,
          answers: {},
          timeRemaining: 300,
          isQuizComplete: false
        })
    }),
    {
      name: 'quiz-store'
    }
  )
);