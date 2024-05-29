import i18n from 'i18next';
import 'intl-pluralrules'; // Import the plural rules polyfill
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { initReactI18next } from 'react-i18next';
import enTranslations from './EN.json'; // Import English translations
import arTranslations from './AR.json';
import { setLanguage } from '../Store/languageSlice';
import { useEffect } from 'react';

const resources = {
  en: {
    translation: enTranslations,
  },
  ar: {
    translation: arTranslations,
  },
  
};
i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set English as the default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
