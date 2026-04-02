import { motion } from "framer-motion";
import { Calendar, Clock, BookOpen, Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useJadwal } from "@/hooks/use-data";
import { useAuth } from "@/lib/auth-context";

const dayColors: Record<string, string> = {
  Senin: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Selasa: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Rabu: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  Kamis: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Jumat: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  Sabtu: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
};

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

export default function JadwalPage() {
  const { user } = useAuth();
  const { data: jadwal = [], isLoading } = useJadwal();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter for current teacher
  const myJadwal = jadwal.filter((j) => j.teacher_name === user?.name);
  const totalSessions = myJadwal.length;
  const subjects = Array.from(new Set(myJadwal.map((j) => j.subject)));

  const filtered = myJadwal.filter((row) =>
    !searchQuery ||
    row.teacher_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Jadwal Mengajar</h1>
        <p className="text-muted-foreground mt-1">Jadwal mengajar minggu ini</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Calendar, label: "Total Jadwal", value: totalSessions, gradient: "from-blue-500 to-cyan-500" },
          { icon: Clock, label: "Hari Mengajar", value: Array.from(new Set(myJadwal.map(j => j.day))).length, gradient: "from-emerald-500 to-teal-500" },
          { icon: BookOpen, label: "Mata Pelajaran", value: subjects.length, gradient: "from-violet-500 to-purple-500" },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
            className="group relative glass rounded-2xl p-6 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2 tracking-tight"><AnimatedNumber value={item.value} /></p>
              </div>
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <item.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border/30">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 w-full max-w-md focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Cari jadwal..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {["No", "Mata Pelajaran", "Hari", "Kelas", "Jenjang", "Waktu"].map((h) => (
                  <th key={h} className="text-left py-4 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-muted-foreground">Tidak ada jadwal mengajar</td></tr>
              ) : (
                filtered.map((row, i) => (
                  <motion.tr key={row.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }}
                    className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-5"><span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{i + 1}</span></td>
                    <td className="py-4 px-5">
                      <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 text-primary" /><span className="text-foreground">{row.subject}</span></span>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${dayColors[row.day] || "bg-muted text-foreground"}`}>{row.day}</span>
                    </td>
                    <td className="py-4 px-5"><span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span></td>
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${row.level === "SMP" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" : "bg-violet-500/10 text-violet-600 border-violet-500/20"}`}>{row.level}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="flex items-center gap-1.5 font-mono text-xs text-foreground"><Clock className="h-3.5 w-3.5 text-muted-foreground" />{row.time_start} - {row.time_end}</span>
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
