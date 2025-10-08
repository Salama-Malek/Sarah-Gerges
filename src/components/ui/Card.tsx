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
      whileHover={hoverGlow ? { scale: 1.02, boxShadow: "0 18px 40px -24px rgba(15, 23, 42, 0.25)" } : undefined}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "glass-panel relative overflow-hidden",
        "border border-border-light/70 bg-surface-light/90 shadow-md shadow-slate-900/5 dark:border-border-dark/70 dark:bg-surface-dark/90",
        "transition-all duration-300",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-8 -top-28 h-40 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
});

Card.displayName = "Card";
