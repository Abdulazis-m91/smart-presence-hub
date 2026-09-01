import logoYayasan from "@/assets/logo-yayasan.png";
import { MapPin, Phone, Mail } from "lucide-react";

const links = [
  { title: "Tentang Kami", items: ["Visi", "Misi", "Unit Pendidikan", "Sejarah"], hrefs: ["#visi", "#visi", "#unit-pendidikan", "#visi"] },
  { title: "Navigasi", items: ["Berita", "Vokasi", "Aktivitas", "Lokasi"], hrefs: ["#berita", "#vokasi", "#aktivitas", "#lokasi"] },
];

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoYayasan} alt="Yayasan Baitulloh" className="h-10 w-10 rounded-full object-contain bg-white/10" />
              <div>
                <h3 className="font-bold text-white">Yayasan Baitulloh</h3>
                <p className="text-xs text-emerald-300">Lampung, Indonesia</p>
              </div>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed mb-6 max-w-sm">
              Lembaga pendidikan Islam yang mengintegrasikan teknologi modern untuk pengelolaan pesantren dan sekolah yang lebih baik.
            </p>
            <div className="space-y-2 text-sm text-emerald-200/80">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-emerald-400" /> Yukum Jaya, Terbanggi Besar, Lampung Tengah</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-emerald-400" /> Menyusul</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-emerald-400" /> Menyusul</div>
            </div>
          </div>

          {/* Links */}
          {links.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-white mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.items.map((item, i) => (
                  <li key={item}>
                    <a href={group.hrefs[i]} className="text-sm text-emerald-200/80 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-emerald-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-emerald-300/80">
            © 2026 Yayasan Baitulloh Lampung. All rights reserved.
          </p>
          <p className="text-xs text-emerald-400/60">
            Powered by <span className="font-medium text-emerald-300">SmartPresence</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
