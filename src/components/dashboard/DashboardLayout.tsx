import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import MobileBottomNav from "./MobileBottomNav";
import ProfilePopup from "./ProfilePopup";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, ChevronRight, Home, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/jadwal": "Jadwal Pelajaran",
  "/dashboard/perizinan": "Perizinan",
  "/dashboard/siswa": "Data Siswa",
  "/dashboard/guru": "Data Guru",
  "/dashboard/absensi": "Absensi",
  "/dashboard/guru-siswa": "Data Siswa",
  "/dashboard/guru-absen": "Absensi",
  "/dashboard/guru-jadwal": "Jadwal Mengajar",
  "/dashboard/berita": "Berita",
  "/dashboard/galeri": "Galeri",
  "/dashboard/laporan": "Laporan",
  "/dashboard/petugas": "Petugas",
  "/dashboard/tampilan": "Tampilan",
  "/dashboard/akun": "Manajemen Akun",
  "/dashboard/petugas-perizinan": "Perizinan Guru",
  "/dashboard/petugas-jadwal": "Daftar Mengajar",
  "/dashboard/petugas-laporan": "Laporan",
};

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [profileOpen, setProfileOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {!isMobile && <DashboardSidebar />}

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 h-14 md:h-16 flex items-center justify-between border-b border-border/50 px-4 md:px-6 bg-background/80 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              {!isMobile && (
                <SidebarTrigger className="hover:bg-muted rounded-xl p-2 transition-colors" />
              )}
              {isMobile ? (
                <span className="font-bold text-foreground text-base">{currentTitle}</span>
              ) : (
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                  <span className="font-medium text-foreground">{currentTitle}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border/50 w-64 group focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input type="text" placeholder="Cari menu, data..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" />
              </div>
              <button className="relative p-2 md:p-2.5 rounded-xl hover:bg-muted/50 transition-colors group">
                <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="absolute top-1.5 right-1.5 md:top-2 md:right-2 h-2 w-2 bg-destructive rounded-full animate-pulse" />
              </button>
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 md:gap-3 pl-2 md:pl-3 border-l border-border/50 hover:opacity-80 transition-opacity cursor-pointer">
                {user.photo_url ? (
                  <img src={user.photo_url} alt={user.name} className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover" />
                ) : (
                  <div className="h-8 w-8 md:h-9 md:w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-foreground leading-tight">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </button>
            </div>
          </header>

          <ProfilePopup open={profileOpen} onClose={() => setProfileOpen(false)} />

          <main className={`flex-1 p-4 md:p-6 overflow-auto ${isMobile ? "pb-24" : ""}`}>
            <AnimatePresence mode="wait">
              <motion.div key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25, ease: "easeOut" }}>
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {isMobile && <MobileBottomNav />}
      </div>
    </SidebarProvider>
  );
}
