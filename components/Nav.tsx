"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0d0d0d]/95 backdrop-blur border-b border-white/10" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <Logo size={28} />
          <span className="text-white font-bold text-[15px] tracking-tight">Standard IA</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#process"  className="hover:text-white transition-colors">Comment ça marche</a>
        </div>
        <a href="#contact" className="text-sm font-semibold bg-[#22c55e] hover:bg-[#16a34a] text-black px-4 py-2 rounded-lg transition-colors">
          Audit gratuit
        </a>
      </div>
    </nav>
  );
}
