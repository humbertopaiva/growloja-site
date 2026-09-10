"use client";

import { useState } from "react";
import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const faqs = [
  {
    q: "Já vendo na loja e no WhatsApp. Vocês ainda fazem sentido?",
    a: "Sim. A maior parte das operações que atendemos já vende. O trabalho é conectar canais, tirar trabalho manual do caminho e encontrar onde a operação pode vender melhor.",
  },
  {
    q: "Preciso já ter um e-commerce?",
    a: "Não. O ponto de partida é o seu cenário atual — loja física, WhatsApp, Instagram ou um digital que ainda não se conversa com o resto da operação.",
  },
  {
    q: "Qual a diferença entre Growloja e Lojee?",
    a: "A Growloja cuida do método, do diagnóstico, da estratégia e do acompanhamento. A Lojee é a tecnologia: e-commerce, orçamentos, fidelização, campanhas e outras soluções para o varejo.",
  },
  {
    q: "A Growloja é uma agência?",
    a: "Não no modelo tradicional. Somos uma assessoria para o varejo: entendemos a operação, definimos a estratégia e só então colocamos marketing e tecnologia para funcionar no dia a dia.",
  },
  {
    q: "Vocês implementam as soluções?",
    a: "Sim. Não entregamos só uma análise. Depois do diagnóstico, estruturamos os canais, os processos e a tecnologia para a loja operar melhor.",
  },
  {
    q: "Como funciona o diagnóstico?",
    a: "Analisamos gargalos, oportunidades, canais, processos e possibilidades de automação. Você recebe prioridades e próximos passos — não uma lista genérica de ferramentas.",
  },
  {
    q: "Quanto custa?",
    a: "O diagnóstico inicial é gratuito e sem compromisso. Depois dele, propomos a implantação e o acompanhamento com base no cenário da sua empresa.",
  },
  {
    q: "Vocês acompanham os resultados?",
    a: "Sim. Acompanhamento, alinhamento e ajustes contínuos para a operação continuar evoluindo.",
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
                <span className="mt-1 text-accent-deep" aria-hidden>
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
