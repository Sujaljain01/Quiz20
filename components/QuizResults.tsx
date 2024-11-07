import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, Clock, RotateCcw, Share2 } from 'lucide-react';
interface QuizResultsProps {
  answers: Record<number, string>; // If answers is an array of strings (e.g., ['A', 'B', 'C'])
  questions: Array<{
    id: number;
    question: string;
    options: Array<{ id: string; text: string }>;
    correctAnswer: string;
  }>;
  timeSpent: number;
  onRetry: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ answers, questions, timeSpent, onRetry }) => {
  const { t } = useTranslation();

  // Calculate total score with positive and negative marking
  const totalScore = questions.reduce((score, question, index) => {
    return score + (answers[index] === question.correctAnswer ? 1 : -1.32);
  }, 0);
  
  const scorePercentage = Math.round((totalScore / questions.length) * 100);
  
  // Format time spent
 const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto pt-20">
        {/* Score Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Quiz Complete!</h2>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => {/* Share functionality */}}
            >
              <Share2 className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
                <Trophy className="w-12 h-12 text-blue-500" />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full">
                {scorePercentage}%
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Total Score</div>
              <div className="text-xl font-bold">{totalScore.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Time Taken</div>
              <div className="text-xl font-bold flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {formatTime(timeSpent)}
              </div>
            </div>
          </div>
          
          {/* Answer Review */}
          <div className="space-y-4 mb-8">
            {questions.map((question, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Question {index + 1}</div>
                    <div className="font-medium mb-2">{question.question}</div>
                  </div>
                  <div className={`px-2 py-1 rounded ${
                    answers[index] === question.correctAnswer
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {answers[index] === question.correctAnswer ? 'Correct' : 'Incorrect'}
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Your answer: </span>
                  {question.options.find(opt => opt.id === answers[index])?.text}
                </div>
                {answers[index] !== question.correctAnswer && (
                  <div className="text-sm mt-1">
                    <span className="text-gray-600">Correct answer: </span>
                    {question.options.find(opt => opt.id === question.correctAnswer)?.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={onRetry}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg
              hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
