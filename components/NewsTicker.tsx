"use client"
import { motion } from "framer-motion"

const headlines = [
  "OpenAI lance GPT-5 avec des capacités de raisonnement avancé",
  "Google Gemini 2.0 disponible gratuitement",
  "L'UE adopte le AI Act — ce que ça change",
  "Perplexity lève 500M$ et rivalise avec Google",
  "Claude 4 d'Anthropic : le modèle le plus sûr du marché",
  "L'IA générative atteint 1.8 milliard d'utilisateurs",
  "Make.com intègre des agents IA autonomes",
  "La France investit 2 milliards dans l'IA",
]

export default function NewsTicker() {
  const doubled = [...headlines, ...headlines]

  return (
    <div className="relative overflow-hidden py-3 border-y border-[#1a1a1a] bg-[#0a0a0a]">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((h, i) => (
          <span key={i} className="text-sm text-[#555] flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
            {h}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
