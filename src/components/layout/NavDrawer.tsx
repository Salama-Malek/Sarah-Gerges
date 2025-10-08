import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../../hooks/useLanguage";
import { RouterLink } from "../../hooks/useRouter";
import { useSectionNavigation } from "../../hooks/useSectionNavigation";

interface NavDrawerProps {
  navItems: { id: string; label: string; href: string }[];
  policyLabel: string;
}

export const NavDrawer = ({ navItems, policyLabel }: NavDrawerProps) => {
  const [open, setOpen] = useState(false);
  const { direction, isRTL } = useLanguage();
  const { createClickHandler } = useSectionNavigation();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border-light bg-surface-light/80 text-muted shadow-sm backdrop-blur transition hover:text-accent dark:border-border-dark dark:bg-surface-dark/80 dark:text-text-dark"
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        ☰
      </button>
      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute ${isRTL ? "left-4" : "right-4"} top-20 z-40 w-[min(320px,80vw)] overflow-hidden rounded-3xl border border-border-light bg-surface-light/95 p-6 text-gray-800 shadow-xl shadow-slate-900/10 dark:border-border-dark dark:bg-surface-dark/95 dark:text-slate-100`}
            dir={direction}
          >
            <div className="flex flex-col gap-4 [dir='rtl']:items-end">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`/${item.href}`}
                  onClick={createClickHandler(item.href, () => setOpen(false))}
                  className="text-lg font-semibold text-gray-700 transition hover:text-accent dark:text-slate-200"
                >
                  {item.label}
                </a>
              ))}
              <RouterLink
                to="/policy"
                className="text-lg font-semibold text-accent"
                onClick={() => setOpen(false)}
              >
                {policyLabel}
              </RouterLink>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
