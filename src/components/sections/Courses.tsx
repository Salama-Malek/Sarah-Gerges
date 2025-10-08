import { useCallback } from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "../ui/SectionContainer";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useLanguage } from "../../hooks/useLanguage";

interface Course {
  language: string;
  duration: string;
  price: string;
  description: string;
}

interface CourseGroup {
  region: string;
  audience: string;
  note: string;
  courses: Course[];
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Courses = () => {
  const { translate, direction } = useLanguage();
  const groups = translate<CourseGroup[]>("courses.groups");
  const title = translate("courses.title");
  const subtitle = translate("courses.subtitle");
  const nativeNote = translate("courses.nativeNote");
  const comingSoon = translate("courses.comingSoon");
  const cta = translate("courses.cta");

  const handleBookTrial = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <SectionContainer
      id="courses"
      className="text-center rounded-[3rem] bg-[#f1f5f9] shadow-[0_40px_100px_-60px_rgba(15,23,42,0.35)] dark:bg-[#0f172a]"
      background="courses"
    >
      <div className="mx-auto max-w-3xl" dir={direction}>
        <h2 className="section-heading text-balance">{title}</h2>
        <p className="section-subheading mx-auto">{subtitle}</p>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent dark:text-accent">{nativeNote}</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2" dir={direction}>
        {groups.map((group) => (
          <Card key={group.region} hoverGlow className="flex h-full flex-col gap-6 p-8 text-start [dir='rtl']:text-end">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">{group.region}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-accent dark:text-accent">
                {group.audience}
              </p>
              <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-slate-300">{group.note}</p>
            </motion.div>
            <ul className="flex flex-col gap-4">
              {group.courses.map((course) => (
                <li
                  key={`${group.region}-${course.language}-${course.duration}`}
                  className="rounded-2xl border border-border-light bg-surface-light/95 p-4 shadow-sm transition duration-300 hover:border-accent/60 hover:shadow-lg dark:border-border-dark dark:bg-surface-dark/80"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 [dir='rtl']:flex-row-reverse">
                      <span className="text-lg font-semibold text-gray-900 dark:text-slate-100">{course.language}</span>
                      <span className="text-sm font-semibold text-accent dark:text-accent">{course.duration}</span>
                    </div>
                    <p className="text-base font-semibold text-gray-900 dark:text-slate-100">{course.price}</p>
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-slate-300">{course.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="mt-auto w-full" onClick={handleBookTrial}>
              {cta}
            </Button>
          </Card>
        ))}
      </div>
      <motion.p
        className="mt-10 text-sm font-medium uppercase tracking-[0.3em] text-muted dark:text-slate-400"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        {comingSoon}
      </motion.p>
    </SectionContainer>
  );
};
