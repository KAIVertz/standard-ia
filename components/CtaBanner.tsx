"use client";

import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section id="contact" className="py-24 px-6" style={{ background: "#0a0a12" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-12 text-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f0f1a, #14142a)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          {/* Top line glow */}
          <div
            className="absolute top-0 left-[10%] right-[10%] h-px"
            style={{ background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }}
          />

          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.07) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.3)",
              }}
            >
              <span className="text-xl">⚡</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Prêt à faire travailler
              <br />
              <span className="gradient-text">l&apos;IA pour vous ?</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
              Réservez un appel découverte de 30 minutes — gratuit, sans engagement.
              On vous dit exactement ce qu&apos;on peut automatiser et en combien de temps.
            </p>

            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-black px-10 py-4 rounded-xl text-black text-lg transition-all duration-200 hover:scale-105 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                boxShadow: "0 0 40px rgba(0,212,255,0.25)",
              }}
            >
              Réserver mon appel gratuit →
            </a>

            <p className="mt-6 text-slate-600 text-sm">
              Ou écrivez-nous :{" "}
              <a
                href="mailto:contact@standard-ia.pro"
                className="text-slate-400 hover:text-white transition-colors underline underline-offset-2"
              >
                contact@standard-ia.pro
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
