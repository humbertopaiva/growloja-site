import type { CollectionConfig } from "payload";
import { randomBytes } from "crypto";

function token() {
  return randomBytes(18).toString("base64url");
}

const importanceOptions = [
  { label: "Alta", value: "alta" },
  { label: "Média", value: "media" },
  { label: "Baixa", value: "baixa" },
];

const statusChannel = [
  { label: "Forte", value: "forte" },
  { label: "Adequado", value: "adequado" },
  { label: "Atenção", value: "atencao" },
  { label: "Crítico", value: "critico" },
  { label: "Não aplicável", value: "nao_aplicavel" },
];

const potentialEffort = [
  { label: "Alto", value: "alto" },
  { label: "Médio", value: "medio" },
  { label: "Baixo", value: "baixo" },
];

export const Diagnostics: CollectionConfig = {
  slug: "diagnostics",
  labels: {
    singular: "Diagnóstico",
    plural: "Diagnósticos",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "client", "status", "digitalMaturityScore", "updatedAt"],
    group: "Growloja",
    preview: (doc) => {
      const token = typeof doc?.shareToken === "string" ? doc.shareToken : "";
      if (!token) return null;
      const base = process.env.NEXT_PUBLIC_SITE_URL || "";
      return `${base}/mapa/${token}`;
    },
    livePreview: {
      url: ({ data }) => {
        const token = typeof data?.shareToken === "string" ? data.shareToken : "";
        if (!token) return null;
        const base = process.env.NEXT_PUBLIC_SITE_URL || "";
        return `${base}/mapa/${token}`;
      },
    },
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        if (!data.shareToken) data.shareToken = token();
        const dimensions = data.maturityDimensions as Array<{ score?: number }> | undefined;
        if (Array.isArray(dimensions) && dimensions.length > 0) {
          const scores = dimensions
            .map((item) => item.score)
            .filter((value): value is number => typeof value === "number");
          if (scores.length > 0) {
            data.digitalMaturityScore = Math.round(
              scores.reduce((sum, value) => sum + value, 0) / scores.length,
            );
          }
        }
        if (data.status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Informações gerais",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              label: "Título",
              defaultValue: "Diagnóstico de Crescimento",
            },
            {
              name: "client",
              type: "relationship",
              relationTo: "clients",
              required: true,
              label: "Cliente",
            },
            {
              name: "status",
              type: "select",
              required: true,
              defaultValue: "draft",
              options: [
                { label: "Rascunho", value: "draft" },
                { label: "Em andamento", value: "in_progress" },
                { label: "Concluído", value: "completed" },
                { label: "Publicado", value: "published" },
                { label: "Arquivado", value: "archived" },
              ],
            },
            {
              name: "isDemo",
              type: "checkbox",
              label: "Demonstração",
              defaultValue: false,
              admin: {
                description: "Marca o diagnóstico como exemplo, sem parecer dado real.",
              },
            },
            {
              type: "row",
              fields: [
                { name: "diagnosticDate", type: "date", label: "Data do diagnóstico" },
                { name: "analyst", type: "text", label: "Analista" },
              ],
            },
            {
              name: "intakeNotes",
              type: "textarea",
              label: "Respostas do formulário",
              admin: {
                description: "Preenchido automaticamente quando o lead chega pelo site.",
              },
            },
            {
              name: "shareToken",
              type: "text",
              unique: true,
              index: true,
              label: "Token de acesso",
              admin: {
                description:
                  "Link do cliente: /mapa/{token}. Gerado automaticamente. Não compartilhe rascunhos.",
                readOnly: true,
                position: "sidebar",
              },
            },
            {
              name: "shareLink",
              type: "ui",
              admin: {
                position: "sidebar",
                components: {
                  Field: "/components/admin/ShareLinkField#ShareLinkField",
                },
              },
            },
            {
              name: "publishedAt",
              type: "date",
              label: "Publicado em",
              admin: { position: "sidebar", readOnly: true },
            },
          ],
        },
        {
          label: "Resumo",
          fields: [
            { name: "headline", type: "text", label: "Headline" },
            { name: "summaryDescription", type: "textarea", label: "Descrição do resumo" },
            { name: "executiveSummary", type: "textarea", label: "Resumo executivo" },
            {
              name: "keyFindings",
              type: "array",
              label: "Principais achados",
              labels: { singular: "Achado", plural: "Achados" },
              fields: [
                { name: "title", type: "text", required: true, label: "Título" },
                { name: "description", type: "textarea", label: "Descrição" },
                { name: "importance", type: "select", options: importanceOptions, label: "Importância" },
                { name: "category", type: "text", label: "Categoria" },
              ],
            },
          ],
        },
        {
          label: "Negócio",
          fields: [
            { name: "businessOverview", type: "textarea", label: "Visão do negócio" },
            { name: "marketPosition", type: "textarea", label: "Posição de mercado" },
            { name: "mainProducts", type: "textarea", label: "Principais produtos" },
            {
              type: "row",
              fields: [
                { name: "averageTicket", type: "text", label: "Ticket médio" },
                { name: "salesVolume", type: "text", label: "Volume de vendas" },
                { name: "revenue", type: "text", label: "Faturamento" },
              ],
            },
            { name: "channels", type: "textarea", label: "Canais" },
            { name: "teamSize", type: "text", label: "Equipe" },
            { name: "operationalNotes", type: "textarea", label: "Notas operacionais" },
            {
              name: "customMetrics",
              type: "array",
              label: "Métricas personalizadas",
              fields: [
                { name: "label", type: "text", required: true, label: "Nome" },
                { name: "value", type: "text", label: "Valor" },
                { name: "note", type: "text", label: "Observação" },
              ],
            },
          ],
        },
        {
          label: "Cliente",
          fields: [
            { name: "customerProfile", type: "textarea", label: "Perfil do cliente" },
            {
              name: "purchaseMotivations",
              type: "array",
              label: "Motivações de compra",
              fields: [{ name: "item", type: "text", required: true, label: "Motivação" }],
            },
            {
              name: "purchaseBarriers",
              type: "array",
              label: "Barreiras de compra",
              fields: [{ name: "item", type: "text", required: true, label: "Barreira" }],
            },
            {
              name: "purchaseChannels",
              type: "array",
              label: "Canais de compra",
              fields: [{ name: "item", type: "text", required: true, label: "Canal" }],
            },
            {
              name: "customerInsights",
              type: "array",
              label: "Insights de cliente",
              fields: [
                { name: "title", type: "text", required: true, label: "Título" },
                { name: "description", type: "textarea", label: "Descrição" },
                { name: "evidence", type: "textarea", label: "Evidência" },
                { name: "opportunity", type: "textarea", label: "Oportunidade" },
              ],
            },
          ],
        },
        {
          label: "Produtos",
          fields: [
            {
              name: "products",
              type: "array",
              label: "Mix de produtos",
              fields: [
                { name: "name", type: "text", required: true, label: "Nome" },
                { name: "category", type: "text", label: "Categoria" },
                { name: "price", type: "text", label: "Preço" },
                { name: "margin", type: "select", options: potentialEffort, label: "Margem" },
                { name: "demand", type: "select", options: potentialEffort, label: "Demanda" },
                { name: "recurrence", type: "select", options: potentialEffort, label: "Recorrência" },
                { name: "competition", type: "select", options: potentialEffort, label: "Concorrência" },
                {
                  name: "digitalPotential",
                  type: "select",
                  options: potentialEffort,
                  label: "Potencial digital",
                },
                {
                  name: "logisticsDifficulty",
                  type: "select",
                  options: potentialEffort,
                  label: "Dificuldade logística",
                },
                {
                  name: "roles",
                  type: "select",
                  hasMany: true,
                  label: "Papel no mix",
                  options: [
                    { label: "Produto de entrada", value: "entrada" },
                    { label: "Produto de margem", value: "margem" },
                    { label: "Produto de recorrência", value: "recorrencia" },
                    { label: "Produto de conveniência", value: "conveniencia" },
                    { label: "Produto complementar", value: "complementar" },
                  ],
                },
                { name: "recommendation", type: "textarea", label: "Recomendação" },
                {
                  name: "priority",
                  type: "select",
                  options: [
                    { label: "Agora", value: "agora" },
                    { label: "Próximo", value: "proximo" },
                    { label: "Depois", value: "depois" },
                  ],
                  label: "Prioridade",
                },
              ],
            },
          ],
        },
        {
          label: "Concorrência",
          fields: [
            {
              name: "competitors",
              type: "array",
              label: "Concorrentes",
              fields: [
                { name: "name", type: "text", required: true, label: "Nome" },
                { name: "website", type: "text", label: "Site" },
                { name: "instagram", type: "text", label: "Instagram" },
                { name: "marketplace", type: "text", label: "Marketplace" },
                { name: "pricePosition", type: "text", label: "Posição de preço" },
                { name: "assortment", type: "text", label: "Sortimento" },
                { name: "digitalPresence", type: "text", label: "Presença digital" },
                { name: "positioning", type: "textarea", label: "Posicionamento" },
                { name: "strengths", type: "textarea", label: "Forças" },
                { name: "weaknesses", type: "textarea", label: "Fraquezas" },
                { name: "observations", type: "textarea", label: "Observações" },
              ],
            },
          ],
        },
        {
          label: "Digital",
          fields: [
            {
              name: "digitalChannels",
              type: "array",
              label: "Canais digitais",
              fields: [
                {
                  name: "channel",
                  type: "select",
                  required: true,
                  label: "Canal",
                  options: [
                    { label: "Google", value: "google" },
                    { label: "Instagram", value: "instagram" },
                    { label: "WhatsApp", value: "whatsapp" },
                    { label: "Website", value: "website" },
                    { label: "E-commerce", value: "ecommerce" },
                    { label: "Marketplace", value: "marketplace" },
                    { label: "SEO", value: "seo" },
                    { label: "Outro", value: "outro" },
                  ],
                },
                { name: "channelLabel", type: "text", label: "Nome (se outro)" },
                { name: "score", type: "number", min: 0, max: 100, label: "Pontuação" },
                { name: "status", type: "select", options: statusChannel, label: "Status" },
                { name: "analysis", type: "textarea", label: "Análise" },
                { name: "strengths", type: "textarea", label: "Forças" },
                { name: "weaknesses", type: "textarea", label: "Fraquezas" },
                { name: "opportunity", type: "textarea", label: "Oportunidade" },
                { name: "recommendation", type: "textarea", label: "Recomendação" },
              ],
            },
          ],
        },
        {
          label: "Operação",
          fields: [
            {
              name: "canFulfill30Orders",
              type: "select",
              label: "Se amanhã chegassem 30 pedidos online, essa empresa conseguiria atender?",
              options: [
                { label: "Sim", value: "sim" },
                { label: "Parcialmente", value: "parcialmente" },
                { label: "Não", value: "nao" },
              ],
            },
            {
              name: "fulfillmentExplanation",
              type: "textarea",
              label: "Explicação da capacidade de atendimento",
            },
            {
              name: "operations",
              type: "array",
              label: "Áreas da operação",
              fields: [
                {
                  name: "area",
                  type: "select",
                  required: true,
                  label: "Área",
                  options: [
                    { label: "Estoque", value: "estoque" },
                    { label: "Gestão de produtos", value: "gestao_produtos" },
                    { label: "Separação", value: "separacao" },
                    { label: "Embalagem", value: "embalagem" },
                    { label: "Entrega", value: "entrega" },
                    { label: "Atendimento", value: "atendimento" },
                    { label: "Pós-venda", value: "pos_venda" },
                    { label: "Trocas", value: "trocas" },
                    { label: "Sistemas", value: "sistemas" },
                    { label: "Equipe", value: "equipe" },
                    { label: "Processos", value: "processos" },
                  ],
                },
                { name: "score", type: "number", min: 0, max: 100, label: "Pontuação" },
                { name: "status", type: "select", options: statusChannel, label: "Status" },
                { name: "observation", type: "textarea", label: "Observação" },
                { name: "recommendation", type: "textarea", label: "Recomendação" },
              ],
            },
          ],
        },
        {
          label: "Maturidade",
          fields: [
            {
              name: "digitalMaturityScore",
              type: "number",
              min: 0,
              max: 100,
              label: "Pontuação geral (0–100)",
              admin: {
                description: "Calculada pela média das dimensões quando elas existem.",
                readOnly: true,
              },
            },
            {
              name: "evolutionInsight",
              type: "textarea",
              label: "Onde está o maior espaço de evolução",
              admin: {
                description:
                  "Se vazio, o mapa usa as dimensões com menor pontuação.",
              },
            },
            {
              name: "maturityDimensions",
              type: "array",
              label: "Dimensões",
              fields: [
                { name: "name", type: "text", required: true, label: "Dimensão" },
                { name: "score", type: "number", min: 0, max: 100, required: true, label: "Pontuação" },
                { name: "description", type: "textarea", label: "Descrição" },
                { name: "evidence", type: "textarea", label: "Evidência" },
                { name: "recommendation", type: "textarea", label: "Recomendação" },
              ],
            },
          ],
        },
        {
          label: "Oportunidades",
          fields: [
            {
              name: "opportunities",
              type: "array",
              label: "Oportunidades",
              fields: [
                { name: "title", type: "text", required: true, label: "Título" },
                { name: "description", type: "textarea", label: "Descrição" },
                { name: "evidence", type: "textarea", label: "Evidência" },
                { name: "potential", type: "select", options: potentialEffort, label: "Impacto / potencial" },
                { name: "effort", type: "select", options: potentialEffort, label: "Esforço" },
                {
                  name: "priority",
                  type: "select",
                  label: "Prioridade",
                  options: [
                    { label: "Agora", value: "agora" },
                    { label: "Próximo", value: "proximo" },
                    { label: "Depois", value: "depois" },
                  ],
                },
                { name: "category", type: "text", label: "Categoria" },
                { name: "recommendation", type: "textarea", label: "Recomendação" },
                { name: "expectedImpact", type: "textarea", label: "Impacto esperado" },
                {
                  name: "status",
                  type: "select",
                  defaultValue: "identificada",
                  options: [
                    { label: "Identificada", value: "identificada" },
                    { label: "Planejada", value: "planejada" },
                    { label: "Em execução", value: "em_execucao" },
                    { label: "Concluída", value: "concluida" },
                    { label: "Descartada", value: "descartada" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Plano 90 dias",
          fields: [
            {
              name: "planActions",
              type: "array",
              label: "Ações",
              fields: [
                {
                  name: "phase",
                  type: "select",
                  required: true,
                  label: "Fase",
                  options: [
                    { label: "0–30 dias · Fundação", value: "0-30" },
                    { label: "31–60 dias · Implementação", value: "31-60" },
                    { label: "61–90 dias · Otimização", value: "61-90" },
                  ],
                },
                { name: "title", type: "text", required: true, label: "Ação" },
                { name: "description", type: "textarea", label: "Descrição" },
                { name: "responsible", type: "text", label: "Responsável" },
                { name: "deadline", type: "text", label: "Prazo" },
                {
                  name: "priority",
                  type: "select",
                  options: [
                    { label: "Agora", value: "agora" },
                    { label: "Próximo", value: "proximo" },
                    { label: "Depois", value: "depois" },
                  ],
                  label: "Prioridade",
                },
                {
                  name: "status",
                  type: "select",
                  defaultValue: "nao_iniciado",
                  options: [
                    { label: "Não iniciado", value: "nao_iniciado" },
                    { label: "Em andamento", value: "em_andamento" },
                    { label: "Concluído", value: "concluido" },
                  ],
                },
                { name: "relatedOpportunity", type: "text", label: "Oportunidade relacionada" },
              ],
            },
          ],
        },
        {
          label: "KPIs",
          fields: [
            {
              name: "kpis",
              type: "array",
              label: "Indicadores",
              fields: [
                { name: "name", type: "text", required: true, label: "Indicador" },
                { name: "currentValue", type: "text", label: "Valor atual" },
                { name: "targetValue", type: "text", label: "Meta" },
                { name: "unit", type: "text", label: "Unidade" },
                { name: "measurementDate", type: "text", label: "Data da medição" },
                { name: "source", type: "text", label: "Fonte" },
                { name: "description", type: "textarea", label: "Descrição" },
              ],
            },
          ],
        },
        {
          label: "Conclusão",
          fields: [
            {
              name: "diagnosticStatement",
              type: "textarea",
              label: "Frase-síntese do diagnóstico",
            },
            {
              name: "generalConclusion",
              type: "textarea",
              label: "Conclusão estratégica",
            },
          ],
        },
      ],
    },
  ],
};
