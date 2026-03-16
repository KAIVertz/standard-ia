"use client";

import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section id="contact" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-accent/20 via-zinc-900 to-zinc-900 border border-accent/20 rounded-3xl p-12 text-center overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-accent/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-4">
              Parlons de votre projet
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-50 tracking-tight mb-4">
              Prêt à automatiser
              <br />
              <span className="gradient-text">votre business ?</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
              Réservez un appel découverte de 30 minutes — gratuit, sans engagement.
              On vous dit exactement ce qu&apos;on peut automatiser chez vous et en combien de temps.
            </p>

            <a
              href="mailto:hello@standard-ia.pro"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-accent/25 text-lg"
            >
              Réserver mon appel gratuit →
            </a>

            <p className="mt-6 text-zinc-500 text-sm">
              Ou écrivez-nous directement :{" "}
              <a
                href="mailto:hello@standard-ia.pro"
                className="text-zinc-400 hover:text-zinc-200 transition-colors underline underline-offset-2"
              >
                hello@standard-ia.pro
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
