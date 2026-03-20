/**
 * FLASH ⚡ — Responsable Social de Standard IA
 *
 * Poste les articles et tweets sur Twitter/X
 * Vérifie son inbox pour les messages d'ÉCHO
 *
 * Usage:
 *   npx tsx scripts/post-twitter.ts <fichier>
 *   npx tsx scripts/post-twitter.ts <fichier> --thread
 *   npx tsx scripts/post-twitter.ts <fichier.md> --auto
 */

import { sendMessage, logAgentMessage, readMessages } from "./agent-bus.js"

const TWITTER_API_KEY = process.env.TWITTER_API_KEY
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN
const TWITTER_ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET

if (!TWITTER_API_KEY || !TWITTER_API_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_SECRET) {
  console.error("❌ Clés Twitter manquantes.")
  process.exit(1)
}

// ─── OAuth 1.0a signature ───

import * as crypto from "crypto"

function percentEncode(str: string): string {
  return encodeURIComponent(str).replace(/[!'()*]/g, c => "%" + c.charCodeAt(0).toString(16).toUpperCase())
}

function generateOAuthSignature(
  method: string, url: string, params: Record<string, string>, consumerSecret: string, tokenSecret: string
): string {
  const sortedParams = Object.keys(params).sort()
    .map(k => `${percentEncode(k)}=${percentEncode(params[k])}`)
    .join("&")
  const base = `${method}&${percentEncode(url)}&${percentEncode(sortedParams)}`
  const key = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`
  return crypto.createHmac("sha1", key).update(base).digest("base64")
}

function buildOAuthHeader(method: string, url: string, extraParams: Record<string, string> = {}): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: TWITTER_API_KEY!,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: TWITTER_ACCESS_TOKEN!,
    oauth_version: "1.0",
  }
  const allParams = { ...oauthParams, ...extraParams }
  oauthParams.oauth_signature = generateOAuthSignature(method, url, allParams, TWITTER_API_SECRET!, TWITTER_ACCESS_SECRET!)
  return "OAuth " + Object.entries(oauthParams)
    .map(([k, v]) => `${percentEncode(k)}="${percentEncode(v)}"`)
    .join(", ")
}

async function postTweet(text: string, replyToId?: string): Promise<string> {
  const url = "https://api.twitter.com/2/tweets"
  const body: Record<string, unknown> = { text }
  if (replyToId) body.reply = { in_reply_to_tweet_id: replyToId }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": buildOAuthHeader("POST", url),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Twitter ${res.status}: ${JSON.stringify(err)}`)
  }
  const data = await res.json()
  return data.data.id
}

async function postThread(tweets: string[]) {
  let previousId: string | undefined
  for (let i = 0; i < tweets.length; i++) {
    const tweet = tweets[i].trim()
    if (!tweet) continue
    process.stdout.write(`\r  ${c.cyan}⏳${c.reset} Tweet ${i + 1}/${tweets.length}...`)
    previousId = await postTweet(tweet, previousId)
    process.stdout.write(`\r  ${c.green}✅${c.reset} Tweet ${i + 1}/${tweets.length} posté ${c.dim}(${previousId})${c.reset}\n`)
    if (i < tweets.length - 1) await new Promise(r => setTimeout(r, 2000))
  }
}

function parseSocialFile(content: string): { thread: string[], tweets: string[] } {
  const sections = content.split(/^---$/m).map(s => s.trim()).filter(Boolean)
  let thread: string[] = []
  const tweets: string[] = []
  for (const section of sections) {
    if (section.includes("# Thread Twitter")) {
      const tweetMatches = section.split(/^Tweet \d+\/\d+:?\s*$/m).slice(1)
      thread = tweetMatches.map(t => t.trim()).filter(Boolean)
      thread = thread.map(t => t.length > 280 ? t.slice(0, 277) + "..." : t)
    } else if (section.includes("# Tweets individuels")) {
      const tweetMatches = section.split(/^Tweet \d+:?\s*$/m).slice(1)
      for (const t of tweetMatches) {
        const clean = t.trim()
        if (clean) tweets.push(clean.length > 280 ? clean.slice(0, 277) + "..." : clean)
      }
    }
  }
  return { thread, tweets }
}

