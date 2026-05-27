import "@testing-library/jest-dom/vitest";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../i18n/locales/en.json";
import pt from "../i18n/locales/pt.json";

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    lng: "pt",
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    interpolation: { escapeValue: false },
  });
}
