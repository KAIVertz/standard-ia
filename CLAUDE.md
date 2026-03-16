# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Standard IA** — AI automation agency for French SMBs. Domain: standard-ia.pro.
Positioning: packaged AI automation solutions (chatbots, workflows) deployed in under 14 days.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Dev server → http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint check
```

Deploy: push to GitHub → auto-deploys on Vercel (or `vercel --prod`).

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — utility-first styling, config in `tailwind.config.ts`
- **Framer Motion** — scroll animations on all sections
- **Geist** fonts (via `next/font/google`)

## Architecture

Single-page marketing site. All sections are independent client components in `components/`, assembled in `app/page.tsx`.

**Section flow:** Nav → Hero → Problem → Solution → Services → Process → CtaBanner → Footer

**Design tokens** (defined in `tailwind.config.ts`):
- `accent` = `#6366f1` (indigo-500)
- `accent-light` = `#818cf8`
- `accent-dark` = `#4f46e5`

**Global CSS utilities** (`app/globals.css`):
- `.gradient-text` — indigo-to-purple gradient text
- `.grid-bg` — subtle dot-grid background (used in Hero)
- `.glow` — indigo box-shadow (used on highlighted service card)

## Content

All copy is in French. Main CTA email: `hello@standard-ia.pro`.
Pricing: Starter €997 / Flux €2,497 + €297/mo / Pro custom.
