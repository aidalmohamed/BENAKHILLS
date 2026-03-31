import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { ChevronRight, ChevronLeft, ArrowDown } from "lucide-react";
import { db } from "../lib/db";

const Hero = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [carouselItems, setCarouselItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const data = await db.getCarousel();
        if (data && data.length > 0) {
          setCarouselItems(data);
        } else {
          // Fallback
          setCarouselItems(Array.from({ length: 5 }, (_, i) => ({
            src: `/assets/${i + 1}.png`,
            title: "BENAK",
            subtitle: t("hero.subtitle")
          })));
        }
      } catch (e) {
        setCarouselItems([{ src: "/assets/1.png", title: "BENAK", subtitle: t("hero.subtitle") }]);
      } finally {
        setLoading(false);
      }
    };
    loadHero();
  }, [t]);

  useEffect(() => {
    if (carouselItems.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 10000); // 10 seconds per slide for high-end feel
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  if (loading) return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
       <motion.div 
         initial={{ scale: 0.8, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         className="w-20 h-20 border-2 border-gold/10 border-t-gold rounded-full animate-spin" 
       />
    </div>
  );

  const current = carouselItems[currentIndex];

  return (
    <section id="accueil" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img
              src={current.src}
              alt={current.title || "Villas de Luxe"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-zinc-950" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex flex-col items-center gap-4">
             <span className="text-gold text-[10px] md:text-xs tracking-[0.8em] font-body uppercase bg-black/40 backdrop-blur-md px-10 py-3 border border-gold/20 rounded-full shadow-2xl">
               {current.subtitle || t("hero.subtitle")}
             </span>
          </div>

          <h1 className="text-6xl md:text-9xl lg:text-[12rem] font-heading font-normal tracking-[0.2em] text-white select-none">
            {current.title === "BENAK" ? (
              <>
                <span className="block opacity-90 drop-shadow-2xl">BENAK</span>
                <span className="block gold-text-gradient font-heading -mt-4 drop-shadow-2xl">HILLS</span>
              </>
            ) : (
              <span className="block italic uppercase">{current.title}</span>
            )}
          </h1>

          <p className="text-lg md:text-xl font-heading italic text-white/70 max-w-2xl mx-auto drop-shadow-lg">
            {t("hero.desc")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.05, letterSpacing: "0.5em" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("concept")?.scrollIntoView({ behavior: "smooth" })}
              className="group border border-gold bg-gold/10 hover:bg-gold text-gold hover:text-black px-12 py-5 text-[10px] tracking-[0.4em] font-body flex items-center gap-4 transition-all duration-700 rounded-sm shadow-2xl"
            >
              {t("hero.cta")}
              <ArrowDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel Controls */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 hidden lg:flex">
          {carouselItems.slice(0, 5).map((_: any, i: number) => (
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
                {carouselItems.slice(0, 3).map((_: any, i: number) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex % carouselItems.length ? "bg-gold scale-125" : "bg-white/30"}`} />
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
