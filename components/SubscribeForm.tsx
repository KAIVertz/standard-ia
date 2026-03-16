"use client"
import { useRouter } from "next/navigation"

export default function SubscribeForm({ variant = 'default' }: { variant?: 'default' | 'green' }) {
  const router = useRouter()
  return (
    <form className="flex gap-2 max-w-sm"
      onSubmit={(e) => { e.preventDefault(); router.push('/newsletter') }}>
      <input type="email" placeholder="Votre email" required
        className={`flex-1 border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] ${variant === 'green' ? 'border-green-200 bg-white' : 'border-gray-200 bg-white'}`} />
      <button type="submit"
        className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap">
        S&apos;abonner
      </button>
    </form>
  )
}
