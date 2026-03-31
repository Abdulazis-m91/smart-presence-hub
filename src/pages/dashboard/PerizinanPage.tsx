import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Send } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const permissionHistory = [
  { date: "2026-03-25", reason: "Keperluan keluarga", status: "Disetujui" },
  { date: "2026-03-10", reason: "Sakit", status: "Disetujui" },
  { date: "2026-02-20", reason: "Pelatihan luar kota", status: "Ditolak" },
];

const statusStyles: Record<string, string> = {
  Disetujui: "bg-secondary/10 text-secondary",
  Ditolak: "bg-destructive/10 text-destructive",
  Menunggu: "bg-accent text-accent-foreground",
};

export default function PerizinanPage() {
  const { user } = useAuth();
  const [reason, setReason] = useState("");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Perizinan</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Ajukan Izin</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Nama Guru</label>
              <input
                type="text"
                value={user?.name || ""}
                readOnly
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Tanggal & Waktu</label>
              <input
                type="datetime-local"
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Alasan</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                placeholder="Tuliskan alasan izin..."
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Upload File (PDF, Word, Excel)</label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Klik atau drag file ke sini</p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full gradient-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Send className="h-4 w-4" />
              Ajukan Izin
            </button>
          </form>
        </div>

        {/* History */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Riwayat Perizinan</h2>
          <div className="space-y-3">
            {permissionHistory.map((p, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{p.date}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[p.status]}`}>
                    {p.status}
                  </span>
                </div>
                <p className="text-sm text-foreground">{p.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
