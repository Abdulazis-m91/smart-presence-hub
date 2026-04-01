import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Clock, Users, Maximize, Minimize, RefreshCw } from "lucide-react";

type RoleFilter = "all" | "guru" | "siswa";
type StatusFilter = "all" | "Tepat Waktu" | "Terlambat";

const attendanceData = [
  { no: 1, photo: "AF", name: "Ahmad Fauzi", class: "Guru", role: "Guru" as const, checkIn: "06:45", status: "Tepat Waktu" as const },
  { no: 2, photo: "SR", name: "Siti Rahmawati", class: "Guru", role: "Guru" as const, checkIn: "06:52", status: "Tepat Waktu" as const },
  { no: 3, photo: "RP", name: "Rizky Pratama", class: "XII-A", role: "Siswa" as const, checkIn: "06:55", status: "Tepat Waktu" as const },
  { no: 4, photo: "NA", name: "Nur Aisyah", class: "XI-B", role: "Siswa" as const, checkIn: "06:58", status: "Tepat Waktu" as const },
  { no: 5, photo: "BS", name: "Budi Santoso", class: "Guru", role: "Guru" as const, checkIn: "07:18", status: "Terlambat" as const },
  { no: 6, photo: "DL", name: "Dewi Lestari", class: "Guru", role: "Guru" as const, checkIn: "06:48", status: "Tepat Waktu" as const },
  { no: 7, photo: "MR", name: "Muhammad Rizal", class: "X-A", role: "Siswa" as const, checkIn: "07:22", status: "Terlambat" as const },
  { no: 8, photo: "AS", name: "Anisa Safitri", class: "XII-B", role: "Siswa" as const, checkIn: "06:50", status: "Tepat Waktu" as const },
  { no: 9, photo: "RM", name: "Rina Marlina", class: "Guru", role: "Guru" as const, checkIn: "06:55", status: "Tepat Waktu" as const },
  { no: 10, photo: "FH", name: "Fajar Hidayat", class: "XI-A", role: "Siswa" as const, checkIn: "07:15", status: "Terlambat" as const },
  { no: 11, photo: "WS", name: "Wahyu Setiawan", class: "X-B", role: "Siswa" as const, checkIn: "06:47", status: "Tepat Waktu" as const },
  { no: 12, photo: "LS", name: "Laila Sari", class: "XII-A", role: "Siswa" as const, checkIn: "06:53", status: "Tepat Waktu" as const },
];

const roleGradients: Record<string, string> = {
  Guru: "from-violet-500 to-purple-500",
  Siswa: "from-blue-500 to-cyan-500",
};

const classes = ["X-A", "X-B", "XI-A", "XI-B", "XII-A", "XII-B"];

export default function PetugasAbsensiPage() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    if (!isFullScreen) return;
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, [isFullScreen]);

  const toggleFullScreen = useCallback(() => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
    setIsFullScreen((prev) => !prev);
  }, [isFullScreen]);

  // Listen for fullscreen change events
  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const filtered = attendanceData.filter((row) => {
    const matchSearch = !search || row.name.toLowerCase().includes(search.toLowerCase()) || row.class.toLowerCase().includes(search.toLowerCase());
    const matchClass = !classFilter || row.class === classFilter;
    const matchRole = roleFilter === "all" || row.role.toLowerCase() === roleFilter;
    const matchStatus = statusFilter === "all" || row.status === statusFilter;
    return matchSearch && matchClass && matchRole && matchStatus;
  });

  return (
    <div className={`space-y-6 ${isFullScreen ? "fixed inset-0 z-50 bg-background p-6 overflow-auto" : ""}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Absensi Siswa & Guru</h1>
          <p className="text-muted-foreground mt-1">Pemantauan check-in RFID real-time — data otomatis dari perangkat</p>
        </div>
        <button
          onClick={toggleFullScreen}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium text-foreground hover:ring-2 hover:ring-primary/20 transition-all shrink-0"
        >
          {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          <span className="hidden sm:inline">{isFullScreen ? "Keluar" : "Full Screen"}</span>
        </button>
      </motion.div>

      {isFullScreen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />
          <span>Data diperbarui otomatis • Terakhir: {lastUpdate.toLocaleTimeString("id-ID")}</span>
        </motion.div>
      )}

      {/* Unified Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-4"
      >
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/30 flex-1 min-w-[200px] max-w-md focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Cari nama atau NISN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
            />
          </div>

          {/* Class filter */}
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="">Semua Kelas</option>
            <option value="Guru">Guru</option>
            {classes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Role filter */}
          <div className="flex rounded-xl bg-muted/30 overflow-hidden">
            {(["all", "guru", "siswa"] as RoleFilter[]).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-4 py-2.5 text-sm font-medium transition-all ${
                  roleFilter === r
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {r === "all" ? "Semua" : r === "guru" ? "Guru" : "Siswa"}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="Tepat Waktu">Tepat Waktu</option>
            <option value="Terlambat">Terlambat</option>
          </select>
        </div>
      </motion.div>

      {/* Results count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span>Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> dari {attendanceData.length} data</span>
      </div>

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
                {["No", "Foto", "Nama Lengkap", "Kelas", "Role", "Check-in", "Status"].map((h) => (
                  <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((row, i) => (
                  <motion.tr
                    key={row.no}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: 0.05 + i * 0.03 }}
                    className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{row.no}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${roleGradients[row.role]} flex items-center justify-center text-white font-bold text-xs`}>
                        {row.photo}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 font-medium text-foreground">{row.name}</td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        row.role === "Guru"
                          ? "bg-violet-500/10 text-violet-600 border-violet-500/20"
                          : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                      }`}>
                        {row.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {row.checkIn}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        row.status === "Tepat Waktu"
                          ? "bg-secondary/10 text-secondary border-secondary/20"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Tidak ada data yang cocok</p>
                    <p className="text-xs mt-1">Coba ubah filter pencarian</p>
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
