import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import { Toaster } from "@/components/ui/sonner"

const toasterStyle: React.CSSProperties & Record<string, string> = {
  "--normal-bg": "var(--primary)",
  "--normal-text": "white",
  "--normal-border": "var(--border)",
};

export default function App() {
  return (
    <Router>
      <Toaster duration={4500} style={toasterStyle} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </Router>
  );
}
