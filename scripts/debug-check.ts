/**
 * Agent 5 : Debug Monitor
 * Vérifie que tous les agents fonctionnent correctement
 * Usage: npx tsx scripts/debug-check.ts
 *
 * Checks:
 * 1. Gemini API → peut-on générer du contenu ?
 * 2. Twitter API → les credentials sont-ils valides ?
 * 3. Vercel → le site est-il en ligne ?
 * 4. Contenu → y a-t-il du contenu pour cette semaine ?
 */

const CHECKS = {
  gemini: { name: "Gemini API", status: "⏳", detail: "" },
  twitter: { name: "Twitter API", status: "⏳", detail: "" },
  vercel: { name: "Site en ligne", status: "⏳", detail: "" },
  content: { name: "Contenu semaine", status: "⏳", detail: "" },
}

type CheckKey = keyof typeof CHECKS

function pass(key: CheckKey, detail: string) {
  CHECKS[key].status = "✅"
  CHECKS[key].detail = detail
}

function fail(key: CheckKey, detail: string) {
  CHECKS[key].status = "❌"
  CHECKS[key].detail = detail
}

function warn(key: CheckKey, detail: string) {
  CHECKS[key].status = "⚠️"
  CHECKS[key].detail = detail
}

// ─── Check 1: Gemini API ───

async function checkGemini() {
  const key = process.env.GEMINI_API_KEY
  if (!key) { fail("gemini", "GEMINI_API_KEY manquante"); return }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Dis juste 'ok'" }] }],
          generationConfig: { maxOutputTokens: 10 },
        }),
      }
    )
    if (res.ok) {
      pass("gemini", "API fonctionnelle")
    } else {
      const err = await res.text()
      fail("gemini", `Erreur ${res.status}: ${err.slice(0, 100)}`)
    }
  } catch (e: any) {
    fail("gemini", `Connexion échouée: ${e.message}`)
  }
}

// ─── Check 2: Twitter API ───

async function checkTwitter() {
  const apiKey = process.env.TWITTER_API_KEY
  const apiSecret = process.env.TWITTER_API_SECRET
  const accessToken = process.env.TWITTER_ACCESS_TOKEN
  const accessSecret = process.env.TWITTER_ACCESS_SECRET

  if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
    fail("twitter", "Clés Twitter manquantes")
    return
  }

  try {
    // Verify credentials via GET /2/users/me
    const crypto = await import("crypto")

    function percentEncode(str: string): string {
      return encodeURIComponent(str).replace(/[!'()*]/g, c => "%" + c.charCodeAt(0).toString(16).toUpperCase())
    }

    const url = "https://api.twitter.com/2/users/me"
    const oauthParams: Record<string, string> = {
      oauth_consumer_key: apiKey,
      oauth_nonce: crypto.randomBytes(16).toString("hex"),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_token: accessToken,
      oauth_version: "1.0",
    }

    const sortedParams = Object.keys(oauthParams).sort().map(k => `${percentEncode(k)}=${percentEncode(oauthParams[k])}`).join("&")
    const baseString = `GET&${percentEncode(url)}&${percentEncode(sortedParams)}`
    const signingKey = `${percentEncode(apiSecret)}&${percentEncode(accessSecret)}`
    const signature = crypto.createHmac("sha1", signingKey).update(baseString).digest("base64")
    oauthParams.oauth_signature = signature

    const header = Object.keys(oauthParams).sort().map(k => `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`).join(", ")

    const res = await fetch(url, {
      headers: { Authorization: `OAuth ${header}` },
    })

    if (res.ok) {
      const data = await res.json()
      pass("twitter", `Connecté en tant que @${data.data?.username || "?"}`)
    } else {
      const err = await res.text()
      fail("twitter", `Erreur ${res.status}: ${err.slice(0, 100)}`)
    }
  } catch (e: any) {
    fail("twitter", `Connexion échouée: ${e.message}`)
  }
}

// ─── Check 3: Site en ligne ───

async function checkVercel() {
  try {
    const res = await fetch("https://standard-ia.pro", { method: "HEAD" })
    if (res.ok) {
      pass("vercel", `Site en ligne (status ${res.status})`)
    } else {
      fail("vercel", `Site répond avec status ${res.status}`)
    }
  } catch (e: any) {
    fail("vercel", `Site inaccessible: ${e.message}`)
  }
}

// ─── Check 4: Contenu de la semaine ───

async function checkContent() {
  const fs = await import("fs")
  const path = await import("path")

  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const days = Math.floor((now.getTime() - start.getTime()) / 86400000)
  const week = Math.ceil((days + start.getDay() + 1) / 7)

  const socialFile = path.join(process.cwd(), "content", "social", `social-week${week}.md`)
  const articlesFile = path.join(process.cwd(), "content", "social", `articles-week${week}.txt`)

  const hasSocial = fs.existsSync(socialFile)
  const hasArticles = fs.existsSync(articlesFile)

  if (hasSocial && hasArticles) {
    pass("content", `Semaine ${week} : articles ✓ social ✓`)
  } else if (hasSocial || hasArticles) {
    warn("content", `Semaine ${week} : articles ${hasArticles ? "✓" : "✗"} social ${hasSocial ? "✓" : "✗"}`)
  } else {
    fail("content", `Aucun contenu pour la semaine ${week}`)
  }
}

// ─── Main ───

async function main() {
  console.log("🔍 Agent 5 : Debug Monitor")
  console.log("══════════════════════════\n")

  // Run all checks in parallel
  await Promise.all([
    checkGemini(),
    checkTwitter(),
    checkVercel(),
    checkContent(),
  ])

  // Print report
  let hasErrors = false
  for (const [, check] of Object.entries(CHECKS)) {
    console.log(`  ${check.status} ${check.name} — ${check.detail}`)
    if (check.status === "❌") hasErrors = true
  }

  console.log("\n══════════════════════════")

  if (hasErrors) {
    console.log("❌ Des problèmes ont été détectés !")
    process.exit(1)
  } else {
    console.log("✅ Tous les systèmes sont opérationnels !")
  }
}

main().catch(err => {
  console.error("❌ Erreur Debug Monitor :", err.message)
  process.exit(1)
})
