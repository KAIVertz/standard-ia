export default function Logo({ size = 32 }: { size?: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#22c55e"/>
      <path d="M9 16.5L14 21.5L23 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
