import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// ============ SISWA ============
export function useSiswa() {
  return useQuery({
    queryKey: ["siswa"],
    queryFn: async () => {
      const { data, error } = await supabase.from("siswa").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateSiswa() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (siswa: { nisn: string; name: string; level: string; class: string; rfid: string; photo_url?: string }) => {
      const { data, error } = await supabase.from("siswa").insert(siswa).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["siswa"] }); toast.success("Data siswa berhasil ditambahkan"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateSiswa() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; nisn?: string; name?: string; level?: string; class?: string; rfid?: string; photo_url?: string }) => {
      const { data, error } = await supabase.from("siswa").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["siswa"] }); toast.success("Data siswa berhasil diperbarui"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteSiswa() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("siswa").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["siswa"] }); toast.success("Data siswa berhasil dihapus"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

// ============ GURU ============
export function useGuru() {
  return useQuery({
    queryKey: ["guru"],
    queryFn: async () => {
      const { data, error } = await supabase.from("guru").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateGuru() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (guru: { nip: string; name: string; status: string; subject?: string; levels?: string[]; email: string; whatsapp?: string; rfid: string; photo_url?: string }) => {
      const { data, error } = await supabase.from("guru").insert(guru).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["guru"] }); toast.success("Data guru berhasil ditambahkan"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateGuru() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { data, error } = await supabase.from("guru").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["guru"] }); toast.success("Data guru berhasil diperbarui"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteGuru() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("guru").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["guru"] }); toast.success("Data guru berhasil dihapus"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

// ============ JADWAL ============
export function useJadwal() {
  return useQuery({
    queryKey: ["jadwal"],
    queryFn: async () => {
      const { data, error } = await supabase.from("jadwal").select("*").order("day").order("time_start");
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateJadwal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (jadwal: { day: string; teacher_name: string; subject: string; level: string; class: string; time_start: string; time_end: string }) => {
      const { data, error } = await supabase.from("jadwal").insert(jadwal).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["jadwal"] }); toast.success("Jadwal berhasil ditambahkan"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateJadwal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { data, error } = await supabase.from("jadwal").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["jadwal"] }); toast.success("Jadwal berhasil diperbarui"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteJadwal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("jadwal").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["jadwal"] }); toast.success("Jadwal berhasil dihapus"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

// ============ BERITA ============
export function useBerita() {
  return useQuery({
    queryKey: ["berita"],
    queryFn: async () => {
      const { data, error } = await supabase.from("berita").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateBerita() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (berita: { title: string; excerpt?: string; content?: string; status?: string; image?: string; date?: string; author?: string }) => {
      const { data, error } = await supabase.from("berita").insert(berita).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["berita"] }); toast.success("Berita berhasil ditambahkan"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateBerita() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { data, error } = await supabase.from("berita").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["berita"] }); toast.success("Berita berhasil diperbarui"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteBerita() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("berita").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["berita"] }); toast.success("Berita berhasil dihapus"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

// ============ GALERI ============
export function useGaleri() {
  return useQuery({
    queryKey: ["galeri"],
    queryFn: async () => {
      const { data, error } = await supabase.from("galeri").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateGaleri() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (galeri: { title: string; date?: string; image_url?: string; emoji?: string }) => {
      const { data, error } = await supabase.from("galeri").insert(galeri).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["galeri"] }); toast.success("Foto berhasil ditambahkan"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteGaleri() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("galeri").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["galeri"] }); toast.success("Foto berhasil dihapus"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

// ============ ABSENSI ============
export function useAbsensi() {
  return useQuery({
    queryKey: ["absensi"],
    queryFn: async () => {
      const { data, error } = await supabase.from("absensi").select("*").order("date", { ascending: false }).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateAbsensi() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (absensi: { person_name: string; person_id: string; role: string; subject?: string; date?: string; level?: string; class?: string; check_in?: string; check_out?: string; status: string }) => {
      const { data, error } = await supabase.from("absensi").insert(absensi).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["absensi"] }); toast.success("Absensi berhasil dicatat"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

// ============ PROFILES / AKUN ============
export function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { data, error } = await supabase.from("profiles").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["profiles"] }); toast.success("Profil berhasil diperbarui"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

// ============ SITE SETTINGS ============
export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      return data;
    },
  });
}

export function useUpsertSiteSetting() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { data, error } = await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["site_settings"] }); },
    onError: (e: Error) => toast.error(e.message),
  });
}
