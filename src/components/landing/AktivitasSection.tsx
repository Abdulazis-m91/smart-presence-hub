import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ImageIcon } from "lucide-react";
import { useGaleri } from "@/hooks/use-data";

export default function AktivitasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: galeri } = useGaleri();

  const items = (galeri ?? []).slice(0, 3);
  // Isi kosong tetap ditampilkan sebagai slot placeholder agar layout 3 kolom konsisten
  const slots = [0, 1, 2].map((i) => items[i]);

  return (
    <section id="aktivitas" className="py-20 sm:py-24 px-4 bg-emerald-900">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-12"
        >
          Aktivitas Terbaru
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-5">
          {slots.map((item, i) => (
            <motion.div
              key={item?.id ?? `empty-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden border border-emerald-700 bg-emerald-800/40"
            >
              {item?.image_url ? (
                <img src={item.image_url} alt={item.title} className="w-full aspect-video object-cover" />
              ) : (
                // Placeholder — banner kegiatan/ucapan (.webp) akan diunggah admin dari dashboard
                <div className="w-full aspect-video flex flex-col items-center justify-center gap-2 text-emerald-300/50">
                  <ImageIcon className="h-8 w-8" strokeWidth={1.3} />
                  <span className="text-xs font-medium">Menunggu unggahan admin</span>
                </div>
              )}
              {item?.title && (
                <div className="p-4">
                  <p className="text-sm font-medium text-emerald-50">{item.title}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
