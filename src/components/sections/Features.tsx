import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { SectionContainer } from "../ui/SectionContainer";
import { Card } from "../ui/Card";
import { useLanguage } from "../../hooks/useLanguage";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const AnimatedStat = ({
  value,
  label,
  visible,
  direction,
}: {
  value: string;
  label: string;
  visible: boolean;
  direction: "ltr" | "rtl";
}) => {
  const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let animationFrame: number;
    const start = performance.now();
    const duration = 1200;
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setDisplay(Math.floor(progress * numeric));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [numeric, visible]);

  return (
    <div className="text-start [dir='rtl']:text-end" dir={direction}>
      <p className="text-4xl font-semibold text-gray-900 dark:text-slate-100">
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-widest text-muted dark:text-slate-400">{label}</p>
    </div>
  );
};

export const Features = () => {
  const { translate, direction } = useLanguage();
  const pillars = translate<{ title: string; description: string }[]>("mission.pillars");
  const stats = translate<{ label: string; value: string }[]>("mission.stats");
  const subtitle = translate("mission.subtitle");
  const description = translate("mission.description");
  const title = translate("mission.title");
  const [visible, setVisible] = useState(false);

  return (
    <SectionContainer id="mission" className="text-center" background="features">
      <motion.div
        className="mx-auto max-w-3xl"
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <h2 className="section-heading text-balance">{title}</h2>
        <p className="section-subheading mx-auto text-balance">{subtitle}</p>
        <p className="mt-6 text-base leading-relaxed text-gray-700 dark:text-slate-300">{description}</p>
      </motion.div>
      <div className="mt-12 grid gap-6 md:grid-cols-3" dir={direction}>
        {pillars.map((pillar) => (
          <Card
            key={pillar.title}
            hoverGlow
            className="flex h-full flex-col gap-4 p-8 text-start [dir='rtl']:text-end"
          >
            <motion.h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100" whileHover={{ scale: 1.02 }}>
              {pillar.title}
            </motion.h3>
            <p className="text-base leading-relaxed text-gray-700 dark:text-slate-300">{pillar.description}</p>
          </Card>
        ))}
      </div>
      <motion.div
        className="mt-12 flex flex-wrap justify-center gap-8 [dir='rtl']:flex-row-reverse"
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        onViewportEnter={() => setVisible(true)}
      >
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} value={stat.value} label={stat.label} visible={visible} direction={direction} />
        ))}
      </motion.div>
    </SectionContainer>
  );
};
