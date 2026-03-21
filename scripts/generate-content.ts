/**
 * LÉON ✍️ — Rédacteur en chef de Standard IA
 *
 * Lit les vrais flux RSS IA → génère du contenu avec Gemini
 *
 * Modes :
 *   --daily   → 1 article pour demain basé sur les actus du jour
 *   --weekly  → posts sociaux + newsletter de la semaine
 *
 * Usage:
 *   npx tsx scripts/generate-content.ts --daily
 *   npx tsx scripts/generate-content.ts --weekly
 */

import * as fs from "fs"
import * as path from "path"
import { sendMessage, logAgentMessage, readMessages } from "./agent-bus.js"

// ─── Terminal colors ───
const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", yellow: "\x1b[33m",
  red: "\x1b[31m", purple: "\x1b[35m", blue: "\x1b[34m",
}

function spinner(label: string): () => void {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
  let i = 0
  const interval = setInterval(() => {
    process.stdout.write(`\r  ${c.cyan}${frames[i % frames.length]}${c.reset} ${label}...`)
    i++
  }, 80)
  return () => { clearInterval(interval); process.stdout.write("\r") }
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
      generationConfig: { temperature: 0.8, maxOutputTokens: 4000 },
    }),
  })
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
}

function tomorrowStr(): string {
  const d = new Date(); d.setDate(d.getDate() + 1)
  return d.toISOString().split("T")[0]
}

function todayStr(): string { return new Date().toISOString().split("T")[0] }

function getWeekNumber(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  return Math.ceil((Math.floor((now.getTime() - start.getTime()) / 86400000) + start.getDay() + 1) / 7)
}

// ─── RSS fetching ───

const RSS_FEEDS = [
  { name: "TechCrunch AI",   url: "https://techcrunch.com/category/artificial-intelligence/feed/" },
  { name: "The Verge AI",    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml" },
  { name: "VentureBeat AI",  url: "https://venturebeat.com/category/ai/feed/" },
  { name: "Le Monde IA",     url: "https://www.lemonde.fr/intelligence-artificielle/rss_full.xml" },
  { name: "MIT Tech Review", url: "https://www.technologyreview.com/feed/" },
]

function extractRSSItems(xml: string, maxItems = 3): string[] {
  const items: string[] = []
  const itemBlocks = xml.match(/<item[\s>][\s\S]*?<\/item>/g) || []
  for (const block of itemBlocks.slice(0, maxItems)) {
    const titleMatch = block.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/)
    const descMatch  = block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/)
    if (!titleMatch) continue
    const title = titleMatch[1].replace(/<[^>]+>/g, "").trim()
    const desc  = descMatch
      ? descMatch[1].replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, " ").trim().slice(0, 180)
      : ""
    if (title.length > 10) items.push(desc ? `${title} — ${desc}` : title)
  }
  return items
}

async function fetchRSSNews(): Promise<string> {
  const headlines: string[] = []
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async ({ name, url }) => {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(6000),
        headers: { "User-Agent": "Mozilla/5.0 (compatible; StandardIA-Bot/1.0)" }
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const xml = await res.text()
      return { name, items: extractRSSItems(xml, 3) }
    })
  )
  for (const result of results) {
    if (result.status === "fulfilled" && result.value.items.length > 0) {
      headlines.push(`\n### ${result.value.name}`)
      result.value.items.forEach(item => headlines.push(`• ${item}`))
    }
  }
  return headlines.length > 0 ? headlines.join("\n") : "Pas d'actualités — génère un article de fond."
}

// ─── Daily mode ───

