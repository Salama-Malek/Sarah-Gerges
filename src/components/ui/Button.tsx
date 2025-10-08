import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

const cn = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
  size?: "md" | "lg";
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-cyan-500 text-slate-900 shadow-glow hover:bg-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-200",
  secondary:
    "border border-cyan-500/60 text-cyan-500 hover:bg-cyan-500/10 focus-visible:ring-2 focus-visible:ring-cyan-200",
  ghost:
    "text-slate-700 hover:bg-slate-900/5 focus-visible:ring-2 focus-visible:ring-cyan-200 dark:text-slate-200 dark:hover:bg-white/5",
};

const sizeClasses = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <motion.button
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        whileHover={disabled ? undefined : { y: -2 }}
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold transition-transform duration-200 ease-out",
          "focus-visible:outline-none",
          variantClasses[variant],
          sizeClasses[size],
          disabled && "pointer-events-none opacity-60",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
