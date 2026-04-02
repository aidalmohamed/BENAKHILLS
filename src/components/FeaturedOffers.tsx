import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { db } from "../lib/db";
import { Maximize, Users, BedDouble, Bath } from "lucide-react";

const FeaturedOffers = () => {
  const { lang, t } = useLanguage();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const data = await db.getOffers();
        setOffers(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadOffers();
  }, []);

  if (loading) return null;
  if (offers.length === 0) return null;

  return (
    <section id="offres" className="py-24 md:py-40 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <div className="space-y-4">
              <span className="text-gold text-[10px] tracking-[0.4em] font-body uppercase border-b border-gold/30 pb-2 inline-block">
                {t("offers.label")}
              </span>
              <h2 className="text-4xl md:text-6xl font-heading text-white leading-tight">
                {t("offers.title").split(" ")[0]} <span className="gold-text-gradient">{t("offers.title").split(" ")[1]}</span>
              </h2>
           </div>
           <p className="text-zinc-500 font-body max-w-sm text-sm">
             {t("offers.desc")}
           </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {offers.map((offer, i) => {
            const title = lang === "en" ? (offer.title_en || offer.title) : offer.title;
            const desc = lang === "en" ? (offer.description_en || offer.description) : offer.description;
            const images = offer.images || [];

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group bg-zinc-900 border border-white/5 rounded-sm overflow-hidden flex flex-col hover:border-gold/30 transition-all duration-700 hover:shadow-[0_0_50px_rgba(212,175,55,0.1)]"
              >
                {/* Image Section */}
                <div className="aspect-[4/3] overflow-hidden relative">
                   {images[0] ? (
                     <img 
                       src={images[0]} 
                       alt={title} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                     />
                   ) : (
                     <div className="w-full h-full bg-zinc-800 flex items-center justify-center italic text-zinc-600">No Image Available</div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />
                </div>

                {/* Content Section */}
                <div className="p-8 flex-1 flex flex-col space-y-6">
                   <div className="space-y-2">
                      <div className="flex items-center gap-3 text-gold text-[10px] tracking-widest uppercase font-body opacity-60">
                         <span>{offer.type || "Villa"}</span>
                         <span className="w-4 h-px bg-gold/30" />
                         <span>{offer.surface} m²</span>
                      </div>
                      <h4 className="text-white text-2xl font-heading group-hover:text-gold transition-colors duration-500 uppercase">
                        {title}
                      </h4>
                   </div>

                   <p className="text-zinc-500 text-sm font-body leading-relaxed line-clamp-3">
                      {desc}
                   </p>

                   <div className="flex items-center gap-6 pt-6 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-2">
                         <BedDouble className="w-4 h-4 text-gold/60" />
                         <span className="text-zinc-400 text-xs font-body">{offer.rooms} {t("offers.rooms")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Maximize className="w-4 h-4 text-gold/60" />
                         <span className="text-zinc-400 text-xs font-body">{offer.surface} m²</span>
                      </div>
                   </div>

                   <div className="pt-6">
                      <button 
                        onClick={() => {
                          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                          const messageInput = document.querySelector('textarea');
                          if (messageInput) {
                            messageInput.value = `Intéressé par l'offre: ${title} (${offer.price})`;
                          }
                        }}
                        className="w-full py-4 border border-zinc-800 text-zinc-400 hover:text-gold hover:border-gold text-[10px] tracking-[0.4em] uppercase font-body transition-all duration-500"
                      >
                        {t("offers.more")}
                      </button>
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
