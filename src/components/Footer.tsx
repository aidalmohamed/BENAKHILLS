import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 pt-32 pb-12 border-t border-white/5 font-body relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/[0.02] -skew-x-12 transform origin-top-right" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-16 pb-24 border-b border-white/5">
          <div className="md:col-span-4 space-y-10">
            <div className="flex items-center gap-3">
              <img 
                src="/logo_benak.png" 
                alt="Benak Hills Logo" 
                className="h-16 w-auto object-contain"
                style={{ mixBlendMode: 'screen', filter: 'contrast(1.5) brightness(1.1)' }}
              />
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed max-w-sm">
              {t("footer.desc")}
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold transition-all duration-500">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 space-y-8">
            <h4 className="text-white font-heading text-lg tracking-widest uppercase">Navigation</h4>
            <div className="flex flex-col gap-4">
              {["accueil", "concept", "offres", "modeles", "galerie", "contact"].map((link) => (
                <a key={link} href={`#${link}`} className="text-zinc-500 hover:text-gold transition-colors text-sm uppercase tracking-widest">
                   {t(`nav.${link}`)}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 space-y-8">
            <h4 className="text-white font-heading text-lg tracking-widest uppercase">{t("footer.contactTitle")}</h4>
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
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm text-foreground/60 font-body group-hover:text-white transition-colors">Place la Liberté, Marrakech</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-600 text-[10px] tracking-[0.3em] font-body uppercase">
            {t("footer.copyright")}
          </div>
          
          <div className="flex gap-8">
            <Link to="/legal?tab=mentions" onClick={() => window.scrollTo(0, 0)} className="text-zinc-600 hover:text-gold transition-colors text-[10px] tracking-[0.3em] uppercase">
               {t("footer.legal")}
            </Link>
            <Link to="/legal?tab=privacy" onClick={() => window.scrollTo(0, 0)} className="text-zinc-600 hover:text-gold transition-colors text-[10px] tracking-[0.3em] uppercase">
               {t("footer.privacy")}
            </Link>
          </div>

          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-700 rounded-sm group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/5 blur-[120px] rounded-full -z-10" />
    </footer>
  );
};

export default Footer;
