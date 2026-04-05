import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { MapPin, Navigation, Clock, ExternalLink } from "lucide-react";

const Location = () => {
  const { t } = useLanguage();
  return (
    <section id="emplacement" className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="w-10 h-[1px] bg-gold" />
                <span className="text-gold text-[10px] tracking-[0.5em] font-body uppercase">
                   {t("domain.label")}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-heading text-white leading-tight">
                {t("domain.title.part1")} <br />
                <span className="italic gold-text-gradient">{t("domain.title.part2")}</span>
              </h2>
              <div className="h-px w-20 bg-white/10" />
              <p className="text-foreground/60 font-body text-base lg:text-lg leading-loose max-w-lg">
                {t("domain.desc")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
              <div className="space-y-4 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500 shadow-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-white font-heading text-lg">{t("domain.loc1.title")}</h4>
                <p className="text-foreground/40 font-body text-sm leading-relaxed">
                  {t("domain.loc1")}
                </p>
              </div>

              <div className="space-y-4 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500 shadow-lg">
                  <Navigation className="w-5 h-5" />
                </div>
                <h4 className="text-white font-heading text-lg">{t("domain.loc2.title")}</h4>
                <p className="text-foreground/40 font-body text-sm leading-relaxed">
                  {t("domain.loc2")}
                </p>
              </div>
            </div>

            <div className="pt-8">
              <motion.a
                href="https://maps.app.goo.gl/WbU6prfD8nKoUUcP8?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 px-10 py-5 bg-transparent border border-gold text-gold font-body text-[10px] tracking-[0.4em] uppercase hover:bg-gold hover:text-black transition-all duration-700 shadow-2xl relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
                {t("domain.mapBtn")}
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative order-first lg:order-last"
          >
            <div className="aspect-video lg:aspect-square overflow-hidden rounded-sm border border-white/5 shadow-2xl group">
              <img 
                src="/location.jpg" 
                alt="Villas Benak Hills" 
                className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              
            </div>

            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 blur-[100px] -z-10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/5 blur-[100px] -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
