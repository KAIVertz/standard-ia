/**
 * NOVA ✨ — Agent d'Amélioration du Site
 *
 * Lit le rapport de SCOUT, choisit la meilleure amélioration,
 * l'implémente directement dans le code du site.
 *
 * Usage: npx tsx scripts/nova.ts
 */

import * as fs from "fs"
import * as path from "path"
import { logAgentMessage, sendMessage, readMessages } from "./agent-bus.js"
import { execSync } from "child_process"

const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", yellow: "\x1b[33m",
  red: "\x1b[31m", purple: "\x1b[35m",
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
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.6, maxOutputTokens: 6000 } }),
  })
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`)
  return (await res.json()).candidates?.[0]?.content?.parts?.[0]?.text ?? ""
}

async function main() {
  const startTime = Date.now()
  console.log(`\n${c.purple}${c.bold}╔══════════════════════════════════╗${c.reset}`)
  console.log(`${c.purple}${c.bold}║  ✨  NOVA — Agent Site Improver   ║${c.reset}`)
  console.log(`${c.purple}${c.bold}╚══════════════════════════════════╝${c.reset}\n`)

  // Check inbox — SCOUT a-t-il envoyé un rapport ?
  const messages = readMessages("NOVA")
  const scoutMsg = messages.find(m => m.from === "SCOUT")
  if (scoutMsg) console.log(`  ${c.cyan}📨 Message de SCOUT reçu${c.reset}`)

  // 1. Lire le rapport SCOUT
  const latestReport = path.join(process.cwd(), "content", "scout", "latest.json")
  if (!fs.existsSync(latestReport)) {
    console.log(`  ${c.yellow}⚠️  Pas de rapport SCOUT trouvé — lance d'abord SCOUT${c.reset}`)
    console.log(`  ${c.dim}→ npm run scout${c.reset}\n`)
    process.exit(0)
  }

  const report = JSON.parse(fs.readFileSync(latestReport, "utf-8"))
  console.log(`  ${c.green}✅${c.reset} Rapport SCOUT du ${report.date} chargé`)
  console.log(`  ${c.dim}${report.summary}${c.reset}\n`)

  // 2. Lire les fichiers du site pour contexte
  const pageContent = fs.readFileSync(path.join(process.cwd(), "app", "page.tsx"), "utf-8")
  const globalsCss = fs.readFileSync(path.join(process.cwd(), "app", "globals.css"), "utf-8")

  // 3. Choisir la meilleure amélioration "high priority"
  const highPriority = report.site_improvements?.filter((i: {priority: string}) => i.priority === "high") || []
  if (highPriority.length === 0) {
    console.log(`  ${c.yellow}⚠️  Aucune amélioration haute priorité dans le rapport${c.reset}`)
    process.exit(0)
  }

  // Garder un log des améliorations déjà faites
  const doneFile = path.join(process.cwd(), "content", "scout", "done.json")
  const done: string[] = fs.existsSync(doneFile) ? JSON.parse(fs.readFileSync(doneFile, "utf-8")) : []

  const improvement = highPriority.find((i: {title: string}) => !done.includes(i.title)) || highPriority[0]

  console.log(`${c.bold}🎯 Amélioration choisie :${c.reset}`)
  console.log(`  ${c.cyan}[${improvement.area}]${c.reset} ${c.bold}${improvement.title}${c.reset}`)
  console.log(`  ${c.dim}Inspiré par : ${improvement.inspired_by}${c.reset}`)
  console.log(`  ${c.dim}${improvement.description}${c.reset}\n`)

  // 4. Demander à Gemini d'implémenter
  const stop = spinner("Gemini implémente l'amélioration")
  const implementation = await askGemini(`Tu es NOVA, agent d'amélioration du site Standard IA.

Voici le code actuel de app/page.tsx :
\`\`\`tsx
${pageContent.slice(0, 4000)}
\`\`\`

Voici le CSS global (app/globals.css) :
\`\`\`css
${globalsCss.slice(0, 1000)}
\`\`\`

Tu dois implémenter cette amélioration inspirée de ${improvement.inspired_by} :
**${improvement.title}**
${improvement.description}

IMPORTANT : Génère UNIQUEMENT le diff minimal nécessaire — les lignes exactes à modifier.
Réponds en JSON brut :
{
  "improvement": "${improvement.title}",
  "files": [
    {
      "path": "chemin/du/fichier.tsx",
      "old": "code exact à remplacer (quelques lignes)",
      "new": "nouveau code"
    }
  ],
  "description": "Ce qui a été changé en 1 phrase"
}

Règles :
- Modifications minimales et ciblées seulement
- Reste cohérent avec le design existant (dark theme, indigo #6366f1)
- Ne pas casser le TypeScript existant
- Si l'amélioration est trop complexe, retourne files: [] avec description expliquant pourquoi`)
  stop()

  const cleaned = implementation.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim()
  const impl = JSON.parse(cleaned)

  if (!impl.files || impl.files.length === 0) {
    console.log(`  ${c.yellow}⚠️  NOVA : amélioration non implémentable automatiquement${c.reset}`)
    console.log(`  ${c.dim}→ ${impl.description}${c.reset}`)
    sendMessage("NOVA", "ARGUS", "HEALTH_OK", { action: "improvement_skipped", title: improvement.title, reason: impl.description })
    process.exit(0)
  }

  // 5. Appliquer les modifications
  let applied = 0
  for (const file of impl.files) {
    const filePath = path.join(process.cwd(), file.path)
    if (!fs.existsSync(filePath)) {
      console.log(`  ${c.yellow}⚠️  Fichier introuvable : ${file.path}${c.reset}`)
      continue
    }
    const content = fs.readFileSync(filePath, "utf-8")
    if (!content.includes(file.old)) {
      console.log(`  ${c.yellow}⚠️  Code source introuvable dans ${file.path}${c.reset}`)
      continue
    }
    fs.writeFileSync(filePath, content.replace(file.old, file.new))
    console.log(`  ${c.green}✅${c.reset} Modifié : ${c.dim}${file.path}${c.reset}`)
    applied++
  }

  if (applied === 0) {
    console.log(`  ${c.yellow}⚠️  Aucune modification appliquée${c.reset}`)
    process.exit(0)
  }

  // 6. Marquer comme fait + commit
  done.push(improvement.title)
  fs.writeFileSync(doneFile, JSON.stringify(done, null, 2))

  try {
    execSync(`git add -A && git commit -m "✨ NOVA: ${improvement.title} (inspiré de ${improvement.inspired_by})"`, { stdio: "inherit" })
    console.log(`  ${c.green}✅${c.reset} Commit effectué`)
  } catch { /* commit might fail if nothing staged */ }

  // Notifier l'équipe
  logAgentMessage("NOVA", "DÉVA", "ARTICLE_PUBLISHED", { reason: `Site improved: ${improvement.title}` })
  sendMessage("NOVA", "ARGUS", "HEALTH_OK", { action: "improvement_applied", title: improvement.title })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✨  NOVA a amélioré le site en ${elapsed}s            ║${c.reset}`)
  console.log(`${c.green}${c.bold}║  → ${improvement.title.slice(0,44).padEnd(44)}  ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚══════════════════════════════════════════════════╝${c.reset}\n`)
}

main().catch(err => {
  sendMessage("NOVA", "ARGUS", "ERROR", { error: err.message })
  console.error(`❌ NOVA — Erreur :`, err.message)
  process.exit(1)
})
