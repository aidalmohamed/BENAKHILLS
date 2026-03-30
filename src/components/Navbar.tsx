import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Menu, X, Globe } from "lucide-react";

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.accueil"), href: "#accueil" },
    { name: t("nav.concept"), href: "#concept" },
    { name: t("nav.modeles"), href: "#modeles" },
    { name: t("nav.galerie"), href: "#galerie" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-md py-4 shadow-xl" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#accueil" className="flex items-center gap-3 group" onClick={(e) => handleLinkClick(e, "#accueil")}>
          <div className="relative">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gold group-hover:scale-110 transition-transform duration-500">
               <rect x="8" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.7" />
               <rect x="14" y="12" width="4" height="24" rx="1" fill="currentColor" opacity="0.85" />
               <rect x="20" y="4" width="4" height="32" rx="1" fill="currentColor" />
               <rect x="26" y="12" width="4" height="24" rx="1" fill="currentColor" opacity="0.85" />
               <rect x="32" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.7" />
            </svg>
          </div>
          <div>
            <span className="text-foreground text-xl font-heading tracking-widest block leading-none">BENAK HILLS</span>
            <span className="text-gold text-[8px] tracking-[0.3em] font-body uppercase opacity-70">Marrakech Prestige</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[11px] tracking-widest font-body text-foreground/70 hover:text-gold transition-colors duration-300 uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-6 w-px bg-white/10 mx-2" />

          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="flex items-center gap-2 text-[10px] font-body tracking-[0.2em] text-foreground/50 hover:text-gold transition-all group px-3 py-1.5 border border-white/5 hover:border-gold/30 rounded-full"
          >
            <Globe className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
            {lang.toUpperCase()}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground/80 hover:text-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background/98 backdrop-blur-xl border-t border-white/5 py-10 px-6 shadow-2xl animate-fade-in animate-slide-down">
          <div className="flex flex-col gap-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm tracking-[0.25em] font-body text-foreground/80 hover:text-gold transition-colors uppercase py-2"
              >
                {link.name}
              </a>
            ))}
            <div className="w-12 h-px bg-white/10 my-4" />
            <button
               onClick={() => { setLang(lang === "fr" ? "en" : "fr"); setIsMobileMenuOpen(false); }}
               className="flex items-center gap-3 text-xs font-body tracking-wider text-gold py-4"
            >
               <Globe className="w-4 h-4" />
               {lang === "fr" ? "Switch to English" : "Passer en Français"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
