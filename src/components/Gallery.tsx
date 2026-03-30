import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { db } from "../lib/db";
import { Maximize2, X } from "lucide-react";

const Gallery = () => {
  const { t } = useLanguage();
  const [images, setImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const dbImages = await db.getGallery();
        const localImages = Array.from({ length: 32 }, (_, i) => ({
          src: `/assets/${i + 1}.png`,
          title: "Benak Hills View",
          desc: "Perspective Luxueuse"
        }));
        
        // Combine, prioritize DB if user uploaded real custom ones, otherwise use locals
        setImages(dbImages && dbImages.length > 0 ? [...dbImages, ...localImages.slice(0, 10)] : localImages);
      } catch (e) {
        setImages(Array.from({ length: 15 }, (_, i) => ({ src: `/assets/${i + 1}.png` })));
      }
    };
    loadGallery();
  }, []);

  return (
    <section id="galerie" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-px bg-gold mx-auto"
          />
          <h2 className="text-4xl md:text-6xl font-heading text-white">{t("gallery.title")}</h2>
          <p className="text-foreground/50 font-body max-w-2xl mx-auto">{t("gallery.desc")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (i % 8) * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer border border-white/5"
              onClick={() => setSelectedImage(img.src)}
            >
              <img
                src={img.src}
                alt={img.title || "Gallery Item"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                 <Maximize2 className="w-8 h-8 text-gold drop-shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 p-3 text-white/50 hover:text-gold transition-colors z-[110]">
              <X className="w-10 h-10" />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={selectedImage}
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
