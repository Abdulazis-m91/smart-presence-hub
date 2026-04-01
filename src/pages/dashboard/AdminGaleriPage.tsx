import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Image as ImageIcon, Upload } from "lucide-react";

interface GalleryImage {
  id: number;
  title: string;
  date: string;
  emoji: string;
}

const initialImages: GalleryImage[] = [
  { id: 1, title: "Upacara Bendera", date: "2026-03-28", emoji: "🏫" },
  { id: 2, title: "Lomba Sains", date: "2026-03-25", emoji: "🔬" },
  { id: 3, title: "Kegiatan Pramuka", date: "2026-03-20", emoji: "⛺" },
  { id: 4, title: "Bakti Sosial", date: "2026-03-15", emoji: "🤝" },
  { id: 5, title: "Class Meeting", date: "2026-03-10", emoji: "🎉" },
  { id: 6, title: "Pentas Seni", date: "2026-03-05", emoji: "🎭" },
  { id: 7, title: "Olahraga Bersama", date: "2026-02-28", emoji: "⚽" },
  { id: 8, title: "Workshop Guru", date: "2026-02-20", emoji: "💻" },
];

export default function AdminGaleriPage() {
  const [images] = useState<GalleryImage[]>(initialImages);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Galeri</h1>
          <p className="text-muted-foreground mt-1">Kelola foto galeri untuk halaman utama</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /><span className="hidden sm:inline">Upload Foto</span>
        </button>
      </motion.div>

      {/* Upload area */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={() => setDragOver(false)}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
            dragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border/50 hover:border-primary/50 hover:bg-muted/20"
          }`}
        >
          <motion.div animate={dragOver ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300 }}>
            <Upload className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm font-medium text-muted-foreground">Drag & drop gambar atau klik untuk memilih</p>
            <p className="text-xs text-muted-foreground/60 mt-1">JPG, PNG, WebP — otomatis dikompres ke ~100KB</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ImageIcon className="h-4 w-4" />
        <span><span className="font-semibold text-foreground">{images.length}</span> foto di galeri</span>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="group glass rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center text-5xl sm:text-6xl relative">
                {img.emoji}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="p-2.5 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">
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
      </div>
    </div>
  );
}
