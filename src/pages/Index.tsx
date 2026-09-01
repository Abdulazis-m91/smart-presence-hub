import Header from "@/components/landing/Header";
import Banner from "@/components/landing/Banner";
import NewsSection from "@/components/landing/NewsSection";
import VisiSection from "@/components/landing/VisiSection";
import UnitPendidikanSection from "@/components/landing/UnitPendidikanSection";
import VokasiSection from "@/components/landing/VokasiSection";
import AktivitasSection from "@/components/landing/AktivitasSection";
import LokasiSection from "@/components/landing/LokasiSection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-white">
    <Header />
    <Banner />
    <NewsSection />
    <VisiSection />
    <UnitPendidikanSection />
    <VokasiSection />
    <AktivitasSection />
    <LokasiSection />
    <Footer />
  </div>
);

export default Index;
