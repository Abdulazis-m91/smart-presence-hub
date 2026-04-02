import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Image as ImageIcon, Upload, Loader2, X } from "lucide-react";
import { useGaleri, useCreateGaleri, useDeleteGaleri } from "@/hooks/use-data";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";
import { toast } from "sonner";

export default function AdminGaleriPage() {
  const { data: images = [], isLoading } = useGaleri();
  const createGaleri = useCreateGaleri();
  const deleteGaleri = useDeleteGaleri();
  const [dragOver, setDragOver] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newEmoji, setNewEmoji] = useState("📷");

  const handleAdd = () => {
    if (!newTitle.trim()) { toast.error("Judul wajib diisi"); return; }
    createGaleri.mutate({ title: newTitle, emoji: newEmoji, date: new Date().toISOString().split("T")[0] });
    setNewTitle("");
    setNewEmoji("📷");
    setShowAdd(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Galeri</h1>
          <p className="text-muted-foreground mt-1">Kelola foto galeri untuk halaman utama</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /><span className="hidden sm:inline">Tambah Foto</span>
        </button>
      </motion.div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ImageIcon className="h-4 w-4" />
        <span><span className="font-semibold text-foreground">{images.length}</span> foto di galeri</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {images.map((img, i) => (
            <motion.div key={img.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.1 + i * 0.05 }} className="group glass rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center text-5xl sm:text-6xl relative">
                {img.emoji || "📷"}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button onClick={() => setDeleteTarget(img)} className="p-2.5 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground truncate">{img.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{img.date}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {images.length === 0 && (
          <div className="col-span-full py-16 text-center text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Belum ada foto</p>
            <p className="text-xs mt-1">Klik "Tambah Foto" untuk menambah</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border/50 p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-foreground">Tambah Foto Galeri</h2>
                <button onClick={() => setShowAdd(false)} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Judul</label>
                  <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Judul foto"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Emoji</label>
                  <input value={newEmoji} onChange={(e) => setNewEmoji(e.target.value)} placeholder="📷"
                    className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/30 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowAdd(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-muted/30 text-sm font-medium text-foreground hover:bg-muted/50 transition-all">Batal</button>
                  <button onClick={handleAdd} className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">Simpan</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => { if (deleteTarget) { deleteGaleri.mutate(deleteTarget.id); setDeleteTarget(null); } }}
        title="Hapus Foto"
        message={<>Apakah Anda yakin ingin menghapus foto <span className="font-semibold text-foreground">"{deleteTarget?.title}"</span>?</>}
      />
    </div>
  );
}
