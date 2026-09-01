import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const LAT = -4.9176568;
const LNG = 105.2056033;
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`;
const MAPS_LINK = "https://maps.app.goo.gl/vVfz5V78FFwTs3cz6";

export default function LokasiSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="lokasi" className="py-20 sm:py-24 px-4 bg-emerald-50/50">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl sm:text-3xl font-bold text-emerald-900 text-center mb-12"
        >
          Lokasi Sekolah
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="rounded-2xl overflow-hidden border border-emerald-100 min-h-[320px]"
          >
            <iframe
              src={MAPS_EMBED_URL}
              className="w-full h-full min-h-[320px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Pondok Pesantren Rowdhotul Alimir Robbaniy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-emerald-100 p-6 sm:p-8 flex flex-col justify-center gap-6"
          >
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-emerald-950 mb-1">Alamat</h3>
                <p className="text-sm text-emerald-800/80 leading-relaxed">
                  Pondok Pesantren Rowdhotul Alimir Robbaniy (LDII)
                  <br />
                  Jl. Bintara, RT 006 RW 003, Lingkungan II
                  <br />
                  Kel. Yukum Jaya, Kec. Terbanggi Besar
                  <br />
                  Kab. Lampung Tengah, Lampung 34163
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-emerald-950 mb-1">Telepon / WhatsApp</h3>
                {/* TODO: nomor kontak resmi menyusul dari client */}
                <p className="text-sm text-emerald-800/80">Menyusul</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-emerald-950 mb-1">Email</h3>
                {/* TODO: email resmi menyusul dari client */}
                <p className="text-sm text-emerald-800/80">Menyusul</p>
              </div>
            </div>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-900 transition-colors mt-2"
            >
              Buka di Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
