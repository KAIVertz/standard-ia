/**
 * SCOUT 🔍 — Agent d'Intelligence Marché
 *
 * Analyse chaque semaine les concurrents (français + américains),
 * repère les meilleures pratiques, génère un rapport d'améliorations
 * pour NOVA qui les implémente.
 *
 * Usage: npx tsx scripts/scout.ts
 */

import * as fs from "fs"
import * as path from "path"
import { logAgentMessage, sendMessage } from "./agent-bus.js"

const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", yellow: "\x1b[33m",
  red: "\x1b[31m", blue: "\x1b[34m", purple: "\x1b[35m",
}

function spinner(label: string): () => void {
  const frames = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"]
  let i = 0
  const iv = setInterval(() => { process.stdout.write(`\r  ${c.cyan}${frames[i++%frames.length]}${c.reset} ${label}...`) }, 80)
  return () => { clearInterval(iv); process.stdout.write("\r") }
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_API_KEY) { console.error("❌ GEMINI_API_KEY manquante"); process.exit(1) }
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

async function askGemini(prompt: string): Promise<string> {
  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 4000 } }),
  })
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`)
  return (await res.json()).candidates?.[0]?.content?.parts?.[0]?.text ?? ""
}

// Concurrents à analyser
const COMPETITORS = [
  // Français
  { name: "Intelligence Artificielle France", url: "https://www.intelligence-artificielle-school.com/", country: "FR" },
  { name: "Siècle Digital IA", url: "https://siecledigital.fr/intelligence-artificielle/", country: "FR" },
  { name: "Journal du Net IA", url: "https://www.journaldunet.com/intelligence-artificielle/", country: "FR" },
  // Américains (références)
  { name: "The Rundown AI", url: "https://www.therundown.ai/", country: "US" },
  { name: "TLDR AI", url: "https://tldr.tech/ai", country: "US" },
  { name: "Ben's Bites", url: "https://bensbites.beehiiv.com/", country: "US" },
  { name: "AI Breakfast", url: "https://aibreakfast.beehiiv.com/", country: "US" },
]

async function fetchPageContent(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" }
    })
    const html = await res.text()
    // Extract text content (remove HTML tags)
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 3000)
    return text
  } catch {
    return ""
  }
}

async function main() {
  const startTime = Date.now()
  console.log(`\n${c.blue}${c.bold}╔══════════════════════════════════╗${c.reset}`)
  console.log(`${c.blue}${c.bold}║  🔍  SCOUT — Intelligence Marché  ║${c.reset}`)
  console.log(`${c.blue}${c.bold}╚══════════════════════════════════╝${c.reset}\n`)

  // 1. Scraper les concurrents
  const competitorData: { name: string; country: string; content: string }[] = []
  console.log(`${c.bold}Analyse des concurrents :${c.reset}`)

  for (const comp of COMPETITORS) {
    const stop = spinner(`${comp.name} (${comp.country})`)
    const content = await fetchPageContent(comp.url)
    stop()
    if (content.length > 100) {
      competitorData.push({ name: comp.name, country: comp.country, content })
      console.log(`  ${c.green}✅${c.reset} ${comp.name} ${c.dim}(${comp.country})${c.reset}`)
    } else {
      console.log(`  ${c.yellow}⚠️${c.reset}  ${comp.name} ${c.dim}(inaccessible)${c.reset}`)
    }
  }

  // 2. Demander à Gemini d'analyser
  const stop2 = spinner("Gemini analyse les concurrents et génère le rapport")

  const competitorSummary = competitorData.map(d =>
    `### ${d.name} (${d.country})\n${d.content.slice(0, 500)}`
  ).join("\n\n")

  const report = await askGemini(`Tu es SCOUT, agent d'intelligence marché pour Standard IA.

Standard IA est un média IA francophone (newsletter + articles + outils) pour les PME françaises.
Site actuel : standard-ia.pro

Voici le contenu scraped des concurrents :

${competitorSummary}

Génère un rapport JSON d'analyse concurrentielle avec des recommandations d'amélioration concrètes.

Réponds UNIQUEMENT en JSON brut :
{
  "date": "${new Date().toISOString().split("T")[0]}",
  "summary": "Résumé de l'analyse en 2-3 phrases",
  "competitors": [
    {
      "name": "nom",
      "country": "FR/US",
      "strengths": ["point fort 1", "point fort 2"],
      "weaknesses": ["point faible 1"],
      "steal_this": ["pratique à copier 1", "pratique à copier 2"]
    }
  ],
  "opportunities": [
    "Opportunité 1 non exploitée par les concurrents",
    "Opportunité 2"
  ],
  "site_improvements": [
    {
      "priority": "high/medium/low",
      "area": "design/content/seo/ux/newsletter",
      "title": "Titre de l'amélioration",
      "description": "Description détaillée",
      "inspired_by": "Nom du concurrent source"
    }
  ],
  "content_ideas": [
    "Idée d'article/format que les concurrents US font bien"
  ]
}`)
  stop2()

  // 3. Sauvegarder le rapport
  const reportsDir = path.join(process.cwd(), "content", "scout")
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true })

  const date = new Date().toISOString().split("T")[0]
  const reportFile = path.join(reportsDir, `report-${date}.json`)

  let cleaned = report.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim()
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
  // Fix unescaped newlines inside JSON strings
  cleaned = cleaned.replace(/"(?:[^"\\]|\\.)*"/g, (match) =>
    match.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")
  )
  let reportData: Record<string, unknown>
  try {
    reportData = JSON.parse(cleaned)
  } catch {
    console.log(`  ${c.yellow}⚠️  JSON mal formé — tentative de récupération${c.reset}`)
    reportData = { opportunities: [], site_improvements: [], raw: cleaned.slice(0, 2000) }
  }
  fs.writeFileSync(reportFile, JSON.stringify(reportData, null, 2))

  // Toujours garder un "latest" pour NOVA
  fs.writeFileSync(path.join(reportsDir, "latest.json"), JSON.stringify(reportData, null, 2))

  console.log(`\n  ${c.green}✅${c.reset} Rapport sauvegardé → ${c.dim}content/scout/report-${date}.json${c.reset}`)
  console.log(`\n${c.bold}📊 Opportunités détectées :${c.reset}`)
  reportData.opportunities?.slice(0,3).forEach((o: string) => console.log(`  ${c.cyan}→${c.reset} ${o}`))
  console.log(`\n${c.bold}🔧 Top améliorations site :${c.reset}`)
  reportData.site_improvements?.filter((i: {priority: string}) => i.priority === "high").slice(0,3).forEach((i: {title: string; area: string}) =>
    console.log(`  ${c.yellow}⭐${c.reset} [${i.area}] ${i.title}`)
  )

  // Notifier NOVA et ARGUS
  logAgentMessage("SCOUT", "NOVA", "HEALTH_OK", { action: "report_ready", file: `content/scout/report-${date}.json`, improvements: reportData.site_improvements?.length })
  sendMessage("SCOUT", "ARGUS", "HEALTH_OK", { action: "market_analysis_done", date })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  SCOUT a terminé en ${elapsed}s              ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚══════════════════════════════════════════╝${c.reset}\n`)
}

main().catch(err => {
  sendMessage("SCOUT", "ARGUS", "ERROR", { error: err.message })
  console.error(`❌ SCOUT — Erreur :`, err.message)
  process.exit(1)
})
