import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import separate translation files
import eng from "./words/eng";
import uzb from "./words/uzb";
import rus from "./words/rus";

// Prevent running on the server
if (typeof window !== "undefined") {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        eng,
        uzb,
        rus
      },
      fallbackLng: "eng",
      interpolation: { escapeValue: false },
    });
}

export default i18n;
