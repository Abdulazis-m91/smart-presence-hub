import { motion } from "framer-motion";
import { Search, ClipboardCheck, Clock, UserX, CalendarDays, Users, Loader2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAbsensi } from "@/hooks/use-data";
import { useAuth } from "@/lib/auth-context";

const statusColors: Record<string, string> = {
  "Tepat Waktu": "bg-secondary/10 text-secondary border border-secondary/20",
  Hadir: "bg-secondary/10 text-secondary border border-secondary/20",
  Terlambat: "bg-destructive/10 text-destructive border border-destructive/20",
  "Tidak Hadir": "bg-muted text-muted-foreground border border-border",
  Izin: "bg-accent text-accent-foreground border border-border",
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

export default function GuruAbsenPage() {
  const { user } = useAuth();
  const { data: absensi = [], isLoading } = useAbsensi();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua Status");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Filter siswa attendance records (teacher views their students' attendance)
  const studentRecords = absensi.filter((a) => a.role === "Siswa");

  const filtered = useMemo(() => {
    return studentRecords.filter((r) => {
      const matchSearch = !searchQuery || r.person_name.toLowerCase().includes(searchQuery.toLowerCase()) || r.person_id.includes(searchQuery);
      const matchStatus = selectedStatus === "Semua Status" || r.status === selectedStatus;
      const matchDate = !selectedDate || r.date === format(selectedDate, "yyyy-MM-dd");
      return matchSearch && matchStatus && matchDate;
    });
  }, [studentRecords, searchQuery, selectedStatus, selectedDate]);

  const counts = useMemo(() => ({
    total: studentRecords.length,
    tepatWaktu: studentRecords.filter((r) => r.status === "Hadir" || r.status === "Tepat Waktu").length,
    terlambat: studentRecords.filter((r) => r.status === "Terlambat").length,
    tidakHadir: studentRecords.filter((r) => r.status === "Tidak Hadir" || r.status === "Izin").length,
  }), [studentRecords]);

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Absensi Siswa</h1>
        <p className="text-muted-foreground mt-1">Data absensi siswa dari mesin RFID</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Siswa", value: counts.total, gradient: "from-blue-500 to-cyan-500" },
          { icon: ClipboardCheck, label: "Tepat Waktu", value: counts.tepatWaktu, gradient: "from-emerald-500 to-teal-500" },
          { icon: Clock, label: "Terlambat", value: counts.terlambat, gradient: "from-orange-500 to-amber-500" },
          { icon: UserX, label: "Tidak Hadir", value: counts.tidakHadir, gradient: "from-rose-500 to-red-500" },
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

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border/30">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 flex-1 max-w-md focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Cari nama siswa atau NISN..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button className={cn("flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/20 text-sm transition-all focus:ring-2 focus:ring-primary/20",
                  selectedDate ? "text-foreground" : "text-muted-foreground")}>
                  <CalendarDays className="h-4 w-4" />
                  {selectedDate ? format(selectedDate, "dd MMM yyyy", { locale: localeId }) : "Filter Tanggal"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className={cn("p-3 pointer-events-auto")} />
                {selectedDate && (
                  <div className="px-3 pb-3">
                    <button onClick={() => setSelectedDate(undefined)} className="w-full text-xs text-muted-foreground hover:text-foreground py-2 rounded-lg hover:bg-muted/50 transition-colors">Reset tanggal</button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 rounded-xl bg-muted/20 text-sm text-foreground bg-transparent outline-none cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all">
              <option value="Semua Status" className="bg-background text-foreground">Semua Status</option>
              <option value="Hadir" className="bg-background text-foreground">Hadir</option>
              <option value="Terlambat" className="bg-background text-foreground">Terlambat</option>
              <option value="Tidak Hadir" className="bg-background text-foreground">Tidak Hadir</option>
              <option value="Izin" className="bg-background text-foreground">Izin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {["No", "ID", "Nama Siswa", "Mapel", "Kelas", "Jam Masuk", "Status"].map((h) => (
                  <th key={h} className="text-left py-4 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-12 text-center text-muted-foreground">Tidak ada data absensi ditemukan</td></tr>
              ) : (
                filtered.map((row, i) => (
                  <motion.tr key={row.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.03 }}
                    className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-5"><span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{i + 1}</span></td>
                    <td className="py-4 px-5 font-mono text-xs text-foreground">{row.person_id}</td>
                    <td className="py-4 px-5 font-medium text-foreground">{row.person_name}</td>
                    <td className="py-4 px-5 text-foreground">{row.subject}</td>
                    <td className="py-4 px-5"><span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span></td>
                    <td className="py-4 px-5"><span className="flex items-center gap-1.5 font-mono text-xs text-foreground"><Clock className="h-3.5 w-3.5 text-muted-foreground" />{row.check_in}</span></td>
                    <td className="py-4 px-5"><span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[row.status] || ""}`}>{row.status}</span></td>
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
