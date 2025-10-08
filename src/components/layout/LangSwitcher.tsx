import { motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";

export const LangSwitcher = () => {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/80 px-3 py-1.5 text-sm font-semibold uppercase text-slate-600 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
        {languages.map((option) => (
          <button
            type="button"
            key={option.code}
            onClick={() => setLanguage(option.code)}
            className="relative px-2 py-1"
            aria-pressed={language === option.code}
          >
            {language === option.code ? (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 rounded-full bg-cyan-500/20"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
