import Hero from "../sections/Hero";
import Features from "../sections/Features";
import AppFeaturesShowcase from "../sections/AppFeaturesShowcase";
import Testimonials from "../sections/Testimonials";
import CallToAction from "../sections/CallToAction";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-15 md:gap-25"
    >
      <div className="mx-8 *:flex *:items-center *:w-full">
        <Hero />
        <Features />
      </div>

      <AppFeaturesShowcase />

      <div className="mx-8 *:flex *:flex-col *:items-center *:w-full">
        <Testimonials />
        <CallToAction />
      </div>
    </motion.div>
  );
}
