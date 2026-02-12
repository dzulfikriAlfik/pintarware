import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, Star, ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";

const courses = [
  {
    title: "Pengantar JavaScript",
    desc: "Dasar-dasar JS untuk pemula. Variabel, fungsi, loop, dan DOM manipulation.",
    level: "Pemula",
    duration: "2 jam",
    free: true,
  },
  {
    title: "React dari Nol",
    desc: "Belajar React—components, hooks, state management, dan membangun UI modern.",
    level: "Menengah",
    duration: "6 jam",
    free: false,
  },
  {
    title: "Laravel untuk Backend",
    desc: "Membangun API dan web app dengan Laravel. MVC, Eloquent, dan autentikasi.",
    level: "Menengah",
    duration: "8 jam",
    free: false,
  },
];

export default function CoursesPage() {
  return (
    <div className="pt-24 pb-20">
      <SEO
        title="Kursus Online"
        description="Kursus programming online Pintarware—JavaScript, React, Laravel. Materi gratis & berbayar, self-paced, sertifikat. Mulai belajar dari pemula sampai advanced."
        keywords="kursus programming, kursus JavaScript, kursus React, kursus Laravel, belajar coding online, kursus web development Indonesia"
        path="/courses"
      />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Kursus Online
          </h1>
          <p className="text-stone-600 max-w-2xl text-lg">
            Materi terstruktur dari dasar sampai advanced. Ada yang gratis, ada yang berbayar—pilih sesuai kebutuhan.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 hover:border-teal-300/50 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    {course.free && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-medium flex items-center gap-1">
                        <Gift className="w-3 h-3" /> Gratis
                      </span>
                    )}
                  </div>
                  <h2 className="font-display font-semibold text-xl text-stone-900 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-stone-600 mb-4">{course.desc}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4" /> {course.level}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </span>
                  </div>
                </div>
                <Button variant="default" asChild>
                  <Link to="#" className="shrink-0">
                    {course.free ? "Mulai Sekarang" : "Lihat Detail"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-teal-50 border border-teal-200/60 text-center"
        >
          <p className="text-stone-600 mb-4">
            Kursus baru akan ditambahkan secara berkala. Ikuti update via blog atau sosial media.
          </p>
          <Button variant="outline" asChild>
            <Link to="/blog">Baca Blog</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