async function runDaily() {
  console.log(`\n${c.purple}${c.bold}╔══════════════════════════════════╗${c.reset}`)
  console.log(`${c.purple}${c.bold}║  ✍️   LÉON — Rédacteur en chef    ║${c.reset}`)
  console.log(`${c.purple}${c.bold}║  Mode : Génération quotidienne    ║${c.reset}`)
  console.log(`${c.purple}${c.bold}╚══════════════════════════════════╝${c.reset}\n`)
  const startTime = Date.now()

  // Check inbox — ÉCHO a-t-il demandé un article en urgence ?
  const messages = readMessages("LÉON")
  const urgentRequest = messages.find(m => m.type === "REQUEST_CONTENT")
  if (urgentRequest) {
    console.log(`  ${c.yellow}📨 Message de ${urgentRequest.from} : contenu urgent demandé !${c.reset}`)
  }

  // 1. Fetch RSS
  const stop1 = spinner("Lecture des flux RSS IA en temps réel")
  const news = await fetchRSSNews()
  stop1()
  const feedCount = (news.match(/###/g) || []).length
  console.log(`  ${c.green}✅${c.reset} ${feedCount} sources RSS lues ${c.dim}(TechCrunch, Verge, VentureBeat, Le Monde, MIT)${c.reset}`)

  // 2. Generate article
  const tomorrow = tomorrowStr()
  const stop2 = spinner("Gemini analyse les actus et rédige l'article")
  const raw = await askGemini(`Tu es LÉON, rédacteur en chef de Standard IA, un média IA francophone.

Voici les vraies actualités IA d'aujourd'hui (${todayStr()}) :

${news}

Génère 1 article de fond pour demain (${tomorrow}).
Choisis l'actu la plus pertinente ou combine plusieurs si cohérent.
L'article doit analyser, contextualiser, donner un point de vue — pas juste résumer.

IMPORTANT : Réponds UNIQUEMENT avec du JSON valide, sans \`\`\`, juste le JSON brut.

{
  "slug": "slug-en-kebab-case",
  "title": "Titre accrocheur en français",
  "excerpt": "Résumé en 1-2 phrases.",
  "type": "article",
  "date": "${tomorrow}",
  "readTime": 6,
  "content": "## Intro\\n\\nContenu...\\n\\n## Section 2\\n\\nContenu...\\n\\n## Conclusion\\n\\nContenu."
}

Règles :
- Tout en français, ton direct et accessible
- Minimum 500 mots dans content (\\n pour les sauts de ligne)
- Angle : que signifie cette actu pour les entrepreneurs et PME français ?
- Slug unique en kebab-case`)
  stop2()

  let cleaned = raw
    .replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim()
    // Remove control characters that break JSON.parse (except \n \r \t)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")

  // Fix unescaped newlines inside JSON string values:
  // Replace real newlines inside strings with \\n
  cleaned = cleaned.replace(/"(?:[^"\\]|\\.)*"/g, (match) => {
    return match.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")
  })

  let article: Record<string, unknown>
  try {
    article = JSON.parse(cleaned)
  } catch {
    // Last resort: extract fields manually with regex
    const slug = cleaned.match(/"slug"\s*:\s*"([^"]+)"/)?.[1] || `article-${tomorrowStr()}`
    const title = cleaned.match(/"title"\s*:\s*"([^"]+)"/)?.[1] || "Article du jour"
    const excerpt = cleaned.match(/"excerpt"\s*:\s*"([^"]+)"/)?.[1] || ""
    const readTime = Number(cleaned.match(/"readTime"\s*:\s*(\d+)/)?.[1] || "5")
    // Extract content between "content": " and the last "
    const contentMatch = cleaned.match(/"content"\s*:\s*"([\s\S]*)"[\s\n]*\}/)
    const content = contentMatch
      ? contentMatch[1].replace(/\\n/g, "\n").replace(/\\"/g, '"').slice(0, 5000)
      : "Contenu indisponible."
    article = { slug, title, excerpt, type: "article", date: tomorrowStr(), readTime, content }
    console.log(`  ${c.yellow}⚠️  JSON mal formé — extraction manuelle utilisée${c.reset}`)
  }

  const queueDir = path.join(process.cwd(), "content", "queue")
  if (!fs.existsSync(queueDir)) fs.mkdirSync(queueDir, { recursive: true })
  fs.writeFileSync(path.join(queueDir, `${tomorrow}.json`), JSON.stringify(article, null, 2))

  console.log(`  ${c.green}✅${c.reset} ${c.bold}"${article.title}"${c.reset}`)
  console.log(`  ${c.dim}→ Publication prévue : ${tomorrow}${c.reset}`)

  // 3. Notifier ÉCHO que le contenu est prêt
  logAgentMessage("LÉON", "ÉCHO", "CONTENT_READY", { date: tomorrow, slug: article.slug, title: article.title })
  // Notifier ARGUS
  sendMessage("LÉON", "ARGUS", "HEALTH_OK", { action: "daily_generation", date: tomorrow })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  LÉON a terminé en ${elapsed}s              ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚══════════════════════════════════════════╝${c.reset}\n`)
}

// ─── Weekly mode ───

async function runWeekly() {
  console.log(`\n${c.blue}${c.bold}╔══════════════════════════════════╗${c.reset}`)
  console.log(`${c.blue}${c.bold}║  ✍️   LÉON — Rédacteur en chef    ║${c.reset}`)
  console.log(`${c.blue}${c.bold}║  Mode : Génération hebdomadaire   ║${c.reset}`)
  console.log(`${c.blue}${c.bold}╚══════════════════════════════════╝${c.reset}\n`)
  const startTime = Date.now()
  const week = getWeekNumber()

  const stop0 = spinner("Lecture des flux RSS pour contexte hebdomadaire")
  const news = await fetchRSSNews()
  stop0()
  console.log(`  ${c.green}✅${c.reset} Actus de la semaine récupérées`)

  const socialDir = path.join(process.cwd(), "content", "social")
  if (!fs.existsSync(socialDir)) fs.mkdirSync(socialDir, { recursive: true })

  // Social posts
  const stop1 = spinner("Génération des posts sociaux de la semaine")
  const socialRaw = await askGemini(`Tu es LÉON, community manager de Standard IA.
