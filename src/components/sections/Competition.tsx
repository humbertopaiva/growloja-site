import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const rivals = [
  "Loja local",
  "Outra loja local",
  "Marketplaces",
  "Grandes varejistas",
  "Novos concorrentes digitais",
];

const paths = [
  "Diferenciação",
  "Relacionamento",
  "Fidelização",
  "Conveniência",
  "Entrega local",
  "Ofertas exclusivas",
  "Benefícios",
  "Experiência",
  "Recorrência",
  "Comunidade",
];

export function Competition() {
  return (
    <Section id="competicao" className="bg-white">
      <Reveal>
        <Eyebrow>Competição digital</Eyebrow>
        <SectionTitle>Seu concorrente não está mais apenas na cidade ao lado.</SectionTitle>
      </Reveal>
      <div className="mt-10 flex flex-wrap items-center gap-2">
        {rivals.map((item, index) => (
          <Reveal key={item} delay={index * 50}>
            <div className="flex items-center gap-2">
              <span className="rounded-2xl bg-paper-2 px-4 py-3 text-sm font-medium text-ink">
                {item}
              </span>
              {index < rivals.length - 1 ? (
                <span className="text-xs uppercase tracking-[0.14em] text-accent">vs</span>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <h3 className="mt-12 text-2xl font-medium tracking-tight">
          Como competir sem entrar em uma guerra de preço?
        </h3>
      </Reveal>
      <div className="mt-6 flex flex-wrap gap-2">
        {paths.map((item) => (
          <span
            key={item}
            className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm"
          >
            {item}
          </span>
        ))}
      </div>
      <Reveal>
        <p className="mt-10 max-w-3xl text-xl font-medium text-ink">
          O objetivo não é competir com os grandes em tudo. É descobrir onde sua empresa
          pode ser melhor.
        </p>
      </Reveal>
    </Section>
  );
}
