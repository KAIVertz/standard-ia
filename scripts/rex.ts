/**
 * REX 🔄 — Agent Persistant
 *
 * S'acharne sur un problème jusqu'à ce que ce soit réglé et vérifié sur le vrai site.
 * Essaie → Déploie → Vérifie → Si raté → Réessaie différemment → ...
 *
 * Usage:
 *   npx tsx scripts/rex.ts "ajouter le logo dans la navbar"
 *   npx tsx scripts/rex.ts "le lien Articles est cassé"
 *   npx tsx scripts/rex.ts "la newsletter page affiche une erreur 404"
 */

import * as fs from "fs"
import * as path from "path"
import { execSync } from "child_process"
import { sendMessage, logAgentMessage } from "./agent-bus.js"

const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", yellow: "\x1b[33m",
  red: "\x1b[31m", purple: "\x1b[35m", blue: "\x1b[34m",
}

const MAX_ATTEMPTS = 5
const SITE_URL = "https://standard-ia.pro"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const VERCEL_TOKEN = process.env.VERCEL_TOKEN
if (!GEMINI_API_KEY) { console.error("❌ GEMINI_API_KEY manquante"); process.exit(1) }

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

function spinner(label: string): () => void {
  const frames = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"]
  let i = 0
  const iv = setInterval(() => { process.stdout.write(`\r  ${c.cyan}${frames[i++%frames.length]}${c.reset} ${label}...`) }, 80)
  return () => { clearInterval(iv); process.stdout.write("\r") }
}

async function askGemini(prompt: string): Promise<string> {
  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 5000 },
    }),
  })
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`)
  return (await res.json()).candidates?.[0]?.content?.parts?.[0]?.text ?? ""
}

// Vérifie le site live
async function verifySite(task: string, checkUrl = SITE_URL): Promise<{ ok: boolean; details: string }> {
  try {
    const res = await fetch(checkUrl, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; REX-Bot/1.0)" }
    })
    if (!res.ok) return { ok: false, details: `HTTP ${res.status}` }
    const html = await res.text()

    // Vérifications automatiques basées sur le contenu de la tâche
    const taskLower = task.toLowerCase()
    if (taskLower.includes("logo")) {
      const hasLogo = html.includes("logo.png") || html.includes("Logo") || html.includes("/logos/")
      return { ok: hasLogo, details: hasLogo ? "Logo trouvé dans le HTML" : "Logo absent du HTML" }
    }
    if (taskLower.includes("404") || taskLower.includes("not found")) {
      return { ok: res.ok, details: `Page répond HTTP ${res.status}` }
    }
    if (taskLower.includes("navbar") || taskLower.includes("nav")) {
      const hasNav = html.includes("<nav") || html.includes("sticky top-0")
      return { ok: hasNav, details: hasNav ? "Navbar présente" : "Navbar absente" }
    }
    // Vérification générique : le site répond et a du contenu
    return { ok: html.length > 1000, details: `Page OK (${html.length} chars)` }
  } catch (e: unknown) {
    return { ok: false, details: `Erreur réseau: ${e instanceof Error ? e.message : String(e)}` }
  }
}

// Lit les fichiers importants du projet
function readProjectContext(): string {
  const files = [
    "components/Nav.tsx",
    "app/page.tsx",
    "components/Logo.tsx",
  ]
  const context: string[] = []
  for (const f of files) {
    const full = path.join(process.cwd(), f)
    if (fs.existsSync(full)) {
      context.push(`### ${f}\n\`\`\`tsx\n${fs.readFileSync(full, "utf-8").slice(0, 1500)}\n\`\`\``)
    }
  }
  // List public files
  const publicFiles = fs.readdirSync(path.join(process.cwd(), "public"), { recursive: true })
    .map(f => `public/${f}`)
    .join("\n")
  context.push(`### Fichiers public/\n${publicFiles}`)
  return context.join("\n\n")
}

// Déploie le site
function deploy(): boolean {
  try {
    const tokenFlag = VERCEL_TOKEN ? `--token=${VERCEL_TOKEN}` : ""
    execSync(`npx vercel build --prod ${tokenFlag} 2>&1`, { stdio: "pipe" })
    execSync(`npx vercel deploy --prebuilt --prod ${tokenFlag} 2>&1`, { stdio: "pipe" })
    return true
  } catch {
    return false
  }
}

// Applique les modifications suggérées par Gemini
function applyFix(fix: { files: { path: string; old: string; new: string }[] }): number {
  let applied = 0
  for (const f of fix.files || []) {
    const filePath = path.join(process.cwd(), f.path)
    if (!fs.existsSync(filePath)) continue
    const content = fs.readFileSync(filePath, "utf-8")
    if (!content.includes(f.old)) continue
    fs.writeFileSync(filePath, content.replace(f.old, f.new))
    applied++
  }
  return applied
}

// ─── Main ───

