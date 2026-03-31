import { motion, useInView } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const news = [
  {
    title: "Peluncuran Sistem RFID Baru",
    date: "28 Mar 2026",
    desc: "Sistem absensi RFID terbaru telah resmi digunakan di seluruh unit pendidikan yayasan.",
    category: "Teknologi",
  },
  {
    title: "Workshop Digitalisasi Pesantren",
    date: "15 Mar 2026",
    desc: "Pelatihan penggunaan teknologi digital untuk pengelolaan pesantren modern.",
    category: "Kegiatan",
  },
  {
    title: "Penghargaan Sekolah Digital",
    date: "1 Mar 2026",
    desc: "Yayasan meraih penghargaan sebagai lembaga pendidikan dengan sistem digital terbaik.",
    category: "Prestasi",
  },
];

const categoryColors: Record<string, string> = {
  Teknologi: "bg-primary/10 text-primary",
  Kegiatan: "bg-secondary/10 text-secondary",
  Prestasi: "bg-accent text-accent-foreground",
};

export default function NewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="berita" className="relative py-32 px-4">
      <div className="absolute inset-0 bg-muted/20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative max-w-6xl mx-auto" ref={ref}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4"
            >
              Kabar Terbaru
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-foreground"
            >
              Berita <span className="gradient-text">Terkini</span>
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-sm font-medium text-primary hover:underline underline-offset-4 flex items-center gap-1 group"
          >
            Lihat Semua <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((n, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              className="group glass rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative h-48 gradient-primary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[n.category]}`}>
                    {n.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3.5 w-3.5" />
                  {n.date}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{n.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{n.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
