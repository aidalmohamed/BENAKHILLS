import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "fr" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  fr: {
    // Nav
    "nav.accueil": "ACCUEIL",
    "nav.concept": "CONCEPT",
    "nav.domaine": "LE DOMAINE",
    "nav.offres": "OFFRES",
    "nav.modeles": "MODÈLES",
    "nav.galerie": "GALERIE",
    "nav.contact": "CONTACTEZ-NOUS",
    // Hero
    "hero.subtitle": "Votre villa en toute sérénité",
    "hero.title": "BENAK",
    "hero.title-2": "HILLS",

    "hero.desc":
      "Découvrez des villas élégantes et modulables pensées pour votre confort et votre style de vie au cœur de Marrakech. Votre villa. Votre choix. Votre tranquillité.",
    "hero.cta": "DÉCOUVRIR LE PROJET",
    // Concept
    "concept.label": "Le Concept",
    "concept.title": "La Villa Signature",
    "concept.p1": "Superbe maison de <gold>240 m²</gold>, avec piscine privée, édifiée sur une parcelle de <gold>300 m²</gold> et plus, offrant un cadre de vie unique et prestigieux.",
    "concept.p2":
      "Avec des terrains titrés et entièrement viabilisés, votre acquisition est totalement sécurisée. Modulable selon vos envies avec 4 plans architecturaux distincts.",
    "concept.p3":
      "Investir dans l'immobilier de luxe à Marrakech n'a jamais été aussi serein. Benak Hills redéfinit le haut de gamme marocain en alliant architecture contemporaine et finitions nobles.",
    "concept.priceLabel": "Offre de lancement",
    "concept.priceFrom": "À partir de <gold>4.400.000 MAD</gold>",
    "concept.feat1.title": "240 m²",
    "concept.feat1.desc": "Surface habitable optimisée",
    "concept.feat2.title": "300 m²+",
    "concept.feat2.desc": "Parcelle de terrain titrée",
    "concept.feat3.title": "Modulable",
    "concept.feat3.desc": "4 plans architecturaux au choix",
    "concept.feat4.title": "Sécurité",
    "concept.feat4.desc": "Domaine privé & sécurisé",
    // Domain / Location
    "domain.label": "L'Emplacement",
    "domain.title": "Au Cœur de l'Atmosphère",
    "domain.title.part1": "Au Cœur de",
    "domain.title.part2": "l'Atmosphère",
    "domain.subtitle": "Une situation privilégiée",
    "domain.desc":
      "Idéalement situé, Benak Hills offre un accès rapide aux points d'intérêt majeurs de Marrakech tout en préservant une intimité totale.",
    "domain.loc1": "À 15 minutes du centre-ville et de la place Jemaa el-Fna.",
    "domain.loc1.title": "15 Minutes",
    "domain.loc2": "Proximité immédiate des plus beaux golfs de la ville.",
    "domain.loc2.title": "Proximité Golfs",
    "domain.mapBtn": "VOIR SUR GOOGLE MAPS",
    // Features
    "features.label": "Équipements",
    "features.desc":
      "Une qualité de vie exceptionnelle avec des services et équipements pensés pour votre bien-être au quotidien.",
    "features.gardens.title": "Espaces Verts",
    "features.gardens.desc": "Jardins paysagers et espaces zen.",
    "features.padel.title": "Court de Padel",
    "features.padel.desc": "Pour vos moments de sport et détente.",
    "features.mobility.title": "Mobilité Douce",
    "features.mobility.desc": "Pistes cyclables et chemins de promenade.",
    "features.family.title": "Espaces Famille",
    "features.family.desc": "Aires de jeux et zones de convivialité.",
    // Models
    "models.label": "Nos Plans",
    "models.title": "Villas d'exception",
    "models.desc":
      "Découvrez nos quatre configurations architecturales optimisées pour le luxe et le confort.",
    "models.01.title": "Configuration 5 Chambres",
    "models.01.desc":
      "Cette première configuration offre 5 chambres spacieuses, dont une suite au rez-de-chaussée, idéale pour recevoir ou pour profiter d'un espace de vie de plain-pied. À l'étage, 4 belles chambres lumineuses complètent la partie nuit, offrant confort et intimité.",
    "models.02.title": "4 Chambres avec Master-room",
    "models.02.desc":
      "Cette seconde configuration permet toujours de bénéficier d'une suite au rez-de-chaussée, tout en offrant à l'étage trois chambres dont une superbe master room. Les volumes généreux créent un espace nuit élégant et accueillant.",
    "models.plans": "Plans Architecturaux",
    "models.brochure": "Brochure PDF",
    "models.discuss": "Discuter du projet",
    "models.viewPlan": "Plan Architectural",
    "models.viewDetail": "Vue Détail",
    "models.loading": "Architecture en cours...",
    "contact.thankTitle": "Merci de votre intérêt",
    "contact.thankDesc":
      "Votre message a été transmis avec succès. Notre équipe vous recontacterons dans les plus brefs délais.",
    "contact.another": "Envoyer une autre demande",
    // Gallery
    "gallery.label": "Portfolio",
    "gallery.title": "Immersion Visuelle",
    "gallery.desc":
      "Découvrez l'élégance et le raffinement de Benak Hills à travers notre galerie exclusive.",
    // Contact
    "contact.label": "Contact",
    "contact.title": "Parlons de votre projet",
    "contact.desc":
      "Notre équipe est à votre disposition pour vous accompagner dans votre acquisition immobilière.",
    "contact.phone": "Téléphone",
    "contact.email": "Email",
    "contact.address": "Adresse",
    "contact.addressValue": "Visitez nos Bureaux",
    "contact.name": "Nom Complet",
    "contact.namePlaceholder": "Votre nom...",
    "contact.emailLabel": "Adresse Email",
    "contact.phoneLabel": "Numéro de téléphone",
    "contact.phonePlaceholder": "+212 6...",
    "contact.budget": "Budget estimé",
    "contact.budgetSelect": "Choisissez un budget",
    "contact.config": "Configuration souhaitée",
    "contact.configSelect": "Choisissez un modèle",
    "contact.message": "Votre message",
    "contact.messagePlaceholder": "Décrivez votre projet...",
    "contact.submit": "ENVOYER LA DEMANDE",
    "contact.sending": "ENVOI EN COURS...",
    "contact.successTitle": "Message envoyé",
    "contact.successDesc":
      "Nous vous recontacterons dans les plus brefs délais.",
    "contact.errorTitle": "Erreur",
    "contact.errorDesc":
      "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
    // Featured / Offers
    "offers.label": "Opportunités Immobilières",
    "offers.title": "Offres Exclusives",
    "offers.surface": "Surface",
    "offers.rooms": "Chambres",
    "offers.more": "En savoir plus",
    "offers.desc":
      "Découvrez nos dernières villas et terrains disponibles au cœur du domaine Benak Hills.",
    // Footer
    "footer.desc":
      "L'élégance architecturale au service de votre sérénité. L'immobilier de prestige à Marrakech redéfini. Réservez dès maintenant votre future villa.",
    "footer.contactTitle": "Contactez notre agence",
    "footer.copyright": "© 2026 BENAK HILLS. TOUS DROITS RÉSERVÉS.",
    "footer.legal": "MENTIONS LÉGALES",
    "footer.privacy": "CONFIDENTIALITÉ",
  },
  en: {
    // Nav
    "nav.accueil": "HOME",
    "nav.concept": "CONCEPT",
    "nav.domaine": "THE ESTATE",
    "nav.offres": "OFFERS",
    "nav.modeles": "MODELS",
    "nav.galerie": "GALLERY",
    "nav.contact": "CONTACT US",
    // Hero
    "hero.subtitle": "Your villa in total serenity",
    "hero.title": "BENAK HILLS",
    "hero.desc":
      "Discover elegant and modular villas designed for your comfort and lifestyle in the heart of Marrakech. Your villa. Your choice. Your peace of mind.",
    "hero.cta": "DISCOVER THE PROJECT",
    // Concept
    "concept.label": "The Concept",
    "concept.title": "The Signature Villa",
    "concept.p1":
      "A superb <gold>240 sqm</gold> house, with private pool, built on a plot of <gold>300 sqm and more</gold>, offering a unique and prestigious living environment.",
    "concept.p2":
      "With titled and fully serviced land, your investment is completely secure. Modular according to your wishes with 4 distinct architectural plans.",
    "concept.p3":
      "Investing in luxury real estate in Marrakech has never been so serene. Benak Hills redefines Moroccan high-end by combining contemporary architecture and noble finishes.",
    "concept.priceLabel": "Launch Offer",
    "concept.priceFrom": "Starting from",
    "concept.feat1.title": "240 sqm",
    "concept.feat1.desc": "Optimized living space",
    "concept.feat2.title": "300 sqm+",
    "concept.feat2.desc": "Titled land plot",
    "concept.feat3.title": "Modular",
    "concept.feat3.desc": "Choice of 4 architectural plans",
    "concept.feat4.title": "Security",
    "concept.feat4.desc": "Private & gated domain",
    // Domain / Location
    "domain.label": "The Location",
    "domain.title": "At the Heart of the Atmosphere",
    "domain.title.part1": "At the Heart of",
    "domain.title.part2": "the Atmosphere",
    "domain.subtitle": "A privileged situation",
    "domain.desc":
      "Ideally located, Benak Hills offers quick access to Marrakech's major points of interest while preserving total intimacy.",
    "domain.loc1":
      "15 minutes from the city center and the mythical Jemaa el-Fna square.",
    "domain.loc1.title": "15 Minutes",
    "domain.loc2":
      "Immediate proximity to the city's most beautiful golf courses.",
    "domain.loc2.title": "Golf Proximity",
    "domain.mapBtn": "VIEW ON GOOGLE MAPS",
    // Features
    "features.label": "Amenities",
    "features.desc":
      "Exceptional quality of life with services and equipment designed for your daily well-being.",
    "features.gardens.title": "Green Spaces",
    "features.gardens.desc": "Landscaped gardens and zen areas.",
    "features.padel.title": "Padel Court",
    "features.padel.desc": "For your sports and relaxation moments.",
    "features.mobility.title": "Soft Mobility",
    "features.mobility.desc": "Cycling paths and walking trails.",
    "features.family.title": "Family Areas",
    "features.family.desc": "Playgrounds and conviviality zones.",
    // Models
    "models.label": "Our Plans",
    "models.title": "Exceptional Villas",
    "models.desc":
      "Discover our four architectural configurations optimized for luxury and comfort.",
    "models.01.title": "5 Bedroom Configuration",
    "models.01.desc":
      "This first configuration offers 5 spacious bedrooms, including a ground-floor suite, ideal for hosting. Upstairs, 4 bright bedrooms complete the sleeping area.",
    "models.02.title": "4 Bedrooms with Master Suite",
    "models.02.desc":
      "This second configuration offers a ground-floor suite, while providing three bedrooms upstairs including a superb master room.",
    "models.plans": "Architectural Plans",
    "models.brochure": "PDF Brochure",
    "models.discuss": "Enquire Now",
    "models.viewPlan": "Architectural Plan",
    "models.viewDetail": "Detail View",
    "models.loading": "Architecture in progress...",
    "contact.thankTitle": "Thank you for your interest",
    "contact.thankDesc":
      "Your message has been successfully transmitted. Our team will contact you shortly.",
    "contact.another": "Send another request",
    // Gallery
    "gallery.label": "Portfolio",
    "gallery.title": "Visual Immersion",
    "gallery.desc":
      "Discover the elegance and refinement of Benak Hills through our exclusive gallery.",
    // Contact
    "contact.label": "Contact",
    "contact.title": "Let's talk about your project",
    "contact.desc":
      "Our team is at your disposal to accompany you in your real estate acquisition.",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.address": "Address",
    "contact.addressValue": "Place la Liberté, Marrakech",
    "contact.name": "Full Name",
    "contact.namePlaceholder": "Your name...",
    "contact.emailLabel": "Email Address",
    "contact.phoneLabel": "Phone number",
    "contact.phonePlaceholder": "+212 6...",
    "contact.budget": "Estimated Budget",
    "contact.budgetSelect": "Choose a budget",
    "contact.config": "Desired configuration",
    "contact.configSelect": "Choose a model",
    "contact.message": "Your message",
    "contact.messagePlaceholder": "Describe your project...",
    "contact.submit": "SEND REQUEST",
    "contact.sending": "SENDING...",
    "contact.successTitle": "Message sent",
    "contact.successDesc": "We will get back to you as soon as possible.",
    "contact.errorTitle": "Error",
    "contact.errorDesc": "An error occurred while sending. Please try again.",
    // Featured / Offers
    "offers.label": "Real Estate Opportunities",
    "offers.title": "Exclusive Offers",
    "offers.surface": "Surface",
    "offers.rooms": "Bedrooms",
    "offers.more": "Enquire Now",
    "offers.desc":
      "Discover our latest villas and land available in the heart of the Benak Hills domain.",
    // Footer
    "footer.desc":
      "Architectural elegance at the service of your serenity. Prestige real estate in Marrakech redefined. Book your future villa now.",
    "footer.contactTitle": "Contact our agency",
    "footer.copyright": "© 2026 BENAK HILLS. ALL RIGHTS RESERVED.",
    "footer.legal": "LEGAL NOTICE",
    "footer.privacy": "PRIVACY POLICY",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");

  const t = (key: string): string => {
    return translations[lang][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
