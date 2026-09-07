import type { Payload } from "payload";

const DEMO_TOKEN = "demo-exemplo-comercio";

export async function seedDemo(payload: Payload) {
  const existing = await payload.find({
    collection: "clients",
    where: { companyName: { equals: "Exemplo Comércio" } },
    limit: 1,
    overrideAccess: true,
  });

  const client =
    existing.docs[0] ||
    (await payload.create({
      collection: "clients",
      overrideAccess: true,
      data: {
        companyName: "Exemplo Comércio",
        tradeName: "Exemplo Comércio",
        segment: "Varejo em geral",
        city: "Campinas",
        state: "SP",
        website: "exemplo.com.br",
        instagram: "@exemplocomercio",
        contactName: "Maria Silva",
        email: "maria@exemplo.com.br",
      },
    }));

  await payload.create({
    collection: "diagnostics",
    overrideAccess: true,
    data: {
      title: "Diagnóstico de Crescimento — Exemplo Comércio",
      client: client.id,
      status: "published",
      isDemo: true,
      diagnosticDate: new Date().toISOString(),
      analyst: "Growloja",
      shareToken: DEMO_TOKEN,
      publishedAt: new Date().toISOString(),
      headline: "Existe demanda, mas pouca estrutura digital.",
      summaryDescription:
        "A empresa já vende no físico e atende pelo WhatsApp, mas ainda não tem uma operação digital capaz de transformar interesse em venda recorrente.",
      executiveSummary:
        "O negócio tem base sólida na loja física. O maior gargalo não é falta de produto: é a ausência de uma operação digital organizada, com mix, atendimento e presença local bem definidos.",
      diagnosticStatement:
        "A empresa não precisa estar em todos os canais. Precisa estruturar os canais certos, com o mix certo e uma operação capaz de transformar demanda em vendas.",
      generalConclusion:
        "Priorize WhatsApp, Google e o mix digital antes de investir em um e-commerce completo. A operação ainda não está pronta para um volume alto de pedidos online.",
      evolutionInsight: "Seu maior espaço de evolução está em aquisição e presença digital.",
      keyFindings: [
        {
          title: "Existe demanda, mas pouca estrutura digital.",
          description: "Clientes já perguntam pelo WhatsApp, porém o atendimento não está organizado como canal de venda.",
          importance: "alta",
          category: "Operação",
        },
        {
          title: "A presença no Google não representa a loja.",
          description: "Quem pesquisa na cidade quase não encontra a empresa de forma clara.",
          importance: "alta",
          category: "Aquisição",
        },
        {
          title: "O mix digital está amplo demais.",
          description: "Levar o catálogo inteiro para o digital dilui margem e complica a operação.",
          importance: "media",
          category: "Produtos",
        },
      ],
      businessOverview:
        "Varejo local com operação física consolidada, atendimento presencial forte e início informal de vendas pelo WhatsApp.",
      marketPosition: "Reconhecida na região, mas pouco visível contra marketplaces e lojas que já operam no digital.",
      mainProducts: "Mix amplo de varejo, com alguns itens de reposição frequente e outros de margem mais alta.",
      averageTicket: "R$ 180",
      salesVolume: "Principalmente loja física",
      channels: "Loja física, WhatsApp informal, Instagram irregular",
      teamSize: "8 pessoas",
      operationalNotes: "Estoque e atendimento presencial funcionam. Pedidos digitais ainda passam por improviso.",
      customerProfile: "Moradores da cidade e região que já conhecem a loja, buscam conveniência e confiam no atendimento local.",
      purchaseMotivations: [
        { item: "Proximidade e confiança" },
        { item: "Praticidade de pedir pelo WhatsApp" },
        { item: "Reposição de produtos conhecidos" },
      ],
      purchaseBarriers: [
        { item: "Dificuldade de encontrar a loja no Google" },
        { item: "Resposta lenta fora do horário da loja" },
        { item: "Catálogo digital confuso" },
      ],
      purchaseChannels: [{ item: "Loja física" }, { item: "WhatsApp" }],
      customerInsights: [
        {
          title: "O cliente já tenta comprar à distância",
          description: "Parte da demanda chega fora da loja, principalmente no WhatsApp.",
          evidence: "Perguntas recorrentes de preço e disponibilidade por mensagem.",
          opportunity: "Transformar o WhatsApp em um canal de venda, não só de recado.",
        },
      ],
      products: [
        {
          name: "Itens de reposição semanal",
          category: "Recorrência",
          digitalPotential: "alto",
          demand: "alto",
          recurrence: "alto",
          roles: ["recorrencia", "entrada"],
          recommendation: "Priorizar no catálogo digital e no WhatsApp.",
          priority: "agora",
        },
        {
          name: "Linha de maior margem",
          category: "Margem",
          digitalPotential: "medio",
          margin: "alto",
          roles: ["margem"],
          recommendation: "Manter com argumentação e atendimento consultivo.",
          priority: "proximo",
        },
      ],
      competitors: [
        {
          name: "Marketplace nacional",
          pricePosition: "Mais agressivo",
          digitalPresence: "Forte",
          strengths: "Preço, alcance e logística.",
          weaknesses: "Pouco relacionamento local.",
          observations: "Compete por atenção, não necessariamente por experiência local.",
        },
        {
          name: "Loja da cidade vizinha",
          digitalPresence: "Instagram ativo",
          strengths: "Comunicação digital mais frequente.",
          weaknesses: "Menos estoque presencial.",
        },
      ],
      digitalChannels: [
        {
          channel: "whatsapp",
          score: 41,
          status: "atencao",
          analysis: "Canal já usado, mas sem processo, catálogo ou horário.",
          opportunity: "Estruturar vendas pelo WhatsApp.",
          recommendation: "Organizar catálogo, resposta e registro de pedidos.",
        },
        {
          channel: "google",
          score: 28,
          status: "critico",
          analysis: "Presença local fraca para quem pesquisa na cidade.",
          opportunity: "Melhorar presença no Google.",
          recommendation: "Completar perfil, fotos, categorias e dados da loja.",
        },
        {
          channel: "instagram",
          score: 46,
          status: "atencao",
          analysis: "Existe perfil, mas sem consistência comercial.",
        },
        {
          channel: "ecommerce",
          score: 12,
          status: "nao_aplicavel",
          analysis: "Ainda não é o primeiro passo. A operação não sustentaria volume.",
        },
      ],
      canFulfill30Orders: "parcialmente",
      fulfillmentExplanation:
        "Daria para atender alguns pedidos com esforço extra, mas estoque, separação e comunicação ainda não estão preparados para um fluxo digital contínuo.",
      operations: [
        { area: "estoque", score: 62, status: "adequado", observation: "Funciona para a loja física." },
        { area: "atendimento", score: 70, status: "forte", observation: "Forte no presencial, irregular no digital." },
        { area: "entrega", score: 38, status: "atencao", observation: "Sem rotina definida para pedidos remotos." },
        { area: "processos", score: 33, status: "critico", observation: "Pedidos digitais ainda dependem de pessoas específicas." },
      ],
      maturityDimensions: [
        { name: "Estratégia", score: 72, description: "Há clareza de que o digital importa, mas pouca priorização." },
        { name: "Presença digital", score: 48, description: "Canais existem de forma incompleta." },
        { name: "Operação", score: 58, description: "A loja física segura, o digital ainda improvisa." },
        { name: "Aquisição", score: 44, description: "Pouca capacidade de ser encontrada fora do fluxo da loja." },
        { name: "Conversão", score: 56, description: "Perguntas não viram pedido com consistência." },
        { name: "Retenção", score: 78, description: "Há relacionamento local, mas sem recompra estruturada." },
        { name: "E-commerce", score: 22, description: "Ainda não deve ser o centro da operação." },
      ],
      opportunities: [
        {
          title: "Estruturar vendas pelo WhatsApp",
          description: "Transformar o canal que já recebe demanda em uma operação de venda.",
          potential: "alto",
          effort: "baixo",
          priority: "agora",
          category: "Canais",
          status: "identificada",
        },
        {
          title: "Reorganizar mix digital",
          description: "Levar menos produtos, com mais clareza de margem e demanda.",
          potential: "alto",
          effort: "medio",
          priority: "agora",
          category: "Produtos",
          status: "identificada",
        },
        {
          title: "Melhorar presença no Google",
          description: "Ser encontrado por quem já pesquisa na cidade.",
          potential: "alto",
          effort: "baixo",
          priority: "agora",
          category: "Aquisição",
          status: "identificada",
        },
        {
          title: "Criar estratégia de recompra",
          description: "Usar o relacionamento local para voltar a vender aos mesmos clientes.",
          potential: "medio",
          effort: "baixo",
          priority: "proximo",
          category: "Retenção",
          status: "identificada",
        },
        {
          title: "Criar operação de e-commerce",
          description: "Canal futuro, depois da operação e do mix estarem mais maduros.",
          potential: "alto",
          effort: "alto",
          priority: "depois",
          category: "Canais",
          status: "identificada",
        },
      ],
      planActions: [
        { phase: "0-30", title: "Organização do catálogo", status: "nao_iniciado", priority: "agora" },
        { phase: "0-30", title: "Estruturação do WhatsApp", status: "nao_iniciado", priority: "agora" },
        { phase: "0-30", title: "Google Business", status: "nao_iniciado", priority: "agora" },
        { phase: "31-60", title: "E-commerce inicial", status: "nao_iniciado", priority: "proximo" },
        { phase: "31-60", title: "Campanhas locais", status: "nao_iniciado", priority: "proximo" },
        { phase: "31-60", title: "Automação de atendimento", status: "nao_iniciado", priority: "proximo" },
        { phase: "61-90", title: "Otimização dos canais", status: "nao_iniciado", priority: "depois" },
        { phase: "61-90", title: "Retenção e recompra", status: "nao_iniciado", priority: "depois" },
        { phase: "61-90", title: "Expansão seletiva", status: "nao_iniciado", priority: "depois" },
      ],
      kpis: [
        { name: "Pedidos pelo WhatsApp", currentValue: "Poucos / informais", unit: "pedidos/semana" },
        { name: "Ticket médio", currentValue: "R$ 180", unit: "R$" },
        { name: "Presença no Google", currentValue: "Incompleta", description: "Perfil local ainda não representa a loja." },
      ],
    },
  });
}

export const demoShareToken = DEMO_TOKEN;
