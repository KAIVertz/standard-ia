const services = [
  {
    label: "01",
    name: "Réceptionniste IA",
    price: "197€/mois",
    description: "Un agent vocal qui décroche vos appels 24h/24, répond aux questions et prend les rendez-vous. Vous ne ratez plus jamais un client.",
    tags: ["Appels entrants", "Prise de RDV", "FAQ automatique"],
  },
  {
    label: "02",
    name: "Chatbot IA",
    price: "147€/mois",
    description: "Un assistant sur votre site qui engage vos visiteurs, répond instantanément et envoie les leads directement dans votre CRM.",
    tags: ["Capture de leads", "Réponses 24/7", "Intégration CRM"],
  },
  {
    label: "03",
    name: "Automatisations IA",
    price: "297€/mois",
    description: "Vos outils connectés entre eux. CRM, emails, facturation, reporting — les tâches répétitives disparaissent, vous gagnez des heures chaque semaine.",
    tags: ["Zéro saisie manuelle", "Outils connectés", "Reporting auto"],
  },
  {
    label: "04",
    name: "Contenu IA",
    price: "197€/mois",
    description: "Création et publication automatisées de contenu pour vos réseaux sociaux. Votre présence en ligne tourne sans que vous leviez le petit doigt.",
    tags: ["Posts automatiques", "LinkedIn · Instagram", "Planning IA"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-[#22c55e] text-xs font-semibold uppercase tracking-widest mb-3">Nos services</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Ce que l&apos;IA fait<br />à votre place.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.label}
              className="group border border-white/10 hover:border-[#22c55e]/40 rounded-2xl p-7 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-200">
              <div className="flex items-start justify-between mb-5">
                <span className="text-white/20 font-black text-3xl leading-none">{s.label}</span>
                <span className="text-[#22c55e] font-bold text-sm">{s.price}</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{s.name}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{s.description}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="text-white/40 text-xs border border-white/10 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/20 text-xs text-center mt-8">
          Sans engagement · Résiliable à tout moment · Onboarding inclus
        </p>
      </div>
    </section>
  );
}
