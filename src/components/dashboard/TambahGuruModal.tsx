import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, User } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const subjects = ["Matematika", "B. Indonesia", "Fisika", "Biologi", "Kimia", "B. Inggris", "Sejarah", "Geografi", "Penjaskes", "Seni Budaya"];

const guruSchema = z.object({
  nip: z.string().trim().min(1, "NIP wajib diisi").regex(/^\d+$/, "NIP harus berupa angka").max(30),
  name: z.string().trim().min(1, "Nama wajib diisi").max(100),
  status: z.enum(["Guru", "Staff"], { required_error: "Status wajib dipilih" }),
  rfid: z.string().trim().min(1, "RFID wajib diisi").max(30),
  subject: z.string().optional(),
  level: z.string().optional(),
  email: z.string().trim().min(1, "Email wajib diisi").email("Format email tidak valid").max(255),
  wa: z.string().trim().min(1, "WhatsApp wajib diisi").regex(/^[\d+]+$/, "Nomor tidak valid").max(20),
  password: z.string().min(6, "Password minimal 6 karakter").max(100),
});

type GuruForm = z.infer<typeof guruSchema>;

export interface GuruData {
  nip: string;
  name: string;
  status: "Guru" | "Staff";
  rfid?: string;
  subject?: string;
  level?: string;
  email: string;
  wa: string;
  photo?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: GuruData | null;
}

export default function TambahGuruModal({ open, onClose, editData }: Props) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(editData?.photo || null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<GuruForm>({
    resolver: zodResolver(guruSchema),
    defaultValues: editData ? {
      nip: editData.nip,
      name: editData.name,
      status: editData.status,
      rfid: editData.rfid || "",
      subject: editData.subject || "",
      level: editData.level || "",
      email: editData.email,
      wa: editData.wa,
      password: "",
    } : { nip: "", name: "", status: undefined, rfid: "", subject: "", level: "", email: "", wa: "", password: "" },
  });

  const status = watch("status");
  const subject = watch("subject");

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: GuruForm) => {
    toast.success(`Data ${data.status === "Staff" ? "staff" : "guru"} "${data.name}" berhasil ${editData ? "diperbarui" : "ditambahkan"}`);
    reset();
    setPhotoPreview(null);
    onClose();
  };

  const handleClose = () => {
    reset();
    setPhotoPreview(editData?.photo || null);
    onClose();
  };

  const isEdit = !!editData;

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
            className="relative w-full max-w-2xl bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/30 sticky top-0 bg-background z-10">
              <h2 className="text-lg font-bold text-foreground">{isEdit ? "Edit" : "Tambah"} Data Guru</h2>
              <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              <div className="flex gap-6">
                {/* Left: Photo */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="h-32 w-32 rounded-2xl bg-muted/30 border-2 border-dashed border-border/50 flex items-center justify-center overflow-hidden">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-12 w-12 text-muted-foreground/40" />
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-muted/30 text-xs font-medium text-foreground hover:bg-muted/50 transition-all">
                    <Upload className="h-3.5 w-3.5" /> Upload Foto
                  </button>
                </div>

                {/* Right: Form fields */}
                <div className="flex-1 space-y-4 min-w-0">
                  {/* Row 1: NIP + Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="NIP" error={errors.nip?.message}>
                      <input {...register("nip")} placeholder="Masukkan NIP" className="form-input" />
                    </Field>
                    <Field label="Nama Lengkap" error={errors.name?.message}>
                      <input {...register("name")} placeholder="Masukkan nama" className="form-input" />
                    </Field>
                  </div>

                  {/* Row 2: Status + RFID */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Status" error={errors.status?.message}>
                      <select {...register("status")} className="form-input cursor-pointer">
                        <option value="">Pilih Status</option>
                        <option value="Guru">Guru</option>
                        <option value="Staff">Staff</option>
                      </select>
                    </Field>
                    <Field label="RFID" error={errors.rfid?.message}>
                      <input {...register("rfid")} placeholder="Scan atau masukkan RFID" className="form-input" />
                    </Field>
                  </div>

                  {/* Conditional: Subject + Level (only for Guru) */}
                  {status === "Guru" && (
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Mata Pelajaran" error={errors.subject?.message}>
                        <select {...register("subject")} className="form-input cursor-pointer">
                          <option value="">Pilih Mapel</option>
                          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>
                      <Field label="Jenjang" error={errors.level?.message}>
                        <select {...register("level")} className="form-input cursor-pointer" disabled={!subject}>
                          <option value="">{subject ? "Pilih Jenjang" : "Pilih mapel dulu"}</option>
                          <option value="SMP">SMP</option>
                          <option value="SMA">SMA</option>
                        </select>
                      </Field>
                    </div>
                  )}

                  {/* Row 3: Email + WA */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Email" error={errors.email?.message}>
                      <input {...register("email")} type="email" placeholder="contoh@school.id" className="form-input" />
                    </Field>
                    <Field label="WhatsApp" error={errors.wa?.message}>
                      <input {...register("wa")} placeholder="08xxxxxxxxxx" className="form-input" />
                    </Field>
                  </div>

                  {/* Row 4: Password */}
                  <Field label="Password" error={errors.password?.message}>
                    <input {...register("password")} type="password" placeholder={isEdit ? "Kosongkan jika tidak diubah" : "Masukkan password"} className="form-input" />
                  </Field>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 mt-2 border-t border-border/20">
                <button type="button" onClick={handleClose} className="flex-1 px-4 py-2.5 rounded-xl bg-muted/30 text-sm font-medium text-foreground hover:bg-muted/50 transition-all">
                  Batal
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50">
                  {isEdit ? "Simpan Perubahan" : "Simpan Data"}
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
