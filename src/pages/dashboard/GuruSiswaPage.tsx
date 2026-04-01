import { motion } from "framer-motion";
import { Search, Users, GraduationCap, BookOpen } from "lucide-react";
import { useState } from "react";

const students = [
  { no: 1, nisn: "0012345601", name: "Andi Pratama", class: "XII-A", gender: "L", status: "Aktif" },
  { no: 2, nisn: "0012345602", name: "Budi Santoso", class: "XII-A", gender: "L", status: "Aktif" },
  { no: 3, nisn: "0012345603", name: "Citra Dewi", class: "XII-A", gender: "P", status: "Aktif" },
  { no: 4, nisn: "0012345604", name: "Dina Lestari", class: "XI-B", gender: "P", status: "Aktif" },
  { no: 5, nisn: "0012345605", name: "Eko Prasetyo", class: "XI-B", gender: "L", status: "Aktif" },
  { no: 6, nisn: "0012345606", name: "Fitri Handayani", class: "XI-B", gender: "P", status: "Aktif" },
  { no: 7, nisn: "0012345607", name: "Galih Ramadhan", class: "X-A", gender: "L", status: "Aktif" },
  { no: 8, nisn: "0012345608", name: "Hana Safitri", class: "X-A", gender: "P", status: "Aktif" },
  { no: 9, nisn: "0012345609", name: "Irfan Maulana", class: "X-A", gender: "L", status: "Aktif" },
  { no: 10, nisn: "0012345610", name: "Jihan Aulia", class: "XI-C", gender: "P", status: "Aktif" },
  { no: 11, nisn: "0012345611", name: "Kiki Amelia", class: "XI-C", gender: "P", status: "Aktif" },
  { no: 12, nisn: "0012345612", name: "Lukman Hakim", class: "XI-C", gender: "L", status: "Aktif" },
];

const classes = ["Semua Kelas", "XII-A", "XI-B", "XI-C", "X-A"];

export default function GuruSiswaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua Kelas");

  const filtered = students.filter((s) => {
    const matchSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nisn.includes(searchQuery);
    const matchClass = selectedClass === "Semua Kelas" || s.class === selectedClass;
    return matchSearch && matchClass;
  });

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Data Siswa</h1>
        <p className="text-muted-foreground mt-1">Daftar siswa yang Anda ajar</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Users, label: "Total Siswa", value: `${students.length} Siswa`, gradient: "from-blue-500 to-cyan-500" },
          { icon: GraduationCap, label: "Kelas Diajar", value: "4 Kelas", gradient: "from-emerald-500 to-teal-500" },
          { icon: BookOpen, label: "Mata Pelajaran", value: "Matematika", gradient: "from-violet-500 to-purple-500" },
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
              <p className="text-lg font-bold text-foreground">{item.value}</p>
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
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-3 rounded-xl glass text-sm text-foreground bg-transparent outline-none cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all"
        >
          {classes.map((c) => (
            <option key={c} value={c} className="bg-background text-foreground">{c}</option>
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
                {["No", "NISN", "Nama Siswa", "Kelas", "L/P", "Status"].map((h) => (
                  <th key={h} className="text-left py-4 px-5 text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    Tidak ada data siswa ditemukan
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <motion.tr
                    key={row.nisn}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.03 }}
                    className="border-t border-border/30 hover:bg-muted/20 transition-colors"
                  >
                    <td className="py-4 px-5">
                      <span className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground">{row.no}</span>
                    </td>
                    <td className="py-4 px-5 font-mono text-xs text-foreground">{row.nisn}</td>
                    <td className="py-4 px-5 font-medium text-foreground">{row.name}</td>
                    <td className="py-4 px-5">
                      <span className="px-2.5 py-1 rounded-lg bg-muted/50 text-foreground text-xs font-medium">{row.class}</span>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        row.gender === "L"
                          ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                          : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                      }`}>
                        {row.gender}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
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
