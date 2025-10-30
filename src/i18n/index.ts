import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { i18nConfig } from "./config";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        ...i18nConfig,
        detection: {
            order: ["localStorage", "navigator", "htmlTag"],
            caches: ["localStorage"],
            lookupLocalStorage: "app-lang",
        },
    });

export default i18n;