import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 glass-strong">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-sm font-semibold text-foreground">Dashboard</h1>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
