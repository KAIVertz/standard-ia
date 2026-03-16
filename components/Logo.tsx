export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer hexagon */}
      <path
        d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
        stroke="url(#logoGrad)"
        strokeWidth="1.5"
        fill="rgba(0,212,255,0.05)"
        filter="url(#glow)"
      />
      {/* Inner node lines — neural net style */}
      <circle cx="20" cy="14" r="2.5" fill="url(#logoGrad)" filter="url(#glow)" />
      <circle cx="13" cy="24" r="2" fill="#7c3aed" opacity="0.8" />
      <circle cx="27" cy="24" r="2" fill="#00d4ff" opacity="0.8" />
      {/* Connecting lines */}
      <line x1="20" y1="16.5" x2="14" y2="22.5" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="16.5" x2="26" y2="22.5" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="24" x2="25" y2="24" stroke="url(#logoGrad)" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
