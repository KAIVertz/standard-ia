import Link from "next/link"
import { posts, getFeaturedPost } from "@/content/posts"
import { tools } from "@/content/tools"
import PostCard from "@/components/PostCard"
import ToolCard from "@/components/ToolCard"
import SubscribeForm from "@/components/SubscribeForm"

export default function Home() {
  const featured = getFeaturedPost()
  const latestPosts = posts.filter(p => !p.featured).slice(0, 3)

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-gray-100 py-16 px-6" style={{ background: "#fafafa" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold text-[#16a34a] bg-green-50 border border-green-100 px-3 py-1 rounded-full mb-5">
              La référence IA en français
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[#111] tracking-tight leading-tight mb-4">
              L&apos;IA expliquée<br />simplement.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-2">
              Chaque semaine : les meilleurs outils, l&apos;actualité IA et des conseils concrets — en français, sans jargon.
            </p>
            <p className="text-sm text-gray-400 mb-8">Gratuit · Sans spam · Résiliable en un clic</p>

            <SubscribeForm />
          </div>

          {/* Featured post preview */}
          {featured && (
            <Link href={`/posts/${featured.slug}`}
              className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-lg transition-shadow duration-200 group block">
              <span className="text-xs font-semibold text-[#16a34a] bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                À la une
              </span>
              <h2 className="text-xl font-black text-[#111] mt-4 mb-3 leading-snug group-hover:text-[#16a34a] transition-colors">
                {featured.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{featured.excerpt}</p>
              <span className="text-sm font-semibold text-[#16a34a]">Lire l&apos;article →</span>
            </Link>
          )}
        </div>
      </section>

      {/* Latest posts */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-black text-[#111] text-xl">Derniers articles</h2>
            <Link href="/posts" className="text-sm text-[#16a34a] font-semibold hover:underline">
              Voir tout →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {latestPosts.map(p => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      {/* Newsletter banner */}
      <section className="py-14 px-6" style={{ background: "#f0fdf4" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-black text-[#111] text-2xl mb-2">Ne manque aucune édition.</h2>
          <p className="text-gray-500 text-base mb-6">Chaque semaine dans ta boîte mail. Gratuit, sans spam.</p>
          <div className="flex justify-center"><SubscribeForm variant="green" /></div>
        </div>
      </section>

      {/* Tool reviews */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-black text-[#111] text-xl">Outils testés</h2>
              <p className="text-sm text-gray-400 mt-1">Les meilleurs outils IA passés en revue</p>
            </div>
            <Link href="/outils" className="text-sm text-[#16a34a] font-semibold hover:underline">
              Voir tout →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {tools.map(t => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </div>
      </section>
    </main>
  )
}
