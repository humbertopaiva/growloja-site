"use client";

import { useState } from "react";
import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const faqs = [
  {
    q: "Preciso já ter um e-commerce?",
    a: "Não. Atendemos empresas que ainda vendem só no físico e também quem já tem alguma operação digital. O ponto de partida é o seu cenário atual.",
  },
  {
    q: "Atendem empresas que ainda vendem apenas no físico?",
    a: "Sim. Esse é um dos nossos principais cenários: estruturar a primeira operação de vendas pela internet sem improvisar.",
  },
  {
    q: "Vocês trabalham com empresas de cidades pequenas?",
    a: "Sim. O digital não depende de uma capital. Ajustamos canais, oferta e operação à realidade local da empresa.",
  },
  {
    q: "A Growloja é uma agência?",
    a: "Não. Não somos uma agência de marketing. Somos uma operação de implantação e crescimento de vendas pela internet.",
  },
  {
    q: "Vocês implementam as soluções?",
    a: "Sim. Não entregamos só uma análise. Estruturamos, implantamos e acompanhamos a operação para ela funcionar no dia a dia.",
  },
  {
    q: "Vocês trabalham com marketplaces?",
    a: "Sim, quando faz sentido para o negócio. Mercado Livre, Shopee e outros canais entram na estratégia se forem uma alavanca real — não uma obrigação.",
  },
  {
    q: "Quanto custa?",
    a: "O diagnóstico inicial é gratuito e sem compromisso. Depois dele, propomos a implantação e o acompanhamento com base no cenário da sua empresa.",
  },
  {
    q: "Como funciona o diagnóstico?",
    a: "Em até 15 dias analisamos seu negócio, mercado, concorrência, produtos e presença digital para identificar gargalos, oportunidades e próximos passos.",
  },
  {
    q: "Quanto tempo leva para começar?",
    a: "O diagnóstico inicial acontece em até 15 dias. A implantação começa depois do alinhamento do plano.",
  },
  {
    q: "Vocês acompanham os resultados?",
    a: "Sim. Acompanhamento mensal, reuniões de alinhamento e apresentação de resultados para ajustar o que precisa crescer.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-white">
      <Reveal>
        <Eyebrow>FAQ</Eyebrow>
        <SectionTitle>Perguntas frequentes</SectionTitle>
      </Reveal>
      <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="text-lg font-medium tracking-tight">{item.q}</span>
                <span className="mt-1 text-accent" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen ? (
                <p className="max-w-3xl pb-5 text-muted">{item.a}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
