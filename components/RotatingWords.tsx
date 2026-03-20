"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const words = ["votre travail", "votre business", "la France", "votre quotidien", "tout"]

export default function RotatingWords() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
