import Link from "next/link"
import Logo from "./Logo"

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #e5e7eb" }} className="bg-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Logo size={22} />
            <span className="font-display font-bold text-sm text-[#030712]">Standard IA</span>
          </div>
          <p className="text-xs text-gray-400">L&apos;IA expliquée simplement, en français.</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/posts" className="hover:text-gray-700 transition-colors">Articles</Link>
          <Link href="/outils" className="hover:text-gray-700 transition-colors">Outils</Link>
          <Link href="/newsletter" className="hover:text-gray-700 transition-colors">Newsletter</Link>
          <a href="mailto:contact@standard-ia.pro" className="hover:text-gray-700 transition-colors">Contact</a>
        </div>
        <p className="text-xs text-gray-300">© {new Date().getFullYear()} Standard IA</p>
      </div>
    </footer>
  )
}
