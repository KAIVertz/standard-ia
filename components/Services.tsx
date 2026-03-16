"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    name: "Starter",
    price: "197",
    color: "#00d4ff",
    tagline: "Votre premier agent IA en ligne en 5 jours.",
    description:
      "Parfait pour démarrer : un chatbot IA sur votre site qui répond, capture les leads et ne dort jamais.",
    animation: "chat",
    features: [
      "1 chatbot IA sur votre site",
      "Réponses automatiques 24h/24",
      "Capture de leads intégrée",
      "Connexion à votre FAQ",
      "Dashboard des conversations",
      "Support email inclus",
    ],
  },
  {
    name: "Croissance",
    price: "497",
    color: "#7c3aed",
    tagline: "L'automatisation complète de votre acquisition.",
    description:
      "Chatbot + CRM + emails automatiques + reporting. Votre pipeline tourne seul pendant que vous travaillez.",
    animation: "flow",
    features: [
      "Tout Starter inclus",
      "Intégration CRM (HubSpot, Notion…)",
      "Séquences email IA personnalisées",
      "Qualification automatique des leads",
      "Reporting mensuel automatisé",
      "Support prioritaire",
    ],
    popular: true,
  },
  {
    name: "Agence",
    price: "997",
    color: "#00d4ff",
    tagline: "Une IA dédiée qui gère toute votre opération.",
    description:
      "Pour les équipes qui veulent aller vite et loin. Automatisations illimitées, builds sur-mesure, accompagnement dédié.",
    animation: "network",
    features: [
      "Tout Croissance inclus",
      "Automatisations illimitées",
      "Intégrations sur-mesure",
      "Agent IA dédié à votre compte",
      "Formation de votre équipe",
      "Slack dédié + support illimité",
    ],
  },
];

// Mini animated demos for each service
function ChatAnimation() {
  const messages = [
    { from: "user", text: "Bonjour, quel est votre délai ?" },
    { from: "bot", text: "Livraison en 48h ✦" },
    { from: "user", text: "Je veux commander" },
    { from: "bot", text: "Parfait ! Votre email ?" },
  ];
  return (
    <div className="space-y-2 p-3">
      {messages.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: m.from === "user" ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.6, repeat: Infinity, repeatDelay: messages.length * 0.6 + 1 }}
          className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
        >
          <span
            className="text-[10px] px-2.5 py-1.5 rounded-xl max-w-[80%]"
            style={{
              background: m.from === "user" ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.07)",
              color: m.from === "user" ? "#00d4ff" : "#94a3b8",
              border: `1px solid ${m.from === "user" ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.05)"}`,
            }}
          >
            {m.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function FlowAnimation() {
  const nodes = ["Lead entrant", "Qualifié IA", "Email envoyé", "CRM mis à jour"];
  return (
    <div className="flex flex-col gap-1.5 p-3">
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.4, repeat: Infinity, repeatDelay: nodes.length * 0.4 + 1 }}
          className="flex items-center gap-2"
        >
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: "#7c3aed" }}
          />
          <div
            className="flex-1 h-6 rounded-md flex items-center px-2 text-[10px] text-slate-300"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }}
          >
            {n}
          </div>
          {i < nodes.length - 1 && (
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.4 }}
              className="text-[8px] text-purple-400"
            >↓</motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function NetworkAnimation() {
  const tools = ["Chatbot", "Email", "CRM", "Slack", "Report", "API"];
  return (
    <div className="grid grid-cols-3 gap-2 p-3">
      {tools.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.3, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2, repeat: Infinity, repeatDelay: tools.length * 0.2 + 1 }}
          className="h-8 rounded-lg flex items-center justify-center text-[9px] font-medium text-slate-300"
          style={{
            background: "rgba(0,212,255,0.07)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          {t}
        </motion.div>
      ))}
      <div className="col-span-3 text-center mt-1">
        <span className="text-[9px] text-slate-500">connectés & synchronisés</span>
      </div>
    </div>
  );
}

const animationMap = {
  chat: ChatAnimation,
  flow: FlowAnimation,
  network: NetworkAnimation,
};

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="py-28 px-6" style={{ background: "#0a0a12" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#00d4ff" }}>
            Nos offres
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Simple. Mensuel.{" "}
            <span className="gradient-text">Sans surprise.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Un abonnement mensuel, résiliable à tout moment. Vous payez tant que ça vous rapporte.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const AnimComp = animationMap[s.animation as keyof typeof animationMap];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative rounded-2xl flex flex-col overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #0f0f1a, #14142a)",
                  border: `1px solid ${hovered === i ? s.color + "50" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: hovered === i ? `0 0 40px ${s.color}18` : "none",
                  transform: hovered === i ? "translateY(-4px)" : "none",
                }}
              >
                {s.popular && (
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
                  />
                )}
                {s.popular && (
                  <div className="absolute top-4 right-4">
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: `${s.color}20`, color: s.color, border: `1px solid ${s.color}40` }}
                    >
                      POPULAIRE
                    </span>
                  </div>
                )}

                {/* Animation preview */}
                <div
                  className="h-32 border-b overflow-hidden"
                  style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)" }}
                >
                  <AnimComp />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-white font-bold text-xl mb-1">{s.name}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{s.tagline}</p>
                  </div>

                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-4xl font-black text-white">{s.price}€</span>
                    <span className="text-slate-500 text-sm mb-1.5">/mois</span>
                  </div>
                  <p className="text-slate-500 text-xs mb-6">{s.description}</p>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <span className="mt-0.5 flex-shrink-0 text-xs" style={{ color: s.color }}>✦</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="block text-center py-3 px-6 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
                    style={{
                      background: hovered === i
                        ? `linear-gradient(135deg, ${s.color}, ${s.color === "#00d4ff" ? "#7c3aed" : "#00d4ff"})`
                        : `${s.color}18`,
                      color: hovered === i ? (s.color === "#7c3aed" ? "white" : "#000") : s.color,
                      border: `1px solid ${s.color}40`,
                    }}
                  >
                    Commencer →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          Résiliable à tout moment · Pas de frais d&apos;installation · Onboarding inclus
        </motion.p>
      </div>
    </section>
  );
}
