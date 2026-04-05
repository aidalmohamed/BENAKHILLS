import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Concept from "./components/Concept";
import FeaturedOffers from "./components/FeaturedOffers";
import VillaModels from "./components/VillaModels";
import Location from "./components/Location";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./pages/Admin";

import WhatsAppButton from "./components/WhatsAppButton";

import Legal from "./pages/Legal";

function AppContent() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden selection:bg-gold/30">
      <Navbar />
      <main>
        <Hero />
        <Concept />
        <FeaturedOffers />
        <Location />
        <VillaModels />
        <Gallery />
        <Contact />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </LanguageProvider>
    </Router>
  );
}

export default App;
