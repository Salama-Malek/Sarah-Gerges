import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

const HeroSection = lazy(() => import("../components/sections/Hero").then((module) => ({ default: module.Hero })));
const MissionSection = lazy(() =>
  import("../components/sections/Features").then((module) => ({ default: module.Features }))
);
const AboutSection = lazy(() => import("../components/sections/About").then((module) => ({ default: module.About })));
const CoursesSection = lazy(() => import("../components/sections/Courses").then((module) => ({ default: module.Courses })));
const RulesSection = lazy(() => import("../components/sections/Rules").then((module) => ({ default: module.Rules })));
const ContactSection = lazy(() => import("../components/sections/Contact").then((module) => ({ default: module.Contact })));

const LoadingPlaceholder = () => (
  <motion.div
    className="mx-auto w-full max-w-5xl px-6 py-20"
    initial={{ opacity: 0.2 }}
    animate={{ opacity: 0.6 }}
    transition={{ repeat: Infinity, duration: 1.2, repeatType: "reverse" }}
  >
    <div className="h-24 rounded-3xl bg-surface-light/80 backdrop-blur dark:bg-surface-dark/80" />
  </motion.div>
);

const Home = () => {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <HeroSection />
      <MissionSection />
      <AboutSection />
      <CoursesSection />
      <RulesSection />
      <ContactSection />
    </Suspense>
  );
};

export default Home;
