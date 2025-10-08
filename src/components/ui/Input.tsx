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
      <label className="flex w-full flex-col gap-2 text-sm font-medium text-gray-600 dark:text-slate-300" htmlFor={inputId}>
        <span>{label}</span>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "rounded-2xl border border-border-light bg-surface-light px-4 py-3 text-base text-gray-800 shadow-sm placeholder:text-slate-400",
            "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30",
            "dark:border-border-dark dark:bg-surface-dark dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-accent",
            className
          )}
          {...props}
        />
      </label>
    );
  }
);

Input.displayName = "Input";
