import Link from "next/link"
import { posts, getFeaturedPost } from "@/content/posts"
import { tools } from "@/content/tools"
import PostCard from "@/components/PostCard"
import ToolCard from "@/components/ToolCard"
import BeehiivEmbed from "@/components/BeehiivEmbed"
import AnimateIn from "@/components/AnimateIn"
import RotatingWords from "@/components/RotatingWords"
import NewsTicker from "@/components/NewsTicker"
import CountUp from "@/components/CountUp"
import TiltCard from "@/components/TiltCard"
import GlowButton from "@/components/GlowButton"

export default function Home() {
  const featured = getFeaturedPost()
  const latestPosts = posts.filter(p => !p.featured).slice(0, 4)

  return (
    <main>

      {/* ═══════════════════════════════════════
          1. HERO — The Hook
      ═══════════════════════════════════════ */}
      <section className="relative pt-28 pb-24 px-6 overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <AnimateIn>
            <h1 className="font-display font-black text-white text-5xl md:text-7xl leading-[1.05] tracking-tight mb-10">
              L&apos;IA va changer<br />
              <RotatingWords />
            </h1>
          </AnimateIn>

          <AnimateIn delay={150}>
            <div className="flex justify-center mb-6">
              <BeehiivEmbed />
            </div>
            <p className="text-xs text-[#333]">Gratuit · Pas de spam · Désinscription en 1 clic</p>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. NEWS TICKER — Scrolling headlines
      ═══════════════════════════════════════ */}
      <NewsTicker />

      {/* ═══════════════════════════════════════
          3. WHAT YOU GET — Value proposition
      ═══════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimateIn>
            <p className="text-xs font-semibold text-[#444] uppercase tracking-[0.2em] mb-4 text-center">Ce que tu reçois</p>
            <h2 className="font-display font-black text-white text-3xl md:text-4xl text-center mb-16">
              5 minutes de lecture.<br />Des heures de valeur.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                ),
                title: "1 outil IA testé",
                desc: "Chaque semaine, on teste un outil et on te dit honnêtement s'il vaut le coup — ou pas.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ),
                title: "L'actu IA en 5 min",
                desc: "Les 3 news les plus importantes de la semaine, résumées sans jargon technique.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                ),
                title: "1 hack actionnable",
                desc: "Un prompt, une technique, un workflow — quelque chose que tu peux appliquer immédiatement.",
              },
            ].map((item, i) => (
              <AnimateIn key={i} delay={i * 100}>
                <TiltCard className="h-full">
                  <div className="h-full bg-[#111] border border-[#1f1f1f] rounded-2xl p-8 hover:border-[#2a2a2a] transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center text-white mb-5">
                      {item.icon}
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-3">{item.title}</h3>
                    <p className="text-sm text-[#555] leading-relaxed">{item.desc}</p>
                  </div>
                </TiltCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. STATS — Animated numbers
      ═══════════════════════════════════════ */}
      <section className="py-16 px-6 border-y border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: 6, s: "+", label: "Articles publiés" },
            { n: 3, s: "", label: "Outils testés" },
            { n: 2, s: "", label: "Newsletters envoyées" },
            { n: 50, s: "+", label: "Lecteurs" },
          ].map((stat, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <div>
                <p className="font-display font-black text-white text-3xl md:text-4xl">
                  <CountUp target={stat.n} />{stat.s}
                </p>
                <p className="text-xs text-[#444] mt-2 uppercase tracking-widest">{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. FEATURED ARTICLE — Big card
      ═══════════════════════════════════════ */}
      {featured && (
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <AnimateIn>
              <p className="text-xs font-semibold text-[#444] uppercase tracking-[0.2em] mb-8">À la une</p>
            </AnimateIn>
            <AnimateIn delay={80}>
              <TiltCard>
                <Link href={`/posts/${featured.slug}`}
                  className="group block relative bg-[#111] rounded-2xl border border-[#1f1f1f] p-10 md:p-14 hover:border-[#2a2a2a] transition-all duration-300 overflow-hidden">
                  {/* Subtle glow */}
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
                  <div className="relative">
                    <span className="text-xs font-semibold text-blue-400/70 uppercase tracking-widest">{featured.type}</span>
                    <h2 className="font-display font-black text-white text-3xl md:text-5xl mt-4 mb-6 leading-tight group-hover:text-[#ccc] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-[#555] text-base md:text-lg leading-relaxed mb-8 max-w-2xl">{featured.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                      Lire l&apos;article
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          6. LATEST ARTICLES — Grid
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimateIn>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs font-semibold text-[#444] uppercase tracking-[0.2em] mb-2">Derniers articles</p>
                <h2 className="font-display font-bold text-white text-2xl">Ce qu&apos;on a écrit récemment</h2>
              </div>
              <Link href="/posts" className="text-sm text-[#555] hover:text-white transition-colors">
                Tout voir →
              </Link>
            </div>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-5">
            {latestPosts.map((p, i) => (
              <AnimateIn key={p.slug} delay={i * 100}>
                <TiltCard className="h-full">
                  <PostCard post={p} />
                </TiltCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. MID-PAGE CTA — Newsletter
      ═══════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-2xl mx-auto text-center">
          <AnimateIn>
            <h2 className="font-display font-black text-white text-3xl md:text-4xl mb-4">
              Rejoins la newsletter.
            </h2>
            <p className="text-[#555] text-base mb-8">
              1 email par semaine. Le meilleur de l&apos;IA, résumé en français.
            </p>
            <div className="flex justify-center">
              <BeehiivEmbed />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          8. TOOLS — Tested tools
      ═══════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimateIn>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-xs font-semibold text-[#444] uppercase tracking-[0.2em] mb-2">Outils</p>
                <h2 className="font-display font-bold text-white text-2xl">On les a testés pour toi</h2>
              </div>
              <Link href="/outils" className="text-sm text-[#555] hover:text-white transition-colors">
                Tous les outils →
              </Link>
            </div>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-5">
            {tools.map((t, i) => (
              <AnimateIn key={t.slug} delay={i * 100}>
                <TiltCard className="h-full">
                  <ToolCard tool={t} />
                </TiltCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          9. FINAL CTA — Last chance
      ═══════════════════════════════════════ */}
      <section className="py-28 px-6 relative overflow-hidden border-t border-[#1a1a1a]">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <AnimateIn>
            <h2 className="font-display font-black text-white text-4xl md:text-5xl leading-tight mb-6">
              L&apos;IA n&apos;attend pas.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Toi non plus.</span>
            </h2>
            <p className="text-[#555] text-lg mb-10 max-w-xl mx-auto">
              Chaque semaine, ceux qui lisent Standard IA ont une longueur d&apos;avance.
            </p>
            <div className="flex justify-center">
              <BeehiivEmbed />
            </div>
          </AnimateIn>
        </div>
      </section>

    </main>
  )
}
