/**
 * Agent 4 : Auto Publisher
 * Publie l'article du jour depuis content/queue/ → content/posts.ts
 * Génère aussi un tweet sur l'article
 * Usage: npx tsx scripts/publish-today.ts
 */

import * as fs from "fs"
import * as path from "path"

// ─── Terminal colors ───
const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", yellow: "\x1b[33m",
  red: "\x1b[31m", purple: "\x1b[35m",
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0]
}

async function main() {
  const startTime = Date.now()
  console.log(`\n${c.purple}${c.bold}╔══════════════════════════════╗${c.reset}`)
  console.log(`${c.purple}${c.bold}║  📰  Agent 4 : Auto Publisher  ║${c.reset}`)
  console.log(`${c.purple}${c.bold}╚══════════════════════════════╝${c.reset}\n`)

  const today = todayStr()
  const queueDir = path.join(process.cwd(), "content", "queue")
  const publishedDir = path.join(process.cwd(), "content", "published")
  const queueFile = path.join(queueDir, `${today}.json`)

  // Check if today's article exists
  if (!fs.existsSync(queueFile)) {
    console.log(`  ${c.yellow}⚠️  Pas d'article en file pour aujourd'hui (${today})${c.reset}`)
    console.log(`  ${c.dim}Lance Agent 1 pour générer du contenu : npm run generate${c.reset}\n`)
    process.exit(0)
  }

  // Read the article
  const article = JSON.parse(fs.readFileSync(queueFile, "utf-8"))
  console.log(`  ${c.cyan}📄${c.reset} Article trouvé : ${c.bold}"${article.title}"${c.reset}`)

  // Read current posts.ts
  const postsFile = path.join(process.cwd(), "content", "posts.ts")
  let postsContent = fs.readFileSync(postsFile, "utf-8")

  // Check if slug already exists
  if (postsContent.includes(`slug: '${article.slug}'`) || postsContent.includes(`slug: "${article.slug}"`)) {
    console.log(`  ${c.yellow}⚠️  Cet article est déjà publié (slug: ${article.slug})${c.reset}\n`)
    process.exit(0)
  }

  // Escape backticks in content
  const escapedContent = article.content.replace(/`/g, "\\`").replace(/\${/g, "\\${")

  // Build the new post entry
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

  // Insert after "export const posts: Post[] = ["
  postsContent = postsContent.replace(
    /export const posts: Post\[\] = \[/,
    `export const posts: Post[] = [\n${newPost}`
  )

  fs.writeFileSync(postsFile, postsContent)
  console.log(`  ${c.green}✅${c.reset} Article ajouté dans ${c.dim}content/posts.ts${c.reset}`)

  // Move to published
  if (!fs.existsSync(publishedDir)) fs.mkdirSync(publishedDir, { recursive: true })
  fs.renameSync(queueFile, path.join(publishedDir, `${today}.json`))
  console.log(`  ${c.green}✅${c.reset} Article archivé dans ${c.dim}content/published/${today}.json${c.reset}`)

  // Generate tweet about the article
  const tweetText = `📰 Nouvel article sur Standard IA :

"${article.title}"

${article.excerpt}

👉 standard-ia.pro/posts/${article.slug}`

  const socialDir = path.join(process.cwd(), "content", "social")
  if (!fs.existsSync(socialDir)) fs.mkdirSync(socialDir, { recursive: true })
  const tweetFile = path.join(socialDir, "tweet-today.txt")
  fs.writeFileSync(tweetFile, tweetText)
  console.log(`  ${c.green}✅${c.reset} Tweet généré → ${c.dim}content/social/tweet-today.txt${c.reset}`)

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  Article publié en ${elapsed}s                ║${c.reset}`)
  console.log(`${c.green}${c.bold}║  🌐  standard-ia.pro/posts/${article.slug.padEnd(14)}║${c.reset}`)
  console.log(`${c.green}${c.bold}╚══════════════════════════════════════════╝${c.reset}\n`)
}

main().catch(err => {
  console.error(`❌ Erreur :`, err.message)
  process.exit(1)
})
