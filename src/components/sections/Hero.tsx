import { DiagnosticButton } from "@/components/DiagnosticButton";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="pointer-events-none absolute inset-0 grid-fade" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="reveal max-w-xl text-[11px] font-medium uppercase tracking-[0.14em] text-accent md:text-xs md:tracking-[0.18em]">
            Implantação e crescimento de vendas pela internet
          </p>
          <h1 className="reveal reveal-delay-1 mt-4 max-w-xl text-[2.15rem] font-medium leading-[1.08] tracking-tight text-balance text-ink sm:text-4xl md:text-6xl">
            {site.tagline}
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Da estratégia à implantação: estruturamos processos, canais, ferramentas e
            estratégias para transformar negócios que já existem no físico em operações
            capazes de vender e crescer no digital.
          </p>
          <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <DiagnosticButton source="hero">{site.cta.primary}</DiagnosticButton>
            <ButtonLink href="/#como-funciona" variant="secondary" size="lg">
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
      <div className="rounded-[28px] border border-ink/10 bg-white p-4 shadow-[0_24px_80px_rgba(41,26,55,0.08)] md:p-6">
        <div className="mb-5 flex flex-wrap gap-2">
          {["Loja física", "Digital", "Vendas", "Crescimento"].map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span
                className={
                  index === 3
                    ? "rounded-full bg-ink px-3 py-1 text-xs font-medium text-white"
                    : "rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-ink"
                }
              >
                {step}
              </span>
              {index < 3 ? <span className="text-accent">→</span> : null}
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl bg-ink p-4 text-white">
            <p className="text-[11px] uppercase tracking-[0.16em] text-accent">Operação física</p>
            <Storefront />
            <p className="mt-3 text-sm text-white/70">Vitrine, estoque e atendimento local.</p>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-ink/8 bg-paper p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">Pedidos</p>
                <span className="text-xs text-accent">ao vivo</span>
              </div>
              <p className="mt-2 text-3xl font-medium">24</p>
              <div className="mt-3 h-12">
                <svg viewBox="0 0 160 48" className="h-full w-full" aria-hidden>
                  <path
                    d="M0 38 C18 36 24 22 40 24 C56 26 62 12 80 14 C98 16 108 28 124 18 C140 8 148 10 160 6"
                    fill="none"
                    stroke="#b177ff"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Metric label="Conversão" value="3,2%" />
              <Metric label="Crescimento" value="+18%" highlight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className={`mt-2 text-2xl font-medium ${highlight ? "text-accent" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}

function Storefront() {
  return (
    <svg viewBox="0 0 180 92" className="mt-4 h-24 w-full" aria-hidden>
      <rect x="18" y="28" width="144" height="56" rx="6" fill="#3a2650" />
      <rect x="8" y="20" width="164" height="14" rx="4" fill="#b177ff" />
      <rect x="36" y="42" width="36" height="28" rx="3" fill="#efe4ff" />
      <rect x="80" y="42" width="36" height="28" rx="3" fill="#efe4ff" />
      <rect x="124" y="48" width="22" height="36" rx="3" fill="#291a37" />
    </svg>
  );
}
