import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, Download, Eye, Edit3, Trash2, Users, ChevronRight } from "lucide-react";

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

const studentsData = Array.from({ length: 50 }, (_, i) => ({
  no: i + 1,
  nisn: `00${3000 + i}`,
  photo: ["AS", "BR", "CD", "DW", "EF", "FG", "GH", "HI", "IJ", "JK"][i % 10],
  name: [
    "Aisyah Putri", "Bima Rizky", "Cantika Dewi", "Dani Wahyu", "Eka Fitria",
    "Farhan Ahmad", "Gita Nuraini", "Hendra Saputra", "Indah Permata", "Joko Susanto",
    "Kartika Sari", "Lukman Hakim", "Mega Wati", "Nanda Pratama", "Olivia Rahma",
    "Putra Satria", "Qori Amalia", "Raka Mahendra", "Sinta Dewi", "Taufik Hidayat",
  ][i % 20],
  level: i % 2 === 0 ? "SMP" : "SMA",
  class: ["VII-A", "VIII-B", "IX-A", "X-A", "XI-B", "XII-A"][i % 6],
  rfid: `RFID-${(1000 + i).toString().padStart(6, "0")}`,
}));

const smpClasses = ["VII-A", "VII-B", "VIII-A", "VIII-B", "IX-A", "IX-B"];
const smaClasses = ["X-A", "X-B", "XI-A", "XI-B", "XII-A", "XII-B"];

const PAGE_SIZE = 25;

export default function AdminSiswaPage() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [page, setPage] = useState(0);

  const availableClasses = levelFilter === "SMP" ? smpClasses : levelFilter === "SMA" ? smaClasses : [...smpClasses, ...smaClasses];

  const filtered = studentsData.filter((row) => {
    const matchSearch = !search || row.name.toLowerCase().includes(search.toLowerCase()) || row.nisn.includes(search);
    const matchLevel = !levelFilter || row.level === levelFilter;
    const matchClass = !classFilter || row.class === classFilter;
    return matchSearch && matchLevel && matchClass;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => { setPage(0); }, [search, levelFilter, classFilter]);

  const summaryCards = [
    { label: "Total Siswa", value: studentsData.length, gradient: "from-blue-500 to-cyan-500" },
    { label: "SMP", value: studentsData.filter(s => s.level === "SMP").length, gradient: "from-emerald-500 to-teal-500" },
    { label: "SMA", value: studentsData.filter(s => s.level === "SMA").length, gradient: "from-violet-500 to-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Data Siswa</h1>
          <p className="text-muted-foreground mt-1">Kelola data siswa SMP & SMA</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium text-foreground hover:ring-2 hover:ring-primary/20 transition-all">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Tambah Siswa</span>
          </button>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {summaryCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="group relative glass rounded-2xl p-5 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{s.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1 tracking-tight"><AnimatedNumber value={s.value} /></p>
          </motion.div>
        ))}
      </div>

      {/* Container: Filter + Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl overflow-hidden">
        {/* Filter */}
        <div className="p-5 border-b border-border/30">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/30 flex-1 min-w-[200px] max-w-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input type="text" placeholder="Cari nama atau NISN..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
            </div>
            <select value={levelFilter} onChange={(e) => { setLevelFilter(e.target.value); setClassFilter(""); }}
              className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
              <option value="">Semua Jenjang</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
            </select>
            <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
              <option value="">Semua Kelas</option>
              {availableClasses.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
            <Filter className="h-4 w-4" />
            <span>Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> data siswa</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {["No", "NISN", "Foto", "Nama Lengkap", "Jenjang", "Kelas", "RFID", "Aksi"].map((h) => (
                  <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {paged.map((row, i) => (
                  <motion.tr key={row.nisn} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: 0.03 * i }} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{page * PAGE_SIZE + i + 1}</span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{row.nisn}</td>
                    <td className="py-3.5 px-5">
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">{row.photo}</div>
                    </td>
                    <td className="py-3.5 px-5 font-medium text-foreground whitespace-nowrap">{row.name}</td>
                    <td className="py-3.5 px-5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        row.level === "SMP" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" : "bg-violet-500/10 text-violet-600 border-violet-500/20"
                      }`}>{row.level}</span>
                    </td>
                    <td className="py-3.5 px-5"><span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span></td>
                    <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{row.rfid}</td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"><Eye className="h-4 w-4" /></button>
                        <button className="p-2 rounded-lg hover:bg-amber-500/10 text-amber-600 transition-colors"><Edit3 className="h-4 w-4" /></button>
                        <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {paged.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Tidak ada data yang cocok</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-5 border-t border-border/30 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Halaman {page + 1} dari {totalPages}
            </p>
            <div className="flex items-center gap-2">
              {page > 0 && (
                <button onClick={() => setPage(page - 1)} className="px-4 py-2 rounded-xl bg-muted/30 text-sm font-medium text-foreground hover:bg-muted/50 transition-all">
                  Sebelumnya
                </button>
              )}
              {page < totalPages - 1 && (
                <button onClick={() => setPage(page + 1)} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
