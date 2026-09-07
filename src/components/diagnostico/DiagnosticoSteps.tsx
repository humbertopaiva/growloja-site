import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import { ImageQuote } from "@/components/ui/ImageQuote";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

const steps = [
  {
    number: "01",
    title: "Conhecemos seu negócio",
    text: "Começamos entendendo como sua empresa realmente funciona.",
    items: [
      "Imersão no negócio",
      "Mix de produtos",
      "Perfil dos clientes",
      "Processos atuais",
      "Equipe e operação",
      "Principais desafios",
    ],
    note: "Quando faz sentido, a análise começa com uma imersão presencial na empresa.",
  },
  {
    number: "02",
    title: "Analisamos o mercado",
    text: "Entendemos o que está acontecendo ao redor da sua empresa.",
    items: [
      "Concorrentes",
      "Preços",
      "Oferta",
      "Tendências",
      "Comportamento do consumidor",
      "Novos canais e oportunidades",
    ],
  },
  {
    number: "03",
    title: "Avaliamos sua operação digital",
    text: "Descobrimos o que está funcionando, o que está impedindo o crescimento e o que ainda não está sendo aproveitado.",
    items: [
      "Google",
      "Instagram",
      "WhatsApp",
      "E-commerce",
      "Marketplaces",
      "SEO",
      "Conversão",
      "Experiência de compra",
    ],
    note: "Avaliamos os canais que você já usa — e identificamos quais realmente fazem sentido para o seu negócio.",
  },
  {
    number: "04",
    title: "Encontramos as oportunidades",
    text: "Cruzamos todas essas informações para descobrir onde existe potencial de crescimento.",
    items: [
      "Gargalos",
      "Oportunidades",
      "Produtos estratégicos",
      "Novos canais",
      "Melhorias de conversão",
      "Estratégias de aquisição e retenção",
    ],
  },
];

export function DiagnosticoSteps() {
  return (
    <Section id="como-funciona-diagnostico" className="bg-white">
      <Reveal>
        <Eyebrow>Como funciona</Eyebrow>
        <SectionTitle>Uma imersão no negócio — não uma reunião de apresentação.</SectionTitle>
      </Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 70}>
            <article className="flex h-full flex-col rounded-3xl border border-ink/8 bg-paper p-6 transition duration-300 hover:-translate-y-0.5 hover:border-ink/16 md:p-7">
              <p className="text-3xl font-medium text-accent">{step.number}</p>
              <h3 className="mt-4 text-xl font-medium tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
              <ul className="mt-5 grid flex-1 gap-2 sm:grid-cols-2">
                {step.items.map((item) => (
                  <li key={item} className="rounded-xl bg-white px-3 py-2 text-sm text-ink/85">
                    {item}
                  </li>
                ))}
              </ul>
              {step.note ? (
                <p className="mt-5 rounded-2xl bg-accent-soft px-4 py-3 text-sm text-ink">
                  {step.note}
                </p>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="mt-10">
          <ImageQuote
            src={site.images.imersao.src}
            alt={site.images.imersao.alt}
            quote="Você conhece o seu negócio. Nós ajudamos você a enxergar as oportunidades que estão por trás dele."
            objectPosition="center 40%"
          />
        </div>
      </Reveal>
    </Section>
  );
}
