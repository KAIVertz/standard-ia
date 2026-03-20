/**
 * Agent 2 : Deploy Bot
 * Build le site + déploie sur Vercel
 * Usage: npx tsx scripts/deploy.ts
 */

import { execSync } from "child_process"

function run(cmd: string, label: string) {
  console.log(`  ⏳ ${label}...`)
  try {
    execSync(cmd, { stdio: "inherit", cwd: process.cwd() })
    console.log(`  ✅ ${label} — OK`)
  } catch {
    console.error(`  ❌ ${label} — ERREUR`)
    process.exit(1)
  }
}

async function main() {
  console.log("🚀 Agent 2 : Deploy Bot")
  console.log("═══════════════════════\n")

  // 1. Build
  run("npm run build", "Build Next.js")

  // 2. Deploy
  console.log("")
  run("vercel --prod --yes", "Déploiement Vercel")

  console.log("\n═══════════════════════")
  console.log("✅ Site déployé sur standard-ia.pro !")
}

main().catch(err => {
  console.error("❌ Erreur :", err.message)
  process.exit(1)
})
