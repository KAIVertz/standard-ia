/**
 * LÉON 🐦 — Générateur de tweets quotidiens
 *
 * Génère 3 tweets bonus par jour (en plus du tweet article)
 * Sauvegardés dans content/social/tweet-{slot}.txt
 *
 * Slots : midi, soir, nuit
 *
 * Usage: npx tsx scripts/generate-tweets.ts
 */

import * as fs from "fs"
import * as path from "path"
import { sendMessage } from "./agent-bus.js"

const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", yellow: "\x1b[33m",
  red: "\x1b[31m", purple: "\x1b[35m",
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY manquante.")
  process.exit(1)
}

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

async function askGemini(prompt: string): Promise<string> {
  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.9, maxOutputTokens: 1500 },
    }),
  })
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
}

async function main() {
  console.log(`\n${c.purple}${c.bold}╔══════════════════════════════════════╗${c.reset}`)
  console.log(`${c.purple}${c.bold}║  🐦  LÉON — Génération tweets bonus   ║${c.reset}`)
  console.log(`${c.purple}${c.bold}╚══════════════════════════════════════╝${c.reset}\n`)

  const raw = await askGemini(`Tu es le community manager de Standard IA, un média IA francophone.

Génère exactement 3 tweets pour aujourd'hui. Chaque tweet doit être DIFFÉRENT :

1. **MIDI** — Un conseil, hack ou prompt IA concret et actionnable. Commence par un emoji outil (🛠️ ou ⚡ ou 💡).
2. **SOIR** — Une stat surprenante ou une question qui engage. Commence par un emoji (📊 ou 🤔 ou 🔥).
3. **NUIT** — Une opinion/take sur une tendance IA. Commence par un emoji (🧠 ou 💭 ou 🚀).

RÈGLES STRICTES :
- Chaque tweet MAXIMUM 250 caractères (moins c'est mieux)
- Tout en français
- Termine chaque tweet par une ligne vide puis "👉 standard-ia.pro"
- Ton direct, punchy, pas corporate
- JAMAIS de hashtags

Réponds EXACTEMENT dans ce format (3 blocs séparés par ---) :

MIDI
[tweet midi]
---
SOIR
[tweet soir]
---
NUIT
[tweet nuit]`)

  const socialDir = path.join(process.cwd(), "content", "social")
  if (!fs.existsSync(socialDir)) fs.mkdirSync(socialDir, { recursive: true })

  const blocks = raw.split("---").map(b => b.trim()).filter(Boolean)
  const slots = ["midi", "soir", "nuit"]

  for (let i = 0; i < Math.min(blocks.length, 3); i++) {
    // Remove the slot label (MIDI/SOIR/NUIT) from the beginning
    let tweet = blocks[i].replace(/^(MIDI|SOIR|NUIT)\s*/i, "").trim()

    // Ensure it ends with the link
    if (!tweet.includes("standard-ia.pro")) {
      tweet += "\n\n👉 standard-ia.pro"
    }

    // Truncate if over 280
    if (tweet.length > 280) {
      const lines = tweet.split("\n")
      const link = lines.pop() // save link line
      let text = lines.join("\n")
      text = text.slice(0, 280 - (link?.length || 0) - 3) + "..."
      tweet = text + "\n" + link
    }

    const filePath = path.join(socialDir, `tweet-${slots[i]}.txt`)
    fs.writeFileSync(filePath, tweet)
    console.log(`  ${c.green}✅${c.reset} tweet-${slots[i]}.txt ${c.dim}(${tweet.length} chars)${c.reset}`)
  }

  sendMessage("LÉON", "ARGUS", "HEALTH_OK", { action: "generate_tweets", count: blocks.length })

  console.log(`\n${c.green}${c.bold}  ✅  3 tweets bonus générés !${c.reset}\n`)
}

main().catch(err => {
  sendMessage("LÉON", "ARGUS", "ERROR", { error: err.message, action: "generate_tweets" })
  console.error(`❌ LÉON — Erreur tweets :`, err.message)
  process.exit(1)
})
