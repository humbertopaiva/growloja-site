import { OpportunityCTA, OpportunityHint } from "@/components/diagnostico/OpportunityCTA";
import { Reveal } from "@/components/ui/Reveal";

const flow = [
  "Imersão",
  "Mercado",
  "Operação",
  "Oportunidades",
  "Prioridade",
];

export function DiagnosticoHero({ ctaHref }: { ctaHref?: string }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="reveal text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Diagnóstico de Crescimento
          </p>
          <h1 className="reveal reveal-delay-1 mt-4 max-w-xl text-[2.15rem] font-medium leading-[1.08] tracking-tight text-balance text-ink sm:text-4xl md:text-6xl">
            Descubra onde sua empresa pode crescer.
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Antes de propor qualquer solução, mergulhamos no seu negócio para entender
            como ele funciona hoje, onde estão os gargalos e quais oportunidades podem
            gerar mais vendas.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-col items-stretch sm:items-start">
            <OpportunityCTA source="diagnostico-hero" href={ctaHref} className="w-full sm:w-auto" />
            <OpportunityHint />
          </div>
        </div>
        <Reveal>
          <div className="rounded-[28px] border border-ink/10 bg-white p-4 shadow-[0_24px_80px_rgba(41,26,55,0.08)] md:p-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Imersão no negócio
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {flow.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span
                    className={
                      index === flow.length - 1
                        ? "rounded-full bg-ink px-3 py-1 text-xs font-medium text-white"
                        : "rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-ink"
                    }
                  >
                    {step}
                  </span>
                  {index < flow.length - 1 ? <span className="text-accent">→</span> : null}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-ink p-4 text-white">
                <p className="text-[11px] uppercase tracking-[0.16em] text-accent">
                  Objetivo
                </p>
                <p className="mt-2 text-lg font-medium leading-snug">
                  Encontrar onde existe espaço para crescer — e o que fazer primeiro.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-ink/8 bg-paper p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">Antes</p>
                  <p className="mt-2 text-sm font-medium">Entender o negócio</p>
                </div>
                <div className="rounded-2xl border border-ink/8 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">Depois</p>
                  <p className="mt-2 text-sm font-medium text-accent">Saber por onde começar</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
