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
  const { translate, direction } = useLanguage();
  const items = translate<TestimonialItem[]>("testimonials.items");
  const dragLimit = -Math.max(0, (items.length - 1) * 280);

  return (
    <SectionContainer id="testimonials" className="text-center" background="testimonials">
      <div className="mx-auto max-w-3xl" dir={direction}>
        <h2 className="section-heading text-balance">{translate("testimonials.title")}</h2>
        <p className="section-subheading mx-auto">{translate("testimonials.subtitle")}</p>
      </div>
      <motion.div
        className="mt-12 cursor-grab overflow-hidden"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="flex gap-6"
          drag="x"
          dragConstraints={{ left: dragLimit, right: 0 }}
          initial={{ x: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {items.map((item) => (
            <Card key={item.name} hoverGlow className="min-w-[280px] max-w-sm flex-1 p-8 text-left">
              <div className="flex items-center justify-between text-sm font-semibold text-cyan-500">
                <span>{item.rating}</span>
                <span>{item.country}</span>
              </div>
              <p className="mt-6 text-left text-base leading-relaxed text-slate-600 dark:text-slate-300">“{item.quote}”</p>
              <p className="mt-8 text-left text-lg font-semibold text-slate-900 dark:text-white">{item.name}</p>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
};
