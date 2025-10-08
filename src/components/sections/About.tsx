import { motion } from "framer-motion";
import { SectionContainer } from "../ui/SectionContainer";
import { useLanguage } from "../../hooks/useLanguage";

export const About = () => {
  const { translate, direction } = useLanguage();
  const lead = translate("about.lead");
  const paragraphs = translate<string[]>("about.paragraphs");
  const credentials = translate<string[]>("about.credentials");
  const links = translate<{ label: string; href: string; value: string }[]>("about.links");
  const cta = translate("about.cta");

  return (
    <SectionContainer id="about" className="relative" background="about">
      <div className="pointer-events-none absolute inset-0 -z-10 gradient-ring opacity-70 dark:opacity-40" />
      <motion.div
        className="grid gap-10 rounded-3xl bg-white/70 p-10 shadow-xl shadow-slate-900/10 backdrop-blur-lg dark:bg-slate-900/70 md:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        dir={direction}
      >
        <div className="space-y-6 text-left">
          <div>
            <h2 className="section-heading">{translate("about.title")}</h2>
            <p className="mt-3 text-lg font-semibold text-cyan-600 dark:text-cyan-300">{lead}</p>
          </div>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">
              {paragraph}
            </p>
          ))}
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6 text-left text-base text-cyan-700 shadow-sm dark:border-cyan-400/40 dark:bg-cyan-500/10 dark:text-cyan-200">
            <p className="font-semibold">{cta}</p>
          </div>
        </div>
        <div className="flex flex-col gap-8 rounded-2xl border border-white/40 bg-white/70 p-6 shadow-inner dark:border-slate-700/60 dark:bg-slate-900/60">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{translate("about.credentialsTitle")}</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {credentials.map((item) => (
                <li key={item} className="rounded-xl bg-cyan-500/5 px-4 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{translate("about.connectTitle")}</h3>
            <ul className="mt-4 space-y-2 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition hover:text-indigo-500" target="_blank" rel="noreferrer">
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
