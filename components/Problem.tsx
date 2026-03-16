"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: "⏳",
    title: "Des heures perdues chaque semaine",
    description:
      "Répondre aux mêmes questions, relancer des prospects, saisir des données — des tâches que l'IA peut faire à votre place, 24h/24.",
  },
  {
    icon: "📉",
    title: "Des leads qui disparaissent",
    description:
      "Un prospect non recontacté dans l'heure a 7× moins de chances de convertir. Sans automatisation, vous perdez de l'argent en dormant.",
  },
  {
    icon: "🔧",
    title: "L'IA vous semble complexe à mettre en place",
    description:
      "Make, n8n, ChatGPT, Zapier — vous savez que ça existe, mais configurer tout ça seul prend des semaines et demande des compétences techniques.",
  },
];

export default function Problem() {
  return (
    <section className="py-24 px-6" style={{ background: "#0a0a12" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-slate-500">
            Le problème
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Vous travaillez plus.{" "}
            <span className="gradient-text">Votre IA devrait le faire.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, #0f0f1a, #12121f)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
