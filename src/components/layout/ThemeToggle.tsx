import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800"
      aria-label={theme === "light" ? "Activate dark mode" : "Activate light mode"}
    >
      <motion.span
        key={theme}
        initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-xl"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </motion.span>
    </button>
  );
};
