import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, Clock, Search, BarChart3, Download, FileText } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const attendanceRecords = [
  { no: 1, name: "Ahmad Fauzi", nip: "198501012010011001", subject: "Matematika", date: "2026-04-01", level: "SMA", class: "XII-A", checkIn: "06:45", checkOut: "14:00", status: "Hadir" },
  { no: 2, name: "Siti Rahmawati", nip: "198703152011012002", subject: "B. Indonesia", date: "2026-04-01", level: "SMP", class: "VIII-B", checkIn: "06:52", checkOut: "14:05", status: "Hadir" },
  { no: 3, name: "Budi Santoso", nip: "199005202012011003", subject: "Fisika", date: "2026-04-01", level: "SMA", class: "XI-A", checkIn: "07:18", checkOut: "14:00", status: "Terlambat" },
  { no: 4, name: "Dewi Lestari", nip: "198812102013012004", subject: "Biologi", date: "2026-04-01", level: "SMP", class: "IX-A", checkIn: "06:48", checkOut: "14:10", status: "Hadir" },
  { no: 5, name: "Hasan Basri", nip: "198601052010011005", subject: "Kimia", date: "2026-04-01", level: "SMA", class: "XII-A", checkIn: "-", checkOut: "-", status: "Izin" },
  { no: 6, name: "Rina Marlina", nip: "199203102014012006", subject: "B. Inggris", date: "2026-04-01", level: "SMP", class: "VII-A", checkIn: "06:55", checkOut: "14:00", status: "Hadir" },
  { no: 7, name: "Agus Wijaya", nip: "198709202011011007", subject: "Sejarah", date: "2026-03-31", level: "SMP", class: "VIII-A", checkIn: "06:50", checkOut: "14:00", status: "Hadir" },
  { no: 8, name: "Lina Kartika", nip: "199108152013012008", subject: "Geografi", date: "2026-03-31", level: "SMA", class: "X-A", checkIn: "-", checkOut: "-", status: "Izin" },
  { no: 9, name: "Joko Prasetyo", nip: "198804102012011009", subject: "Penjaskes", date: "2026-03-31", level: "SMA", class: "XII-B", checkIn: "07:20", checkOut: "13:30", status: "Terlambat" },
  { no: 10, name: "Maya Anggraini", nip: "199305202014012010", subject: "Seni Budaya", date: "2026-03-31", level: "SMP", class: "VII-B", checkIn: "06:47", checkOut: "14:00", status: "Hadir" },
];

const statusStyles: Record<string, string> = {
  Hadir: "bg-secondary/10 text-secondary border border-secondary/20",
  Terlambat: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  Izin: "bg-destructive/10 text-destructive border border-destructive/20",
};

const smpClasses = ["VII-A", "VII-B", "VIII-A", "VIII-B", "IX-A", "IX-B"];
const smaClasses = ["X-A", "X-B", "XI-A", "XI-B", "XII-A", "XII-B"];

