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
  const { direction } = useLanguage();
  const { createClickHandler } = useSectionNavigation();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/70 bg-white/80 text-slate-600 shadow-sm backdrop-blur transition hover:text-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
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
            className="absolute right-4 top-20 z-40 w-[min(320px,80vw)] overflow-hidden rounded-3xl border border-white/10 bg-white/90 p-6 text-slate-800 shadow-xl dark:border-slate-700/60 dark:bg-slate-900/90 dark:text-white"
            dir={direction}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`/${item.href}`}
                  onClick={createClickHandler(item.href, () => setOpen(false))}
                  className="text-lg font-semibold text-slate-700 transition hover:text-cyan-500 dark:text-slate-200"
                >
                  {item.label}
                </a>
              ))}
              <RouterLink to="/policy" className="text-lg font-semibold text-cyan-500" onClick={() => setOpen(false)}>
                {policyLabel}
              </RouterLink>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
