/**
 * Agent 1 : Content Writer
 * Génère 3 articles + posts sociaux + newsletter via Google Gemini API
 * Usage: npx tsx scripts/generate-content.ts
 */

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

// ─── Generate Articles ───

async function generateArticles(): Promise<string> {
  const prompt = `Tu es le rédacteur en chef de Standard IA, un média francophone sur l'intelligence artificielle.
Génère exactement 3 articles pour cette semaine.

IMPORTANT : Réponds UNIQUEMENT avec du code TypeScript valide, sans blocs markdown, sans \`\`\`, juste le code brut.

Le format doit être exactement celui-ci (un tableau d'objets) :

[
  {
    slug: "slug-de-l-article",
    title: "Titre de l'article",
    excerpt: "Résumé en 1-2 phrases",
    type: "article" as const,
    date: "${todayStr()}",
    readTime: 5,
    content: \`
## Sous-titre 1

Paragraphe...

## Sous-titre 2

- Point 1
- Point 2

## Conclusion

Paragraphe final.
    \`.trim(),
  },
]

Règles :
- Tout en français
- Sujets variés : 1 actu IA, 1 guide/tuto, 1 analyse/opinion
- Types possibles : "article", "post", "analyse"
- Le contenu doit être utile, concret, pas générique
- Minimum 400 mots par article
- readTime entre 4 et 8 minutes
- Les slugs doivent être en kebab-case
- N'inclus PAS de featured: true`

  return askGemini(prompt)
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
  console.log("🤖 Agent 1 : Content Writer")
  console.log("═══════════════════════════\n")

  const week = getWeekNumber()
  const fs = await import("fs")
  const path = await import("path")

  // 1. Generate articles
  console.log("📝 Génération des articles...")
  const articlesRaw = await generateArticles()
  const articlesFile = path.join(process.cwd(), "content", "social", `articles-week${week}.txt`)
  fs.writeFileSync(articlesFile, articlesRaw)
  console.log(`   ✅ Articles sauvegardés → ${articlesFile}`)

  // 2. Generate social posts
  console.log("📱 Génération des posts sociaux...")
  const socialRaw = await generateSocialPosts()
  const socialFile = path.join(process.cwd(), "content", "social", `social-week${week}.md`)
  fs.writeFileSync(socialFile, socialRaw)
  console.log(`   ✅ Posts sociaux sauvegardés → ${socialFile}`)

  // 3. Generate newsletter
  console.log("📬 Génération de la newsletter...")
  const newsletterRaw = await generateNewsletter()
  const newsletterFile = path.join(process.cwd(), "content", "social", `newsletter-week${week}.md`)
  fs.writeFileSync(newsletterFile, newsletterRaw)
  console.log(`   ✅ Newsletter sauvegardée → ${newsletterFile}`)

  console.log("\n═══════════════════════════")
  console.log("✅ Contenu de la semaine généré !")
  console.log(`   📂 Tout est dans content/social/`)
  console.log(`\n⚠️  PROCHAINE ÉTAPE :`)
  console.log(`   Vérifie le contenu dans content/social/articles-week${week}.txt`)
  console.log(`   Puis copie les articles dans content/posts.ts`)
  console.log(`   Puis lance : npx tsx scripts/deploy.ts`)
}

main().catch(err => {
  console.error("❌ Erreur :", err.message)
  process.exit(1)
})
