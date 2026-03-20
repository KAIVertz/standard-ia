/**
 * ARGUS 👁️ — Gardien de Standard IA
 *
 * Surveille l'équipe, lit les messages de tous les agents,
 * vérifie que le site tourne, rapporte les erreurs
 *
 * Usage: npx tsx scripts/debug-check.ts
 */

import * as fs from "fs"
import * as path from "path"
import { readMessages, sendMessage } from "./agent-bus.js"

const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", yellow: "\x1b[33m",
  red: "\x1b[31m", purple: "\x1b[35m", blue: "\x1b[34m",
}

function todayStr(): string { return new Date().toISOString().split("T")[0] }

function tomorrowStr(): string {
  const d = new Date(); d.setDate(d.getDate() + 1)
  return d.toISOString().split("T")[0]
}

async function checkSite(): Promise<boolean> {
  try {
    const res = await fetch("https://standard-ia.pro", { signal: AbortSignal.timeout(8000) })
    return res.ok
  } catch { return false }
}

async function main() {
  const startTime = Date.now()
  console.log(`\n${c.purple}${c.bold}╔══════════════════════════════════╗${c.reset}`)
  console.log(`${c.purple}${c.bold}║  👁️   ARGUS — Gardien de l'équipe ║${c.reset}`)
  console.log(`${c.purple}${c.bold}╚══════════════════════════════════╝${c.reset}\n`)

  let allGood = true
  const issues: string[] = []

  // 1. Lire les messages de tous les agents
  console.log(`${c.bold}📨 Messages de l'équipe :${c.reset}`)
  const msgs = readMessages("ARGUS")
  if (msgs.length === 0) {
    console.log(`  ${c.dim}Aucun message récent${c.reset}`)
  }
  for (const msg of msgs) {
    if (msg.type === "ERROR") {
      console.log(`  ${c.red}🚨 ${msg.from} → ERREUR : ${msg.payload?.error}${c.reset}`)
      issues.push(`${msg.from}: ${msg.payload?.error}`)
      allGood = false
    } else if (msg.type === "HEALTH_OK") {
      console.log(`  ${c.green}✅ ${msg.from}${c.reset} ${c.dim}→ ${msg.payload?.action}${c.reset}`)
    } else if (msg.type === "DEPLOY_DONE") {
      console.log(`  ${c.green}🚀 DÉVA${c.reset} ${c.dim}→ Déploiement réussi${c.reset}`)
    } else if (msg.type === "TWEET_DONE") {
      console.log(`  ${c.green}⚡ FLASH${c.reset} ${c.dim}→ Tweet posté (${msg.payload?.tweetId})${c.reset}`)
    } else if (msg.type === "ARTICLE_PUBLISHED") {
      console.log(`  ${c.green}📰 ÉCHO${c.reset} ${c.dim}→ Article publié : "${msg.payload?.slug}"${c.reset}`)
    } else if (msg.type === "CONTENT_READY") {
      console.log(`  ${c.green}✍️  LÉON${c.reset} ${c.dim}→ Article prêt : "${msg.payload?.title}"${c.reset}`)
    }
  }

  // 2. Vérifier la queue d'articles
  console.log(`\n${c.bold}📂 Queue d'articles :${c.reset}`)
  const queueDir = path.join(process.cwd(), "content", "queue")
  if (fs.existsSync(queueDir)) {
    const files = fs.readdirSync(queueDir).filter(f => f.endsWith(".json")).sort()
    if (files.length === 0) {
      console.log(`  ${c.yellow}⚠️  Queue vide — LÉON doit générer du contenu${c.reset}`)
      issues.push("Queue vide")
      allGood = false
    } else {
      console.log(`  ${c.green}✅${c.reset} ${files.length} article(s) programmé(s)`)
      const tomorrow = tomorrowStr()
      files.slice(0, 5).forEach(f => {
        const date = f.replace(".json", "")
        const article = JSON.parse(fs.readFileSync(path.join(queueDir, f), "utf-8"))
        const tag = date === tomorrow ? `${c.cyan} ← demain${c.reset}` : ""
        console.log(`  ${c.dim}  ${date}${c.reset} "${article.title.slice(0, 40)}..."${tag}`)
      })
    }
  } else {
    console.log(`  ${c.yellow}⚠️  Dossier queue introuvable${c.reset}`)
    allGood = false
  }

  // 3. Article du jour
  console.log(`\n${c.bold}📰 Article du jour (${todayStr()}) :${c.reset}`)
  const publishedDir = path.join(process.cwd(), "content", "published")
  const todayPublished = path.join(publishedDir, `${todayStr()}.json`)
  if (fs.existsSync(todayPublished)) {
    const article = JSON.parse(fs.readFileSync(todayPublished, "utf-8"))
    console.log(`  ${c.green}✅${c.reset} Publié : "${article.title}"`)
  } else {
    console.log(`  ${c.yellow}⚠️  Pas encore publié aujourd'hui${c.reset}`)
    issues.push("Article du jour non publié")
  }

  // 4. Ping le site
  console.log(`\n${c.bold}🌐 Statut du site :${c.reset}`)
  const siteOk = await checkSite()
  if (siteOk) {
    console.log(`  ${c.green}✅${c.reset} standard-ia.pro répond correctement`)
  } else {
    console.log(`  ${c.red}🚨 standard-ia.pro ne répond pas !${c.reset}`)
    issues.push("Site inaccessible")
    allGood = false
  }

  // 5. Équipe
  console.log(`\n${c.bold}👥 L'équipe Standard IA :${c.reset}`)
  console.log(`  ${c.green}✅${c.reset} LÉON  ✍️  — Lit les RSS, rédige les articles`)
  console.log(`  ${c.green}✅${c.reset} ÉCHO  📰 — Publie l'article du jour`)
  console.log(`  ${c.green}✅${c.reset} FLASH ⚡ — Poste sur Twitter`)
  console.log(`  ${c.green}✅${c.reset} DÉVA  🚀 — Build et déploie sur Vercel`)
  console.log(`  ${c.green}✅${c.reset} ARGUS 👁️  — Surveille tout (c'est moi)`)

  // 6. Rapport final
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log()
  if (allGood) {
    console.log(`${c.green}${c.bold}╔══════════════════════════════════════════════╗${c.reset}`)
    console.log(`${c.green}${c.bold}║  ✅  ARGUS : Tout va bien ! (${elapsed}s)          ║${c.reset}`)
    console.log(`${c.green}${c.bold}╚══════════════════════════════════════════════╝${c.reset}\n`)
  } else {
    console.log(`${c.red}${c.bold}╔══════════════════════════════════════════════╗${c.reset}`)
    console.log(`${c.red}${c.bold}║  🚨  ARGUS : ${issues.length} problème(s) détecté(s)      ║${c.reset}`)
    issues.forEach(i => console.log(`${c.red}${c.bold}║  ❌  ${i.slice(0, 42).padEnd(42)}  ║${c.reset}`))
    console.log(`${c.red}${c.bold}╚══════════════════════════════════════════════╝${c.reset}\n`)
  }
}

main().catch(err => {
  console.error(`❌ ARGUS — Erreur critique :`, err.message)
  process.exit(1)
})
