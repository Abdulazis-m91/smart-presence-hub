import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Wifi, CreditCard, BarChart3 } from "lucide-react";

const slides = [
  {
    icon: CreditCard,
    title: "Smart Attendance System",
    subtitle: "Sistem absensi modern berbasis RFID Smartcard untuk sekolah dan pesantren",
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    icon: Wifi,
    title: "Real-Time Monitoring",
    subtitle: "Pantau kehadiran guru, siswa, dan staf secara langsung dari mana saja",
    gradient: "from-secondary/20 to-primary/20",
  },
  {
    icon: BarChart3,
    title: "Laporan & Analitik",
    subtitle: "Dapatkan insight mendalam dengan laporan kehadiran otomatis dan akurat",
    gradient: "from-primary/20 to-accent/40",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: number) => setCurrent((c) => (c + dir + slides.length) % slides.length);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${slides[current].gradient} glass`}>
              {(() => {
                const Icon = slides[current].icon;
                return <Icon className="h-12 w-12 text-primary" />;
              })()}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
              {slides[current].title.split(" ").map((word, i) => (
                <span key={i} className={i === 0 ? "gradient-text" : ""}>{word} </span>
              ))}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {slides[current].subtitle}
            </p>

            <div className="flex items-center justify-center gap-3 pt-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 gradient-primary" : "w-2 bg-muted-foreground/30"}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <button onClick={() => go(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass rounded-full hover:bg-muted transition-colors">
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <button onClick={() => go(1)} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass rounded-full hover:bg-muted transition-colors">
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </section>
  );
}
