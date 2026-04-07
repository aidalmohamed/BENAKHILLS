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

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md py-4 shadow-xl"
            : "bg-transparent py-8"
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
                  className={`px-3 py-1 rounded-full text-[9px] tracking-widest ${
                    lang === "fr"
                      ? "bg-gold text-black"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1 rounded-full text-[9px] tracking-widest ${
                    lang === "en"
                      ? "bg-gold text-black"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>

              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "#contact")}
                className="px-6 py-2 border border-gold text-gold text-[10px] tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-500"
              >
                {t("nav.contact")}
              </a>
            </div>
          </div>

        
          {/* Mobile Right Section */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="text-[14px] tracking-widest text-white/70 hover:text-gold transition-colors"
            >
              {lang === "en" ? "EN" : "FR"}
            </button>

            {/* Hamburger */}
            <button
              className="p-2 text-foreground/80 hover:text-gold"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU (FIXED) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[999] bg-black flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-8 border-b border-white/5 bg-black/50 backdrop-blur-md">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="h-10"
              >
                <img
                  src="/logo_benak.png"
                  alt="Logo"
                  className="h-full w-auto object-contain"
                />
              </Link>

              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-white" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col gap-8 items-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="text-2xl tracking-[0.3em] text-white hover:text-gold italic font-heading"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
