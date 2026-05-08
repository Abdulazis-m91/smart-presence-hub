import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Wifi, CreditCard, BarChart3, Sparkles } from "lucide-react";

const slides = [
  {
    icon: CreditCard,
    title: "Smart Attendance",
    highlight: "System",
    subtitle: "Sistem absensi modern berbasis RFID Smartcard untuk sekolah dan pesantren dengan teknologi terdepan",
    gradient: "from-blue-500/20 via-cyan-500/10 to-emerald-500/20",
  },
  {
    icon: Wifi,
    title: "Real-Time",
    highlight: "Monitoring",
    subtitle: "Pantau kehadiran guru, siswa, dan staf secara langsung dari mana saja dengan dashboard interaktif",
    gradient: "from-emerald-500/20 via-teal-500/10 to-blue-500/20",
  },
  {
    icon: BarChart3,
    title: "Laporan &",
    highlight: "Analitik",
    subtitle: "Dapatkan insight mendalam dengan laporan kehadiran otomatis, akurat, dan visual yang informatif",
    gradient: "from-violet-500/20 via-blue-500/10 to-cyan-500/20",
  },
];

const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 10 + 15,
  delay: Math.random() * 5,
}));

const stats = [
  { value: 1200, suffix: "+", label: "Siswa Aktif" },
  { value: 98, suffix: "%", label: "Akurasi" },
  { value: 50, suffix: "+", label: "Guru & Staf" },
  { value: 24, suffix: "/7", label: "Monitoring" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{count}{suffix}</>;
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [0, 1], [-20, 20]);
  const bgY = useTransform(mouseY, [0, 1], [-20, 20]);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const go = (dir: number) => setCurrent((c) => (c + dir + slides.length) % slides.length);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-muted"
      onMouseMove={handleMouseMove}
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <motion.div
            className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"
            animate={{ x: [0, 120, -40, 0], y: [0, 80, -60, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]"
            animate={{ x: [0, -100, 60, 0], y: [0, -70, 50, 0], scale: [1, 0.85, 1.15, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.25, 1], rotate: [0, 90, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-10 right-1/3 w-[300px] h-[300px] bg-secondary/8 rounded-full blur-[90px]"
            animate={{ x: [0, 60, -50, 0], y: [0, 100, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        {/* Animated conic shimmer */}
        <motion.div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, hsl(var(--primary)) 0%, transparent 25%, hsl(var(--secondary)) 50%, transparent 75%, hsl(var(--primary)) 100%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 pb-16">
        <div className="text-center space-y-8">
          {/* Badge — static */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Sistem Absensi Generasi Baru</span>
          </motion.div>

          {/* Title — fixed-height slot */}
          <div className="relative h-[120px] sm:h-[150px] lg:h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`t-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-x-0 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
              >
                <span className="text-foreground">{slides[current].title} </span>
                <span className="gradient-text">{slides[current].highlight}</span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle — fixed-height slot */}
          <div className="relative h-[80px] sm:h-[64px] flex items-start justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={`s-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-x-0 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4"
              >
                {slides[current].subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* CTA Buttons — static, fixed height */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex flex-nowrap items-center justify-center gap-4 pt-2 min-h-[60px]"
          >
            <button className="group relative gradient-primary text-primary-foreground px-8 py-3.5 rounded-2xl text-sm font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/25">
              <span className="relative z-10">Mulai Sekarang</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="glass px-8 py-3.5 rounded-2xl text-sm font-semibold text-foreground hover:bg-muted/50 transition-all">
              Pelajari Lebih Lanjut
            </button>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="glass rounded-2xl p-5 text-center hover:glow-primary transition-all duration-500 group"
            >
              <p className="text-2xl sm:text-3xl font-bold gradient-text">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-500 ${
                i === current
                  ? "w-10 h-3 gradient-primary shadow-lg shadow-primary/30"
                  : "w-3 h-3 bg-muted-foreground/20 hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Nav arrows */}
      <button onClick={() => go(-1)} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 glass rounded-2xl hover:bg-muted/50 transition-all hover:scale-110 group z-20">
        <ChevronLeft className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
      </button>
      <button onClick={() => go(1)} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 glass rounded-2xl hover:bg-muted/50 transition-all hover:scale-110 group z-20">
        <ChevronRight className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
      </button>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
