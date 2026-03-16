export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-zinc-800/60 bg-zinc-950">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="font-semibold text-zinc-300 text-sm tracking-tight">
            Standard IA
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <a href="#services" className="hover:text-zinc-300 transition-colors">
            Services
          </a>
          <a href="#process" className="hover:text-zinc-300 transition-colors">
            Process
          </a>
          <a
            href="mailto:hello@standard-ia.pro"
            className="hover:text-zinc-300 transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Legal */}
        <p className="text-zinc-600 text-xs">
          © {new Date().getFullYear()} Standard IA — SAS de droit français
        </p>
      </div>
    </footer>
  );
}
