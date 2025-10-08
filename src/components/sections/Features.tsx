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

const AnimatedStat = ({ value, label, visible }: { value: string; label: string; visible: boolean }) => {
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
    <div className="text-left">
      <p className="text-4xl font-semibold text-slate-900 dark:text-white">
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
};

export const Features = () => {
  const { translate, direction } = useLanguage();
  const items = translate<{ title: string; description: string }[]>("features.items");
  const stats = translate<{ label: string; value: string }[]>("features.stats");
  const [visible, setVisible] = useState(false);

  return (
    <SectionContainer id="features" className="text-center" background="features">
      <motion.div
        className="mx-auto max-w-3xl"
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {translate("features.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {translate("features.subtitle")}
        </p>
      </motion.div>
      <div className="mt-12 grid gap-6 md:grid-cols-2" dir={direction}>
        {items.map((item) => (
          <Card key={item.title} hoverGlow className="p-8 text-left">
            <motion.h3 className="text-2xl font-semibold text-slate-900 dark:text-white" whileHover={{ scale: 1.01 }}>
              {item.title}
            </motion.h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
          </Card>
        ))}
      </div>
      <motion.div
        className="mt-12 flex flex-wrap justify-center gap-8"
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        onViewportEnter={() => setVisible(true)}
      >
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} value={stat.value} label={stat.label} visible={visible} />
        ))}
      </motion.div>
    </SectionContainer>
  );
};
