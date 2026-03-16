export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Subtle radial bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,197,94,0.12) 0%, transparent 60%)" }} />

      <div className="relative max-w-4xl mx-auto">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 border border-white/10 text-white/60 text-xs px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          Agence IA française
        </div>

        {/* Main headline */}
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.95] tracking-tight text-white mb-8">
          Votre business
          <br />
          <span style={{ color: "#22c55e" }}>tourne seul.</span>
        </h1>

        {/* Sub */}
        <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
          On déploie des agents IA qui répondent à vos appels, capturent vos leads et automatisent vos tâches — en moins de 7 jours.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#contact"
            className="w-full sm:w-auto bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-8 py-4 rounded-xl text-base transition-colors">
            Réserver un audit gratuit
          </a>
          <a href="#services"
            className="w-full sm:w-auto border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-medium px-8 py-4 rounded-xl text-base transition-colors">
            Voir les services
          </a>
        </div>

        <p className="mt-6 text-white/25 text-xs tracking-wide">
          Sans engagement &nbsp;·&nbsp; Résultats en 7 jours &nbsp;·&nbsp; Support français
        </p>
      </div>

      {/* Bottom chat mockup */}
      <div className="relative mt-20 w-full max-w-lg mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span className="text-white/40 text-xs font-mono">Standard IA · Agent actif</span>
          </div>
          {/* Messages */}
          <div className="px-4 py-4 space-y-3">
            <div className="flex justify-start">
              <div className="bg-white/10 text-white/80 text-sm px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[80%]">
                Bonjour ! Je suis l&apos;assistant de Standard IA. Comment puis-je vous aider ?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-[#22c55e] text-black text-sm font-medium px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%]">
                Je voudrais un devis pour mon restaurant
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white/10 text-white/80 text-sm px-3.5 py-2.5 rounded-2xl rounded-tl-sm max-w-[80%]">
                Parfait ! Je note votre demande et vous recontacte dans l&apos;heure. Votre email ?
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-white/20 text-[10px]">Lead capturé automatiquement dans votre CRM</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
