"use client";

import { motion } from "framer-motion";

const benefits = [
  { icon: "⚡", text: "Déployé en moins de 14 jours" },
  { icon: "🇫🇷", text: "Équipe française, support en français" },
  { icon: "🎯", text: "Solutions adaptées à votre secteur" },
  { icon: "🔄", text: "Automatisations actives 24h/24" },
  { icon: "📈", text: "ROI mesurable dès le 1er mois" },
  { icon: "🛡️", text: "Résiliable à tout moment" },
];

export default function Solution() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #0a0a12 0%, #0c0c18 100%)" }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#00d4ff" }}>
            Notre approche
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            On installe l&apos;IA.
            <br />
            <span className="gradient-text">Vous récoltez les fruits.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Nous analysons vos process, identifions les tâches à automatiser, et
            déployons les outils IA — sans que vous touchiez une seule ligne de code.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-bold px-6 py-3.5 rounded-xl text-black transition-all duration-200 hover:scale-105 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
          >
            Parlez-nous de votre projet →
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="rounded-xl p-4 flex items-start gap-3"
              style={{
                background: "linear-gradient(135deg, #0f0f1a, #14142a)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span className="text-lg">{b.icon}</span>
              <span className="text-slate-300 text-sm font-medium leading-snug">{b.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
