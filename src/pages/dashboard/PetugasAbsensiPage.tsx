import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Clock, Users, Maximize, Minimize, RefreshCw, Loader2 } from "lucide-react";
import { useAbsensi } from "@/hooks/use-data";
import { format } from "date-fns";

type RoleFilter = "all" | "Guru" | "Siswa";
type StatusFilter = "all" | "Hadir" | "Terlambat" | "Izin" | "Tidak Hadir";

const roleGradients: Record<string, string> = {
  Guru: "from-violet-500 to-purple-500",
  Siswa: "from-blue-500 to-cyan-500",
};

const statusStyles: Record<string, string> = {
  Hadir: "bg-secondary/10 text-secondary border-secondary/20",
  Terlambat: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Izin: "bg-destructive/10 text-destructive border-destructive/20",
  "Tidak Hadir": "bg-muted text-muted-foreground border-border",
};

const classes = ["X-A", "X-B", "XI-A", "XI-B", "XII-A", "XII-B", "VII-A", "VII-B", "VIII-A", "VIII-B", "IX-A", "IX-B"];

export default function PetugasAbsensiPage() {
  const { data: absensi = [], isLoading } = useAbsensi();
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");
  const todayData = absensi.filter((a) => a.date === today);

  const toggleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
    setIsFullScreen((prev) => !prev);
  }, [isFullScreen]);

  const filtered = todayData
    .filter((row) => {
      const matchSearch = !search || row.person_name.toLowerCase().includes(search.toLowerCase()) || row.person_id.includes(search);
      const matchClass = !classFilter || row.class === classFilter;
      const matchRole = roleFilter === "all" || row.role === roleFilter;
      const matchStatus = statusFilter === "all" || row.status === statusFilter;
      return matchSearch && matchClass && matchRole && matchStatus;
    });

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  const renderTable = (data: typeof filtered, showAnimation = true) => (
    <table className="w-full text-sm">
      <thead>
        <tr className={isFullScreen ? "bg-muted/50" : "bg-muted/30"}>
          {["No", "Foto", "Nama Lengkap", "Kelas", "Role", "Check-in", "Status"].map((h) => (
            <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={7} className="py-12 text-center text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Belum ada data absensi hari ini</p>
            </td>
          </tr>
        ) : (
          data.map((row, i) => {
            const Wrapper = showAnimation ? motion.tr : "tr" as any;
            return (
              <Wrapper
                key={row.id}
                {...(showAnimation ? { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.03 * i } } : {})}
                className="border-t border-border/30 hover:bg-muted/20 transition-colors"
              >
                <td className="py-3.5 px-5">
                  <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{i + 1}</span>
                </td>
                <td className="py-3.5 px-5">
                  <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${roleGradients[row.role] || "from-gray-500 to-gray-600"} flex items-center justify-center text-white font-bold text-xs`}>
                    {row.person_name.charAt(0)}{row.person_name.split(" ")[1]?.charAt(0) || ""}
                  </div>
                </td>
                <td className="py-3.5 px-5 font-medium text-foreground">{row.person_name}</td>
                <td className="py-3.5 px-5">
                  <span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span>
                </td>
                <td className="py-3.5 px-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    row.role === "Guru" ? "bg-violet-500/10 text-violet-600 border-violet-500/20" : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                  }`}>{row.role}</span>
                </td>
                <td className="py-3.5 px-5">
                  <span className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {row.check_in}
                  </span>
                </td>
                <td className="py-3.5 px-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[row.status] || ""}`}>{row.status}</span>
                </td>
              </Wrapper>
            );
          })
        )}
      </tbody>
    </table>
  );

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 border-b border-border/30 bg-muted/10 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-foreground">Absensi Real-Time</h1>
          </div>
          <button onClick={toggleFullScreen} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30 text-sm font-medium text-foreground hover:bg-muted/50 transition-all">
            <Minimize className="h-4 w-4" />Keluar
          </button>
        </div>
        <div className="flex-1 overflow-auto">{renderTable(filtered, false)}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Absensi Siswa & Guru</h1>
          <p className="text-muted-foreground mt-1">Pemantauan check-in RFID real-time — data otomatis dari perangkat</p>
        </div>
        <button onClick={toggleFullScreen} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium text-foreground hover:ring-2 hover:ring-primary/20 transition-all shrink-0">
          <Maximize className="h-4 w-4" />
          <span className="hidden sm:inline">Full Screen</span>
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border/30">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/30 flex-1 min-w-[200px] max-w-md focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input type="text" placeholder="Cari nama atau ID..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
            </div>
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
              <option value="">Semua Kelas</option>
              <option value="Guru">Guru</option>
              {classes.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
              className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
              <option value="all">Semua Role</option>
              <option value="Guru">Guru</option>
              <option value="Siswa">Siswa</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
              <option value="all">Semua Status</option>
              <option value="Hadir">Hadir</option>
              <option value="Terlambat">Terlambat</option>
              <option value="Izin">Izin</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
            <Filter className="h-4 w-4" />
            <span>Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> dari {todayData.length} data</span>
          </div>
        </div>
        <div className="overflow-x-auto">{renderTable(filtered)}</div>
      </motion.div>
    </div>
  );
}
