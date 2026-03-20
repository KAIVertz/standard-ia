/**
 * ÉCHO 📰 — Éditeur de Standard IA
 *
 * Publie l'article du jour depuis content/queue/ → content/posts.ts
 * Si pas d'article → demande à LÉON d'en générer un en urgence
 * Notifie FLASH et DÉVA une fois publié
 *
 * Usage: npx tsx scripts/publish-today.ts
 */

import * as fs from "fs"
import * as path from "path"
import { sendMessage, logAgentMessage, readMessages } from "./agent-bus.js"
import { execSync } from "child_process"

const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", yellow: "\x1b[33m",
  red: "\x1b[31m", purple: "\x1b[35m",
}

function todayStr(): string { return new Date().toISOString().split("T")[0] }

async function main() {
  const startTime = Date.now()
  console.log(`\n${c.purple}${c.bold}╔══════════════════════════════════╗${c.reset}`)
  console.log(`${c.purple}${c.bold}║  📰  ÉCHO — Éditeur               ║${c.reset}`)
  console.log(`${c.purple}${c.bold}╚══════════════════════════════════╝${c.reset}\n`)

  const today = todayStr()
  const queueDir = path.join(process.cwd(), "content", "queue")
  const publishedDir = path.join(process.cwd(), "content", "published")
  const queueFile = path.join(queueDir, `${today}.json`)

  // Check inbox — LÉON a-t-il signalé que le contenu est prêt ?
  const messages = readMessages("ÉCHO")
  const contentReady = messages.find(m => m.type === "CONTENT_READY")
  if (contentReady) {
    console.log(`  ${c.cyan}📨 Message de LÉON : "${contentReady.payload?.title}"${c.reset}`)
  }

  // Si pas d'article pour aujourd'hui → demander à LÉON en urgence
  if (!fs.existsSync(queueFile)) {
    console.log(`  ${c.yellow}⚠️  Pas d'article en queue pour ${today}${c.reset}`)
    console.log(`  ${c.cyan}📨 ÉCHO → LÉON : demande de contenu urgent...${c.reset}`)
    logAgentMessage("ÉCHO", "LÉON", "REQUEST_CONTENT", { date: today, urgent: true })

    // Lancer LÉON immédiatement en mode urgence
    console.log(`  ${c.yellow}⚡ Lancement de LÉON en urgence...${c.reset}`)
    try {
      execSync("npx tsx scripts/generate-content.ts --daily", {
        stdio: "inherit",
        env: { ...process.env },
      })
    } catch {
      sendMessage("ÉCHO", "ARGUS", "ERROR", { error: "LÉON a échoué en urgence", date: today })
      console.error(`  ${c.red}❌ LÉON n'a pas pu générer le contenu${c.reset}`)
      process.exit(1)
    }

    // Réessayer après que LÉON ait généré
    if (!fs.existsSync(queueFile)) {
      sendMessage("ÉCHO", "ARGUS", "ERROR", { error: "Aucun article après génération urgente", date: today })
      console.error(`  ${c.red}❌ Toujours pas d'article après génération urgente${c.reset}`)
      process.exit(1)
    }
  }

  // Lire l'article
  const article = JSON.parse(fs.readFileSync(queueFile, "utf-8"))
  console.log(`  ${c.cyan}📄${c.reset} Article : ${c.bold}"${article.title}"${c.reset}`)

  // Vérifier si déjà publié
  const postsFile = path.join(process.cwd(), "content", "posts.ts")
  let postsContent = fs.readFileSync(postsFile, "utf-8")
  if (postsContent.includes(`slug: '${article.slug}'`) || postsContent.includes(`slug: "${article.slug}"`)) {
    console.log(`  ${c.yellow}⚠️  Déjà publié (slug: ${article.slug})${c.reset}`)
    sendMessage("ÉCHO", "ARGUS", "HEALTH_OK", { action: "already_published", slug: article.slug })
    process.exit(0)
  }

  // Insérer dans posts.ts
  const newPost = `  {
    slug: '${article.slug}',
    title: '${article.title.replace(/'/g, "\\'")}',
    excerpt: '${article.excerpt.replace(/'/g, "\\'")}',
    type: '${article.type}',
    date: '${article.date}',
    readTime: ${article.readTime},
    content: \`
${article.content}
    \`.trim(),
  },`

  postsContent = postsContent.replace(
    /export const posts: Post\[\] = \[/,
    `export const posts: Post[] = [\n${newPost}`
  )
  fs.writeFileSync(postsFile, postsContent)
  console.log(`  ${c.green}✅${c.reset} Ajouté dans ${c.dim}content/posts.ts${c.reset}`)

  // Archiver
  if (!fs.existsSync(publishedDir)) fs.mkdirSync(publishedDir, { recursive: true })
  fs.renameSync(queueFile, path.join(publishedDir, `${today}.json`))
  console.log(`  ${c.green}✅${c.reset} Archivé dans ${c.dim}content/published/${today}.json${c.reset}`)

  // Générer le tweet pour FLASH
  const tweetText = `📰 Nouvel article sur Standard IA :\n\n"${article.title}"\n\n${article.excerpt}\n\n👉 standard-ia.pro/posts/${article.slug}`
  const socialDir = path.join(process.cwd(), "content", "social")
  if (!fs.existsSync(socialDir)) fs.mkdirSync(socialDir, { recursive: true })
  fs.writeFileSync(path.join(socialDir, "tweet-today.txt"), tweetText)

  // Notifier FLASH et DÉVA
  logAgentMessage("ÉCHO", "FLASH", "ARTICLE_PUBLISHED", { slug: article.slug, title: article.title, tweetFile: "content/social/tweet-today.txt" })
  logAgentMessage("ÉCHO", "DÉVA", "ARTICLE_PUBLISHED", { slug: article.slug })
  sendMessage("ÉCHO", "ARGUS", "HEALTH_OK", { action: "published", slug: article.slug, date: today })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  ÉCHO a publié l'article en ${elapsed}s              ║${c.reset}`)
  console.log(`${c.green}${c.bold}║  🌐  standard-ia.pro/posts/${article.slug.slice(0,20).padEnd(20)}  ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚══════════════════════════════════════════════════╝${c.reset}\n`)
}

main().catch(err => {
  sendMessage("ÉCHO", "ARGUS", "ERROR", { error: err.message })
  console.error(`❌ ÉCHO — Erreur :`, err.message)
  process.exit(1)
})
