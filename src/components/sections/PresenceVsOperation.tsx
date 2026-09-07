import { Eyebrow, Section, SectionTitle } from "@/components/ui/Section";
import { ImageQuote } from "@/components/ui/ImageQuote";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/config/site";

const presence = ["Instagram", "Site", "WhatsApp", "Catálogo", "Marketplace"];
const operation = [
  "Produtos",
  "Preços",
  "Ofertas",
  "Canais",
  "Atendimento",
  "Pagamento",
  "Entrega",
  "Pós-venda",
  "Recompra",
  "Métricas",
];

export function PresenceVsOperation() {
  return (
    <Section id="presenca">
      <Reveal>
        <Eyebrow>Presença digital não é operação digital</Eyebrow>
        <SectionTitle>Estar na internet não significa vender pela internet.</SectionTitle>
      </Reveal>
      <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
        <Reveal>
          <div className="h-full rounded-3xl border border-ink/8 bg-white p-7">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Presença digital
            </p>
            <ul className="mt-6 space-y-3">
              {presence.map((item) => (
                <li key={item} className="rounded-xl bg-paper px-4 py-3 text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="flex items-center justify-center py-2">
          <span className="rounded-full bg-ink px-4 py-2 text-xs font-medium tracking-[0.14em] text-white">
            ≠
          </span>
        </div>
        <Reveal delay={80}>
          <div className="h-full rounded-3xl bg-ink p-7 text-white">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Operação digital
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {operation.map((item) => (
                <li key={item} className="rounded-xl bg-white/6 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <Reveal>
        <div className="mt-10">
          <ImageQuote
            src={site.images.operacao.src}
            alt={site.images.operacao.alt}
            quote="Uma operação digital precisa funcionar como um negócio — não apenas como uma vitrine."
            objectPosition="center 20%"
          />
        </div>
      </Reveal>
    </Section>
  );
}
