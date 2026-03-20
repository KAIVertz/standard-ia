import { tools } from "@/content/tools"
import ToolCard from "@/components/ToolCard"
import AnimateIn from "@/components/AnimateIn"
import TiltCard from "@/components/TiltCard"

export const metadata = { title: "Outils IA — Standard IA" }

export default function OutilsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <AnimateIn>
            <p className="text-xs font-semibold text-[#444] uppercase tracking-[0.2em] mb-4">Outils</p>
            <h1 className="font-display font-black text-white text-4xl md:text-5xl tracking-tight mb-4">Outils IA testés</h1>
            <p className="text-[#555] text-lg max-w-xl">On les teste, on te donne notre avis honnête.</p>
          </AnimateIn>
        </div>
      </section>

      {/* Tools grid */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-5">
          {tools.map((t, i) => (
            <AnimateIn key={t.slug} delay={i * 100}>
              <TiltCard className="h-full">
                <ToolCard tool={t} />
              </TiltCard>
            </AnimateIn>
          ))}
        </div>

        {/* Coming soon */}
        <AnimateIn delay={400}>
          <div className="mt-12 text-center py-16 border border-dashed border-[#1f1f1f] rounded-2xl">
            <p className="text-[#333] text-sm">D&apos;autres outils arrivent bientôt.</p>
          </div>
        </AnimateIn>
      </div>
    </main>
  )
}
