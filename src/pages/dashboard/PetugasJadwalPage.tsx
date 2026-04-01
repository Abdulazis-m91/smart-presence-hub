import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";

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
    { teacher: "Agus Wijaya", subject: "IPS", class: "VIII-A", time: "10:15 - 11:45" },
    { teacher: "Budi Santoso", subject: "IPA", class: "IX-B", time: "13:00 - 14:30" },
  ],
  Selasa: [
    { teacher: "Agus Wijaya", subject: "IPS", class: "VIII-A", time: "07:00 - 08:30" },
    { teacher: "Ahmad Fauzi", subject: "Matematika", class: "IX-B", time: "08:30 - 10:00" },
    { teacher: "Budi Santoso", subject: "IPA", class: "VII-A", time: "10:15 - 11:45" },
  ],
  Rabu: [
    { teacher: "Siti Rahmawati", subject: "B. Indonesia", class: "VII-A", time: "07:00 - 08:30" },
    { teacher: "Rina Marlina", subject: "B. Inggris", class: "IX-A", time: "08:30 - 10:00" },
    { teacher: "Dewi Lestari", subject: "IPA", class: "VIII-B", time: "10:15 - 11:45" },
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
    { teacher: "Hasan Basri", subject: "Kimia", class: "XI-B", time: "10:15 - 11:45" },
    { teacher: "Lina Kartika", subject: "Geografi", class: "XII-B", time: "13:00 - 14:30" },
  ],
  Selasa: [
    { teacher: "Hasan Basri", subject: "Kimia", class: "XI-B", time: "07:00 - 08:30" },
    { teacher: "Lina Kartika", subject: "Geografi", class: "XII-B", time: "08:30 - 10:00" },
    { teacher: "Maya Anggraini", subject: "Seni Budaya", class: "XI-A", time: "10:15 - 11:45" },
  ],
  Rabu: [
    { teacher: "Joko Prasetyo", subject: "Penjaskes", class: "XII-A", time: "07:00 - 08:30" },
    { teacher: "Hasan Basri", subject: "Kimia", class: "X-A", time: "08:30 - 10:00" },
    { teacher: "Maya Anggraini", subject: "Seni Budaya", class: "X-B", time: "10:15 - 11:45" },
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
            className={`px-6 py-2.5 text-sm font-semibold transition-all ${
              tab === t
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </motion.div>

      {/* 3-column grid: Row 1 = Senin, Selasa, Rabu | Row 2 = Kamis, Jumat, Sabtu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {days.map((day, dayIdx) => {
          const items = schedule[day] || [];

          return (
            <motion.div
              key={`${tab}-${day}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + dayIdx * 0.06 }}
              className="glass rounded-2xl overflow-hidden"
            >
              {/* Day header */}
              <div className={`bg-gradient-to-r ${dayColors[day]} px-5 py-3.5`}>
                <h3 className="font-bold text-white text-base uppercase tracking-wide">{day}</h3>
                <p className="text-white/80 text-xs mt-0.5 flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {items.length} guru mengajar
                </p>
              </div>

              {/* Teacher list */}
              <div className="divide-y divide-border/30">
                {items.length === 0 ? (
                  <div className="p-5 text-center text-muted-foreground text-sm">
                    Tidak ada jadwal
                  </div>
                ) : (
                  items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/10 transition-colors">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{item.teacher}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.subject}</p>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <p className="text-sm font-medium text-foreground">{item.class}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 justify-end">
                          <Clock className="h-3 w-3" />
                          {item.time}
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
