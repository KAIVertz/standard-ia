"use client";

import { motion } from "framer-motion";

const problems = [
  {
    emoji: "⏳",
    title: "Des heures perdues sur des tâches répétitives",
    description:
      "Répondre aux mêmes questions clients, saisir des données manuellement, relancer des prospects — autant de temps qui ne génère pas de valeur.",
  },
  {
    emoji: "💸",
    title: "Des opportunités qui passent entre les doigts",
    description:
      "Un lead non recontacté rapidement est un lead perdu. Sans automatisation, votre concurrence répond 10× plus vite.",
  },
  {
    emoji: "🔧",
    title: "Les outils IA sont complexes à mettre en place",
    description:
      "ChatGPT, Make, Zapier, n8n — vous savez que ça existe, mais mettre tout ça en place seul prend des semaines et demande des compétences techniques.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 px-6 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-4">
            Le problème
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-50 tracking-tight">
            Vous perdez du temps et de l&apos;argent
            <br />
            <span className="text-zinc-400">sans même le réaliser.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="text-3xl mb-4">{p.emoji}</div>
              <h3 className="text-zinc-100 font-semibold text-lg mb-2">
                {p.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
