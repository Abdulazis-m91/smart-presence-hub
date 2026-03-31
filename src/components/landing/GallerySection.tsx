import { motion } from "framer-motion";

const images = [
  { label: "Ruang Kelas Modern", color: "from-primary to-secondary" },
  { label: "Masjid Pesantren", color: "from-secondary to-primary" },
  { label: "Laboratorium Komputer", color: "from-primary/80 to-accent" },
  { label: "Asrama Santri", color: "from-accent to-secondary" },
  { label: "Perpustakaan Digital", color: "from-secondary to-primary/80" },
  { label: "Lapangan Olahraga", color: "from-primary to-secondary/80" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12"
        >
          <span className="gradient-text">Gallery</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${img.color} opacity-70 group-hover:opacity-90 transition-opacity duration-300`} />
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-primary-foreground font-semibold text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
