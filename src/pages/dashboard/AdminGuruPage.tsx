import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, Download, Eye, Edit3, Trash2, Users, ChevronRight } from "lucide-react";
import TambahGuruModal, { type GuruData } from "@/components/dashboard/TambahGuruModal";

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

const guruData = [
  { nip: "198501012010011001", name: "Ahmad Fauzi", status: "Guru" as const, subject: "Matematika", level: "SMA", email: "ahmad@school.id", wa: "081234567890" },
  { nip: "198703152011012002", name: "Siti Rahmawati", status: "Guru" as const, subject: "B. Indonesia", level: "SMP", email: "siti@school.id", wa: "081234567891" },
  { nip: "199005202012011003", name: "Budi Santoso", status: "Guru" as const, subject: "Fisika", level: "SMA", email: "budi@school.id", wa: "081234567892" },
  { nip: "198812102013012004", name: "Dewi Lestari", status: "Guru" as const, subject: "Biologi", level: "SMP", email: "dewi@school.id", wa: "081234567893" },
  { nip: "198601052010011005", name: "Hasan Basri", status: "Guru" as const, subject: "Kimia", level: "SMA", email: "hasan@school.id", wa: "081234567894" },
  { nip: "199203102014012006", name: "Rina Marlina", status: "Guru" as const, subject: "B. Inggris", level: "SMP", email: "rina@school.id", wa: "081234567895" },
  { nip: "198709202011011007", name: "Agus Wijaya", status: "Guru" as const, subject: "Sejarah", level: "SMP", email: "agus@school.id", wa: "081234567896" },
  { nip: "199108152013012008", name: "Lina Kartika", status: "Guru" as const, subject: "Geografi", level: "SMA", email: "lina@school.id", wa: "081234567897" },
  { nip: "198804102012011009", name: "Joko Prasetyo", status: "Guru" as const, subject: "Penjaskes", level: "SMA", email: "joko@school.id", wa: "081234567898" },
  { nip: "199305202014012010", name: "Maya Anggraini", status: "Guru" as const, subject: "Seni Budaya", level: "SMP", email: "maya@school.id", wa: "081234567899" },
  { nip: "199001012015011011", name: "Bambang Susilo", status: "Staff" as const, subject: "-", level: "-", email: "bambang@school.id", wa: "081234567800" },
  { nip: "199112152016012012", name: "Wulan Dari", status: "Staff" as const, subject: "-", level: "-", email: "wulan@school.id", wa: "081234567801" },
  { nip: "198806102014011013", name: "Dedi Kurniawan", status: "Staff" as const, subject: "-", level: "-", email: "dedi@school.id", wa: "081234567802" },
];

const subjects = ["Matematika", "B. Indonesia", "Fisika", "Biologi", "Kimia", "B. Inggris", "Sejarah", "Geografi", "Penjaskes", "Seni Budaya"];
const PAGE_SIZE = 25;

export default function AdminGuruPage() {
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<GuruData | null>(null);

  const filtered = guruData.filter((row) => {
    const matchSearch = !search || row.name.toLowerCase().includes(search.toLowerCase()) || row.nip.includes(search);
    const matchSubject = !subjectFilter || row.subject === subjectFilter;
    const matchLevel = !levelFilter || row.level === levelFilter;
    const matchStatus = !statusFilter || row.status === statusFilter;
    return matchSearch && matchSubject && matchLevel && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => { setPage(0); }, [search, subjectFilter, levelFilter, statusFilter]);

  const totalGuru = guruData.filter(g => g.status === "Guru").length;
  const totalStaff = guruData.filter(g => g.status === "Staff").length;

  const summaryCards = [
    { label: "Total Guru & Staff", value: guruData.length, gradient: "from-blue-500 to-cyan-500" },
    { label: "Guru", value: totalGuru, gradient: "from-emerald-500 to-teal-500" },
    { label: "Staff", value: totalStaff, gradient: "from-violet-500 to-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Data Guru</h1>
          <p className="text-muted-foreground mt-1">Kelola data guru dan staff sekolah</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium text-foreground hover:ring-2 hover:ring-primary/20 transition-all">
            <Download className="h-4 w-4" /><span className="hidden sm:inline">Export PDF</span>
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" /><span className="hidden sm:inline">Tambah Guru</span>
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
        <div className="p-5 border-b border-border/30">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/30 flex-1 min-w-[200px] max-w-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input type="text" placeholder="Cari nama atau NIP..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
            </div>
            <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
              <option value="">Semua Mapel</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
              <option value="">Semua Jenjang</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-muted/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
              <option value="">Guru / Staff</option>
              <option value="Guru">Guru</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
            <Filter className="h-4 w-4" />
            <span>Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> data</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {["No", "NIP", "Nama Lengkap", "Status", "Mapel", "Jenjang", "Email", "WhatsApp", "Aksi"].map((h) => (
                  <th key={h} className="text-left py-3.5 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {paged.map((row, i) => (
                  <motion.tr key={row.nip} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: 0.03 * i }} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{page * PAGE_SIZE + i + 1}</span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-xs text-muted-foreground">{row.nip}</td>
                    <td className="py-3.5 px-5 font-medium text-foreground whitespace-nowrap">{row.name}</td>
                    <td className="py-3.5 px-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        row.status === "Guru" ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-violet-500/10 text-violet-600 border-violet-500/20"
                      }`}>{row.status}</span>
                    </td>
                    <td className="py-3.5 px-5 text-foreground">{row.subject}</td>
                    <td className="py-3.5 px-5">
                      {row.level !== "-" ? (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          row.level === "SMP" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" : "bg-violet-500/10 text-violet-600 border-violet-500/20"
                        }`}>{row.level}</span>
                      ) : <span className="text-muted-foreground">-</span>}
                    </td>
                    <td className="py-3.5 px-5 text-xs text-muted-foreground">{row.email}</td>
                    <td className="py-3.5 px-5 text-xs text-muted-foreground font-mono">{row.wa}</td>
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
                  <td colSpan={9} className="py-12 text-center text-muted-foreground">
                    <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">Tidak ada data yang cocok</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-5 border-t border-border/30 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Halaman {page + 1} dari {totalPages}</p>
            <div className="flex items-center gap-2">
              {page > 0 && (
                <button onClick={() => setPage(page - 1)} className="px-4 py-2 rounded-xl bg-muted/30 text-sm font-medium text-foreground hover:bg-muted/50 transition-all">Sebelumnya</button>
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

      <TambahGuruModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
