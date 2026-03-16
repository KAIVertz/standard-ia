const steps = [
  {
    number: "01",
    title: "Audit gratuit",
    description:
      "On se retrouve 30 minutes. On analyse votre business, vos outils, et on identifie les automatisations à impact immédiat.",
  },
  {
    number: "02",
    title: "Déploiement",
    description:
      "Notre équipe configure et déploie votre solution IA en arrière-plan. Aucune action technique requise de votre côté.",
  },
  {
    number: "03",
    title: "Résultats",
    description:
      "Votre IA est en ligne. Elle travaille 24h/24. Vous recevez un rapport mensuel avec les résultats concrets.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="text-green-600 text-xs font-semibold uppercase tracking-widest mb-3">
            Comment ça marche
          </p>
          <h2 className="text-4xl font-black text-zinc-900 tracking-tight">
            Simple. Rapide. Sans friction.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-4xl font-black text-zinc-100 mb-4 select-none">
                {step.number}
              </span>
              <h3 className="text-zinc-900 font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <a
            href="#contact"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors duration-150 text-sm"
          >
            Commencer par l&apos;audit gratuit
          </a>
        </div>
      </div>
    </section>
  );
}
