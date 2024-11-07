import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Share2, Volume2, AlertTriangle } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { Timer } from './Timer';
import { LanguageSelector } from './LanguageSelector';
import QuizResults from './QuizResults';


// Define translation resources
const resources = {
  en: {
    translation: {
      question1: 'What is the capital of France?',
      question1_optionA: 'London',
      question1_optionB: 'Berlin',
      question1_optionC: 'Paris',
      question1_optionD: 'Madrid',
      quizBy: 'Quiz by',
      question: 'Question',
      of: 'of',
      previous: 'Previous',
      next: 'Next',
      submit: 'Submit',
      // Add more translations as needed
    }
  },
};

const QuizApp = () => {
  const { t, i18n } = useTranslation();
  const {
    currentQuestion,
    answers,
    setCurrentQuestion,
    setAnswer,
    timeRemaining,
    isQuizComplete,
    completeQuiz,
    resetQuiz
  } = useQuizStore();

  React.useEffect(() => {
    i18n.init({
      resources,
      lng: 'en', // Default language
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });
  }, []);

  // Sample quiz data - in production, this would come from an API
  const quizData = {
    questions: [
      {
        id: 1,
        question: t('question1'),
        options: [
          { id: 'A', text: t('question1_optionA') },
          { id: 'B', text: t('question1_optionB') },
          { id: 'C', text: t('question1_optionC') },
          { id: 'D', text: t('question1_optionD') },
        ],
        correctAnswer: 'C'
      },
      {
        id: 2,
        question: 'What is the capital of Germany?',
        options: [
          { id: 'A', text: 'Munich' },
          { id: 'B', text: 'Berlin' },
          { id: 'C', text: 'Frankfurt' },
          { id: 'D', text: 'Hamburg' },
        ],
        correctAnswer: 'B'
      },
      {
        id: 3,
        question: 'What is the capital of Spain?',
        options: [
          { id: 'A', text: 'Madrid' },
          { id: 'B', text: 'Barcelona' },
          { id: 'C', text: 'Valencia' },
          { id: 'D', text: 'Seville' },
        ],
        correctAnswer: 'A'
      },
      {
        id: 4,
        question: 'What is the capital of Italy?',
        options: [
          { id: 'A', text: 'Venice' },
          { id: 'B', text: 'Rome' },
          { id: 'C', text: 'Florence' },
          { id: 'D', text: 'Milan' },
        ],
        correctAnswer: 'B'
      },
      {
        id: 5,
        question: 'What is the capital of Portugal?',
        options: [
          { id: 'A', text: 'Lisbon' },
          { id: 'B', text: 'Porto' },
          { id: 'C', text: 'Braga' },
          { id: 'D', text: 'Coimbra' },
        ],
        correctAnswer: 'A'
      }
    ],
    totalQuestions: 5  
  };
  

  if (isQuizComplete) {
    return (
      <QuizResults
        answers={answers}
        questions={quizData.questions}
        timeSpent={timeRemaining}
        onRetry={resetQuiz}
      />
    );
  }

  const handleNext = () => {
    if (currentQuestion < quizData.totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white p-4 flex justify-between items-center fixed top-0 w-full z-10">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">Quiz20</div>
          <LanguageSelector />
        </div>
        <Timer />
        <button className="w-8 h-8 text-white">🌙</button>
      </header>

      {/* Main Content */}
      <main className="p-4 pt-20 max-w-2xl mx-auto min-h-screen">
        <div className="mb-6">
          <div className="text-sm text-gray-600">{t('quizBy')} Quiz20 </div>
            
          {/* Progress Bar */}
          <div className="flex items-center mt-4 space-x-2">
            {Array.from({ length: quizData.totalQuestions }).map((_, idx) => (
              <div key={idx} className="flex-1">
                <div className={`h-1 rounded ${
                  idx === currentQuestion ? 'bg-green-500' : 
                  idx < currentQuestion ? 'bg-gray-300' : 'bg-gray-200'
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-blue-500">
              {t('question')} {currentQuestion + 1} {t('of')} {quizData.totalQuestions}
            </div>
            <div className="flex space-x-4">
              <Share2 className="w-6 h-6 text-gray-600" />
              <Volume2 className="w-6 h-6 text-gray-600" />
              <AlertTriangle className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <h2 className="text-lg font-medium">
            {quizData.questions[currentQuestion].question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {quizData.questions[currentQuestion].options.map((option) => (
            <button
              key={option.id}
              className={`w-full p-4 text-left rounded-lg border 
                ${answers[currentQuestion] === option.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-300'
                } 
                transition-colors duration-200
                active:bg-blue-100
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              onClick={() => setAnswer(currentQuestion, option.id)}
            >
              <span className="font-medium">{option.id}.</span> {option.text}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4 sticky bottom-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`p-4 rounded-lg flex items-center justify-center space-x-2
              ${currentQuestion === 0 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'
              }
              transition-colors duration-200`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>{t('previous')}</span>
          </button>
          <button
            onClick={handleNext}
            className="p-4 rounded-lg bg-gray-900 text-white flex items-center justify-center space-x-2 
              hover:bg-gray-800 active:bg-gray-700
              transition-colors duration-200"
          >
            <span>{currentQuestion === quizData.totalQuestions - 1 ? t('submit') : t('next')}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default QuizApp;