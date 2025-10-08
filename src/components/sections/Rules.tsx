import { useState } from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Accordion } from "../ui/Accordion";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { useLanguage } from "../../hooks/useLanguage";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface RuleItem {
  title: string;
  content: string;
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
    <SectionContainer id="rules" background="rules">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/70 p-10 shadow-xl backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/70" dir={direction}>
        <h2 className="section-heading text-center">{translate("rules.title")}</h2>
        <p className="section-subheading mx-auto text-center">{translate("rules.description")}</p>
        <div className="mt-10 rounded-2xl bg-white/70 p-6 shadow-inner dark:bg-slate-900/70">
          <Accordion items={sections.map((section, index) => ({ id: `${index}`, title: section.title, content: section.content }))} />
        </div>
        <div className="mt-8 flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-300">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="h-5 w-5 rounded border border-slate-300 text-cyan-500 focus:ring-cyan-200 dark:border-slate-600"
            />
            <span>{acknowledgement}</span>
          </label>
          <div className="flex flex-wrap items-center gap-4">
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
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{section.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{section.content}</p>
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
