export const mapaNav = [
  { slug: "", label: "Visão geral" },
  { slug: "negocio", label: "O negócio" },
  { slug: "cliente", label: "Cliente" },
  { slug: "produtos", label: "Produtos" },
  { slug: "concorrencia", label: "Concorrência" },
  { slug: "digital", label: "Presença digital" },
  { slug: "operacao", label: "Operação" },
  { slug: "maturidade", label: "Maturidade" },
  { slug: "oportunidades", label: "Oportunidades" },
  { slug: "plano", label: "Plano de 90 dias" },
  { slug: "indicadores", label: "Indicadores" },
] as const;

export function mapaPath(token: string, slug = "") {
  return slug ? `/mapa/${token}/${slug}` : `/mapa/${token}`;
}

export const emptyCopy = {
  missing: "Ainda não avaliado.",
  na: "Não aplicável a este diagnóstico.",
};
