import { notFound } from "next/navigation"
import Link from "next/link"
import { tools, getToolBySlug } from "@/content/tools"
import BeehiivEmbed from "@/components/BeehiivEmbed"

export async function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug)
  if (!tool) return {}
  return {
    title: `${tool.name} — Avis`,
    description: tool.tagline,
    openGraph: {
      title: `${tool.name} — Avis Standard IA`,
      description: tool.tagline,
      url: `https://standard-ia.pro/outils/${tool.slug}`,
    },
    twitter: { card: "summary_large_image", title: `${tool.name} — Avis Standard IA`, description: tool.tagline },
  }
}

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
    chunk.startsWith('**') && chunk.endsWith('**')
      ? <strong key={i}>{chunk.slice(2, -2)}</strong>
      : chunk
  )
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## '))  { elements.push(<h2 key={i}>{line.slice(3)}</h2>); i++; continue }
    if (line.startsWith('### ')) { elements.push(<h3 key={i}>{line.slice(4)}</h3>); i++; continue }
    if (line === '---') { elements.push(<hr key={i} />); i++; continue }
    if (line === '')   { i++; continue }

    if (line.startsWith('- ') || /^\d+\.\s/.test(line)) {
      const items: React.ReactNode[] = []
      const start = i
      while (i < lines.length && (lines[i].startsWith('- ') || /^\d+\.\s/.test(lines[i]))) {
        const text = lines[i].startsWith('- ') ? lines[i].slice(2) : lines[i].replace(/^\d+\.\s/, '')
        items.push(<li key={i}>{inline(text)}</li>)
        i++
      }
      elements.push(<ul key={`ul-${start}`}>{items}</ul>)
      continue
    }

    elements.push(<p key={i}>{inline(line)}</p>)
    i++
  }

  return elements
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
      <section className="py-14 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-display font-black text-white text-2xl mb-3">Reçois chaque édition dans ta boîte mail.</h3>
          <p className="text-[#555] text-sm mb-6">Gratuit · Sans spam · Résiliable en un clic</p>
          <div className="flex justify-center"><BeehiivEmbed /></div>
        </div>
      </section>
    </main>
  )
}
