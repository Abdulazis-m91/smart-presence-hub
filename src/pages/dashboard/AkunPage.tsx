import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Search, Plus, Eye, Pencil, Trash2, X, Upload, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";
import { toast } from "sonner";
import { useProfiles } from "@/hooks/use-data";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

type AppRole = "guru" | "petugas" | "admin" | "developer";

interface ProfileRow {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: AppRole;
  photo_url: string | null;
  whatsapp: string | null;
}

const roleColors: Record<string, string> = {
  guru: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  petugas: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  admin: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  developer: "bg-orange-500/10 text-orange-600 border-orange-500/20",
};

const roleLabels: Record<string, string> = {
  guru: "Guru",
  petugas: "Petugas",
  admin: "Admin",
  developer: "Developer",
};

export default function AkunPage() {
  const { data: profiles, isLoading } = useProfiles();
  const { session } = useAuth();
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModal, setViewModal] = useState<ProfileRow | null>(null);
  const [editTarget, setEditTarget] = useState<ProfileRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProfileRow | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [form, setForm] = useState({ photo_url: "", name: "", role: "guru" as AppRole, email: "", whatsapp: "", password: "" });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const accounts = (profiles as ProfileRow[] | undefined) ?? [];
  const filtered = accounts.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({ photo_url: "", name: "", role: "guru", email: "", whatsapp: "", password: "" });
    setPhotoPreview(null);
    setEditTarget(null);
  };

  const openAdd = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEdit = (acc: ProfileRow) => {
    setEditTarget(acc);
    setForm({
      photo_url: acc.photo_url || "",
      name: acc.name,
      role: acc.role,
      email: acc.email,
      whatsapp: acc.whatsapp || "",
      password: "",
    });
    setPhotoPreview(acc.photo_url || null);
    setModalOpen(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setForm((prev) => ({ ...prev, photo_url: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const callManageUser = async (body: Record<string, any>) => {
    const { data, error } = await supabase.functions.invoke("manage-user", {
      body,
    });
    if (error) throw new Error(error.message);
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      toast.error("Nama dan email wajib diisi");
      return;
    }
    if (!editTarget && !form.password) {
      toast.error("Password wajib diisi untuk akun baru");
      return;
    }

    setSubmitting(true);
    try {
      if (editTarget) {
        await callManageUser({
          action: "update",
          user_id: editTarget.user_id,
          name: form.name,
          email: form.email,
          role: form.role,
          whatsapp: form.whatsapp,
          photo_url: form.photo_url,
          ...(form.password ? { password: form.password } : {}),
        });
        toast.success("Akun berhasil diperbarui");
      } else {
        await callManageUser({
          action: "create",
          email: form.email,
          password: form.password,
          name: form.name,
          role: form.role,
          whatsapp: form.whatsapp,
          photo_url: form.photo_url,
        });
        toast.success("Akun berhasil ditambahkan");
      }
      qc.invalidateQueries({ queryKey: ["profiles"] });
      setModalOpen(false);
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSubmitting(true);
    try {
      await callManageUser({
        action: "delete",
        user_id: deleteTarget.user_id,
      });
      toast.success("Akun berhasil dihapus");
      qc.invalidateQueries({ queryKey: ["profiles"] });
      setDeleteTarget(null);
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus akun");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Manajemen Akun
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola semua akun pengguna sistem</p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="h-4 w-4" /> Tambah Akun
        </Button>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Cari nama atau email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-16">Foto</TableHead>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Tidak ada data akun</TableCell>
              </TableRow>
            ) : (
              filtered.map((acc, idx) => (
                <motion.tr
                  key={acc.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <TableCell>
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                      {acc.photo_url ? (
                        <img src={acc.photo_url} alt={acc.name} className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{acc.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${roleColors[acc.role]} text-xs font-medium`}>
                      {roleLabels[acc.role]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{acc.email}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{acc.whatsapp || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => setViewModal(acc)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(acc)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setDeleteTarget(acc)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => { setModalOpen(false); resetForm(); }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-lg font-bold text-foreground">{editTarget ? "Edit Akun" : "Tambah Akun"}</h2>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setModalOpen(false); resetForm(); }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-6 flex gap-6">
                  {/* Left: Photo */}
                  <div className="shrink-0 flex flex-col items-center gap-3">
                    <div className="h-32 w-32 rounded-2xl bg-muted/30 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-12 w-12 text-muted-foreground/40" />
                      )}
                    </div>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg border border-border hover:bg-muted/50 transition-colors text-xs font-medium text-muted-foreground">
                      <Upload className="h-3.5 w-3.5" />
                      Upload Foto
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                  </div>

                  {/* Right: Form fields */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Nama Lengkap *</label>
                      <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Masukkan nama lengkap" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Role *</label>
                      <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as AppRole })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="guru">Guru</SelectItem>
                          <SelectItem value="petugas">Petugas</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="developer">Developer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Email *</label>
                      <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@contoh.com" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">WhatsApp</label>
                      <Input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="08xxxxxxxxxx" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Password {editTarget ? "(kosongkan jika tidak diubah)" : "*"}</label>
                      <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={editTarget ? "Biarkan kosong jika tidak diubah" : "Masukkan password"} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                  <Button variant="outline" onClick={() => { setModalOpen(false); resetForm(); }} disabled={submitting}>Batal</Button>
                  <Button onClick={handleSubmit} disabled={submitting}>
                    {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    {editTarget ? "Simpan Perubahan" : "Tambah Akun"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {viewModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setViewModal(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-lg font-bold text-foreground">Detail Akun</h2>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewModal(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                      {viewModal.photo_url ? (
                        <img src={viewModal.photo_url} alt={viewModal.name} className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{viewModal.name}</h3>
                      <Badge variant="outline" className={`${roleColors[viewModal.role]} text-xs mt-1`}>{roleLabels[viewModal.role]}</Badge>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium text-foreground">{viewModal.email}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">WhatsApp</span>
                      <span className="font-medium text-foreground">{viewModal.whatsapp || "-"}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-border">
                  <Button variant="outline" className="w-full" onClick={() => setViewModal(null)}>Tutup</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        message={`Apakah Anda yakin ingin menghapus akun "${deleteTarget?.name}"?`}
      />
    </div>
  );
}
