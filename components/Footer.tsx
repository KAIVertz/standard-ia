import Link from "next/link"
import Logo from "./Logo"

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1f1f1f" }} className="bg-[#0a0a0a] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Logo size={22} />
            <span className="font-display font-bold text-sm text-white">Standard IA</span>
          </div>
          <p className="text-xs text-[#444]">L&apos;IA expliquée simplement, en français.</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-[#444]">
          <Link href="/posts" className="hover:text-white transition-colors">Articles</Link>
          <Link href="/outils" className="hover:text-white transition-colors">Outils</Link>
          <Link href="/newsletter" className="hover:text-white transition-colors">Newsletter</Link>
        </div>
        <p className="text-xs text-[#2a2a2a]">© {new Date().getFullYear()} Standard IA</p>
      </div>
    </footer>
  )
}
