import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Send, FileText, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const permissionHistory = [
  { date: "2026-03-25", reason: "Keperluan keluarga", status: "Disetujui", reviewer: "Admin" },
  { date: "2026-03-10", reason: "Sakit demam tinggi", status: "Disetujui", reviewer: "Admin" },
  { date: "2026-02-20", reason: "Pelatihan luar kota", status: "Ditolak", reviewer: "Kepala Sekolah" },
  { date: "2026-02-05", reason: "Acara keluarga", status: "Menunggu", reviewer: "-" },
];

const statusConfig: Record<string, { icon: React.ElementType; classes: string }> = {
  Disetujui: { icon: CheckCircle2, classes: "bg-secondary/10 text-secondary border border-secondary/20" },
  Ditolak: { icon: XCircle, classes: "bg-destructive/10 text-destructive border border-destructive/20" },
  Menunggu: { icon: Clock, classes: "bg-accent text-accent-foreground border border-border" },
};

export default function PerizinanPage() {
  const { user } = useAuth();
  const [reason, setReason] = useState("");
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Perizinan</h1>
        <p className="text-muted-foreground mt-1">Ajukan dan kelola izin Anda</p>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Izin", value: "4", icon: FileText, color: "from-blue-500 to-cyan-500" },
          { label: "Disetujui", value: "2", icon: CheckCircle2, color: "from-emerald-500 to-teal-500" },
          { label: "Ditolak", value: "1", icon: XCircle, color: "from-rose-500 to-red-500" },
          { label: "Menunggu", value: "1", icon: Clock, color: "from-amber-500 to-orange-500" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="glass rounded-2xl p-4 flex items-center gap-3 group"
          >
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0`}>
              <s.icon className="h-5 w-5 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-xl gradient-primary flex items-center justify-center">
              <Send className="h-4 w-4 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Ajukan Izin Baru</h2>
          </div>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Nama Guru</label>
              <input
                type="text"
                value={user?.name || ""}
                readOnly
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground text-sm cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Tanggal & Waktu</label>
              <input
                type="datetime-local"
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Alasan</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all"
                placeholder="Tuliskan alasan izin secara detail..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Upload File</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={() => setDragOver(false)}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                  dragOver
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-border/50 hover:border-primary/50 hover:bg-muted/20"
                }`}
              >
                <motion.div
                  animate={dragOver ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Upload className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm font-medium text-muted-foreground">Drag & drop file atau klik untuk memilih</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">PDF, Word, Excel (Max 10MB)</p>
                </motion.div>
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-shadow"
            >
              <Send className="h-4 w-4" />
              Ajukan Izin
            </motion.button>
          </form>
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Riwayat Perizinan</h2>
            <span className="text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">{permissionHistory.length} izin</span>
          </div>
          <div className="space-y-3">
            {permissionHistory.map((p, i) => {
              const config = statusConfig[p.status];
              const StatusIcon = config.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all duration-300 border border-transparent hover:border-border/50 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-muted-foreground">{p.date}</span>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5 ${config.classes}`}>
                      <StatusIcon className="h-3 w-3" />
                      {p.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{p.reason}</p>
                  <p className="text-[11px] text-muted-foreground mt-1.5">Reviewer: {p.reviewer}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
