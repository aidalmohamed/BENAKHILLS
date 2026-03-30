import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { db } from "../lib/db";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await db.insertLead(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi du message.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <Phone className="w-5 h-5" />, label: t("contact.phone"), value: "+212 6 XX XX XX XX" },
    { icon: <Mail className="w-5 h-5" />, label: t("contact.email"), value: "contact@benak-hills.com" },
    { icon: <MapPin className="w-5 h-5" />, label: t("contact.address"), value: "Route d'Amizmiz, Marrakech" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-dark-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="space-y-12"
        >
          <div className="space-y-6">
            <span className="text-gold text-xs tracking-[0.4em] font-body uppercase border-b border-gold pb-1 leading-none inline-block">
              {t("contact.label")}
            </span>
            <h2 className="text-4xl md:text-6xl font-heading text-white">
              {t("contact.title")}
            </h2>
            <p className="text-foreground/60 font-body max-w-sm leading-relaxed border-l-2 border-white/10 pl-6">
              {t("contact.desc")}
            </p>
          </div>

          <div className="space-y-8">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-background transition-all duration-500 rounded-full shadow-lg group-hover:scale-110">
                  {info.icon}
                </div>
                <div>
                   <p className="text-[10px] text-foreground/40 font-body uppercase tracking-[0.2em] mb-1 group-hover:text-gold transition-colors">{info.label}</p>
                   <p className="text-white/90 text-lg font-heading tracking-wide">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Icons Placeholder */}
          <div className="flex gap-4 pt-10 border-t border-white/5 opacity-50">
             <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/40 hover:text-gold hover:border-gold cursor-pointer transition-all">FB</div>
             <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/40 hover:text-gold hover:border-gold cursor-pointer transition-all">IG</div>
             <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/40 hover:text-gold hover:border-gold cursor-pointer transition-all">WA</div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2 }}
           className="relative"
        >
          {success ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full min-h-[500px] flex flex-col items-center justify-center text-center bg-white/5 border border-gold/40 rounded-sm p-12 shadow-2xl relative z-10"
            >
               <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-8 shadow-xl shadow-gold/20 animate-pulse">
                  <CheckCircle className="w-10 h-10" />
               </div>
               <h3 className="text-3xl font-heading text-white mb-4">Merci de votre intérêt</h3>
               <p className="text-white/60 font-body">Votre message a été transmis avec succès. Notre équipe vous recontactera dans les plus brefs délais.</p>
               <button onClick={() => setSuccess(false)} className="mt-10 text-[10px] text-gold font-body tracking-widest uppercase hover:text-white transition-colors underline underline-offset-8">Envoyer une autre demande</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md p-10 md:p-14 border border-white/10 rounded-sm shadow-2xl relative z-10 space-y-8">
               <div className="space-y-6">
                 <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2 group">
                       <label className="text-[10px] text-foreground/40 font-body tracking-[0.2em] uppercase ml-1 group-focus-within:text-gold transition-colors">{t("contact.name")}</label>
                       <input 
                         required 
                         type="text" 
                         value={formData.name}
                         onChange={e => setFormData({...formData, name: e.target.value})}
                         className="w-full bg-black/40 border border-white/10 text-white p-4 focus:border-gold/60 focus:ring-0 outline-none rounded-sm transition-all font-body text-sm placeholder:text-white/10" 
                         placeholder="Jean Dupont"
                       />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                           <label className="text-[10px] text-foreground/40 font-body tracking-[0.2em] uppercase ml-1 group-focus-within:text-gold transition-colors">{t("contact.emailLabel")}</label>
                           <input 
                              required 
                              type="email" 
                              value={formData.email}
                              onChange={e => setFormData({...formData, email: e.target.value})}
                              className="w-full bg-black/40 border border-white/10 text-white p-4 focus:border-gold/60 focus:ring-0 outline-none rounded-sm transition-all font-body text-sm placeholder:text-white/10" 
                              placeholder="votre@email.com"
                           />
                        </div>
                        <div className="space-y-2 group">
                           <label className="text-[10px] text-foreground/40 font-body tracking-[0.2em] uppercase ml-1 group-focus-within:text-gold transition-colors">{t("contact.phoneLabel")}</label>
                           <input 
                              required 
                              type="tel" 
                              value={formData.phone}
                              onChange={e => setFormData({...formData, phone: e.target.value})}
                              className="w-full bg-black/40 border border-white/10 text-white p-4 focus:border-gold/60 focus:ring-0 outline-none rounded-sm transition-all font-body text-sm placeholder:text-white/10" 
                              placeholder="+212 ..."
                           />
                        </div>
                    </div>
                 </div>
                 <div className="space-y-2 group">
                    <label className="text-[10px] text-foreground/40 font-body tracking-[0.2em] uppercase ml-1 group-focus-within:text-gold transition-colors">{t("contact.message")}</label>
                    <textarea 
                       rows={4} 
                       value={formData.message}
                       onChange={e => setFormData({...formData, message: e.target.value})}
                       className="w-full bg-black/40 border border-white/10 text-white p-4 focus:border-gold/60 focus:ring-0 outline-none rounded-sm transition-all font-body text-sm placeholder:text-white/10 resize-none" 
                       placeholder="Votre projet..."
                    />
                 </div>
               </div>

               <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full py-5 bg-gold hover:bg-gold-light text-background font-body text-[10px] tracking-[0.4em] uppercase transition-all duration-500 shadow-xl shadow-gold/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 group overflow-hidden relative"
               >
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? t("contact.sending") : t("contact.submit")}
                    {!loading && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
               </button>
            </form>
          )}

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 blur-[80px] -z-10" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/5 blur-[80px] -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
