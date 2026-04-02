import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  Users, 
  MessageCircle, 
  Trash2, 
  LogOut, 
  Plus, 
  Save, 
  Trash, 
  Edit, 
  Upload, 
  Image as ImageIcon, 
  Layout, 
  Tag, 
  RefreshCw,
  Search,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../lib/db";

// Image compression utility
async function compressImage(base64Str: string): Promise<string> {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1200;
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.7)); // 0.7 quality bypasses Vercel limit
        };
    });
}

async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const result = reader.result as string;
            if (file.size > 800000) { // Compress if > 800KB
                const compressed = await compressImage(result);
                resolve(compressed);
            } else {
                resolve(result);
            }
        };
    });
}

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("leads");
  
  const [leads, setLeads] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [carousel, setCarousel] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    { label: "Leads", count: leads.length, icon: Users, color: "text-gold" },
    { label: "Modèles", count: models.length, icon: Layout, color: "text-blue-400" },
    { label: "Offres", count: offers.length, icon: Tag, color: "text-emerald-400" },
    { label: "Images", count: gallery.length, icon: ImageIcon, color: "text-purple-400" },
  ];

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [l, o, m, g, c] = await Promise.all([
        db.getLeads(),
        db.getOffers(),
        db.getModels(),
        db.getGallery(),
        db.getCarousel()
      ]);
      setLeads(l || []);
      setOffers(o || []);
      setModels(m || []);
      setGallery(g || []);
      setCarousel(c || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === import.meta.env.VITE_ADMIN_EMAIL && password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Identifiants incorrects");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[url('/assets/pattern.png')] bg-repeat">
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-zinc-900 border border-gold/20 p-10 shadow-2xl space-y-8">
            <div className="text-center space-y-2">
               <h1 className="text-white font-heading text-3xl tracking-widest uppercase italic">Benak Hills</h1>
               <p className="text-gold text-[10px] tracking-[0.4em] uppercase opacity-60">Administration</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Email</label>
                  <input type="email" required className="w-full bg-black border border-zinc-800 p-4 text-white text-sm outline-none focus:border-gold transition-colors" value={email} onChange={e => setEmail(e.target.value)} />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Mot de passe</label>
                  <input type="password" required className="w-full bg-black border border-zinc-800 p-4 text-white text-sm outline-none focus:border-gold transition-colors" value={password} onChange={e => setPassword(e.target.value)} />
               </div>
               <button type="submit" className="w-full bg-gold text-black py-4 font-body text-[10px] tracking-[0.4em] uppercase hover:bg-gold-light transition-all flex items-center justify-center gap-3">
                  Connexion <ArrowRight size={14} />
               </button>
            </form>
         </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
       {/* Sidebar */}
       <aside className="w-72 bg-zinc-950 border-r border-white/5 flex flex-col fixed h-full z-20">
          <div className="p-8 border-b border-white/5 bg-black/40 space-y-6">
             <img 
               src="/logo_benak.png" 
               alt="Logo" 
               className="h-12 w-auto object-contain"
               style={{ mixBlendMode: 'screen', filter: 'contrast(1.5) brightness(1.1)' }}
             />
             <div>
                <h2 className="text-xl font-heading tracking-widest italic gold-text-gradient">BENAK HILLS</h2>
                <span className="text-[8px] tracking-[0.5em] text-zinc-500 uppercase block mt-1">Console v2.0</span>
             </div>
          </div>

          <nav className="p-6 flex-1 space-y-2 overflow-y-auto">
             {[
               { id: 'leads', icon: Users, label: 'Prospects (Leads)' },
               { id: 'carousel', icon: RefreshCw, label: 'Carousel Hero' },
               { id: 'offers', icon: Tag, label: 'Offres' },
               { id: 'models', icon: Layout, label: 'Modèles' },
               { id: 'gallery', icon: ImageIcon, label: 'Galerie' },
             ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-sm transition-all group ${activeTab === tab.id ? 'bg-gold text-black' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
                >
                  <tab.icon size={18} className={activeTab === tab.id ? 'text-black' : 'group-hover:text-gold'} />
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold">{tab.label}</span>
                  {activeTab === tab.id && <motion.div layoutId="active" className="ml-auto w-1 h-4 bg-black rounded-full" />}
                </button>
             ))}
          </nav>

          <div className="p-6 mt-auto border-t border-white/5">
             <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-4 p-4 text-zinc-600 hover:text-red-500 transition-colors uppercase text-[10px] tracking-widest font-bold">
                <LogOut size={18} /> Déconnexion
             </button>
          </div>
       </aside>

       {/* Main */}
       <main className="flex-1 ml-72">
          <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-10">
             <div className="flex items-center gap-10">
                {stats.map((s, i) => (
                   <div key={i} className="flex flex-col">
                      <span className="text-[8px] text-zinc-500 uppercase tracking-[0.2em]">{s.label}</span>
                      <div className="flex items-center gap-2">
                         <s.icon size={12} className={s.color} />
                         <span className="text-lg font-heading text-white">{s.count}</span>
                      </div>
                   </div>
                ))}
             </div>
             <button onClick={fetchData} className="p-3 bg-zinc-900 border border-white/5 text-zinc-400 hover:text-gold transition-colors rounded-full">
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
             </button>
          </header>

          <div className="p-10 max-w-7xl">
             <AnimatePresence mode="wait">
                <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.3 }}
                >
                   {activeTab === 'leads' && <LeadsList leads={leads} refresh={fetchData} />}
                   {activeTab === 'offers' && <OffersManagement initialOffers={offers} refresh={fetchData} />}
                   {activeTab === 'models' && <ModelsManagement initialModels={models} refresh={fetchData} />}
                   {activeTab === 'gallery' && <GalleryManagement initialGallery={gallery} refresh={fetchData} />}
                   {activeTab === 'carousel' && <CarouselManagement initialCarousel={carousel} refresh={fetchData} />}
                </motion.div>
             </AnimatePresence>
          </div>
       </main>
    </div>
  );
};

