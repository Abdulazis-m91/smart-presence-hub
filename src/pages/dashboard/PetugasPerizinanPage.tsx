import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, UserCheck, TrendingUp, FileText, Download, Clock } from "lucide-react";

const summaryCards = [
  { label: "Guru Terjadwal Hari Ini", value: "32", icon: Users, gradient: "from-blue-500 to-cyan-500" },
  { label: "Guru Izin", value: "4", icon: FileText, gradient: "from-rose-500 to-red-500" },
  { label: "Kehadiran Guru", value: "87.5%", icon: TrendingUp, gradient: "from-emerald-500 to-teal-500" },
];

const permissionList = [
  { no: 1, photo: "HB", name: "Hasan Basri", nip: "198601052010011005", subject: "Kimia", class: "XII-A, XI-B", reason: "Sakit demam tinggi", file: "surat_sakit_hasan.pdf" },
  { no: 2, photo: "LK", name: "Lina Kartika", nip: "199108152013012008", subject: "Geografi", class: "X-A, X-B", reason: "Keperluan keluarga", file: "surat_izin_lina.pdf" },
  { no: 3, photo: "JP", name: "Joko Prasetyo", nip: "198804102012011009", subject: "Penjaskes", class: "XI-A, XII-B", reason: "Pelatihan luar kota", file: "surat_tugas_joko.pdf" },
  { no: 4, photo: "MA", name: "Maya Anggraini", nip: "199305202014012010", subject: "Seni Budaya", class: "X-A", reason: "Acara keluarga", file: "surat_izin_maya.pdf" },
];

export default function PetugasPerizinanPage() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const classes = ["X-A", "X-B", "XI-A", "XI-B", "XII-A", "XII-B"];

  const filtered = permissionList.filter((row) => {
    const matchSearch = !search || row.name.toLowerCase().includes(search.toLowerCase()) || row.nip.includes(search);
    const matchClass = !classFilter || row.class.includes(classFilter);
    return matchSearch && matchClass;
  });

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Perizinan Guru</h1>
        <p className="text-muted-foreground mt-1">Daftar guru yang izin hari ini — disetujui otomatis</p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
                <p className="text-3xl font-bold text-foreground mt-2 tracking-tight">{s.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <s.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex flex-wrap gap-3"
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass flex-1 min-w-[200px] max-w-md focus-within:ring-2 focus-within:ring-primary/20 transition-all">
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
          className="px-4 py-2.5 rounded-xl glass text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
        >
          <option value="">Semua Kelas</option>
          {classes.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {["No", "Foto", "Nama Guru", "Mapel", "Kelas", "Alasan", "File Tugas"].map((h) => (
                  <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <motion.tr
                  key={row.no}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-3.5 px-5">
                    <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{row.no}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center text-white font-bold text-xs">
                      {row.photo}
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <p className="font-medium text-foreground">{row.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">{row.nip}</p>
                  </td>
                  <td className="py-3.5 px-5 text-foreground">{row.subject}</td>
                  <td className="py-3.5 px-5">
                    <span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span>
                  </td>
                  <td className="py-3.5 px-5 text-foreground max-w-[200px]">
                    <p className="truncate">{row.reason}</p>
                  </td>
                  <td className="py-3.5 px-5">
                    <button className="flex items-center gap-1.5 text-primary hover:text-primary/80 text-xs font-medium transition-colors group">
                      <Download className="h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform" />
                      {row.file}
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    <UserCheck className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Semua guru hadir hari ini</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        Izin disetujui secara otomatis — tidak memerlukan alur persetujuan
      </p>
    </div>
  );
}
