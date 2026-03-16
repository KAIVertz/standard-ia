export default function Hero() {
  return (
    <section className="pt-40 pb-28 px-6 text-center bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 border border-green-100">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
          Agence IA · France · En place en 7 jours
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tight leading-[1.05] mb-6">
          Ne ratez plus jamais
          <br />
          un client.
        </h1>

        {/* Sub */}
        <p className="text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed mb-10">
          Standard IA déploie des solutions IA sur-mesure pour les entreprises françaises —
          réceptionniste, chatbot, automatisations. En place en moins de 7 jours.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#contact"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors duration-150 text-sm w-full sm:w-auto"
          >
            Réserver un appel gratuit
          </a>
          <a
            href="#services"
            className="text-zinc-600 hover:text-zinc-900 font-medium px-7 py-3.5 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors duration-150 text-sm bg-white w-full sm:w-auto"
          >
            Voir nos services
          </a>
        </div>

        {/* Trust */}
        <p className="mt-8 text-xs text-zinc-400 tracking-wide">
          Sans engagement &nbsp;·&nbsp; Support français inclus &nbsp;·&nbsp; Résultats en 7 jours
        </p>
      </div>
    </section>
  );
}
