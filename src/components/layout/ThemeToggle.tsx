import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border-light bg-surface-light/80 text-muted shadow-sm backdrop-blur hover:text-accent dark:border-border-dark dark:bg-surface-dark/80 dark:text-text-dark"
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
