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
    "nav.modeles": "MODÈLES",
    "nav.galerie": "GALERIE",
    "nav.contact": "CONTACTEZ-NOUS",
    // Hero
    "hero.subtitle": "Votre villa en toute sérénité",
    "hero.title": "BENAK HILLS",
    "hero.desc": "Découvrez des villas élégantes et modulables pensées pour votre confort et votre style de vie au cœur de Marrakech. Votre villa. Votre choix. Votre tranquillité.",
    "hero.cta": "DÉCOUVRIR LE PROJET",
    // Concept
    "concept.label": "Le Concept",
    "concept.title": "La Villa Signature",
    "concept.p1": "Superbe maison de <gold>240 m²</gold>, avec piscine privée, édifiée sur une parcelle de <gold>300 m² et plus</gold>, offrant un cadre de vie unique et prestigieux.",
    "concept.p2": "Avec des terrains titrés et entièrement viabilisés, votre acquisition est totalement sécurisée. Modulable selon vos envies avec 4 plans architecturaux distincts.",
    "concept.p3": "Investir dans l'immobilier de luxe à Marrakech n'a jamais été aussi serein. Benak Hills redéfinit le haut de gamme marocain en alliant architecture contemporaine et finitions nobles.",
    "concept.priceLabel": "Offre de lancement",
    "concept.priceFrom": "À partir de",
    // Domain
    "domain.label": "L'Emplacement",
    "domain.title": "Au Cœur de l'Atmosphère",
    "domain.subtitle": "Une situation privilégiée",
    "domain.desc": "Idéalement situé, Benak Hills offre un accès rapide aux points d'intérêt majeurs de Marrakech tout en préservant une intimité totale.",
    "domain.loc1": "À 15 minutes du centre-ville et de la place Jemaa el-Fna.",
    "domain.loc2": "Proximité immédiate des plus beaux golfs de la ville.",
    "domain.mapBtn": "VOIR SUR GOOGLE MAPS",
    // Features
    "features.label": "Équipements",
    "features.desc": "Une qualité de vie exceptionnelle avec des services et équipements pensés pour votre bien-être au quotidien.",
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
    "models.desc": "Découvrez nos quatre configurations architecturales optimisées pour le luxe et le confort.",
    "models.01.title": "Configuration 5 Chambres",
    "models.01.desc": "Cette première configuration offre 5 chambres spacieuses, dont une suite au rez-de-chaussée, idéale pour recevoir ou pour profiter d'un espace de vie de plain-pied. À l'étage, 4 belles chambres lumineuses complètent la partie nuit, offrant confort et intimité. Un agencement harmonieux pensé pour allier praticité, convivialité et bien-être au quotidien.",
    "models.02.title": "4 Chambres avec Master-room",
    "models.02.desc": "Cette seconde configuration permet toujours de bénéficier d'une suite au rez-de-chaussée, tout en offrant à l'étage trois chambres dont une superbe master room. Les volumes généreux, la luminosité et le niveau de confort créent un espace nuit à la fois élégant, moderne et particulièrement accueillant.",
    "models.03.title": "3 Chambres avec Master-room",
    "models.03.desc": "Cette troisième configuration permet de profiter d'une pièce de vie particulièrement spacieuse, tout en conservant à l'étage 3 chambres, dont une superbe master room. Les volumes généreux, la luminosité et le confort offrent un espace nuit à la fois élégant, moderne et accueillant.",
    "models.04.title": "4 Chambres Étage",
    "models.04.desc": "Cette quatrième configuration permet de profiter d'une pièce de vie particulièrement spacieuse, tout comme l'option 3. À la différence près qu'à l'étage, entièrement dédié à l'espace nuit, vous trouverez 4 chambres, parfaitement pensées pour répondre à vos besoins.",
    // Gallery
    "gallery.label": "Portfolio",
    "gallery.title": "Immersion Visuelle",
    "gallery.desc": "Découvrez l'élégance et le raffinement de Benak Hills à travers notre galerie exclusive.",
    "gallery.item1.title": "Design Intérieur", "gallery.item1.desc": "Espaces de vie raffinés",
    "gallery.item2.title": "Piscine Privée", "gallery.item2.desc": "Sérénité absolue",
    "gallery.item3.title": "Architecture", "gallery.item3.desc": "Lignes contemporaines",
    "gallery.item4.title": "Finitions", "gallery.item4.desc": "Matériaux nobles",
    "gallery.item5.title": "Vue Domaine", "gallery.item5.desc": "Végétation luxuriante",
    "gallery.item6.title": "Extérieurs", "gallery.item6.desc": "Jardins paysagers",
    "gallery.item7.title": "Entrée Villa", "gallery.item7.desc": "Accueil prestigieux",
    "gallery.item8.title": "Vue d'ensemble", "gallery.item8.desc": "Harmonie architecturale",
    "gallery.item9.title": "Salons", "gallery.item9.desc": "Confort et lumière",
    "gallery.item10.title": "Détente", "gallery.item10.desc": "Espaces zen",
    "gallery.item11.title": "Terrasses", "gallery.item11.desc": "Vie extérieure",
    "gallery.item12.title": "Nuit", "gallery.item12.desc": "Éclairage d'ambiance",
    // Contact
    "contact.label": "Contact",
    "contact.title": "Parlons de votre projet",
    "contact.desc": "Notre équipe est à votre disposition pour vous accompagner dans votre acquisition immobilière.",
    "contact.phone": "Téléphone",
    "contact.email": "Email",
    "contact.address": "Adresse",
    "contact.addressValue": "Route d'Amizmiz, Marrakech",
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
    "contact.successDesc": "Nous vous recontacterons dans les plus brefs délais.",
    "contact.errorTitle": "Erreur",
    "contact.errorDesc": "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
    "contact.thankTitle": "Merci !",
    "contact.thankDesc": "Votre demande a bien été reçue par notre équipe.",
    "contact.another": "Envoyer un autre message",
    // Configs
    "config.5ch": "5 Chambres",
    "config.4chMaster": "4 Chambres Master",
    "config.3chMaster": "3 Chambres Master",
    "config.4chEtage": "4 Chambres Étage",
    // Featured / Offers
    "offers.label": "Opportunités Uniques",
    "offers.title": "Nos Offres Disponibles",
    "offers.cta": "DEMEURE UNIQUE",
    "common.surface": "Surface",
    "common.rooms": "Chambres",
    "common.m2": "m²",
    "common.ch": "Ch.",
    // Footer
    "footer.desc": "L'élégance architecturale au service de votre sérénité. L'immobilier de prestige à Marrakech redéfini. Réservez dès maintenant votre future villa.",
    "footer.contactTitle": "Contactez notre agence",
    "footer.copyright": "© 2026 BENAK HILLS. TOUS DROITS RÉSERVÉS.",
    "footer.legal": "MENTIONS LÉGALES",
    "footer.privacy": "CONFIDENTIALITÉ",
    // Legal Page
    "legal.title": "Mentions Légales",
    "legal.back": "Retour à l'accueil",
    "legal.s1.title": "1. Éditeur du site",
    "legal.s1.desc": "Benak Hills\nSociété de promotion immobilière\nSiège social : Marrakech, Maroc",
    "legal.s2.title": "2. Hébergement",
    "legal.s2.desc": "Le site est hébergé par des services cloud sécurisés.",
    "legal.s3.title": "3. Propriété intellectuelle",
    "legal.s3.desc": "Contenu protégé par le droit d'auteur.",
    "legal.s4.title": "4. Responsabilité",
    "legal.s4.desc": "Informations données à titre indicatif.",
    "legal.s5.title": "5. Confidentialité & Cookies",
    "legal.s5.desc": "Utilisation de cookies techniques uniquement.",
  },
  en: {
    // Nav
    "nav.accueil": "HOME",
    "nav.concept": "CONCEPT",
    "nav.domaine": "THE ESTATE",
    "nav.modeles": "MODELS",
    "nav.galerie": "GALLERY",
    "nav.contact": "CONTACT US",
    // Hero
    "hero.subtitle": "Your villa in total serenity",
    "hero.title": "BENAK HILLS",
    "hero.desc": "Discover elegant and modular villas designed for your comfort and lifestyle in the heart of Marrakech. Your villa. Your choice. Your peace of mind.",
    "hero.cta": "DISCOVER THE PROJECT",
    // Concept
    "concept.label": "The Concept",
    "concept.title": "The Signature Villa",
    "concept.p1": "A superb <gold>240 sqm</gold> home with a private pool, built on a plot of <gold>300 sqm and more</gold>, offering a unique and prestigious living environment.",
    "concept.p2": "With titled and fully serviced land, your investment is completely secure. Customizable with 4 distinct architectural plans.",
    "concept.p3": "Investing in luxury real estate in Marrakech has never been so seamless. Benak Hills redefines Moroccan high-end living by combining contemporary architecture and noble finishes.",
    "concept.priceLabel": "Launch offer",
    "concept.priceFrom": "Starting from",
    // Domain
    "domain.label": "Location",
    "domain.title": "Heart of the Vibe",
    "domain.subtitle": "A privileged location",
    "domain.desc": "Ideally located, Benak Hills offers quick access to Marrakech's major points of interest while preserving total privacy.",
    "domain.loc1": "15 minutes from the city center and Jemaa el-Fna square.",
    "domain.loc2": "Immediate proximity to the city's most beautiful golf courses.",
    "domain.mapBtn": "SEE ON GOOGLE MAPS",
    // Features
    "features.label": "Facilities",
    "features.desc": "An exceptional quality of life with services and facilities designed for your daily well-being.",
    "features.gardens.title": "Green Spaces",
    "features.gardens.desc": "Landscaped gardens and zen areas.",
    "features.padel.title": "Padel Court",
    "features.padel.desc": "For your sports and relaxation moments.",
    "features.mobility.title": "Soft Mobility",
    "features.mobility.desc": "Cycling paths and walking trails.",
    "features.family.title": "Family Areas",
    "features.family.desc": "Playgrounds and socializing zones.",
    // Models
    "models.label": "Our Plans",
    "models.title": "Exceptional Villas",
    "models.desc": "Discover our four architectural configurations optimized for luxury and comfort.",
    "models.01.title": "5 Bedroom Configuration",
    "models.01.desc": "This first configuration offers 5 spacious bedrooms, including a ground-floor suite, ideal for hosting or enjoying single-level living. Upstairs, 4 bright bedrooms complete the sleeping area, offering comfort and privacy. A harmonious layout designed to combine practicality, conviviality and daily well-being.",
    "models.02.title": "4 Bedrooms with Master Suite",
    "models.02.desc": "This second configuration still offers a ground-floor suite, while providing three bedrooms upstairs including a superb master room. Generous volumes, natural light and comfort create a sleeping space that is both elegant, modern and particularly welcoming.",
    "models.03.title": "3 Bedrooms with Master Suite",
    "models.03.desc": "This third configuration offers a particularly spacious living area, while maintaining 3 bedrooms upstairs, including a superb master room. Generous volumes, light and comfort create an elegant, modern and welcoming sleeping space.",
    "models.04.title": "4 Upstairs Bedrooms",
    "models.04.desc": "This fourth configuration offers a particularly spacious living area, just like option 3. The difference is that the entire upper floor, dedicated to the sleeping area, features 4 bedrooms perfectly designed to meet your needs.",
    // Gallery
    "gallery.label": "Portfolio",
    "gallery.title": "Visual Immersion",
    "gallery.desc": "Discover the elegance and refinement of Benak Hills through our exclusive gallery.",
    "gallery.item1.title": "Interior Design", "gallery.item1.desc": "Refined living spaces",
    "gallery.item2.title": "Private Pool", "gallery.item2.desc": "Absolute serenity",
    "gallery.item3.title": "Architecture", "gallery.item3.desc": "Contemporary lines",
    "gallery.item4.title": "Finishes", "gallery.item4.desc": "Noble materials",
    "gallery.item5.title": "Domain View", "gallery.item5.desc": "Lush vegetation",
    "gallery.item6.title": "Outdoors", "gallery.item6.desc": "Landscaped gardens",
    "gallery.item7.title": "Villa Entrance", "gallery.item7.desc": "Prestigious welcome",
    "gallery.item8.title": "Overview", "gallery.item8.desc": "Architectural harmony",
    "gallery.item9.title": "Lounges", "gallery.item9.desc": "Comfort and light",
    "gallery.item10.title": "Relaxation", "gallery.item10.desc": "Zen spaces",
    "gallery.item11.title": "Terraces", "gallery.item11.desc": "Outdoor living",
    "gallery.item12.title": "Night", "gallery.item12.desc": "Ambient lighting",
    // Contact
    "contact.label": "Contact",
    "contact.title": "Let's talk about your project",
    "contact.desc": "Our team is at your disposal to assist you in your real estate acquisition.",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.address": "Address",
    "contact.addressValue": "Amizmiz Road, Marrakech",
    "contact.name": "Full Name",
    "contact.namePlaceholder": "Your name...",
    "contact.emailLabel": "Email Address",
    "contact.phoneLabel": "Phone Number",
    "contact.phonePlaceholder": "+212 6...",
    "contact.budget": "Estimated Budget",
    "contact.budgetSelect": "Choose a budget",
    "contact.config": "Desired Configuration",
    "contact.configSelect": "Choose a model",
    "contact.message": "Your Message",
    "contact.messagePlaceholder": "Describe your project...",
    "contact.submit": "SEND REQUEST",
    "contact.sending": "SENDING...",
    "contact.successTitle": "Message Sent",
    "contact.successDesc": "We will get back to you as soon as possible.",
    "contact.errorTitle": "Error",
    "contact.errorDesc": "An error occurred during sending. Please try again.",
    "contact.thankTitle": "Thank you!",
    "contact.thankDesc": "Your request has been well received by our team.",
    "contact.another": "Send another message",
    // Configs
    "config.5ch": "5 Bedrooms",
    "config.4chMaster": "4 Master Bedrooms",
    "config.3chMaster": "3 Master Bedrooms",
    "config.4chEtage": "4 Upstairs Bedrooms",
    // Featured / Offers
    "offers.label": "Unique Opportunities",
    "offers.title": "Available Offers",
    "offers.cta": "UNIQUE ESTATE",
    "common.surface": "Surface",
    "common.rooms": "Bedrooms",
    "common.m2": "sqm",
    "common.ch": "BR.",
    // Footer
    "footer.desc": "Architectural elegance at the service of your serenity. Prestige in Marrakech redefined. Reserve your future villa now.",
    "footer.contactTitle": "Contact our agency",
    "footer.copyright": "© 2026 BENAK HILLS. ALL RIGHTS RESERVED.",
    "footer.legal": "LEGAL NOTICE",
    "footer.privacy": "PRIVACY POLICY",
    // Legal Page
    "legal.title": "Legal Notice",
    "legal.back": "Back to Home",
    "legal.s1.title": "1. Site Editor",
    "legal.s1.desc": "Benak Hills\nReal Estate Development\nHeadquarters: Marrakech, Morocco",
    "legal.s2.title": "2. Hosting",
    "legal.s2.desc": "The site is hosted on secure cloud services.",
    "legal.s3.title": "3. Intellectual Property",
    "legal.s3.desc": "Content protected by copyright.",
    "legal.s4.title": "4. Liability",
    "legal.s4.desc": "Information provided for guidance only.",
    "legal.s5.title": "5. Privacy & Cookies",
    "legal.s5.desc": "Technical cookies only.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

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
