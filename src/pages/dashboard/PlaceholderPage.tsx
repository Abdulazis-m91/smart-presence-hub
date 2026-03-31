import { motion } from "framer-motion";
import { Construction, ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.split("/").pop() || "Page";
  const title = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <motion.div
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative mb-8"
      >
        <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/20">
          <Construction className="h-10 w-10 text-white" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-1 -right-1 h-5 w-5 bg-secondary rounded-full animate-pulse border-2 border-background" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-3xl font-bold text-foreground mb-3"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-muted-foreground max-w-sm mb-6"
      >
        Halaman ini sedang dalam tahap pengembangan dan akan segera tersedia.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
      >
        Kembali <ArrowRight className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
}
