import Image from "next/image";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

const method = [
  {
    title: "Entender",
    text: "Seu negócio, clientes, produtos e operação.",
  },
  {
    title: "Criar",
    text: "Estratégias personalizadas para sua realidade.",
  },
  {
    title: "Implementar",
    text: "Marketing, processos e tecnologia.",
  },
  {
    title: "Fidelizar",
    text: "Experiências melhores e relacionamento contínuo.",
  },
  {
    title: "Crescer",
    text: "Mais eficiência, vendas e recorrência.",
  },
];

const examples = [
  {
    q: "Cliente comprou na loja?",
    a: "Criamos uma experiência que o incentive a conhecer seu canal online.",
  },
  {
    q: "Seu vendedor perde tempo montando orçamentos?",
    a: "Criamos um processo digital para receber e organizar essas solicitações.",
  },
  {
    q: "Seus clientes compram uma vez e não voltam?",
    a: "Estruturamos estratégias de relacionamento e fidelização.",
  },
  {
    q: "Seu e-commerce recebe visitas, mas converte pouco?",
    a: "Analisamos a jornada e encontramos pontos de melhoria.",
  },
  {
    q: "Você tem muitos canais, mas eles não conversam?",
    a: "Criamos uma estratégia para conectar a experiência do cliente.",
  },
];

export function PhysicalDigital() {
  return (
    <Section id="estrategia">
      <Reveal>
        <Eyebrow>Estratégia</Eyebrow>
        <SectionTitle>
          Cada loja tem um jeito diferente de vender. Sua estratégia também deve ter.
        </SectionTitle>
        <Lead>
          A Growloja analisa a realidade de cada operação para criar estratégias
          personalizadas que melhoram a experiência de compra, aproximam a marca dos
          seus clientes e criam novas oportunidades de venda.
        </Lead>
      </Reveal>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <Reveal>
            <p className="max-w-xl text-2xl font-medium leading-snug tracking-tight text-ink md:text-3xl">
              Não começamos escolhendo uma ferramenta.
              <span className="mt-3 block">Começamos entendendo o seu negócio.</span>
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Depois, definimos o que pode ser melhorado e quais estratégias e tecnologias
              fazem sentido para colocar isso em prática.
            </p>
          </Reveal>
          <Reveal>
            <ol className="mt-10 rounded-[28px] bg-white p-6 md:p-8">
              {method.map((item, index) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex w-8 shrink-0 flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {index < method.length - 1 ? (
                      <span className="flex flex-1 flex-col items-center">
                        <span className="h-8 w-px bg-accent" aria-hidden />
                      </span>
                    ) : null}
                  </span>
                  <div className={index < method.length - 1 ? "pb-7" : ""}>
                    <p className="text-xl font-medium tracking-tight text-ink">{item.title}</p>
                    <p className="mt-1 leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <Reveal delay={80}>
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[4/3] lg:sticky lg:top-24 lg:aspect-[4/5]">
            <Image
              src={site.images.imersao.src}
              alt={site.images.imersao.alt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-[center_20%]"
            />
          </figure>
        </Reveal>
      </div>

      <Reveal>
        <h3 className="mt-16 max-w-2xl text-2xl font-medium tracking-tight text-ink md:text-3xl">
          Algumas estratégias podem ser simples. Outras, mais estruturais.
        </h3>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {examples.map((item, index) => (
          <Reveal key={item.q} delay={index * 50}>
            <article className="h-full rounded-3xl border border-ink/8 bg-white p-6">
              <p className="text-lg font-medium leading-snug text-ink">{item.q}</p>
              <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-12 max-w-3xl text-2xl font-medium leading-snug tracking-tight text-ink md:text-4xl">
          Não existe uma fórmula Growloja. Existe a estratégia certa para cada operação.
        </p>
      </Reveal>
    </Section>
  );
}
