import Image from "next/image";
import { OpportunityCTA, OpportunityHint } from "@/components/diagnostico/OpportunityCTA";
import { site } from "@/config/site";

export function DiagnosticoHero({ ctaHref }: { ctaHref?: string }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="reveal text-xs font-medium uppercase tracking-[0.18em] text-accent-deep">
            Diagnóstico de Crescimento
          </p>
          <h1 className="reveal reveal-delay-1 mt-4 max-w-xl text-[2.15rem] font-medium leading-[1.08] tracking-tight text-balance text-ink sm:text-4xl md:text-6xl">
            Descubra onde sua empresa pode crescer.
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Unimos estratégia, marketing e tecnologia para encontrar onde a loja pode
            crescer — e o que fazer primeiro.
          </p>
          <div data-fold-cta className="reveal reveal-delay-3 mt-8 flex flex-col items-stretch lg:items-start">
            <OpportunityCTA source="diagnostico-hero" href={ctaHref} />
            <OpportunityHint />
          </div>
        </div>
        <div className="reveal reveal-delay-2 relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-ink/10 shadow-[0_24px_80px_rgba(23,26,22,0.08)]">
            <Image
              src={site.images.diagnosticoHero.src}
              alt={site.images.diagnosticoHero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover object-[center_30%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
