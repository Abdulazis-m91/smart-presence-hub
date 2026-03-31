import Header from "@/components/landing/Header";
import HeroSlider from "@/components/landing/HeroSlider";
import InfoSection from "@/components/landing/InfoSection";
import NewsSection from "@/components/landing/NewsSection";
import GallerySection from "@/components/landing/GallerySection";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <HeroSlider />
    <InfoSection />
    <NewsSection />
    <GallerySection />
    <Footer />
  </div>
);

export default Index;
