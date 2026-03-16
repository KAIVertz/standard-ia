const steps = [
  {
    n: "1",
    title: "Audit gratuit (30 min)",
    body: "On analyse votre business ensemble. On identifie les 3 automatisations à impact immédiat. C'est gratuit, sans engagement.",
  },
  {
    n: "2",
    title: "On déploie tout",
    body: "Notre équipe configure et met en ligne votre solution IA en moins de 7 jours. Vous n'avez rien à faire techniquement.",
  },
  {
    n: "3",
    title: "Ça tourne seul",
    body: "Votre IA travaille 24h/24. Vous recevez un rapport chaque mois avec les résultats : leads générés, appels traités, temps économisé.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-[#22c55e] text-xs font-semibold uppercase tracking-widest mb-3">Comment ça marche</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            En place en 7 jours.<br />
            <span className="text-white/40">Sans prise de tête.</span>
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-8 py-10 border-b border-white/5 last:border-0">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center">
                <span className="text-[#22c55e] font-black text-lg">{s.n}</span>
              </div>
              <div className="pt-1">
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xl">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a href="#contact"
            className="inline-block bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold px-7 py-3.5 rounded-xl text-sm transition-colors">
            Commencer par l&apos;audit gratuit
          </a>
        </div>
      </div>
    </section>
  );
}
