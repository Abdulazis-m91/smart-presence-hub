import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, Clock } from "lucide-react";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const dayColors: Record<string, string> = {
  Senin: "from-blue-500 to-cyan-500",
  Selasa: "from-emerald-500 to-teal-500",
  Rabu: "from-violet-500 to-purple-500",
  Kamis: "from-orange-500 to-amber-500",
  Jumat: "from-rose-500 to-red-500",
  Sabtu: "from-indigo-500 to-blue-500",
};

interface ScheduleItem {
  teacher: string;
  subject: string;
  class: string;
  time: string;
}

const smpSchedule: Record<string, ScheduleItem[]> = {
  Senin: [
    { teacher: "Ahmad Fauzi", subject: "Matematika", class: "VII-A", time: "07:00 - 08:30" },
    { teacher: "Siti Rahmawati", subject: "B. Indonesia", class: "VIII-B", time: "07:00 - 08:30" },
    { teacher: "Dewi Lestari", subject: "IPA", class: "IX-A", time: "08:30 - 10:00" },
    { teacher: "Rina Marlina", subject: "B. Inggris", class: "VII-B", time: "10:15 - 11:45" },
  ],
  Selasa: [
    { teacher: "Agus Wijaya", subject: "IPS", class: "VIII-A", time: "07:00 - 08:30" },
    { teacher: "Ahmad Fauzi", subject: "Matematika", class: "IX-B", time: "08:30 - 10:00" },
    { teacher: "Budi Santoso", subject: "IPA", class: "VII-A", time: "10:15 - 11:45" },
  ],
  Rabu: [
    { teacher: "Siti Rahmawati", subject: "B. Indonesia", class: "VII-A", time: "07:00 - 08:30" },
    { teacher: "Rina Marlina", subject: "B. Inggris", class: "IX-A", time: "08:30 - 10:00" },
  ],
  Kamis: [
    { teacher: "Dewi Lestari", subject: "IPA", class: "VIII-B", time: "07:00 - 08:30" },
    { teacher: "Agus Wijaya", subject: "IPS", class: "IX-B", time: "08:30 - 10:00" },
    { teacher: "Ahmad Fauzi", subject: "Matematika", class: "VII-B", time: "10:15 - 11:45" },
  ],
  Jumat: [
    { teacher: "Budi Santoso", subject: "IPA", class: "IX-A", time: "07:00 - 08:30" },
    { teacher: "Siti Rahmawati", subject: "B. Indonesia", class: "VIII-A", time: "08:30 - 10:00" },
  ],
  Sabtu: [
    { teacher: "Rina Marlina", subject: "B. Inggris", class: "VIII-B", time: "07:00 - 08:30" },
  ],
};

const smaSchedule: Record<string, ScheduleItem[]> = {
  Senin: [
    { teacher: "Hasan Basri", subject: "Kimia", class: "XII-A", time: "07:00 - 08:30" },
    { teacher: "Lina Kartika", subject: "Geografi", class: "X-A", time: "07:00 - 08:30" },
    { teacher: "Joko Prasetyo", subject: "Penjaskes", class: "XI-A", time: "08:30 - 10:00" },
    { teacher: "Maya Anggraini", subject: "Seni Budaya", class: "X-B", time: "10:15 - 11:45" },
  ],
  Selasa: [
    { teacher: "Hasan Basri", subject: "Kimia", class: "XI-B", time: "07:00 - 08:30" },
    { teacher: "Lina Kartika", subject: "Geografi", class: "XII-B", time: "08:30 - 10:00" },
    { teacher: "Maya Anggraini", subject: "Seni Budaya", class: "XI-A", time: "10:15 - 11:45" },
  ],
  Rabu: [
    { teacher: "Joko Prasetyo", subject: "Penjaskes", class: "XII-A", time: "07:00 - 08:30" },
    { teacher: "Hasan Basri", subject: "Kimia", class: "X-A", time: "08:30 - 10:00" },
  ],
  Kamis: [
    { teacher: "Lina Kartika", subject: "Geografi", class: "XI-A", time: "07:00 - 08:30" },
    { teacher: "Maya Anggraini", subject: "Seni Budaya", class: "XII-B", time: "08:30 - 10:00" },
    { teacher: "Joko Prasetyo", subject: "Penjaskes", class: "X-B", time: "10:15 - 11:45" },
  ],
  Jumat: [
    { teacher: "Hasan Basri", subject: "Kimia", class: "XI-A", time: "07:00 - 08:30" },
    { teacher: "Lina Kartika", subject: "Geografi", class: "X-B", time: "08:30 - 10:00" },
  ],
  Sabtu: [
    { teacher: "Joko Prasetyo", subject: "Penjaskes", class: "XII-B", time: "07:00 - 08:30" },
  ],
};

export default function PetugasJadwalPage() {
  const [tab, setTab] = useState<"smp" | "sma">("smp");
  const schedule = tab === "smp" ? smpSchedule : smaSchedule;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Daftar Mengajar</h1>
        <p className="text-muted-foreground mt-1">Jadwal mengajar guru per hari — SMP & SMA</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex rounded-xl glass overflow-hidden w-fit"
      >
        {(["smp", "sma"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2.5 text-sm font-semibold transition-all relative ${
              tab === t
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </motion.div>

      {/* Schedule by day */}
      <div className="space-y-6">
        {days.map((day, dayIdx) => {
          const items = schedule[day] || [];
          if (items.length === 0) return null;

          return (
            <motion.div
              key={`${tab}-${day}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + dayIdx * 0.06 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${dayColors[day]} px-6 py-3 flex items-center gap-2`}>
                <Calendar className="h-4 w-4 text-white" />
                <h3 className="font-bold text-white">{day}</h3>
                <span className="ml-auto text-white/80 text-xs font-medium">{items.length} sesi</span>
              </div>
              <div className="divide-y divide-border/30">
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + dayIdx * 0.06 + i * 0.03 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-muted/20 transition-colors"
                  >
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${dayColors[day]} bg-opacity-10 flex items-center justify-center shrink-0`}>
                      <span className="text-white font-bold text-sm">{item.teacher.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{item.teacher}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <BookOpen className="h-3 w-3" /> {item.subject}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium shrink-0">{item.class}</span>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground shrink-0">
                      <Clock className="h-3.5 w-3.5" /> {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
