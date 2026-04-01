import { useAuth } from "@/lib/auth-context";
import GuruDashboard from "./GuruDashboard";
import PetugasDashboard from "./PetugasDashboard";
import AdminDashboardHome from "./AdminDashboardHome";

export default function DashboardHome() {
  const { user } = useAuth();
  if (user?.role === "guru") return <GuruDashboard />;
  if (user?.role === "petugas") return <PetugasDashboard />;
  return <AdminDashboardHome />;
}
