import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const smpClasses = ["VII-A", "VII-B", "VIII-A", "VIII-B", "IX-A", "IX-B"];
const smaClasses = ["X-A", "X-B", "XI-A", "XI-B", "XII-A", "XII-B"];

const siswaSchema = z.object({
  nisn: z.string().trim().min(1, "NISN wajib diisi").regex(/^\d+$/, "NISN harus berupa angka").max(20, "NISN maksimal 20 karakter"),
  name: z.string().trim().min(1, "Nama wajib diisi").max(100, "Nama maksimal 100 karakter"),
  level: z.enum(["SMP", "SMA"], { required_error: "Jenjang wajib dipilih" }),
  class: z.string().trim().min(1, "Kelas wajib dipilih"),
  rfid: z.string().trim().min(1, "RFID wajib diisi").max(30, "RFID maksimal 30 karakter"),
});

type SiswaForm = z.infer<typeof siswaSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TambahSiswaModal({ open, onClose }: Props) {
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<SiswaForm>({
    resolver: zodResolver(siswaSchema),
    defaultValues: { nisn: "", name: "", level: undefined, class: "", rfid: "" },
  });

  const level = watch("level");
  const classes = level === "SMP" ? smpClasses : level === "SMA" ? smaClasses : [];

  const onSubmit = (data: SiswaForm) => {
    toast.success(`Data siswa "${data.name}" berhasil ditambahkan`);
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
              <h2 className="text-lg font-bold text-foreground">Tambah Data Siswa</h2>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <Field label="NISN" error={errors.nisn?.message}>
                <input {...register("nisn")} placeholder="Masukkan NISN" className="form-input" />
              </Field>
              <Field label="Nama Lengkap" error={errors.name?.message}>
                <input {...register("name")} placeholder="Masukkan nama lengkap" className="form-input" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Jenjang" error={errors.level?.message}>
                  <select {...register("level")} className="form-input cursor-pointer">
                    <option value="">Pilih Jenjang</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA">SMA</option>
                  </select>
                </Field>
                <Field label="Kelas" error={errors.class?.message}>
                  <select {...register("class")} className="form-input cursor-pointer" disabled={!level}>
                    <option value="">Pilih Kelas</option>
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="RFID" error={errors.rfid?.message}>
                <input {...register("rfid")} placeholder="Scan atau masukkan RFID" className="form-input" />
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
