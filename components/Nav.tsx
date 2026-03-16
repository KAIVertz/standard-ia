"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-white ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{ borderBottom: scrolled ? "1px solid #e4e4e7" : "1px solid transparent" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <Logo size={26} />
          <span className="font-bold text-zinc-900 text-base tracking-tight">
            Standard IA
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-500">
          <a href="#services" className="hover:text-zinc-900 transition-colors">Services</a>
          <a href="#process"  className="hover:text-zinc-900 transition-colors">Process</a>
          <a href="#contact"  className="hover:text-zinc-900 transition-colors">Contact</a>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-150"
        >
          Réserver un appel
        </a>
      </div>
    </nav>
  );
}
