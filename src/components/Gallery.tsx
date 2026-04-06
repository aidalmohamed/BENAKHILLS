import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Maximize2, X } from "lucide-react";

type GalleryImage = {
  src: string;
  title?: string;
  desc?: string;
};

const Gallery = () => {
  const { t } = useLanguage();

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
  // import all .webp files from assets
  const modules = import.meta.glob("../assets/*.webp", { eager: true });

  const imgs = Object.entries(modules)
    .map(([path, module]: any) => {
      const match = path.match(/(\d+)\.webp$/);
      if (!match) return null;

      const number = parseInt(match[1], 10);

      // ✅ keep only 1 → 30
      if (number >= 1 && number <= 30) {
        return {
          src: module.default,
          order: number,
          title: "Benak Hills View",
          desc: "Perspective Luxueuse",
        };
      }

      return null;
    })
    .filter(Boolean)
    .sort((a: any, b: any) => a.order - b.order);

  setImages(imgs);
}, []);

  return (
    <section
      id="galerie"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-px bg-gold mx-auto"
          />

          <h2 className="text-4xl md:text-6xl font-heading text-white">
            {t("gallery.title")}
          </h2>

          <p className="text-foreground/50 font-body max-w-2xl mx-auto">
            {t("gallery.desc")}
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (i % 8) * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer border border-white/5"
              onClick={() => setSelectedImage(img.src)}
            >
              <img
                src={img.src}
                alt={img.title || "Gallery Item"}
                loading="lazy" // ✅ performance
                onError={(e) => (e.currentTarget.style.display = "none")} // ✅ prevent broken UI
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <Maximize2 className="w-8 h-8 text-gold drop-shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 p-3 text-white/50 hover:text-gold transition-colors z-[110]"
            >
              <X className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            {/* IMAGE */}
            <motion.img
              key={selectedImage}
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