async function main() {
  const task = process.argv.slice(2).join(" ")
  if (!task) {
    console.log(`\n  Usage: npx tsx scripts/rex.ts "description du problème"\n`)
    process.exit(0)
  }

  console.log(`\n${c.purple}${c.bold}╔══════════════════════════════════╗${c.reset}`)
  console.log(`${c.purple}${c.bold}║  🔄  REX — Agent Persistant       ║${c.reset}`)
  console.log(`${c.purple}${c.bold}╚══════════════════════════════════╝${c.reset}`)
  console.log(`\n  ${c.bold}Tâche :${c.reset} ${task}`)
  console.log(`  ${c.dim}Max tentatives : ${MAX_ATTEMPTS}${c.reset}\n`)

  const attempts: string[] = []
  let lastError = ""

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`${c.cyan}${c.bold}━━━ Tentative ${attempt}/${MAX_ATTEMPTS} ━━━━━━━━━━━━━━━━━━━━━${c.reset}`)

    // 1. Lire le contexte actuel
    const context = readProjectContext()

    // 2. Demander à Gemini une solution
    const stop1 = spinner("Gemini analyse le problème et prépare une solution")
    const previousAttempts = attempts.length > 0
      ? `\nTentatives précédentes qui ont ÉCHOUÉ :\n${attempts.map((a, i) => `${i+1}. ${a}`).join("\n")}\nErreur: ${lastError}\nEssaie une approche DIFFÉRENTE.`
      : ""

    const raw = await askGemini(`Tu es REX, agent de correction persistant pour Standard IA.

TÂCHE À RÉGLER : "${task}"
${previousAttempts}

CONTEXTE ACTUEL DU PROJET :
${context}

Génère un fix précis. Réponds UNIQUEMENT en JSON brut :
{
  "approach": "Description courte de cette approche",
  "files": [
    {
      "path": "chemin/relatif/fichier.tsx",
      "old": "code exact à remplacer (doit être présent dans le fichier)",
      "new": "nouveau code"
    }
  ]
}

Règles importantes :
- "old" doit être du code qui existe EXACTEMENT dans le fichier actuel
- Approche minimale et ciblée
- Si fichier manquant dans public/, crée-le via "path": "public/xxx" avec "old": "" et "new": "SKIP_BINARY"
- Ne pas casser le TypeScript
- Reste cohérent avec dark theme + indigo #6366f1`)
    stop1()

    const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim()
    let fix: { approach: string; files: { path: string; old: string; new: string }[] }
    try {
      fix = JSON.parse(cleaned)
    } catch {
      console.log(`  ${c.red}❌ Gemini a retourné du JSON invalide${c.reset}`)
      lastError = "JSON invalide"
      attempts.push("JSON invalide de Gemini")
      continue
    }

    console.log(`  ${c.cyan}💡${c.reset} Approche : ${fix.approach}`)

    // 3. Appliquer le fix
    const applied = applyFix(fix)
    if (applied === 0) {
      console.log(`  ${c.yellow}⚠️  Aucune modification applicable (code source introuvable)${c.reset}`)
      lastError = "Code source introuvable dans les fichiers"
      attempts.push(`${fix.approach} — code introuvable`)
      continue
    }
    console.log(`  ${c.green}✅${c.reset} ${applied} fichier(s) modifié(s)`)

    // 4. Commit
    try {
      execSync(`git add -A && git commit -m "🔄 REX tentative ${attempt}: ${fix.approach}"`, { stdio: "pipe" })
      execSync("git push origin main", { stdio: "pipe" })
    } catch { /* ignore commit errors */ }

    // 5. Déployer
    const stop2 = spinner(`Déploiement tentative ${attempt}`)
    const deployed = deploy()
    stop2()
    if (!deployed) {
      console.log(`  ${c.red}❌ Déploiement échoué${c.reset}`)
      lastError = "Build/déploiement Vercel échoué"
      attempts.push(`${fix.approach} — déploiement échoué`)
      continue
    }
    console.log(`  ${c.green}✅${c.reset} Déployé`)

    // 6. Attendre que le CDN se propage
    console.log(`  ${c.dim}⏳ Propagation CDN (15s)...${c.reset}`)
    await new Promise(r => setTimeout(r, 15000))

    // 7. Vérifier sur le vrai site
    const stop3 = spinner("Vérification sur standard-ia.pro")
    const result = await verifySite(task)
    stop3()

    if (result.ok) {
      logAgentMessage("REX", "ARGUS", "HEALTH_OK", { task, attempts: attempt, result: result.details })
      console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════════════════╗${c.reset}`)
      console.log(`${c.green}${c.bold}║  ✅  REX a réglé le problème en ${attempt} tentative(s) !   ║${c.reset}`)
      console.log(`${c.green}${c.bold}║  ✓   ${result.details.padEnd(50)}  ║${c.reset}`)
      console.log(`${c.green}${c.bold}╚══════════════════════════════════════════════════════╝${c.reset}\n`)
      return
    }

    console.log(`  ${c.red}✗ Vérification échouée : ${result.details}${c.reset}`)
    lastError = result.details
    attempts.push(`${fix.approach} — ${result.details}`)
    console.log()
  }

  // Toutes les tentatives épuisées
  sendMessage("REX", "ARGUS", "ERROR", { task, attempts: MAX_ATTEMPTS, lastError })
  console.log(`\n${c.red}${c.bold}╔══════════════════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.red}${c.bold}║  🚨  REX : ${MAX_ATTEMPTS} tentatives épuisées sans succès      ║${c.reset}`)
  console.log(`${c.red}${c.bold}║  Dernière erreur : ${lastError.slice(0,36).padEnd(36)}  ║${c.reset}`)
  console.log(`${c.red}${c.bold}╚══════════════════════════════════════════════════════╝${c.reset}\n`)
  process.exit(1)
}

main().catch(err => {
  sendMessage("REX", "ARGUS", "ERROR", { error: err.message })
  console.error(`❌ REX — Erreur critique :`, err.message)
  process.exit(1)
})
