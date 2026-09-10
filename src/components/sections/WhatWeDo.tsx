import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const nodes = ["Loja física", "E-commerce", "WhatsApp", "Marketing", "Clientes"];

const pillars = [
  {
    title: "Vender",
    text: "E-commerce e canais digitais.",
    icon: StoreIcon,
  },
  {
    title: "Agilizar",
    text: "Orçamentos, pedidos e automações.",
    icon: FlowIcon,
  },
  {
    title: "Relacionar",
    text: "Fidelização, campanhas e recompra.",
    icon: LoopIcon,
  },
  {
    title: "Analisar",
    text: "Dados para tomar melhores decisões.",
    icon: InsightIcon,
  },
];

export function WhatWeDo() {
  return (
    <Section id="o-que-fazemos" className="bg-white">
      <Reveal>
        <Eyebrow>O que fazemos</Eyebrow>
        <SectionTitle>Conectamos os pontos da sua operação.</SectionTitle>
        <Lead>
          Vendas, marketing e tecnologia deixam de funcionar isolados. A Growloja
          enxerga o sistema inteiro e mostra por onde ele pode fluir melhor.
        </Lead>
      </Reveal>

      <Reveal>
        <div className="mt-12 rounded-[28px] border border-ink/8 bg-paper p-5 md:p-8">
          <p className="mb-5 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            Uma operação só
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
            {nodes.map((node, index) => (
              <div key={node} className="flex items-center gap-2">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-[0_1px_0_rgba(23,26,22,0.04)] ring-1 ring-ink/8">
                  {node}
                </span>
                {index < nodes.length - 1 ? (
                  <span className="hidden text-accent-deep sm:inline" aria-hidden>
                    ↔
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((item, index) => (
          <Reveal key={item.title} delay={index * 70}>
            <article className="h-full rounded-3xl border border-ink/8 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-ink/16">
              <item.icon />
              <h3 className="mt-5 text-xl font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function StoreIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
      <rect x="4" y="14" width="24" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-ink" />
      <path d="M4 14l3-8h18l3 8" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-ink" />
      <path d="M16 18v10" stroke="#719d17" strokeWidth="1.6" />
    </svg>
  );
}

function FlowIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
      <path
        d="M5 22c4-10 6-4 11-10s6 2 11-6"
        fill="none"
        stroke="#719d17"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M24 6h4v4" fill="none" stroke="#719d17" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LoopIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
      <circle cx="11" cy="16" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-ink" />
      <circle cx="21" cy="16" r="5" fill="none" stroke="#719d17" strokeWidth="1.6" />
    </svg>
  );
}

function InsightIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
      <circle cx="16" cy="16" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-ink" />
      <circle cx="16" cy="16" r="3" fill="#719d17" />
    </svg>
  );
}
