import Image from "next/image";
import { DiagnosticButton } from "@/components/DiagnosticButton";
import { site } from "@/config/site";

export function FinalCTA() {
  return (
    <section className="bg-paper pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="overflow-hidden rounded-[28px] bg-ink text-white lg:grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-[32rem]">
            <Image
              src={site.images.cta.src}
              alt={site.images.cta.alt}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover object-[center_20%]"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="max-w-md text-3xl font-medium leading-[1.12] tracking-tight md:text-4xl">
              Sua loja já existe.
              <span className="mt-2 block">Agora, descubra onde ela pode evoluir.</span>
            </h2>
            <div className="mt-8 flex flex-col items-stretch gap-3">
              <DiagnosticButton source="final-cta" variant="accent">
                {site.cta.primary}
              </DiagnosticButton>
              <p className="text-sm text-white/65">{site.cta.formHint}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
