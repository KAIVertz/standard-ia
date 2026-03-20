/**
 * Agent 1 : Content Writer
 * Génère 3 articles + posts sociaux + newsletter via Google Gemini API
 * Usage: npx tsx scripts/generate-content.ts
 */

// ─── Terminal colors ───
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  purple: "\x1b[35m",
  blue: "\x1b[34m",
  white: "\x1b[37m",
}

function spinner(label: string): () => void {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
  let i = 0
  const interval = setInterval(() => {
    process.stdout.write(`\r  ${c.cyan}${frames[i % frames.length]}${c.reset} ${label}...`)
    i++
  }, 80)
  return () => {
    clearInterval(interval)
    process.stdout.write("\r")
  }
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY manquante. Ajoute-la dans .env.local ou en variable d'environnement.")
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

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API error ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
}

function getWeekNumber(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const days = Math.floor((now.getTime() - start.getTime()) / 86400000)
  return Math.ceil((days + start.getDay() + 1) / 7)
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0]
}

function nextDays(n: number): string[] {
  const dates: string[] = []
  for (let i = 0; i < n; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    dates.push(d.toISOString().split("T")[0])
  }
  return dates
}

// ─── Generate Articles ───

async function generateArticles(): Promise<{ slug: string; title: string; excerpt: string; type: string; date: string; readTime: number; content: string }[]> {
  const dates = nextDays(7)
  const prompt = `Tu es le rédacteur en chef de Standard IA, un média francophone sur l'intelligence artificielle.
Génère exactement 7 articles — un par jour pour les 7 prochains jours.

IMPORTANT : Réponds UNIQUEMENT avec du JSON valide, sans blocs markdown, sans \`\`\`, juste le JSON brut.

Le format doit être exactement un tableau JSON :

[
  {
    "slug": "slug-de-l-article",
    "title": "Titre de l'article",
    "excerpt": "Résumé en 1-2 phrases.",
    "type": "article",
    "date": "${dates[0]}",
    "readTime": 5,
    "content": "## Sous-titre 1\\n\\nParagraphe...\\n\\n## Sous-titre 2\\n\\n- Point 1\\n- Point 2\\n\\n## Conclusion\\n\\nParagraphe final."
  }
]

Les 7 dates à utiliser (une par article dans l'ordre) :
${dates.map((d, i) => `Article ${i + 1} → date: "${d}"`).join("\n")}

Règles :
- Tout en français
- Sujets variés sur 7 jours : actu IA, guide/tuto, analyse, outil, opinion, cas pratique, interview fictive
- Types possibles : "article", "post", "analyse"
- Le contenu doit être utile, concret, pas générique
- Minimum 400 mots par article (dans le champ content)
- Dans content, utilise \\n pour les sauts de ligne
- readTime entre 4 et 8 minutes
- Les slugs en kebab-case, uniques
- Pas de featured`

  const raw = await askGemini(prompt)
  // Clean potential markdown wrapping
  const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim()
  return JSON.parse(cleaned)
}

// ─── Generate Social Posts ───

async function generateSocialPosts(): Promise<string> {
  const prompt = `Tu es le community manager de Standard IA, un média IA francophone.
Génère le contenu social de la semaine :

1. UN thread Twitter (8 tweets) sur un sujet IA tendance
2. 5 tweets individuels (tips, stats, questions engageantes)
3. 3 posts LinkedIn (format texte long, 1300+ caractères)

Format de sortie : Markdown structuré avec des sections claires.

# Thread Twitter — [SUJET]

Tweet 1/8:
[contenu]

Tweet 2/8:
[contenu]

...

# Tweets individuels

Tweet 1:
[contenu]

...

# Posts LinkedIn

Post 1:
[contenu]

...

Règles :
- Tout en français
- Chaque tweet < 280 caractères
- Les threads commencent par un hook fort
- Les posts LinkedIn finissent par une question
- Toujours mentionner standard-ia.pro ou la newsletter quand c'est pertinent
- Sujets actuels et concrets sur l'IA`

  return askGemini(prompt)
}

