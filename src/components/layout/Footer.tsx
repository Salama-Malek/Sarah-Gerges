import { useLanguage } from "../../hooks/useLanguage";
import { RouterLink } from "../../hooks/useRouter";
import { useSectionNavigation } from "../../hooks/useSectionNavigation";

export const Footer = () => {
  const { translate, direction, isRTL } = useLanguage();
  const links = translate<{ home: string; courses: string; policy: string; contact: string }>("footer.links");
  const social = translate<{ label: string; href: string }[]>("footer.social");
  const { createClickHandler } = useSectionNavigation();

  return (
    <footer
      className="border-t border-border-light bg-[#f1f5f9] text-[#334155] transition-colors duration-300 ease-out dark:border-slate-700 dark:bg-surface-dark dark:text-slate-300"
      dir={direction}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
        <div className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wide text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className={`flex flex-wrap gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            <a href="/#hero" onClick={createClickHandler("#hero")} className="hover:text-accent">
              {links.home}
            </a>
            <a href="/#courses" onClick={createClickHandler("#courses")} className="hover:text-accent">
              {links.courses}
            </a>
            <RouterLink to="/policy" className="hover:text-accent">
              {links.policy}
            </RouterLink>
            <a href="/#contact" onClick={createClickHandler("#contact")} className="hover:text-accent">
              {links.contact}
            </a>
          </div>
          <div className={`flex flex-wrap gap-3 text-xs normal-case text-muted dark:text-slate-400 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            {social.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-accent" target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted dark:text-slate-400 text-start [dir='rtl']:text-end">
          {translate("footer.credit")}
        </p>
        <p className="text-xs text-muted dark:text-slate-500 text-start [dir='rtl']:text-end">
          {translate("footer.copyright")}
        </p>
      </div>
    </footer>
  );
};
