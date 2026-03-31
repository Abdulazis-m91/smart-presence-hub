import { CreditCard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">SmartPresence</span>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 SmartPresence. All rights reserved.</p>
      </div>
    </footer>
  );
}
