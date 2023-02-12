import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend, { HttpBackendOptions } from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'en'],
    debug: __IS_DEV__,

    returnNull: false,

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      lookupLocalStorage: 'lng',
      caches: ['localStorage'],
    },
  })

export default i18n