const LeadsList = ({ leads, refresh }: any) => {
  const deleteLead = async (id: string) => {
    if (!confirm("Supprimer ce prospect?")) return;
    await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
    refresh();
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading tracking-widest uppercase">Demandes de Contact</h3>
       </div>
       <div className="grid gap-4">
          {leads.map((lead: any) => (
             <div key={lead.id} className="bg-zinc-900 border border-white/5 p-6 rounded-sm flex items-center justify-between hover:border-gold/30 transition-all">
                <div className="grid md:grid-cols-4 gap-10 flex-1">
                   <div>
                      <span className="text-[8px] text-zinc-500 uppercase tracking-widest block mb-1">Prospect</span>
                      <p className="font-heading text-sm text-white uppercase">{lead.firstname} {lead.name}</p>
                   </div>
                   <div>
                      <span className="text-[8px] text-zinc-500 uppercase tracking-widest block mb-1">Configuration</span>
                      <p className="text-zinc-300 text-xs font-body italic">{lead.configuration || "Non spécifié"}</p>
                   </div>
                   <div>
                      <span className="text-[8px] text-zinc-500 uppercase tracking-widest block mb-1">Contact</span>
                      <p className="text-zinc-400 text-[10px] font-body">{lead.email}</p>
                      <p className="text-gold text-[10px] font-body">{lead.phone}</p>
                   </div>
                   <div>
                      <span className="text-[8px] text-zinc-500 uppercase tracking-widest block mb-1">Message</span>
                      <p className="text-zinc-500 text-[10px] line-clamp-2 italic">"{lead.message}"</p>
                   </div>
                </div>
                <div className="flex gap-4 ml-10">
                   <a
                     href={`https://wa.me/${lead.phone?.replace(/\+/g, '').replace(/ /g, '')}`}
                     target="_blank"
                     className="w-10 h-10 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 flex items-center justify-center rounded-full hover:bg-[#25D366] hover:text-white transition-all"
                   >
                     <MessageCircle size={18} />
                   </a>
                   <button onClick={() => deleteLead(lead.id)} className="w-10 h-10 bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={18} />
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

const OffersManagement = ({ initialOffers, refresh }: any) => {
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    if (editing) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [editing]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/offers", {
        method: editing.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      });
      if (!resp.ok) throw new Error("Save error");
      setEditing(null);
      refresh();
    } catch (err) {
      alert("Erreur lors de la sauvegarde");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImgs = [...(editing.images || [])];
    for (const file of Array.from(files)) {
      const base64 = await fileToBase64(file);
      newImgs.push(base64);
    }
    setEditing({...editing, images: newImgs});
  };

  const deleteOffer = async (id: string) => {
    if (!confirm("Supprimer cette offre?")) return;
    await fetch(`/api/offers?id=${id}`, { method: 'DELETE' });
    refresh();
  };

  return (
    <div className="space-y-10">
      <button 
        onClick={() => setEditing({ title: "", title_en: "", price: "", surface: "", rooms: "", type: "villa", description: "", description_en: "", images: [] })}
        className="px-6 py-3 bg-zinc-800 text-white text-[10px] tracking-widest uppercase hover:bg-gold hover:text-black transition-all flex items-center gap-3"
      >
        <Plus size={16} /> Nouvelle Offre
      </button>

      {editing && (
        <form onSubmit={handleSave} className="bg-zinc-900 p-10 border border-gold/30 shadow-2xl space-y-8 animate-slide-up">
          <div className="grid md:grid-cols-2 gap-8 bg-black/40 p-6 rounded-sm border border-zinc-800">
            <div className="space-y-4">
              <label className="text-[10px] text-gold uppercase tracking-[0.2em] block font-bold">Contenu Français</label>
              <div className="space-y-4">
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Titre</label>
                <input required className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Description</label>
                <textarea className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold min-h-[120px]" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] text-blue-400 uppercase tracking-[0.2em] block font-bold">English Content</label>
              <div className="space-y-4">
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Title</label>
                <input className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-blue-400" value={editing.title_en} onChange={e => setEditing({...editing, title_en: e.target.value})} />
                <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Description</label>
                <textarea className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-blue-400 min-h-[120px]" value={editing.description_en} onChange={e => setEditing({...editing, description_en: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Prix</label>
              <input required className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.price} onChange={e => setEditing({...editing, price: e.target.value})} />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Surface (m²)</label>
              <input className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.surface} onChange={e => setEditing({...editing, surface: e.target.value})} />
            </div>
            <div className="space-y-4">
               <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Chambres</label>
               <input className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.rooms} onChange={e => setEditing({...editing, rooms: e.target.value})} />
            </div>
            <div className="space-y-4">
               <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Type</label>
               <input className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.type} onChange={e => setEditing({...editing, type: e.target.value})} />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Images</label>
            <div className="grid grid-cols-5 gap-4">
               {editing.images?.map((img: string, idx: number) => (
                 <div key={idx} className="aspect-square border border-zinc-800 relative group overflow-hidden">
                    <img src={img} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setEditing({...editing, images: editing.images.filter((_:any, i:any) => i !== idx)})}
                    className="absolute top-1 right-1 bg-red-500 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={12} />
                    </button>
                 </div>
               ))}
               <label className="aspect-square bg-black border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center cursor-pointer hover:border-gold transition-colors">
                  <Upload className="text-zinc-600 mb-2" />
                  <span className="text-[8px] uppercase tracking-widest text-zinc-500">Uploader</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
               </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 py-4 bg-gold text-black font-body text-[10px] tracking-[0.4em] uppercase hover:bg-gold-light transition-all flex items-center justify-center gap-3">
              <Save size={16} /> Sauvegarder
            </button>
            <button type="button" onClick={() => setEditing(null)} className="flex-1 py-4 bg-zinc-800 text-white font-body text-[10px] tracking-[0.4em] uppercase hover:bg-zinc-700 transition-all">
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-3 gap-6">
         {initialOffers.map((offer: any) => (
           <div key={offer.id} className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col gap-6 group hover:border-gold/30 transition-all">
             <div className="aspect-video bg-black overflow-hidden relative">
               {offer.images?.[0] ? <img src={offer.images[0]} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-800 italic">No image</div>}
               <div className="absolute top-4 right-4 bg-black/60 text-gold px-3 py-1 text-[10px] font-heading">{offer.price}</div>
             </div>
             <div>
               <h4 className="text-white font-heading text-lg tracking-wide uppercase mb-1">{offer.title}</h4>
               <p className="text-zinc-500 text-[10px] tracking-widest uppercase">{offer.surface} m² — {offer.rooms} Chambres</p>
             </div>
             <div className="flex justify-between mt-auto pt-6 border-t border-zinc-800">
               <button onClick={() => setEditing(offer)} className="text-gold hover:text-white transition-colors"><Edit size={18} /></button>
               <button onClick={() => deleteOffer(offer.id)} className="text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
             </div>
           </div>
         ))}
      </div>
    </div>
  );
}

