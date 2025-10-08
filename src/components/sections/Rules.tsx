import { useState } from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Accordion } from "../ui/Accordion";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { useLanguage } from "../../hooks/useLanguage";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface RuleItem {
  title: string;
  content: string[];
}

export const Rules = () => {
  const { translate, direction } = useLanguage();
  const sections = translate<RuleItem[]>("rules.sections");
  const acknowledgement = translate("rules.acknowledgement");
  const agreeLabel = translate("rules.agree");
  const agreedText = translate("rules.agreed");
  const viewPolicy = translate("rules.viewPolicy");
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useLocalStorage<boolean>("saos-policy-agreed", false);

  return (
    <SectionContainer
      id="rules"
      background="rules"
      className="rounded-[3rem] bg-[#f8fafc] shadow-[0_40px_100px_-60px_rgba(15,23,42,0.35)] dark:bg-[#111c30]"
    >
      <div
        className="mx-auto max-w-4xl rounded-3xl border border-border-light bg-surface-light/95 p-10 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-border-dark dark:bg-surface-dark/95"
        dir={direction}
      >
        <h2 className="section-heading text-center">{translate("rules.title")}</h2>
        <p className="section-subheading mx-auto text-center">{translate("rules.description")}</p>
        <div className="mt-10 rounded-2xl border border-border-light/70 bg-surface-light p-6 shadow-inner dark:border-border-dark/70 dark:bg-surface-dark">
          <Accordion
            items={sections.map((section, index) => ({ id: `${index}`, title: section.title, content: section.content }))}
          />
        </div>
        <div className="mt-8 flex flex-col gap-4 text-sm text-gray-700 dark:text-slate-300">
          <label className="flex items-center gap-3 [dir='rtl']:flex-row-reverse">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="h-5 w-5 rounded border border-border-light text-accent focus:ring-accent/30 dark:border-border-dark"
            />
            <span>{acknowledgement}</span>
          </label>
          <div className="flex flex-wrap items-center gap-4 [dir='rtl']:flex-row-reverse">
            <Button variant={agreed ? "primary" : "secondary"} onClick={() => setAgreed(true)}>
              {agreed ? agreedText : agreeLabel}
            </Button>
            <Button variant="ghost" onClick={() => setOpen(true)}>
              {viewPolicy}
            </Button>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={translate("rules.title")}>
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">{section.title}</h3>
              <div className="mt-2 space-y-3 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
          <Button variant="secondary" onClick={() => setOpen(false)}>
            {translate("policy.back")}
          </Button>
        </div>
      </Modal>
    </SectionContainer>
  );
};
