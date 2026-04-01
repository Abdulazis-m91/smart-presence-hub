import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, Clock, Search, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const attendanceRecords = [
  { no: 1, name: "Ahmad Fauzi", nip: "198501012010011001", subject: "Matematika", date: "2026-04-01", checkIn: "06:45", checkOut: "14:00", status: "Hadir" },
  { no: 2, name: "Siti Rahmawati", nip: "198703152011012002", subject: "B. Indonesia", date: "2026-04-01", checkIn: "06:52", checkOut: "14:05", status: "Hadir" },
  { no: 3, name: "Budi Santoso", nip: "199005202012011003", subject: "Fisika", date: "2026-04-01", checkIn: "07:18", checkOut: "14:00", status: "Terlambat" },
  { no: 4, name: "Dewi Lestari", nip: "198812102013012004", subject: "Biologi", date: "2026-04-01", checkIn: "06:48", checkOut: "14:10", status: "Hadir" },
  { no: 5, name: "Hasan Basri", nip: "198601052010011005", subject: "Kimia", date: "2026-04-01", checkIn: "-", checkOut: "-", status: "Izin" },
  { no: 6, name: "Rina Marlina", nip: "199203102014012006", subject: "B. Inggris", date: "2026-04-01", checkIn: "06:55", checkOut: "14:00", status: "Hadir" },
  { no: 7, name: "Agus Wijaya", nip: "198709202011011007", subject: "Sejarah", date: "2026-03-31", checkIn: "06:50", checkOut: "14:00", status: "Hadir" },
  { no: 8, name: "Lina Kartika", nip: "199108152013012008", subject: "Geografi", date: "2026-03-31", checkIn: "-", checkOut: "-", status: "Izin" },
  { no: 9, name: "Joko Prasetyo", nip: "198804102012011009", subject: "Penjaskes", date: "2026-03-31", checkIn: "07:20", checkOut: "13:30", status: "Terlambat" },
  { no: 10, name: "Maya Anggraini", nip: "199305202014012010", subject: "Seni Budaya", date: "2026-03-31", checkIn: "06:47", checkOut: "14:00", status: "Hadir" },
];

const statusStyles: Record<string, string> = {
  Hadir: "bg-secondary/10 text-secondary border border-secondary/20",
  Terlambat: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  Izin: "bg-destructive/10 text-destructive border border-destructive/20",
};

export default function PetugasLaporanPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [search, setSearch] = useState("");

  const selectedDateStr = date ? format(date, "yyyy-MM-dd") : "";

  const filtered = attendanceRecords.filter((row) => {
    const matchDate = !selectedDateStr || row.date === selectedDateStr;
    const matchSearch = !search || row.name.toLowerCase().includes(search.toLowerCase()) || row.nip.includes(search);
    return matchDate && matchSearch;
  });

  const totalHadir = filtered.filter((r) => r.status === "Hadir").length;
  const totalTerlambat = filtered.filter((r) => r.status === "Terlambat").length;
  const totalIzin = filtered.filter((r) => r.status === "Izin").length;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Laporan Kehadiran</h1>
        <p className="text-muted-foreground mt-1">Riwayat kehadiran guru berdasarkan tanggal</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3 items-center"
      >
        <Popover>
          <PopoverTrigger asChild>
            <button className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium transition-all hover:ring-2 hover:ring-primary/20",
              !date && "text-muted-foreground"
            )}>
              <CalendarIcon className="h-4 w-4" />
              {date ? format(date, "dd MMMM yyyy", { locale: localeId }) : "Pilih tanggal"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass flex-1 min-w-[200px] max-w-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Cari nama atau NIP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
          />
        </div>
      </motion.div>

      {/* Quick stats for filtered results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-3 gap-4"
      >
        {[
          { label: "Hadir", value: totalHadir, color: "text-secondary" },
          { label: "Terlambat", value: totalTerlambat, color: "text-amber-600" },
          { label: "Izin", value: totalIzin, color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {["No", "Nama Guru", "NIP", "Mapel", "Tanggal", "Jam Masuk", "Jam Keluar", "Status"].map((h) => (
                  <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <motion.tr
                  key={`${row.no}-${row.date}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.03 }}
                  className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-3.5 px-5">
                    <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{row.no}</span>
                  </td>
                  <td className="py-3.5 px-5 font-medium text-foreground">{row.name}</td>
                  <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{row.nip}</td>
                  <td className="py-3.5 px-5 text-foreground">{row.subject}</td>
                  <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{row.date}</td>
                  <td className="py-3.5 px-5">
                    <span className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />{row.checkIn}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />{row.checkOut}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>{row.status}</span>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    <BarChart3 className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Tidak ada data untuk tanggal ini</p>
                    <p className="text-xs mt-1">Pilih tanggal lain untuk melihat laporan</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
