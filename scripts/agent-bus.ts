/**
 * Agent Bus — Système de messagerie interne de l'équipe Standard IA
 *
 * Les agents communiquent via des fichiers JSON dans content/messages/
 * Chaque agent a une inbox. Ils peuvent s'envoyer des messages et réagir.
 */

import * as fs from "fs"
import * as path from "path"

export type AgentName = "LÉON" | "ÉCHO" | "FLASH" | "DÉVA" | "ARGUS"

export type MessageType =
  | "REQUEST_CONTENT"   // ÉCHO → LÉON : "génère un article pour aujourd'hui"
  | "CONTENT_READY"     // LÉON → ÉCHO : "article prêt dans la queue"
  | "ARTICLE_PUBLISHED" // ÉCHO → FLASH + DÉVA : "article publié, déploie + tweete"
  | "DEPLOY_DONE"       // DÉVA → ARGUS : "déploiement terminé"
  | "TWEET_DONE"        // FLASH → ARGUS : "tweet posté"
  | "ERROR"             // N'importe qui → ARGUS : "j'ai un problème"
  | "HEALTH_OK"         // N'importe qui → ARGUS : "tout va bien"
  | "ALERT"             // ARGUS → tous : "problème détecté"

export interface AgentMessage {
  id: string
  from: AgentName
  to: AgentName
  type: MessageType
  payload?: Record<string, unknown>
  timestamp: string
  read: boolean
}

const MESSAGES_DIR = path.join(process.cwd(), "content", "messages")

function ensureDir() {
  if (!fs.existsSync(MESSAGES_DIR)) fs.mkdirSync(MESSAGES_DIR, { recursive: true })
}

function inboxFile(agent: AgentName): string {
  return path.join(MESSAGES_DIR, `inbox-${agent.toLowerCase().replace("é", "e").replace("â", "a")}.json`)
}

export function sendMessage(from: AgentName, to: AgentName, type: MessageType, payload?: Record<string, unknown>) {
  ensureDir()
  const file = inboxFile(to)
  const messages: AgentMessage[] = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, "utf-8"))
    : []

  const msg: AgentMessage = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    from,
    to,
    type,
    payload,
    timestamp: new Date().toISOString(),
    read: false,
  }

  messages.push(msg)
  fs.writeFileSync(file, JSON.stringify(messages, null, 2))
}

export function readMessages(agent: AgentName): AgentMessage[] {
  ensureDir()
  const file = inboxFile(agent)
  if (!fs.existsSync(file)) return []
  const messages: AgentMessage[] = JSON.parse(fs.readFileSync(file, "utf-8"))
  // Mark all as read
  const unread = messages.filter(m => !m.read)
  if (unread.length > 0) {
    messages.forEach(m => m.read = true)
    fs.writeFileSync(file, JSON.stringify(messages, null, 2))
  }
  return unread
}

export function clearInbox(agent: AgentName) {
  const file = inboxFile(agent)
  if (fs.existsSync(file)) fs.writeFileSync(file, "[]")
}

export function logAgentMessage(from: AgentName, to: AgentName, type: MessageType, payload?: Record<string, unknown>) {
  const c = { reset: "\x1b[0m", dim: "\x1b[2m", cyan: "\x1b[36m", yellow: "\x1b[33m" }
  console.log(`  ${c.cyan}📨 ${from} → ${to}${c.reset} ${c.dim}[${type}]${payload ? " " + JSON.stringify(payload) : ""}${c.reset}`)
  sendMessage(from, to, type, payload)
}
