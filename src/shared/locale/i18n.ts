import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ru from './ru.json';

const resources = {
  'en-GB': {
    translation: en,
  },
  'ru-RU': {
    translation: ru,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en-GB',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
