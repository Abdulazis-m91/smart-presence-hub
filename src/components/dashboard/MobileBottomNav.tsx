import { useAuth, UserRole } from "@/lib/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Calendar, FileText, ClipboardCheck, BarChart3,
  Users, Settings, MoreHorizontal, Newspaper, Image,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

interface MobileNavItem {
  title: string;
  url: string;
  icon: React.ElementType;
  children?: { title: string; url: string; icon: React.ElementType }[];
}

const mobileMenusByRole: Record<UserRole, MobileNavItem[]> = {
  guru: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Jadwal", url: "/dashboard/jadwal", icon: Calendar },
    { title: "Siswa", url: "/dashboard/guru-siswa", icon: Users },
    { title: "Absen", url: "/dashboard/guru-absen", icon: ClipboardCheck },
    { title: "Perizinan", url: "/dashboard/perizinan", icon: FileText },
  ],
  petugas: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Absensi", url: "/dashboard/absensi", icon: ClipboardCheck },
    { title: "Laporan", url: "/dashboard/petugas-laporan", icon: BarChart3 },
    {
      title: "Lainnya", url: "#more", icon: MoreHorizontal,
      children: [
        { title: "Perizinan", url: "/dashboard/petugas-perizinan", icon: FileText },
        { title: "Jadwal", url: "/dashboard/petugas-jadwal", icon: Calendar },
      ],
    },
  ],
  admin: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Data", url: "/dashboard/siswa", icon: Users },
    { title: "Absensi", url: "/dashboard/absensi", icon: ClipboardCheck },
    { title: "Laporan", url: "/dashboard/laporan", icon: BarChart3 },
    {
      title: "Lainnya", url: "#more", icon: MoreHorizontal,
      children: [
        { title: "Berita", url: "/dashboard/berita", icon: Newspaper },
        { title: "Galeri", url: "/dashboard/galeri", icon: Image },
        { title: "Perizinan", url: "/dashboard/perizinan", icon: FileText },
        { title: "Jadwal", url: "/dashboard/jadwal", icon: Calendar },
      ],
    },
  ],
  developer: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Data", url: "/dashboard/siswa", icon: Users },
    { title: "Absensi", url: "/dashboard/absensi", icon: ClipboardCheck },
    { title: "Laporan", url: "/dashboard/laporan", icon: BarChart3 },
    {
      title: "Pengaturan", url: "#more", icon: Settings,
      children: [
        { title: "Berita", url: "/dashboard/berita", icon: Newspaper },
        { title: "Galeri", url: "/dashboard/galeri", icon: Image },
        { title: "Perizinan", url: "/dashboard/perizinan", icon: FileText },
        { title: "Jadwal", url: "/dashboard/jadwal", icon: Calendar },
        { title: "Petugas", url: "/dashboard/petugas", icon: Settings },
        { title: "Tampilan", url: "/dashboard/tampilan", icon: Settings },
      ],
    },
  ],
};

export default function MobileBottomNav() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

  if (!user) return null;

  const menu = mobileMenusByRole[user.role];

  const isActive = (item: MobileNavItem) => {
    if (item.url === "/dashboard") return location.pathname === "/dashboard";
    if (item.children) return item.children.some(c => location.pathname.startsWith(c.url));
    return location.pathname.startsWith(item.url);
  };

  const handleTap = (item: MobileNavItem) => {
    if (item.children) {
      setMoreOpen(!moreOpen);
    } else {
      setMoreOpen(false);
      navigate(item.url);
    }
  };

  return (
    <>
      {/* More menu overlay */}
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed bottom-20 left-3 right-3 z-50 rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl p-3 shadow-2xl"
            >
              <div className="grid grid-cols-3 gap-2">
                {menu.find(m => m.children)?.children?.map((child) => {
                  const active = location.pathname.startsWith(child.url);
                  return (
                    <motion.button
                      key={child.url}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => { navigate(child.url); setMoreOpen(false); }}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-colors ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/50"
                      }`}
                    >
                      <child.icon className="h-5 w-5" />
                      <span className="text-[11px] font-medium">{child.title}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="border-t border-border/30 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center justify-around px-1 pb-[env(safe-area-inset-bottom)]">
            {menu.map((item) => {
              const active = isActive(item);
              return (
                <motion.button
                  key={item.title}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => handleTap(item)}
                  className="relative flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[60px] min-h-[56px]"
                >
                  {active && (
                    <motion.div
                      layoutId="mobile-nav-active"
                      className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <motion.div
                    animate={active ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <item.icon
                      className={`h-5 w-5 transition-colors duration-200 ${
                        active ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </motion.div>
                  <span
                    className={`text-[10px] font-semibold transition-colors duration-200 ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="mobile-nav-glow"
                      className="absolute inset-0 rounded-xl bg-primary/5"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
