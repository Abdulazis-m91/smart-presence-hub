-- Security fix: replace blanket "USING (true)" policies with role-scoped policies.
-- Uses the existing public.has_role(user_id, role) SECURITY DEFINER function.

-- ============ user_roles ============
-- Only admin/developer can view, insert, update, delete roles.
-- (Previously any authenticated user could grant themselves any role.)
DROP POLICY IF EXISTS "Authenticated users can view roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can delete roles" ON public.user_roles;

CREATE POLICY "Users can view their own role, admins view all"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can insert roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can update roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can delete roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

-- ============ profiles ============
-- Everyone authenticated can view all profiles (needed for dashboards/lists).
-- But only admins/developer or the owner can update; only admin/developer can delete.
DROP POLICY IF EXISTS "Authenticated users can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can delete profiles" ON public.profiles;

CREATE POLICY "Users can update own profile, admins update all"
  ON public.profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can delete profiles"
  ON public.profiles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

-- Note: profile INSERT is handled by the handle_new_user() trigger (SECURITY DEFINER),
-- so we intentionally do not add a broad authenticated INSERT policy here.

-- ============ siswa (students) ============
DROP POLICY IF EXISTS "Authenticated users can insert siswa" ON public.siswa;
DROP POLICY IF EXISTS "Authenticated users can update siswa" ON public.siswa;
DROP POLICY IF EXISTS "Authenticated users can delete siswa" ON public.siswa;

CREATE POLICY "Admin/petugas can insert siswa"
  ON public.siswa FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer') OR public.has_role(auth.uid(), 'petugas'));

CREATE POLICY "Admin/petugas can update siswa"
  ON public.siswa FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer') OR public.has_role(auth.uid(), 'petugas'));

CREATE POLICY "Only admin/developer can delete siswa"
  ON public.siswa FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

-- ============ guru (teachers/staff) ============
DROP POLICY IF EXISTS "Authenticated users can insert guru" ON public.guru;
DROP POLICY IF EXISTS "Authenticated users can update guru" ON public.guru;
DROP POLICY IF EXISTS "Authenticated users can delete guru" ON public.guru;

CREATE POLICY "Only admin/developer can insert guru"
  ON public.guru FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can update guru"
  ON public.guru FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can delete guru"
  ON public.guru FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

-- ============ jadwal (schedules) ============
DROP POLICY IF EXISTS "Authenticated users can insert jadwal" ON public.jadwal;
DROP POLICY IF EXISTS "Authenticated users can update jadwal" ON public.jadwal;
DROP POLICY IF EXISTS "Authenticated users can delete jadwal" ON public.jadwal;

CREATE POLICY "Admin/petugas can insert jadwal"
  ON public.jadwal FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer') OR public.has_role(auth.uid(), 'petugas'));

CREATE POLICY "Admin/petugas can update jadwal"
  ON public.jadwal FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer') OR public.has_role(auth.uid(), 'petugas'));

CREATE POLICY "Only admin/developer can delete jadwal"
  ON public.jadwal FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

-- ============ absensi (attendance) ============
-- Insert stays open to any authenticated user (petugas/guru scanning RFID at the door),
-- but update/delete of attendance records is restricted to admin/petugas.
DROP POLICY IF EXISTS "Authenticated users can update absensi" ON public.absensi;
DROP POLICY IF EXISTS "Authenticated users can delete absensi" ON public.absensi;

CREATE POLICY "Admin/petugas can update absensi"
  ON public.absensi FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer') OR public.has_role(auth.uid(), 'petugas'));

CREATE POLICY "Only admin/developer can delete absensi"
  ON public.absensi FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

-- ============ berita (news) ============
DROP POLICY IF EXISTS "Authenticated users can insert berita" ON public.berita;
DROP POLICY IF EXISTS "Authenticated users can update berita" ON public.berita;
DROP POLICY IF EXISTS "Authenticated users can delete berita" ON public.berita;

CREATE POLICY "Only admin/developer can insert berita"
  ON public.berita FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can update berita"
  ON public.berita FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can delete berita"
  ON public.berita FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

-- ============ galeri (gallery) ============
DROP POLICY IF EXISTS "Authenticated users can insert galeri" ON public.galeri;
DROP POLICY IF EXISTS "Authenticated users can update galeri" ON public.galeri;
DROP POLICY IF EXISTS "Authenticated users can delete galeri" ON public.galeri;

CREATE POLICY "Only admin/developer can insert galeri"
  ON public.galeri FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can update galeri"
  ON public.galeri FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can delete galeri"
  ON public.galeri FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

-- ============ site_settings ============
DROP POLICY IF EXISTS "Authenticated users can insert settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated users can update settings" ON public.site_settings;
DROP POLICY IF EXISTS "Authenticated users can delete settings" ON public.site_settings;

CREATE POLICY "Only admin/developer can insert settings"
  ON public.site_settings FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can update settings"
  ON public.site_settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Only admin/developer can delete settings"
  ON public.site_settings FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'developer'));
