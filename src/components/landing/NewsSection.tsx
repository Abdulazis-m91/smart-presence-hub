import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const news = [
  { title: "Peluncuran Sistem RFID Baru", date: "28 Mar 2026", desc: "Sistem absensi RFID terbaru telah resmi digunakan di seluruh unit pendidikan yayasan." },
  { title: "Workshop Digitalisasi Pesantren", date: "15 Mar 2026", desc: "Pelatihan penggunaan teknologi digital untuk pengelolaan pesantren modern." },
  { title: "Penghargaan Sekolah Digital", date: "1 Mar 2026", desc: "Yayasan meraih penghargaan sebagai lembaga pendidikan dengan sistem digital terbaik." },
];

export default function NewsSection() {
  return (
    <section id="berita" className="py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12"
        >
          Berita <span className="gradient-text">Terkini</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((n, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer hover:glow-primary transition-all duration-300"
            >
              <div className="h-40 gradient-primary opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3" />
                  {n.date}
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{n.title}</h3>
                <p className="text-sm text-muted-foreground">{n.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
