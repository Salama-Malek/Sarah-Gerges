import { AnimatePresence, motion, type Variants } from "framer-motion";
import Home from "../../pages/Home";
import Policy from "../../pages/Policy";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useRouter } from "../../hooks/useRouter";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];
const easeIn: [number, number, number, number] = [0.45, 0, 0.55, 1];

const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: easeIn } },
};

export const Layout = () => {
  const { path } = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400/10 via-transparent to-indigo-500/10 pb-24">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main key={path} variants={pageVariants} initial="initial" animate="animate" exit="exit">
          {path === "/policy" ? <Policy /> : <Home />}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};
