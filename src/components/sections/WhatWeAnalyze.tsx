import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const blocks = [
  { title: "Mercado", text: "Pesquisa de mercado e tendências." },
  { title: "Concorrência", text: "Preços, produtos, posicionamento e estratégias." },
  { title: "Clientes", text: "Comportamento, necessidades e oportunidades." },
  { title: "Portfólio", text: "Produtos, margens, demanda e oportunidades." },
  { title: "Digital", text: "E-commerce, SEO, conversão e canais." },
  { title: "Operação", text: "Processos, automação, ferramentas e eficiência." },
];

export function WhatWeAnalyze() {
  return (
    <Section id="analise" className="bg-white">
      <Reveal>
        <Eyebrow>O que analisamos</Eyebrow>
        <SectionTitle>
          Antes de decidir o que fazer, precisamos entender onde está a oportunidade.
        </SectionTitle>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((item, index) => (
          <Reveal key={item.title} delay={index * 50}>
            <article className="h-full rounded-2xl bg-paper p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {item.title}
              </p>
              <p className="mt-3 text-lg text-ink">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-10 text-xl font-medium text-ink">
          Transformamos essas informações em decisões práticas para o negócio.
        </p>
      </Reveal>
    </Section>
  );
}
