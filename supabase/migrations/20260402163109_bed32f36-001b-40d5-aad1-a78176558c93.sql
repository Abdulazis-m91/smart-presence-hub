
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('guru', 'petugas', 'admin', 'developer');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role public.app_role NOT NULL DEFAULT 'guru',
  whatsapp TEXT DEFAULT '',
  photo_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Create siswa (students) table
CREATE TABLE public.siswa (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nisn TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('SMP', 'SMA')),
  class TEXT NOT NULL,
  rfid TEXT NOT NULL DEFAULT '',
  photo_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create guru (teachers/staff) table
CREATE TABLE public.guru (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nip TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Guru', 'Staff')),
  subject TEXT DEFAULT '-',
  levels TEXT[] DEFAULT '{}',
  email TEXT NOT NULL DEFAULT '',
  whatsapp TEXT DEFAULT '',
  rfid TEXT NOT NULL DEFAULT '',
  photo_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create jadwal (schedules) table
CREATE TABLE public.jadwal (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day TEXT NOT NULL,
  teacher_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('SMP', 'SMA')),
  class TEXT NOT NULL,
  time_start TEXT NOT NULL,
  time_end TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create absensi (attendance) table
CREATE TABLE public.absensi (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  person_name TEXT NOT NULL,
  person_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Siswa', 'Guru', 'Staff')),
  subject TEXT DEFAULT '-',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  level TEXT DEFAULT '-',
  class TEXT DEFAULT '-',
  check_in TEXT DEFAULT '-',
  check_out TEXT DEFAULT '-',
  status TEXT NOT NULL CHECK (status IN ('Hadir', 'Terlambat', 'Tidak Hadir', 'Izin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create berita (news) table
CREATE TABLE public.berita (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  author TEXT NOT NULL DEFAULT 'Admin',
  status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft')),
  image TEXT DEFAULT '📰',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create galeri (gallery) table
CREATE TABLE public.galeri (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  image_url TEXT DEFAULT '',
  emoji TEXT DEFAULT '📷',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create site_settings table for landing page customization
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jadwal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.absensi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeri ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies: All authenticated users can CRUD all data
-- Profiles
CREATE POLICY "Authenticated users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert profiles" ON public.profiles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update profiles" ON public.profiles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete profiles" ON public.profiles FOR DELETE TO authenticated USING (true);

-- User roles
CREATE POLICY "Authenticated users can view roles" ON public.user_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (true);

-- Siswa
CREATE POLICY "Authenticated users can view siswa" ON public.siswa FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert siswa" ON public.siswa FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update siswa" ON public.siswa FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete siswa" ON public.siswa FOR DELETE TO authenticated USING (true);

-- Guru
CREATE POLICY "Authenticated users can view guru" ON public.guru FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert guru" ON public.guru FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update guru" ON public.guru FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete guru" ON public.guru FOR DELETE TO authenticated USING (true);

-- Jadwal
CREATE POLICY "Authenticated users can view jadwal" ON public.jadwal FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert jadwal" ON public.jadwal FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update jadwal" ON public.jadwal FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete jadwal" ON public.jadwal FOR DELETE TO authenticated USING (true);

-- Absensi
CREATE POLICY "Authenticated users can view absensi" ON public.absensi FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert absensi" ON public.absensi FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update absensi" ON public.absensi FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete absensi" ON public.absensi FOR DELETE TO authenticated USING (true);

-- Berita
CREATE POLICY "Authenticated users can view berita" ON public.berita FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert berita" ON public.berita FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update berita" ON public.berita FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete berita" ON public.berita FOR DELETE TO authenticated USING (true);

-- Galeri
CREATE POLICY "Authenticated users can view galeri" ON public.galeri FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert galeri" ON public.galeri FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update galeri" ON public.galeri FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete galeri" ON public.galeri FOR DELETE TO authenticated USING (true);

-- Site settings
CREATE POLICY "Authenticated users can view settings" ON public.site_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update settings" ON public.site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete settings" ON public.site_settings FOR DELETE TO authenticated USING (true);

-- Also allow public read for berita, galeri, site_settings (for landing page)
CREATE POLICY "Public can view published berita" ON public.berita FOR SELECT TO anon USING (status = 'Published');
CREATE POLICY "Public can view galeri" ON public.galeri FOR SELECT TO anon USING (true);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT TO anon USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_siswa_updated_at BEFORE UPDATE ON public.siswa FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_guru_updated_at BEFORE UPDATE ON public.guru FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_jadwal_updated_at BEFORE UPDATE ON public.jadwal FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_berita_updated_at BEFORE UPDATE ON public.berita FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user signup - create profile automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'guru')
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'guru')
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
