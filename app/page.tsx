import Link from "next/link"
import { posts, getFeaturedPost } from "@/content/posts"
import { tools } from "@/content/tools"
import PostCard from "@/components/PostCard"
import ToolCard from "@/components/ToolCard"
import BeehiivEmbed from "@/components/BeehiivEmbed"
import AnimateIn from "@/components/AnimateIn"

export default function Home() {
  const featured = getFeaturedPost()
  const latestPosts = posts.filter(p => !p.featured).slice(0, 4)

  return (
    <main>

      {/* Hero */}
      <section className="pt-24 pb-28 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <AnimateIn>
            <h1 className="font-display font-black text-white text-5xl md:text-6xl leading-tight tracking-tight mb-6">
              L&apos;intelligence artificielle<br />expliquée simplement.
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="text-[#555] text-xl mb-10 leading-relaxed">
              Chaque semaine, les meilleurs outils, les actualités et les conseils IA — directement dans ta boîte mail. En français.
            </p>
          </AnimateIn>
          <AnimateIn delay={220}>
            <div className="flex justify-center">
              <BeehiivEmbed />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #1a1a1a" }} />

      <div className="max-w-6xl mx-auto px-6">

        {/* Featured article */}
        {featured && (
          <div className="py-14" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <AnimateIn>
              <p className="text-xs font-semibold text-[#444] uppercase tracking-widest mb-6">À la une</p>
              <Link href={`/posts/${featured.slug}`}
                className="group grid md:grid-cols-5 gap-8 bg-[#111] rounded-2xl border border-[#1f1f1f] p-8 hover:border-[#2a2a2a] transition-all duration-200">
                <div className="md:col-span-3">
                  <span className="text-xs font-semibold text-[#555] uppercase tracking-widest">Article</span>
                  <h2 className="font-display font-black text-white text-3xl mt-4 mb-4 leading-tight group-hover:text-[#ccc] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-[#555] text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                  <span className="text-sm font-semibold text-white">Lire l&apos;article →</span>
                </div>
                <div className="hidden md:flex md:col-span-2 items-center justify-center bg-[#0f0f0f] rounded-xl border border-[#1a1a1a]">
                  <span className="font-display font-black text-[#1a1a1a] text-[7rem] select-none leading-none">IA</span>
                </div>
              </Link>
            </AnimateIn>
          </div>
        )}

        {/* Latest articles */}
        <div className="py-14" style={{ borderBottom: "1px solid #1a1a1a" }}>
          <AnimateIn>
            <div className="flex items-center justify-between mb-8">
              <p className="font-display font-bold text-white text-lg">Derniers articles</p>
              <Link href="/posts" className="text-sm text-[#555] hover:text-white transition-colors">Tout voir →</Link>
            </div>
          </AnimateIn>
          <div className="grid md:grid-cols-2 gap-4">
            {latestPosts.map((p, i) => (
              <AnimateIn key={p.slug} delay={i * 80}>
                <PostCard post={p} />
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Newsletter mid-page */}
        <div className="py-14" style={{ borderBottom: "1px solid #1a1a1a" }}>
          <AnimateIn>
            <div className="rounded-2xl border border-[#1f1f1f] bg-[#111] px-10 py-12 text-center">
              <h3 className="font-display font-black text-white text-3xl mb-3">Ne manque aucune édition.</h3>
              <p className="text-[#555] text-sm mb-6">Chaque semaine dans ta boîte mail. Gratuit.</p>
              <div className="flex justify-center">
                <BeehiivEmbed />
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Tool reviews */}
        <div className="py-14">
          <AnimateIn>
            <div className="flex items-center justify-between mb-8">
              <p className="font-display font-bold text-white text-lg">Outils testés</p>
              <Link href="/outils" className="text-sm text-[#555] hover:text-white transition-colors">Tout voir →</Link>
            </div>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-4">
            {tools.map((t, i) => (
              <AnimateIn key={t.slug} delay={i * 80}>
                <ToolCard tool={t} />
              </AnimateIn>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
