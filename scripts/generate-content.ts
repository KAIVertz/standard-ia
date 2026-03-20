/**
 * Agent 1 : Content Writer
 *
 * Deux modes :
 *   --daily   → Lit les flux RSS IA du jour → génère 1 article pour demain
 *   --weekly  → Génère posts sociaux + newsletter de la semaine (lundi)
 *
 * Usage:
 *   npx tsx scripts/generate-content.ts --daily
 *   npx tsx scripts/generate-content.ts --weekly
 */

import * as fs from "fs"
import * as path from "path"

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
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split("T")[0]
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0]
}

function getWeekNumber(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const days = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return Math.ceil((days + start.getDay() + 1) / 7)
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
      const items = extractRSSItems(xml, 3)
      return { name, items }
    })
  )

  for (const result of results) {
    if (result.status === "fulfilled" && result.value.items.length > 0) {
      headlines.push(`\n### ${result.value.name}`)
      result.value.items.forEach(item => headlines.push(`• ${item}`))
    }
  }

  return headlines.length > 0
    ? headlines.join("\n")
    : "Pas d'actualités récupérées — génère un article de fond sur l'IA."
}

// ─── Daily mode: 1 article based on real news ───

async function runDaily() {
  console.log(`\n${c.purple}${c.bold}╔══════════════════════════════════════╗${c.reset}`)
  console.log(`${c.purple}${c.bold}║  🤖  Agent 1 : Daily Content Writer   ║${c.reset}`)
  console.log(`${c.purple}${c.bold}╚══════════════════════════════════════╝${c.reset}\n`)
  const startTime = Date.now()

  // 1. Fetch real AI news
  const stop1 = spinner("Lecture des flux RSS IA en temps réel")
  const news = await fetchRSSNews()
  stop1()
  const feedCount = (news.match(/###/g) || []).length
  console.log(`  ${c.green}✅${c.reset} ${c.bold}${feedCount} sources RSS lues${c.reset} ${c.dim}(TechCrunch, Verge, VentureBeat, Le Monde, MIT)${c.reset}`)

  // 2. Generate 1 article based on that news
  const tomorrow = tomorrowStr()
  const stop2 = spinner("Gemini analyse les actus et rédige l'article")
  const raw = await askGemini(`Tu es le rédacteur en chef de Standard IA, un média IA francophone.

Voici les vraies actualités IA d'aujourd'hui (${todayStr()}) récupérées en temps réel :

${news}

En te basant sur ces actualités, génère 1 article de fond pour demain (${tomorrow}).
Choisis l'actu la plus pertinente ou combine plusieurs si c'est cohérent.
L'article doit analyser, contextualiser, donner un point de vue — pas juste résumer.

IMPORTANT : Réponds UNIQUEMENT avec du JSON valide, sans blocs markdown, sans \`\`\`, juste le JSON brut.

Format exact :
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
- Angle original : que signifie cette actu pour les PME françaises ?
- Slug unique en kebab-case`)
  stop2()

  const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim()
  const article = JSON.parse(cleaned)

  const queueDir = path.join(process.cwd(), "content", "queue")
  if (!fs.existsSync(queueDir)) fs.mkdirSync(queueDir, { recursive: true })
  fs.writeFileSync(path.join(queueDir, `${tomorrow}.json`), JSON.stringify(article, null, 2))
  console.log(`  ${c.green}✅${c.reset} ${c.bold}"${article.title}"${c.reset}`)
  console.log(`  ${c.dim}→ Publié demain : ${tomorrow}${c.reset}`)

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  Article du jour généré en ${elapsed}s        ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚══════════════════════════════════════════╝${c.reset}\n`)
}

// ─── Weekly mode: social posts + newsletter ───

async function runWeekly() {
  console.log(`\n${c.blue}${c.bold}╔══════════════════════════════════════╗${c.reset}`)
  console.log(`${c.blue}${c.bold}║  🤖  Agent 1 : Weekly Content Writer  ║${c.reset}`)
  console.log(`${c.blue}${c.bold}╚══════════════════════════════════════╝${c.reset}\n`)
  const startTime = Date.now()
  const week = getWeekNumber()

  // Fetch news for weekly context too
  const stop0 = spinner("Lecture des flux RSS pour contexte hebdomadaire")
  const news = await fetchRSSNews()
  stop0()
  console.log(`  ${c.green}✅${c.reset} ${c.bold}Actus de la semaine récupérées${c.reset}`)

  const socialDir = path.join(process.cwd(), "content", "social")
  if (!fs.existsSync(socialDir)) fs.mkdirSync(socialDir, { recursive: true })

  // Social posts
  const stop1 = spinner("Gemini génère les posts sociaux de la semaine")
  const socialRaw = await askGemini(`Tu es le community manager de Standard IA.
Voici les actus IA de cette semaine :

${news}

Génère le contenu social de la semaine en te basant sur ces vraies actus :

1. UN thread Twitter (8 tweets) sur le sujet le plus fort de la semaine
2. 5 tweets individuels (tips, stats, angles différents)

# Thread Twitter — [SUJET]

Tweet 1/8:
[contenu < 280 caractères]

...

# Tweets individuels

Tweet 1:
[contenu < 280 caractères]

...

Règles : tout en français, tweets < 280 caractères, hooks forts, mentionner standard-ia.pro`)
  stop1()
  fs.writeFileSync(path.join(socialDir, `social-week${week}.md`), socialRaw)
  console.log(`  ${c.green}✅${c.reset} ${c.bold}Posts sociaux générés${c.reset} ${c.dim}→ social-week${week}.md${c.reset}`)

  // Newsletter
  const stop2 = spinner("Gemini génère la newsletter")
  const newsletterRaw = await askGemini(`Tu es le rédacteur de la newsletter Standard IA.
Voici les vraies actus IA de cette semaine :

${news}

Génère l'édition #${week} basée sur ces vraies actualités.

# Newsletter Standard IA — Édition #${week}

## L'actu IA de la semaine
[3 actus réelles tirées des flux ci-dessus, résumées en 2-3 phrases chacune]

## L'outil de la semaine : [Nom]
[Description courte + pourquoi c'est utile]

## Le hack de la semaine
[1 conseil concret, prompt ou technique]

## Le mot de la fin
[1-2 phrases + CTA newsletter]

Règles : tout en français, ton direct, 800-1000 mots total`)
  stop2()
  fs.writeFileSync(path.join(socialDir, `newsletter-week${week}.md`), newsletterRaw)
  console.log(`  ${c.green}✅${c.reset} ${c.bold}Newsletter générée${c.reset} ${c.dim}→ newsletter-week${week}.md${c.reset}`)

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  Contenu semaine ${week} généré en ${elapsed}s      ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚══════════════════════════════════════════╝${c.reset}\n`)
}

// ─── Main ───

const args = process.argv.slice(2)
if (args.includes("--weekly")) {
  runWeekly().catch(err => { console.error(`❌ Erreur :`, err.message); process.exit(1) })
} else {
  // Default: --daily
  runDaily().catch(err => { console.error(`❌ Erreur :`, err.message); process.exit(1) })
}
