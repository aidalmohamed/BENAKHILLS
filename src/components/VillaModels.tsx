import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Square, ArrowRight, Layout, Home } from "lucide-react";

const VillaModels = () => {
  const { lang, t } = useLanguage();
  const [active, setActive] = useState(0);

  const models = [
    {
      id: "01",
      title: lang === "fr" ? "Configuration 5 Chambres" : "5 Bedroom Configuration",
      desc: lang === "fr" 
        ? "Cette première configuration offre 5 chambres spacieuses, dont une suite au rez-de-chaussée, idéale pour recevoir ou pour profiter d'un espace de vie de plain-pied. À l'étage, 4 belles chambres lumineuses complètent la partie nuit, offrant confort et intimité."
        : "This first configuration offers 5 spacious bedrooms, including a ground-floor suite, ideal for hosting or enjoying single-level living. Upstairs, 4 bright bedrooms complete the sleeping area, offering comfort and privacy.",
      images: ["/assets/19.png", "/assets/20.png", "/assets/3.png"],
      specs: [
        { label: lang === "fr" ? "Chambres" : "Bedrooms", value: "5" },
        { label: "Rez-de-chaussée", value: "Suite Parentale" },
      ]
    },
    {
      id: "02",
      title: lang === "fr" ? "4 Chambres avec Master-room" : "4 Bedrooms with Master Suite",
      desc: lang === "fr"
        ? "Cette seconde configuration permet toujours de bénéficier d'une suite au rez-de-chaussée, tout en offrant à l'étage trois chambres dont une superbe master room. Les volumes généreux créent un espace nuit à la fois élégant et accueillant."
        : "This second configuration still offers a ground-floor suite, while providing three bedrooms upstairs including a superb master room. Generous volumes create a sleeping space that is both elegant and welcoming.",
      images: ["/assets/21.png", "/assets/22.png", "/assets/5.png"],
      specs: [
        { label: lang === "fr" ? "Chambres" : "Bedrooms", value: "4" },
        { label: "Master Suite", value: "Inclus" },
      ]
    },
    {
      id: "03",
      title: lang === "fr" ? "3 Chambres avec Master-room" : "3 Bedrooms with Master Suite",
      desc: lang === "fr"
        ? "Cette troisième configuration permet de profiter d'une pièce de vie particulièrement spacieuse, tout en conservant à l'étage 3 chambres, dont une superbe master room. Les volumes généreux offrent un confort idéal."
        : "This third configuration offers a particularly spacious living area, while maintaining 3 bedrooms upstairs, including a superb master room. Generous volumes offer ideal comfort.",
      images: ["/assets/23.png", "/assets/24.png", "/assets/6.png"],
      specs: [
        { label: lang === "fr" ? "Chambres" : "Bedrooms", value: "3" },
        { label: "Living Area", value: "Maxi-volumes" },
      ]
    },
    {
      id: "04",
      title: lang === "fr" ? "4 Chambres Étage" : "4 Upstairs Bedrooms",
      desc: lang === "fr"
        ? "Cette quatrième configuration permet de profiter d'une pièce de vie particulièrement spacieuse, tout comme l'option 3. À la différence près qu'à l'étage, entièrement dédié à l'espace nuit, vous trouverez 4 chambres parfaitement pensées."
        : "This fourth configuration offers a particularly spacious living area, just like option 3. The difference is that the entire upper floor, dedicated to the sleeping area, features 4 bedrooms perfectly designed.",
      images: ["/assets/25.png", "/assets/26.png", "/assets/7.png"],
      specs: [
        { label: lang === "fr" ? "Chambres" : "Bedrooms", value: "4" },
        { label: "Upper Floor", value: "Night Area Only" },
      ]
    }
  ];

  const current = models[active];

  return (
    <section id="modeles" className="py-24 md:py-32 bg-dark-surface relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 max-w-2xl"
            >
              <span className="text-gold text-xs tracking-[0.4em] font-body uppercase border-b-2 border-gold pb-1">
                 {t("models.label")}
              </span>
              <h2 className="text-4xl md:text-6xl font-heading text-white">
                {t("models.title")}
              </h2>
              <p className="text-foreground/50 font-body">
                {t("models.desc")}
              </p>
            </motion.div>

            <div className="flex gap-4">
               {models.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => setActive(i)}
                    className={`w-12 h-12 flex items-center justify-center font-heading text-xl transition-all duration-500 rounded-sm border ${
                      active === i ? "bg-gold text-background border-gold scale-110 shadow-lg shadow-gold/20" : "bg-white/5 text-gold border-white/10 hover:border-gold/50"
                    }`}
                  >
                    {m.id}
                  </button>
               ))}
            </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid lg:grid-cols-12 gap-12"
          >
            {/* Info Col */}
            <div className="lg:col-span-5 space-y-10">
               <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-heading text-white/90 leading-tight">
                    {current.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed font-body text-lg border-l-2 border-white/10 pl-6">
                    {current.desc}
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  {current.specs.map(spec => (
                    <div key={spec.label} className="p-6 bg-white/5 border border-white/5 hover:border-gold/20 transition-all group">
                       <p className="text-[10px] text-foreground/40 font-body uppercase tracking-widest mb-1 group-hover:text-gold transition-colors">{spec.label}</p>
                       <p className="text-white text-lg font-heading">{spec.value}</p>
                    </div>
                  ))}
               </div>

               <div className="pt-8">
                  <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} 
                  className="flex items-center gap-4 text-gold hover:text-white transition-all group tracking-[0.3em] font-body text-xs uppercase">
                    Informations personnalisées
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
               </div>
            </div>

            {/* Slider Col */}
            <div className="lg:col-span-7 grid grid-cols-2 grid-rows-2 gap-4 h-[500px] md:h-[650px]">
                <div className="col-span-2 row-span-1 rounded-sm overflow-hidden border border-white/10 shadow-2xl relative group">
                    <img src={current.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="col-span-1 row-span-1 rounded-sm overflow-hidden border border-white/10 shadow-2xl relative group">
                    <img src={current.images[1]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="col-span-1 row-span-1 rounded-sm overflow-hidden border border-white/10 shadow-2xl relative group">
                    <img src={current.images[2]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-background to-transparent pointer-events-none -z-10 opacity-50" />
    </section>
  );
};

export default VillaModels;
