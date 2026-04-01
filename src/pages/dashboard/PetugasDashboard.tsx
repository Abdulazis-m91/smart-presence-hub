import { motion } from "framer-motion";
import { Users, ClipboardCheck, TrendingUp, UserCheck, ArrowUpRight, ArrowDownRight, FileText, Clock } from "lucide-react";

const todayStats = [
  { label: "Guru Mengajar Hari Ini", value: "28", icon: Users, change: "+2", trend: "up", percent: "7.1%", gradient: "from-blue-500 to-cyan-500" },
  { label: "Siswa Check-in (RFID)", value: "412", icon: ClipboardCheck, change: "+18", trend: "up", percent: "4.6%", gradient: "from-emerald-500 to-teal-500" },
  { label: "Kehadiran Guru", value: "87.5%", icon: UserCheck, change: "-2.5%", trend: "down", percent: "2.5%", gradient: "from-violet-500 to-purple-500" },
  { label: "Kehadiran Siswa", value: "93.2%", icon: TrendingUp, change: "+1.2%", trend: "up", percent: "1.2%", gradient: "from-orange-500 to-amber-500" },
];

const teacherAttendance = [
  { no: 1, name: "Ahmad Fauzi", nip: "198501012010011001", subject: "Matematika", checkIn: "06:45", status: "Hadir" },
  { no: 2, name: "Siti Rahmawati", nip: "198703152011012002", subject: "B. Indonesia", checkIn: "06:52", status: "Hadir" },
  { no: 3, name: "Budi Santoso", nip: "199005202012011003", subject: "Fisika", checkIn: "07:18", status: "Terlambat" },
  { no: 4, name: "Dewi Lestari", nip: "198812102013012004", subject: "Biologi", checkIn: "06:48", status: "Hadir" },
  { no: 5, name: "Hasan Basri", nip: "198601052010011005", subject: "Kimia", checkIn: "-", status: "Izin" },
  { no: 6, name: "Rina Marlina", nip: "199203102014012006", subject: "B. Inggris", checkIn: "06:55", status: "Hadir" },
  { no: 7, name: "Agus Wijaya", nip: "198709202011011007", subject: "Sejarah", checkIn: "06:50", status: "Hadir" },
  { no: 8, name: "Lina Kartika", nip: "199108152013012008", subject: "Geografi", checkIn: "-", status: "Izin" },
];

const teachersOnLeave = [
  { name: "Hasan Basri", subject: "Kimia", reason: "Sakit demam", since: "2026-03-31" },
  { name: "Lina Kartika", subject: "Geografi", reason: "Keperluan keluarga", since: "2026-04-01" },
  { name: "Joko Prasetyo", subject: "Penjaskes", reason: "Pelatihan luar kota", since: "2026-03-30" },
];

const statusStyles: Record<string, string> = {
  Hadir: "bg-secondary/10 text-secondary border border-secondary/20",
  Terlambat: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  Izin: "bg-destructive/10 text-destructive border border-destructive/20",
};

export default function PetugasDashboard() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard Petugas 👋</h1>
        <p className="text-muted-foreground mt-1">
          Monitoring kehadiran hari ini, {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </motion.div>

      {/* Stats */}
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
                <p className="text-3xl font-bold text-foreground mt-2 tracking-tight">{s.value}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  {s.trend === "up" ? (
                    <div className="flex items-center gap-0.5 text-secondary text-xs font-medium">
                      <ArrowUpRight className="h-3 w-3" />{s.percent}
                    </div>
                  ) : (
                    <div className="flex items-center gap-0.5 text-destructive text-xs font-medium">
                      <ArrowDownRight className="h-3 w-3" />{s.percent}
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground">vs kemarin</span>
                </div>
              </div>
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <s.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Teacher attendance table */}
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
                  {["No", "Nama Guru", "NIP", "Mapel", "Jam Masuk", "Status"].map((h) => (
                    <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teacherAttendance.map((t, i) => (
                  <motion.tr
                    key={t.no}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{t.no}</span>
                    </td>
                    <td className="py-3.5 px-5 font-medium text-foreground">{t.name}</td>
                    <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{t.nip}</td>
                    <td className="py-3.5 px-5 text-foreground">{t.subject}</td>
                    <td className="py-3.5 px-5">
                      <span className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {t.checkIn}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[t.status]}`}>{t.status}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Teachers on leave panel */}
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
            {teachersOnLeave.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all duration-300 border border-transparent hover:border-border/50 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.subject}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Alasan:</span> {t.reason}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">Sejak: {t.since}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
