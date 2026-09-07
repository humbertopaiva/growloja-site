export type Level = "alto" | "medio" | "baixo";
export type Priority = "agora" | "proximo" | "depois";
export type ChannelStatus = "forte" | "adequado" | "atencao" | "critico" | "nao_aplicavel";
export type DiagnosticStatus = "draft" | "in_progress" | "completed" | "published" | "archived";

export type DiagnosticView = {
  id: string | number;
  title: string;
  shareToken: string;
  status: DiagnosticStatus;
  isDemo: boolean;
  diagnosticDate?: string | null;
  analyst?: string | null;
  companyName: string;
  tradeName?: string | null;
  segment?: string | null;
  city?: string | null;
  headline?: string | null;
  summaryDescription?: string | null;
  executiveSummary?: string | null;
  diagnosticStatement?: string | null;
  generalConclusion?: string | null;
  evolutionInsight: string;
  digitalMaturityScore: number | null;
  keyFindings: Array<{
    title: string;
    description?: string | null;
    importance?: string | null;
    category?: string | null;
  }>;
  business: {
    overview?: string | null;
    marketPosition?: string | null;
    mainProducts?: string | null;
    averageTicket?: string | null;
    salesVolume?: string | null;
    revenue?: string | null;
    channels?: string | null;
    teamSize?: string | null;
    operationalNotes?: string | null;
    customMetrics: Array<{ label: string; value?: string | null; note?: string | null }>;
  };
  customer: {
    profile?: string | null;
    motivations: string[];
    barriers: string[];
    purchaseChannels: string[];
    insights: Array<{
      title: string;
      description?: string | null;
      evidence?: string | null;
      opportunity?: string | null;
    }>;
  };
  products: Array<{
    name: string;
    category?: string | null;
    price?: string | null;
    margin?: string | null;
    demand?: string | null;
    recurrence?: string | null;
    competition?: string | null;
    digitalPotential?: string | null;
    logisticsDifficulty?: string | null;
    roles: string[];
    recommendation?: string | null;
    priority?: string | null;
  }>;
  competitors: Array<{
    name: string;
    website?: string | null;
    instagram?: string | null;
    marketplace?: string | null;
    pricePosition?: string | null;
    assortment?: string | null;
    digitalPresence?: string | null;
    positioning?: string | null;
    strengths?: string | null;
    weaknesses?: string | null;
    observations?: string | null;
  }>;
  digitalChannels: Array<{
    channel: string;
    label: string;
    score?: number | null;
    status?: string | null;
    analysis?: string | null;
    strengths?: string | null;
    weaknesses?: string | null;
    opportunity?: string | null;
    recommendation?: string | null;
  }>;
  operation: {
    canFulfill30Orders?: string | null;
    fulfillmentExplanation?: string | null;
    areas: Array<{
      area: string;
      score?: number | null;
      status?: string | null;
      observation?: string | null;
      recommendation?: string | null;
    }>;
  };
  maturityDimensions: Array<{
    name: string;
    score: number;
    description?: string | null;
    evidence?: string | null;
    recommendation?: string | null;
  }>;
  opportunities: Array<{
    id: string;
    title: string;
    description?: string | null;
    evidence?: string | null;
    potential?: Level | string | null;
    effort?: Level | string | null;
    priority?: Priority | string | null;
    category?: string | null;
    recommendation?: string | null;
    expectedImpact?: string | null;
    status?: string | null;
  }>;
  topOpportunities: DiagnosticView["opportunities"];
  matrix: {
    fazerAgora: DiagnosticView["opportunities"];
    planejar: DiagnosticView["opportunities"];
    experimentar: DiagnosticView["opportunities"];
    evitar: DiagnosticView["opportunities"];
  };
  plan: {
    foundation: DiagnosticView["planActions"];
    implementation: DiagnosticView["planActions"];
    optimization: DiagnosticView["planActions"];
  };
  planActions: Array<{
    phase: string;
    title: string;
    description?: string | null;
    responsible?: string | null;
    deadline?: string | null;
    priority?: string | null;
    status?: string | null;
    relatedOpportunity?: string | null;
  }>;
  kpis: Array<{
    name: string;
    currentValue?: string | null;
    targetValue?: string | null;
    unit?: string | null;
    measurementDate?: string | null;
    source?: string | null;
    description?: string | null;
  }>;
};
