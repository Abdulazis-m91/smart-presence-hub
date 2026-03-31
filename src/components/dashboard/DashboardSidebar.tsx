import {
  LayoutDashboard, Calendar, Users, ClipboardCheck, FileText,
  Newspaper, Image, BarChart3, UserCog, Palette, LogOut, ChevronLeft,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import logoYayasan from "@/assets/logo-yayasan.png";
import { useAuth, UserRole } from "@/lib/auth-context";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const menusByRole: Record<UserRole, MenuItem[]> = {
  guru: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Jadwal Mengajar", url: "/dashboard/jadwal", icon: Calendar },
    { title: "Perizinan", url: "/dashboard/perizinan", icon: FileText },
  ],
  petugas: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Absensi", url: "/dashboard/absensi", icon: ClipboardCheck },
    { title: "Perizinan", url: "/dashboard/perizinan", icon: FileText },
    { title: "Laporan", url: "/dashboard/laporan", icon: BarChart3 },
  ],
  admin: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Jadwal Mengajar", url: "/dashboard/jadwal", icon: Calendar },
    { title: "Data Siswa", url: "/dashboard/siswa", icon: Users },
    { title: "Absensi", url: "/dashboard/absensi", icon: ClipboardCheck },
    { title: "Perizinan", url: "/dashboard/perizinan", icon: FileText },
    { title: "Berita", url: "/dashboard/berita", icon: Newspaper },
    { title: "Galeri", url: "/dashboard/galeri", icon: Image },
    { title: "Laporan", url: "/dashboard/laporan", icon: BarChart3 },
  ],
  developer: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Jadwal Mengajar", url: "/dashboard/jadwal", icon: Calendar },
    { title: "Data Siswa", url: "/dashboard/siswa", icon: Users },
    { title: "Absensi", url: "/dashboard/absensi", icon: ClipboardCheck },
    { title: "Perizinan", url: "/dashboard/perizinan", icon: FileText },
    { title: "Berita", url: "/dashboard/berita", icon: Newspaper },
    { title: "Galeri", url: "/dashboard/galeri", icon: Image },
    { title: "Laporan", url: "/dashboard/laporan", icon: BarChart3 },
    { title: "Petugas", url: "/dashboard/petugas", icon: UserCog },
    { title: "Tampilan", url: "/dashboard/tampilan", icon: Palette },
  ],
};

const roleLabels: Record<UserRole, string> = {
  guru: "Guru",
  petugas: "Petugas",
  admin: "Admin",
  developer: "Developer",
};

const roleColors: Record<UserRole, string> = {
  guru: "from-blue-500 to-cyan-500",
  petugas: "from-emerald-500 to-teal-500",
  admin: "from-violet-500 to-purple-500",
  developer: "from-orange-500 to-amber-500",
};

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  if (!user) return null;

  const menu = menusByRole[user.role];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center gap-3">
          <div className="relative shrink-0">
            <img src={logoYayasan} alt="Logo" className="h-10 w-10 rounded-xl object-contain" />
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-secondary rounded-full border-2 border-sidebar" />
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="font-bold text-sidebar-foreground text-sm">SmartPresence</span>
              <p className="text-[10px] text-sidebar-foreground/40">Attendance System</p>
            </motion.div>
          )}
        </div>

        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-sidebar-foreground/30 text-[10px] uppercase tracking-widest font-semibold px-4">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {menu.map((item, i) => {
                const isActive = item.url === "/dashboard"
                  ? location.pathname === "/dashboard"
                  : location.pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/dashboard"}
                        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "text-sidebar-primary-foreground"
                            : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }`}
                        activeClassName=""
                      >
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 rounded-xl bg-sidebar-primary shadow-lg shadow-sidebar-primary/20"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <item.icon className="relative h-4 w-4 shrink-0" />
                        {!collapsed && <span className="relative">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User card */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-3 mt-auto mb-1"
          >
            <div className={`rounded-2xl bg-gradient-to-r ${roleColors[user.role]} p-[1px]`}>
              <div className="rounded-2xl bg-sidebar p-3">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${roleColors[user.role]} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-sidebar-accent-foreground truncate">{user.name}</p>
                    <p className="text-[11px] text-sidebar-foreground/50">{roleLabels[user.role]}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Logout */}
        <div className="p-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-sm text-sidebar-foreground/40 hover:text-destructive transition-all p-3 rounded-xl hover:bg-destructive/10 group"
          >
            <LogOut className="h-4 w-4 shrink-0 group-hover:rotate-12 transition-transform" />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
