import { notFound } from "next/navigation"
import Link from "next/link"
import { tools, getToolBySlug } from "@/content/tools"
import SubscribeForm from "@/components/SubscribeForm"

export async function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug)
  if (!tool) return {}
  return { title: `${tool.name} — Avis Standard IA`, description: tool.tagline }
}

function renderContent(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>
    if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>
    if (line.startsWith('- ')) return <li key={i}>{line.slice(2)}</li>
    if (line === '---') return <hr key={i} />
    if (line === '') return <br key={i} />
    return <p key={i}>{line}</p>
  })
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()

  return (
    <main>
      <article className="max-w-2xl mx-auto px-6 py-14">
        <Link href="/outils" className="text-sm text-[#444] hover:text-white transition-colors mb-10 inline-block">
          ← Tous les outils
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl border border-[#222] bg-[#111] flex items-center justify-center overflow-hidden">
            <img src={tool.logo} alt={tool.name} className="w-9 h-9 object-contain" />
          </div>
          <div>
            <h1 className="font-display font-black text-white text-2xl">{tool.name}</h1>
            <span className="text-xs text-[#444]">{tool.category} · {tool.pricing}</span>
          </div>
          <div className="ml-auto flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-lg ${i < tool.rating ? 'text-white' : 'text-[#222]'}`}>★</span>
            ))}
          </div>
        </div>

        <p className="text-[#888] text-lg leading-relaxed mb-6">{tool.tagline}</p>

        <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-5 mb-8">
          <p className="text-xs font-semibold text-[#555] uppercase tracking-widest mb-2">Verdict Standard IA</p>
          <p className="text-sm text-[#888] leading-relaxed">{tool.verdict}</p>
        </div>

        <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer"
          className="inline-block w-full text-center bg-white hover:bg-[#e5e5e5] text-black font-bold px-6 py-3.5 rounded-xl text-sm transition-colors mb-10">
          {tool.affiliateLabel} →
        </a>

        <div className="prose" style={{ borderTop: "1px solid #1a1a1a", paddingTop: "2rem" }}>
          {renderContent(tool.content)}
        </div>

        <div className="mt-10 pt-8" style={{ borderTop: "1px solid #1a1a1a" }}>
          <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer"
            className="inline-block w-full text-center bg-white hover:bg-[#e5e5e5] text-black font-bold px-6 py-3.5 rounded-xl text-sm transition-colors">
            {tool.affiliateLabel} →
          </a>
        </div>
      </article>

      {/* Newsletter CTA */}
      <section className="py-14 px-6" style={{ background: "#0f0f0f", borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-display font-black text-white text-2xl mb-3">Reçois chaque édition dans ta boîte mail.</h3>
          <p className="text-[#555] text-sm mb-6">Gratuit · Sans spam · Résiliable en un clic</p>
          <div className="flex justify-center"><SubscribeForm /></div>
        </div>
      </section>
    </main>
  )
}
