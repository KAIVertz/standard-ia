const stats = [
  {
    value: "7 jours",
    label: "Délai de déploiement moyen",
  },
  {
    value: "100% FR",
    label: "Équipe et support en français",
  },
  {
    value: "0 contrat",
    label: "Résiliable à tout moment",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 px-6 border-t border-b border-zinc-100 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 md:divide-x divide-zinc-100">
          {stats.map((s, i) => (
            <div key={i} className={`${i > 0 ? "md:pl-10" : ""}`}>
              <div className="text-3xl font-black text-zinc-900 mb-1">{s.value}</div>
              <div className="text-sm text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
