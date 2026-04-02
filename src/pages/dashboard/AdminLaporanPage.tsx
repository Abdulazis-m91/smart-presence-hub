import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, Clock, Search, BarChart3, Download, UserCheck, AlertTriangle, UserX, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAbsensi } from "@/hooks/use-data";

const statusStyles: Record<string, string> = {
  Hadir: "bg-secondary/10 text-secondary border border-secondary/20",
  Terlambat: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  Izin: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
  "Tidak Hadir": "bg-destructive/10 text-destructive border border-destructive/20",
};

const smpClasses = ["VII-A", "VII-B", "VIII-A", "VIII-B", "IX-A", "IX-B"];
const smaClasses = ["X-A", "X-B", "XI-A", "XI-B", "XII-A", "XII-B"];

export default function AdminLaporanPage() {
  const { data: records = [], isLoading } = useAbsensi();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const selectedDateStr = date ? format(date, "yyyy-MM-dd") : "";
  const availableClasses = levelFilter === "SMP" ? smpClasses : levelFilter === "SMA" ? smaClasses : [...smpClasses, ...smaClasses];

  const filtered = records.filter((row) => {
    const matchDate = !selectedDateStr || row.date === selectedDateStr;
    const matchSearch = !search || row.person_name.toLowerCase().includes(search.toLowerCase()) || row.person_id.includes(search);
    const matchLevel = !levelFilter || row.level === levelFilter;
    const matchClass = !classFilter || row.class === classFilter;
    const matchRole = !roleFilter || row.role === roleFilter;
    const matchStatus = !statusFilter || row.status === statusFilter;
    return matchDate && matchSearch && matchLevel && matchClass && matchRole && matchStatus;
  });

  const totalHadir = filtered.filter((r) => r.status === "Hadir").length;
  const totalTerlambat = filtered.filter((r) => r.status === "Terlambat").length;
  const totalIzin = filtered.filter((r) => r.status === "Izin").length;
  const totalTidakHadir = filtered.filter((r) => r.status === "Tidak Hadir").length;

  const summaryCards = [
    { label: "Hadir", value: totalHadir, icon: UserCheck, gradient: "from-emerald-500 to-teal-500" },
    { label: "Terlambat", value: totalTerlambat, icon: AlertTriangle, gradient: "from-amber-500 to-orange-500" },
    { label: "Tidak Hadir", value: totalTidakHadir, icon: UserX, gradient: "from-rose-500 to-red-500" },
    { label: "Izin", value: totalIzin, icon: UserX, gradient: "from-blue-500 to-cyan-500" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Laporan Kehadiran</h1>
          <p className="text-muted-foreground mt-1">Riwayat kehadiran siswa, guru & staff</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shrink-0 shadow-lg shadow-primary/20">
          <Download className="h-4 w-4" /><span className="hidden sm:inline">Export PDF</span>
        </button>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="group relative glass rounded-2xl p-5 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{s.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1 tracking-tight">{s.value}</p>
              </div>
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <s.icon className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border/30 space-y-3">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/30 flex-1 min-w-[200px] max-w-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input type="text" placeholder="Cari nama atau ID..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/30 text-sm font-medium transition-all hover:ring-2 hover:ring-primary/20 shrink-0", !date && "text-muted-foreground")}>
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "dd MMM yyyy", { locale: localeId }) : "Semua Tanggal"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className={cn("p-3 pointer-events-auto")} />
              </PopoverContent>
            </Popover>
            {date && <button onClick={() => setDate(undefined)} className="px-3 py-2.5 rounded-xl bg-muted/30 text-xs text-muted-foreground hover:text-foreground transition-all shrink-0">Reset Tanggal</button>}
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer shrink-0">
              <option value="">Semua Role</option>
              <option value="Siswa">Siswa</option>
              <option value="Guru">Guru</option>
              <option value="Staff">Staff</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer shrink-0">
              <option value="">Semua Status</option>
              <option value="Hadir">Hadir</option>
              <option value="Terlambat">Terlambat</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
              <option value="Izin">Izin</option>
            </select>
            <select value={levelFilter} onChange={(e) => { setLevelFilter(e.target.value); setClassFilter(""); }} className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer shrink-0">
              <option value="">Semua Jenjang</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
            </select>
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} disabled={!levelFilter}
              className={cn("px-4 py-2.5 rounded-xl bg-muted/30 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer shrink-0", !levelFilter ? "text-muted-foreground/50 cursor-not-allowed opacity-50" : "text-foreground")}>
              <option value="">Semua Kelas</option>
              {availableClasses.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {["No", "Nama", "ID", "Role", "Mapel", "Jenjang", "Kelas", "Tanggal", "Masuk", "Keluar", "Kehadiran"].map((h) => (
                  <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <motion.tr key={row.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.03 }}
                  className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3.5 px-5"><span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{i + 1}</span></td>
                  <td className="py-3.5 px-5 font-medium text-foreground whitespace-nowrap">{row.person_name}</td>
                  <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{row.person_id}</td>
                  <td className="py-3.5 px-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      row.role === "Guru" ? "bg-secondary/10 text-secondary border-secondary/20"
                      : row.role === "Siswa" ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                      : "bg-violet-500/10 text-violet-600 border-violet-500/20"
                    }`}>{row.role}</span>
                  </td>
                  <td className="py-3.5 px-5 text-foreground">{row.subject}</td>
                  <td className="py-3.5 px-5">
                    {row.level !== "-" ? (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${row.level === "SMP" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" : "bg-violet-500/10 text-violet-600 border-violet-500/20"}`}>{row.level}</span>
                    ) : <span className="text-muted-foreground">-</span>}
                  </td>
                  <td className="py-3.5 px-5"><span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span></td>
                  <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{row.date}</td>
                  <td className="py-3.5 px-5"><span className="flex items-center gap-1.5 font-mono text-xs text-foreground"><Clock className="h-3.5 w-3.5 text-muted-foreground" />{row.check_in}</span></td>
                  <td className="py-3.5 px-5"><span className="flex items-center gap-1.5 font-mono text-xs text-foreground"><Clock className="h-3.5 w-3.5 text-muted-foreground" />{row.check_out}</span></td>
                  <td className="py-3.5 px-5"><span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[row.status] || ""}`}>{row.status}</span></td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={11} className="py-12 text-center text-muted-foreground">
                  <BarChart3 className="h-10 w-10 mx-auto mb-3 opacity-30" /><p className="font-medium">Tidak ada data kehadiran</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
