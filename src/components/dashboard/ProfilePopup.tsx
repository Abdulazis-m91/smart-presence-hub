import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Pencil, Mail, Phone, BadgeCheck, BookOpen, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

interface ProfilePopupProps {
  open: boolean;
  onClose: () => void;
}

const guruProfiles: Record<string, {
  nip: string;
  email: string;
  whatsapp: string;
  subject: string;
  photo?: string;
}> = {
  "1": { nip: "198505152010011003", email: "guru@school.id", whatsapp: "08123456789", subject: "Matematika" },
  "2": { nip: "199001012015022001", email: "petugas@school.id", whatsapp: "08198765432", subject: "-" },
  "3": { nip: "197803202005011002", email: "admin@school.id", whatsapp: "08112233445", subject: "-" },
};

export default function ProfilePopup({ open, onClose }: ProfilePopupProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const profile = guruProfiles[user.id] || { nip: "-", email: user.email, whatsapp: "-", subject: "-" };

  const handleLogout = () => {
    logout();
    navigate("/");
    onClose();
  };

  const roleLabel: Record<string, string> = {
    guru: "Guru",
    petugas: "Petugas",
    admin: "Admin",
    developer: "Developer",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dimmed backdrop + centered container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-sm bg-background rounded-2xl shadow-2xl shadow-black/20 border border-border/50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top section - Photo & Name */}
              <div className="pt-8 pb-5 px-6 text-center relative">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto shadow-lg">
                  {user.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-foreground mt-4">{user.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5 mt-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {profile.subject}
                </p>
              </div>

              <Separator />

              {/* Info section */}
              <div className="px-6 py-4 space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                    <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">NIP</p>
                    <p className="text-sm text-foreground font-mono truncate">{profile.nip}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Email</p>
                    <p className="text-sm text-foreground truncate">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">WhatsApp</p>
                    <p className="text-sm text-foreground">{profile.whatsapp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                    <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Status</p>
                    <p className="text-sm text-foreground font-medium">{roleLabel[user.role] || user.role}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Actions - side by side */}
              <div className="p-4 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-semibold shadow-md">
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors text-sm font-semibold shadow-md"
                >
                  <LogOut className="h-4 w-4" />
                  Keluar
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
