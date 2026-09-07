import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const agency = [
  "Cria campanhas.",
  "Produz conteúdo.",
  "Compra mídia.",
  "Entrega relatórios.",
];

const growloja = [
  "Entende o negócio.",
  "Analisa o mercado.",
  "Define oportunidades.",
  "Implanta processos.",
  "Executa melhorias.",
  "Acompanha indicadores.",
  "Busca crescimento em vendas.",
];

export function NotAgency() {
  return (
    <Section className="bg-white">
      <Reveal>
        <Eyebrow>Mais do que marketing</Eyebrow>
        <SectionTitle>Mais do que marketing. Uma operação de vendas.</SectionTitle>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Reveal>
          <article className="h-full rounded-3xl border border-ink/8 p-7">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Agência tradicional
            </p>
            <ul className="mt-6 space-y-3 text-muted">
              {agency.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={80}>
          <article className="h-full rounded-3xl bg-ink p-7 text-white">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Growloja
            </p>
            <ul className="mt-6 space-y-3">
              {growloja.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
