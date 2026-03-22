/**
 * LÉON 🐦 — Générateur de tweets quotidiens
 *
 * Génère 3 tweets bonus par jour (en plus du tweet article)
 * Chaque tweet renvoie vers le dernier article publié
 * Sauvegardés dans content/social/tweet-{slot}.txt
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

/** Find the latest article slug from posts.ts */
function getLatestArticleSlug(): string {
  const postsPath = path.join(process.cwd(), "content", "posts.ts")
  if (!fs.existsSync(postsPath)) return ""
  const content = fs.readFileSync(postsPath, "utf-8")
  // Find the last slug in the file
  const slugs = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)]
  if (slugs.length === 0) return ""
  return slugs[0][1] // first = most recent (prepended at top)
}

/** Find the latest article title from posts.ts */
function getLatestArticleTitle(): string {
  const postsPath = path.join(process.cwd(), "content", "posts.ts")
  if (!fs.existsSync(postsPath)) return ""
  const content = fs.readFileSync(postsPath, "utf-8")
  const titles = [...content.matchAll(/title:\s*['"]([^'"]+)['"]/g)]
  if (titles.length === 0) return ""
  return titles[0][1] // first = most recent
}

async function main() {
  console.log(`\n${c.purple}${c.bold}╔══════════════════════════════════════╗${c.reset}`)
  console.log(`${c.purple}${c.bold}║  🐦  LÉON — Génération tweets bonus   ║${c.reset}`)
  console.log(`${c.purple}${c.bold}╚══════════════════════════════════════╝${c.reset}\n`)

  const slug = getLatestArticleSlug()
  const title = getLatestArticleTitle()
  const articleUrl = slug ? `standard-ia.pro/posts/${slug}` : "standard-ia.pro"

  if (slug) {
    console.log(`  ${c.cyan}📄${c.reset} Dernier article : ${c.bold}"${title}"${c.reset}`)
  }

  const raw = await askGemini(`Tu es le community manager de Standard IA, un média IA francophone.
${slug ? `\nLe dernier article publié est : "${title}"\nLien : ${articleUrl}\n` : ""}
Génère exactement 3 tweets pour aujourd'hui. Chaque tweet doit être EN LIEN avec le dernier article ou le thème de l'IA, et doit donner envie de cliquer sur le lien.

1. **MIDI** — Un conseil, hack ou prompt IA concret et actionnable en lien avec le sujet de l'article. Commence par un emoji (🛠️ ou ⚡ ou 💡).
2. **SOIR** — Une stat surprenante ou une question qui engage en rapport avec le sujet. Commence par un emoji (📊 ou 🤔 ou 🔥).
3. **NUIT** — Une opinion/take sur le sujet de l'article ou la tendance IA qu'il aborde. Commence par un emoji (🧠 ou 💭 ou 🚀).

RÈGLES STRICTES :
- Chaque tweet MAXIMUM 250 caractères (AVANT le lien)
- Tout en français
- Termine CHAQUE tweet par une ligne vide puis "👉 ${articleUrl}"
- Ton direct, punchy, pas corporate
- JAMAIS de hashtags
- Le lien doit TOUJOURS pointer vers l'article, PAS vers standard-ia.pro tout court

Réponds EXACTEMENT dans ce format (3 blocs séparés par ---) :

MIDI
[tweet midi]

👉 ${articleUrl}
---
SOIR
[tweet soir]

👉 ${articleUrl}
---
NUIT
[tweet nuit]

👉 ${articleUrl}`)

  const socialDir = path.join(process.cwd(), "content", "social")
  if (!fs.existsSync(socialDir)) fs.mkdirSync(socialDir, { recursive: true })

  const blocks = raw.split("---").map(b => b.trim()).filter(Boolean)
  const slots = ["midi", "soir", "nuit"]

  for (let i = 0; i < Math.min(blocks.length, 3); i++) {
    let tweet = blocks[i].replace(/^(MIDI|SOIR|NUIT)\s*/i, "").trim()

    // Replace any generic standard-ia.pro link with the article link
    if (slug) {
      tweet = tweet.replace(/👉\s*standard-ia\.pro\s*$/m, `👉 ${articleUrl}`)
      if (!tweet.includes(articleUrl)) {
        tweet = tweet.replace(/👉.*$/m, `👉 ${articleUrl}`)
      }
      if (!tweet.includes("👉")) {
        tweet += `\n\n👉 ${articleUrl}`
      }
    } else if (!tweet.includes("standard-ia.pro")) {
      tweet += "\n\n👉 standard-ia.pro"
    }

    // Truncate if over 280
    if (tweet.length > 280) {
      const lines = tweet.split("\n")
      const linkLine = lines.find(l => l.startsWith("👉")) || ""
      const textLines = lines.filter(l => !l.startsWith("👉"))
      let text = textLines.join("\n")
      const maxLen = 280 - linkLine.length - 3
      text = text.slice(0, maxLen) + "..."
      tweet = text.trim() + "\n\n" + linkLine
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
