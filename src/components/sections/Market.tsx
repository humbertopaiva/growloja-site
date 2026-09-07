import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const movements = [
  {
    title: "O consumidor",
    text: "As pessoas descobrem, pesquisam, comparam e compram cada vez mais pela internet.",
  },
  {
    title: "Os marketplaces",
    text: "Mercado Livre, Shopee e outras plataformas aumentam a concorrência pela atenção e pelo cliente.",
  },
  {
    title: "O varejo local",
    text: "Empresas locais precisam usar o digital para continuar relevantes e não depender apenas do fluxo da loja física.",
  },
];

export function Market() {
  return (
    <Section id="mercado" className="bg-white">
      <Reveal>
        <Eyebrow>O mercado está mudando</Eyebrow>
        <SectionTitle>
          Enquanto algumas empresas ainda estão decidindo se devem vender online, seus
          clientes já estão comprando.
        </SectionTitle>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {movements.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <article className="h-full border-t border-ink/10 pt-5">
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
                {item.title}
              </p>
              <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-12 max-w-3xl text-xl font-medium text-ink">
          O digital deixou de ser uma oportunidade futura. Ele já faz parte da decisão de
          compra.
        </p>
      </Reveal>
    </Section>
  );
}
