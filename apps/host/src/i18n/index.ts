import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { selectLanguage, store } from "@greencart/store";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    lng: selectLanguage(store.getState()),
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    interpolation: { escapeValue: false },
  });
}

// Sincroniza i18next com o Redux store (cross-remote).
let currentLang = selectLanguage(store.getState());
store.subscribe(() => {
  const lang = selectLanguage(store.getState());
  if (lang !== currentLang) {
    currentLang = lang;
    i18next.changeLanguage(lang);
  }
});
