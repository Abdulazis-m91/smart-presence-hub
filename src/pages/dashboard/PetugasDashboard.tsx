import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, ClipboardCheck, TrendingUp, UserCheck, ArrowUpRight, ArrowDownRight, FileText, Clock, Loader2 } from "lucide-react";
import { useGuru, useAbsensi } from "@/hooks/use-data";
import { format } from "date-fns";

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 800;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{display}</>;
}

const statusStyles: Record<string, string> = {
  Hadir: "bg-secondary/10 text-secondary border border-secondary/20",
  Terlambat: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  Izin: "bg-destructive/10 text-destructive border border-destructive/20",
};

export default function PetugasDashboard() {
  const { data: guru = [], isLoading: loadingGuru } = useGuru();
  const { data: absensi = [], isLoading: loadingAbsensi } = useAbsensi();

  const isLoading = loadingGuru || loadingAbsensi;
  const today = format(new Date(), "yyyy-MM-dd");

  const todayGuruAbsensi = absensi.filter((a) => a.date === today && a.role === "Guru");
  const todaySiswaAbsensi = absensi.filter((a) => a.date === today && a.role === "Siswa");

  const guruHadir = todayGuruAbsensi.filter((a) => a.status === "Hadir" || a.status === "Terlambat").length;
  const siswaCheckin = todaySiswaAbsensi.length;
  const guruScheduled = guru.filter((g) => g.status === "Aktif").length;
  const guruPercentage = guruScheduled > 0 ? ((guruHadir / guruScheduled) * 100).toFixed(1) : "0";
  const siswaPercentage = todaySiswaAbsensi.length > 0
    ? ((todaySiswaAbsensi.filter(a => a.status === "Hadir" || a.status === "Terlambat").length / todaySiswaAbsensi.length) * 100).toFixed(1)
    : "0";

  const teachersOnLeave = todayGuruAbsensi.filter((a) => a.status === "Izin" || a.status === "Tidak Hadir");

  const todayStats = [
    { label: "Guru Mengajar Hari Ini", value: guruHadir, icon: Users, gradient: "from-blue-500 to-cyan-500" },
    { label: "Siswa Check-in (RFID)", value: siswaCheckin, icon: ClipboardCheck, gradient: "from-emerald-500 to-teal-500" },
    { label: "Kehadiran Guru", value: `${guruPercentage}%`, icon: UserCheck, gradient: "from-violet-500 to-purple-500" },
    { label: "Kehadiran Siswa", value: `${siswaPercentage}%`, icon: TrendingUp, gradient: "from-orange-500 to-amber-500" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard Petugas 👋</h1>
        <p className="text-muted-foreground mt-1">
          Monitoring kehadiran hari ini, {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {todayStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group relative glass rounded-2xl p-6 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2 tracking-tight">
                  {typeof s.value === "number" ? <AnimatedNumber value={s.value} /> : s.value}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <s.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 glass rounded-2xl overflow-hidden"
        >
          <div className="p-6 pb-0">
            <div className="flex items-center gap-2 mb-1">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Kehadiran Guru Hari Ini</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Daftar kehadiran berdasarkan RFID check-in</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30">
                  {["No", "Nama Guru", "ID", "Mapel", "Jam Masuk", "Status"].map((h) => (
                    <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {todayGuruAbsensi.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-muted-foreground">
                      <ClipboardCheck className="h-10 w-10 mx-auto mb-3 opacity-30" />
                      <p className="font-medium">Belum ada data kehadiran hari ini</p>
                    </td>
                  </tr>
                ) : (
                  todayGuruAbsensi.map((t, i) => (
                    <motion.tr
                      key={t.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.04 }}
                      className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{i + 1}</span>
                      </td>
                      <td className="py-3.5 px-5 font-medium text-foreground">{t.person_name}</td>
                      <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{t.person_id}</td>
                      <td className="py-3.5 px-5 text-foreground">{t.subject}</td>
                      <td className="py-3.5 px-5">
                        <span className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          {t.check_in}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[t.status] || ""}`}>{t.status}</span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <FileText className="h-5 w-5 text-destructive" />
            <h2 className="text-lg font-bold text-foreground">Guru Izin</h2>
            <span className="ml-auto text-xs bg-destructive/10 text-destructive px-2.5 py-1 rounded-full font-medium">{teachersOnLeave.length} orang</span>
          </div>
          <div className="space-y-3">
            {teachersOnLeave.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <UserCheck className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">Semua guru hadir hari ini</p>
              </div>
            ) : (
              teachersOnLeave.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all duration-300 border border-transparent hover:border-border/50 group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {t.person_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{t.person_name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.subject}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Status:</span> {t.status}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
