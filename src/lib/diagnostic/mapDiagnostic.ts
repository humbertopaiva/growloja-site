import type { DiagnosticView, Level } from "./types";

type LooseRecord = Record<string, unknown>;

function text(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

function num(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function list(value: unknown): LooseRecord[] {
  return Array.isArray(value) ? (value as LooseRecord[]) : [];
}

function items(value: unknown) {
  return list(value)
    .map((entry) => text(entry.item))
    .filter((entry): entry is string => Boolean(entry));
}

const channelLabels: Record<string, string> = {
  google: "Google",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  website: "Website",
  ecommerce: "E-commerce",
  marketplace: "Marketplace",
  seo: "SEO",
  outro: "Outro",
};

const areaLabels: Record<string, string> = {
  estoque: "Estoque",
  gestao_produtos: "Gestão de produtos",
  separacao: "Separação",
  embalagem: "Embalagem",
  entrega: "Entrega",
  atendimento: "Atendimento",
  pos_venda: "Pós-venda",
  trocas: "Trocas",
  sistemas: "Sistemas",
  equipe: "Equipe",
  processos: "Processos",
};

function quadrant(potential?: string | null, effort?: string | null) {
  if (potential === "alto" && effort === "baixo") return "fazerAgora";
  if (potential === "alto" && effort === "alto") return "planejar";
  if (potential === "baixo" && effort === "baixo") return "experimentar";
  if (potential === "baixo" && effort === "alto") return "evitar";
  if (potential === "alto" && effort === "medio") return "planejar";
  if (potential === "medio" && effort === "baixo") return "fazerAgora";
  if (potential === "medio" && effort === "medio") return "planejar";
  if (potential === "medio" && effort === "alto") return "evitar";
  if (potential === "baixo" && effort === "medio") return "experimentar";
  return "planejar";
}

function clientName(value: unknown) {
  if (value && typeof value === "object") {
    const client = value as LooseRecord;
    return text(client.companyName) || text(client.tradeName) || "Cliente";
  }
  return "Cliente";
}

function clientField(value: unknown, field: string) {
  if (value && typeof value === "object") {
    return text((value as LooseRecord)[field]);
  }
  return null;
}

export function mapDiagnostic(doc: LooseRecord): DiagnosticView {
  const dimensions = list(doc.maturityDimensions).map((item) => ({
    name: text(item.name) || "Dimensão",
    score: num(item.score) ?? 0,
    description: text(item.description),
    evidence: text(item.evidence),
    recommendation: text(item.recommendation),
  }));

  const opportunities = list(doc.opportunities).map((item, index) => ({
    id: String(item.id ?? index),
    title: text(item.title) || "Oportunidade",
    description: text(item.description),
    evidence: text(item.evidence),
    potential: (text(item.potential) as Level | null) || null,
    effort: (text(item.effort) as Level | null) || null,
    priority: text(item.priority),
    category: text(item.category),
    recommendation: text(item.recommendation),
    expectedImpact: text(item.expectedImpact),
    status: text(item.status),
  }));

  const matrix = {
    fazerAgora: opportunities.filter((item) => quadrant(item.potential, item.effort) === "fazerAgora"),
    planejar: opportunities.filter((item) => quadrant(item.potential, item.effort) === "planejar"),
    experimentar: opportunities.filter((item) => quadrant(item.potential, item.effort) === "experimentar"),
    evitar: opportunities.filter((item) => quadrant(item.potential, item.effort) === "evitar"),
  };

  const topOpportunities = [...opportunities]
    .filter((item) => item.status !== "descartada")
    .sort((a, b) => {
      const rank = (value?: string | null) => (value === "agora" ? 0 : value === "proximo" ? 1 : 2);
      const impact = (value?: string | null) => (value === "alto" ? 0 : value === "medio" ? 1 : 2);
      const effort = (value?: string | null) => (value === "baixo" ? 0 : value === "medio" ? 1 : 2);
      return rank(a.priority) - rank(b.priority) || impact(a.potential) - impact(b.potential) || effort(a.effort) - effort(b.effort);
    })
    .slice(0, 5);

  const lowest = [...dimensions].sort((a, b) => a.score - b.score).slice(0, 2);
  const evolutionInsight =
    text(doc.evolutionInsight) ||
    (lowest.length
      ? `Seu maior espaço de evolução está em ${lowest.map((item) => item.name.toLowerCase()).join(" e ")}.`
      : "Ainda estamos organizando as dimensões deste diagnóstico.");

  const planActions = list(doc.planActions).map((item) => ({
    phase: text(item.phase) || "0-30",
    title: text(item.title) || "Ação",
    description: text(item.description),
    responsible: text(item.responsible),
    deadline: text(item.deadline),
    priority: text(item.priority),
    status: text(item.status),
    relatedOpportunity: text(item.relatedOpportunity),
  }));

  return {
    id: (doc.id as string | number) ?? "",
    title: text(doc.title) || "Diagnóstico de Crescimento",
    shareToken: text(doc.shareToken) || "",
    status: (text(doc.status) as DiagnosticView["status"]) || "draft",
    isDemo: Boolean(doc.isDemo),
    diagnosticDate: text(doc.diagnosticDate),
    analyst: text(doc.analyst),
    companyName: clientName(doc.client),
    tradeName: clientField(doc.client, "tradeName"),
    segment: clientField(doc.client, "segment"),
    city: clientField(doc.client, "city"),
    headline: text(doc.headline),
    summaryDescription: text(doc.summaryDescription),
    executiveSummary: text(doc.executiveSummary),
    diagnosticStatement: text(doc.diagnosticStatement),
    generalConclusion: text(doc.generalConclusion),
    evolutionInsight,
    digitalMaturityScore: num(doc.digitalMaturityScore),
    keyFindings: list(doc.keyFindings).map((item) => ({
      title: text(item.title) || "Achado",
      description: text(item.description),
      importance: text(item.importance),
      category: text(item.category),
    })),
    business: {
      overview: text(doc.businessOverview),
      marketPosition: text(doc.marketPosition),
      mainProducts: text(doc.mainProducts),
      averageTicket: text(doc.averageTicket),
      salesVolume: text(doc.salesVolume),
      revenue: text(doc.revenue),
      channels: text(doc.channels),
      teamSize: text(doc.teamSize),
      operationalNotes: text(doc.operationalNotes),
      customMetrics: list(doc.customMetrics).map((item) => ({
        label: text(item.label) || "Métrica",
        value: text(item.value),
        note: text(item.note),
      })),
    },
    customer: {
      profile: text(doc.customerProfile),
      motivations: items(doc.purchaseMotivations),
      barriers: items(doc.purchaseBarriers),
      purchaseChannels: items(doc.purchaseChannels),
      insights: list(doc.customerInsights).map((item) => ({
        title: text(item.title) || "Insight",
        description: text(item.description),
        evidence: text(item.evidence),
        opportunity: text(item.opportunity),
      })),
    },
    products: list(doc.products).map((item) => ({
      name: text(item.name) || "Produto",
      category: text(item.category),
      price: text(item.price),
      margin: text(item.margin),
      demand: text(item.demand),
      recurrence: text(item.recurrence),
      competition: text(item.competition),
      digitalPotential: text(item.digitalPotential),
      logisticsDifficulty: text(item.logisticsDifficulty),
      roles: Array.isArray(item.roles) ? (item.roles as string[]) : [],
      recommendation: text(item.recommendation),
      priority: text(item.priority),
    })),
    competitors: list(doc.competitors).map((item) => ({
      name: text(item.name) || "Concorrente",
      website: text(item.website),
      instagram: text(item.instagram),
      marketplace: text(item.marketplace),
      pricePosition: text(item.pricePosition),
      assortment: text(item.assortment),
      digitalPresence: text(item.digitalPresence),
      positioning: text(item.positioning),
      strengths: text(item.strengths),
      weaknesses: text(item.weaknesses),
      observations: text(item.observations),
    })),
    digitalChannels: list(doc.digitalChannels).map((item) => {
      const channel = text(item.channel) || "outro";
      return {
        channel,
        label: text(item.channelLabel) || channelLabels[channel] || channel,
        score: num(item.score),
        status: text(item.status),
        analysis: text(item.analysis),
        strengths: text(item.strengths),
        weaknesses: text(item.weaknesses),
        opportunity: text(item.opportunity),
        recommendation: text(item.recommendation),
      };
    }),
    operation: {
      canFulfill30Orders: text(doc.canFulfill30Orders),
      fulfillmentExplanation: text(doc.fulfillmentExplanation),
      areas: list(doc.operations).map((item) => {
        const area = text(item.area) || "processos";
        return {
          area: areaLabels[area] || area,
          score: num(item.score),
          status: text(item.status),
          observation: text(item.observation),
          recommendation: text(item.recommendation),
        };
      }),
    },
    maturityDimensions: dimensions,
    opportunities,
    topOpportunities,
    matrix,
    planActions,
    plan: {
      foundation: planActions.filter((item) => item.phase === "0-30"),
      implementation: planActions.filter((item) => item.phase === "31-60"),
      optimization: planActions.filter((item) => item.phase === "61-90"),
    },
    kpis: list(doc.kpis).map((item) => ({
      name: text(item.name) || "Indicador",
      currentValue: text(item.currentValue),
      targetValue: text(item.targetValue),
      unit: text(item.unit),
      measurementDate: text(item.measurementDate),
      source: text(item.source),
      description: text(item.description),
    })),
  };
}
