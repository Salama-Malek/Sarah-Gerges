import { useMemo } from "react";
import { motion } from "framer-motion";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { NavDrawer } from "./NavDrawer";
import { useLanguage } from "../../hooks/useLanguage";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useActiveSection } from "../../hooks/useActiveSection";
import { RouterLink, useRouter } from "../../hooks/useRouter";

export const Header = () => {
  const { translate, direction } = useLanguage();
  const { path } = useRouter();
  const progress = useScrollProgress();
  const navItems = useMemo(
    () => [
      { id: "hero", label: translate("nav.home"), href: "#hero" },
      { id: "features", label: translate("nav.features"), href: "#features" },
      { id: "about", label: translate("nav.about"), href: "#about" },
      { id: "courses", label: translate("nav.courses"), href: "#courses" },
      { id: "testimonials", label: translate("nav.testimonials"), href: "#testimonials" },
      { id: "pricing", label: translate("nav.pricing"), href: "#pricing" },
      { id: "contact", label: translate("nav.contact"), href: "#contact" },
    ],
    [translate]
  );
  const activeId = useActiveSection(navItems.map((item) => item.id));

  const isPolicy = path === "/policy";

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex flex-col items-center">
      <div className="h-1 w-full bg-transparent">
        <motion.div className="h-1 bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500" style={{ scaleX: progress, transformOrigin: "left" }} />
      </div>
      <nav className="mt-4 w-full px-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/20 bg-white/70 px-6 py-3 shadow-lg shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/80">
          <a href="#hero" className="flex items-center gap-3">
            <span className="text-lg font-semibold text-slate-900 dark:text-white">{translate("brand")}</span>
          </a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-slate-500 lg:flex" dir={direction}>
            {navItems.map((item) => (
              <a key={item.id} href={item.href} className="relative">
                <span className="transition hover:text-cyan-500">{item.label}</span>
                {activeId === item.id ? (
                  <motion.span layoutId="nav-active" className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-cyan-400" />
                ) : null}
              </a>
            ))}
            <RouterLink to="/policy" className="relative text-slate-500 transition hover:text-cyan-500">
              {translate("footer.links.policy")}
              {isPolicy ? (
                <motion.span layoutId="nav-active" className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-cyan-400" />
              ) : null}
            </RouterLink>
          </div>
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <ThemeToggle />
            <NavDrawer
              navItems={[
                ...navItems,
                { id: "rules", label: translate("nav.rules"), href: "#rules" },
              ]}
              policyLabel={translate("footer.links.policy")}
            />
          </div>
          {isPolicy ? (
            <RouterLink to="/" className="text-sm font-semibold text-cyan-400 lg:hidden">
              ← {translate("nav.home")}
            </RouterLink>
          ) : null}
        </div>
      </nav>
    </header>
  );
};
