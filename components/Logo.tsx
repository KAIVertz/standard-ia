export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="white"/>
      <rect x="9" y="8" width="14" height="4" rx="2" fill="#0a0a0a"/>
      <rect x="9" y="14" width="10" height="4" rx="2" fill="#0a0a0a" opacity="0.45"/>
      <rect x="9" y="20" width="14" height="4" rx="2" fill="#0a0a0a"/>
    </svg>
  )
}
