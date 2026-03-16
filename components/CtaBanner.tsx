export default function CtaBanner() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Glow top */}
        <div className="relative">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)" }} />
          <div className="relative">
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Prêt à faire
              <br />
              <span style={{ color: "#22c55e" }}>tourner votre business ?</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              30 minutes d&apos;audit gratuit. On vous dit exactement ce qu&apos;on peut automatiser chez vous et en combien de temps.
            </p>

            <a href="https://cal.com"
              target="_blank" rel="noopener noreferrer"
              className="inline-block bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-10 py-4 rounded-xl text-lg transition-colors mb-6">
              Réserver mon audit gratuit
            </a>

            <p className="text-white/25 text-sm">
              Ou par email :{" "}
              <a href="mailto:contact@standard-ia.pro"
                className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">
                contact@standard-ia.pro
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
