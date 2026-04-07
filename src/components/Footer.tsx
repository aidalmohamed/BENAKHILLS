import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Instagram, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 pt-32 pb-12 border-t border-white/5 font-body relative overflow-hidden">
      
      {/* FIX: pointer-events-none added */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/[0.02] -skew-x-12 transform origin-top-right pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-16 pb-24 border-b border-white/5">
          
          {/* LEFT */}
          <div className="md:col-span-4 space-y-10">
            <div className="flex items-center gap-3">
              <img
                src="/logo_benak.png"
                alt="Benak Hills Logo"
                className="h-16 w-auto object-contain"
                style={{
                  mixBlendMode: "screen",
                  filter: "contrast(1.5) brightness(1.1)",
                }}
              />
            </div>

            <p className="text-foreground/40 text-sm leading-relaxed max-w-sm">
              {t("footer.desc")}
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-white font-heading text-lg tracking-widest uppercase">
              Navigation
            </h4>

            <div className="flex flex-col gap-4">
              {[
                "accueil",
                "concept",
                "offres",
                "modeles",
                "galerie",
                "contact",
              ].map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className="text-zinc-500 hover:text-gold transition-colors text-sm uppercase tracking-widest"
                >
                  {t(`nav.${link}`)}
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className="md:col-span-5 space-y-8">
            <h4 className="text-white font-heading text-lg tracking-widest uppercase">
              {t("footer.contactTitle")}
            </h4>

            <div className="space-y-6">
              <a
                href="tel:+212786360767"
                className="flex items-center gap-4 group relative z-10"
              >
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm text-foreground/60 group-hover:text-white">
                  +212 786 360 767
                </span>
              </a>

              <a
                href="mailto:contact@benakhills.com"
                className="flex items-center gap-4 group relative z-10"
              >
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm text-foreground/60 group-hover:text-white">
                  contact@benakhills.com
                </span>
              </a>

              <a
                href="https://share.google/elbIZ75zUtxJKx9L3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group relative z-10"
              >
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm text-foreground/60 group-hover:text-white">
                  {t("contact.addressValue")}
                </span>
              </a>

              <a
                href="https://www.instagram.com/benakhills?igsh=OHduZjVmMzNtdHE4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group relative z-10"
              >
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                  <Instagram className="w-4 h-4" />
                </div>
                <span className="text-sm text-foreground/60 group-hover:text-white">
                  @benakhills
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase">
            {t("footer.copyright")}
          </div>

          <div className="flex gap-8">
            <Link
              to="/legal?tab=mentions"
              onClick={() => window.scrollTo(0, 0)}
              className="text-zinc-600 hover:text-gold text-[10px] tracking-[0.3em] uppercase"
            >
              {t("footer.legal")}
            </Link>
            <Link
              to="/legal?tab=privacy"
              onClick={() => window.scrollTo(0, 0)}
              className="text-zinc-600 hover:text-gold text-[10px] tracking-[0.3em] uppercase"
            >
              {t("footer.privacy")}
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all duration-700 rounded-sm group relative"
          >
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* FIX: pointer-events-none added */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
    </footer>
  );
};

export default Footer;