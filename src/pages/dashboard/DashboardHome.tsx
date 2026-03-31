import { useAuth } from "@/lib/auth-context";
import GuruDashboard from "./GuruDashboard";
import { motion } from "framer-motion";
import { Users, ClipboardCheck, Clock, TrendingUp } from "lucide-react";

const adminStats = [
  { label: "Total Siswa", value: "486", icon: Users, change: "+12 bulan ini" },
  { label: "Kehadiran Hari Ini", value: "452", icon: ClipboardCheck, change: "93%" },
  { label: "Guru Hadir", value: "28/32", icon: Clock, change: "87.5%" },
  { label: "Rata-rata Kehadiran", value: "94.2%", icon: TrendingUp, change: "+1.5% dari bulan lalu" },
];

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((s, i) => (
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-3">
          {[
            { time: "07:15", text: "Ahmad Fauzi tap masuk - XII-A", type: "in" },
            { time: "07:18", text: "Siti Aminah tap masuk - XI-B", type: "in" },
            { time: "07:32", text: "Rizky Pratama tap masuk (terlambat) - X-A", type: "late" },
            { time: "12:00", text: "Ahmad Fauzi tap keluar - XII-A", type: "out" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-xs font-mono text-muted-foreground w-12">{a.time}</span>
              <div className={`h-2 w-2 rounded-full ${a.type === "late" ? "bg-destructive" : a.type === "in" ? "bg-secondary" : "bg-primary"}`} />
              <span className="text-sm text-foreground">{a.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  if (user?.role === "guru") return <GuruDashboard />;
  return <AdminDashboard />;
}
