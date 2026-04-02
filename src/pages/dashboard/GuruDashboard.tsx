import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, FileCheck, Clock, TrendingUp, CalendarDays, ArrowUpRight, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useAbsensi, useJadwal } from "@/hooks/use-data";

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

const statusColors: Record<string, string> = {
  Hadir: "bg-secondary/10 text-secondary border border-secondary/20",
  "Tepat Waktu": "bg-secondary/10 text-secondary border border-secondary/20",
  Terlambat: "bg-destructive/10 text-destructive border border-destructive/20",
  Izin: "bg-accent text-accent-foreground border border-border",
  "Tidak Hadir": "bg-muted text-muted-foreground border border-border",
};

export default function GuruDashboard() {
  const { user } = useAuth();
  const { data: absensi = [], isLoading: loadingAbsensi } = useAbsensi();
  const { data: jadwal = [], isLoading: loadingJadwal } = useJadwal();

  const isLoading = loadingAbsensi || loadingJadwal;

  // Filter attendance for this teacher
  const myAttendance = absensi.filter((a) => a.role === "Guru" && a.person_name === user?.name);
  const myJadwal = jadwal.filter((j) => j.teacher_name === user?.name);

  const totalSesi = myJadwal.length;
  const tepatWaktu = myAttendance.filter((a) => a.status === "Hadir" || a.status === "Tepat Waktu").length;
  const izinCuti = myAttendance.filter((a) => a.status === "Izin").length;
  const kehadiran = myAttendance.length > 0 ? Math.round((tepatWaktu / myAttendance.length) * 100) : 0;

  const stats = [
    { label: "Sesi Mengajar", value: totalSesi, icon: BookOpen, change: `${totalSesi} jadwal`, gradient: "from-blue-500 to-cyan-500" },
    { label: "Tepat Waktu", value: tepatWaktu, icon: Clock, change: myAttendance.length > 0 ? `${Math.round((tepatWaktu / myAttendance.length) * 100)}%` : "0%", gradient: "from-emerald-500 to-teal-500" },
    { label: "Izin/Cuti", value: izinCuti, icon: FileCheck, change: "Total", gradient: "from-violet-500 to-purple-500" },
    { label: "Kehadiran", value: `${kehadiran}%`, icon: TrendingUp, change: "Keseluruhan", gradient: "from-orange-500 to-amber-500" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Selamat Datang, Guru! 📚</h1>
        <p className="text-muted-foreground mt-1">Ringkasan aktivitas mengajar Anda</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}
            className="group relative glass rounded-2xl p-6 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2 tracking-tight">
                  {typeof s.value === "number" ? <AnimatedNumber value={s.value} /> : s.value}
                </p>
                <p className="text-xs text-muted-foreground mt-2">{s.change}</p>
              </div>
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <s.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Attendance History */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">Riwayat Kehadiran</h2>
            <p className="text-sm text-muted-foreground">{myAttendance.length} catatan</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Tanggal", "Kelas", "Masuk", "Keluar", "Status"].map((h) => (
                  <th key={h} className="text-left py-3 px-3 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myAttendance.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-muted-foreground">Belum ada data kehadiran</td></tr>
              ) : (
                myAttendance.slice(0, 10).map((row, i) => (
                  <motion.tr key={row.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-foreground">{row.date}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span>
                    </td>
                    <td className="py-3.5 px-3 text-foreground font-mono text-xs">{row.check_in}</td>
                    <td className="py-3.5 px-3 text-foreground font-mono text-xs">{row.check_out}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[row.status] || ""}`}>{row.status}</span>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
