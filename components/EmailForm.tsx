"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function EmailForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === "loading") return

    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-4"
          >
            <p className="text-white font-display font-bold text-lg mb-1">Bienvenue !</p>
            <p className="text-[#555] text-sm">Vérifie ta boîte mail pour confirmer.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <input
              type="email"
              required
              placeholder="Ton email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-[#111] border border-[#222] rounded-xl px-5 py-3.5 text-white text-sm placeholder-[#444] outline-none focus:border-[#333] transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white hover:bg-[#e5e5e5] text-black font-bold px-6 py-3.5 rounded-xl text-sm transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "..." : "S'abonner"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-xs mt-2"
        >
          Une erreur est survenue. Réessaie.
        </motion.p>
      )}
    </div>
  )
}
