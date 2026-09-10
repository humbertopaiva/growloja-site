import Image from "next/image";
import { Eyebrow, Lead, Section, SectionTitle } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

const steps = [
  "O cliente pergunta.",
  "O vendedor responde.",
  "O pedido é anotado.",
  "O orçamento é montado.",
  "A venda acontece.",
  "E depois o cliente vai embora.",
];

export function Problem() {
  return (
    <Section id="problema">
      <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>O problema</Eyebrow>
            <SectionTitle>
              Sua operação já funciona. Mas muita coisa ainda depende de trabalho manual.
            </SectionTitle>
          </Reveal>
          <Reveal>
            <ol className="mt-10">
              {steps.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="flex w-8 shrink-0 flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-medium text-accent-deep ring-1 ring-ink/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {index < steps.length - 1 ? (
                      <span className="h-5 w-px bg-ink/12" aria-hidden />
                    ) : null}
                  </span>
                  <p className="pt-1 text-lg text-ink">{item}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal>
            <Lead className="mt-8">
              A Growloja encontra onde a tecnologia e a estratégia podem tirar trabalho do
              caminho e criar novas oportunidades de venda.
            </Lead>
          </Reveal>
        </div>
        <Reveal delay={80}>
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src={site.images.problema.src}
              alt={site.images.problema.alt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-[center_15%]"
            />
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
