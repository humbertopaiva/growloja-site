import { DiagnosticButton } from "@/components/DiagnosticButton";
import { ImageQuote } from "@/components/ui/ImageQuote";
import { site } from "@/config/site";

export function FinalCTA() {
  return (
    <section className="bg-paper pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ImageQuote
          src={site.images.cta.src}
          alt={site.images.cta.alt}
          quote="Sua empresa já existe. Agora precisamos descobrir como fazê-la crescer no digital."
          className="min-h-[32rem] aspect-[4/5] sm:aspect-[16/10] sm:min-h-[28rem] md:min-h-[34rem]"
          objectPosition="center 35%"
        >
          <p className="text-base text-white/80 md:text-lg">
            Comece entendendo onde estão as oportunidades.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3">
            <DiagnosticButton source="final-cta" variant="accent">
              {site.cta.primary}
            </DiagnosticButton>
            <p className="text-sm text-white/65">
              Diagnóstico inicial gratuito e sem compromisso.
            </p>
          </div>
        </ImageQuote>
      </div>
    </section>
  );
}
