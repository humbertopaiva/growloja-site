import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const traditional = [
  "Lista problemas",
  "Mostra dados",
  "Entrega um relatório",
  "Deixa a execução para depois",
];

const growloja = [
  "Entende o negócio",
  "Cruza dados e contexto",
  "Encontra oportunidades",
  "Prioriza o que importa",
  "Define os próximos passos",
];

export function NotJustAnalysis() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>Não é só uma análise</Eyebrow>
        <SectionTitle>Você não precisa de mais um relatório.</SectionTitle>
        <Lead>Você precisa saber o que fazer com as informações que já tem.</Lead>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Reveal>
          <article className="h-full rounded-3xl border border-ink/8 p-7">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Diagnóstico tradicional
            </p>
            <ul className="mt-6 space-y-3 text-muted">
              {traditional.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={80}>
          <article className="h-full rounded-3xl bg-ink p-7 text-white">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Diagnóstico Growloja
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
