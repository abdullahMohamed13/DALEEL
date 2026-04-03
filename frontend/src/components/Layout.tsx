import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import { AnimatePresence } from "framer-motion";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow mt-4 md:mt-6 pt-4 md:pt-8 pb-4 md:pb-8">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}
