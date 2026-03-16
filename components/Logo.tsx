export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Diamond / rotated square */}
      <rect
        x="4"
        y="4"
        width="20"
        height="20"
        rx="3"
        transform="rotate(45 14 14)"
        fill="#16a34a"
      />
      {/* Small circle accent top-right */}
      <circle cx="20" cy="8" r="3" fill="#09090b" />
    </svg>
  );
}
