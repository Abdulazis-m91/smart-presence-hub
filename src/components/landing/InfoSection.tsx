import { motion, useInView } from "framer-motion";
import { Shield, Zap, Users, Globe, ArrowRight } from "lucide-react";
import { useRef } from "react";

const features = [
  { icon: Zap, title: "Real-Time Processing", desc: "Data kehadiran tercatat secara instan melalui teknologi RFID terkini dengan latensi kurang dari 1 detik", accent: "from-blue-500 to-cyan-500" },
  { icon: Shield, title: "Aman & Terenkripsi", desc: "Sistem keamanan berlapis dengan enkripsi end-to-end untuk menjaga data sensitif tetap terlindungi", accent: "from-emerald-500 to-teal-500" },
  { icon: Users, title: "Multi-Role Access", desc: "Mendukung guru, siswa, petugas, dan administrator dengan hak akses yang dapat dikustomisasi", accent: "from-violet-500 to-purple-500" },
  { icon: Globe, title: "Akses Global", desc: "Pantau kehadiran dari perangkat manapun dan dimana saja melalui dashboard responsif", accent: "from-orange-500 to-amber-500" },
];

export default function InfoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="informasi" className="relative py-32 px-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4"
          >
            Keunggulan Kami
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-6"
          >
            Mengapa <span className="gradient-text">SmartPresence</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            Solusi absensi cerdas yang dirancang khusus untuk kebutuhan sekolah dan pesantren modern
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="group relative glass rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

              <div className="relative flex items-start gap-5">
                <div className={`shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-br ${f.accent} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <f.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    Selengkapnya <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
