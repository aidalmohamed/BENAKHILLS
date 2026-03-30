import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { CheckCircle2, Layout, Maximize, ShieldCheck } from "lucide-react";

const Concept = () => {
  const { t } = useLanguage();

  const features = [
    { icon: <Maximize className="w-6 h-6 text-gold" />, title: "240 m²", desc: "Surface habitable optimisée" },
    { icon: <ShieldCheck className="w-6 h-6 text-gold" />, title: "300 m²+", desc: "Parcelle de terrain titrée" },
    { icon: <Layout className="w-6 h-6 text-gold" />, title: "Modulable", desc: "4 plans architecturaux au choix" },
    { icon: <CheckCircle2 className="w-6 h-6 text-gold" />, title: "Sécurité", desc: "Domaine privé & gardienné" },
  ];

  return (
    <section id="concept" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] rounded-full -z-10 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="text-gold text-xs tracking-[0.4em] font-body uppercase bg-gold/10 px-4 py-1.5 border-l-2 border-gold rounded-r-md">
              {t("concept.label")}
            </span>
            <h2 className="text-4xl md:text-5xl font-heading leading-tight text-white/90">
              {t("concept.title")}
            </h2>
          </div>

          <div className="space-y-6 text-foreground/70 leading-relaxed font-body">
            <p className="border-l-2 border-gold pt-2 pl-6 italic text-lg text-white/80">
              {t("concept.p1").replace("<gold>", "").replace("</gold>", "")}
            </p>
            <p>{t("concept.p2")}</p>
            <p>{t("concept.p3")}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-6 bg-white/5 border border-white/5 rounded-sm hover:bg-gold/10 hover:border-gold/30 transition-all duration-500"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
                <h4 className="text-white text-lg font-heading mb-1">{feat.title}</h4>
                <p className="text-xs text-foreground/50 tracking-wider font-body">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image Display */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative group h-[500px] md:h-[650px] w-full"
        >
          <div className="absolute inset-0 border border-gold/30 translate-x-6 translate-y-6 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-700" />
          <div className="absolute inset-0 overflow-hidden shadow-2xl rounded-sm">
            <img
              src="/assets/15.png"
              alt="Villa Signature Benak Hills"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="absolute bottom-10 left-10 p-8 bg-black/80 backdrop-blur-md border border-gold/40 shadow-2xl skew-x-3 group-hover:skew-x-0 transition-all duration-500 max-w-[280px]">
             <div className="-skew-x-3 group-hover:skew-x-0 transition-transform">
                <span className="text-[10px] text-gold tracking-widest font-body block uppercase opacity-70 mb-2">Signature Style</span>
                <p className="text-white/90 text-sm font-heading italic">"L'harmonie d'une architecture contemporaine au cœur de Marrakech."</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Concept;
