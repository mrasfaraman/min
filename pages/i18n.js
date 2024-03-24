import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from "../languages/en.json";
import inTranslations from '../languages/in.json';
import esTranslations from '../languages/es.json';
import frTranslations from '../languages/fr.json';
import ruTranslations from '../languages/ru.json';
import arTranslations from '../languages/ar.json';
import deTranslations from '../languages/de.json';
import zhTranslations from '../languages/zh.json';
import ukTranslations from '../languages/uk.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      in: { translation: inTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
      ru: { translation: ruTranslations },
      ar: { translation: arTranslations },
      de: { translation: deTranslations },
      zh: { translation: zhTranslations },
      uk: { translation: ukTranslations },

    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safeguards from xss
    }
  });

export default i18n;