export default function PetugasLaporanPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const selectedDateStr = date ? format(date, "yyyy-MM-dd") : "";

  const availableClasses = levelFilter === "SMP" ? smpClasses : levelFilter === "SMA" ? smaClasses : [...smpClasses, ...smaClasses];

  const filtered = attendanceRecords.filter((row) => {
    const matchDate = !selectedDateStr || row.date === selectedDateStr;
    const matchSearch = !search || row.name.toLowerCase().includes(search.toLowerCase()) || row.nip.includes(search);
    const matchLevel = !levelFilter || row.level === levelFilter;
    const matchClass = !classFilter || row.class === classFilter;
    return matchDate && matchSearch && matchLevel && matchClass;
  });

  const totalHadir = filtered.filter((r) => r.status === "Hadir").length;
  const totalTerlambat = filtered.filter((r) => r.status === "Terlambat").length;
  const totalIzin = filtered.filter((r) => r.status === "Izin").length;

  const handleExportPDF = () => {
    // Simulate PDF export
    const printContent = `
      <html><head><title>Laporan Kehadiran</title>
      <style>body{font-family:sans-serif;padding:20px}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #ddd;padding:8px;text-align:left;font-size:12px}th{background:#f5f5f5;font-weight:600}</style></head>
      <body><h2>Laporan Kehadiran Guru</h2>
      <p>Tanggal: ${date ? format(date, "dd MMMM yyyy", { locale: localeId }) : "Semua"} | Level: ${levelFilter || "Semua"} | Kelas: ${classFilter || "Semua"}</p>
      <table><thead><tr><th>No</th><th>Nama</th><th>NIP</th><th>Mapel</th><th>Level</th><th>Kelas</th><th>Jam Masuk</th><th>Jam Keluar</th><th>Status</th></tr></thead>
      <tbody>${filtered.map((r, i) => `<tr><td>${i + 1}</td><td>${r.name}</td><td>${r.nip}</td><td>${r.subject}</td><td>${r.level}</td><td>${r.class}</td><td>${r.checkIn}</td><td>${r.checkOut}</td><td>${r.status}</td></tr>`).join("")}</tbody></table>
      <p style="margin-top:20px;font-size:11px;color:#888">Hadir: ${totalHadir} | Terlambat: ${totalTerlambat} | Izin: ${totalIzin}</p></body></html>`;
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(printContent);
      w.document.close();
      w.print();
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Laporan Kehadiran</h1>
          <p className="text-muted-foreground mt-1">Riwayat kehadiran guru berdasarkan tanggal</p>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shrink-0 shadow-lg shadow-primary/20"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export PDF</span>
        </button>
      </motion.div>

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl overflow-hidden"
      >
        {/* Filter section inside container */}
        <div className="p-5 border-b border-border/30">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/30 flex-1 min-w-[200px] max-w-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Cari nama atau NIP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <button className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/30 text-sm font-medium transition-all hover:ring-2 hover:ring-primary/20",
                  !date && "text-muted-foreground"
                )}>
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "dd MMM yyyy", { locale: localeId }) : "Semua Tanggal"}
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

            {date && (
              <button
                onClick={() => setDate(undefined)}
                className="px-3 py-2.5 rounded-xl bg-muted/30 text-xs text-muted-foreground hover:text-foreground transition-all"
              >
                Reset Tanggal
              </button>
            )}

            <select
              value={levelFilter}
              onChange={(e) => { setLevelFilter(e.target.value); setClassFilter(""); }}
              className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="">Semua Level</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
            </select>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="">Semua Kelas</option>
              {availableClasses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 p-5 border-b border-border/30">
          {[
            { label: "Hadir", value: totalHadir, color: "text-secondary" },
            { label: "Terlambat", value: totalTerlambat, color: "text-amber-600" },
            { label: "Izin", value: totalIzin, color: "text-destructive" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-muted/20 p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Report table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {["No", "Nama Guru", "NIP", "Mapel", "Level", "Kelas", "Tanggal", "Jam Masuk", "Jam Keluar", "Status"].map((h) => (
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
                  transition={{ delay: 0.05 + i * 0.03 }}
                  className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-3.5 px-5">
                    <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{i + 1}</span>
                  </td>
                  <td className="py-3.5 px-5 font-medium text-foreground">{row.name}</td>
                  <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{row.nip}</td>
                  <td className="py-3.5 px-5 text-foreground">{row.subject}</td>
                  <td className="py-3.5 px-5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      row.level === "SMP" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" : "bg-violet-500/10 text-violet-600 border-violet-500/20"
                    }`}>{row.level}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span>
                  </td>
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
                  <td colSpan={10} className="py-12 text-center text-muted-foreground">
                    <BarChart3 className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Tidak ada data yang cocok</p>
                    <p className="text-xs mt-1">Coba ubah filter untuk melihat laporan</p>
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
