import { posts } from "@/content/posts"
import PostCard from "@/components/PostCard"

export const metadata = { title: "Articles — Standard IA" }

export default function PostsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#111] tracking-tight mb-2">Articles & Posts</h1>
        <p className="text-gray-500">Tout ce qu&apos;il faut savoir sur l&apos;IA, en français.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {posts.map(p => <PostCard key={p.slug} post={p} />)}
      </div>
    </main>
  )
}
