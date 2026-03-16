export default function CtaBanner() {
  return (
    <section id="contact" className="py-24 px-6 bg-zinc-50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-black text-zinc-900 tracking-tight mb-4">
          Parlons de votre projet.
        </h2>
        <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
          Réservez un appel de 30 minutes — gratuit, sans engagement.
          On vous dit exactement ce qu&apos;on peut automatiser chez vous.
        </p>

        <a
          href="https://cal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-150 text-base"
        >
          Réserver un appel gratuit
        </a>

        <p className="mt-6 text-zinc-400 text-sm">
          Ou par email :{" "}
          <a
            href="mailto:contact@standard-ia.pro"
            className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2 transition-colors"
          >
            contact@standard-ia.pro
          </a>
        </p>
      </div>
    </section>
  );
}
