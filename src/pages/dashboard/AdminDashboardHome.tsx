import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, ClipboardCheck, Shield, Clock, XCircle, Loader2 } from "lucide-react";
import { useGuru, useSiswa, useAbsensi, useProfiles } from "@/hooks/use-data";
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

const statusStyles: Record<string, string> = {
  Hadir: "bg-secondary/10 text-secondary border border-secondary/20",
  Terlambat: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
};

export default function AdminDashboardHome() {
  const { data: guru = [], isLoading: loadingGuru } = useGuru();
  const { data: siswa = [], isLoading: loadingSiswa } = useSiswa();
  const { data: absensi = [], isLoading: loadingAbsensi } = useAbsensi();
  const { data: profiles = [], isLoading: loadingProfiles } = useProfiles();

  const isLoading = loadingGuru || loadingSiswa || loadingAbsensi || loadingProfiles;

  const today = format(new Date(), "yyyy-MM-dd");
  const todayAttendance = absensi.filter((a) => a.date === today && a.role === "Guru");
  const absentToday = absensi.filter((a) => a.date === today && a.role === "Guru" && (a.status === "Izin" || a.status === "Tidak Hadir"));

  const totalGuruAktif = guru.filter((g) => g.status === "Aktif").length;
  const totalSiswaAktif = siswa.length;
  const totalPetugas = profiles.filter((p) => p.role === "petugas").length;
  const totalStaff = profiles.filter((p) => p.role === "admin").length;

  const summaryCards = [
    { label: "Total Guru Aktif", value: totalGuruAktif, icon: Users, gradient: "from-blue-500 to-cyan-500" },
    { label: "Total Staff Aktif", value: totalStaff, icon: Shield, gradient: "from-violet-500 to-purple-500" },
    { label: "Total Siswa Aktif", value: totalSiswaAktif, icon: UserCheck, gradient: "from-emerald-500 to-teal-500" },
    { label: "Petugas Piket Aktif", value: totalPetugas, icon: ClipboardCheck, gradient: "from-orange-500 to-amber-500" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Selamat Datang, Admin! 👋</h1>
        <p className="text-muted-foreground mt-1">
          Ringkasan data sekolah hari ini, {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {summaryCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group relative glass rounded-2xl p-5 sm:p-6 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{s.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground mt-2 tracking-tight">
                  <AnimatedNumber value={s.value} />
                </p>
              </div>
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <s.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass rounded-2xl overflow-hidden"
        >
          <div className="p-5 border-b border-border/30">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Kehadiran Guru Hari Ini</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{todayAttendance.length} guru sudah check-in</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/30">
                  {["No", "Foto", "Nama", "ID", "Mapel", "Jam Masuk", "Status"].map((h) => (
                    <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {todayAttendance.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-muted-foreground">
                      <ClipboardCheck className="h-10 w-10 mx-auto mb-3 opacity-30" />
                      <p className="font-medium">Belum ada data kehadiran hari ini</p>
                    </td>
                  </tr>
                ) : (
                  todayAttendance.filter(a => a.status === "Hadir" || a.status === "Terlambat").map((row, i) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.04 }}
                      className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{i + 1}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
                          {row.person_name.charAt(0)}{row.person_name.split(" ")[1]?.charAt(0) || ""}
                        </div>
                      </td>
                      <td className="py-3.5 px-5 font-medium text-foreground whitespace-nowrap">{row.person_name}</td>
                      <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{row.person_id}</td>
                      <td className="py-3.5 px-5 text-foreground">{row.subject}</td>
                      <td className="py-3.5 px-5">
                        <span className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />{row.check_in}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[row.status] || ""}`}>{row.status}</span>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
              <XCircle className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Tidak Hadir</h2>
              <p className="text-xs text-muted-foreground">{absentToday.length} guru</p>
            </div>
          </div>
          <div className="space-y-3">
            {absentToday.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <UserCheck className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">Semua guru hadir hari ini</p>
              </div>
            ) : (
              absentToday.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all border border-transparent hover:border-border/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {t.person_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{t.person_name}</p>
                      <p className="text-xs text-muted-foreground">{t.subject}</p>
                      <p className="text-[11px] text-destructive mt-0.5">{t.status}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
