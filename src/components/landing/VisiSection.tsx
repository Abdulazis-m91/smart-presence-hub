import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// TODO: teks visi ini placeholder — client akan mengonfirmasi teks resmi (menyusul)
const visiText =
  "Mewujudkan generasi santri yang unggul dalam ilmu pengetahuan, berakhlakul karimah, dan berdaya saing di era modern, dengan tetap berpegang teguh pada nilai-nilai Al-Qur'an dan As-Sunnah.";

export default function VisiSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="visi" className="py-20 sm:py-24 px-4 bg-emerald-50/50">
      <div className="max-w-2xl mx-auto text-center" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-6"
        >
          Visi Sekolah
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-emerald-800/80 leading-relaxed mb-8"
        >
          {visiText}
        </motion.p>
        <motion.a
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          href="/tentang/visi-misi"
          className="inline-block bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-900 transition-colors"
        >
          Tampilkan Lebih Banyak
        </motion.a>
      </div>
    </section>
  );
}
