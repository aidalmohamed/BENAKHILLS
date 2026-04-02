import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    { name: t("nav.offres"), href: "#offres" },
    { name: t("nav.modeles"), href: "#modeles" },
    { name: t("nav.galerie"), href: "#galerie" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
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
        <Link to="/" className="flex items-center group">
          <img 
            src="/logo_benak.png" 
            alt="Benak Hills Logo" 
            className="h-20 w-auto sm:h-24 md:h-32 object-contain transition-all duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[10px] tracking-widest font-body text-white/70 hover:text-gold transition-colors duration-300 uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-8 ml-8 h-8 border-l border-white/10 pl-8">
            <div className="flex items-center gap-3 bg-white/5 p-1 rounded-full border border-white/5">
                <button
                  onClick={() => setLang("fr")}
                  className={`px-3 py-1 rounded-full text-[9px] font-body tracking-widest transition-all ${lang === 'fr' ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-white/40 hover:text-white'}`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1 rounded-full text-[9px] font-body tracking-widest transition-all ${lang === 'en' ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-white/40 hover:text-white'}`}
                >
                  EN
                </button>
            </div>
            
            <a 
              href="#contact" 
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="px-6 py-2 border border-gold text-gold text-[10px] tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-500 shadow-2xl shadow-gold/5"
            >
              {t("nav.contact")}
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground/80 hover:text-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 z-[60] bg-black flex flex-col"
          >
            {/* Mobile Header (within the drawer) */}
            <div className="flex items-center justify-between px-6 py-8 border-b border-white/5 bg-black/50 backdrop-blur-md">
               <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="h-10">
                  <img src="/logo_benak.png" alt="Logo" className="h-full w-auto object-contain" />
               </Link>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white hover:text-gold transition-colors">
                  <X className="w-8 h-8" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col gap-8 items-center bg-[url('/assets/pattern.png')] bg-repeat opacity-100">
               {navLinks.map((link, i) => (
                 <motion.a
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 + i * 0.05 }}
                   key={link.name}
                   href={link.href}
                   onClick={(e) => handleLinkClick(e, link.href)}
                   className="text-2xl tracking-[0.3em] font-heading text-white hover:text-gold transition-all duration-500 uppercase italic lowercase group flex items-center gap-4"
                 >
                   <span className="w-0 group-hover:w-8 h-px bg-gold transition-all duration-500 opacity-0 group-hover:opacity-100" />
                   {link.name}
                 </motion.a>
               ))}
               
               <div className="w-20 h-px bg-gold/20 my-8" />
               
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4 p-1 bg-white/5 border border-white/10 rounded-full px-6 py-2"
               >
                   <button
                      onClick={() => { setLang("fr"); setIsMobileMenuOpen(false); }}
                      className={`px-4 py-2 text-xs font-body tracking-widest rounded-full transition-all ${lang === 'fr' ? 'bg-gold text-black shadow-lg shadow-gold/20 font-bold' : 'text-white/40'}`}
                   >
                      FR
                   </button>
                   <div className="w-px h-4 bg-white/10 self-center" />
                   <button
                      onClick={() => { setLang("en"); setIsMobileMenuOpen(false); }}
                      className={`px-4 py-2 text-xs font-body tracking-widest rounded-full transition-all ${lang === 'en' ? 'bg-gold text-black shadow-lg shadow-gold/20 font-bold' : 'text-white/40'}`}
                   >
                      EN
                   </button>
               </motion.div>

               <motion.a 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.7 }}
                 href="#contact" 
                 onClick={(e) => handleLinkClick(e, "#contact")}
                 className="mt-12 px-12 py-5 bg-gold text-black text-xs tracking-[0.4em] uppercase font-body font-bold shadow-2xl shadow-gold/20 flex items-center gap-4"
               >
                 {t("nav.contact")}
               </motion.a>
            </div>
            
            {/* Footer decoration */}
            <div className="h-2 bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;
