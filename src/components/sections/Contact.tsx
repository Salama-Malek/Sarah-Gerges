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
  const { translate, direction, isRTL } = useLanguage();
  const formLabels = translate<{ name: string; email: string; message: string; submit: string }>("contact.form");
  const title = translate("contact.title");
  const subtitle = translate("contact.subtitle");
  const invitation = translate("contact.invitation");
  const channels = translate<{ label: string; value: string; href: string }[]>("contact.channels");
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
      <div
        className="mx-auto grid max-w-6xl gap-12 rounded-3xl bg-white/70 p-10 shadow-xl backdrop-blur dark:bg-slate-900/70 md:grid-cols-2"
        dir={direction}
      >
        <div className={`text-start [dir='rtl']:text-end ${isRTL ? "md:order-2" : "md:order-1"}`}>
          <h2 className="section-heading">{title}</h2>
          <p className="section-subheading">{subtitle}</p>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{invitation}</p>
          <motion.ul
            className="mt-8 grid gap-3 text-sm text-slate-600 dark:text-slate-300 text-start [dir='rtl']:text-end"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {channels.map((channel) => (
              <li key={channel.href}>
                <a
                  href={channel.href}
                  className="group inline-flex items-center justify-between gap-3 rounded-2xl border border-transparent bg-white/50 px-4 py-3 font-semibold text-cyan-600 transition hover:border-cyan-300 hover:bg-cyan-500/10 hover:text-indigo-500 dark:bg-slate-800/60 dark:text-cyan-300 [dir='rtl']:flex-row-reverse"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{channel.label}</span>
                  <span className="text-sm font-medium text-slate-500 transition group-hover:text-indigo-400 dark:text-slate-300">
                    {channel.value}
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
        <form className={`flex flex-col gap-5 ${isRTL ? "md:order-1" : "md:order-2"}`} onSubmit={handleSubmit}>
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
            className="rounded-2xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-700 dark:text-cyan-200 text-start [dir='rtl']:text-end"
          >
            {submitted ? translate("contact.success") : ""}
          </motion.div>
        </form>
      </div>
    </SectionContainer>
  );
};
