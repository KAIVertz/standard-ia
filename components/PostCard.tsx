import Link from "next/link"
import { Post } from "@/types"

const typeLabel: Record<Post['type'], string> = {
  post: 'Post', article: 'Article', analyse: 'Analyse',
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`}
      className="block bg-[#111] border border-[#1f1f1f] rounded-xl p-6 hover:border-[#333] transition-all duration-200 group">
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
        {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </Link>
  )
}
