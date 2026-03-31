import {
  LayoutDashboard, Calendar, Users, ClipboardCheck, FileText,
  Newspaper, Image, BarChart3, UserCog, Palette, LogOut, CreditCard,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth, UserRole } from "@/lib/auth-context";
import { useNavigate, useLocation } from "react-router-dom";
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
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className="p-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
            <CreditCard className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-bold text-sidebar-foreground">SmartPresence</span>}
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="px-4 pb-4">
            <div className="rounded-xl bg-sidebar-accent p-3">
              <p className="text-sm font-semibold text-sidebar-accent-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60">{roleLabels[user.role]}</p>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-primary text-sidebar-primary-foreground"
                    >
                      <item.icon className="h-4 w-4 mr-2 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-sm text-sidebar-foreground/60 hover:text-destructive transition-colors p-2 rounded-lg hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
