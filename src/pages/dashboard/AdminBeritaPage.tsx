import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, Newspaper, Calendar, Eye, Search, Filter, ChevronRight, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";
import { useBerita, useCreateBerita, useUpdateBerita, useDeleteBerita } from "@/hooks/use-data";

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  status: "Published" | "Draft";
}

const PAGE_SIZE = 12;

export default function AdminBeritaPage() {
  const { data: articles = [], isLoading } = useBerita();
  const createBerita = useCreateBerita();
  const updateBerita = useUpdateBerita();
  const deleteBeritaMutation = useDeleteBerita();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [viewData, setViewData] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);

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

  const openEdit = (article: any) => {
    setEditData(article);
    reset({ title: article.title, excerpt: article.excerpt || "", content: article.content || "", status: article.status as "Published" | "Draft" });
    setShowModal(true);
  };

  const onSubmit = (data: FormData) => {
    if (editData) {
      updateBerita.mutate({ id: editData.id, ...data });
    } else {
      createBerita.mutate({ ...data, date: new Date().toISOString().split("T")[0], author: "Admin", image: "📰" });
    }
    setShowModal(false);
    setEditData(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteBeritaMutation.mutate(deleteTarget.id);
    setDeleteTarget(null);
  };

  const summaryCards = [
    { label: "Total Berita", value: articles.length, gradient: "from-blue-500 to-cyan-500" },
    { label: "Published", value: articles.filter(a => a.status === "Published").length, gradient: "from-emerald-500 to-teal-500" },
    { label: "Draft", value: articles.filter(a => a.status === "Draft").length, gradient: "from-amber-500 to-orange-500" },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

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

        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {paged.map((article, i) => (
                <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                  className="group rounded-2xl border border-border/30 bg-background/50 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                  <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-5xl relative">
                    {article.image || "📰"}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        article.status === "Published" ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      }`}>{article.status}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground text-sm line-clamp-2 leading-snug group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-[11px] text-muted-foreground">
                      <Calendar className="h-3 w-3" /><span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border/30">
                      <button onClick={() => setViewData(article)} className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors" title="Lihat"><Eye className="h-4 w-4" /></button>
                      <button onClick={() => openEdit(article)} className="p-2 rounded-lg hover:bg-amber-500/10 text-amber-600 transition-colors" title="Edit"><Edit3 className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteTarget(article)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors" title="Hapus"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {paged.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              <Newspaper className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Tidak ada berita</p>
              <p className="text-xs mt-1">Klik "Tambah Berita" untuk menambah</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="p-5 border-t border-border/30 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Halaman {page + 1} dari {totalPages}</p>
            <div className="flex items-center gap-2">
              {page > 0 && <button onClick={() => setPage(page - 1)} className="px-4 py-2 rounded-xl bg-muted/30 text-sm font-medium text-foreground hover:bg-muted/50 transition-all">Sebelumnya</button>}
              {page < totalPages - 1 && <button onClick={() => setPage(page + 1)} className="flex items-center gap-1 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all">Next <ChevronRight className="h-4 w-4" /></button>}
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
              <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl">{viewData.image || "📰"}</div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${viewData.status === "Published" ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}`}>{viewData.status}</span>
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
                    <input {...register("title", { required: "Judul wajib diisi" })} className="form-input w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Masukkan judul berita" />
                    {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Ringkasan</label>
                    <input {...register("excerpt")} className="form-input w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Ringkasan singkat" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Konten</label>
                    <textarea {...register("content")} rows={4} className="form-input w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="Isi berita lengkap..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Status</label>
                    <select {...register("status")} className="form-input w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-muted/30 text-sm font-medium text-foreground hover:bg-muted/50 transition-all">Batal</button>
                    <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                      {editData ? "Simpan Perubahan" : "Simpan Berita"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Berita"
        message={<>Apakah Anda yakin ingin menghapus berita <span className="font-semibold text-foreground">"{deleteTarget?.title}"</span>?</>}
      />
    </div>
  );
}
