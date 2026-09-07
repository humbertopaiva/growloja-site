import { OpportunityCTA } from "@/components/diagnostico/OpportunityCTA";
import { ImageQuote } from "@/components/ui/ImageQuote";
import { site } from "@/config/site";

export function DiagnosticoClose({ ctaHref }: { ctaHref?: string }) {
  return (
    <section className="bg-paper pb-8 md:pb-12">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ImageQuote
          src={site.images.diagnosticoClose.src}
          alt={site.images.diagnosticoClose.alt}
          quote="Saia do diagnóstico sabendo exatamente onde começar."
          className="min-h-[32rem] aspect-[4/5] sm:aspect-[16/10] sm:min-h-[28rem] md:min-h-[34rem]"
          objectPosition="center 30%"
        >
          <p className="text-base text-white/80 md:text-lg">
            Você sai sabendo onde está, o que está impedindo o crescimento e quais
            deveriam ser os próximos passos.
          </p>
          <div className="mt-6 flex flex-col items-start gap-3">
            <OpportunityCTA source="diagnostico-close" href={ctaHref} />
            <p className="text-sm text-white/65">
              Diagnóstico inicial gratuito e sem compromisso.
            </p>
          </div>
        </ImageQuote>
      </div>
    </section>
  );
}
