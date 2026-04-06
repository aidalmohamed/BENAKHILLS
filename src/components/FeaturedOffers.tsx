import { motion } from "framer-motion";
import { Maximize, BedDouble } from "lucide-react";
import img1 from "../../public/gallery/14.webp"
import img2 from "../../public/gallery/4.webp"
import img3 from "../../public/gallery/6.webp"
import img4 from "../../public/gallery/8.webp"

const offers = [
  {
    id: 1,
    title: "5 Chambres",
    type: "Villa",
    surface: 240,
    rooms: 5,
    description:
      "Configuration idéale pour les grandes familles avec des espaces généreux et une organisation optimale.",
    image: img1,
  },
  {
    id: 2,
    title: "4 Chambres (Master Room)",
    type: "Villa",
    surface: 240,
    rooms: 4,
    description:
      "4 chambres dont une master room au rez-de-chaussée, et 3 chambres à l'étage.",
    image: img2,
  },
  {
    id: 3,
    title: "3 Chambres (Master Room)",
    type: "Villa",
    surface: 240,
    rooms: 3,
    description:
      "3 chambres dont une master room, avec un espace de vie optimisé et moderne.",
    image: img3,
  },
  {
    id: 4,
    title: "4 Chambres Étage",
    type: "Villa",
    surface: 240,
    rooms: 4,
    description:
      "4 chambres à l’étage sans master room, parfait pour une distribution classique.",
    image: img4,
  },
];

const FeaturedOffers = () => {
  return (
    <section
      id="offres"
      className="py-24 md:py-40 bg-zinc-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-gold text-[10px] tracking-[0.4em] uppercase border-b border-gold/30 pb-2 inline-block">
              OPPORTUNITÉS IMMOBILIÈRES
            </span>

            <h2 className="text-4xl md:text-6xl font-heading text-white leading-tight">
              Offres <span className="gold-text-gradient">Exclusives</span>
            </h2>
          </div>

          <p className="text-zinc-500 max-w-sm text-sm">
            Découvrez nos dernières villas et terrains disponibles au cœur du
            domaine Benak Hills.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group bg-zinc-900 border border-white/5 overflow-hidden flex flex-col hover:border-gold/30 transition-all duration-700"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col space-y-6">
                <div>
                  <div className="flex items-center gap-3 text-gold text-[10px] tracking-widest uppercase opacity-60">
                    <span>{offer.type}</span>
                    <span className="w-4 h-px bg-gold/30" />
                    <span>{offer.surface} m²</span>
                  </div>

                  <h4 className="text-white text-2xl uppercase mt-2 group-hover:text-gold transition-colors">
                    {offer.title}
                  </h4>
                </div>

                <p className="text-zinc-500 text-sm leading-relaxed">
                  {offer.description}
                </p>

                <div className="flex items-center gap-6 pt-6 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-gold/60" />
                    <span className="text-zinc-400 text-xs">
                      {offer.rooms} Chambres
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Maximize className="w-4 h-4 text-gold/60" />
                    <span className="text-zinc-400 text-xs">
                      {offer.surface} m²
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    document
                      .getElementById("modeles")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-6 py-4 border border-zinc-800 text-zinc-400 hover:text-gold hover:border-gold text-[10px] tracking-[0.4em] uppercase transition-all duration-500"
                >
                  EN SAVOIR PLUS
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
