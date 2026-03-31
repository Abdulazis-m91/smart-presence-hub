import { motion } from "framer-motion";
import { Construction } from "lucide-react";
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
      <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
        <Construction className="h-8 w-8 text-primary-foreground" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-muted-foreground">Halaman ini sedang dalam pengembangan</p>
    </motion.div>
  );
}
