import { motion } from "framer-motion";
import logoYayasan from "@/assets/logo-yayasan.png";
import { MapPin, Phone, Mail } from "lucide-react";

const links = [
  { title: "Navigasi", items: ["Informasi", "Tentang Kami", "Berita", "Gallery"] },
  { title: "Layanan", items: ["Absensi RFID", "Monitoring", "Laporan", "API Integrasi"] },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-muted/20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoYayasan} alt="Yayasan Baitulloh" className="h-10 w-10 rounded-full object-contain" />
              <div>
                <h3 className="font-bold text-foreground">Yayasan Baitulloh</h3>
                <p className="text-xs text-muted-foreground">Lampung, Indonesia</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              Lembaga pendidikan Islam yang mengintegrasikan teknologi modern untuk pengelolaan pesantren dan sekolah yang lebih baik.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Terbanggi Besar, Lampung Tengah</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +62 xxx xxxx xxxx</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@baitulloh.sch.id</div>
            </div>
          </div>

          {/* Links */}
          {links.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-foreground mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Yayasan Baitulloh Lampung. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Powered by <span className="gradient-text font-medium">SmartPresence</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
