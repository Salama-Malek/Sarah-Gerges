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
        "glass-panel glass-border relative overflow-hidden",
        "bg-white/70 dark:bg-slate-800/70",
        "border border-white/40 dark:border-white/10",
        "shadow-lg shadow-slate-900/5",
        "transition-all duration-300",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-8 -top-28 h-40 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
});

Card.displayName = "Card";
