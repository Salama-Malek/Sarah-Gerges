import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";

interface SectionContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  background?: string;
}

const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

export const SectionContainer = ({ id, children, className, background }: SectionContainerProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      id={id}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      ref={ref}
      className={cn("relative mx-auto w-full max-w-6xl px-6 py-20 md:py-28", className)}
      data-background={background}
    >
      {children}
    </motion.section>
  );
};
