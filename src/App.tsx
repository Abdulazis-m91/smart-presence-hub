import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
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
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
