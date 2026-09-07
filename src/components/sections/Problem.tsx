import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/Section";
import { ImageQuote } from "@/components/ui/ImageQuote";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

const problems = [
  {
    title: "Pessoas",
    text: "Falta de equipe preparada para cuidar da operação digital.",
  },
  {
    title: "Tecnologia",
    text: "Ferramentas, integrações e processos que precisam ser configurados.",
  },
  {
    title: "Estratégia",
    text: "Dúvidas sobre o que vender, para quem vender, onde vender e como competir.",
  },
  {
    title: "Recursos",
    text: "Uma estrutura própria pode exigir tempo, conhecimento e investimento que muitas empresas não possuem.",
  },
];

export function Problem() {
  return (
    <Section id="problema">
      <Reveal>
        <Eyebrow>O problema</Eyebrow>
        <SectionTitle>Vender pela internet parece simples. Fazer funcionar não é.</SectionTitle>
        <Lead>
          Muitas empresas já perceberam que precisam estar no digital. O problema é
          transformar essa vontade em uma operação que realmente funcione.
        </Lead>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {problems.map((item, index) => (
          <Reveal key={item.title} delay={index * 70}>
            <article className="h-full rounded-2xl border border-ink/8 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-ink/16">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                {item.title}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-ink/85">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-10">
          <ImageQuote
            src={site.images.problema.src}
            alt={site.images.problema.alt}
            quote="Por isso, muitas empresas tentam entrar no digital sem estrutura — e acabam desistindo."
            objectPosition="center 30%"
          />
        </div>
      </Reveal>
    </Section>
  );
}
