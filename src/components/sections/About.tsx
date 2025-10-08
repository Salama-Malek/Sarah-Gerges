import { motion } from "framer-motion";
import { SectionContainer } from "../ui/SectionContainer";
import { useLanguage } from "../../hooks/useLanguage";

export const About = () => {
  const { translate, direction, isRTL } = useLanguage();
  const lead = translate("about.lead");
  const paragraphs = translate<string[]>("about.paragraphs");
  const credentials = translate<string[]>("about.credentials");
  const links = translate<{ label: string; href: string; value: string }[]>("about.links");
  const cta = translate("about.cta");

  return (
    <SectionContainer
      id="about"
      className="relative rounded-[3rem] bg-[#f8fafc] shadow-[0_50px_120px_-70px_rgba(15,23,42,0.45)] dark:bg-[#111c30]"
      background="about"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 gradient-ring opacity-60 dark:opacity-30" />
      <motion.div
        className="grid gap-10 rounded-3xl border border-border-light/80 bg-surface-light/95 p-10 shadow-2xl shadow-slate-900/10 backdrop-blur-lg dark:border-border-dark/70 dark:bg-surface-dark/95 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]"
        initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        dir={direction}
      >
        <div className={`space-y-6 text-start [dir='rtl']:text-end ${isRTL ? "md:order-2" : "md:order-1"}`}>
          <div>
            <h2 className="section-heading">{translate("about.title")}</h2>
            <p className="mt-3 text-lg font-semibold text-accent dark:text-accent">{lead}</p>
          </div>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-gray-700 dark:text-slate-200">
              {paragraph}
            </p>
          ))}
          <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6 text-base text-accent shadow-sm dark:border-accent/40 dark:bg-accent/15 dark:text-accent [dir='rtl']:text-end">
            <p className="font-semibold">{cta}</p>
          </div>
        </div>
        <div
          className={`flex flex-col gap-8 rounded-2xl border border-border-light bg-surface-light p-6 shadow-inner dark:border-border-dark dark:bg-surface-dark ${isRTL ? "md:order-1" : "md:order-2"}`}
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">{translate("about.credentialsTitle")}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300 [dir='rtl']:text-end">
              {credentials.map((item) => (
                <li key={item} className="rounded-xl bg-accent/10 px-4 py-2 text-gray-800 dark:text-slate-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">{translate("about.connectTitle")}</h3>
            <ul className="mt-4 space-y-2 text-sm font-semibold text-accent dark:text-accent [dir='rtl']:text-end">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-accentSecondary" target="_blank" rel="noreferrer">
                    {link.label}: {link.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
};
