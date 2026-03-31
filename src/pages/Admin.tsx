import { useState, useEffect } from "react";
import { db } from "../lib/db";
import { 
  LayoutDashboard, 
  Tag, 
  Image as ImageIcon, 
  Home, 
  LogOut, 
  Plus, 
  Trash2, 
  Save, 
  Edit, 
  ChevronRight, 
  Upload,
  CheckCircle,
  AlertCircle,
  MessageCircle
} from "lucide-react";

// --- HELPERS ---
const compressImage = (file: File, maxWidth = 1200, quality = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
    };
  });
};

const fileToBase64 = async (file: File): Promise<string> => {
  if (file.type.startsWith("image/")) {
    return compressImage(file);
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [activeTab, setActiveTab] = useState("leads");
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });
  
  const [leads, setLeads] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [carousel, setCarousel] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "admin@benak-hills.com";
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || "Azerty2026";
    
    if (loginForm.email === adminEmail && loginForm.password === adminPass) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
    } else {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "leads") setLeads(await db.getLeads());
      if (activeTab === "offers") setOffers(await db.getOffers());
      if (activeTab === "gallery") setGallery(await db.getGallery());
      if (activeTab === "carousel") setCarousel(await db.getCarousel());
      if (activeTab === "models") {
         const res = await fetch("/api/models");
         if (res.ok) setModels(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-10 rounded-sm shadow-2xl">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-heading text-white tracking-widest uppercase mb-2">BENAK HILLS</h1>
            <p className="text-gold/60 text-[10px] tracking-[0.3em] font-body uppercase">Administration</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-body ml-1">Email</label>
              <input 
                type="email" 
                required
                className="w-full bg-black border border-zinc-700 text-white p-4 text-sm outline-none focus:border-gold transition-all"
                value={loginForm.email}
                onChange={e => setLoginForm({...loginForm, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-body ml-1">Mot de passe</label>
              <input 
                type="password" 
                required
                className="w-full bg-black border border-zinc-700 text-white p-4 text-sm outline-none focus:border-gold transition-all"
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
              />
            </div>
            <button type="submit" className="w-full py-4 bg-gold text-black font-body text-[10px] tracking-[0.4em] uppercase hover:bg-gold-light transition-all shadow-xl shadow-gold/10">
              Connexion
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 flex">
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-xl flex flex-col pt-10 sticky top-0 h-screen">
        <div className="px-8 mb-16">
          <h2 className="text-xl font-heading text-white tracking-widest">ADMIN</h2>
          <div className="h-px w-8 bg-gold mt-2" />
        </div>
        <nav className="flex-1 space-y-1">
          {[
            { id: "leads", label: "Prospects", icon: <LayoutDashboard size={18} /> },
            { id: "offers", label: "Offres", icon: <Tag size={18} /> },
            { id: "models", label: "Models", icon: <Home size={18} /> },
            { id: "gallery", label: "Galerie", icon: <ImageIcon size={18} /> },
            { id: "carousel", label: "Carousel Hero", icon: <ImageIcon size={18} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-8 py-4 text-xs font-body tracking-widest uppercase transition-all border-r-2 ${
                activeTab === tab.id ? "bg-zinc-800 text-gold border-gold" : "text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-white/5"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-8">
           <button onClick={handleLogout} className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-red-500 hover:text-red-400 font-body">
             <LogOut size={16} /> Déconnexion
           </button>
        </div>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-10">
          <div>
            <span className="text-gold/60 text-[10px] tracking-[0.3em] font-body uppercase mb-2 block">Benak Hills Marrakech</span>
            <h1 className="text-4xl font-heading text-white uppercase italic">{activeTab}</h1>
          </div>
          {status.type && (
            <div className={`p-4 rounded-sm flex items-center gap-4 shadow-2xl animate-fade-in ${
              status.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-500' : 'bg-red-500/10 border border-red-500/30 text-red-500'
            }`}>
              {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span className="text-xs font-body tracking-wider">{status.message}</span>
            </div>
          )}
        </header>

        {activeTab === "leads" && <LeadsManagement leads={leads} refresh={fetchData} loading={loading} />}
        {activeTab === "offers" && <OffersManagement initialOffers={offers} refresh={fetchData} />}
        {activeTab === "models" && <ModelsManagement initialModels={models} refresh={fetchData} />}
        {activeTab === "gallery" && <GalleryManagement initialGallery={gallery} refresh={fetchData} />}
        {activeTab === "carousel" && <CarouselManagement initialCarousel={carousel} refresh={fetchData} />}
      </main>
    </div>
  );
};

// --- SUB COMPONENTS ---

const LeadsManagement = ({ leads, refresh, loading }: any) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-body tracking-widest uppercase text-zinc-500">{leads.length} Leads trouvés</h3>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/40 text-[10px] tracking-[0.4em] uppercase text-zinc-500 border-b border-zinc-800">
              <th className="px-8 py-5">Date</th>
              <th className="px-8 py-5">Nom</th>
              <th className="px-8 py-5">Contact</th>
              <th className="px-8 py-5">Message</th>
            </tr>
          </thead>
          <tbody className="text-sm font-body">
            {leads.map((lead: any) => (
              <tr key={lead.id} className="border-b border-zinc-800/50 hover:bg-white/5 transition-colors">
                <td className="px-8 py-6 text-zinc-500 text-xs">{new Date(lead.created_at).toLocaleDateString()}</td>
                <td className="px-8 py-6 text-white font-heading tracking-wide uppercase">{lead.name}</td>
                <td className="px-8 py-6">
                   <div className="text-zinc-300">{lead.email}</div>
                   <div className="text-gold/70 text-xs font-mono">{lead.phone}</div>
                </td>
                <td className="px-8 py-6 text-zinc-400 text-xs italic">
                  <div className="mb-2">{lead.message || "---"}</div>
                  <div className="flex gap-2">
                    <a 
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      className="flex items-center gap-1 text-[8px] bg-green-500/20 text-green-500 px-3 py-1 rounded-full hover:bg-green-500 hover:text-white transition-all uppercase tracking-widest"
                    >
                      <MessageCircle size={10} /> WhatsApp
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="p-20 text-center text-gold animate-pulse tracking-[0.5em] text-xs">CHARGEMENT...</div>}
        {!loading && leads.length === 0 && <div className="p-20 text-center text-zinc-600 tracking-widest text-xs">AUCUNE DEMANDE</div>}
      </div>
    </div>
  );
}

const OffersManagement = ({ initialOffers, refresh }: any) => {
  const [editing, setEditing] = useState<any>(null);

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
      alert("Sauvegarde impossible pour les offres");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const base64s = await Promise.all(Array.from(files).map(fileToBase64));
    setEditing({...editing, images: [...(editing.images || []), ...base64s]});
  };

  const deleteOffer = async (id: string) => {
    if (!confirm("Supprimer?")) return;
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
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Titre (FR)</label>
              <input required className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Titre (EN)</label>
              <input className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.title_en} onChange={e => setEditing({...editing, title_en: e.target.value})} />
            </div>
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

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Description (FR)</label>
              <textarea className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold min-h-[100px]" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Description (EN)</label>
              <textarea className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold min-h-[100px]" value={editing.description_en} onChange={e => setEditing({...editing, description_en: e.target.value})} />
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                 <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">ID (ex: 01)</label>
                 <input required className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.display_id} onChange={e => setEditing({...editing, display_id: e.target.value})} />
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Titre (FR)</label>
                 <input required className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Titre (EN)</label>
                 <input className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.title_en} onChange={e => setEditing({...editing, title_en: e.target.value})} />
              </div>
           </div>
           
           <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Description (FR)</label>
                 <textarea className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold min-h-[100px]" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} />
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Description (EN)</label>
                 <textarea className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold min-h-[100px]" value={editing.description_en} onChange={e => setEditing({...editing, description_en: e.target.value})} />
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
                    <p className="text-zinc-600 text-[10px] tracking-widest uppercase">{m.description?.substring(0, 100)}...</p>
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
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {initialGallery.map((item: any) => (
               <div key={item.id} className="aspect-square bg-zinc-900 border border-zinc-800 relative group overflow-hidden">
                  <img src={item.src} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => deleteItem(item.id)} className="text-red-500 p-2 hover:scale-125 transition-transform">
                        <Trash2 size={20} />
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

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
    try {
      const resp = await fetch("/api/carousel", {
        method: editing.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      });
      if (!resp.ok) throw new Error("Save error");
      setEditing(null);
      refresh();
    } catch (err) {
      alert("Sauvegarde impossible");
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Supprimer?")) return;
    await fetch(`/api/carousel?id=${id}`, { method: 'DELETE' });
    refresh();
  };

  return (
    <div className="space-y-12">
       <button onClick={() => setEditing({ title: "", subtitle: "", src: "" })} className="px-8 py-4 bg-gold text-black text-[10px] tracking-widest uppercase font-body hover:bg-gold-light transition-all flex items-center gap-3">
          <Plus size={18} /> Ajouter une image hero
       </button>

       {editing && (
         <form onSubmit={handleSave} className="bg-zinc-900 p-10 border border-gold/30 shadow-2xl space-y-8 animate-slide-up">
           <div className="grid md:grid-cols-2 gap-8">
             <div className="space-y-4">
               <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Titre</label>
               <input required className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} />
             </div>
             <div className="space-y-4">
               <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Sous-titre</label>
               <input className="w-full bg-black border border-zinc-700 p-4 text-white text-sm outline-none focus:border-gold" value={editing.subtitle} onChange={e => setEditing({...editing, subtitle: e.target.value})} />
             </div>
           </div>
           <div className="space-y-4">
             <label className="text-[10px] text-zinc-500 uppercase tracking-widest block">Image Hero</label>
             <div className="aspect-[21/9] bg-black border border-zinc-800 relative group overflow-hidden max-w-2xl">
               {editing.src ? <img src={editing.src} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-800 italic">No image selected</div>}
               <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                 <Upload size={30} className="text-gold" />
                 <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
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

       <div className="grid md:grid-cols-2 gap-8">
          {initialCarousel.map((item: any) => (
             <div key={item.id} className="aspect-[21/9] bg-zinc-900 border border-zinc-800 relative group overflow-hidden">
                <img src={item.src} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-between px-10 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="text-white">
                      <p className="text-gold text-[10px] uppercase tracking-widest">{item.subtitle}</p>
                      <h4 className="font-heading text-xl uppercase italic">{item.title}</h4>
                   </div>
                   <div className="flex gap-4">
                      <button onClick={() => setEditing(item)} className="text-gold p-3 bg-black/40 rounded-full hover:bg-gold hover:text-black transition-all">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => deleteItem(item.id)} className="text-red-500 p-3 bg-black/40 rounded-full hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={18} />
                      </button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

export default AdminPanel;
