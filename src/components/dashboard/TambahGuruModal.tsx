import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const subjects = ["Matematika", "B. Indonesia", "Fisika", "Biologi", "Kimia", "B. Inggris", "Sejarah", "Geografi", "Penjaskes", "Seni Budaya"];

const guruSchema = z.object({
  nip: z.string().trim().min(1, "NIP wajib diisi").regex(/^\d+$/, "NIP harus berupa angka").max(30, "NIP maksimal 30 karakter"),
  name: z.string().trim().min(1, "Nama wajib diisi").max(100, "Nama maksimal 100 karakter"),
  status: z.enum(["Guru", "Staff"], { required_error: "Status wajib dipilih" }),
  subject: z.string().optional(),
  level: z.string().optional(),
  email: z.string().trim().min(1, "Email wajib diisi").email("Format email tidak valid").max(255),
  wa: z.string().trim().min(1, "WhatsApp wajib diisi").regex(/^[\d+]+$/, "Nomor tidak valid").max(20),
});

type GuruForm = z.infer<typeof guruSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TambahGuruModal({ open, onClose }: Props) {
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<GuruForm>({
    resolver: zodResolver(guruSchema),
    defaultValues: { nip: "", name: "", status: undefined, subject: "", level: "", email: "", wa: "" },
  });

  const status = watch("status");

  const onSubmit = (data: GuruForm) => {
    toast.success(`Data ${data.status === "Staff" ? "staff" : "guru"} "${data.name}" berhasil ditambahkan`);
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
            className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/30 sticky top-0 bg-background z-10">
              <h2 className="text-lg font-bold text-foreground">Tambah Data Guru</h2>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <Field label="NIP" error={errors.nip?.message}>
                <input {...register("nip")} placeholder="Masukkan NIP" className="form-input" />
              </Field>
              <Field label="Nama Lengkap" error={errors.name?.message}>
                <input {...register("name")} placeholder="Masukkan nama lengkap" className="form-input" />
              </Field>
              <Field label="Status" error={errors.status?.message}>
                <select {...register("status")} className="form-input cursor-pointer">
                  <option value="">Pilih Status</option>
                  <option value="Guru">Guru</option>
                  <option value="Staff">Staff</option>
                </select>
              </Field>
              {status === "Guru" && (
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Mata Pelajaran" error={errors.subject?.message}>
                    <select {...register("subject")} className="form-input cursor-pointer">
                      <option value="">Pilih Mapel</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Jenjang" error={errors.level?.message}>
                    <select {...register("level")} className="form-input cursor-pointer">
                      <option value="">Pilih Jenjang</option>
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                    </select>
                  </Field>
                </div>
              )}
              <Field label="Email" error={errors.email?.message}>
                <input {...register("email")} type="email" placeholder="contoh@school.id" className="form-input" />
              </Field>
              <Field label="WhatsApp" error={errors.wa?.message}>
                <input {...register("wa")} placeholder="08xxxxxxxxxx" className="form-input" />
              </Field>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl bg-muted/30 text-sm font-medium text-foreground hover:bg-muted/50 transition-all">
                  Batal
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50">
                  Simpan Data
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