const ModelsManagement = ({ initialModels, refresh }: any) => {
  const [editing, setEditing] = useState<any>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await fetch("/api/models", {
        method: editing.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      });
      if (!resp.ok) throw new Error("Save error");
      setEditing(null);
      refresh();
    } catch (err) {
      alert("Sauvegarde impossible pour les modèles");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    const newImgs = [...(editing.images || [])];
    newImgs[idx] = base64;
    setEditing({...editing, images: newImgs});
  };

  const deleteModel = async (id: string) => {
    if (!confirm("Supprimer?")) return;
    await fetch(`/api/models?id=${id}`, { method: 'DELETE' });
    refresh();
  };

  return (
    <div className="space-y-10">
      <button 
        onClick={() => setEditing({ display_id: "", title: "", title_en: "", description: "", description_en: "", images: ["", "", "", ""] })}
        className="px-6 py-3 bg-zinc-800 text-white text-[10px] tracking-widest uppercase hover:bg-gold hover:text-black transition-all flex items-center gap-3"
      >
        <Plus size={16} /> Nouveau Modèle
      </button>

      {editing && (
        <form onSubmit={handleSave} className="bg-zinc-900 p-10 border border-gold/30 shadow-2xl space-y-8 animate-slide-up">
           <div className="space-y-4">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">ID (ex: 01)</label>
              <input required className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.display_id} onChange={e => setEditing({...editing, display_id: e.target.value})} />
           </div>

           <div className="grid md:grid-cols-2 gap-8 bg-black/40 p-6 rounded-sm border border-zinc-800">
               <div className="space-y-4">
                  <label className="text-[10px] text-gold uppercase tracking-[0.2em] block font-bold">Contenu Français</label>
                  <div className="space-y-4">
                     <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Titre</label>
                     <input required className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
                     <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Description</label>
                     <textarea className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold min-h-[120px]" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} />
                  </div>
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] text-blue-400 uppercase tracking-[0.2em] block font-bold">English Content</label>
                  <div className="space-y-4">
                     <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Title</label>
                     <input className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-blue-400" value={editing.title_en} onChange={e => setEditing({...editing, title_en: e.target.value})} />
                     <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Description</label>
                     <textarea className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-blue-400 min-h-[120px]" value={editing.description_en} onChange={e => setEditing({...editing, description_en: e.target.value})} />
                  </div>
               </div>
           </div>

           <div className="space-y-4">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Images & Plans</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                 {[0, 1, 2, 3].map(idx => (
                    <div key={idx} className="space-y-2">
                       <label className="text-[8px] text-zinc-600 uppercase tracking-widest block">{idx === 0 ? "Plan principal" : `Image ${idx}`}</label>
                       <div className="aspect-square bg-black border border-zinc-800 relative group overflow-hidden">
                          {editing.images?.[idx] ? <img src={editing.images[idx]} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-800 text-[8px] uppercase">{idx === 0 ? "Plan" : `Img ${idx}`}</div>}
                          <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                             <Upload size={20} className="text-gold" />
                             <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, idx)} />
                          </label>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="flex gap-4">
             <button type="submit" className="flex-1 py-4 bg-gold text-black font-body text-[10px] tracking-[0.4em] uppercase hover:bg-gold-light transition-all flex items-center justify-center gap-3">
               <Save size={16} /> Sauvegarder
             </button>
             <button type="button" onClick={() => setEditing(null)} className="flex-1 py-4 bg-zinc-800 text-white font-body text-[10px] tracking-[0.4em] uppercase hover:bg-zinc-700 transition-all">
               Annuler
             </button>
           </div>
        </form>
      )}

      <div className="space-y-4">
         {initialModels.map((m: any) => (
           <div key={m.id} className="bg-zinc-900/50 border border-zinc-800 p-8 flex items-center justify-between hover:bg-white/5 transition-all">
              <div className="flex items-center gap-8">
                 <div className="w-12 h-12 bg-zinc-800 border border-gold/30 flex items-center justify-center text-gold font-heading text-xl">{m.display_id}</div>
                 <div>
                    <h4 className="text-white font-heading text-lg tracking-widest uppercase">{m.title}</h4>
                    <p className="text-zinc-500 text-[10px] tracking-widest uppercase line-clamp-1">{m.description?.substring(0, 100)}...</p>
                 </div>
              </div>
              <div className="flex gap-6">
                <button onClick={() => setEditing(m)} className="text-gold hover:text-white transition-colors"><Edit size={20} /></button>
                <button onClick={() => deleteModel(m.id)} className="text-zinc-600 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

const GalleryManagement = ({ initialGallery, refresh }: any) => {
   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      for (const file of Array.from(files)) {
         const base64 = await fileToBase64(file);
         await fetch("/api/gallery", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ src: base64, title: file.name })
         });
      }
      refresh();
   };

   const deleteItem = async (id: string) => {
      await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      refresh();
   };

   return (
      <div className="space-y-12">
         <div className="flex items-center gap-6">
            <label className="px-8 py-4 bg-gold text-black text-[10px] tracking-widest uppercase font-body cursor-pointer hover:bg-gold-light transition-all flex items-center gap-3">
               <Plus size={18} /> Ajouter des images
               <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
            </label>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {initialGallery.map((item: any) => (
               <div key={item.id} className="aspect-square bg-zinc-900 border border-zinc-800 relative group overflow-hidden rounded-sm">
                  <img src={item.src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <button onClick={() => deleteItem(item.id)} className="absolute top-2 right-2 bg-red-500 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-lg">
                     <Trash2 size={14} />
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
}

const CarouselManagement = ({ initialCarousel, refresh }: any) => {
   const [editing, setEditing] = useState<any>(null);

   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (!file) return;
     const base64 = await fileToBase64(file);
     setEditing((prev: any) => ({ ...prev, src: base64 }));
   };
 
   const handleSave = async (e: React.FormEvent) => {
     e.preventDefault();
     await fetch("/api/carousel", {
       method: editing.id ? 'PUT' : 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(editing)
     });
     setEditing(null);
     refresh();
   };
 
   const deleteItem = async (id: string) => {
     await fetch(`/api/carousel?id=${id}`, { method: 'DELETE' });
     refresh();
   };
 
   return (
     <div className="space-y-10">
       <button 
         onClick={() => setEditing({ title: "", subtitle: "", src: "" })}
         className="px-6 py-3 bg-zinc-800 text-white text-[10px] tracking-widest uppercase hover:bg-gold hover:text-black transition-all flex items-center gap-3"
       >
         <Plus size={16} /> Nouveau Slide
       </button>
 
       {editing && (
         <form onSubmit={handleSave} className="bg-zinc-900 p-10 border border-gold/30 shadow-2xl space-y-8 animate-slide-up max-w-2xl">
            <div className="aspect-video bg-black border border-zinc-800 relative group overflow-hidden mb-6">
               {editing.src ? <img src={editing.src} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-zinc-700 italic">Aucun visuel</div>}
               <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload size={24} className="text-gold" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
               </label>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Titre (H1)</label>
              <input required className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Sous-titre</label>
              <input className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.subtitle} onChange={e => setEditing({...editing, subtitle: e.target.value})} />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="flex-1 py-4 bg-gold text-black font-body text-[10px] tracking-[0.4em] uppercase hover:bg-gold-light transition-all">Enregistrer</button>
              <button type="button" onClick={() => setEditing(null)} className="flex-1 py-4 bg-zinc-800 text-white font-body text-[10px] tracking-[0.4em] uppercase hover:bg-zinc-700 transition-all">Annuler</button>
            </div>
         </form>
       )}
 
       <div className="grid md:grid-cols-3 gap-6">
          {initialCarousel.map((item: any) => (
             <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 space-y-4 group">
                <div className="aspect-video overflow-hidden border border-white/5 relative">
                   <img src={item.src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-3">
                         <button onClick={() => setEditing(item)} className="p-2 bg-white text-black rounded-full hover:bg-gold transition-colors"><Edit size={16} /></button>
                         <button onClick={() => deleteItem(item.id)} className="p-2 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                      </div>
                   </div>
                </div>
                <div className="px-2">
                   <p className="text-[10px] text-gold tracking-widest uppercase font-bold">{item.title}</p>
                   <p className="text-[8px] text-zinc-500 tracking-widest uppercase truncate">{item.subtitle}</p>
                </div>
             </div>
          ))}
       </div>
     </div>
   );
}

export default AdminPanel;
