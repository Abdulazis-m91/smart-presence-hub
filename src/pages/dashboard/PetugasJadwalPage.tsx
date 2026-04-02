import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users, Loader2 } from "lucide-react";
import { useJadwal } from "@/hooks/use-data";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const dayColors: Record<string, string> = {
  Senin: "from-blue-500 to-cyan-500",
  Selasa: "from-emerald-500 to-teal-500",
  Rabu: "from-violet-500 to-purple-500",
  Kamis: "from-orange-500 to-amber-500",
  Jumat: "from-rose-500 to-red-500",
  Sabtu: "from-indigo-500 to-blue-500",
};

export default function PetugasJadwalPage() {
  const [tab, setTab] = useState<"smp" | "sma">("smp");
  const { data: jadwal = [], isLoading } = useJadwal();

  const smpLevels = ["SMP"];
  const smaLevels = ["SMA"];
  const filteredJadwal = jadwal.filter((j) =>
    tab === "smp" ? smpLevels.includes(j.level) : smaLevels.includes(j.level)
  );

  const scheduleByDay: Record<string, typeof filteredJadwal> = {};
  days.forEach((d) => {
    scheduleByDay[d] = filteredJadwal.filter((j) => j.day === d);
  });

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Daftar Mengajar</h1>
        <p className="text-muted-foreground mt-1">Jadwal mengajar guru per hari — SMP & SMA</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex rounded-xl glass overflow-hidden w-fit">
        {(["smp", "sma"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-6 py-2.5 text-sm font-semibold transition-all ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
            {t.toUpperCase()}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {days.map((day, dayIdx) => {
          const items = scheduleByDay[day] || [];
          return (
            <motion.div key={`${tab}-${day}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + dayIdx * 0.06 }}
              className="glass rounded-2xl overflow-hidden">
              <div className={`bg-gradient-to-r ${dayColors[day]} px-5 py-3.5`}>
                <h3 className="font-bold text-white text-base uppercase tracking-wide">{day}</h3>
                <p className="text-white/80 text-xs mt-0.5 flex items-center gap-1">
                  <Users className="h-3 w-3" />{items.length} guru mengajar
                </p>
              </div>
              <div className="divide-y divide-border/30">
                {items.length === 0 ? (
                  <div className="p-5 text-center text-muted-foreground text-sm">Tidak ada jadwal</div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/10 transition-colors">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{item.teacher_name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.subject}</p>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <p className="text-sm font-medium text-foreground">{item.class}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 justify-end">
                          <Clock className="h-3 w-3" />{item.time_start} - {item.time_end}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
