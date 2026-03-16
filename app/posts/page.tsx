import { posts } from "@/content/posts"
import PostCard from "@/components/PostCard"
import AnimateIn from "@/components/AnimateIn"

export const metadata = { title: "Articles — Standard IA" }

export default function PostsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <AnimateIn>
        <div className="mb-12" style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: "2.5rem" }}>
          <h1 className="font-display font-black text-white text-4xl tracking-tight mb-3">Articles & Posts</h1>
          <p className="text-[#555]">Tout ce qu&apos;il faut savoir sur l&apos;IA, en français.</p>
        </div>
      </AnimateIn>
      <div className="grid md:grid-cols-2 gap-4">
        {posts.map((p, i) => (
          <AnimateIn key={p.slug} delay={i * 60}>
            <PostCard post={p} />
          </AnimateIn>
        ))}
      </div>
    </main>
  )
}
