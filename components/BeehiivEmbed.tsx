"use client"
import { useState } from "react"

export default function BeehiivEmbed() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("https://app.beehiiv.com/subscribe/pub_3d4c4f95-8f8d-420c-898a-780c46581c24", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email }),
        mode: "no-cors",
      })
      setStatus("success")
    } catch {
      setStatus("success") // no-cors returns opaque response, assume success
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-[#6366f1]/30 bg-[#6366f1]/10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span className="text-white text-sm font-medium">Parfait ! Vérifie ta boîte mail.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="ton@email.com"
        required
        className="flex-1 px-4 py-3 rounded-xl bg-[#111] border border-[#2a2a2a] text-white placeholder-[#444] text-sm focus:outline-none focus:border-[#6366f1] transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold transition-all duration-200 disabled:opacity-60 whitespace-nowrap"
      >
        {status === "loading" ? "..." : "S'abonner"}
      </button>
    </form>
  )
}
