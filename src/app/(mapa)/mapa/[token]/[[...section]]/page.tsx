import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapaShell } from "@/components/mapa/MapaShell";
import {
  BusinessSection,
  CompetitorsSection,
  CustomerSection,
  DigitalSection,
  KpisSection,
  MaturitySection,
  OperationSection,
  OpportunitiesSection,
  Overview,
  PlanSection,
  ProductsSection,
} from "@/components/mapa/sections";
import { mapaNav } from "@/components/mapa/nav";
import { getShareableDiagnostic } from "@/lib/diagnostic/getPublishedDiagnostic";

export const dynamic = "force-dynamic";

const sections = {
  "": Overview,
  negocio: BusinessSection,
  cliente: CustomerSection,
  produtos: ProductsSection,
  concorrencia: CompetitorsSection,
  digital: DigitalSection,
  operacao: OperationSection,
  maturidade: MaturitySection,
  oportunidades: OpportunitiesSection,
  plano: PlanSection,
  indicadores: KpisSection,
} as const;

type PageProps = {
  params: Promise<{ token: string; section?: string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  const result = await getShareableDiagnostic(token);
  const company = result?.diagnostic.tradeName || result?.diagnostic.companyName;

  return {
    title: company ? `Mapa de Crescimento · ${company}` : "Mapa de Crescimento",
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function MapaPage({ params }: PageProps) {
  const { token, section } = await params;
  const slug = section?.[0] || "";
  if (slug && !mapaNav.some((item) => item.slug === slug)) notFound();

  const result = await getShareableDiagnostic(token);
  if (!result) notFound();

  const { diagnostic, isPreview } = result;
  const current = mapaNav.find((item) => item.slug === slug)?.slug || "";
  const View = sections[current as keyof typeof sections] || Overview;

  return (
    <MapaShell
      token={token}
      companyName={diagnostic.tradeName || diagnostic.companyName}
      current={current}
      isDemo={diagnostic.isDemo}
      isPreview={isPreview}
    >
      {current === "" ? (
        <Overview diagnostic={diagnostic} token={token} />
      ) : (
        <View diagnostic={diagnostic} token={token} />
      )}
    </MapaShell>
  );
}
