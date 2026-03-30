import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Concept from "./components/Concept";
import VillaModels from "./components/VillaModels";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect } from "react";

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
        <VillaModels />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
