import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const deliveries = [
  {
    title: "Diagnóstico",
    items: ["Cenário atual", "Mercado", "Concorrência", "Produtos", "Preços", "Presença digital"],
  },
  {
    title: "Estratégia",
    items: ["Canais", "Ofertas", "Posicionamento", "Metas", "KPIs", "Plano de ação"],
  },
  {
    title: "Implantação",
    items: ["Ferramentas", "Processos", "Marketing", "Automações", "IA", "Integrações"],
  },
  {
    title: "Acompanhamento",
    items: ["Resultados", "Otimizações", "Novas oportunidades", "Reuniões", "Suporte"],
  },
];

export function WhatWeDeliver() {
  return (
    <Section id="solucoes">
      <Reveal>
        <Eyebrow>O que entregamos</Eyebrow>
        <SectionTitle>
          Você não recebe só uma campanha. Recebe uma assessoria que acompanha a operação.
        </SectionTitle>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {deliveries.map((item, index) => (
          <Reveal key={item.title} delay={index * 70}>
            <article className="h-full rounded-3xl border border-ink/8 bg-white p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent-deep">
                {item.title}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink/80">
                {item.items.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
