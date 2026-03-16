import { tools } from "@/content/tools"
import ToolCard from "@/components/ToolCard"

export const metadata = { title: "Outils IA — Standard IA" }

export default function OutilsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#111] tracking-tight mb-2">Outils IA testés</h1>
        <p className="text-gray-500">Les meilleurs outils IA passés en revue, avec un avis honnête sur chacun.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
      </div>
    </main>
  )
}
