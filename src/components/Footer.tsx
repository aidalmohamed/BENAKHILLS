import { useLanguage } from "../contexts/LanguageContext";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background pt-32 pb-16 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-dark-surface to-background -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-16 pb-24">
          <div className="md:col-span-5 space-y-10 border-r border-white/5 pr-10">
            <div className="flex flex-col gap-4">
              <span className="text-white text-3xl font-heading tracking-[0.2em]">BENAK HILLS</span>
              <span className="text-gold text-[10px] tracking-[0.5em] font-body uppercase opacity-70 border-l border-gold pl-4 ml-1">L'Immobilier de prestige</span>
            </div>
            <p className="text-foreground/40 font-body text-sm leading-relaxed max-w-sm">
              {t("footer.desc")}
            </p>
          </div>

          <div className="md:col-span-4 space-y-10">
            <h4 className="text-xs text-gold font-body tracking-[0.3em] uppercase opacity-70">Navigation</h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-12">
              {["accueil", "concept", "modeles", "galerie", "contact"].map(key => (
                <a key={key} href={`#${key}`} className="text-sm font-body text-foreground/50 hover:text-white transition-colors uppercase tracking-widest">
                  {t(`nav.${key}`)}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 space-y-10 flex flex-col md:items-end text-left md:text-right">
             <div className="space-y-4">
                <h4 className="text-xs text-gold font-body tracking-[0.3em] uppercase opacity-70">S'élever vers le Luxe</h4>
                <p className="text-foreground/40 font-body text-sm">Découvrez l'expérience Benak Hills.</p>
             </div>
             <button onClick={scrollToTop} className="group p-5 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:border-gold hover:text-gold transition-all duration-500 shadow-xl overflow-hidden hover:scale-110">
                <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
             </button>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
           <p className="text-[10px] text-foreground font-body tracking-widest">{t("footer.copyright")}</p>
           <div className="flex gap-10">
              <a href="#" className="text-[10px] text-foreground font-body tracking-[0.2em] hover:text-gold transition-colors">{t("footer.legal")}</a>
              <a href="#" className="text-[10px] text-foreground font-body tracking-[0.2em] hover:text-gold transition-colors">{t("footer.privacy")}</a>
           </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/5 blur-[120px] rounded-full -z-10" />
    </footer>
  );
};

export default Footer;
