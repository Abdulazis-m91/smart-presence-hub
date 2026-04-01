import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const teachers = ["Ahmad Fauzi", "Siti Rahmawati", "Budi Santoso", "Dewi Lestari", "Hasan Basri", "Rina Marlina", "Agus Wijaya", "Lina Kartika", "Joko Prasetyo", "Maya Anggraini"];
const subjects = ["Matematika", "B. Indonesia", "Fisika", "Biologi", "Kimia", "B. Inggris", "Sejarah", "Geografi", "Penjaskes", "Seni Budaya"];
const allClasses = ["VII-A", "VII-B", "VIII-A", "VIII-B", "IX-A", "IX-B", "X-A", "X-B", "XI-A", "XI-B", "XII-A", "XII-B"];

const jadwalSchema = z.object({
  day: z.string().min(1, "Hari wajib dipilih"),
  teacher: z.string().min(1, "Guru wajib dipilih"),
  subject: z.string().min(1, "Mata pelajaran wajib dipilih"),
  class: z.string().min(1, "Kelas wajib dipilih"),
  timeStart: z.string().min(1, "Jam mulai wajib diisi").regex(/^\d{2}:\d{2}$/, "Format jam tidak valid"),
  timeEnd: z.string().min(1, "Jam selesai wajib diisi").regex(/^\d{2}:\d{2}$/, "Format jam tidak valid"),
}).refine(data => data.timeEnd > data.timeStart, {
  message: "Jam selesai harus setelah jam mulai",
  path: ["timeEnd"],
});

type JadwalForm = z.infer<typeof jadwalSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TambahJadwalModal({ open, onClose }: Props) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<JadwalForm>({
    resolver: zodResolver(jadwalSchema),
    defaultValues: { day: "", teacher: "", subject: "", class: "", timeStart: "", timeEnd: "" },
  });

  const onSubmit = (data: JadwalForm) => {
    toast.success(`Jadwal ${data.subject} hari ${data.day} berhasil ditambahkan`);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
              <h2 className="text-lg font-bold text-foreground">Tambah Jadwal Pelajaran</h2>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <Field label="Hari" error={errors.day?.message}>
                <select {...register("day")} className="form-input cursor-pointer">
                  <option value="">Pilih Hari</option>
                  {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Guru Pengajar" error={errors.teacher?.message}>
                <select {...register("teacher")} className="form-input cursor-pointer">
                  <option value="">Pilih Guru</option>
                  {teachers.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Mata Pelajaran" error={errors.subject?.message}>
                  <select {...register("subject")} className="form-input cursor-pointer">
                    <option value="">Pilih Mapel</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Kelas" error={errors.class?.message}>
                  <select {...register("class")} className="form-input cursor-pointer">
                    <option value="">Pilih Kelas</option>
                    {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Jam Mulai" error={errors.timeStart?.message}>
                  <input {...register("timeStart")} type="time" className="form-input" />
                </Field>
                <Field label="Jam Selesai" error={errors.timeEnd?.message}>
                  <input {...register("timeEnd")} type="time" className="form-input" />
                </Field>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl bg-muted/30 text-sm font-medium text-foreground hover:bg-muted/50 transition-all">
                  Batal
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50">
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
}
