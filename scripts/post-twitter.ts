/**
 * Agent 3 : Social Poster
 * Poste un tweet ou thread sur Twitter — un contenu différent chaque jour
 *
 * Usage:
 *   npx tsx scripts/post-twitter.ts <fichier>              → tweet simple
 *   npx tsx scripts/post-twitter.ts <fichier> --thread      → thread
 *   npx tsx scripts/post-twitter.ts <fichier.md> --auto     → choisit auto selon le jour
 */

const TWITTER_API_KEY = process.env.TWITTER_API_KEY
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN
const TWITTER_ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET

if (!TWITTER_API_KEY || !TWITTER_API_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_SECRET) {
  console.error("❌ Clés Twitter manquantes. Ajoute TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET.")
  process.exit(1)
}

// ─── OAuth 1.0a signature ───

import * as crypto from "crypto"

function percentEncode(str: string): string {
  return encodeURIComponent(str).replace(/[!'()*]/g, c => "%" + c.charCodeAt(0).toString(16).toUpperCase())
}

function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string
): string {
  const sortedParams = Object.keys(params).sort().map(k => `${percentEncode(k)}=${percentEncode(params[k])}`).join("&")
  const baseString = `${method}&${percentEncode(url)}&${percentEncode(sortedParams)}`
  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`
  return crypto.createHmac("sha1", signingKey).update(baseString).digest("base64")
}

function getOAuthHeader(method: string, url: string): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: TWITTER_API_KEY!,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: TWITTER_ACCESS_TOKEN!,
    oauth_version: "1.0",
  }

  const signature = generateOAuthSignature(
    method, url, oauthParams,
    TWITTER_API_SECRET!, TWITTER_ACCESS_SECRET!
  )

  oauthParams.oauth_signature = signature

  const header = Object.keys(oauthParams)
    .sort()
    .map(k => `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`)
    .join(", ")

  return `OAuth ${header}`
}

// ─── Post a tweet ───

async function postTweet(text: string, replyToId?: string): Promise<string> {
  const url = "https://api.twitter.com/2/tweets"
  const body: Record<string, unknown> = { text }
  if (replyToId) {
    body.reply = { in_reply_to_tweet_id: replyToId }
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: getOAuthHeader("POST", url),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Twitter API error ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.data.id
}

// ─── Post a thread ───

async function postThread(tweets: string[]) {
  console.log(`  📎 Thread de ${tweets.length} tweets`)
  let previousId: string | undefined

  for (let i = 0; i < tweets.length; i++) {
    const tweet = tweets[i].trim()
    if (!tweet) continue

    console.log(`  ⏳ Tweet ${i + 1}/${tweets.length}...`)
    previousId = await postTweet(tweet, previousId)
    console.log(`  ✅ Tweet ${i + 1} posté (ID: ${previousId})`)

    if (i < tweets.length - 1) {
      await new Promise(r => setTimeout(r, 2000))
    }
  }
}

// ─── Parse social file into sections ───

function parseSocialFile(content: string): { thread: string[], tweets: string[] } {
  const sections = content.split(/^---$/m).map(s => s.trim()).filter(Boolean)

  let thread: string[] = []
  const tweets: string[] = []

  for (const section of sections) {
    if (section.includes("# Thread Twitter")) {
      // Extract thread tweets
      const tweetMatches = section.split(/^Tweet \d+\/\d+:?\s*$/m).slice(1)
      thread = tweetMatches.map(t => t.trim()).filter(Boolean)
      // Truncate tweets > 280 chars
      thread = thread.map(t => t.length > 280 ? t.slice(0, 277) + "..." : t)
    } else if (section.includes("# Tweets individuels")) {
      // Extract individual tweets
      const tweetMatches = section.split(/^Tweet \d+:?\s*$/m).slice(1)
      for (const t of tweetMatches) {
        const clean = t.trim()
        if (clean) tweets.push(clean.length > 280 ? clean.slice(0, 277) + "..." : clean)
      }
    }
    // LinkedIn posts are ignored for Twitter
  }

  return { thread, tweets }
}

// ─── Auto mode: pick content based on day of week ───

function getAutoContent(content: string): { text: string[], isThread: boolean } {
  const { thread, tweets } = parseSocialFile(content)
  const day = new Date().getDay() // 0=Sun, 1=Mon, ..., 6=Sat

  // Schedule:
  // Mon (1) → Thread
  // Tue (2) → Tweet 1
  // Wed (3) → Tweet 2
  // Thu (4) → Tweet 3
  // Fri (5) → Tweet 4
  // Sat (6) → Tweet 5
  // Sun (0) → Promo tweet

  if (day === 1 && thread.length > 0) {
    console.log(`  📅 Lundi → Thread (${thread.length} tweets)`)
    return { text: thread, isThread: true }
  }

  const tweetIndex = day >= 2 ? day - 2 : tweets.length - 1 // Sun → last tweet
  if (tweetIndex < tweets.length) {
    const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    console.log(`  📅 ${dayNames[day]} → Tweet ${tweetIndex + 1}`)
    return { text: [tweets[tweetIndex]], isThread: false }
  }

  // Fallback: promo tweet
  console.log(`  📅 Fallback → Tweet promo`)
  return {
    text: ["L'IA évolue vite. Très vite.\n\nChaque semaine, on décrypte le meilleur de l'IA — en français, sans jargon.\n\nRejoins la newsletter gratuite 👇\nstandard-ia.pro"],
    isThread: false
  }
}

// ─── Main ───

async function main() {
  console.log("🐦 Agent 3 : Social Poster")
  console.log("══════════════════════════\n")

  const args = process.argv.slice(2)
  const isThread = args.includes("--thread")
  const isAuto = args.includes("--auto")
  const filePath = args.find(a => !a.startsWith("--"))

  if (!filePath) {
    console.log("Usage:")
    console.log("  npx tsx scripts/post-twitter.ts <fichier>")
    console.log("  npx tsx scripts/post-twitter.ts <fichier> --thread")
    console.log("  npx tsx scripts/post-twitter.ts <fichier.md> --auto")
    process.exit(0)
  }

  const fs = await import("fs")

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Fichier introuvable : ${filePath}`)
    process.exit(1)
  }

  const content = fs.readFileSync(filePath, "utf-8").trim()

  if (isAuto) {
    // Auto mode: pick content based on day of week
    const { text, isThread: shouldThread } = getAutoContent(content)
    if (shouldThread) {
      await postThread(text)
    } else {
      console.log(`  ⏳ Posting tweet...`)
      const id = await postTweet(text[0])
      console.log(`  ✅ Tweet posté (ID: ${id})`)
    }
  } else if (isThread) {
    const tweets = content
      .split(/(?:^---$|^Tweet \d+\/\d+:?\s*$)/m)
      .map(t => t.trim())
      .filter(Boolean)
    await postThread(tweets)
  } else {
    console.log(`  ⏳ Posting tweet...`)
    const id = await postTweet(content)
    console.log(`  ✅ Tweet posté (ID: ${id})`)
  }

  console.log("\n══════════════════════════")
  console.log("✅ Posté sur Twitter !")
}

main().catch(err => {
  console.error("❌ Erreur :", err.message)
  process.exit(1)
})
