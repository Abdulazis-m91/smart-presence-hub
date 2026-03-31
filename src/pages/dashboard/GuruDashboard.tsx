import { motion } from "framer-motion";
import { BookOpen, FileCheck, Clock, TrendingUp } from "lucide-react";

const stats = [
  { label: "Sesi Mengajar", value: "24", icon: BookOpen, change: "+3 bulan ini" },
  { label: "Tepat Waktu", value: "22", icon: Clock, change: "91.6%" },
  { label: "Izin/Cuti", value: "2", icon: FileCheck, change: "Bulan ini" },
  { label: "Kehadiran", value: "96%", icon: TrendingUp, change: "+2% dari bulan lalu" },
];

const attendanceHistory = [
  { date: "2026-03-28", name: "Ahmad Fauzi", class: "XII-A", checkIn: "07:15", checkOut: "12:30", status: "Tepat Waktu" },
  { date: "2026-03-27", name: "Ahmad Fauzi", class: "XI-B", checkIn: "07:45", checkOut: "11:45", status: "Terlambat" },
  { date: "2026-03-26", name: "Ahmad Fauzi", class: "X-A", checkIn: "07:10", checkOut: "12:00", status: "Tepat Waktu" },
  { date: "2026-03-25", name: "Ahmad Fauzi", class: "XII-A", checkIn: "-", checkOut: "-", status: "Izin" },
  { date: "2026-03-24", name: "Ahmad Fauzi", class: "XI-C", checkIn: "07:05", checkOut: "12:15", status: "Tepat Waktu" },
];

const taskFiles = [
  { date: "2026-03-25", fileName: "Tugas_XII-A_Matematika.pdf" },
  { date: "2026-03-20", fileName: "Soal_UTS_XI-B.docx" },
];

const statusColors: Record<string, string> = {
  "Tepat Waktu": "bg-secondary/10 text-secondary",
  "Terlambat": "bg-destructive/10 text-destructive",
  "Izin": "bg-accent text-accent-foreground",
};

export default function GuruDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="stat-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
              </div>
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Attendance History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Riwayat Kehadiran</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Tanggal</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Kelas</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Masuk</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Keluar</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 text-foreground">{row.date}</td>
                    <td className="py-3 px-2 text-foreground">{row.class}</td>
                    <td className="py-3 px-2 text-foreground">{row.checkIn}</td>
                    <td className="py-3 px-2 text-foreground">{row.checkOut}</td>
                    <td className="py-3 px-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Task Files */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">File Tugas</h2>
          <div className="space-y-3">
            {taskFiles.map((f, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{f.fileName}</p>
                  <p className="text-xs text-muted-foreground">{f.date}</p>
                </div>
                <button className="text-xs gradient-primary text-primary-foreground px-3 py-1.5 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Unduh
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
