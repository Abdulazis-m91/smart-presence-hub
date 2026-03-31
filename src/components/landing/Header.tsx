import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoYayasan from "@/assets/logo-yayasan.png";
import LoginModal from "@/components/LoginModal";

const navItems = ["Informasi", "Tentang Kami", "Berita", "Gallery"];

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-40 glass-strong"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoYayasan} alt="Yayasan Baitulloh Lampung" className="h-9 w-9 rounded-full object-contain" />
            <span className="font-bold text-lg text-foreground">Yayasan Baitulloh</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLoginOpen(true)}
              className="gradient-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Login
            </button>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-border px-4 pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </motion.header>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
