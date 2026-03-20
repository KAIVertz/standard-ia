/**
 * MILO 📧 — Agent Newsletter (Beehiiv)
 *
 * Envoie la newsletter hebdomadaire via l'API Beehiiv
 * Prend le contenu généré par LÉON dans content/social/newsletter-weekXX.md
 *
 * Usage: npx tsx scripts/milo.ts
 *
 * Prérequis : BEEHIIV_API_KEY dans .env.local
 * Obtenir la clé : beehiiv.com → Settings → API
 */

import * as fs from "fs"
import * as path from "path"
import { logAgentMessage, sendMessage, readMessages } from "./agent-bus.js"

const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", yellow: "\x1b[33m",
  red: "\x1b[31m", purple: "\x1b[35m",
}

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID || "pub_3d4c4f95-8f8d-420c-898a-780c46581c24"

if (!BEEHIIV_API_KEY) {
  console.error(`\n  ${c.red}❌ BEEHIIV_API_KEY manquante${c.reset}`)
  console.log(`  ${c.yellow}Pour obtenir ta clé :${c.reset}`)
  console.log(`  ${c.dim}1. Va sur beehiiv.com${c.reset}`)
  console.log(`  ${c.dim}2. Settings → API${c.reset}`)
  console.log(`  ${c.dim}3. Ajoute BEEHIIV_API_KEY dans .env.local et GitHub Secrets${c.reset}\n`)
  process.exit(1)
}

function getWeekNumber(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  return Math.ceil((Math.floor((now.getTime() - start.getTime()) / 86400000) + start.getDay() + 1) / 7)
}

// Convertit le markdown en HTML basique pour Beehiiv
function markdownToHtml(md: string): string {
  return md
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hup])/gm, "<p>")
    .replace(/(?<![>])$/gm, "</p>")
    .replace(/<p><\/p>/g, "")
}

async function createDraftNewsletter(subject: string, htmlContent: string, previewText: string): Promise<string> {
  const res = await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${BEEHIIV_API_KEY}`,
    },
    body: JSON.stringify({
      subject,
      preview_text: previewText,
      content_html: htmlContent,
      status: "draft", // draft d'abord — tu confirmes avant d'envoyer
      audience: "free",
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Beehiiv API ${res.status}: ${err}`)
  }
  const data = await res.json()
  return data.data?.id || ""
}

async function main() {
  const startTime = Date.now()
  console.log(`\n${c.purple}${c.bold}╔══════════════════════════════════╗${c.reset}`)
  console.log(`${c.purple}${c.bold}║  📧  MILO — Agent Newsletter      ║${c.reset}`)
  console.log(`${c.purple}${c.bold}╚══════════════════════════════════╝${c.reset}\n`)

  // Check inbox
  const messages = readMessages("MILO")
  if (messages.length > 0) console.log(`  ${c.cyan}📨 ${messages.length} message(s) reçu(s)${c.reset}`)

  const week = getWeekNumber()
  const newsletterFile = path.join(process.cwd(), "content", "social", `newsletter-week${week}.md`)

  if (!fs.existsSync(newsletterFile)) {
    console.log(`  ${c.yellow}⚠️  Pas de newsletter pour la semaine ${week}${c.reset}`)
    console.log(`  ${c.dim}Lance : npm run generate:weekly${c.reset}\n`)
    process.exit(0)
  }

  const content = fs.readFileSync(newsletterFile, "utf-8")
  console.log(`  ${c.green}✅${c.reset} Newsletter semaine ${week} trouvée`)

  // Extraire le sujet (première ligne H1)
  const subjectMatch = content.match(/^# (.+)$/m)
  const subject = subjectMatch ? subjectMatch[1] : `Standard IA — Édition #${week}`

  // Preview text (première phrase non-titre)
  const previewMatch = content.match(/^(?!#)(.{20,100})/m)
  const previewText = previewMatch ? previewMatch[1].trim() : "L'IA de la semaine, décryptée pour vous."

  // Convertir en HTML
  const htmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
  ${markdownToHtml(content)}
  <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
  <p style="color: #666; font-size: 14px;">
    Tu reçois cet email car tu es abonné(e) à <strong>Standard IA</strong>.<br>
    <a href="{{unsubscribe_url}}" style="color: #6366f1;">Se désabonner</a>
  </p>
</div>`

  // Créer le brouillon Beehiiv
  console.log(`  ${c.cyan}⏳${c.reset} Création du brouillon sur Beehiiv...`)
  const draftId = await createDraftNewsletter(subject, htmlContent, previewText)
  console.log(`  ${c.green}✅${c.reset} Brouillon créé : ${c.dim}${draftId}${c.reset}`)
  console.log(`  ${c.yellow}📬 Va sur beehiiv.com pour relire et envoyer !${c.reset}`)

  logAgentMessage("MILO", "ARGUS", "HEALTH_OK", { action: "newsletter_draft_created", week, draftId, subject })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  MILO — Brouillon créé en ${elapsed}s          ║${c.reset}`)
  console.log(`${c.green}${c.bold}║  📧  Sujet : "${subject.slice(0,30)}..."       ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚══════════════════════════════════════════════╝${c.reset}\n`)
}

main().catch(err => {
  sendMessage("MILO", "ARGUS", "ERROR", { error: err.message })
  console.error(`❌ MILO — Erreur :`, err.message)
  process.exit(1)
})