Voici les actus IA de cette semaine :

${news}

Génère le contenu social basé sur ces vraies actus :

# Thread Twitter — [SUJET]

Tweet 1/8:
[contenu < 280 caractères]

...jusqu'à Tweet 8/8

# Tweets individuels

Tweet 1:
[contenu < 280 caractères]

...jusqu'à Tweet 5

Règles : tout en français, tweets < 280 caractères, hooks forts, mentionner standard-ia.pro`)
  stop1()
  fs.writeFileSync(path.join(socialDir, `social-week${week}.md`), socialRaw)
  console.log(`  ${c.green}✅${c.reset} Posts sociaux → ${c.dim}social-week${week}.md${c.reset}`)

  // Newsletter
  const stop2 = spinner("Génération de la newsletter")
  const newsletterRaw = await askGemini(`Tu es LÉON, rédacteur de la newsletter Standard IA.
Voici les actus IA de cette semaine :

${news}

Génère l'édition #${week} :

# Newsletter Standard IA — Édition #${week}

## L'actu IA de la semaine
[3 actus réelles résumées en 2-3 phrases chacune]

## L'outil de la semaine : [Nom]
## Le hack de la semaine
## Le mot de la fin

Règles : tout en français, ton direct, 800-1000 mots`)
  stop2()
  fs.writeFileSync(path.join(socialDir, `newsletter-week${week}.md`), newsletterRaw)
  console.log(`  ${c.green}✅${c.reset} Newsletter → ${c.dim}newsletter-week${week}.md${c.reset}`)

  sendMessage("LÉON", "ARGUS", "HEALTH_OK", { action: "weekly_generation", week })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  LÉON a terminé semaine ${week} en ${elapsed}s   ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚══════════════════════════════════════════╝${c.reset}\n`)
}

// ─── Main ───

const args = process.argv.slice(2)
if (args.includes("--weekly")) {
  runWeekly().catch(err => {
    sendMessage("LÉON", "ARGUS", "ERROR", { error: err.message, mode: "weekly" })
    console.error(`❌ LÉON — Erreur :`, err.message)
    process.exit(1)
  })
} else {
  runDaily().catch(err => {
    sendMessage("LÉON", "ARGUS", "ERROR", { error: err.message, mode: "daily" })
    console.error(`❌ LÉON — Erreur :`, err.message)
    process.exit(1)
  })
}
