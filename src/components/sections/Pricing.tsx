import { motion } from "framer-motion";
import { SectionContainer } from "../ui/SectionContainer";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useLanguage } from "../../hooks/useLanguage";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const Pricing = () => {
  const { translate, direction } = useLanguage();
  const plans = translate<PricingPlan[]>("pricing.plans");
  const cta = translate("pricing.cta");
  const badge = translate("pricing.badge");

  return (
    <SectionContainer id="pricing" className="text-center" background="pricing">
      <div className="mx-auto max-w-3xl" dir={direction}>
        <h2 className="section-heading text-balance">{translate("pricing.title")}</h2>
        <p className="section-subheading mx-auto">{translate("pricing.subtitle")}</p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3" dir={direction}>
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <Card
              hoverGlow
              className={`h-full p-8 text-start [dir='rtl']:text-end ${
                plan.highlighted
                  ? "border-cyan-400/70 bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-indigo-500/20"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between [dir='rtl']:flex-row-reverse">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{plan.name}</h3>
                {plan.highlighted ? (
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold uppercase text-cyan-700 dark:text-cyan-200">
                    {badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-6 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-300">{plan.description}</p>
              <p className="mt-6 text-4xl font-semibold text-slate-900 dark:text-white">
                {plan.price}
                <span className="ms-2 text-base font-medium text-slate-500 dark:text-slate-300">{plan.period}</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 [dir='rtl']:flex-row-reverse">
                    <span className="text-cyan-500">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlighted ? "primary" : "secondary"} className="mt-8 w-full">
                {cta}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};
