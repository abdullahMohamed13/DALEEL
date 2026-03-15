import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="my-8 flex-grow">
        <Header />
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
