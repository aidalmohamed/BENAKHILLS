import { motion } from "framer-motion";
import { Maximize, BedDouble } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useState } from "react";

import img1 from "../../public/gallery/14.webp";
import img2 from "../../public/gallery/4.webp";
import img3 from "../../public/gallery/6.webp";
import img4 from "../../public/gallery/8.webp";

const FeaturedOffers = () => {
  const { t } = useLanguage();
  const [offers, setOffers] = useState<any[]>([]);

  // ✅ REACTIVE LIKE HERO
  useEffect(() => {
    setOffers([
      {
        id: 1,
        title: t("offers.01.title"),
        type: "Villa",
        surface: 240,
        rooms: 5,
        description: t("offers.01.desc"),
        image: img1,
      },
      {
        id: 2,
        title: t("offers.02.title"),
        type: "Villa",
        surface: 240,
        rooms: 4,
        description: t("offers.02.desc"),
        image: img2,
      },
      {
        id: 3,
        title: t("offers.03.title"),
        type: "Villa",
        surface: 240,
        rooms: 3,
        description: t("offers.03.desc"),
        image: img3,
      },
      {
        id: 4,
        title: t("offers.04.title"),
        type: "Villa",
        surface: 240,
        rooms: 4,
        description: t("offers.04.desc"),
        image: img4,
      },
    ]);
  }, [t]);

  return (
    <section
      id="offres"
      className="py-24 md:py-40 bg-zinc-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-gold text-[10px] tracking-[0.4em] uppercase border-b border-gold/30 pb-2 inline-block">
              {t("offers.label")}
            </span>

            <h2 className="text-4xl md:text-6xl font-heading text-white leading-tight">
              {t("offers.title")}
            </h2>
          </div>

          <p className="text-zinc-500 max-w-sm text-sm">{t("offers.desc")}</p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group bg-zinc-900 border border-white/5 overflow-hidden flex flex-col hover:border-gold/30 transition-all duration-700"
            >
              {/* IMAGE */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8 flex flex-col space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-gold text-[10px] tracking-widest uppercase opacity-60">
                    <span>{offer.type}</span>
                    <span className="w-4 h-px bg-gold/30" />
                    <span>{offer.surface} m²</span>
                  </div>

                  <h4 className="text-white text-2xl uppercase mt-2 group-hover:text-gold transition-colors">
                    {offer.title}
                  </h4>
                </div>

                <p className="text-zinc-500 text-sm leading-relaxed">
                  {offer.description}
                </p>

                <div className="flex items-center gap-6 pt-6 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-gold/60" />
                    <span className="text-zinc-400 text-xs">
                      {offer.rooms} {t("offers.rooms")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Maximize className="w-4 h-4 text-gold/60" />
                    <span className="text-zinc-400 text-xs">
                      {offer.surface} m²
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    document
                      .getElementById("modeles")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-6 py-4 border border-zinc-800 text-zinc-400 hover:text-gold hover:border-gold text-[10px] tracking-[0.4em] uppercase transition-all duration-500"
                >
                  {t("offers.more")}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
