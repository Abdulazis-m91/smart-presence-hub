import logoYayasan from "@/assets/logo-yayasan.png";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logoYayasan} alt="Yayasan Baitulloh Lampung" className="h-8 w-8 rounded-full object-contain" />
          <span className="font-bold text-foreground">SmartPresence</span>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 SmartPresence. All rights reserved.</p>
      </div>
    </footer>
  );
}
