import { motion } from "framer-motion";
import { Search, ClipboardCheck, Clock, AlertTriangle, UserX, CalendarDays } from "lucide-react";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type AttendanceStatus = "Tepat Waktu" | "Terlambat" | "Tidak Hadir";

interface AttendanceRecord {
  no: number;
  nisn: string;
  studentName: string;
  subject: string;
  teacherName: string;
  checkIn: string;
  status: AttendanceStatus;
  date: string;
}

const attendanceData: AttendanceRecord[] = [
  { no: 1, nisn: "0012345601", studentName: "Andi Pratama", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "07:02", status: "Tepat Waktu", date: "2026-03-31" },
  { no: 2, nisn: "0012345602", studentName: "Budi Santoso", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "07:05", status: "Tepat Waktu", date: "2026-03-31" },
  { no: 3, nisn: "0012345603", studentName: "Citra Dewi", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "07:18", status: "Terlambat", date: "2026-03-31" },
  { no: 4, nisn: "0012345604", studentName: "Dina Lestari", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "-", status: "Tidak Hadir", date: "2026-03-31" },
  { no: 5, nisn: "0012345605", studentName: "Eko Prasetyo", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "07:00", status: "Tepat Waktu", date: "2026-03-31" },
  { no: 6, nisn: "0012345606", studentName: "Fitri Handayani", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "07:08", status: "Tepat Waktu", date: "2026-03-31" },
  { no: 7, nisn: "0012345607", studentName: "Galih Ramadhan", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "07:25", status: "Terlambat", date: "2026-03-30" },
  { no: 8, nisn: "0012345608", studentName: "Hana Safitri", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "07:01", status: "Tepat Waktu", date: "2026-03-30" },
  { no: 9, nisn: "0012345609", studentName: "Irfan Maulana", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "-", status: "Tidak Hadir", date: "2026-03-30" },
  { no: 10, nisn: "0012345610", studentName: "Jihan Aulia", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "07:03", status: "Tepat Waktu", date: "2026-03-29" },
  { no: 11, nisn: "0012345611", studentName: "Kiki Amelia", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "07:30", status: "Terlambat", date: "2026-03-28" },
  { no: 12, nisn: "0012345612", studentName: "Lukman Hakim", subject: "Matematika", teacherName: "Ahmad Fauzi", checkIn: "07:04", status: "Tepat Waktu", date: "2026-03-28" },
];

const statusColors: Record<AttendanceStatus, string> = {
  "Tepat Waktu": "bg-secondary/10 text-secondary border border-secondary/20",
  "Terlambat": "bg-destructive/10 text-destructive border border-destructive/20",
  "Tidak Hadir": "bg-muted text-muted-foreground border border-border",
};

const statusOptions: AttendanceStatus[] = ["Tepat Waktu", "Terlambat", "Tidak Hadir"];

export default function GuruAbsenPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua Status");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filtered = useMemo(() => {
    return attendanceData.filter((r) => {
      const matchSearch =
        !searchQuery ||
        r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.nisn.includes(searchQuery);
      const matchStatus = selectedStatus === "Semua Status" || r.status === selectedStatus;
      const matchDate = !selectedDate || r.date === format(selectedDate, "yyyy-MM-dd");
      return matchSearch && matchStatus && matchDate;
    });
  }, [searchQuery, selectedStatus, selectedDate]);

  const counts = useMemo(() => ({
    tepatWaktu: attendanceData.filter((r) => r.status === "Tepat Waktu").length,
    terlambat: attendanceData.filter((r) => r.status === "Terlambat").length,
    tidakHadir: attendanceData.filter((r) => r.status === "Tidak Hadir").length,
  }), []);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Absensi Siswa</h1>
        <p className="text-muted-foreground mt-1">Data absensi siswa dari mesin RFID</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: ClipboardCheck, label: "Tepat Waktu", value: counts.tepatWaktu, gradient: "from-emerald-500 to-teal-500" },
          { icon: Clock, label: "Terlambat", value: counts.terlambat, gradient: "from-orange-500 to-amber-500" },
          { icon: UserX, label: "Tidak Hadir", value: counts.tidakHadir, gradient: "from-rose-500 to-red-500" },
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
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass flex-1 max-w-md focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari nama siswa atau NISN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
          />
        </div>

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <button className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-xl glass text-sm transition-all focus:ring-2 focus:ring-primary/20",
              selectedDate ? "text-foreground" : "text-muted-foreground"
            )}>
              <CalendarDays className="h-4 w-4" />
              {selectedDate ? format(selectedDate, "dd MMM yyyy", { locale: localeId }) : "Filter Tanggal"}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className={cn("p-3 pointer-events-auto")}
            />
            {selectedDate && (
              <div className="px-3 pb-3">
                <button
                  onClick={() => setSelectedDate(undefined)}
                  className="w-full text-xs text-muted-foreground hover:text-foreground py-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  Reset tanggal
                </button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-3 rounded-xl glass text-sm text-foreground bg-transparent outline-none cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all"
        >
          <option value="Semua Status" className="bg-background text-foreground">Semua Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s} className="bg-background text-foreground">{s}</option>
          ))}
        </select>
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
                {["No", "NISN", "Nama Siswa", "Pelajaran", "Nama Guru", "Jam Masuk", "Status"].map((h) => (
                  <th key={h} className="text-left py-4 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    Tidak ada data absensi ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <motion.tr
                    key={`${row.nisn}-${row.date}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.03 }}
                    className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-4 px-5">
                      <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{row.no}</span>
                    </td>
                    <td className="py-4 px-5 font-mono text-xs text-foreground">{row.nisn}</td>
                    <td className="py-4 px-5 font-medium text-foreground">{row.name || row.studentName}</td>
                    <td className="py-4 px-5 text-foreground">{row.subject}</td>
                    <td className="py-4 px-5 text-foreground">{row.teacherName}</td>
                    <td className="py-4 px-5">
                      <span className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {row.checkIn}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
                        {row.status}
                      </span>
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
