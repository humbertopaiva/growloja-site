const sectors = [
  "Materiais de construção",
  "Supermercados",
  "Suplementos",
  "Farmácias",
  "Moda",
  "Cosméticos",
  "Varejo em geral",
];

export function Sectors() {
  return (
    <section className="border-y border-ink/8 bg-white py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-5 md:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Para empresas tradicionais
        </p>
        {sectors.map((item) => (
          <span key={item} className="text-sm text-ink/80">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
