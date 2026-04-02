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
    }, 7000);
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
    <section id="accueil" className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center py-24">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        <motion.div
          key="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="space-y-4">
             <h1 className="text-[clamp(1.5rem,8vw,4.5rem)] font-heading font-normal tracking-[0.15em] text-white select-none drop-shadow-2xl leading-[1.2] whitespace-nowrap uppercase mb-0">
                {t("hero.title")}
             </h1>
             <p className="text-[clamp(1rem,4vw,1.5rem)] font-heading italic text-white/90 drop-shadow-lg font-light tracking-wide mt-2">
                {t("hero.subtitle")}
             </p>
          </div>

          <p className="text-sm md:text-lg font-body text-white/70 max-w-3xl mx-auto drop-shadow-md leading-[1.8] pt-4 font-light">
             {t("hero.desc")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 1)", color: "black" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const target = document.getElementById("concept");
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: targetPosition, behavior: "smooth" });
                }
              }}
              className="border border-gold text-gold px-14 py-5 text-[10px] tracking-[0.5em] font-body uppercase flex items-center gap-4 transition-all duration-700 rounded-sm shadow-2xl backdrop-blur-sm"
            >
              {t("hero.cta")}
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          {carouselItems.slice(0, 5).map((_: any, i: number) => (
             <button
               key={i}
               onClick={() => setCurrentIndex(i)}
               className={`h-[1px] transition-all duration-700 ${i === currentIndex % 5 ? "w-16 bg-gold" : "w-8 bg-white/20 hover:bg-white/40"}`}
             />
          ))}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8 lg:hidden">
          <button onClick={prev} className="p-3 border border-white/20 rounded-full text-white/70 hover:text-gold hover:border-gold transition-all backdrop-blur-sm bg-black/20">
              <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={next} className="p-3 border border-white/20 rounded-full text-white/70 hover:text-gold hover:border-gold transition-all backdrop-blur-sm bg-black/20">
              <ChevronRight className="w-4 h-4" />
          </button>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-3 text-white/20 group cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => document.getElementById("concept")?.scrollIntoView({ behavior: "smooth" })}>
          <ArrowDown className="w-4 h-4" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
