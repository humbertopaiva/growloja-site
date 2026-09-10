import { DiagnosticButton } from "@/components/DiagnosticButton";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

const analyze = [
  "Gargalos",
  "Oportunidades",
  "Canais",
  "Processos",
  "Possibilidades de automação",
  "Estratégias de crescimento",
];

export function Diagnosis() {
  return (
    <Section id="diagnostico">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Diagnóstico de Crescimento Growloja</Eyebrow>
          <SectionTitle>
            Antes de escolher uma ferramenta, descubra o que sua operação realmente precisa.
          </SectionTitle>
          <Lead>
            Analisamos sua operação para identificar o que está travando o crescimento e o
            que pode ser feito primeiro. Você recebe prioridades e próximos passos — não
            uma lista genérica de ferramentas.
          </Lead>
          <div className="mt-8 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
            <DiagnosticButton source="diagnostico-section" size="lg" variant="accent">
              Quero fazer meu diagnóstico
            </DiagnosticButton>
            <ButtonLink href="/diagnostico" variant="secondary" size="lg">
              {site.cta.secondary}
            </ButtonLink>
          </div>
          <p className="mt-3 text-sm text-muted">{site.cta.formHint}</p>
        </Reveal>
        <Reveal delay={80}>
          <article className="rounded-3xl bg-white p-7 md:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent-deep">
              Analisamos
            </p>
            <ul className="mt-5 space-y-3">
              {analyze.map((item) => (
                <li key={item} className="flex items-center gap-3 text-lg text-ink">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-deep" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
