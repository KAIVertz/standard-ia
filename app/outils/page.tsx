import { tools } from "@/content/tools"
import ToolCard from "@/components/ToolCard"
import AnimateIn from "@/components/AnimateIn"

export const metadata = { title: "Outils IA — Standard IA" }

export default function OutilsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <AnimateIn>
        <div className="mb-12" style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: "2.5rem" }}>
          <h1 className="font-display font-black text-white text-4xl tracking-tight mb-3">Outils IA testés</h1>
          <p className="text-[#555]">Les meilleurs outils IA passés en revue, avec un avis honnête sur chacun.</p>
        </div>
      </AnimateIn>
      <div className="grid md:grid-cols-3 gap-4">
        {tools.map((t, i) => (
          <AnimateIn key={t.slug} delay={i * 80}>
            <ToolCard tool={t} />
          </AnimateIn>
        ))}
      </div>
    </main>
  )
}
