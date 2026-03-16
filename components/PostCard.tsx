import Link from "next/link"
import { Post } from "@/types"

const typeLabel: Record<Post['type'], string> = {
  post: 'Post', article: 'Article', analyse: 'Analyse',
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`}
      className="block bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all duration-200 group hover:border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-[#255BEE] bg-blue-50 px-2 py-0.5 rounded-full">
          {typeLabel[post.type]}
        </span>
        <span className="text-xs text-gray-400">{post.readTime} min</span>
      </div>
      <h3 className="font-display font-bold text-[#030712] text-base leading-snug mb-2 group-hover:text-[#255BEE] transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
      <p className="text-xs text-gray-400 mt-3">
        {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </Link>
  )
}
