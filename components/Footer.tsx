import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Logo size={22} />
          <span className="text-white font-bold text-sm">Standard IA</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/30">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#process"  className="hover:text-white transition-colors">Process</a>
          <a href="mailto:contact@standard-ia.pro" className="hover:text-white transition-colors">contact@standard-ia.pro</a>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Standard IA</p>
      </div>
    </footer>
  );
}
