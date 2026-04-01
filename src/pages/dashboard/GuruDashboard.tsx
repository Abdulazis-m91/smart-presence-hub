import { motion } from "framer-motion";
import { BookOpen, FileCheck, Clock, TrendingUp, Download, CalendarDays, ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Sesi Mengajar", value: "24", icon: BookOpen, change: "+3 bulan ini", gradient: "from-blue-500 to-cyan-500" },
  { label: "Tepat Waktu", value: "22", icon: Clock, change: "91.6%", gradient: "from-emerald-500 to-teal-500" },
  { label: "Izin/Cuti", value: "2", icon: FileCheck, change: "Bulan ini", gradient: "from-violet-500 to-purple-500" },
  { label: "Kehadiran", value: "96%", icon: TrendingUp, change: "+2% dari bulan lalu", gradient: "from-orange-500 to-amber-500" },
];

const attendanceHistory = [
  { date: "2026-03-28", name: "Ahmad Fauzi", class: "XII-A", checkIn: "07:15", checkOut: "12:30", status: "Tepat Waktu" },
  { date: "2026-03-27", name: "Ahmad Fauzi", class: "XI-B", checkIn: "07:45", checkOut: "11:45", status: "Terlambat" },
  { date: "2026-03-26", name: "Ahmad Fauzi", class: "X-A", checkIn: "07:10", checkOut: "12:00", status: "Tepat Waktu" },
  { date: "2026-03-25", name: "Ahmad Fauzi", class: "XII-A", checkIn: "-", checkOut: "-", status: "Izin" },
  { date: "2026-03-24", name: "Ahmad Fauzi", class: "XI-C", checkIn: "07:05", checkOut: "12:15", status: "Tepat Waktu" },
];

const taskFiles = [
  { date: "2026-03-25", fileName: "Tugas_XII-A_Matematika.pdf", size: "2.4 MB" },
  { date: "2026-03-20", fileName: "Soal_UTS_XI-B.docx", size: "1.8 MB" },
  { date: "2026-03-15", fileName: "Laporan_Semester.xlsx", size: "3.1 MB" },
];

const statusColors: Record<string, string> = {
  "Tepat Waktu": "bg-secondary/10 text-secondary border border-secondary/20",
  "Terlambat": "bg-destructive/10 text-destructive border border-destructive/20",
  "Izin": "bg-accent text-accent-foreground border border-border",
};

export default function GuruDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Selamat Datang, Guru! 📚
        </h1>
        <p className="text-muted-foreground mt-1">
          Ringkasan aktivitas mengajar Anda hari ini
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="group relative glass rounded-2xl p-6 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2 tracking-tight">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{s.change}</p>
              </div>
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <s.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Attendance History */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Riwayat Kehadiran</h2>
              <p className="text-sm text-muted-foreground">5 hari terakhir</p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline underline-offset-4 flex items-center gap-1">
              Lihat Semua <ArrowUpRight className="h-3 w-3" />
            </button>
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
                {attendanceHistory.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-foreground">{row.date}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span>
                    </td>
                    <td className="py-3.5 px-3 text-foreground font-mono text-xs">{row.checkIn}</td>
                    <td className="py-3.5 px-3 text-foreground font-mono text-xs">{row.checkOut}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Task Files */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-foreground">File Tugas</h2>
            <span className="text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">{taskFiles.length} file</span>
          </div>
          <div className="space-y-3">
            {taskFiles.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all duration-300 group border border-transparent hover:border-border/50"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{f.fileName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[11px] text-muted-foreground">{f.date}</p>
                    <span className="text-muted-foreground/30">•</span>
                    <p className="text-[11px] text-muted-foreground">{f.size}</p>
                  </div>
                </div>
                <button className="shrink-0 h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover:shadow-md">
                  <Download className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
