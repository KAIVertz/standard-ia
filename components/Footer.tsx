import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-zinc-100 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo size={22} />
          <span className="font-bold text-zinc-900 text-sm">Standard IA</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <a href="#services" className="hover:text-zinc-700 transition-colors">Services</a>
          <a href="#process"  className="hover:text-zinc-700 transition-colors">Process</a>
          <a href="mailto:contact@standard-ia.pro" className="hover:text-zinc-700 transition-colors">Contact</a>
        </div>

        <p className="text-zinc-400 text-xs">
          © {new Date().getFullYear()} Standard IA — SAS de droit français
        </p>
      </div>
    </footer>
  );
}
