"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function GlowButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.div
        className="relative group inline-block"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-40 group-hover:opacity-70 blur-lg transition-opacity duration-300" />
        <div className="relative bg-white text-black font-bold px-8 py-4 rounded-xl text-sm">
          {children}
        </div>
      </motion.div>
    </Link>
  )
}
