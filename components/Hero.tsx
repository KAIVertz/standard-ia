"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-20">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent-light text-sm px-4 py-1.5 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Agence IA française — résultats en 14 jours
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-50 leading-[1.1] mb-6"
        >
          L&apos;IA qui{" "}
          <span className="gradient-text">automatise</span>
          <br />
          votre business.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Chatbots, workflows, automatisations — nous déployons des solutions IA
          clés en main pour les PME françaises{" "}
          <span className="text-zinc-200">en moins de 14 jours.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent/20 text-base w-full sm:w-auto"
          >
            Réserver un appel gratuit →
          </a>
          <a
            href="#services"
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium px-8 py-3.5 rounded-xl transition-colors duration-200 text-base w-full sm:w-auto"
          >
            Voir nos services
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-sm text-zinc-500"
        >
          Satisfaction garantie · Pas de contrat long terme · Support français inclus
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-zinc-600" />
      </motion.div>
    </section>
  );
}
