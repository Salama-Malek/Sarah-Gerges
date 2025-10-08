import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { Button } from "../ui/Button";
import { useLanguage } from "../../hooks/useLanguage";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

export const Hero = () => {
  const { translate, direction } = useLanguage();
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32"
      dir={direction}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-400/20 via-transparent to-indigo-500/10" />
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-cyan-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="mx-auto flex w-full max-w-5xl flex-col items-start gap-8 text-left"
      >
        <motion.span style={{ y }} className="rounded-full bg-white/40 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-cyan-600 shadow-sm backdrop-blur dark:bg-slate-800/60">
          {translate("hero.eyebrow")}
        </motion.span>
        <motion.h1 style={{ y }} className="text-balance text-4xl font-semibold leading-tight text-slate-900 sm:text-6xl dark:text-white">
          {translate("hero.title")}
        </motion.h1>
        <motion.p style={{ y }} className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {translate("hero.subtitle")}
        </motion.p>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg">{translate("hero.primaryCta")}</Button>
          <Button variant="secondary" size="lg">
            {translate("hero.secondaryCta")}
          </Button>
        </div>
        <motion.div style={{ y }} className="mt-12 flex items-center gap-3 text-sm font-medium text-slate-500">
          <span className="animate-bounce text-2xl">↓</span>
          <span>{translate("hero.scrollHint")}</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
