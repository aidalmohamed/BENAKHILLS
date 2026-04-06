import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { db } from "../lib/db";

import _3Chambres_master from "../assets/3_chambres_master.webp";
import _3Chambres_master2 from "../assets/3_chambres_master_2.webp";

import _4Chambres from "../assets/4_chambres.webp";
import _4Chambres2 from "../assets/4_chambres_2.webp";

import _4Chambres_master from "../assets/4_chambres_master.webp";
import _4Chambres_master2 from "../assets/4_chambres_master_2.webp";

import _5Chambres from "../assets/5_chambres.webp";
import _5Chambres2 from "../assets/5_chambres_2.webp";

import img1 from "../assets/19.webp";
import img2 from "../assets/20.webp";
import img3 from "../assets/3.webp";
import img4 from "../assets/21.webp";
import img5 from "../assets/22.webp";
import img6 from "../assets/5.webp";
import img7 from "../assets/30.webp";
import img8 from "../assets/16.webp";

const VillaModels = () => {
  const { lang, t } = useLanguage();
  const [active, setActive] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
const [isInteracting, setIsInteracting] = useState(false);
  const fallbackModels = [
    {
      id: "01",
      display_id: "01",
      title:
        lang === "fr" ? "Configuration 5 Chambres" : "5 Bedroom Configuration",
      desc:
        lang === "fr"
          ? "Cette première configuration offre 5 chambres spacieuses, dont une suite au rez-de-chaussée, idéale pour recevoir ou pour profiter d'un espace de vie de plain-pied. À l'étage, 4 belles chambres lumineuses complètent la partie nuit, offrant confort et intimité."
          : "This first configuration offers 5 spacious bedrooms, including a ground-floor suite, ideal for hosting or enjoying single-level living. Upstairs, 4 bright bedrooms complete the sleeping area, offering comfort and privacy.",
      images: [_5Chambres, _5Chambres2, img1, img2],
    },

    {
      id: "02",
      display_id: "02",
      title:
        lang === "fr"
          ? "4 Chambres avec Master-room"
          : "4 Bedrooms with Master Suite",
      desc:
        lang === "fr"
          ? "Cette configuration propose une suite au rez-de-chaussée ainsi qu'une master room à l’étage, avec des volumes généreux et un confort optimal."
          : "This configuration offers a ground-floor suite and a master bedroom upstairs with generous volumes and comfort.",
      images: [_4Chambres_master, _4Chambres_master2, img3, img4],
    },

    // ✅ ADDED MODEL 3
    {
      id: "03",
      display_id: "03",
      title:
        lang === "fr" ? "Configuration 4 Chambres" : "4 Bedroom Configuration",
      desc:
        lang === "fr"
          ? "Une configuration équilibrée avec 4 chambres, idéale pour une vie familiale confortable et fonctionnelle."
          : "A balanced 4-bedroom configuration ideal for comfortable family living.",
      images: [_4Chambres, _4Chambres2, img5, img6],
    },

    // ✅ ADDED MODEL 4
    {
      id: "04",
      display_id: "04",
      title:
        lang === "fr"
          ? "Configuration 3 Chambres avec Master"
          : "3 Bedrooms with Master",
      desc:
        lang === "fr"
          ? "Une configuration optimisée avec 3 chambres incluant une master, parfaite pour un espace de vie moderne et élégant."
          : "An optimized 3-bedroom layout including a master suite, perfect for modern living.",
      images: [_3Chambres_master, _3Chambres_master2, img7, img8],
    },
  ];

  useEffect(() => {
    const loadModels = async () => {
      try {
        const data = await db.getModels();
        if (data && data.length > 0) {
          setModels(data);
        } else {
          setModels(fallbackModels);
        }
      } catch (e) {
        console.error("Error loading models:", e);
        setModels(fallbackModels);
      } finally {
        setLoading(false);
      }
    };
    loadModels();
  }, [lang]);

 useEffect(() => {
  if (models.length === 0 || isInteracting) return;

  const interval = setInterval(() => {
    const currentModel = models[active];
    const validImgList = (currentModel.images || []).filter(
      (img: string) => img && img.length > 0,
    );
    const imageCount = validImgList.length || 1;

    setSubIndex((prev) => {
      if (prev + 1 < imageCount) {
        return prev + 1;
      } else {
        setActive((a) => (a + 1) % models.length);
        return 0;
      }
    });
  }, 4000);

  return () => clearInterval(interval);
}, [models, active, isInteracting]);

  if (loading)
    return (
      <div className="py-40 flex flex-col items-center justify-center gap-6 bg-zinc-950">
        <div className="w-16 h-16 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
        <div className="text-gold animate-pulse tracking-[0.5em] text-[10px] uppercase font-body">
          {t("models.loading")}
        </div>
      </div>
    );
  if (!models.length) return null;

  const current = models[active];
  const title =
    lang === "en" ? current.title_en || current.title : current.title;
  const desc =
    lang === "en"
      ? current.description_en || current.description || current.desc
      : current.description || current.desc;

  const validImages = (current.images || []).filter(
    (img: string) => img && img.length > 0,
  );
  const activeImage = validImages[subIndex] || validImages[0];

  return (
    <section
      id="modeles"
      className="py-24 md:py-40 bg-zinc-950 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/[0.02] -skew-x-12 transform origin-top-right" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 max-w-2xl"
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-[1px] bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.5em] font-body uppercase">
                {t("models.label")}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-heading text-white italic lowercase">
              {t("models.title")}
            </h2>
            <p className="text-zinc-500 font-body text-sm leading-relaxed max-w-lg">
              {t("models.desc")}
            </p>
          </motion.div>

          <div className="flex gap-4">
            {models.map((m: any, i: number) => (
              <button
                key={m.id || i}
                onClick={() => {
                  setActive(i);
                  setSubIndex(0);
                }}
                className={`group relative w-14 h-14 flex items-center justify-center transition-all duration-700 rounded-full border-2 ${
                  active === i
                    ? "bg-gold text-black border-gold scale-110 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                    : "bg-transparent text-zinc-600 border-zinc-800 hover:border-gold/50 hover:text-gold"
                }`}
              >
                <span className="font-heading text-xl">
                  {m.display_id || i + 1}
                </span>
                {active === i && (
                  <motion.div
                    layoutId="activeCircle"
                    className="absolute inset-[-6px] border border-gold/30 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-${subIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-16 items-start"
          >
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-8">
                <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-sm">
                  <span className="text-gold text-[10px] tracking-widest uppercase font-body">
                    {t("models.plans")}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-heading text-white leading-tight">
                  {title}
                </h3>
                <p className="text-zinc-400 leading-loose font-body text-base lg:text-lg">
                  {desc}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-6">
                <a
                  href="/benak-hills-presentation.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-5 flex items-center justify-center gap-4 bg-white text-black hover:bg-gold transition-all duration-500 tracking-[0.3em] font-body text-[10px] uppercase group shadow-2xl"
                >
                  <span>{t("models.brochure")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="flex-1 py-5 flex items-center justify-center gap-4 border border-zinc-800 text-white hover:border-gold hover:text-gold transition-all duration-500 tracking-[0.3em] font-body text-[10px] uppercase"
                >
                  {t("models.discuss")}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-sm overflow-hidden border border-zinc-900 shadow-2xl relative aspect-[16/10] group">
                <img
                  src={activeImage}
                  alt="Villa View"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 flex items-center gap-4">
                  <span className="text-gold text-[10px] tracking-[0.4em] font-body uppercase bg-black/80 px-4 py-2 border border-gold/20 backdrop-blur-sm">
                    {subIndex === 0
                      ? t("models.viewPlan")
                      : `${t("models.viewDetail")} ${subIndex}`}
                  </span>
                  <div className="flex gap-2">
                    {validImages.map((_: string, idx: number) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${idx === subIndex ? "bg-gold w-4 shadow-[0_0_8px_rgba(212,175,55,0.6)]" : "bg-white/20"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-24 md:h-32">
                {validImages.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => setSubIndex(idx)}
                    className={`rounded-sm overflow-hidden border transition-all duration-500 cursor-pointer relative ${idx === subIndex ? "border-gold scale-105 z-10" : "border-zinc-900 opacity-40 hover:opacity-100"}`}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt={`Thumbnail ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none -z-10 opacity-50" />
    </section>
  );
};

export default VillaModels;
