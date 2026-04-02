import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Users, UserCheck, TrendingUp, UserX, Download, Loader2 } from "lucide-react";
import { useAbsensi, useGuru } from "@/hooks/use-data";
import { format } from "date-fns";

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

export default function PetugasPerizinanPage() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const { data: absensi = [], isLoading: loadingAbsensi } = useAbsensi();
  const { data: guru = [], isLoading: loadingGuru } = useGuru();

  const isLoading = loadingAbsensi || loadingGuru;
  const today = format(new Date(), "yyyy-MM-dd");
  const classes = ["X-A", "X-B", "XI-A", "XI-B", "XII-A", "XII-B", "VII-A", "VII-B", "VIII-A", "VIII-B", "IX-A", "IX-B"];

  const todayGuruAbsensi = absensi.filter((a) => a.date === today && a.role === "Guru");
  const guruScheduled = guru.filter((g) => g.status === "Aktif").length;
  const guruHadir = todayGuruAbsensi.filter((a) => a.status === "Hadir" || a.status === "Terlambat").length;
  const guruIzin = todayGuruAbsensi.filter((a) => a.status === "Izin" || a.status === "Tidak Hadir");
  const kehadiranPercent = guruScheduled > 0 ? ((guruHadir / guruScheduled) * 100).toFixed(1) : "0";

  const summaryCards = [
    { label: "Guru Terjadwal Hari Ini", value: guruScheduled, icon: Users, gradient: "from-blue-500 to-cyan-500" },
    { label: "Guru Hadir Hari Ini", value: guruHadir, icon: UserCheck, gradient: "from-emerald-500 to-teal-500" },
    { label: "Guru Izin", value: guruIzin.length, icon: UserX, gradient: "from-rose-500 to-red-500" },
    { label: "Kehadiran Guru", value: `${kehadiranPercent}%`, icon: TrendingUp, gradient: "from-violet-500 to-purple-500" },
  ];

  const filtered = guruIzin.filter((row) => {
    const matchSearch = !search || row.person_name.toLowerCase().includes(search.toLowerCase()) || row.person_id.includes(search);
    const matchClass = !classFilter || row.class?.includes(classFilter);
    return matchSearch && matchClass;
  });

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Perizinan Guru</h1>
        <p className="text-muted-foreground mt-1">Daftar guru yang izin hari ini</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group relative glass rounded-2xl p-6 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2 tracking-tight">
                  {typeof s.value === "number" ? <AnimatedNumber value={s.value} /> : s.value}
                </p>
              </div>
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <s.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-rose-500 to-red-500 px-6 py-4">
          <h2 className="text-lg font-bold text-white tracking-wide">DAFTAR PERIZINAN GURU SEKOLAH</h2>
        </div>

        <div className="p-5 border-b border-border/30">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/30 flex-1 min-w-[200px] max-w-md focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Cari nama atau NIP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
              />
            </div>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="">Semua Kelas</option>
              {classes.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {["No", "Foto", "Nama Guru", "Mapel", "Kelas", "Status"].map((h) => (
                  <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-3.5 px-5">
                    <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{i + 1}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center text-white font-bold text-xs">
                      {row.person_name.charAt(0)}{row.person_name.split(" ")[1]?.charAt(0) || ""}
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <p className="font-medium text-foreground">{row.person_name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">{row.person_id}</p>
                  </td>
                  <td className="py-3.5 px-5 text-foreground">{row.subject}</td>
                  <td className="py-3.5 px-5">
                    <span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20">{row.status}</span>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <UserCheck className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Semua guru hadir hari ini</p>
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
