import { useMemo, useState, useRef } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView } from "framer-motion";
import { SectionContainer } from "../ui/SectionContainer";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useLanguage } from "../../hooks/useLanguage";

interface CourseItem {
  id: string;
  language: string;
  title: string;
  emoji: string;
  duration: string;
  level: string;
  description: string;
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CourseCard = ({ course, cta }: { course: CourseItem; cta: string }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(cardRef, { once: true, margin: "-10% 0px" });

  return (
    <Card ref={cardRef} hoverGlow className="flex h-full flex-col justify-between p-8 text-left">
      <div>
        <div className="flex items-center gap-3 text-2xl font-semibold text-slate-900 dark:text-white">
          <span>{course.emoji}</span>
          <h3>{course.title}</h3>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <span>{course.duration}</span>
          <span className="h-1 w-1 rounded-full bg-slate-400" />
          <span>{course.level}</span>
        </div>
        <AnimatePresence>
            {inView ? (
              <motion.p
                key={`${course.id}-description`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: easeOut }}
                className="mt-6 text-base leading-relaxed text-slate-600 dark:text-slate-300"
              >
                {course.description}
              </motion.p>
            ) : (
            <motion.div
              key={`${course.id}-placeholder`}
              className="mt-6 h-20 rounded-2xl bg-slate-200/40 dark:bg-slate-700/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="mt-8">
        <Button variant="secondary" className="w-full">
          {cta}
        </Button>
      </div>
    </Card>
  );
};

export const Courses = () => {
  const { translate, direction } = useLanguage();
  const filters = translate<{ key: string; label: string }[]>("courses.filters");
  const items = translate<CourseItem[]>("courses.items");
  const cta = translate("courses.enroll");
  const [filter, setFilter] = useState(filters[0]?.key ?? "arabic");

  const filteredCourses = useMemo(() => {
    return items.filter((course) => (filter ? course.language === filter : true));
  }, [items, filter]);

  return (
    <SectionContainer id="courses" className="text-center" background="courses">
      <div className="mx-auto max-w-3xl" dir={direction}>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {translate("courses.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {translate("courses.subtitle")}
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <LayoutGroup>
          <div className="flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/30 bg-white/60 px-4 py-2 backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/60">
            {filters.map((option) => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key)}
                className="relative rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-cyan-500 dark:text-slate-300"
              >
                {filter === option.key ? (
                  <motion.span
                    layoutId="course-filter"
                    className="absolute inset-0 rounded-full bg-cyan-500/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : null}
                <span className="relative z-10">{option.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>
      <LayoutGroup>
        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3" dir={direction}>
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div key={course.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <CourseCard course={course} cta={cta} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </SectionContainer>
  );
};
