"use client"
import { useState, useEffect } from "react"
import Link from "next/link"


export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "bg-black/95 backdrop-blur border-b border-[#1f1f1f]" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#6366f1"/>
            <rect x="12" y="7" width="11" height="3.5" rx="1.75" fill="white"/>
            <rect x="9" y="7" width="3.5" height="8.5" rx="1.75" fill="white"/>
            <rect x="9" y="14" width="14" height="3.5" rx="1.75" fill="white"/>
            <rect x="19.5" y="17.5" width="3.5" height="7.5" rx="1.75" fill="white"/>
            <rect x="9" y="21.5" width="11" height="3.5" rx="1.75" fill="white"/>
          </svg>
          <span className="font-display font-bold text-white text-sm tracking-tight">Standard IA</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#666]">
          <Link href="/posts" className="hover:text-white transition-colors">Articles</Link>
          <Link href="/outils" className="hover:text-white transition-colors">Outils</Link>
          <Link href="/newsletter" className="hover:text-white transition-colors">Newsletter</Link>
        </div>
      </div>
    </nav>
  )
}
