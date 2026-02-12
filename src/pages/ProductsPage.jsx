import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";

const products = [
  {
    title: "Starter Kit Laravel + React",
    desc: "Boilerplate fullstack siap pakai—auth, API, frontend modern. Hemat waktu setup proyek baru.",
    price: "Rp 299.000",
    link: "#",
  },
  {
    title: "Template Admin Dashboard",
    desc: "Dashboard admin responsif dengan sidebar, tables, charts. Bisa dikustomisasi untuk kebutuhanmu.",
    price: "Rp 149.000",
    link: "#",
  },
  {
    title: "Landing Page Generator",
    desc: "Komponen landing page modular—hero, features, pricing. Copy-paste dan sesuaikan.",
    price: "Gratis",
    link: "#",
  },
];

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-20">
      <SEO
        title="Produk Digital"
        description="Produk digital Pintarware—starter kit Laravel React, template admin dashboard, landing page. Hemat waktu development dengan solusi siap pakai."
        keywords="produk digital developer, starter kit Laravel, template admin dashboard, boilerplate React, landing page template"
        path="/products"
      />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Produk Digital
          </h1>
          <p className="text-stone-600 max-w-2xl text-lg">
            Template, starter kit, dan aplikasi siap pakai—hemat waktu development dengan solusi yang sudah teruji.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-teal-300/50 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Package className="w-6 h-6" />
              </div>
              <h2 className="font-display font-semibold text-xl text-stone-900 mb-2">
                {product.title}
              </h2>
              <p className="text-stone-600 flex-1 mb-6">{product.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900">{product.price}</span>
                <Button variant="outline" size="sm" asChild>
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    Lihat <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-stone-100 border border-stone-200 text-center"
        >
          <p className="text-stone-600 mb-4">
            Produk baru akan ditambahkan seiring waktu. Ingin request produk tertentu? Kontak via mentoring.
          </p>
          <Button variant="default" asChild>
            <Link to="/mentoring">Booking Mentoring</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
