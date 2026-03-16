import Link from "next/link"
import { Tool } from "@/types"

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/outils/${tool.slug}`}
      className="block bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all duration-200 group hover:border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg border border-gray-100 flex items-center justify-center bg-gray-50 overflow-hidden flex-shrink-0">
          <img src={tool.logo} alt={tool.name} className="w-6 h-6 object-contain" />
        </div>
        <div>
          <h3 className="font-display font-bold text-[#030712] text-sm group-hover:text-[#255BEE] transition-colors">{tool.name}</h3>
          <span className="text-xs text-gray-400">{tool.category}</span>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-xs ${i < tool.rating ? 'text-[#255BEE]' : 'text-gray-200'}`}>★</span>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{tool.tagline}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{tool.pricing}</span>
        <span className="text-xs font-semibold text-[#255BEE]">Voir →</span>
      </div>
    </Link>
  )
}
