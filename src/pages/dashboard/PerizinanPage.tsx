import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, Send, FileText, CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useAbsensi } from "@/hooks/use-data";

const statusConfig: Record<string, { icon: React.ElementType; classes: string }> = {
  Hadir: { icon: CheckCircle2, classes: "bg-secondary/10 text-secondary border border-secondary/20" },
  Izin: { icon: Clock, classes: "bg-accent text-accent-foreground border border-border" },
  "Tidak Hadir": { icon: XCircle, classes: "bg-destructive/10 text-destructive border border-destructive/20" },
  Terlambat: { icon: Clock, classes: "bg-amber-500/10 text-amber-600 border border-amber-500/20" },
};

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

export default function PerizinanPage() {
  const { user } = useAuth();
  const { data: absensi = [], isLoading } = useAbsensi();
  const [reason, setReason] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // Filter permission history for current user
  const myRecords = absensi.filter((a) => a.person_name === user?.name && a.role === "Guru");
  const izinRecords = myRecords.filter((a) => a.status === "Izin" || a.status === "Tidak Hadir");

  const totalIzin = izinRecords.length;
  const totalHadir = myRecords.filter((p) => p.status === "Hadir" || p.status === "Terlambat").length;
  const totalTidakHadir = myRecords.filter((p) => p.status === "Tidak Hadir").length;

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Perizinan</h1>
        <p className="text-muted-foreground mt-1">Ajukan dan kelola izin Anda</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Record", value: myRecords.length, icon: FileText, gradient: "from-blue-500 to-cyan-500" },
          { label: "Hadir", value: totalHadir, icon: CheckCircle2, gradient: "from-emerald-500 to-teal-500" },
          { label: "Tidak Hadir", value: totalTidakHadir, icon: XCircle, gradient: "from-rose-500 to-red-500" },
          { label: "Izin", value: totalIzin, icon: Clock, gradient: "from-amber-500 to-orange-500" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
            className="group relative glass rounded-2xl p-6 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2 tracking-tight"><AnimatedNumber value={s.value} /></p>
              </div>
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <s.icon className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-xl gradient-primary flex items-center justify-center">
              <Send className="h-4 w-4 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Ajukan Izin Baru</h2>
          </div>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Nama Guru</label>
              <input type="text" value={user?.name || ""} readOnly className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground text-sm cursor-not-allowed" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Tanggal & Waktu</label>
              <input type="datetime-local" className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Alasan</label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3}
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border/50 text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all"
                placeholder="Tuliskan alasan izin secara detail..." />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Upload File</label>
              <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={() => setDragOver(false)}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${dragOver ? "border-primary bg-primary/5 scale-[1.02]" : "border-border/50 hover:border-primary/50 hover:bg-muted/20"}`}>
                <motion.div animate={dragOver ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Upload className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm font-medium text-muted-foreground">Drag & drop file atau klik untuk memilih</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">PDF, Word, Excel (Max 10MB)</p>
                </motion.div>
              </div>
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              className="w-full gradient-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-shadow">
              <Send className="h-4 w-4" />Ajukan Izin
            </motion.button>
          </form>
        </motion.div>

        {/* History */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-foreground">Riwayat Kehadiran</h2>
            <span className="text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">{myRecords.length} record</span>
          </div>
          <div className="space-y-3">
            {myRecords.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">Belum ada riwayat</p>
              </div>
            ) : (
              myRecords.slice(0, 10).map((p, i) => {
                const config = statusConfig[p.status] || { icon: Clock, classes: "bg-muted text-muted-foreground border border-border" };
                const StatusIcon = config.icon;
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                    className="p-4 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all duration-300 border border-transparent hover:border-border/50 group">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-mono text-muted-foreground">{p.date}</span>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5 ${config.classes}`}>
                        <StatusIcon className="h-3 w-3" />{p.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{p.subject} - {p.class}</p>
                    <p className="text-[11px] text-muted-foreground mt-1.5">Check-in: {p.check_in} | Check-out: {p.check_out}</p>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
