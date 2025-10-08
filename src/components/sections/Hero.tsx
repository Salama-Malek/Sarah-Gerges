import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useMemo, useRef } from "react";
import { Button } from "../ui/Button";
import { useLanguage } from "../../hooks/useLanguage";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const createHeroVariants = (offset: number): Variants => ({
  hidden: { opacity: 0, y: 40, x: offset },
  visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.8, ease: easeOut } },
});

export const Hero = () => {
  const { translate, direction, isRTL } = useLanguage();
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroVariants = useMemo(() => createHeroVariants(isRTL ? 40 : -40), [isRTL]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32"
      dir={direction}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-[#f1f5f9] to-[#e2e8f0] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#1e293b]" />
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-accent/25 blur-3xl [dir='rtl']:-right-40 [dir='rtl']:left-auto" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-accentSecondary/20 blur-3xl [dir='rtl']:-left-32 [dir='rtl']:right-auto" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="mx-auto flex w-full max-w-5xl flex-col items-start gap-8 text-start [dir='rtl']:items-end [dir='rtl']:text-end"
      >
        <motion.span style={{ y }} className="rounded-full bg-surface-light/80 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-accent shadow-sm backdrop-blur dark:bg-surface-dark/70 dark:text-accent">
          {translate("hero.eyebrow")}
        </motion.span>
        <motion.h1 style={{ y }} className="text-balance text-4xl font-semibold leading-tight text-gray-900 sm:text-6xl dark:text-slate-100">
          {translate("hero.title")}
        </motion.h1>
        <motion.p style={{ y }} className="max-w-2xl text-lg leading-relaxed text-gray-700 dark:text-slate-300">
          {translate("hero.subtitle")}
        </motion.p>
        <div className="flex flex-wrap items-center gap-4 [dir='rtl']:flex-row-reverse [dir='rtl']:justify-end">
          <Button size="lg">{translate("hero.primaryCta")}</Button>
          <Button variant="secondary" size="lg">
            {translate("hero.secondaryCta")}
          </Button>
        </div>
        <motion.div
          style={{ y }}
          className="mt-12 flex items-center gap-3 text-sm font-medium text-muted [dir='rtl']:flex-row-reverse"
        >
          <span className="animate-bounce text-2xl">↓</span>
          <span>{translate("hero.scrollHint")}</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
