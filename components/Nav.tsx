"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Logo from "./Logo"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? "shadow-sm" : ""}`}
      style={{ borderBottom: "1px solid #e5e7eb" }}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={28} />
          <span className="font-display font-bold text-[#030712] text-sm tracking-tight">Standard IA</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
          <Link href="/posts" className="hover:text-gray-900 transition-colors">Articles</Link>
          <Link href="/outils" className="hover:text-gray-900 transition-colors">Outils</Link>
          <Link href="/newsletter" className="hover:text-gray-900 transition-colors">Newsletter</Link>
        </div>
        <Link href="/newsletter"
          className="text-sm font-semibold bg-[#255BEE] hover:bg-[#1a47cc] text-white px-4 py-1.5 rounded-lg transition-colors">
          S&apos;abonner
        </Link>
      </div>
    </nav>
  )
}
