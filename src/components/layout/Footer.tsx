import { useLanguage } from "../../hooks/useLanguage";
import { RouterLink } from "../../hooks/useRouter";

export const Footer = () => {
  const { translate } = useLanguage();
  const links = translate<{ home: string; courses: string; pricing: string; policy: string; contact: string }>(
    "footer.links"
  );

  return (
    <footer className="border-t border-white/20 bg-white/50 backdrop-blur dark:border-slate-700/40 dark:bg-slate-900/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 text-slate-600 dark:text-slate-300">
        <div className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wide text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            <a href="#hero" className="hover:text-cyan-500">
              {links.home}
            </a>
            <a href="#courses" className="hover:text-cyan-500">
              {links.courses}
            </a>
            <a href="#pricing" className="hover:text-cyan-500">
              {links.pricing}
            </a>
            <RouterLink to="/policy" className="hover:text-cyan-500">
              {links.policy}
            </RouterLink>
            <a href="#contact" className="hover:text-cyan-500">
              {links.contact}
            </a>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{translate("footer.credit")}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500">{translate("footer.copyright")}</p>
      </div>
    </footer>
  );
};
