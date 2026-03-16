import Link from "next/link"
import { posts, getFeaturedPost } from "@/content/posts"
import { tools } from "@/content/tools"
import PostCard from "@/components/PostCard"
import ToolCard from "@/components/ToolCard"
import SubscribeForm from "@/components/SubscribeForm"

export default function Home() {
  const featured = getFeaturedPost()
  const latestPosts = posts.filter(p => !p.featured).slice(0, 4)

  return (
    <main>
      {/* Hero — newsletter-first like The Rundown */}
      <section className="py-20 px-6 text-center" style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#255BEE] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-[#255BEE]" />
            La newsletter IA #1 en français
          </div>
          <h1 className="font-display font-black text-[#030712] text-4xl md:text-5xl leading-tight tracking-tight mb-4">
            L&apos;IA expliquée simplement.<br />Chaque semaine.
          </h1>
          <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            Outils, actualités et conseils pratiques — tout ce qu&apos;il faut savoir sur l&apos;IA, en français, sans jargon.
          </p>
          <div className="flex justify-center mb-3">
            <SubscribeForm />
          </div>
          <p className="text-xs text-gray-400">Gratuit · Sans spam · Résiliable en un clic</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">

        {/* Featured article */}
        {featured && (
          <div className="py-10" style={{ borderBottom: "1px solid #e5e7eb" }}>
            <p className="text-xs font-semibold text-[#255BEE] uppercase tracking-widest mb-4">À la une</p>
            <Link href={`/posts/${featured.slug}`}
              className="group grid md:grid-cols-3 gap-6 bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg transition-all duration-200">
              <div className="md:col-span-2">
                <span className="text-xs font-semibold text-[#255BEE] bg-blue-50 px-2.5 py-1 rounded-full">Article</span>
                <h2 className="font-display font-black text-[#030712] text-2xl mt-3 mb-3 leading-snug group-hover:text-[#255BEE] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                <span className="text-sm font-semibold text-[#255BEE]">Lire l&apos;article →</span>
              </div>
              <div className="hidden md:flex items-center justify-center bg-gray-50 rounded-xl">
                <span className="font-display font-black text-8xl text-gray-100 select-none">IA</span>
              </div>
            </Link>
          </div>
        )}

        {/* Latest articles */}
        <div className="py-10" style={{ borderBottom: "1px solid #e5e7eb" }}>
          <div className="flex items-center justify-between mb-6">
            <p className="font-display font-bold text-[#030712] text-lg">Derniers articles</p>
            <Link href="/posts" className="text-sm text-[#255BEE] font-semibold hover:underline">Tout voir →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {latestPosts.map(p => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>

        {/* Newsletter mid-page */}
        <div className="py-10" style={{ borderBottom: "1px solid #e5e7eb" }}>
          <div className="bg-[#255BEE] rounded-2xl px-8 py-10 text-center">
            <h3 className="font-display font-black text-white text-2xl mb-2">Ne manque aucune édition.</h3>
            <p className="text-blue-200 text-sm mb-6">Chaque semaine dans ta boîte mail. Gratuit.</p>
            <div className="flex justify-center">
              <form className="flex gap-2 w-full max-w-sm"
                action="/newsletter">
                <input type="email" placeholder="Votre email" required
                  className="flex-1 border-0 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white text-gray-900" />
                <button type="submit"
                  className="bg-white text-[#255BEE] font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-50 transition-colors whitespace-nowrap">
                  S&apos;abonner
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tool reviews */}
        <div className="py-10">
          <div className="flex items-center justify-between mb-6">
            <p className="font-display font-bold text-[#030712] text-lg">Outils testés</p>
            <Link href="/outils" className="text-sm text-[#255BEE] font-semibold hover:underline">Tout voir →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </div>

      </div>
    </main>
  )
}
