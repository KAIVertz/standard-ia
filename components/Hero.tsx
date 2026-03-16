"use client";

import { motion } from "framer-motion";

const floatingCards = [
  { label: "Lead qualifié", value: "+1 nouveau", icon: "✦", delay: 0, x: -60, y: 20 },
  { label: "Email envoyé", value: "Auto · 09:42", icon: "⚡", delay: 0.3, x: 60, y: -10 },
  { label: "CRM mis à jour", value: "HubSpot sync", icon: "◈", delay: 0.6, x: -40, y: 120 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid pt-20">
      {/* Deep glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)" }}
      />
      <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left — Text */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-8"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "#00d4ff",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            Agence IA · France · Résultats en 14 jours
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05] mb-6"
          >
            L&apos;IA qui fait
            <br />
            <span className="gradient-text">tourner votre</span>
            <br />
            business.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md"
          >
            Chatbots, CRM, emails, reporting — on automatise vos tâches
            répétitives avec l&apos;IA pour que vous vous concentrez sur ce qui
            compte vraiment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-black overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)" }}
            >
              <span className="relative z-10">Démarrer maintenant →</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-white transition-opacity" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-300 hover:text-white transition-colors duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Voir les offres
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center gap-6 text-xs text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-[#00d4ff]">✓</span> Sans engagement
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#00d4ff]">✓</span> Support français
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#00d4ff]">✓</span> Résultats garantis
            </span>
          </motion.div>
        </div>

        {/* Right — Animated dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex items-center justify-center relative"
        >
          {/* Central panel */}
          <div
            className="relative w-72 h-80 rounded-2xl scanline"
            style={{
              background: "linear-gradient(135deg, #0f0f1a, #14142a)",
              border: "1px solid rgba(0,212,255,0.2)",
              boxShadow: "0 0 40px rgba(0,212,255,0.1), inset 0 0 40px rgba(0,212,255,0.03)",
            }}
          >
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
                <span className="text-xs text-slate-400 font-mono">standard_ia.agent</span>
              </div>
              {/* Fake data rows */}
              {[
                { label: "Chatbot conversations", val: "1 284", up: true },
                { label: "Leads capturés", val: "347", up: true },
                { label: "Emails automatisés", val: "2 901", up: true },
                { label: "Heures économisées", val: "163h", up: true },
              ].map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0"
                >
                  <span className="text-xs text-slate-400">{row.label}</span>
                  <span className="text-xs font-bold text-white">{row.val}</span>
                </motion.div>
              ))}
              <div className="mt-4 text-center">
                <div className="text-[10px] text-slate-500 mb-1">Ce mois</div>
                <div className="text-2xl font-black gradient-text">+43% ROI</div>
              </div>
            </div>
          </div>

          {/* Floating notification cards */}
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              className="absolute animate-float"
              style={{ animationDelay: `${card.delay}s` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.2 }}
            >
              <div
                className="px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 whitespace-nowrap"
                style={{
                  background: "rgba(10,10,18,0.9)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  backdropFilter: "blur(10px)",
                  transform: `translate(${card.x}px, ${card.y}px)`,
                }}
              >
                <span className="text-[#00d4ff]">{card.icon}</span>
                <div>
                  <div className="text-white">{card.label}</div>
                  <div className="text-slate-500 text-[10px]">{card.value}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
