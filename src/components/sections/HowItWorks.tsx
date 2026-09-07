import { DiagnosticButton } from "@/components/DiagnosticButton";
import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Mapear",
    text: "Entendemos o negócio, o mercado, os clientes e a operação atual.",
  },
  {
    number: "02",
    title: "Estrategizar",
    text: "Identificamos oportunidades e definimos prioridades, canais, metas e KPIs.",
  },
  {
    number: "03",
    title: "Implantar",
    text: "Configuramos ferramentas, processos, canais e automações necessários.",
  },
  {
    number: "04",
    title: "Crescer",
    text: "Medimos resultados, executamos melhorias e encontramos novas oportunidades.",
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona">
      <Reveal>
        <Eyebrow>Como funciona</Eyebrow>
        <SectionTitle>Do diagnóstico ao crescimento.</SectionTitle>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((item, index) => (
          <Reveal key={item.number} delay={index * 70}>
            <article className="relative h-full border-t border-ink/12 pt-5">
              <p className="text-4xl font-medium text-accent">{item.number}</p>
              <h3 className="mt-4 text-xl font-medium">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-12 flex flex-col gap-6 rounded-3xl bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="text-lg font-medium">Diagnóstico inicial em até 15 dias.</p>
            <p className="mt-2 max-w-xl text-muted">
              Depois do diagnóstico: acompanhamento mensal, reuniões de alinhamento e
              apresentação de resultados.
            </p>
          </div>
          <DiagnosticButton source="como-funciona">Solicitar diagnóstico</DiagnosticButton>
        </div>
      </Reveal>
    </Section>
  );
}
