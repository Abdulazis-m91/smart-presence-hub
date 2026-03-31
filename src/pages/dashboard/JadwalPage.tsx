import { motion } from "framer-motion";
import { Calendar, Clock, BookOpen, Search } from "lucide-react";
import { useState } from "react";

const schedule = [
  { no: 1, name: "Ahmad Fauzi", subject: "Matematika", day: "Senin", class: "XII-A", time: "07:00 - 08:30" },
  { no: 2, name: "Ahmad Fauzi", subject: "Matematika", day: "Selasa", class: "XI-B", time: "08:30 - 10:00" },
  { no: 3, name: "Ahmad Fauzi", subject: "Matematika", day: "Rabu", class: "X-A", time: "07:00 - 08:30" },
  { no: 4, name: "Ahmad Fauzi", subject: "Matematika", day: "Kamis", class: "XII-A", time: "10:15 - 11:45" },
  { no: 5, name: "Ahmad Fauzi", subject: "Matematika", day: "Jumat", class: "XI-C", time: "07:00 - 08:30" },
];

const dayColors: Record<string, string> = {
  Senin: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Selasa: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Rabu: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  Kamis: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Jumat: "bg-rose-500/10 text-rose-600 border-rose-500/20",
};

export default function JadwalPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Jadwal Mengajar</h1>
        <p className="text-muted-foreground mt-1">Jadwal mengajar minggu ini</p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Calendar, label: "Total Jadwal", value: "5 Sesi", gradient: "from-blue-500 to-cyan-500" },
          { icon: Clock, label: "Total Jam", value: "7.5 Jam", gradient: "from-emerald-500 to-teal-500" },
          { icon: BookOpen, label: "Mata Pelajaran", value: "Matematika", gradient: "from-violet-500 to-purple-500" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="glass rounded-2xl p-5 flex items-center gap-4 group hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
          >
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
              <item.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-lg font-bold text-foreground">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl glass w-full max-w-md focus-within:ring-2 focus-within:ring-primary/20 transition-all"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari jadwal..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {["No", "Nama Lengkap", "Mata Pelajaran", "Hari", "Kelas", "Waktu"].map((h) => (
                  <th key={h} className="text-left py-4 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule
                .filter((row) => 
                  !searchQuery || 
                  row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  row.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  row.class.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((row, i) => (
                <motion.tr
                  key={row.no}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-4 px-5">
                    <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{row.no}</span>
                  </td>
                  <td className="py-4 px-5 font-medium text-foreground">{row.name}</td>
                  <td className="py-4 px-5">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-primary" />
                      <span className="text-foreground">{row.subject}</span>
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${dayColors[row.day] || "bg-muted text-foreground"}`}>
                      {row.day}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      {row.time}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
