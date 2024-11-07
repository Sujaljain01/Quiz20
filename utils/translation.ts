import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      question: 'Question',
      of: 'of',
      timeRemaining: 'Time Remaining',
      quizBy: 'Quiz by',
      question1: 'A mixture of which one of the following pairs of gases is the cause of occurrence of most of the explosions in mines?',
      question1_optionA: 'Hydrogen and Oxygen',
      question1_optionB: 'Oxygen and Acetylene',
      question1_optionC: 'Methane and Air',
      question1_optionD: 'None of the above'
    }
  },
  hi: {
    translation: {
      next: 'अगला',
      previous: 'पिछला',
      submit: 'जमा करें',
      question: 'प्रश्न',
      of: 'का',
      timeRemaining: 'समय शेष',
      quizBy: 'द्वारा प्रश्नोत्तरी',
      question1: 'निम्नलिखित गैसों के युग्मों में से किसका मिश्रण खानों में होने वाले अधिकांश विस्फोटों का कारण है?',
      question1_optionA: 'हाइड्रोजन और ऑक्सीजन',
      question1_optionB: 'ऑक्सीजन और एसिटिलीन',
      question1_optionC: 'मीथेन और वायु',
      question1_optionD: 'उपरोक्त में से कोई नहीं'
    }
  }
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;