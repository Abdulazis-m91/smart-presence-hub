import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, Newspaper, Calendar, Eye, Search, Filter, ChevronRight, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  status: "Published" | "Draft";
  image: string;
}

const initialArticles: Article[] = [
  { id: 1, title: "Penerimaan Siswa Baru Tahun Ajaran 2026/2027", excerpt: "Pendaftaran siswa baru telah dibuka untuk semua jenjang pendidikan...", content: "Pendaftaran siswa baru telah dibuka untuk semua jenjang pendidikan. Silakan kunjungi website resmi untuk informasi lebih lanjut.", date: "2026-03-28", author: "Admin", status: "Published", image: "📰" },
  { id: 2, title: "Juara Lomba Sains Nasional", excerpt: "Siswa kami berhasil meraih juara 1 dalam kompetisi sains tingkat nasional...", content: "Siswa kami berhasil meraih juara 1 dalam kompetisi sains tingkat nasional yang diadakan di Jakarta.", date: "2026-03-25", author: "Admin", status: "Published", image: "🏆" },
  { id: 3, title: "Kegiatan Bakti Sosial Bersama Masyarakat", excerpt: "Guru dan siswa melaksanakan program bakti sosial di lingkungan sekitar sekolah...", content: "Guru dan siswa melaksanakan program bakti sosial di lingkungan sekitar sekolah sebagai bentuk kepedulian sosial.", date: "2026-03-20", author: "Admin", status: "Published", image: "🤝" },
  { id: 4, title: "Workshop Teknologi Digital untuk Guru", excerpt: "Pelatihan penggunaan teknologi digital dalam pembelajaran modern...", content: "Pelatihan penggunaan teknologi digital dalam pembelajaran modern bagi seluruh guru.", date: "2026-03-15", author: "Admin", status: "Draft", image: "💻" },
  { id: 5, title: "Persiapan Ujian Semester Genap", excerpt: "Jadwal dan ketentuan pelaksanaan ujian semester genap tahun ajaran ini...", content: "Jadwal dan ketentuan pelaksanaan ujian semester genap tahun ajaran ini telah dirilis.", date: "2026-03-10", author: "Admin", status: "Published", image: "📝" },
  { id: 6, title: "Peringatan Hari Pendidikan Nasional", excerpt: "Sekolah mengadakan upacara dan berbagai lomba dalam rangka memperingati Hardiknas...", content: "Sekolah mengadakan upacara dan berbagai lomba dalam rangka memperingati Hari Pendidikan Nasional.", date: "2026-03-05", author: "Admin", status: "Published", image: "🎓" },
  { id: 7, title: "Kunjungan Industri Kelas XII", excerpt: "Siswa kelas XII mengunjungi perusahaan teknologi terkemuka di Jakarta...", content: "Siswa kelas XII mengunjungi perusahaan teknologi terkemuka di Jakarta untuk mengenal dunia kerja.", date: "2026-03-01", author: "Admin", status: "Published", image: "🏭" },
  { id: 8, title: "Turnamen Futsal Antar Kelas", excerpt: "Kompetisi futsal antar kelas berlangsung meriah dengan semangat sportivitas...", content: "Kompetisi futsal antar kelas berlangsung meriah dengan semangat sportivitas tinggi.", date: "2026-02-25", author: "Admin", status: "Published", image: "⚽" },
  { id: 9, title: "Pelantikan OSIS Periode Baru", excerpt: "Pelantikan pengurus OSIS periode 2026/2027 telah dilaksanakan...", content: "Pelantikan pengurus OSIS periode 2026/2027 telah dilaksanakan dengan lancar.", date: "2026-02-20", author: "Admin", status: "Published", image: "🎖️" },
  { id: 10, title: "Seminar Motivasi Belajar", excerpt: "Menghadirkan pembicara motivator nasional untuk meningkatkan semangat belajar siswa...", content: "Menghadirkan pembicara motivator nasional untuk meningkatkan semangat belajar siswa.", date: "2026-02-15", author: "Admin", status: "Published", image: "🎤" },
  { id: 11, title: "Pameran Karya Seni Siswa", excerpt: "Pameran hasil karya seni siswa dari berbagai jenjang dipamerkan di aula sekolah...", content: "Pameran hasil karya seni siswa dari berbagai jenjang dipamerkan di aula sekolah.", date: "2026-02-10", author: "Admin", status: "Draft", image: "🎨" },
  { id: 12, title: "Program Literasi Digital", excerpt: "Sekolah meluncurkan program literasi digital untuk meningkatkan kompetensi siswa...", content: "Sekolah meluncurkan program literasi digital untuk meningkatkan kompetensi siswa di era digital.", date: "2026-02-05", author: "Admin", status: "Published", image: "📚" },
  { id: 13, title: "Pelatihan P3K untuk Siswa", excerpt: "Pelatihan pertolongan pertama bekerja sama dengan PMI setempat...", content: "Pelatihan pertolongan pertama bekerja sama dengan PMI setempat.", date: "2026-01-28", author: "Admin", status: "Published", image: "🏥" },
  { id: 14, title: "Festival Budaya Nusantara", excerpt: "Siswa menampilkan keberagaman budaya Indonesia melalui festival tahunan...", content: "Siswa menampilkan keberagaman budaya Indonesia melalui festival tahunan.", date: "2026-01-20", author: "Admin", status: "Published", image: "🎭" },
];

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  status: "Published" | "Draft";
}

