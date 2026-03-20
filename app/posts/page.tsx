import Link from "next/link"
import { posts } from "@/content/posts"
import AnimateIn from "@/components/AnimateIn"

export const metadata = { title: "Articles — Standard IA" }

const typeLabel = { post: "Post", article: "Article", analyse: "Analyse" } as const

export default function PostsPage() {
  const featured = posts.find(p => p.featured) ?? posts[0]
  const rest = posts.filter(p => p.slug !== featured.slug)

  return (
    <main>
      {/* Hero */}
      <section className="pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <AnimateIn>
            <p className="text-xs font-semibold text-[#444] uppercase tracking-[0.2em] mb-4">Blog</p>
            <h1 className="font-display font-black text-white text-4xl md:text-5xl tracking-tight mb-4">Articles &amp; Analyses</h1>
            <p className="text-[#555] text-lg max-w-xl">L&apos;IA décryptée, sans jargon.</p>
          </AnimateIn>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        {/* Featured */}
        <AnimateIn>
          <Link href={`/posts/${featured.slug}`}
            className="group block relative bg-[#111] rounded-2xl border border-[#1f1f1f] p-8 md:p-12 mb-12 hover:border-[#2a2a2a] transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-blue-400/70 uppercase tracking-widest">{typeLabel[featured.type]}</span>
                <span className="text-[#222]">·</span>
                <span className="text-xs text-[#444]">{featured.readTime} min</span>
              </div>
              <h2 className="font-display font-black text-white text-2xl md:text-4xl leading-tight mb-4 group-hover:text-[#ccc] transition-colors">
                {featured.title}
              </h2>
              <p className="text-[#555] text-base leading-relaxed mb-6 max-w-2xl">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                Lire
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </Link>
        </AnimateIn>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5 pb-20">
          {rest.map((post, i) => (
            <AnimateIn key={post.slug} delay={i * 80}>
              <Link href={`/posts/${post.slug}`}
                className="group block bg-[#111] border border-[#1f1f1f] rounded-xl p-6 hover:border-[#333] transition-all duration-200 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-[#666] uppercase tracking-widest">{typeLabel[post.type]}</span>
                  <span className="text-[#2a2a2a]">·</span>
                  <span className="text-xs text-[#444]">{post.readTime} min</span>
                </div>
                <h3 className="font-display font-bold text-white text-base leading-snug mb-3 group-hover:text-[#ccc] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[#555] leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                <p className="text-xs text-[#333]">
                  {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </main>
  )
}
