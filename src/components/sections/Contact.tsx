import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "../ui/SectionContainer";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useLanguage } from "../../hooks/useLanguage";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface ContactDraft {
  name: string;
  email: string;
  message: string;
}

export const Contact = () => {
  const { translate, direction } = useLanguage();
  const formLabels = translate<{ name: string; email: string; message: string; submit: string }>("contact.form");
  const details = translate<{ whatsapp: string; telegram: string; email: string }>("contact.details");
  const links = translate<{ whatsappNumber: string; telegramHandle: string; emailAddress: string }>("contact.links");
  const [draft, setDraft] = useLocalStorage<ContactDraft>("saos-contact-draft", {
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <SectionContainer id="contact" background="contact">
      <div className="mx-auto grid max-w-6xl gap-12 rounded-3xl bg-white/70 p-10 shadow-xl backdrop-blur dark:bg-slate-900/70 md:grid-cols-2" dir={direction}>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {translate("contact.title")}
          </h2>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {translate("contact.subtitle")}
          </p>
          <div className="mt-8 space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>
              <strong className="text-cyan-500">{details.whatsapp}:</strong> {links.whatsappNumber}
            </p>
            <p>
              <strong className="text-cyan-500">{details.telegram}:</strong> {links.telegramHandle}
            </p>
            <p>
              <strong className="text-cyan-500">{details.email}:</strong> {links.emailAddress}
            </p>
          </div>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            label={formLabels.name}
            name="name"
            value={draft.name}
            onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            required
          />
          <Input
            label={formLabels.email}
            name="email"
            type="email"
            value={draft.email}
            onChange={(event) => setDraft({ ...draft, email: event.target.value })}
            required
          />
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            <span>{formLabels.message}</span>
            <textarea
              name="message"
              value={draft.message}
              onChange={(event) => setDraft({ ...draft, message: event.target.value })}
              rows={5}
              className="rounded-2xl border border-slate-200/60 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-200 dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-white dark:focus:border-cyan-400"
              required
            />
          </label>
          <Button type="submit" size="lg">
            {formLabels.submit}
          </Button>
          <motion.div
            initial={false}
            animate={submitted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-700 dark:text-cyan-200"
          >
            {submitted ? translate("contact.success") : ""}
          </motion.div>
        </form>
      </div>
    </SectionContainer>
  );
};