const PAGE_SIZE = 12;

export default function AdminBeritaPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [viewData, setViewData] = useState<Article | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Article | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const filtered = articles.filter((a) =>
    !search || a.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const openAdd = () => {
    setEditData(null);
    reset({ title: "", excerpt: "", content: "", status: "Draft" });
    setShowModal(true);
  };

  const openEdit = (article: Article) => {
    setEditData(article);
    reset({ title: article.title, excerpt: article.excerpt, content: article.content, status: article.status });
    setShowModal(true);
  };

  const onSubmit = (data: FormData) => {
    if (editData) {
      setArticles(prev => prev.map(a => a.id === editData.id ? { ...a, ...data } : a));
      toast.success(`Berita "${data.title}" berhasil diperbarui`);
    } else {
      const newArticle: Article = {
        id: Date.now(),
        ...data,
        date: new Date().toISOString().split("T")[0],
        author: "Admin",
        image: "📰",
      };
      setArticles(prev => [newArticle, ...prev]);
      toast.success(`Berita "${data.title}" berhasil ditambahkan`);
    }
    setShowModal(false);
    setEditData(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setArticles(prev => prev.filter(a => a.id !== deleteTarget.id));
    toast.success(`Berita "${deleteTarget.title}" berhasil dihapus`);
    setDeleteTarget(null);
  };

  const summaryCards = [
    { label: "Total Berita", value: articles.length, gradient: "from-blue-500 to-cyan-500" },
    { label: "Published", value: articles.filter(a => a.status === "Published").length, gradient: "from-emerald-500 to-teal-500" },
    { label: "Draft", value: articles.filter(a => a.status === "Draft").length, gradient: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Berita</h1>
          <p className="text-muted-foreground mt-1">Kelola artikel berita untuk halaman utama</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /><span className="hidden sm:inline">Tambah Berita</span>
        </button>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {summaryCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="group relative glass rounded-2xl p-5 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">{s.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1 tracking-tight">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Search + Grid in unified container */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border/30">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/30 flex-1 min-w-[200px] max-w-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input type="text" placeholder="Cari judul berita..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> berita</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {paged.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                  className="group rounded-2xl border border-border/30 bg-background/50 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image area */}
                  <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-5xl relative">
                    {article.image}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        article.status === "Published"
                          ? "bg-secondary/10 text-secondary border-secondary/20"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      }`}>{article.status}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-foreground text-sm line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-[11px] text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{article.date}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border/30">
                      <button onClick={() => setViewData(article)} className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors" title="Lihat">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button onClick={() => openEdit(article)} className="p-2 rounded-lg hover:bg-amber-500/10 text-amber-600 transition-colors" title="Edit">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteTarget(article)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors" title="Hapus">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {paged.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              <Newspaper className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Tidak ada berita ditemukan</p>
            </div>
          )}
        </div>

        {/* Pagination */}
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

      {/* View Modal */}
      <AnimatePresence>
        {viewData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setViewData(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl">
                {viewData.image}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    viewData.status === "Published" ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                  }`}>{viewData.status}</span>
                  <button onClick={() => setViewData(null)} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground"><X className="h-5 w-5" /></button>
                </div>
                <h2 className="text-xl font-bold text-foreground">{viewData.title}</h2>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{viewData.date}</span>
                  <span>oleh {viewData.author}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{viewData.content}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="h-1 bg-gradient-to-r from-primary to-secondary" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-foreground">{editData ? "Edit Berita" : "Tambah Berita"}</h2>
                  <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground"><X className="h-5 w-5" /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Judul Berita</label>
                    <input
                      {...register("title", { required: "Judul wajib diisi" })}
                      className="form-input w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Masukkan judul berita"
                    />
                    {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Ringkasan</label>
                    <input
                      {...register("excerpt", { required: "Ringkasan wajib diisi" })}
                      className="form-input w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Ringkasan singkat berita"
                    />
                    {errors.excerpt && <p className="text-xs text-destructive mt-1">{errors.excerpt.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Konten</label>
                    <textarea
                      {...register("content", { required: "Konten wajib diisi" })}
                      rows={4}
                      className="form-input w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Tulis konten berita..."
                    />
                    {errors.content && <p className="text-xs text-destructive mt-1">{errors.content.message}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Gambar</label>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 border border-border/30 border-dashed cursor-pointer hover:bg-muted/50 transition-all">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Klik untuk upload gambar</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Status</label>
                    <select
                      {...register("status")}
                      className="form-input w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-all">
                      Batal
                    </button>
                    <button type="submit"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                      {editData ? "Simpan Perubahan" : "Tambah Berita"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Berita"
        message={<>Apakah Anda yakin ingin menghapus berita <span className="font-semibold text-foreground">"{deleteTarget?.title}"</span>? Data yang dihapus tidak dapat dikembalikan.</>}
      />
    </div>
  );
}
