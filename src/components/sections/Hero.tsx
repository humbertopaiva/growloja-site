import Image from "next/image";
import { DiagnosticButton } from "@/components/DiagnosticButton";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";

const channels = ["Loja", "WhatsApp", "Instagram", "Digital"];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <h1 className="reveal max-w-xl text-[2.15rem] font-medium leading-[1.08] tracking-tight text-balance text-ink sm:text-4xl md:text-6xl">
            Sua loja já vende. Vamos fazer sua operação vender melhor.
          </h1>
          <p className="reveal reveal-delay-1 mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Você já vende na loja, pelo WhatsApp, Instagram ou outros canais. A Growloja
            identifica gargalos e oportunidades e estrutura estratégias que conectam
            vendas, marketing e tecnologia.
          </p>
          <div className="reveal reveal-delay-2 mt-8 flex flex-col gap-3 lg:flex-row lg:flex-wrap">
            <div data-fold-cta className="w-full lg:w-auto">
              <DiagnosticButton source="hero" className="whitespace-nowrap">
                {site.cta.primary}
              </DiagnosticButton>
            </div>
            <ButtonLink
              href="/diagnostico"
              variant="secondary"
              size="lg"
              className="whitespace-nowrap"
            >
              {site.cta.secondary}
            </ButtonLink>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="reveal reveal-delay-2 relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-ink/10 shadow-[0_24px_80px_rgba(23,26,22,0.08)]">
        <Image
          src={site.images.hero.src}
          alt={site.images.hero.alt}
          fill
          priority
          sizes="(min-width: 1024px) 540px, 100vw"
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-ink/70 via-ink/25 to-transparent p-4 sm:block md:p-5">
          <ChannelStrip />
        </div>
      </div>
      <div className="mt-4 sm:hidden">
        <ChannelStrip />
      </div>
    </div>
  );
}

function ChannelStrip() {
  return (
    <div className="rounded-2xl bg-white/95 p-4 shadow-[0_8px_32px_rgba(23,26,22,0.12)] backdrop-blur-sm">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Operação conectada</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {channels.map((channel, index) => (
          <div key={channel} className="flex items-center gap-2">
            <span
              className={
                index === channels.length - 1
                  ? "rounded-full bg-ink px-3 py-1 text-xs font-medium text-white"
                  : "rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-ink"
              }
            >
              {channel}
            </span>
            {index < channels.length - 1 ? (
              <span className="text-accent-deep" aria-hidden>
                ↔
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
