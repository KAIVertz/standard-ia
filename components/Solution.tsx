"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    icon: "⚡",
    text: "Déployé en moins de 14 jours",
  },
  {
    icon: "🇫🇷",
    text: "Équipe française, support en français",
  },
  {
    icon: "🎯",
    text: "Solutions adaptées à votre secteur",
  },
  {
    icon: "🔄",
    text: "Automatisations qui tournent 24h/24",
  },
  {
    icon: "📈",
    text: "ROI mesurable dès le premier mois",
  },
  {
    icon: "🛡️",
    text: "Satisfaction garantie ou remboursé",
  },
];

export default function Solution() {
  return (
    <section className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-4">
              La solution
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-50 tracking-tight mb-6 leading-tight">
              Standard IA déploie{" "}
              <span className="gradient-text">l&apos;IA qui travaille</span>{" "}
              à votre place.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Nous analysons vos process, identifions les tâches à automatiser,
              et déployons des outils IA sur-mesure — sans que vous ayez besoin
              de toucher une ligne de code.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
            >
              Discutons de votre projet →
            </a>
          </motion.div>

          {/* Right — Benefits grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-start gap-3"
              >
                <span className="text-xl">{b.icon}</span>
                <span className="text-zinc-300 text-sm font-medium leading-snug">
                  {b.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
