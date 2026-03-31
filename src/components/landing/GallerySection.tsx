import { motion, useInView } from "framer-motion";
import { Eye } from "lucide-react";
import { useRef } from "react";

const images = [
  { label: "Ruang Kelas Modern", color: "from-blue-600 to-cyan-500", span: "md:col-span-2 md:row-span-2" },
  { label: "Masjid Pesantren", color: "from-emerald-600 to-teal-500", span: "" },
  { label: "Lab Komputer", color: "from-violet-600 to-purple-500", span: "" },
  { label: "Asrama Santri", color: "from-orange-600 to-amber-500", span: "" },
  { label: "Perpustakaan Digital", color: "from-pink-600 to-rose-500", span: "" },
  { label: "Lapangan Olahraga", color: "from-teal-600 to-green-500", span: "md:col-span-2" },
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4"
          >
            Fasilitas Kami
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-foreground"
          >
            <span className="gradient-text">Gallery</span> Foto
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5, type: "spring" }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${img.span}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${img.color}`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

              {/* Hover overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <motion.div
                  className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3"
                  whileHover={{ scale: 1.1 }}
                >
                  <Eye className="h-6 w-6 text-white" />
                </motion.div>
                <span className="text-white font-semibold text-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {img.label}
                </span>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                <span className="text-white/80 text-xs font-medium">{img.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
