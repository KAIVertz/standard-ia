const services = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="#16a34a" strokeWidth="1.5"/>
        <path d="M7 10l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    name: "Réceptionniste IA",
    description: "Un agent IA qui répond à vos appels 24h/24, gère les questions courantes et prend les rendez-vous à votre place.",
    price: "197",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 6a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H7l-4 2V6z" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    name: "Chatbot IA",
    description: "Un chatbot intelligent sur votre site web qui répond instantanément, capture les leads et les transmet directement à votre CRM.",
    price: "147",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="4" cy="10" r="2" stroke="#16a34a" strokeWidth="1.5"/>
        <circle cx="16" cy="4" r="2" stroke="#16a34a" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="2" stroke="#16a34a" strokeWidth="1.5"/>
        <path d="M6 10h4m2-4.5L10 10l2 4.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    name: "Automatisations IA",
    description: "Vos outils connectés entre eux — CRM, email, calendrier, facturation. Les tâches répétitives disparaissent, vous vous concentrez sur l'essentiel.",
    price: "297",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="11" rx="2" stroke="#16a34a" strokeWidth="1.5"/>
        <path d="M6 17h8M10 14v3" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 8h8M6 10.5h5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    name: "Contenu IA",
    description: "Production et publication automatisées de contenu pour vos réseaux sociaux. Votre présence en ligne tourne sans effort de votre côté.",
    price: "197",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-zinc-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="text-green-600 text-xs font-semibold uppercase tracking-widest mb-3">
            Nos services
          </p>
          <h2 className="text-4xl font-black text-zinc-900 tracking-tight">
            Ce que nous déployons pour vous.
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white border border-zinc-200 rounded-2xl p-7 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-9 h-9 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center mb-5">
                {s.icon}
              </div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-zinc-900 font-bold text-lg">{s.name}</h3>
                <div className="text-right flex-shrink-0">
                  <span className="text-zinc-900 font-black text-xl">{s.price}€</span>
                  <span className="text-zinc-400 text-xs">/mois</span>
                </div>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                {s.description}
              </p>
              <a
                href="#contact"
                className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors"
              >
                En savoir plus →
              </a>
            </div>
          ))}
        </div>

        <p className="text-zinc-400 text-xs mt-8 text-center">
          Résiliable à tout moment · Pas de frais d&apos;installation · Onboarding inclus
        </p>
      </div>
    </section>
  );
}
