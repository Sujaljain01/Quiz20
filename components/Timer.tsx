import React, { useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';

export const Timer: React.FC = () => {
  const { timeRemaining, setTimeRemaining, completeQuiz } = useQuizStore();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        completeQuiz();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, setTimeRemaining, completeQuiz]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="text-xl font-mono">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};
