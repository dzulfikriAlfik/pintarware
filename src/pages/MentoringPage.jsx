import { motion } from "framer-motion";
import { MessageCircle, Clock, CheckCircle2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";

const benefits = [
  "Diskusi teknis & arsitektur",
  "Code review & best practices",
  "Bimbingan proyek atau tugas",
  "Q&A spesifik sesuai kebutuhan",
];

export default function MentoringPage() {
  return (
    <div className="pt-24 pb-20">
      <SEO
        title="Mentoring 1-on-1"
        description="Mentoring programming 1-on-1 Pintarware—sesi live per jam. Diskusi teknis, code review, bimbingan proyek. Booking tersedia."
        keywords="mentoring programming, code review Indonesia, bimbingan proyek coding, konsultasi developer, mentoring Laravel React"
        path="/mentoring"
      />
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Mentoring 1-on-1
          </h1>
          <p className="text-stone-600 max-w-2xl text-lg">
            Sesi live per jam—diskusi teknis, code review, atau bimbingan proyek. Booking tersedia sesuai jadwal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-2xl bg-white border border-stone-200 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-xl text-stone-900">
                  Sesi Live
                </h2>
                <p className="text-sm text-stone-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 1 jam per sesi
                </p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/60 mb-6">
              <p className="text-sm text-stone-700">
                <span className="font-semibold text-amber-700">Rate:</span> Rp XXX.XXX / jam
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Harga dapat disesuaikan tergantung topik dan durasi.
              </p>
            </div>

            <Button variant="accent" size="lg" className="w-full" asChild>
              <a
                href="mailto:dzulfikri.alkautsari@gmail.com?subject=Booking%20Mentoring%20Pintarware"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="w-4 h-4" />
                Booking via Email
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl bg-stone-100 border border-stone-200"
          >
            <h3 className="font-display font-semibold text-lg text-stone-900 mb-4">
              Cara Booking
            </h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  1
                </span>
                <div>
                  <p className="font-medium text-stone-800">Kirim email</p>
                  <p className="text-sm text-stone-600">
                    Jelaskan topik, tujuan, dan preferensi jadwal. Sertakan link repo jika ada code review.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  2
                </span>
                <div>
                  <p className="font-medium text-stone-800">Konfirmasi jadwal</p>
                  <p className="text-sm text-stone-600">
                    Saya akan balas dengan slot yang tersedia. Setelah deal, link meeting dikirim.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  3
                </span>
                <div>
                  <p className="font-medium text-stone-800">Sesi berjalan</p>
                  <p className="text-sm text-stone-600">
                    Meet via Google Meet/Zoom. Sesi fokus sesuai yang kamu butuhkan.
                  </p>
                </div>
              </li>
            </ol>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
