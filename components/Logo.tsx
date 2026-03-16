export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="white"/>
      {/* S shape: top bar right, middle bar full, bottom bar left */}
      <rect x="12" y="7"  width="11" height="3.5" rx="1.75" fill="#0a0a0a"/>
      <rect x="9"  y="7"  width="3.5" height="8.5" rx="1.75" fill="#0a0a0a"/>
      <rect x="9"  y="14" width="14" height="3.5" rx="1.75" fill="#0a0a0a"/>
      <rect x="19.5" y="17.5" width="3.5" height="7.5" rx="1.75" fill="#0a0a0a"/>
      <rect x="9"  y="21.5" width="11" height="3.5" rx="1.75" fill="#0a0a0a"/>
    </svg>
  )
}
