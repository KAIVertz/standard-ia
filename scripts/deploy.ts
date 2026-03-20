/**
 * Agent 2 : Deploy Bot
 * Build le site + déploie sur Vercel
 * Usage: npx tsx scripts/deploy.ts
 */

import { execSync } from "child_process"

const c = {
  reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
  cyan: "\x1b[36m", green: "\x1b[32m", red: "\x1b[31m", blue: "\x1b[34m",
}

function run(cmd: string, label: string) {
  console.log(`\n  ${c.cyan}▶${c.reset} ${c.bold}${label}${c.reset}`)
  const t = Date.now()
  try {
    execSync(cmd, { stdio: "inherit", cwd: process.cwd() })
    console.log(`  ${c.green}✅${c.reset} ${label} ${c.dim}(${((Date.now()-t)/1000).toFixed(1)}s)${c.reset}`)
  } catch {
    console.error(`  ${c.red}❌ ${label} — ERREUR${c.reset}`)
    process.exit(1)
  }
}

async function main() {
  const startTime = Date.now()
  console.log(`\n${c.blue}${c.bold}╔══════════════════════════╗${c.reset}`)
  console.log(`${c.blue}${c.bold}║  🚀  Agent 2 : Deploy Bot  ║${c.reset}`)
  console.log(`${c.blue}${c.bold}╚══════════════════════════╝${c.reset}`)

  run("npm run build", "Build Next.js")
  run("vercel --prod --yes", "Déploiement Vercel")

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`\n${c.green}${c.bold}╔════════════════════════════════════════╗${c.reset}`)
  console.log(`${c.green}${c.bold}║  ✅  standard-ia.pro déployé en ${elapsed}s  ║${c.reset}`)
  console.log(`${c.green}${c.bold}╚════════════════════════════════════════╝${c.reset}\n`)
}

main().catch(err => {
  console.error("❌ Erreur :", err.message)
  process.exit(1)
})
