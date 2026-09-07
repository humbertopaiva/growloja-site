import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const flow = [
  "Onde você está",
  "Onde quer chegar",
  "O que está impedindo o crescimento",
  "Quais oportunidades existem",
  "O que deve ser feito primeiro",
];

export function Differential() {
  return (
    <Section id="diferencial">
      <Reveal>
        <Eyebrow>Diferencial</Eyebrow>
        <SectionTitle>Cada empresa recebe uma estratégia diferente.</SectionTitle>
        <Lead>
          Uma loja de materiais de construção não vende como uma loja de moda. Um
          supermercado não possui a mesma operação de uma loja de suplementos. E uma
          empresa de uma cidade pequena enfrenta desafios diferentes de uma grande
          operação nacional.
        </Lead>
      </Reveal>
      <Reveal>
        <p className="mt-8 text-2xl font-medium tracking-tight text-ink">
          Não acreditamos em receita pronta.
        </p>
      </Reveal>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        {flow.map((item, index) => (
          <Reveal key={item} delay={index * 60}>
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium">
                {item}
              </span>
              {index < flow.length - 1 ? <span className="hidden text-accent sm:inline">→</span> : null}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">
          Utilizamos ferramentas próprias, automação e inteligência artificial nos
          bastidores para analisar informações e adaptar as soluções à realidade de cada
          empresa.
        </p>
      </Reveal>
    </Section>
  );
}
