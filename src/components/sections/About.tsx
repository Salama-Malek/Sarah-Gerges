import { motion } from "framer-motion";
import { SectionContainer } from "../ui/SectionContainer";
import { useLanguage } from "../../hooks/useLanguage";

export const About = () => {
  const { translate, direction } = useLanguage();

  return (
    <SectionContainer id="about" className="relative" background="about">
      <div className="pointer-events-none absolute inset-0 -z-10 gradient-ring opacity-70 dark:opacity-40" />
      <motion.div
        className="grid gap-10 rounded-3xl bg-white/70 p-10 shadow-xl shadow-slate-900/10 backdrop-blur-lg dark:bg-slate-900/70"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        dir={direction}
      >
        <div>
          <h2 className="section-heading">{translate("about.title")}</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-200">{translate("about.body")}</p>
        </div>
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6 text-lg font-semibold text-cyan-700 dark:border-cyan-400/40 dark:bg-cyan-500/10 dark:text-cyan-200">
          {translate("about.highlight")}
        </div>
      </motion.div>
    </SectionContainer>
  );
};
