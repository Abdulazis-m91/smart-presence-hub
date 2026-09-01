import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoYayasan from "@/assets/logo-yayasan.png";
import LoginModal from "@/components/LoginModal";

const tentangKamiItems = [
  { label: "Visi", href: "#visi" },
  { label: "Misi", href: "#visi" },
  { label: "Unit Pendidikan", href: "#unit-pendidikan" },
  { label: "Sejarah", href: "#visi" },
];

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Berita", href: "#berita" },
  { label: "Vokasi", href: "#vokasi" },
  { label: "Aktivitas", href: "#aktivitas" },
  { label: "Lokasi", href: "#lokasi" },
];

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTentangOpen, setMobileTentangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-emerald-900 shadow-lg" : "bg-emerald-900/95"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#beranda" className="flex items-center gap-3">
            <img src={logoYayasan} alt="Logo Yayasan" className="h-9 w-9 rounded-full object-contain bg-white/10" />
            <span className="font-bold text-base sm:text-lg text-white tracking-tight">Yayasan Baitulloh</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            <a href="#beranda" className="px-4 py-2 text-sm font-medium text-emerald-50 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              Beranda
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-emerald-50 hover:text-white hover:bg-white/10 rounded-lg transition-colors outline-none">
                Tentang Kami
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white border-emerald-100">
                {tentangKamiItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <a href={item.href} className="text-emerald-900 focus:bg-emerald-50 focus:text-emerald-900 cursor-pointer">
                      {item.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navItems.slice(1).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-emerald-50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLoginOpen(true)}
              className="bg-white text-emerald-900 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition-colors"
            >
              Login
            </button>
            <button className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 px-4 pb-4 bg-emerald-900 overflow-hidden"
            >
              <a href="#beranda" className="block py-3 text-sm font-medium text-emerald-50 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
                Beranda
              </a>

              <button
                className="w-full flex items-center justify-between py-3 text-sm font-medium text-emerald-50 hover:text-white transition-colors"
                onClick={() => setMobileTentangOpen(!mobileTentangOpen)}
              >
                Tentang Kami
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileTentangOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileTentangOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 overflow-hidden"
                  >
                    {tentangKamiItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block py-2 text-sm text-emerald-100 hover:text-white transition-colors"
                        onClick={() => { setMobileOpen(false); setMobileTentangOpen(false); }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {navItems.slice(1).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-3 text-sm font-medium text-emerald-50 hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
