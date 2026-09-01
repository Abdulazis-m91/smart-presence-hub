import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, School, Building2 } from "lucide-react";

const units = [
  {
    label: "SMP",
    name: "SMP Bina Insan Taqwa",
    icon: School,
  },
  {
    label: "SMA",
    name: "SMA Bina Insan Taqwa",
    icon: GraduationCap,
  },
  {
    label: "PESANTREN",
    name: "Pondok Pesantren Rowdhotul Alimir Robbaniy",
    icon: Building2,
  },
];

export default function UnitPendidikanSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="unit-pendidikan" className="py-20 sm:py-24 px-4 bg-emerald-900">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-12"
        >
          Unit Pendidikan
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-5">
          {units.map((unit, i) => {
            const Icon = unit.icon;
            return (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="bg-emerald-800/60 border border-emerald-700 rounded-2xl p-6 text-center hover:bg-emerald-800 transition-colors"
              >
                <Icon className="h-9 w-9 text-emerald-200 mx-auto mb-4" strokeWidth={1.5} />
                <h3 className="text-white font-bold tracking-wide mb-1">{unit.label}</h3>
                <p className="text-sm text-emerald-200/80">{unit.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