// ─── Generate Newsletter ───

async function generateNewsletter(): Promise<string> {
  const week = getWeekNumber()
  const prompt = `Tu es le rédacteur de la newsletter Standard IA (newsletter IA francophone hebdomadaire).
Génère l'édition #${week} de la newsletter.

Format de sortie : Markdown structuré.

# Newsletter Standard IA — Édition #${week}

## L'actu IA de la semaine

### [Actu 1 - titre]
[2-3 phrases résumant l'actu + pourquoi c'est important]

### [Actu 2 - titre]
[2-3 phrases]

### [Actu 3 - titre]
[2-3 phrases]

## L'outil de la semaine : [Nom]
[Description courte, ce qu'il fait, pourquoi c'est utile, lien]

## Le hack de la semaine
[1 conseil concret, prompt, technique ou workflow à appliquer immédiatement]

## Le mot de la fin
[1-2 phrases de conclusion + CTA partager la newsletter]

Règles :
- Tout en français
- Actus réalistes et pertinentes sur l'IA en ${todayStr().slice(0, 7)}
- Ton direct, accessible, pas corporate
- Longueur totale : 800-1200 mots`

  return askGemini(prompt)
}

// ─── Main ───

async function main() {
  const startTime = Date.now()
  console.log(`\n${c.purple}${c.bold}╔══════════════════════════════╗${c.reset}`)
  console.log(`${c.purple}${c.bold}║  🤖  Agent 1 : Content Writer  ║${c.reset}`)
  console.log(`${c.purple}${c.bold}╚══════════════════════════════╝${c.reset}\n`)

  const week = getWeekNumber()
  const fs = await import("fs")
  const path = await import("path")

  // 1. Generate articles (7, one per day)
  const stop1 = spinner("Gemini génère 7 articles (un par jour)")
  const articles = await generateArticles()
  stop1()
  const queueDir = path.join(process.cwd(), "content", "queue")
  if (!fs.existsSync(queueDir)) fs.mkdirSync(queueDir, { recursive: true })
  for (const article of articles) {
    const file = path.join(queueDir, `${article.date}.json`)
    fs.writeFileSync(file, JSON.stringify(article, null, 2))
  }
  console.log(`  ${c.green}✅${c.reset} ${c.bold}7 articles en file d'attente${c.reset} ${c.dim}→ content/queue/${c.reset}`)

  // 2. Generate social posts
  const stop2 = spinner("Gemini génère les posts sociaux")
  const socialRaw = await generateSocialPosts()
  stop2()
  const socialFile = path.join(process.cwd(), "content", "social", `social-week${week}.md`)
  fs.writeFileSync(socialFile, socialRaw)
  console.log(`  ${c.green}✅${c.reset} ${c.bold}Posts sociaux générés${c.reset} ${c.dim}→ social-week${week}.md${c.reset}`)

  // 3. Generate newsletter
  const stop3 = spinner("Gemini génère la newsletter")
  const newsletterRaw = await generateNewsletter()
  stop3()
  const newsletterFile = path.join(process.cwd(), "content", "social", `newsletter-week${week}.md`)
  fs.writeFileSync(newsletterFile, newsletterRaw)
  console.log(`  ${c.green}✅${c.reset} ${c.bold}Newsletter générée${c.reset} ${c.dim}→ newsletter-week${week}.md${c.reset}`)

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔════════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  Contenu semaine ${week} généré en ${elapsed}s         ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚════════════════════════════════════════════╝${c.reset}`)
  console.log(`\n  ${c.yellow}⚡ Publication automatique :${c.reset}`)
  console.log(`  ${c.dim}→ 1 article publié chaque jour via Agent 4${c.reset}`)
  console.log(`  ${c.dim}→ 1 tweet posté chaque jour via Agent 3${c.reset}`)
  console.log()
}

main().catch(err => {
  console.error("❌ Erreur :", err.message)
  process.exit(1)
})
