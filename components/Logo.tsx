export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#255BEE"/>
      {/* S shape made of two rounded rectangles */}
      <rect x="9" y="8" width="14" height="4" rx="2" fill="white"/>
      <rect x="9" y="14" width="14" height="4" rx="2" fill="white" opacity="0.7"/>
      <rect x="9" y="20" width="14" height="4" rx="2" fill="white"/>
    </svg>
  )
}
