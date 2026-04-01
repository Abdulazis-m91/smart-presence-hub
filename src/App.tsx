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
              <Route path="jadwal" element={<JadwalPage />} />
              <Route path="perizinan" element={<PerizinanPage />} />
              <Route path="absensi" element={<PlaceholderPage />} />
              <Route path="siswa" element={<PlaceholderPage />} />
              <Route path="berita" element={<PlaceholderPage />} />
              <Route path="galeri" element={<PlaceholderPage />} />
              <Route path="laporan" element={<PlaceholderPage />} />
              <Route path="petugas" element={<PlaceholderPage />} />
              <Route path="tampilan" element={<PlaceholderPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
