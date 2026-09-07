import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    title: "Entender",
    text: "Analisamos seu negócio, mercado, clientes e concorrentes.",
  },
  {
    title: "Estruturar",
    text: "Definimos canais, produtos, preços, ofertas, processos e ferramentas.",
  },
  {
    title: "Implantar",
    text: "Colocamos a operação para funcionar.",
  },
  {
    title: "Crescer",
    text: "Acompanhamos resultados, identificamos oportunidades e ajustamos continuamente a estratégia.",
  },
];

export function WhatWeAre() {
  return (
    <Section id="sobre" className="bg-white">
      <Reveal>
        <Eyebrow>O que somos</Eyebrow>
        <SectionTitle>É aqui que entra a Growloja.</SectionTitle>
        <Lead>
          A Growloja é uma operação de implantação e crescimento de vendas pela internet.
          Funcionamos como um departamento de inteligência, estratégia e execução digital
          para pequenas e médias empresas.
        </Lead>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-4">
        {pillars.map((item, index) => (
          <Reveal key={item.title} delay={index * 70}>
            <article className="h-full rounded-2xl border border-ink/8 p-5">
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-xl font-medium">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-10 flex flex-col items-start gap-2 text-sm font-medium text-ink">
          {pillars.map((item, index) => (
            <span key={item.title} className="flex flex-col items-start gap-2">
              <span className="rounded-full bg-paper-2 px-4 py-2">{item.title}</span>
              {index < pillars.length - 1 ? <span className="ml-6 text-accent">↓</span> : null}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
