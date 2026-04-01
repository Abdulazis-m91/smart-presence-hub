import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, Newspaper, Calendar, Eye } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  status: "Published" | "Draft";
  image: string;
}

const initialArticles: Article[] = [
  { id: 1, title: "Penerimaan Siswa Baru Tahun Ajaran 2026/2027", excerpt: "Pendaftaran siswa baru telah dibuka untuk semua jenjang pendidikan...", date: "2026-03-28", author: "Admin", status: "Published", image: "📰" },
  { id: 2, title: "Juara Lomba Sains Nasional", excerpt: "Siswa kami berhasil meraih juara 1 dalam kompetisi sains tingkat nasional...", date: "2026-03-25", author: "Admin", status: "Published", image: "🏆" },
  { id: 3, title: "Kegiatan Bakti Sosial Bersama Masyarakat", excerpt: "Guru dan siswa melaksanakan program bakti sosial di lingkungan sekitar sekolah...", date: "2026-03-20", author: "Admin", status: "Published", image: "🤝" },
  { id: 4, title: "Workshop Teknologi Digital untuk Guru", excerpt: "Pelatihan penggunaan teknologi digital dalam pembelajaran modern...", date: "2026-03-15", author: "Admin", status: "Draft", image: "💻" },
  { id: 5, title: "Persiapan Ujian Semester Genap", excerpt: "Jadwal dan ketentuan pelaksanaan ujian semester genap tahun ajaran ini...", date: "2026-03-10", author: "Admin", status: "Published", image: "📝" },
];

export default function AdminBeritaPage() {
  const [articles] = useState<Article[]>(initialArticles);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Berita</h1>
          <p className="text-muted-foreground mt-1">Kelola artikel berita untuk halaman utama</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /><span className="hidden sm:inline">Tambah Berita</span>
        </button>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Berita", value: articles.length, gradient: "from-blue-500 to-cyan-500" },
          { label: "Published", value: articles.filter(a => a.status === "Published").length, gradient: "from-emerald-500 to-teal-500" },
          { label: "Draft", value: articles.filter(a => a.status === "Draft").length, gradient: "from-amber-500 to-orange-500" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="group relative glass rounded-2xl p-5 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{s.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1 tracking-tight">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Articles list */}
      <div className="space-y-4">
        <AnimatePresence>
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="glass rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex gap-4 sm:gap-5">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                  {article.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.excerpt}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border shrink-0 ${
                      article.status === "Published"
                        ? "bg-secondary/10 text-secondary border-secondary/20"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                    }`}>{article.status}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{article.date}</span>
                      <span>oleh {article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"><Eye className="h-4 w-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-amber-500/10 text-amber-600 transition-colors"><Edit3 className="h-4 w-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
