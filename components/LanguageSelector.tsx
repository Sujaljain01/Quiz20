import React from 'react';
import { useQuizStore } from '../store/quizStore';
import { useTranslation } from 'react-i18next';

export const LanguageSelector: React.FC = () => {
  const { setLanguage } = useQuizStore();
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <select 
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-transparent text-white px-2 py-1 rounded"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
    </select>
  );
};