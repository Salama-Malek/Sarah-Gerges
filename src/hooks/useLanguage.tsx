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
  isRTL: boolean;
  fontClass: string;
  translate: <T = string>(path: string) => T;
  languages: { code: Language; label: string }[];
}

const LANGUAGE_KEY = "saos-language";

const LANGUAGE_DIRECTION: Record<Language, "ltr" | "rtl"> = {
  en: "ltr",
  ru: "ltr",
  ar: "rtl",
};

const LANGUAGE_FONT_CLASS: Record<Language, string> = {
  en: "font-en",
  ru: "font-ru",
  ar: "font-ar",
};

const LANGUAGE_TYPOGRAPHY: Record<Language, string[]> = {
  en: ["tracking-normal", "leading-relaxed"],
  ru: ["tracking-normal", "leading-relaxed"],
  ar: ["tracking-tight", "leading-loose"],
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const getValue = (path: string, data: TranslationValue) => {
  return path
    .split(".")
    .reduce<unknown>((acc, key) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[key] : undefined), data);
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useLocalStorage<Language>(LANGUAGE_KEY, "en");

  useEffect(() => {
    const dir = LANGUAGE_DIRECTION[language];
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    const body = document.body;
    const directionClass = dir === "rtl" ? "rtl" : "ltr";
    const fontClass = LANGUAGE_FONT_CLASS[language];
    const typographyClasses = LANGUAGE_TYPOGRAPHY[language];

    body.classList.remove("rtl", "ltr", "font-en", "font-ru", "font-ar", "tracking-tight", "tracking-normal", "leading-relaxed", "leading-loose");
    body.classList.add(directionClass, fontClass, ...typographyClasses);
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => {
    const data = translations[language];
    const direction = LANGUAGE_DIRECTION[language];
    return {
      language,
      setLanguage: setLanguageState,
      direction,
      isRTL: direction === "rtl",
      fontClass: LANGUAGE_FONT_CLASS[language],
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
