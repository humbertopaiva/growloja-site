import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const overview = [
  {
    number: "01",
    title: "Onde estamos",
    text: "Uma visão clara da situação atual da empresa.",
    items: [
      "Maturidade digital",
      "Presença online",
      "Estrutura comercial",
      "Operação",
      "Principais gargalos",
    ],
  },
  {
    number: "02",
    title: "O que encontramos",
    text: "Os principais insights encontrados durante a análise.",
    items: ["Mercado", "Concorrência", "Clientes", "Produtos", "Preços", "Tendências"],
  },
  {
    number: "03",
    title: "Onde estão as oportunidades",
    text: "Os pontos onde identificamos potencial de crescimento.",
    items: [
      "Novos canais",
      "Produtos estratégicos",
      "Novas ofertas",
      "Recorrência",
      "Diferenciação",
      "Aquisição de clientes",
    ],
  },
];

const quadrants = [
  {
    title: "Alto impacto / baixo esforço",
    hint: "Fazer primeiro",
    highlight: true,
  },
  {
    title: "Alto impacto / alto esforço",
    hint: "Planejar",
    highlight: false,
  },
  {
    title: "Baixo impacto / baixo esforço",
    hint: "Se couber",
    highlight: false,
  },
  {
    title: "Baixo impacto / alto esforço",
    hint: "Deixar de lado",
    highlight: false,
  },
];

const plan = [
  { range: "0–30 dias", title: "Fundação" },
  { range: "31–60 dias", title: "Implementação" },
  { range: "61–90 dias", title: "Otimização" },
];

export function GrowthMap() {
  return (
    <Section id="mapa-crescimento">
      <Reveal>
        <Eyebrow>O que você recebe</Eyebrow>
        <SectionTitle>E o que você recebe no final?</SectionTitle>
        <Lead>
          Um mapa claro do seu negócio, das oportunidades que encontramos e do que
          deveria ser feito primeiro.
        </Lead>
      </Reveal>

      <Reveal>
        <p className="mt-10 text-sm font-medium uppercase tracking-[0.16em] text-accent">
          Mapa de Crescimento Growloja
        </p>
      </Reveal>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {overview.map((block, index) => (
          <Reveal key={block.number} delay={index * 70}>
            <article className="flex h-full flex-col rounded-3xl border border-ink/8 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-ink/16">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {block.number}
              </p>
              <h3 className="mt-3 text-xl font-medium tracking-tight">{block.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{block.text}</p>
              <ul className="mt-5 space-y-2 text-sm text-ink/80">
                {block.items.map((item) => (
                  <li key={item} className="border-t border-ink/8 pt-2 first:border-0 first:pt-0">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <article className="mt-4 rounded-3xl border border-ink/8 bg-white p-6 md:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">04</p>
          <h3 className="mt-3 text-2xl font-medium tracking-tight">O que fazer primeiro</h3>
          <p className="mt-3 max-w-2xl text-muted">
            Nem toda oportunidade merece ser executada agora. A Growloja ajuda você a
            priorizar — não a receber uma lista enorme de recomendações.
          </p>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.14em] text-ink/70">
            Impacto × esforço
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {quadrants.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "relative overflow-hidden rounded-2xl border p-5 transition duration-300",
                  item.highlight
                    ? "border-accent/40 bg-accent-soft"
                    : "border-ink/8 bg-paper",
                )}
              >
                <span
                  className={cn(
                    "absolute right-4 top-4 h-2.5 w-2.5 rounded-full",
                    item.highlight ? "bg-accent" : "bg-ink/25",
                  )}
                  style={{ animationDelay: `${index * 120}ms` }}
                />
                <p className="pr-6 font-medium">{item.title}</p>
                <p className="mt-2 text-sm text-muted">{item.hint}</p>
              </div>
            ))}
          </div>
        </article>
      </Reveal>

      <Reveal>
        <article className="mt-4 rounded-3xl bg-ink p-6 text-white md:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">05</p>
          <h3 className="mt-3 text-2xl font-medium tracking-tight">
            Plano dos próximos 90 dias
          </h3>
          <p className="mt-3 max-w-2xl text-white/70">
            Transformamos as oportunidades encontradas em um plano de ação. Sem prometer
            resultado financeiro: o diagnóstico termina com direção e prioridades.
          </p>
          <ol className="mt-8 flex flex-col gap-4 md:flex-row md:items-stretch">
            {plan.map((item, index) => (
              <li key={item.range} className="flex flex-1 items-center gap-4">
                <div className="w-full rounded-2xl bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-accent">{item.range}</p>
                  <p className="mt-3 text-xl font-medium">{item.title}</p>
                </div>
                {index < plan.length - 1 ? (
                  <span className="hidden shrink-0 text-accent md:inline" aria-hidden>
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </article>
      </Reveal>
    </Section>
  );
}
