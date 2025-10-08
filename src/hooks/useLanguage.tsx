import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import en from "../i18n/en.json";
import ru from "../i18n/ru.json";
import ar from "../i18n/ar.json";

type Language = "en" | "ru" | "ar";

const translations = {
  en,
  ru,
  ar,
};

type TranslationValue = typeof en;

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  direction: "ltr" | "rtl";
  translate: <T = string>(path: string) => T;
  languages: { code: Language; label: string }[];
}

const LANGUAGE_KEY = "saos-language";

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const getValue = (path: string, data: TranslationValue) => {
  return path
    .split(".")
    .reduce<unknown>((acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined), data);
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useLocalStorage<Language>(LANGUAGE_KEY, "en");

  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    const data = translations[language];
    return {
      language,
      setLanguage: setLanguageState,
      direction: language === "ar" ? "rtl" : "ltr",
      translate: <T,>(path: string) => getValue(path, data) as T,
      languages: (translations[language].languageNames as { code: Language; label: string }[]).map((item) => item),
    };
  }, [language, setLanguageState]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
