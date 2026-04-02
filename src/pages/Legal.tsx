import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, Gavel, Lock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Legal = () => {
  const { lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'mentions' | 'privacy'>('mentions');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'privacy') {
      setActiveTab('privacy');
    } else {
      setActiveTab('mentions');
    }
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const tabs = [
    { id: 'mentions', label: lang === 'fr' ? 'Mentions Légales' : 'Legal Notice', icon: <Gavel className="w-4 h-4" /> },
    { id: 'privacy', label: lang === 'fr' ? 'Confidentialité' : 'Privacy Policy', icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-background min-h-screen pt-32 selection:bg-gold/30 selection:text-black">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="mb-16 space-y-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] font-body text-gold uppercase hover:translate-x-[-10px] transition-all duration-500"
          >
            <ChevronLeft className="w-4 h-4" />
            {lang === 'fr' ? "Retour à l'accueil" : "Back to Home"}
          </Link>
          <h1 className="text-4xl md:text-6xl font-heading text-white italic lowercase">
            {lang === 'fr' ? "Cadre Juridique" : "Legal Framework"}
          </h1>
          <div className="w-20 h-px bg-gold/50" />
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-20 border-b border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-body transition-all relative ${
                activeTab === tab.id ? "text-gold" : "text-white/40 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" 
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + lang}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/[0.02] border border-white/5 rounded-sm p-8 md:p-16"
          >
             {activeTab === 'mentions' ? (
                <LegalNoticeContent lang={lang} />
             ) : (
                <PrivacyPolicyContent lang={lang} />
             )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

const LegalNoticeContent = ({ lang }: { lang: 'fr' | 'en' }) => {
    if (lang === 'fr') {
        return (
            <div className="prose prose-invert prose-gold max-w-none space-y-12 font-body">
                <div className="space-y-4">
                    <h2 className="text-3xl font-heading text-white italic lowercase flex items-center gap-4">
                        Mentions Légales – BENAK HILLS
                    </h2>
                    <p className="text-gold/60 text-xs tracking-widest uppercase">Dernière mise à jour : 30 mars 2026</p>
                    <p className="text-zinc-400 leading-loose">
                        Conformément aux dispositions en vigueur, et notamment à la loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l’Économie Numérique (LCEN), nous vous informons des mentions légales applicables au site www.benakhills.com.
                    </p>
                </div>

                <div className="space-y-8">
                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">1. Éditeur du site</h3>
                        <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                            Dénomination sociale : Benak Hills
                            Forme juridique : Société à Responsabilité Limitée (SARL)
                            Capital social : 10.000,00 DHS
                            Siège social : Place la Liberté, Angle Av. My Hassan et Av. Mohamed V, Rés. Berdai, Imm B, Appt 2, Marrakech – Maroc
                            Activité : Société de promotion immobilière
                            Email : contact@benakhills.com
                            Téléphone : +212 786 360 767
                            Site web : www.benakhills.com
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">2. Directeur de la publication</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Le directeur de la publication est le représentant légal de la société Benak Hills.
                            Contact : contact@benakhills.com
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">3. Hébergement</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Le site www.benakhills.com est hébergé par des services cloud sécurisés conformes aux normes RGPD. Pour toute demande relative à l’hébergement, vous pouvez nous contacter à l’adresse : contact@benakhills.com.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">4. Propriété intellectuelle</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            L’ensemble des contenus présents sur le site www.benakhills.com — textes, images, photographies, graphismes, logos, vidéos, plans, maquettes, et tout autre élément — est la propriété exclusive de Benak Hills ou de ses partenaires, et est protégé par le droit d’auteur et les droits de propriété intellectuelle applicables.<br/><br/>
                            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie de ces éléments, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l’autorisation préalable et écrite de Benak Hills.<br/><br/>
                            Toute utilisation non autorisée pourra faire l’objet de poursuites judiciaires.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">5. Limitation de responsabilité</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Les informations diffusées sur le site www.benakhills.com sont fournies à titre indicatif et non contractuel. Benak Hills s’efforce d’assurer l’exactitude et la mise à jour régulière des contenus publiés, mais ne peut garantir leur exhaustivité ni leur adéquation à des besoins particuliers.<br/><br/>
                            Benak Hills ne saurait être tenue responsable :
                            • De toute interruption ou indisponibilité du site
                            • D’erreurs ou d’omissions dans les contenus publiés
                            • De tout dommage direct ou indirect résultant de l’utilisation du site
                            • Du contenu de sites tiers vers lesquels des liens pourraient renvoyer
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">6. Données personnelles et RGPD</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Benak Hills accorde une grande importance à la protection de vos données personnelles. Le traitement de vos données est réalisé conformément au Règlement Général sur la Protection des Données (RGPD – UE 2016/679) et à la loi Informatique et Libertés modifiée, dans la mesure où le site est susceptible d’être consulté par des résidents européens.<br/><br/>
                            Pour toute information sur le traitement de vos données, veuillez consulter notre Politique de Confidentialité disponible sur le site, ou nous contacter à : contact@benakhills.com.
                            Vous disposez d’un droit de réclamation auprès de la CNIL – www.cnil.fr.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">7. Cookies</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Le site www.benakhills.com utilise des cookies techniques indispensables à son bon fonctionnement, ainsi que des cookies analytiques et publicitaires soumis à votre consentement préalable.<br/><br/>
                            Vous pouvez à tout moment paramétrer ou refuser les cookies via le bandeau de consentement affiché lors de votre première visite, ou dans les paramètres de votre navigateur.<br/><br/>
                            Pour plus d’informations, consultez notre Politique de Confidentialité.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">8. Droit applicable et juridiction compétente</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Les présentes mentions légales sont régies par le droit marocain. Tout litige relatif à l’utilisation du site www.benakhills.com relève de la compétence exclusive des tribunaux compétents du ressort de Marrakech, sauf disposition légale contraire.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">9. Contact</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :<br/>
                            Par email : contact@benakhills.com<br/>
                            Par téléphone : +212 786 360 767<br/>
                            Par courrier : Benak Hills – Place la Liberté, Angle Av. My Hassan et Av. Mohamed V, Rés. Berdai, Imm B, Appt 2, Marrakech – Maroc
                        </p>
                    </section>
                </div>
            </div>
        );
    }
    
    return (
        <div className="prose prose-invert prose-gold max-w-none space-y-12 font-body">
            <div className="space-y-4">
                <h2 className="text-3xl font-heading text-white italic lowercase flex items-center gap-4">
                    Legal Notice – BENAK HILLS
                </h2>
                <p className="text-gold/60 text-xs tracking-widest uppercase">Last updated: March 30, 2026</p>
                <p className="text-zinc-400 leading-loose">
                    In accordance with current regulations, and particularly Law No. 2004-575 of June 21, 2004, for Trust in the Digital Economy (LCEN), we inform you of the legal notices applicable to the website www.benakhills.com.
                </p>
            </div>

            <div className="space-y-8">
                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">1. Site Editor</h3>
                    <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                        Social Denomination: Benak Hills
                        Legal Form: Private Limited Company (SARL)
                        Social Capital: 10,000.00 DHS
                        Headquarters: Place la Liberté, Angle Av. My Hassan and Av. Mohamed V, Rés. Berdai, Imm B, Appt 2, Marrakech – Morocco
                        Activity: Real estate promotion company
                        Email: contact@benakhills.com
                        Phone: +212 786 360 767
                        Website: www.benakhills.com
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">2. Publication Director</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        The publication director is the legal representative of Benak Hills.
                        Contact: contact@benakhills.com
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">3. Hosting</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        The website www.benakhills.com is hosted by secure cloud services complying with GDPR standards. For any hosting-related requests, you can contact us at: contact@benakhills.com.
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">4. Intellectual Property</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        All content on the website www.benakhills.com — texts, images, photographs, graphics, logos, videos, plans, models, and any other element — is the exclusive property of Benak Hills or its partners, and is protected by copyright and applicable intellectual property rights.<br/><br/>
                        Any reproduction, representation, modification, publication or adaptation of all or part of these elements, by whatever means or process, is strictly prohibited without the prior written authorization of Benak Hills.<br/><br/>
                        Any unauthorized use may be subject to legal proceedings.
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">5. Limitation of Liability</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        The information provided on the website www.benakhills.com is for guidance only and is non-contractual. Benak Hills strives to ensure the accuracy and regular updating of published content but cannot guarantee its completeness or suitability for particular needs.<br/><br/>
                        Benak Hills cannot be held liable for:
                        • Any interruption or unavailability of the site
                        • Errors or omissions in published content
                        • Any direct or indirect damage resulting from the use of the site
                        • Content of third-party sites linked from this site
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">6. Personal Data and GDPR</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        Benak Hills attaches great importance to the protection of your personal data. Your data is processed in accordance with the General Data Protection Regulation (GDPR – EU 2016/679) and modified Data Protection laws, to the extent that the site may be consulted by European residents.<br/><br/>
                        For any information on the processing of your data, please consult our Privacy Policy available on the site, or contact us at: contact@benakhills.com.
                        You have the right to lodge a complaint with the CNIL – www.cnil.fr.
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">7. Cookies</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        The website www.benakhills.com uses technical cookies essential for its proper functioning, as well as analytical and advertising cookies subject to your prior consent.<br/><br/>
                        You can at any time set or refuse cookies via the consent banner shown during your first visit, or in your browser settings.<br/><br/>
                        For more information, see our Privacy Policy.
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">8. Governing Law and Jurisdiction</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        These legal notices are governed by Moroccan law. Any dispute relating to the use of the website www.benakhills.com falls under the exclusive jurisdiction of the competent courts of Marrakech, unless otherwise provided by law.
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">9. Contact</h3>
                    <p className="text-zinc-400 leading-relaxed">
                        For any questions relating to these legal notices, you can contact us:<br/>
                        By email: contact@benakhills.com<br/>
                        By phone: +212 786 360 767<br/>
                        By mail: Benak Hills – Place la Liberté, Angle Av. My Hassan and Av. Mohamed V, Rés. Berdai, Imm B, Appt 2, Marrakech – Morocco
                    </p>
                </section>
            </div>
        </div>
    );
};

const PrivacyPolicyContent = ({ lang }: { lang: 'fr' | 'en' }) => {
    if (lang === 'fr') {
        return (
            <div className="prose prose-invert prose-gold max-w-none space-y-12 font-body">
                <div className="space-y-4">
                    <h2 className="text-3xl font-heading text-white italic lowercase flex items-center gap-4">
                        Politique de Confidentialité – BENAK HILLS
                    </h2>
                    <p className="text-gold/60 text-xs tracking-widest uppercase">Dernière mise à jour : 30 mars 2026</p>
                    <p className="text-zinc-400 leading-loose">
                        La société Benak Hills accorde une grande importance à la protection de vos données personnelles.<br/><br/>
                        Elle édite le site www.benakhills.com, dans le cadre de l'exploitation de sa marque commerciale Benak Hills, et s'engage à assurer la confidentialité, la sécurité et la conformité du traitement de vos données, en conformité avec le Règlement Général sur la Protection des Données (RGPD – UE 2016/679) et la loi Informatique et Libertés modifiée.
                    </p>
                </div>

                <div className="space-y-10">
                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">1. Responsable du traitement</h3>
                        <p className="text-zinc-400 leading-relaxed whitespace-pre-line text-sm">
                            Responsable : Benak Hills
                            Forme juridique : Société à Responsabilité Limitée (SARL)
                            Capital social : 10.000,00 DHS
                            Siège social : Place la Liberté, Angle Av. My Hassan et Av. Mohamed V, Rés. Berdai, Imm B, Appt 2, Marrakech
                            Contact : contact@benakhills.com
                            Site web : www.benakhills.com
                            <br/><br/>
                            <span className="text-gold italic">Délégué à la Protection des Données (DPO) :</span> Benak Hills n'a pas désigné de Délégué à la Protection des Données (DPO), conformément aux dispositions du RGPD applicables aux structures de taille PME ne traitant pas de données à grande échelle ou de catégories particulières de données.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">2. Données personnelles collectées</h3>
                        <p className="text-zinc-400 mb-4">Nous pouvons collecter les données suivantes :</p>
                        <ul className="grid sm:grid-cols-2 gap-4 text-sm">
                            <li className="flex items-center gap-3 bg-white/5 p-4 rounded-sm border border-white/5"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Données d'identification : nom, prénom, téléphone, email, adresse</li>
                            <li className="flex items-center gap-3 bg-white/5 p-4 rounded-sm border border-white/5"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Données professionnelles : fonction, société, secteur d'activité</li>
                            <li className="flex items-center gap-3 bg-white/5 p-4 rounded-sm border border-white/5"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Données de navigation : IP, cookies, analytics</li>
                            <li className="flex items-center gap-3 bg-white/5 p-4 rounded-sm border border-white/5"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Données contractuelles : devis, formulaires, communications</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">3. Modalités de collecte</h3>
                        <p className="text-zinc-400 mb-4">La collecte des données se fait via :</p>
                        <ul className="space-y-2 text-sm text-zinc-400 list-disc pl-6 leading-loose italic">
                            <li>Notre site web : https://www.benakhills.com</li>
                            <li>Nos formulaires de contact, d'inscription ou de demande de renseignements</li>
                            <li>Nos échanges par téléphone, email ou en rendez-vous</li>
                            <li>Nos campagnes publicitaires, réseaux sociaux, événements</li>
                            <li>L'usage de cookies et traceurs</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">4. Finalités du traitement</h3>
                        <p className="text-zinc-400 mb-4">Les traitements ont les objectifs suivants :</p>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { t: "Réponse à vos demandes", d: "Formulaires, emails, téléphone" },
                                { t: "Gestion commerciale", d: "Devis, contrat, suivi client" },
                                { t: "Prospection", d: "Emails, offres, infos" },
                                { t: "Analyse du trafic", d: "UX, performance campagnes" },
                                { t: "Conformité réglementaire", d: "Obligations légales & comptables" }
                            ].map((f, i) => (
                                <div key={i} className="space-y-1">
                                    <h4 className="text-white font-heading text-sm">{f.t}</h4>
                                    <p className="text-zinc-500 text-xs">{f.d}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">5. Base légale du traitement</h3>
                        <p className="text-zinc-400 text-sm leading-loose">
                            Les traitements sont fondés sur votre <span className="text-gold">consentement</span>, l'exécution d'un <span className="text-gold">contrat</span>, les obligations <span className="text-gold">légales</span> (facturation) et l'intérêt <span className="text-gold">légitime</span> de Benak Hills.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">6. Destinataires des données</h3>
                        <p className="text-zinc-400 text-sm leading-loose">
                            Les collaborateurs autorisés de Benak Hills, nos prestataires techniques (hébergement, emailing, CRM), et les autorités compétentes. <span className="text-gold italic font-bold">Aucune donnée n'est vendue ou cédée à des tiers.</span>
                        </p>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">7. Durée de conservation</h3>
                        <ul className="space-y-4 text-sm text-zinc-400">
                             <li className="flex gap-4">
                                <span className="text-gold font-heading w-24 flex-shrink-0">Prospects :</span>
                                <span>3 ans après le dernier contact.</span>
                             </li>
                             <li className="flex gap-4">
                                <span className="text-gold font-heading w-24 flex-shrink-0">Clients :</span>
                                <span>10 ans (obligations légales).</span>
                             </li>
                             <li className="flex gap-4">
                                <span className="text-gold font-heading w-24 flex-shrink-0">Cookies :</span>
                                <span>13 mois maximum.</span>
                             </li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">9. Vos droits</h3>
                        <p className="text-zinc-400 text-sm mb-6 leading-loose">Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de portabilité et de dépôt de réclamation (CNIL).</p>
                        <div className="bg-gold/10 border border-gold/20 p-8 rounded-sm">
                            <h4 className="text-gold font-heading text-lg mb-2">Exercer vos droits</h4>
                            <p className="text-white font-body text-sm mb-4">Contactez-nous pour toute demande :</p>
                            <a href="mailto:contact@benakhills.com" className="text-2xl font-heading hover:text-white transition-colors text-gold">contact@benakhills.com</a>
                            <p className="text-zinc-500 text-xs mt-4 italic">Délai de traitement : 30 jours maximum.</p>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
    
    return (
        <div className="prose prose-invert prose-gold max-w-none space-y-12 font-body">
            <div className="space-y-4">
                <h2 className="text-3xl font-heading text-white italic lowercase flex items-center gap-4">
                    Privacy Policy – BENAK HILLS
                </h2>
                <p className="text-gold/60 text-xs tracking-widest uppercase">Last updated: March 30, 2026</p>
                <p className="text-zinc-400 leading-loose">
                    Benak Hills attaches great importance to the protection of your personal data.<br/><br/>
                    The company publishes the website www.benakhills.com as part of its commercial brand Benak Hills and undertakes to ensure the confidentiality, security, and compliance of your data processing in accordance with the GDPR (EU 2016/679).
                </p>
            </div>

            <div className="space-y-10">
                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">1. Data Controller</h3>
                    <p className="text-zinc-400 leading-relaxed whitespace-pre-line text-sm">
                        Controller: Benak Hills
                        Legal Form: Private Limited Company (SARL)
                        Social Capital: 10,000.00 DHS
                        Headquarters: Place la Liberté, Angle Av. My Hassan and Av. Mohamed V, Rés. Berdai, Imm B, Appt 2, Marrakech
                        Contact: contact@benakhills.com
                        Website: www.benakhills.com
                        <br/><br/>
                        <span className="text-gold italic">Data Protection Officer (DPO):</span> Benak Hills has not appointed a DPO, in accordance with GDPR provisions for SMEs not processing data on a large scale.
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">2. Personal Data Collected</h3>
                    <p className="text-zinc-400 mb-4">We may collect the following data:</p>
                    <ul className="grid sm:grid-cols-2 gap-4 text-sm">
                        <li className="flex items-center gap-3 bg-white/5 p-4 rounded-sm border border-white/5"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Identification: name, phone, email, address</li>
                        <li className="flex items-center gap-3 bg-white/5 p-4 rounded-sm border border-white/5"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Professional data: role, company, sector</li>
                        <li className="flex items-center gap-3 bg-white/5 p-4 rounded-sm border border-white/5"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Navigation: IP, cookies, analytics</li>
                        <li className="flex items-center gap-3 bg-white/5 p-4 rounded-sm border border-white/5"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Contractual: quotes, forms, communications</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">3. Collection Methods</h3>
                    <p className="text-zinc-400 mb-4">Data is collected through:</p>
                    <ul className="space-y-2 text-sm text-zinc-400 list-disc pl-6 leading-loose italic">
                        <li>Our website: https://www.benakhills.com</li>
                        <li>Contact, registration, or enquiry forms</li>
                        <li>Exchanges by phone, email, or meetings</li>
                        <li>Ad campaigns, social networks, events</li>
                        <li>Use of cookies and trackers</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">4. Purposes of Processing</h3>
                    <p className="text-zinc-400 mb-4">Processing has the following objectives:</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { t: "Request response", d: "Forms, emails, phone" },
                            { t: "Commercial management", d: "Quotes, contracts, client follow-up" },
                            { t: "Prospecting", d: "Emails, offers, info" },
                            { t: "Traffic analysis", d: "UX, campaign performance" },
                            { t: "Regulatory compliance", d: "Legal & accounting obligations" }
                        ].map((f, i) => (
                            <div key={i} className="space-y-1">
                                <h4 className="text-white font-heading text-sm">{f.t}</h4>
                                <p className="text-zinc-500 text-xs">{f.d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">5. Legal Basis</h3>
                    <p className="text-zinc-400 text-sm leading-loose">
                        Processing is based on your <span className="text-gold">consent</span>, the execution of a <span className="text-gold">contract</span>, <span className="text-gold">legal</span> obligations (billing), and Benak Hills' <span className="text-gold">legitimate interest</span>.
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">6. Data Recipients</h3>
                    <p className="text-zinc-400 text-sm leading-loose">
                        Authorized staff of Benak Hills, technical providers (hosting, emailing, CRM), and competent authorities. <span className="text-gold italic font-bold">No data is sold or transferred to third parties.</span>
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">7. Retention Period</h3>
                    <ul className="space-y-4 text-sm text-zinc-400">
                         <li className="flex gap-4">
                            <span className="text-gold font-heading w-32 flex-shrink-0">Prospects:</span>
                            <span>3 years after last contact.</span>
                         </li>
                         <li className="flex gap-4">
                            <span className="text-gold font-heading w-32 flex-shrink-0">Clients:</span>
                            <span>10 years (legal obligations).</span>
                         </li>
                         <li className="flex gap-4">
                            <span className="text-gold font-heading w-32 flex-shrink-0">Cookies:</span>
                            <span>13 months maximum.</span>
                         </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-white font-heading text-xl uppercase tracking-wider mb-4 border-l-2 border-gold pl-4">9. Your Rights</h3>
                    <p className="text-zinc-400 text-sm mb-6 leading-loose">You have the right of access, rectification, erasure, objection, portability, and to lodge a complaint (CNIL).</p>
                    <div className="bg-gold/10 border border-gold/20 p-8 rounded-sm">
                        <h4 className="text-gold font-heading text-lg mb-2">Exercise your rights</h4>
                        <p className="text-white font-body text-sm mb-4">Contact us for any request:</p>
                        <a href="mailto:contact@benakhills.com" className="text-2xl font-heading hover:text-white transition-colors text-gold">contact@benakhills.com</a>
                        <p className="text-zinc-500 text-xs mt-4 italic">Processing time: 30 days maximum.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Legal;
