import { useAuth } from "@/lib/auth-context";
import GuruDashboard from "./GuruDashboard";
import PetugasDashboard from "./PetugasDashboard";
import { motion } from "framer-motion";
import { Users, ClipboardCheck, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

const adminStats = [
  { label: "Total Siswa", value: "486", icon: Users, change: "+12", trend: "up", percent: "2.5%" },
  { label: "Kehadiran Hari Ini", value: "452", icon: ClipboardCheck, change: "93%", trend: "up", percent: "1.2%" },
  { label: "Guru Hadir", value: "28/32", icon: Clock, change: "87.5%", trend: "down", percent: "3.1%" },
  { label: "Rata-rata Kehadiran", value: "94.2%", icon: TrendingUp, change: "+1.5%", trend: "up", percent: "1.5%" },
];

const statGradients = [
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
  "from-orange-500 to-amber-500",
];

const activities = [
  { time: "07:15", text: "Ahmad Fauzi tap masuk", detail: "XII-A", type: "in" },
  { time: "07:18", text: "Siti Aminah tap masuk", detail: "XI-B", type: "in" },
  { time: "07:32", text: "Rizky Pratama terlambat", detail: "X-A", type: "late" },
  { time: "07:45", text: "Budi Santoso tap masuk", detail: "X-B", type: "in" },
  { time: "12:00", text: "Ahmad Fauzi tap keluar", detail: "XII-A", type: "out" },
  { time: "12:05", text: "Siti Aminah tap keluar", detail: "XI-B", type: "out" },
];

const weeklyData = [
  { day: "Sen", hadir: 95, izin: 3, absen: 2 },
  { day: "Sel", hadir: 92, izin: 5, absen: 3 },
  { day: "Rab", hadir: 97, izin: 2, absen: 1 },
  { day: "Kam", hadir: 90, izin: 6, absen: 4 },
  { day: "Jum", hadir: 93, izin: 4, absen: 3 },
];

function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Selamat Datang! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Berikut ringkasan kehadiran hari ini, {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {adminStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="group relative glass rounded-2xl p-6 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
          >
            {/* Gradient accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${statGradients[i]} opacity-60 group-hover:opacity-100 transition-opacity`} />
            
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2 tracking-tight">{s.value}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  {s.trend === "up" ? (
                    <div className="flex items-center gap-0.5 text-secondary text-xs font-medium">
                      <ArrowUpRight className="h-3 w-3" />
                      {s.percent}
                    </div>
                  ) : (
                    <div className="flex items-center gap-0.5 text-destructive text-xs font-medium">
                      <ArrowDownRight className="h-3 w-3" />
                      {s.percent}
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground">vs bulan lalu</span>
                </div>
              </div>
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${statGradients[i]} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <s.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Weekly chart area */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-3 glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Statistik Mingguan</h2>
              <p className="text-sm text-muted-foreground">Persentase kehadiran 5 hari terakhir</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-primary" /> Hadir</div>
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-secondary" /> Izin</div>
              <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-destructive" /> Absen</div>
            </div>
          </div>

          {/* Simple bar chart */}
          <div className="flex items-end gap-3 h-52">
            {weeklyData.map((d, i) => (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                style={{ originY: 1 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full flex flex-col gap-1 flex-1 justify-end">
                  <div
                    className="w-full rounded-t-lg bg-primary/80 hover:bg-primary transition-colors relative group"
                    style={{ height: `${d.hadir * 2}px` }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-semibold text-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap">
                      {d.hadir}%
                    </div>
                  </div>
                  <div
                    className="w-full bg-secondary/60 hover:bg-secondary transition-colors rounded-sm"
                    style={{ height: `${d.izin * 4}px` }}
                  />
                  <div
                    className="w-full bg-destructive/60 hover:bg-destructive transition-colors rounded-b-lg"
                    style={{ height: `${d.absen * 4}px` }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{d.day}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activity feed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Aktivitas Live</h2>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-secondary font-medium">
              <span className="h-2 w-2 bg-secondary rounded-full animate-pulse" />
              Real-time
            </span>
          </div>
          <div className="space-y-1">
            {activities.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors group"
              >
                <span className="text-[11px] font-mono text-muted-foreground w-10 shrink-0">{a.time}</span>
                <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                  a.type === "late" ? "bg-destructive shadow-sm shadow-destructive/50" 
                  : a.type === "in" ? "bg-secondary shadow-sm shadow-secondary/50" 
                  : "bg-primary shadow-sm shadow-primary/50"
                }`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground truncate">{a.text}</p>
                  <p className="text-[11px] text-muted-foreground">{a.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  if (user?.role === "guru") return <GuruDashboard />;
  if (user?.role === "petugas") return <PetugasDashboard />;
  return <AdminDashboard />;
}
