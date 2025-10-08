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
    <SectionContainer id="courses" className="text-center" background="courses">
      <div className="mx-auto max-w-3xl" dir={direction}>
        <h2 className="section-heading text-balance">{title}</h2>
        <p className="section-subheading mx-auto">{subtitle}</p>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">{nativeNote}</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2" dir={direction}>
        {groups.map((group) => (
          <Card key={group.region} hoverGlow className="flex h-full flex-col gap-6 p-8 text-left">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOut }} viewport={{ once: true }}>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{group.region}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-cyan-500 dark:text-cyan-300">
                {group.audience}
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">{group.note}</p>
            </motion.div>
            <ul className="flex flex-col gap-4">
              {group.courses.map((course) => (
                <li key={`${group.region}-${course.language}-${course.duration}`} className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-inner transition duration-300 hover:border-cyan-400/60 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/60">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-lg font-semibold text-slate-900 dark:text-white">{course.language}</span>
                      <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-300">{course.duration}</span>
                    </div>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{course.price}</p>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{course.description}</p>
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
        className="mt-10 text-sm font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400"
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
