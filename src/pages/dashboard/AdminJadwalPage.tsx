import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, Edit3, Plus, Trash2, Loader2 } from "lucide-react";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";
import TambahJadwalModal from "@/components/dashboard/TambahJadwalModal";
import { useJadwal, useDeleteJadwal } from "@/hooks/use-data";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const dayColors: Record<string, string> = {
  Senin: "from-blue-500 to-cyan-500",
  Selasa: "from-emerald-500 to-teal-500",
  Rabu: "from-violet-500 to-purple-500",
  Kamis: "from-orange-500 to-amber-500",
  Jumat: "from-rose-500 to-red-500",
  Sabtu: "from-indigo-500 to-blue-500",
};

export default function AdminJadwalPage() {
  const { data: jadwalData = [], isLoading } = useJadwal();
  const deleteJadwal = useDeleteJadwal();

  const [tab, setTab] = useState<"smp" | "sma">("smp");
  const [showModal, setShowModal] = useState(false);
  const [editJadwal, setEditJadwal] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const filteredByLevel = jadwalData.filter(j => j.level === tab.toUpperCase());

  const scheduleByDay: Record<string, typeof jadwalData> = {};
  days.forEach(d => { scheduleByDay[d] = filteredByLevel.filter(j => j.day === d); });

  const handleEditItem = (item: any) => {
    setEditJadwal({
      id: item.id,
      day: item.day,
      teacher: item.teacher_name,
      subject: item.subject,
      level: item.level,
      class: item.class,
      timeStart: item.time_start,
      timeEnd: item.time_end,
    });
    setShowModal(true);
  };

  const handleDeleteItem = () => {
    if (!deleteTarget) return;
    deleteJadwal.mutate(deleteTarget.id);
    setDeleteTarget(null);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Jadwal Pelajaran</h1>
          <p className="text-muted-foreground mt-1">Kelola jadwal mengajar guru per hari</p>
        </div>
        <button onClick={() => { setEditJadwal(null); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shrink-0 shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /><span className="hidden sm:inline">Tambah Jadwal</span>
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex rounded-xl glass overflow-hidden w-fit">
        {(["smp", "sma"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-6 py-2.5 text-sm font-semibold transition-all ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
            {t.toUpperCase()}
          </button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {days.map((day, dayIdx) => {
          const items = scheduleByDay[day] || [];
          return (
            <motion.div key={`${tab}-${day}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + dayIdx * 0.06 }} className="glass rounded-2xl overflow-hidden">
              <div className={`bg-gradient-to-r ${dayColors[day]} px-5 py-3.5 flex items-center justify-between`}>
                <div>
                  <h3 className="font-bold text-white text-base uppercase tracking-wide">{day}</h3>
                  <p className="text-white/80 text-xs mt-0.5 flex items-center gap-1"><Users className="h-3 w-3" />{items.length} jadwal</p>
                </div>
              </div>
              <div className="divide-y divide-border/30">
                {items.length === 0 ? (
                  <div className="p-5 text-center text-muted-foreground text-sm">Tidak ada jadwal</div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="group flex items-center justify-between px-5 py-3.5 hover:bg-muted/10 transition-colors">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{item.teacher_name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.subject}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{item.class}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1 justify-end">
                            <Clock className="h-3 w-3" />{item.time_start} - {item.time_end}
                          </p>
                        </div>
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEditItem(item)} className="p-1.5 rounded-lg hover:bg-amber-500/10 text-amber-600 transition-colors" title="Edit"><Edit3 className="h-3.5 w-3.5" /></button>
                          <button onClick={() => setDeleteTarget(item)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors" title="Hapus"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <TambahJadwalModal open={showModal} onClose={() => { setShowModal(false); setEditJadwal(null); }} editData={editJadwal} />

      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteItem}
        title="Hapus Jadwal"
        message={deleteTarget ? <>Apakah Anda yakin ingin menghapus jadwal <span className="font-semibold text-foreground">"{deleteTarget.subject}"</span> ({deleteTarget.teacher_name}) hari <span className="font-semibold text-foreground">{deleteTarget.day}</span>?</> : null}
      />
    </div>
  );
}
