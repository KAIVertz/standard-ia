"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Audit gratuit",
    description:
      "30 minutes en visio. On analyse vos outils, vos process, et on identifie les 3 automatisations à déployer en priorité.",
    color: "#00d4ff",
  },
  {
    number: "02",
    title: "Déploiement express",
    description:
      "Notre équipe configure tout en arrière-plan. Vous suivez l'avancement en temps réel. Aucune action technique de votre côté.",
    color: "#7c3aed",
  },
  {
    number: "03",
    title: "ROI mesurable",
    description:
      "Dès la mise en ligne, vos automatisations tournent. Vous recevez un rapport mensuel avec les résultats concrets.",
    color: "#00d4ff",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="py-28 px-6"
      style={{ background: "#0a0a12" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-slate-500">
            Comment ça marche
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            3 étapes.{" "}
            <span className="gradient-text">Zéro friction.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)" }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-float"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  background: `${step.color}10`,
                  border: `1px solid ${step.color}30`,
                  boxShadow: `0 0 20px ${step.color}15`,
                }}
              >
                <span className="font-black text-xl" style={{ color: step.color }}>
                  {step.number}
                </span>
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-black transition-all duration-200 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
          >
            Commencer par l&apos;audit gratuit →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
