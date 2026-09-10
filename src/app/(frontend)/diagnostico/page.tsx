import type { Metadata } from "next";
import { DiagnosticoGrowth } from "@/components/diagnostico/DiagnosticoGrowth";
import { DiagnosticForm } from "@/components/DiagnosticForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCTA } from "@/components/MobileCTA";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Diagnóstico de Crescimento",
  description:
    "Descubra onde sua operação de varejo pode crescer. O Diagnóstico de Crescimento Growloja é uma imersão no negócio para encontrar gargalos, oportunidades e o que fazer primeiro. Gratuito e sem compromisso.",
  alternates: {
    canonical: "/diagnostico",
  },
  openGraph: {
    title: "Diagnóstico de Crescimento | Growloja",
    description:
      "Antes de investir em ferramentas ou marketing, descubra onde está a oportunidade. Diagnóstico gratuito e sem compromisso.",
  },
};

export default function DiagnosticoPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1 bg-paper pb-20 md:pb-0">
        <DiagnosticoGrowth ctaHref="#formulario" />
        <section id="formulario" className="scroll-mt-24 bg-paper py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-deep">
                Solicitar diagnóstico
              </p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
                Antes de investir, descubra onde está a oportunidade.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                Você conhece o seu negócio. Nós ajudamos você a enxergar as oportunidades
                que estão por trás dele.
              </p>
              <p className="mt-6 text-sm text-muted">Gratuito e sem compromisso.</p>
            </div>
            <div className="rounded-3xl border border-ink/8 bg-white p-5 md:p-8">
              <DiagnosticForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCTA />
    </>
  );
}
