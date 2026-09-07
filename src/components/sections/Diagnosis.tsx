import { DiagnosticButton } from "@/components/DiagnosticButton";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

const analyze = [
  "Seu negócio",
  "Seu mercado",
  "Seus concorrentes",
  "Seus produtos",
  "Sua presença digital",
  "Seus canais",
];

const deliver = [
  "Principais gargalos",
  "Principais oportunidades",
  "Prioridades",
  "Possibilidades de crescimento",
  "Próximos passos",
];

export function Diagnosis() {
  return (
    <Section id="diagnostico">
      <Reveal>
        <Eyebrow>Diagnóstico de Crescimento Growloja</Eyebrow>
        <SectionTitle>
          Antes de propor qualquer solução, vamos entender o seu negócio.
        </SectionTitle>
        <Lead>
          Uma imersão para identificar oportunidades, gargalos e o que deve ser feito
          primeiro — antes de investir em ferramentas, marketing ou mudanças.
        </Lead>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Reveal>
          <article className="rounded-3xl bg-white p-7">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Analisamos
            </p>
            <ul className="mt-5 space-y-3 text-lg">
              {analyze.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={80}>
          <article className="rounded-3xl bg-ink p-7 text-white">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Entregamos
            </p>
            <ul className="mt-5 space-y-3 text-lg">
              {deliver.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
      <Reveal>
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <DiagnosticButton source="diagnostico-section" size="lg" variant="accent">
            {site.cta.primary}
          </DiagnosticButton>
          <ButtonLink href="/diagnostico" variant="secondary" size="lg">
            Como funciona o diagnóstico
          </ButtonLink>
        </div>
        <p className="mt-3 text-sm text-muted">{site.cta.formHint}</p>
      </Reveal>
    </Section>
  );
}
