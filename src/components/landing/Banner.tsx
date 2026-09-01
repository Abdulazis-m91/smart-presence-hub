import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

// TODO: ganti bannerImage dengan gambar asli sekolah dari client (menyusul)
// Cara pakai nanti: import bannerImage from "@/assets/banner-sekolah.webp";
// lalu ganti div placeholder di bawah dengan <img src={bannerImage} ... />

export default function Banner() {
  return (
    <section id="beranda" className="pt-16">
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center overflow-hidden">
        {/* Placeholder — akan diganti gambar sekolah asli */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-emerald-200/60">
          <ImageIcon className="h-14 w-14" strokeWidth={1.2} />
          <span className="text-sm font-medium tracking-wide">Gambar sekolah menyusul</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-4"
        >
          <a
            href="#unit-pendidikan"
            className="inline-block bg-white text-emerald-900 px-8 py-3.5 rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-50 shadow-lg transition-colors"
          >
            Lihat Selengkapnya
          </a>
        </motion.div>
      </div>
    </section>
  );
}
