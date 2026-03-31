import { motion } from "framer-motion";

const schedule = [
  { no: 1, name: "Ahmad Fauzi", subject: "Matematika", day: "Senin", class: "XII-A", time: "07:00 - 08:30" },
  { no: 2, name: "Ahmad Fauzi", subject: "Matematika", day: "Selasa", class: "XI-B", time: "08:30 - 10:00" },
  { no: 3, name: "Ahmad Fauzi", subject: "Matematika", day: "Rabu", class: "X-A", time: "07:00 - 08:30" },
  { no: 4, name: "Ahmad Fauzi", subject: "Matematika", day: "Kamis", class: "XII-A", time: "10:15 - 11:45" },
  { no: 5, name: "Ahmad Fauzi", subject: "Matematika", day: "Jumat", class: "XI-C", time: "07:00 - 08:30" },
];

export default function JadwalPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Jadwal Mengajar</h1>
      <div className="glass rounded-2xl p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["No", "Nama Lengkap", "Mata Pelajaran", "Hari", "Kelas", "Waktu"].map((h) => (
                <th key={h} className="text-left py-3 px-3 text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.no} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-3 text-foreground">{row.no}</td>
                <td className="py-3 px-3 text-foreground">{row.name}</td>
                <td className="py-3 px-3 text-foreground">{row.subject}</td>
                <td className="py-3 px-3 text-foreground">{row.day}</td>
                <td className="py-3 px-3 text-foreground">{row.class}</td>
                <td className="py-3 px-3 text-foreground">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
