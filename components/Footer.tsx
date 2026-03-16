import Logo from "./Logo";

export default function Footer() {
  return (
    <footer
      className="py-10 px-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0a0a12" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Logo size={26} />
          <span className="font-bold text-white text-sm tracking-tight">
            Standard <span style={{ background: "linear-gradient(135deg, #00d4ff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IA</span>
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-600">
          <a href="#services" className="hover:text-slate-300 transition-colors">Services</a>
          <a href="#process" className="hover:text-slate-300 transition-colors">Process</a>
          <a href="mailto:contact@standard-ia.pro" className="hover:text-slate-300 transition-colors">Contact</a>
        </div>

        <p className="text-slate-700 text-xs">
          © {new Date().getFullYear()} Standard IA — SAS de droit français
        </p>
      </div>
    </footer>
  );
}
