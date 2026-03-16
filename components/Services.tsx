"use client";

import { motion } from "framer-motion";

const services = [
  {
    name: "Standard Starter",
    price: "997 €",
    billing: "paiement unique",
    description: "L'entrée dans l'IA. Un chatbot IA sur votre site, prêt en 5 jours.",
    highlight: false,
    features: [
      "Chatbot IA sur votre site web",
      "Connecté à votre FAQ / documentation",
      "Capture de leads automatique",
      "Déploiement en 5 jours ouvrés",
      "Formation incluse (1h)",
      "Support 30 jours",
    ],
    cta: "Démarrer →",
  },
  {
    name: "Standard Flux",
    price: "2 497 €",
    billing: "+ 297 €/mois",
    description: "L'automatisation complète de votre acquisition et suivi client.",
    highlight: true,
    features: [
      "Tout le Starter inclus",
      "Qualification automatique des leads",
      "Intégration CRM (HubSpot, Notion…)",
      "Séquences email IA personnalisées",
      "Reporting mensuel automatisé",
      "Support prioritaire illimité",
    ],
    cta: "Le plus populaire →",
  },
  {
    name: "Standard Pro",
    price: "Sur devis",
    billing: "à partir de 5 000 €",
    description: "Une transformation IA complète, adaptée à votre organisation.",
    highlight: false,
    features: [
      "Audit complet de vos process",
      "Automatisations sur-mesure (Make, n8n)",
      "Intégrations multi-outils",
      "Formation de votre équipe",
      "Accompagnement 3 mois",
      "Maintenance & évolutions incluses",
    ],
    cta: "Parlons de votre projet →",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent-light text-sm font-medium uppercase tracking-widest mb-4">
            Nos services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-50 tracking-tight mb-4">
            Des packages clairs,{" "}
            <span className="gradient-text">des résultats concrets.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Pas de surprise, pas de jargon. Vous choisissez votre niveau d&apos;automatisation, on s&apos;occupe du reste.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                s.highlight
                  ? "bg-accent/10 border-2 border-accent/50 glow"
                  : "bg-zinc-900 border border-zinc-800"
              }`}
            >
              {s.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-zinc-100 font-bold text-xl mb-1">{s.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{s.description}</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-zinc-50">{s.price}</span>
                </div>
                <p className="text-zinc-500 text-xs mt-1">{s.billing}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="text-accent-light mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`text-center font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 text-sm ${
                  s.highlight
                    ? "bg-accent hover:bg-accent-dark text-white hover:shadow-lg hover:shadow-accent/20"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700"
                }`}
              >
                {s.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
