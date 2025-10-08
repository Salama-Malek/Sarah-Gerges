import { forwardRef } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

export const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className, hoverGlow = false }, ref) => {
  return (
    <motion.div
      ref={ref}
      whileHover={hoverGlow ? { y: -6, boxShadow: "0 30px 60px -30px rgba(56, 189, 248, 0.6)" } : undefined}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/40 bg-white/70",
        "shadow-lg shadow-slate-900/5 backdrop-blur-xl transition-all duration-300 ease-out",
        "dark:border-slate-700/60 dark:bg-slate-800/70 dark:shadow-slate-900/40 dark:ring-1 dark:ring-cyan-300/20",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-8 -top-28 h-40 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
});

Card.displayName = "Card";
