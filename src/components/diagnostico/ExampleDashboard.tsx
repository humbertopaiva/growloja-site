"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const scores = [
  { label: "Estratégia", value: 68 },
  { label: "Presença digital", value: 42 },
  { label: "Operação", value: 51 },
  { label: "Aquisição", value: 37 },
  { label: "Retenção", value: 63 },
];

const opportunities = [
  {
    number: "01",
    title: "Criar uma operação de vendas pelo WhatsApp",
    tag: "Alto impacto · Baixo esforço",
  },
  {
    number: "02",
    title: "Reduzir e reorganizar o mix inicial do e-commerce",
    tag: "Alto impacto · Médio esforço",
  },
  {
    number: "03",
    title: "Criar estratégia de recompra",
    tag: "Médio impacto · Baixo esforço",
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function useCount(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const frame = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(frame);
    }

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

export function ExampleDashboard() {
  const { ref, visible } = useInView<HTMLDivElement>();
  const score = useCount(54, visible);

  return (
    <Section id="exemplo" className="bg-white">
      <Reveal>
        <Eyebrow>Exemplo ilustrativo</Eyebrow>
        <SectionTitle>Um exemplo do que você pode descobrir</SectionTitle>
      </Reveal>
      <Reveal>
        <div
          ref={ref}
          className="relative mt-12 overflow-hidden rounded-[28px] bg-ink p-5 text-white shadow-[0_24px_80px_rgba(41,26,55,0.18)] md:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-accent">
                Mapa de Crescimento Growloja
              </p>
              <h3 className="mt-2 text-xl font-medium md:text-2xl">Maturidade digital</h3>
            </div>
            <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
              Exemplo ilustrativo
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div className="text-center lg:text-left">
              <p className="text-6xl font-medium tracking-tight md:text-7xl" aria-live="polite">
                {score}
                <span className="text-3xl text-white/45">/100</span>
              </p>
              <p className="mt-3 text-sm text-white/55">
                Leitura inicial da operação — não é uma nota, é um ponto de partida.
              </p>
            </div>
            <div className="space-y-4">
              {scores.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="text-white/55">{item.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={cn(
                        "h-full rounded-full bg-accent transition-all duration-1000 ease-out",
                        visible ? "opacity-100" : "opacity-0",
                      )}
                      style={{ width: visible ? `${item.value}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              3 maiores oportunidades
            </p>
            <ol className="mt-5 space-y-4">
              {opportunities.map((item, index) => (
                <li
                  key={item.number}
                  className="rounded-2xl bg-white/6 p-4 transition duration-500"
                  style={{
                    transitionDelay: visible ? `${400 + index * 120}ms` : "0ms",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(8px)",
                  }}
                >
                  <p className="text-xs text-accent">{item.number}</p>
                  <p className="mt-1 font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-white/55">{item.tag}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">
          Esse recorte é fictício. Cada empresa recebe um mapa diferente, a partir do
          próprio negócio.
        </p>
      </Reveal>
    </Section>
  );
}
