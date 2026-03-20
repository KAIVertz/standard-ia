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
      className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "bg-[#0a0a0a]/95 backdrop-blur border-b border-[#1f1f1f]" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/logo.png" alt="Standard IA" width={32} height={32} className="rounded-lg" />
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
