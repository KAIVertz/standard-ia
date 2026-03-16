export default function NewsletterForm({ size = 'default' }: { size?: 'default' | 'large' }) {
  return (
    <div className={size === 'large' ? 'max-w-md' : 'w-full'}>
      <iframe
        src="https://embeds.beehiiv.com/standard-ia"
        data-test-id="beehiiv-embed"
        width="100%"
        height={size === 'large' ? '180' : '140'}
        frameBorder="0"
        scrolling="no"
        style={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
      />
      {/* Fallback if Beehiiv not set up yet */}
      <noscript>
        <form className="flex gap-2 mt-2">
          <input
            type="email"
            placeholder="Votre email"
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#16a34a]"
          />
          <button className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap">
            S&apos;abonner
          </button>
        </form>
      </noscript>
    </div>
  )
}
