import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import bn from '../locales/bn.json';
import te from '../locales/te.json';
import mr from '../locales/mr.json';
import ta from '../locales/ta.json';
import gu from '../locales/gu.json';
import kn from '../locales/kn.json';

export const supportedLanguages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
];

const resources = { en, hi, bn, te, mr, ta, gu, kn };
const languageCodes = supportedLanguages.map(({ code }) => code);
const storedLanguage = localStorage.getItem('schemeSphereLanguage');
const initialLanguage = languageCodes.includes(storedLanguage) ? storedLanguage : 'en';

i18n.use(initReactI18next).init({
  resources: Object.fromEntries(
    Object.entries(resources).map(([code, translation]) => [code, { translation }]),
  ),
  lng: initialLanguage,
  fallbackLng: 'en',
  defaultNS: 'translation',
  interpolation: { escapeValue: false },
  returnNull: false,
});

function updateDocumentLanguage(language) {
  const languageCode = languageCodes.includes(language) ? language : 'en';
  document.documentElement.lang = languageCode;
  localStorage.setItem('schemeSphereLanguage', languageCode);
  document.title = i18n.t('meta.title');
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = i18n.t('meta.description');
}

updateDocumentLanguage(initialLanguage);
i18n.on('languageChanged', updateDocumentLanguage);

export default i18n;
