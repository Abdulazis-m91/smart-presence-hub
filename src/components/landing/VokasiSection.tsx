import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Monitor, Scissors, Swords, CircleDot, ChefHat } from "lucide-react";

// TODO: setiap kotak akan diganti gambar .webp asli dari client (menyusul).
// Cara pakai nanti: import komputerImg from "@/assets/vokasi/komputer.webp";
// lalu ganti <div className="... placeholder ..."> dengan <img src={komputerImg} className="w-full h-full object-cover" />
const vokasiPrograms = [
  { label: "Komputer", icon: Monitor },
  { label: "Menjahit", icon: Scissors },
  { label: "Pencak Silat", icon: Swords },
  { label: "Sepak Bola", icon: CircleDot },
  { label: "Tataboga", icon: ChefHat },
];

export default function VokasiSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vokasi" className="py-20 sm:py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl sm:text-3xl font-bold text-emerald-900 text-center mb-12"
        >
          Vokasi Sekolah
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {vokasiPrograms.map((program, i) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl overflow-hidden border border-emerald-100 hover:shadow-lg transition-all"
              >
                {/* Placeholder — akan diganti gambar webp asli per program */}
                <div className="aspect-square bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                  <Icon className="h-10 w-10 text-emerald-600" strokeWidth={1.3} />
                </div>
                <div className="py-3 text-center bg-emerald-50">
                  <span className="text-sm font-semibold text-emerald-900">{program.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href="/vokasi"
            className="inline-block bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-900 transition-colors"
          >
            Tampilkan
          </a>
        </div>
      </div>
    </section>
  );
}
