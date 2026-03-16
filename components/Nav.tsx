"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a12]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Logo size={34} />
          <span className="font-bold text-white tracking-tight text-lg">
            Standard <span className="gradient-text">IA</span>
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#services" className="hover:text-white transition-colors duration-200">
            Services
          </a>
          <a href="#process" className="hover:text-white transition-colors duration-200">
            Process
          </a>
          <a href="#contact" className="hover:text-white transition-colors duration-200">
            Contact
          </a>
        </div>

        {/* CTA */}
        <a
          href="https://cal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group text-sm font-semibold px-5 py-2.5 rounded-lg overflow-hidden transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))",
            border: "1px solid rgba(0,212,255,0.3)",
          }}
        >
          <span className="relative z-10 text-white">Réserver un appel</span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.25), rgba(124,58,237,0.25))" }}
          />
        </a>
      </div>
    </motion.nav>
  );
}
