import { editions } from "@/content/newsletter"
import SubscribeForm from "@/components/SubscribeForm"

export const metadata = { title: "Newsletter — Standard IA" }

export default function NewsletterPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-16 px-6 text-center" style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-black text-[#111] tracking-tight mb-3">
            L&apos;IA expliquée simplement.<br />Chaque semaine.
          </h1>
          <p className="text-gray-500 text-base mb-8">
            Outils, actualités, conseils pratiques — tout ce qu&apos;il faut savoir sur l&apos;IA, en français, sans jargon.
          </p>

          <div className="flex justify-center mb-4"><SubscribeForm variant="blue" /></div>
          <p className="text-xs text-gray-400">Gratuit · Sans spam · Résiliable en un clic</p>
        </div>
      </section>

      {/* What you get */}
      <section className="py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-[#111] text-xl mb-8">Ce que vous recevez chaque semaine</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "1 outil IA testé", body: "Un outil passé en revue honnêtement — ce qu'il fait, ce qu'il vaut, si ça vaut le coup." },
              { title: "L'actu IA de la semaine", body: "Les 3 nouvelles les plus importantes du monde de l'IA, résumées en 5 minutes." },
              { title: "1 conseil actionnable", body: "Une chose concrète à appliquer immédiatement dans votre travail ou votre business." },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-[#111] text-sm mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="py-12 px-6" style={{ borderTop: "1px solid #e5e7eb" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-[#111] text-xl mb-6">Éditions précédentes</h2>
          <div className="space-y-3">
            {editions.map(e => (
              <div key={e.slug} className="flex items-center justify-between border border-gray-200 rounded-xl px-5 py-4">
                <div>
                  <span className="text-xs text-gray-400 mr-3">#{e.number}</span>
                  <span className="font-semibold text-[#111] text-sm">{e.title}</span>
                  <p className="text-xs text-gray-400 mt-1">{e.excerpt}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-4">
                  {new Date(e.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
