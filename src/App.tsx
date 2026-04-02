import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth-context";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import JadwalPage from "./pages/dashboard/JadwalPage";
import PerizinanPage from "./pages/dashboard/PerizinanPage";
import PlaceholderPage from "./pages/dashboard/PlaceholderPage";
import GuruSiswaPage from "./pages/dashboard/GuruSiswaPage";
import GuruAbsenPage from "./pages/dashboard/GuruAbsenPage";
import PetugasAbsensiPage from "./pages/dashboard/PetugasAbsensiPage";
import PetugasPerizinanPage from "./pages/dashboard/PetugasPerizinanPage";
import PetugasJadwalPage from "./pages/dashboard/PetugasJadwalPage";
import PetugasLaporanPage from "./pages/dashboard/PetugasLaporanPage";
import AdminJadwalPage from "./pages/dashboard/AdminJadwalPage";
import AdminSiswaPage from "./pages/dashboard/AdminSiswaPage";
import AdminGuruPage from "./pages/dashboard/AdminGuruPage";
import AdminLaporanPage from "./pages/dashboard/AdminLaporanPage";
import AdminBeritaPage from "./pages/dashboard/AdminBeritaPage";
import AdminGaleriPage from "./pages/dashboard/AdminGaleriPage";
import TampilanPage from "./pages/dashboard/TampilanPage";
import AkunPage from "./pages/dashboard/AkunPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="jadwal" element={<AdminJadwalPage />} />
              <Route path="guru-siswa" element={<GuruSiswaPage />} />
              <Route path="guru-absen" element={<GuruAbsenPage />} />
              <Route path="perizinan" element={<PerizinanPage />} />
              <Route path="absensi" element={<PetugasAbsensiPage />} />
              <Route path="petugas-perizinan" element={<PetugasPerizinanPage />} />
              <Route path="petugas-jadwal" element={<PetugasJadwalPage />} />
              <Route path="petugas-laporan" element={<PetugasLaporanPage />} />
              <Route path="siswa" element={<AdminSiswaPage />} />
              <Route path="guru" element={<AdminGuruPage />} />
              <Route path="berita" element={<AdminBeritaPage />} />
              <Route path="galeri" element={<AdminGaleriPage />} />
              <Route path="laporan" element={<AdminLaporanPage />} />
              <Route path="guru-jadwal" element={<JadwalPage />} />
              <Route path="petugas" element={<PlaceholderPage />} />
              <Route path="tampilan" element={<TampilanPage />} />
              <Route path="akun" element={<AkunPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
