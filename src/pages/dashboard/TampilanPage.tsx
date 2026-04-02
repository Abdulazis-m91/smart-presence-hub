import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Image, Type, Save, Eye, Upload, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface HeroSlide {
  id: string;
  title: string;
  highlight: string;
  subtitle: string;
}

interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description: string }[];
}

const defaultSlides: HeroSlide[] = [
  { id: "1", title: "Smart Attendance", highlight: "System", subtitle: "Sistem absensi modern berbasis RFID Smartcard untuk sekolah dan pesantren dengan teknologi terdepan" },
  { id: "2", title: "Real-Time", highlight: "Monitoring", subtitle: "Pantau kehadiran guru, siswa, dan staf secara langsung dari mana saja dengan dashboard interaktif" },
  { id: "3", title: "Laporan &", highlight: "Analitik", subtitle: "Dapatkan insight mendalam dengan laporan kehadiran otomatis, akurat, dan visual yang informatif" },
];

const defaultAbout: AboutContent = {
  title: "SmartPresence",
  subtitle: "Keunggulan Kami",
  description: "Solusi absensi cerdas yang dirancang khusus untuk kebutuhan sekolah dan pesantren modern",
  features: [
    { title: "Real-Time Processing", description: "Data kehadiran tercatat secara instan melalui teknologi RFID terkini" },
    { title: "Aman & Terenkripsi", description: "Sistem keamanan berlapis dengan enkripsi end-to-end" },
    { title: "Multi-Role Access", description: "Mendukung guru, siswa, petugas, dan administrator" },
    { title: "Akses Global", description: "Pantau kehadiran dari perangkat manapun" },
  ],
};

export default function TampilanPage() {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides);
  const [about, setAbout] = useState<AboutContent>(defaultAbout);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const updateSlide = (id: string, field: keyof HeroSlide, value: string) => {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const addSlide = () => {
    const newId = String(Date.now());
    setSlides((prev) => [...prev, { id: newId, title: "", highlight: "", subtitle: "" }]);
  };

  const removeSlide = (id: string) => {
    if (slides.length <= 1) {
      toast.error("Minimal harus ada 1 slide");
      return;
    }
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  const updateFeature = (index: number, field: "title" | "description", value: string) => {
    setAbout((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? { ...f, [field]: value } : f)),
    }));
  };

  const addFeature = () => {
    setAbout((prev) => ({ ...prev, features: [...prev.features, { title: "", description: "" }] }));
  };

  const removeFeature = (index: number) => {
    if (about.features.length <= 1) {
      toast.error("Minimal harus ada 1 fitur");
      return;
    }
    setAbout((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const handleSave = () => {
    toast.success("Pengaturan tampilan berhasil disimpan");
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBannerImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Palette className="h-6 w-6 text-primary" />
            Pengaturan Tampilan
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Kelola tampilan halaman utama website</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Simpan Perubahan
        </Button>
      </motion.div>

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="hero" className="gap-2"><Image className="h-4 w-4" /> Hero / Banner</TabsTrigger>
          <TabsTrigger value="about" className="gap-2"><Type className="h-4 w-4" /> Tentang Kami</TabsTrigger>
        </TabsList>

        {/* Hero / Banner Tab */}
        <TabsContent value="hero" className="space-y-4">
          {/* Banner Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Banner / Background Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6">
                <div className="w-64 h-36 rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-muted/30">
                  {bannerImage ? (
                    <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Image className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      <p className="text-xs">Belum ada gambar</p>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <label className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm font-medium">
                    <Upload className="h-4 w-4" />
                    Upload Gambar
                    <input type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
                  </label>
                  {bannerImage && (
                    <Button variant="ghost" size="sm" onClick={() => setBannerImage(null)} className="text-destructive hover:text-destructive">
                      <X className="h-4 w-4 mr-1" /> Hapus
                    </Button>
                  )}
                  <p className="text-xs text-muted-foreground">Format: JPG, PNG, WebP. Maks 2MB. Resolusi: 1920×800px.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Slides */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Slide Konten Hero</CardTitle>
              <Button variant="outline" size="sm" onClick={addSlide} className="gap-1">
                <Plus className="h-3.5 w-3.5" /> Tambah Slide
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {slides.map((slide, idx) => (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-xl border border-border p-4 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Slide {idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      onClick={() => removeSlide(slide.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Judul</label>
                      <Input value={slide.title} onChange={(e) => updateSlide(slide.id, "title", e.target.value)} placeholder="Judul slide" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Highlight</label>
                      <Input value={slide.highlight} onChange={(e) => updateSlide(slide.id, "highlight", e.target.value)} placeholder="Teks highlight" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Subtitle</label>
                    <Textarea value={slide.subtitle} onChange={(e) => updateSlide(slide.id, "subtitle", e.target.value)} placeholder="Deskripsi singkat" rows={2} />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><Eye className="h-4 w-4" /> Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 text-center space-y-3 border border-border/50">
                {slides[0] && (
                  <>
                    <h2 className="text-2xl font-bold text-foreground">
                      {slides[0].title || "Judul"}{" "}
                      <span className="text-primary">{slides[0].highlight || "Highlight"}</span>
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">{slides[0].subtitle || "Deskripsi subtitle"}</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tentang Kami Tab */}
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Konten Tentang Kami</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Judul Seksi</label>
                  <Input value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Subtitle</label>
                  <Input value={about.subtitle} onChange={(e) => setAbout({ ...about, subtitle: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Deskripsi</label>
                <Textarea value={about.description} onChange={(e) => setAbout({ ...about, description: e.target.value })} rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Fitur Keunggulan</CardTitle>
              <Button variant="outline" size="sm" onClick={addFeature} className="gap-1">
                <Plus className="h-3.5 w-3.5" /> Tambah Fitur
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {about.features.map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-xl border border-border p-4 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fitur {idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      onClick={() => removeFeature(idx)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Judul</label>
                      <Input value={feat.title} onChange={(e) => updateFeature(idx, "title", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Deskripsi</label>
                      <Input value={feat.description} onChange={(e) => updateFeature(idx, "description", e.target.value)} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
