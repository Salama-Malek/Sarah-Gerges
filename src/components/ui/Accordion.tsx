import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionItem {
  id: string;
  title: string;
  content: string[];
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion = ({ items }: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-slate-200/40 dark:divide-slate-700/60">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left text-lg font-medium text-slate-800 transition hover:text-cyan-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 dark:text-white"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className="text-2xl text-cyan-500">{isOpen ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.content.map((paragraph) => (
                      <p key={paragraph} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
