import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Check } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const teacherData: Record<string, { subject: string; levels: string[] }> = {
  "Ahmad Fauzi": { subject: "Matematika", levels: ["SMP", "SMA"] },
  "Siti Rahmawati": { subject: "B. Indonesia", levels: ["SMP"] },
  "Budi Santoso": { subject: "Fisika", levels: ["SMA"] },
  "Dewi Lestari": { subject: "Biologi", levels: ["SMP"] },
  "Hasan Basri": { subject: "Kimia", levels: ["SMA"] },
  "Rina Marlina": { subject: "B. Inggris", levels: ["SMP"] },
  "Agus Wijaya": { subject: "Sejarah", levels: ["SMP"] },
  "Lina Kartika": { subject: "Geografi", levels: ["SMA"] },
  "Joko Prasetyo": { subject: "Penjaskes", levels: ["SMA"] },
  "Maya Anggraini": { subject: "Seni Budaya", levels: ["SMP"] },
};

const smpClasses = ["VII-A", "VII-B", "VIII-A", "VIII-B", "IX-A", "IX-B"];
const smaClasses = ["X-A", "X-B", "XI-A", "XI-B", "XII-A", "XII-B"];

const jadwalSchema = z.object({
  day: z.string().min(1, "Hari wajib dipilih"),
  teacher: z.string().min(1, "Guru wajib dipilih"),
  subject: z.string().min(1, "Mata pelajaran wajib"),
  level: z.string().min(1, "Jenjang wajib dipilih"),
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
  editData?: JadwalForm | null;
}

export default function TambahJadwalModal({ open, onClose, editData }: Props) {
  const { register, handleSubmit, watch, reset, setValue, formState: { errors, isSubmitting } } = useForm<JadwalForm>({
    resolver: zodResolver(jadwalSchema),
    defaultValues: editData || { day: "", teacher: "", subject: "", level: "", class: "", timeStart: "", timeEnd: "" },
  });

  const day = watch("day");
  const teacher = watch("teacher");
  const level = watch("level");

  const selectedTeacher = teacher ? teacherData[teacher] : null;
  const availableClasses = level === "SMP" ? smpClasses : level === "SMA" ? smaClasses : [];

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setValue("teacher", name);
    const data = teacherData[name];
    if (data) {
      setValue("subject", data.subject);
      setValue("level", "");
      setValue("class", "");
    } else {
      setValue("subject", "");
      setValue("level", "");
      setValue("class", "");
    }
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("level", e.target.value);
    setValue("class", "");
  };

  const onSubmit = (data: JadwalForm) => {
    toast.success(`Jadwal ${data.subject} hari ${data.day} berhasil ${editData ? "diperbarui" : "ditambahkan"}`);
    reset();
    onClose();
  };

  const handleClose = () => { reset(); onClose(); };
  const isEdit = !!editData;

  // Step indicators
  const step = !day ? 1 : !teacher ? 2 : !level ? 3 : !watch("class") ? 4 : 5;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/30 sticky top-0 bg-background z-10">
              <h2 className="text-lg font-bold text-foreground">{isEdit ? "Edit" : "Tambah"} Jadwal Pelajaran</h2>
              <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Step indicators */}
            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center gap-1">
                {["Hari", "Guru", "Jenjang", "Kelas", "Waktu"].map((s, i) => (
                  <div key={s} className="flex items-center gap-1 flex-1">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                      step > i + 1 ? "bg-primary text-primary-foreground" : step === i + 1 ? "bg-primary/20 text-primary ring-2 ring-primary/30" : "bg-muted/30 text-muted-foreground"
                    }`}>
                      {step > i + 1 ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </div>
                    {i < 4 && <div className={`h-0.5 flex-1 rounded-full transition-all ${step > i + 1 ? "bg-primary/50" : "bg-muted/30"}`} />}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1.5 px-0.5">
                {["Hari", "Guru", "Jenjang", "Kelas", "Waktu"].map((s, i) => (
                  <span key={s} className={`text-[10px] font-medium ${step === i + 1 ? "text-primary" : "text-muted-foreground/60"}`}>{s}</span>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-3 space-y-4">
              {/* Step 1: Day */}
              <Field label="Hari" error={errors.day?.message}>
                <select {...register("day")} className="form-input cursor-pointer">
                  <option value="">Pilih Hari</option>
                  {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>

              {/* Step 2: Teacher (enabled after day) */}
              <AnimatePresence>
                {day && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <Field label="Guru Pengajar" error={errors.teacher?.message}>
                      <select value={teacher} onChange={handleTeacherChange} className="form-input cursor-pointer">
                        <option value="">Pilih Guru</option>
                        {Object.keys(teacherData).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Auto-filled subject + Level selection */}
              <AnimatePresence>
                {teacher && selectedTeacher && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Mata Pelajaran" error={errors.subject?.message}>
                        <div className="form-input bg-muted/20 cursor-not-allowed text-foreground">{selectedTeacher.subject}</div>
                        <input type="hidden" {...register("subject")} />
                      </Field>
                      <Field label="Jenjang" error={errors.level?.message}>
                        <select value={level} onChange={handleLevelChange} className="form-input cursor-pointer">
                          <option value="">Pilih Jenjang</option>
                          {selectedTeacher.levels.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </Field>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 4: Class (enabled after level) */}
              <AnimatePresence>
                {level && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <Field label="Kelas" error={errors.class?.message}>
                      <select {...register("class")} className="form-input cursor-pointer">
                        <option value="">Pilih Kelas</option>
                        {availableClasses.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 5: Time (enabled after class) */}
              <AnimatePresence>
                {watch("class") && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Jam Mulai" error={errors.timeStart?.message}>
                        <input {...register("timeStart")} type="time" className="form-input" />
                      </Field>
                      <Field label="Jam Selesai" error={errors.timeEnd?.message}>
                        <input {...register("timeEnd")} type="time" className="form-input" />
                      </Field>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleClose} className="flex-1 px-4 py-2.5 rounded-xl bg-muted/30 text-sm font-medium text-foreground hover:bg-muted/50 transition-all">
                  Batal
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50">
                  {isEdit ? "Simpan Perubahan" : "Simpan Jadwal"}
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
