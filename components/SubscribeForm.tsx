"use client"
import { useRouter } from "next/navigation"

export default function SubscribeForm({ variant = 'default' }: { variant?: 'default' | 'blue' }) {
  const router = useRouter()
  return (
    <form className="flex gap-2 w-full max-w-sm"
      onSubmit={(e) => { e.preventDefault(); router.push('/newsletter') }}>
      <input type="email" placeholder="Votre email" required
        className={`flex-1 border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#255BEE] focus:ring-1 focus:ring-[#255BEE] ${variant === 'blue' ? 'border-blue-200 bg-white' : 'border-gray-200 bg-white'}`} />
      <button type="submit"
        className="bg-[#255BEE] hover:bg-[#1a47cc] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap">
        S&apos;abonner
      </button>
    </form>
  )
}
