import { forwardRef } from "react";

const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id ?? props.name ?? label;
    return (
      <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300" htmlFor={inputId}>
        <span>{label}</span>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "rounded-2xl border border-slate-200/60 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-sm",
            "focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200",
            "dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-white dark:focus:border-cyan-400",
            className
          )}
          {...props}
        />
      </label>
    );
  }
);

Input.displayName = "Input";
