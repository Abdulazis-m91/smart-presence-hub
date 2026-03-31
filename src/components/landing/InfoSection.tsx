import { motion } from "framer-motion";
import { Shield, Zap, Users, Globe } from "lucide-react";

const features = [
  { icon: Zap, title: "Real-Time", desc: "Data kehadiran tercatat secara instan melalui RFID" },
  { icon: Shield, title: "Aman & Terpercaya", desc: "Sistem keamanan berlapis untuk data yang terjaga" },
  { icon: Users, title: "Multi-User", desc: "Mendukung guru, siswa, petugas, dan administrator" },
  { icon: Globe, title: "Akses Dimana Saja", desc: "Pantau kehadiran dari perangkat manapun" },
];

export default function InfoSection() {
  return (
    <section id="informasi" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Mengapa <span className="gradient-text">SmartPresence</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Solusi absensi modern yang dirancang khusus untuk kebutuhan sekolah dan pesantren
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:glow-primary transition-all duration-300 group"
            >
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
