import { DiagnosticoClose } from "@/components/diagnostico/DiagnosticoClose";
import { DiagnosticoHero } from "@/components/diagnostico/DiagnosticoHero";
import { DiagnosticoSteps } from "@/components/diagnostico/DiagnosticoSteps";
import { ExampleDashboard } from "@/components/diagnostico/ExampleDashboard";
import { GrowthMap } from "@/components/diagnostico/GrowthMap";
import { NotJustAnalysis } from "@/components/diagnostico/NotJustAnalysis";

export function DiagnosticoGrowth({ ctaHref }: { ctaHref?: string }) {
  return (
    <>
      <DiagnosticoHero ctaHref={ctaHref} />
      <DiagnosticoSteps />
      <GrowthMap />
      <ExampleDashboard />
      <NotJustAnalysis />
      <DiagnosticoClose ctaHref={ctaHref} />
    </>
  );
}
