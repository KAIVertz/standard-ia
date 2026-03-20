import { editions } from "@/content/newsletter"
import BeehiivEmbed from "@/components/BeehiivEmbed"
import AnimateIn from "@/components/AnimateIn"
import TiltCard from "@/components/TiltCard"

export const metadata = { title: "Newsletter — Standard IA" }

export default function NewsletterPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h1 className="font-display font-black text-white text-5xl md:text-6xl leading-tight tracking-tight mb-6">
              Reste devant.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Pas derrière.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p className="text-[#555] text-lg mb-10 max-w-xl mx-auto">
              Une newsletter par semaine. L&apos;essentiel de l&apos;IA, les outils qui comptent, et un hack à appliquer tout de suite.
            </p>
          </AnimateIn>
          <AnimateIn delay={200}>
            <div className="flex justify-center mb-4">
              <BeehiivEmbed />
            </div>
            <p className="text-xs text-[#333]">Gratuit · Pas de spam · Désinscription en 1 clic</p>
          </AnimateIn>
        </div>
      </section>

      <div style={{ borderTop: "1px solid #1a1a1a" }} />

      {/* What you get */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="font-display font-bold text-white text-2xl text-center mb-12">Chaque édition contient</h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                ),
                title: "1 outil IA testé",
                desc: "Un outil passé en revue honnêtement — ce qu'il fait, ce qu'il vaut, si ça vaut le coup.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ),
                title: "L'actu IA clé",
                desc: "Les 3 nouvelles les plus importantes du monde de l'IA, résumées clairement.",
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                ),
                title: "1 conseil concret",
                desc: "Un prompt, une technique, un workflow à appliquer immédiatement.",
              },
            ].map((item, i) => (
              <AnimateIn key={i} delay={i * 100}>
                <TiltCard className="h-full">
                  <div className="h-full border border-[#1f1f1f] rounded-2xl p-7 bg-[#111] hover:border-[#2a2a2a] transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#222] flex items-center justify-center text-white mb-4">
                      {item.icon}
                    </div>
                    <h3 className="font-display font-bold text-white text-sm mb-2">{item.title}</h3>
                    <p className="text-sm text-[#555] leading-relaxed">{item.desc}</p>
                  </div>
                </TiltCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: "1px solid #1a1a1a" }} />

      {/* Archive */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="font-display font-bold text-white text-2xl mb-8">Éditions précédentes</h2>
          </AnimateIn>
          <div className="space-y-3">
            {editions.map((e, i) => (
              <AnimateIn key={e.slug} delay={i * 60}>
                <div className="flex items-center justify-between border border-[#1f1f1f] rounded-xl px-6 py-5 bg-[#111] hover:border-[#2a2a2a] transition-all duration-200">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono text-[#333]">#{e.number}</span>
                      <span className="font-display font-bold text-white text-sm">{e.title}</span>
                    </div>
                    <p className="text-xs text-[#444] mt-1">{e.excerpt}</p>
                  </div>
                  <span className="text-xs text-[#333] flex-shrink-0 ml-6">
                    {new Date(e.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 relative overflow-hidden border-t border-[#1a1a1a]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto text-center">
          <AnimateIn>
            <h2 className="font-display font-black text-white text-3xl mb-4">Prêt ?</h2>
            <div className="flex justify-center">
              <BeehiivEmbed />
            </div>
          </AnimateIn>
        </div>
      </section>
    </main>
  )
}
