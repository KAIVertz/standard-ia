/**
 * Agent 3 : Social Poster
 * Poste un tweet ou thread sur Twitter
 * Usage: npx tsx scripts/post-twitter.ts <fichier.md> [--thread]
 *
 * Exemples:
 *   npx tsx scripts/post-twitter.ts content/social/tweet-lundi.txt
 *   npx tsx scripts/post-twitter.ts content/social/thread-lundi.txt --thread
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

function getOAuthHeader(method: string, url: string, body?: string): string {
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

    // Wait between tweets to avoid rate limiting
    if (i < tweets.length - 1) {
      await new Promise(r => setTimeout(r, 2000))
    }
  }
}

// ─── Main ───

async function main() {
  console.log("🐦 Agent 3 : Social Poster")
  console.log("══════════════════════════\n")

  const args = process.argv.slice(2)
  const isThread = args.includes("--thread")
  const filePath = args.find(a => !a.startsWith("--"))

  if (!filePath) {
    // Si pas de fichier, poster un tweet simple depuis stdin ou argument
    console.log("Usage:")
    console.log("  npx tsx scripts/post-twitter.ts <fichier>")
    console.log("  npx tsx scripts/post-twitter.ts <fichier> --thread")
    console.log("")
    console.log("Le fichier doit contenir :")
    console.log("  - Un tweet par ligne (mode normal)")
    console.log("  - Tweets séparés par '---' (mode thread)")
    process.exit(0)
  }

  const fs = await import("fs")
  const content = fs.readFileSync(filePath, "utf-8").trim()

  if (isThread) {
    // Split by --- or "Tweet X/Y:" pattern
    const tweets = content
      .split(/(?:^---$|^Tweet \d+\/\d+:?\s*$)/m)
      .map(t => t.trim())
      .filter(Boolean)

    await postThread(tweets)
  } else {
    // Single tweet
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
