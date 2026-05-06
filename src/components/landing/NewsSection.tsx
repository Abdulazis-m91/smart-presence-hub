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
  {
    title: "Pelatihan Guru Berbasis AI",
    date: "20 Feb 2026",
    desc: "Para pendidik mengikuti pelatihan pemanfaatan kecerdasan buatan dalam pembelajaran.",
    category: "Kegiatan",
  },
  {
    title: "Renovasi Gedung Asrama",
    date: "10 Feb 2026",
    desc: "Pembaruan fasilitas asrama santri demi kenyamanan dan kualitas hunian yang lebih baik.",
    category: "Kegiatan",
  },
  {
    title: "Beasiswa Tahfidz Quran",
    date: "1 Feb 2026",
    desc: "Program beasiswa baru untuk santri berprestasi dalam bidang hafalan Al-Quran.",
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

        {(() => {
          const featured = news[0];
          const small = news.slice(1, 6);
          return (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Small list */}
              <div className="flex flex-col gap-4 order-2 lg:order-2">
                {small.map((n, i) => (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="group glass rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-0.5 flex gap-4 p-3"
                  >
                    <div className="relative h-20 w-24 sm:h-24 sm:w-28 shrink-0 rounded-xl gradient-primary overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-1.5 left-1.5">
                        <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${categoryColors[n.category]}`}>
                          {n.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-1">
                        <Calendar className="h-3 w-3" />
                        {n.date}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">{n.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1 hidden sm:block">{n.desc}</p>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Featured large */}
              <motion.article
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="group glass rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 order-1 lg:order-1 flex flex-col"
              >
                <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-[420px] gradient-primary overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/90 text-primary uppercase tracking-wider">Terbaru</span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category]}`}>
                      {featured.category}
                    </span>
                  </div>
                  <div className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="flex items-center gap-2 text-xs text-white/80 mb-3">
                      <Calendar className="h-3.5 w-3.5" />
                      {featured.date}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">{featured.title}</h3>
                    <p className="text-sm sm:text-base text-white/85 leading-relaxed line-clamp-3">{featured.desc}</p>
                  </div>
                </div>
              </motion.article>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
