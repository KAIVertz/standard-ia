const numbers = [
  { value: "7 jours", label: "Délai de déploiement" },
  { value: "24h/24", label: "Votre IA travaille" },
  { value: "75%", label: "De marge sur chaque client" },
  { value: "0", label: "Ligne de code à écrire" },
];

export default function WhyUs() {
  return (
    <section className="py-20 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {numbers.map((n, i) => (
          <div key={i} className="text-center">
            <div className="text-4xl font-black text-white mb-1">{n.value}</div>
            <div className="text-white/40 text-sm">{n.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
