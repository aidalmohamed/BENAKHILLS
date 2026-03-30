import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronRight, ChevronLeft, ArrowDown } from "lucide-react";

const Hero = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = Array.from({ length: 32 }, (_, i) => `/assets/${i + 1}.png`);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [images.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="accueil" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex]}
              alt="Benak Hills Luxury Villa"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background/95" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col items-center gap-4">
             <motion.div 
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ duration: 1, delay: 1 }}
               className="h-px w-24 bg-gold origin-center"
             />
             <span className="text-gold text-[10px] md:text-xs tracking-[0.6em] font-body uppercase bg-black/40 backdrop-blur px-8 py-2 border border-gold/20 rounded-full">
               {t("hero.subtitle")}
             </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-normal tracking-[0.1em] text-white">
            <span className="block opacity-90 drop-shadow-2xl">BENAK</span>
            <span className="block gold-text-gradient font-heading mt-2 drop-shadow-2xl">HILLS</span>
          </h1>

          <p className="text-lg md:text-xl font-heading italic text-white/80 max-w-2xl mx-auto drop-shadow-lg">
            {t("hero.desc")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("concept")?.scrollIntoView({ behavior: "smooth" })}
              className="group border border-gold bg-gold/10 hover:bg-gold text-gold hover:text-background px-10 py-5 text-[10px] tracking-[0.4em] font-body flex items-center gap-3 transition-all duration-500 rounded-sm"
            >
              {t("hero.cta")}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel Controls */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden lg:flex">
          {images.slice(0, 5).map((_, i) => (
             <button
               key={i}
               onClick={() => setCurrentIndex(i)}
               className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex % 5 ? "w-12 bg-gold" : "w-6 bg-white/20"}`}
             />
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8 lg:hidden">
            <button onClick={prev} className="p-3 border border-white/20 rounded-full text-white/70 hover:text-gold hover:border-gold transition-all backdrop-blur-sm bg-black/20">
                <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
                {[0,1,2].map(i => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex % 3 ? "bg-gold scale-125" : "bg-white/30"}`} />
                ))}
            </div>
            <button onClick={next} className="p-3 border border-white/20 rounded-full text-white/70 hover:text-gold hover:border-gold transition-all backdrop-blur-sm bg-black/20">
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="flex flex-col items-center gap-3 text-white/30 group cursor-pointer" onClick={() => document.getElementById("concept")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="text-[10px] tracking-widest font-body uppercase group-hover:text-gold transition-colors">Scroll</span>
            <ArrowDown className="w-4 h-4 group-hover:text-gold transition-colors" />
          </div>
        </motion.div>
      </div>

      {/* Slide Index Progress Mobile */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 md:hidden">
         <motion.div 
           key={currentIndex}
           initial={{ width: 0 }}
           animate={{ width: "100%" }}
           transition={{ duration: 8, ease: "linear" }}
           className="h-full bg-gold"
         />
      </div>
    </section>
  );
};

export default Hero;