function getAutoContent(content: string): { text: string[], isThread: boolean } {
  const { thread, tweets } = parseSocialFile(content)
  const day = new Date().getDay()
  if (day === 1 && thread.length > 0) {
    console.log(`  📅 Lundi → Thread (${thread.length} tweets)`)
    return { text: thread, isThread: true }
  }
  const tweetIndex = day >= 2 ? day - 2 : tweets.length - 1
  if (tweetIndex < tweets.length) {
    const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    console.log(`  📅 ${dayNames[day]} → Tweet ${tweetIndex + 1}`)
    return { text: [tweets[tweetIndex]], isThread: false }
  }
  return {
    text: ["L'IA évolue vite. Très vite.\n\nChaque semaine, on décrypte le meilleur de l'IA — en français, sans jargon.\n\nRejoins la newsletter gratuite 👇\nstandard-ia.pro"],
    isThread: false
  }
}

// ─── Terminal colors ───
const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", yellow: "\x1b[33m",
  red: "\x1b[31m", blue: "\x1b[34m",
}

// ─── Main ───

async function main() {
  const startTime = Date.now()
  console.log(`\n${c.blue}${c.bold}╔══════════════════════════════════╗${c.reset}`)
  console.log(`${c.blue}${c.bold}║  ⚡  FLASH — Responsable Social   ║${c.reset}`)
  console.log(`${c.blue}${c.bold}╚══════════════════════════════════╝${c.reset}\n`)

  // Check inbox — ÉCHO a-t-il envoyé un article à tweeter ?
  const messages = readMessages("FLASH")
  const articleMsg = messages.find(m => m.type === "ARTICLE_PUBLISHED")
  if (articleMsg) {
    console.log(`  ${c.cyan}📨 Message d'ÉCHO : "${articleMsg.payload?.title}"${c.reset}`)
  }

  const args = process.argv.slice(2)
  const isThread = args.includes("--thread")
  const isAuto = args.includes("--auto")
  const filePath = args.find(a => !a.startsWith("--"))

  if (!filePath) {
    console.log(`  ${c.yellow}Usage:${c.reset}`)
    console.log(`  ${c.dim}npx tsx scripts/post-twitter.ts <fichier>${c.reset}`)
    console.log(`  ${c.dim}npx tsx scripts/post-twitter.ts <fichier> --thread${c.reset}`)
    console.log(`  ${c.dim}npx tsx scripts/post-twitter.ts <fichier.md> --auto${c.reset}`)
    process.exit(0)
  }

  const { existsSync, readFileSync } = await import("fs")
  if (!existsSync(filePath)) {
    sendMessage("FLASH", "ARGUS", "ERROR", { error: `Fichier introuvable: ${filePath}` })
    console.error(`  ${c.red}❌ Fichier introuvable : ${filePath}${c.reset}`)
    process.exit(1)
  }

  const content = readFileSync(filePath, "utf-8").trim()
  let tweetedId: string | undefined

  if (isAuto) {
    const { text, isThread: shouldThread } = getAutoContent(content)
    if (shouldThread) {
      await postThread(text)
    } else {
      process.stdout.write(`  ${c.cyan}⏳${c.reset} Posting tweet...`)
      tweetedId = await postTweet(text[0])
      process.stdout.write(`\r  ${c.green}✅${c.reset} Tweet posté ${c.dim}(ID: ${tweetedId})${c.reset}\n`)
    }
  } else if (isThread) {
    const tweets = content.split(/(?:^---$|^Tweet \d+\/\d+:?\s*$)/m).map(t => t.trim()).filter(Boolean)
    await postThread(tweets)
  } else {
    process.stdout.write(`  ${c.cyan}⏳${c.reset} Posting tweet...`)
    tweetedId = await postTweet(content)
    process.stdout.write(`\r  ${c.green}✅${c.reset} Tweet posté ${c.dim}(ID: ${tweetedId})${c.reset}\n`)
  }

  // Notifier ARGUS
  logAgentMessage("FLASH", "ARGUS", "TWEET_DONE", { tweetId: tweetedId, file: filePath })

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔══════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  FLASH a tweeté en ${elapsed}s               ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚══════════════════════════════════════════╝${c.reset}\n`)
}

main().catch(err => {
  sendMessage("FLASH", "ARGUS", "ERROR", { error: err.message })
  console.error(`❌ FLASH — Erreur :`, err.message)
  process.exit(1)
})
