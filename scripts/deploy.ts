/**
 * DÉVA 🚀 — Builder & Déployeur de Standard IA
 *
 * Build le site Next.js + déploie sur Vercel
 * Vérifie son inbox pour les messages d'ÉCHO
 *
 * Usage: npx tsx scripts/deploy.ts
 */

import { execSync } from "child_process"
import { sendMessage, logAgentMessage, readMessages } from "./agent-bus.js"

const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", red: "\x1b[31m", blue: "\x1b[34m",
}

function run(cmd: string, label: string) {
  console.log(`\n  ${c.cyan}▶${c.reset} ${c.bold}${label}${c.reset}`)
  const t = Date.now()
  try {
    execSync(cmd, { stdio: "inherit", cwd: process.cwd() })
    console.log(`  ${c.green}✅${c.reset} ${label} ${c.dim}(${((Date.now()-t)/1000).toFixed(1)}s)${c.reset}`)
  } catch {
    sendMessage("DÉVA", "ARGUS", "ERROR", { error: `Échec : ${label}`, command: cmd })
    console.error(`  ${c.red}❌ ${label} — ERREUR${c.reset}`)
    process.exit(1)
  }
}

async function main() {
  const startTime = Date.now()
  console.log(`\n${c.blue}${c.bold}╔══════════════════════════════════╗${c.reset}`)
  console.log(`${c.blue}${c.bold}║  🚀  DÉVA — Builder & Déployeur   ║${c.reset}`)
  console.log(`${c.blue}${c.bold}╚══════════════════════════════════╝${c.reset}`)

  // Check inbox — ÉCHO a-t-il demandé un déploiement ?
  const messages = readMessages("DÉVA")
  const deployMsg = messages.find(m => m.type === "ARTICLE_PUBLISHED")
  if (deployMsg) {
    console.log(`\n  ${c.cyan}📨 Message d'ÉCHO : article "${deployMsg.payload?.slug}" publié, déploiement demandé${c.reset}`)
  }

  run("npm run build", "Build Next.js")
  run("vercel --prod --yes", "Déploiement Vercel")

  // Notifier ARGUS
  logAgentMessage("DÉVA", "ARGUS", "DEPLOY_DONE", { url: "standard-ia.pro", timestamp: new Date().toISOString() })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  DÉVA a déployé standard-ia.pro en ${elapsed}s  ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚══════════════════════════════════════════════╝${c.reset}\n`)
}

main().catch(err => {
  sendMessage("DÉVA", "ARGUS", "ERROR", { error: err.message })
  console.error(`❌ DÉVA — Erreur :`, err.message)
  process.exit(1)
})
