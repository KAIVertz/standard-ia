import { notFound } from "next/navigation"
import Link from "next/link"
import { posts, getPostBySlug } from "@/content/posts"
import { PostType } from "@/types"
import SubscribeForm from "@/components/SubscribeForm"

const typeLabel: Record<PostType, string> = {
  post: 'Post', article: 'Article', analyse: 'Analyse',
}

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return { title: `${post.title} — Standard IA`, description: post.excerpt }
}

function renderContent(content: string) {
  return content
    .split('\n')
    .map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>
      if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>
      if (line.startsWith('- ')) return <li key={i}>{line.slice(2)}</li>
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i}><strong>{line.slice(2, -2)}</strong></p>
      if (line === '---') return <hr key={i} />
      if (line === '') return <br key={i} />
      return <p key={i}>{line}</p>
    })
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = posts.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <main>
      <article className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/posts" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
            ← Retour
          </Link>
          <span className="text-gray-200">|</span>
          <span className="text-xs font-semibold text-[#16a34a] bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
            {typeLabel[post.type]}
          </span>
          <span className="text-xs text-gray-400">{post.readTime} min de lecture</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-[#111] leading-tight mb-4">{post.title}</h1>
        <p className="text-gray-500 text-base leading-relaxed mb-6">{post.excerpt}</p>

        <div className="flex items-center gap-2 pb-8 mb-8" style={{ borderBottom: "1px solid #e5e7eb" }}>
          <div className="w-7 h-7 rounded-full bg-[#16a34a] flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <span className="text-sm font-medium text-[#111]">Standard IA</span>
          <span className="text-gray-300">·</span>
          <span className="text-sm text-gray-400">
            {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        <div className="prose">{renderContent(post.content)}</div>
      </article>

      {/* Newsletter CTA */}
      <section className="py-12 px-6" style={{ background: "#f0fdf4", borderTop: "1px solid #dcfce7" }}>
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-black text-[#111] text-xl mb-2">Reçois chaque édition dans ta boîte mail.</h3>
          <p className="text-gray-500 text-sm mb-5">Gratuit · Sans spam · Résiliable en un clic</p>
          <div className="flex justify-center"><SubscribeForm variant="green" /></div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <h3 className="font-black text-[#111] text-lg mb-5">Articles similaires</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {related.map(p => (
                <Link key={p.slug} href={`/posts/${p.slug}`}
                  className="block border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group">
                  <h4 className="font-bold text-sm text-[#111] leading-snug group-hover:text-[#16a34a] transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-2">{p.readTime} min</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
