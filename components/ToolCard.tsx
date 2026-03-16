import Link from "next/link"
import { Tool } from "@/types"

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/outils/${tool.slug}`}
      className="block bg-[#111] border border-[#1f1f1f] rounded-xl p-5 hover:border-[#333] transition-all duration-200 group">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg border border-[#222] flex items-center justify-center bg-[#1a1a1a] overflow-hidden flex-shrink-0">
          <img src={tool.logo} alt={tool.name} className="w-6 h-6 object-contain" />
        </div>
        <div>
          <h3 className="font-display font-bold text-white text-sm group-hover:text-[#ccc] transition-colors">{tool.name}</h3>
          <span className="text-xs text-[#444]">{tool.category}</span>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-xs ${i < tool.rating ? 'text-white' : 'text-[#2a2a2a]'}`}>★</span>
          ))}
        </div>
      </div>
      <p className="text-sm text-[#555] leading-relaxed mb-4 line-clamp-2">{tool.tagline}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#333]">{tool.pricing}</span>
        <span className="text-xs font-semibold text-[#666] group-hover:text-white transition-colors">Voir →</span>
      </div>
    </Link>
  )
}
