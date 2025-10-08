import { motion } from "framer-motion";
import { SectionContainer } from "../ui/SectionContainer";
import { Card } from "../ui/Card";
import { useLanguage } from "../../hooks/useLanguage";

interface TestimonialItem {
  name: string;
  country: string;
  quote: string;
  rating: string;
}

export const Testimonials = () => {
  const { translate, direction, isRTL } = useLanguage();
  const items = translate<TestimonialItem[]>("testimonials.items");
  const dragDistance = Math.max(0, (items.length - 1) * 280);
  const dragConstraints = isRTL ? { left: 0, right: dragDistance } : { left: -dragDistance, right: 0 };

  return (
    <SectionContainer id="testimonials" className="text-center" background="testimonials">
      <div className="mx-auto max-w-3xl" dir={direction}>
        <h2 className="section-heading text-balance">{translate("testimonials.title")}</h2>
        <p className="section-subheading mx-auto">{translate("testimonials.subtitle")}</p>
      </div>
      <motion.div className="mt-12 cursor-grab overflow-hidden" whileTap={{ cursor: "grabbing" }}>
        <motion.div
          className="flex gap-6 [dir='rtl']:flex-row-reverse"
          drag="x"
          dragConstraints={dragConstraints}
          dir={direction}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {items.map((item) => (
            <Card
              key={item.name}
              hoverGlow
              className="min-w-[280px] max-w-sm flex-1 p-8 text-start [dir='rtl']:text-end"
            >
              <div className="flex items-center justify-between text-sm font-semibold text-cyan-500 [dir='rtl']:flex-row-reverse">
                <span>{item.rating}</span>
                <span>{item.country}</span>
              </div>
              <p className="mt-6 text-start text-base leading-relaxed text-slate-600 dark:text-slate-300 [dir='rtl']:text-end">“{item.quote}”</p>
              <p className="mt-8 text-start text-lg font-semibold text-slate-900 dark:text-white [dir='rtl']:text-end">{item.name}</p>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};
