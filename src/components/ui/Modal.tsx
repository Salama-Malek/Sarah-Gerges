import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ open, onClose, title, children }: ModalProps) => {
  const { direction } = useLanguage();
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
          <motion.div
            role="document"
            dir={direction}
            className="glass-panel w-full max-w-2xl overflow-hidden bg-white/90 p-8 text-slate-900 dark:bg-slate-900/80 dark:text-white"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <header className="mb-6 flex items-start justify-between gap-6 [dir='rtl']:flex-row-reverse">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-full border border-transparent bg-slate-900/5 p-2 text-slate-500 transition hover:bg-slate-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 dark:bg-white/10 dark:text-slate-200"
                aria-label="Close"
              >
                ×
              </button>
            </header>
            <div className="space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 text-start [dir='rtl']:text-end">
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
