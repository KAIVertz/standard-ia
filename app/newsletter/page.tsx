import { editions } from "@/content/newsletter"
import SubscribeForm from "@/components/SubscribeForm"
import AnimateIn from "@/components/AnimateIn"

export const metadata = { title: "Newsletter — Standard IA" }

export default function NewsletterPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-24 pb-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <AnimateIn>
            <h1 className="font-display font-black text-white text-5xl md:text-6xl leading-tight tracking-tight mb-6">
              L&apos;IA expliquée simplement.<br />Chaque semaine.
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-[#555] text-lg mb-10">
              Outils, actualités, conseils pratiques — tout ce qu&apos;il faut savoir sur l&apos;IA, en français, sans jargon.
            </p>
          </AnimateIn>
          <AnimateIn delay={220}>
            <div className="flex justify-center mb-4">
              <SubscribeForm />
            </div>
            <p className="text-xs text-[#333]">Gratuit · Sans spam · Résiliable en un clic</p>
          </AnimateIn>
        </div>
      </section>

      <div style={{ borderTop: "1px solid #1a1a1a" }} />

      {/* What you get */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="font-display font-bold text-white text-xl mb-8">Ce que tu reçois chaque semaine</h2>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "1 outil IA testé", body: "Un outil passé en revue honnêtement — ce qu'il fait, ce qu'il vaut, si ça vaut le coup." },
              { title: "L'actu IA de la semaine", body: "Les 3 nouvelles les plus importantes du monde de l'IA, résumées en 5 minutes." },
              { title: "1 conseil actionnable", body: "Une chose concrète à appliquer immédiatement dans ton travail ou ton business." },
            ].map((item, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <div className="border border-[#1f1f1f] rounded-xl p-6 bg-[#111]">
                  <h3 className="font-display font-bold text-white text-sm mb-3">{item.title}</h3>
                  <p className="text-sm text-[#555] leading-relaxed">{item.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="py-14 px-6" style={{ borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <h2 className="font-display font-bold text-white text-xl mb-8">Éditions précédentes</h2>
          </AnimateIn>
          <div className="space-y-3">
            {editions.map((e, i) => (
              <AnimateIn key={e.slug} delay={i * 60}>
                <div className="flex items-center justify-between border border-[#1f1f1f] rounded-xl px-6 py-4 bg-[#111] hover:border-[#333] transition-all">
                  <div>
                    <span className="text-xs text-[#333] mr-3">#{e.number}</span>
                    <span className="font-semibold text-white text-sm">{e.title}</span>
                    <p className="text-xs text-[#444] mt-1">{e.excerpt}</p>
                  </div>
                  <span className="text-xs text-[#333] flex-shrink-0 ml-6">
                    {new Date(e.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
