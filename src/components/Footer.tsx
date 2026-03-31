import { useLanguage } from "../contexts/LanguageContext";
import { ArrowUp, Phone, Mail, Instagram } from "lucide-react";

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
          <div className="md:col-span-4 space-y-10 border-r border-white/5 pr-10">
            <div className="flex items-center gap-3">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="text-gold">
                <path d="M20 80V40L40 20V80H20ZM45 80V10L65 30V80H45ZM70 80V50L90 70V80H70Z" fill="currentColor" />
                <rect x="10" y="80" width="80" height="2" fill="currentColor" />
              </svg>
              <div className="flex flex-col">
                <span className="text-white text-lg font-heading tracking-[0.2em] leading-none">BENAK</span>
                <span className="text-white text-xs font-heading tracking-[0.3em] opacity-80 mt-1">HILLS</span>
              </div>
            </div>
            <p className="text-foreground/40 font-body text-sm leading-relaxed max-w-sm">
              L'élégance architecturale au service de votre sérénité. L'immobilier de prestige à Marrakech redéfini. Réservez dès maintenant votre future villa.
            </p>
          </div>

          <div className="md:col-span-4 space-y-8">
            <h4 className="text-sm font-heading italic text-white/90">Contactez notre agence</h4>
            <div className="space-y-6">
              <a href="tel:+212786360767" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                   <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm text-foreground/60 font-body group-hover:text-white transition-colors">+212 786 360 767</span>
              </a>
              <a href="mailto:contact@benakhills.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                   <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm text-foreground/60 font-body group-hover:text-white transition-colors">contact@benakhills.com</span>
              </a>
              <a href="https://instagram.com/benakhills" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                   <Instagram className="w-4 h-4" />
                </div>
                <span className="text-sm text-foreground/60 font-body group-hover:text-white transition-colors">@benakhills</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col md:items-end justify-between items-start">
             <button onClick={scrollToTop} className="group p-5 border border-white/10 rounded-full flex items-center justify-center text-gold hover:border-gold hover:bg-gold/10 transition-all duration-500 shadow-xl overflow-hidden hover:scale-110">
                <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
             </button>
             <div className="mt-auto pt-10 text-xs font-body tracking-[0.2em] text-foreground/30 flex gap-8">
                <a href="#" className="hover:text-gold transition-colors">MENTIONS LÉGALES</a>
                <a href="#" className="hover:text-gold transition-colors">CONFIDENTIALITÉ</a>
             </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
           <p className="text-[10px] text-foreground font-body tracking-widest">{t("footer.copyright")}</p>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/5 blur-[120px] rounded-full -z-10" />
    </footer>
  );
};

export default Footer;
