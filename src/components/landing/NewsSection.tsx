import { motion, useInView } from "framer-motion";
import { Calendar, Newspaper } from "lucide-react";
import { useRef } from "react";
import { useBerita } from "@/hooks/use-data";

export default function NewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: berita } = useBerita();

  const published = (berita ?? []).filter((b) => b.status === "Published").slice(0, 3);

  return (
    <section id="berita" className="py-20 sm:py-28 px-4 bg-white">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl sm:text-3xl font-bold text-emerald-900 text-center mb-10"
        >
          Berita
        </motion.h2>

        <div className="flex flex-col gap-4 mb-8">
          {published.length > 0 ? (
            published.map((n, i) => (
              <motion.article
                key={n.id}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="border border-emerald-100 rounded-2xl p-5 hover:shadow-md hover:border-emerald-200 transition-all"
              >
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(n.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </div>
                <h3 className="font-semibold text-emerald-950 mb-1">{n.title}</h3>
                <p className="text-sm text-emerald-700/80 line-clamp-3">{n.excerpt}</p>
              </motion.article>
            ))
          ) : (
            <div className="border border-dashed border-emerald-200 rounded-2xl p-8 text-center text-emerald-700/60 text-sm flex flex-col items-center gap-2">
              <Newspaper className="h-8 w-8" strokeWidth={1.2} />
              Belum ada berita yang dipublikasikan
            </div>
          )}
        </div>

        <div className="text-center">
          <a
            href="/berita"
            className="inline-block bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-900 transition-colors"
          >
            Tampilkan Semua Berita
          </a>
        </div>
      </div>
    </section>
  );
}
