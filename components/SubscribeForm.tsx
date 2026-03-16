"use client"
import { useRouter } from "next/navigation"

export default function SubscribeForm({ variant = 'default' }: { variant?: 'default' | 'blue' }) {
  const router = useRouter()
  return (
    <form className="flex gap-2 w-full max-w-sm"
      onSubmit={(e) => { e.preventDefault(); router.push('/newsletter') }}>
      <input type="email" placeholder="Votre email" required
        className="flex-1 border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-sm bg-[#111] text-white placeholder-[#444] focus:outline-none focus:border-white transition-colors" />
      <button type="submit"
        className={`font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap ${variant === 'blue' ? 'bg-[#255BEE] hover:bg-[#1a47cc] text-white' : 'bg-white hover:bg-[#e5e5e5] text-black'}`}>
        S&apos;abonner
      </button>
    </form>
  )
}
