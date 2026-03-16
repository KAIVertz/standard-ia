"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Audit gratuit",
    description:
      "On se retrouve 30 minutes en visio pour comprendre votre business, vos outils, et identifier les 3 automatisations à impact immédiat.",
  },
  {
    number: "02",
    title: "Déploiement rapide",
    description:
      "Notre équipe configure et déploie vos automatisations IA. Vous recevez des points d'avancement réguliers. Aucune action technique requise de votre côté.",
  },
  {
    number: "03",
    title: "Résultats mesurables",
    description:
      "Dès la mise en ligne, vos nouvelles automatisations travaillent 24h/24. On vous accompagne pour mesurer le ROI et faire évoluer le système.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 px-6 bg-zinc-900/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-4">
            Comment ça marche
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-50 tracking-tight">
            3 étapes simples.{" "}
            <span className="gradient-text">Zéro prise de tête.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%-1px)] right-[calc(16.66%-1px)] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Step number bubble */}
                <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-accent-light font-bold text-2xl">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-zinc-100 font-bold text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
          >
            Commencer par l&apos;audit gratuit →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
