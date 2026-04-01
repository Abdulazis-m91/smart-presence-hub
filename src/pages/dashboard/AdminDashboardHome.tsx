import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, ClipboardCheck, Shield, Clock, XCircle } from "lucide-react";

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

const summaryCards = [
  { label: "Total Guru Aktif", value: 32, icon: Users, gradient: "from-blue-500 to-cyan-500" },
  { label: "Total Staff Aktif", value: 8, icon: Shield, gradient: "from-violet-500 to-purple-500" },
  { label: "Total Siswa Aktif", value: 486, icon: UserCheck, gradient: "from-emerald-500 to-teal-500" },
  { label: "Petugas Piket Aktif", value: 4, icon: ClipboardCheck, gradient: "from-orange-500 to-amber-500" },
];

const teacherAttendance = [
  { no: 1, photo: "AF", name: "Ahmad Fauzi", nip: "198501012010011001", subject: "Matematika", checkIn: "06:45", status: "Hadir" },
  { no: 2, photo: "SR", name: "Siti Rahmawati", nip: "198703152011012002", subject: "B. Indonesia", checkIn: "06:52", status: "Hadir" },
  { no: 3, photo: "BS", name: "Budi Santoso", nip: "199005202012011003", subject: "Fisika", checkIn: "07:18", status: "Terlambat" },
  { no: 4, photo: "DL", name: "Dewi Lestari", nip: "198812102013012004", subject: "Biologi", checkIn: "06:48", status: "Hadir" },
  { no: 5, photo: "RM", name: "Rina Marlina", nip: "199203102014012006", subject: "B. Inggris", checkIn: "06:55", status: "Hadir" },
  { no: 6, photo: "AW", name: "Agus Wijaya", nip: "198709202011011007", subject: "Sejarah", checkIn: "06:50", status: "Hadir" },
  { no: 7, photo: "JP", name: "Joko Prasetyo", nip: "198804102012011009", subject: "Penjaskes", checkIn: "07:20", status: "Terlambat" },
  { no: 8, photo: "MA", name: "Maya Anggraini", nip: "199305202014012010", subject: "Seni Budaya", checkIn: "06:47", status: "Hadir" },
];

const absentTeachers = [
  { name: "Hasan Basri", subject: "Kimia", reason: "Izin - Keperluan Keluarga" },
  { name: "Lina Kartika", subject: "Geografi", reason: "Sakit" },
  { name: "Wahyu Setiawan", subject: "PKN", reason: "Dinas Luar" },
  { name: "Nurul Hidayah", subject: "Agama", reason: "Cuti" },
];

const statusStyles: Record<string, string> = {
  Hadir: "bg-secondary/10 text-secondary border border-secondary/20",
  Terlambat: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
};

export default function AdminDashboardHome() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Selamat Datang, Admin! 👋</h1>
        <p className="text-muted-foreground mt-1">
          Ringkasan data sekolah hari ini, {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {summaryCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group relative glass rounded-2xl p-5 sm:p-6 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{s.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground mt-2 tracking-tight">
                  <AnimatedNumber value={s.value} />
                </p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <s.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table + Absent Panel */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Teacher Attendance Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass rounded-2xl overflow-hidden"
        >
          <div className="p-5 border-b border-border/30">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Kehadiran Guru Hari Ini</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{teacherAttendance.length} guru sudah check-in</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30">
                  {["No", "Foto", "Nama", "NIP", "Mapel", "Jam Masuk", "Status"].map((h) => (
                    <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teacherAttendance.map((row, i) => (
                  <motion.tr
                    key={row.no}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.04 }}
                    className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{i + 1}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
                        {row.photo}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 font-medium text-foreground whitespace-nowrap">{row.name}</td>
                    <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{row.nip}</td>
                    <td className="py-3.5 px-5 text-foreground">{row.subject}</td>
                    <td className="py-3.5 px-5">
                      <span className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />{row.checkIn}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>{row.status}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Absent Teachers Panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
              <XCircle className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Tidak Hadir</h2>
              <p className="text-xs text-muted-foreground">{absentTeachers.length} guru</p>
            </div>
          </div>
          <div className="space-y-3">
            {absentTeachers.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all border border-transparent hover:border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.subject}</p>
                    <p className="text-[11px] text-destructive mt-0.5">{t.reason}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
