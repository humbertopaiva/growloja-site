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
  "Define marketing e canais.",
  "Escolhe e configura a tecnologia.",
  "Implanta processos.",
  "Acompanha indicadores.",
  "Busca crescimento em vendas.",
];

export function NotAgency() {
  return (
    <Section className="bg-white">
      <Reveal>
        <Eyebrow>Mais do que uma agência</Eyebrow>
        <SectionTitle>Não somos uma agência tradicional. Somos uma assessoria para o varejo.</SectionTitle>
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
