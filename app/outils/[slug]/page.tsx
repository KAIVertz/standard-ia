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
      <article className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/outils" className="text-sm text-gray-400 hover:text-gray-700 transition-colors mb-8 inline-block">
          ← Tous les outils
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
            <img src={tool.logo} alt={tool.name} className="w-9 h-9 object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#111]">{tool.name}</h1>
            <span className="text-xs text-gray-400">{tool.category} · {tool.pricing}</span>
          </div>
          <div className="ml-auto flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-lg ${i < tool.rating ? 'text-[#16a34a]' : 'text-gray-200'}`}>★</span>
            ))}
          </div>
        </div>

        <p className="text-gray-600 text-lg leading-relaxed mb-4">{tool.tagline}</p>

        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8">
          <p className="text-sm font-semibold text-[#15803d]">Verdict Standard IA</p>
          <p className="text-sm text-[#166534] mt-1">{tool.verdict}</p>
        </div>

        <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer"
          className="inline-block w-full text-center bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors mb-10">
          {tool.affiliateLabel} →
        </a>

        <div className="prose" style={{ borderTop: "1px solid #e5e7eb", paddingTop: "2rem" }}>
          {renderContent(tool.content)}
        </div>

        <div className="mt-10 pt-8" style={{ borderTop: "1px solid #e5e7eb" }}>
          <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer"
            className="inline-block w-full text-center bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors">
            {tool.affiliateLabel} →
          </a>
        </div>
      </article>

      {/* Newsletter CTA */}
      <section className="py-12 px-6" style={{ background: "#f0fdf4", borderTop: "1px solid #dcfce7" }}>
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-black text-[#111] text-xl mb-2">Reçois chaque édition dans ta boîte mail.</h3>
          <p className="text-gray-500 text-sm mb-5">Gratuit · Sans spam · Résiliable en un clic</p>
          <div className="flex justify-center"><SubscribeForm variant="green" /></div>
        </div>
      </section>
    </main>
  )
}
