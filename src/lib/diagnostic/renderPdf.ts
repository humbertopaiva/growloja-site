import { PDFDocument, PDFFont, PDFPage, PageSizes, rgb, StandardFonts } from "pdf-lib";
import type { DiagnosticView } from "./types";

const ink = rgb(23 / 255, 26 / 255, 22 / 255);
const accent = rgb(113 / 255, 157 / 255, 23 / 255);
const muted = rgb(94 / 255, 99 / 255, 89 / 255);
const line = rgb(0.88, 0.87, 0.84);
const paper = rgb(243 / 255, 241 / 255, 234 / 255);
const white = rgb(1, 1, 1);

const MARGIN = 48;
const FOOTER = 40;
const EMPTY = "Ainda não avaliado.";

function clean(value: string) {
  return value
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[—–]/g, "-")
    .replace(/…/g, "...")
    .replace(/\u00a0/g, " ");
}

function text(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? clean(trimmed) : "";
}

function orEmpty(value?: string | null) {
  return text(value) || EMPTY;
}

function formatDate(value?: string | null) {
  if (!value) return EMPTY;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR");
}

function level(value?: string | null) {
  if (value === "alto") return "Alto";
  if (value === "medio") return "Médio";
  if (value === "baixo") return "Baixo";
  return text(value) || EMPTY;
}

function channelStatus(value?: string | null) {
  const map: Record<string, string> = {
    forte: "Forte",
    adequado: "Adequado",
    atencao: "Atenção",
    critico: "Crítico",
    nao_aplicavel: "Não aplicável",
  };
  return map[value || ""] || orEmpty(value);
}

function fulfill(value?: string | null) {
  if (value === "sim") return "Sim";
  if (value === "parcialmente") return "Parcialmente";
  if (value === "nao") return "Não";
  return EMPTY;
}

function planStatus(value?: string | null) {
  const map: Record<string, string> = {
    nao_iniciado: "Não iniciado",
    em_andamento: "Em andamento",
    concluido: "Concluído",
  };
  return map[value || ""] || orEmpty(value);
}

function wrap(font: PDFFont, size: number, value: string, maxWidth: number) {
  const paragraphs = clean(value).split(/\n+/);
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push("");
      continue;
    }
    let current = "";
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= maxWidth) {
        current = next;
        continue;
      }
      if (current) lines.push(current);
      if (font.widthOfTextAtSize(word, size) <= maxWidth) {
        current = word;
      } else {
        let chunk = "";
        for (const char of word) {
          const trial = chunk + char;
          if (font.widthOfTextAtSize(trial, size) <= maxWidth) chunk = trial;
          else {
            if (chunk) lines.push(chunk);
            chunk = char;
          }
        }
        current = chunk;
      }
    }
    if (current) lines.push(current);
  }

  return lines;
}

class Writer {
  page!: PDFPage;
  y = 0;
  pageWidth = PageSizes.A4[0];
  pageHeight = PageSizes.A4[1];

  constructor(
    private pdf: PDFDocument,
    readonly font: PDFFont,
    readonly bold: PDFFont,
  ) {
    this.addPage();
  }

  get width() {
    return this.pageWidth - MARGIN * 2;
  }

  addPage() {
    this.page = this.pdf.addPage(PageSizes.A4);
    const size = this.page.getSize();
    this.pageWidth = size.width;
    this.pageHeight = size.height;
    this.y = this.pageHeight - MARGIN;
  }

  ensure(height: number) {
    if (this.y - height < FOOTER + 12) this.addPage();
  }

  gap(size = 12) {
    this.y -= size;
  }

  line() {
    this.ensure(16);
    this.page.drawLine({
      start: { x: MARGIN, y: this.y },
      end: { x: MARGIN + this.width, y: this.y },
      thickness: 0.6,
      color: line,
    });
    this.gap(14);
  }

  drawText(value: string, opts: { size: number; bold?: boolean; color?: ReturnType<typeof rgb>; x?: number; maxWidth?: number; lineHeight?: number }) {
    const font = opts.bold ? this.bold : this.font;
    const maxWidth = opts.maxWidth ?? this.width;
    const lines = wrap(font, opts.size, value, maxWidth);
    const lineHeight = opts.lineHeight ?? opts.size * 1.35;
    this.ensure(lines.length * lineHeight);
    for (const row of lines) {
      this.page.drawText(row, {
        x: opts.x ?? MARGIN,
        y: this.y - opts.size,
        size: opts.size,
        font,
        color: opts.color ?? ink,
      });
      this.y -= lineHeight;
    }
  }

  kicker(value: string) {
    this.drawText(value.toUpperCase(), { size: 8, bold: true, color: accent, lineHeight: 12 });
  }

  h1(value: string) {
    this.drawText(value, { size: 26, bold: true, lineHeight: 32 });
  }

  h2(value: string) {
    this.addPage();
    this.kicker("Mapa de Crescimento");
    this.drawText(value, { size: 16, bold: true, lineHeight: 22 });
    this.gap(10);
  }

  body(value?: string | null) {
    this.drawText(orEmpty(value), { size: 10, color: ink, lineHeight: 14 });
  }

  mutedText(value: string) {
    this.drawText(value, { size: 9, color: muted, lineHeight: 13 });
  }

  card(title: string, body: string) {
    const titleLines = wrap(this.bold, 8, title.toUpperCase(), this.width - 24);
    const bodyLines = wrap(this.font, 10, body, this.width - 24);
    const height = 22 + titleLines.length * 12 + bodyLines.length * 14 + 10;
    this.ensure(height);
    this.y -= height;
    this.page.drawRectangle({
      x: MARGIN,
      y: this.y,
      width: this.width,
      height,
      color: white,
      borderColor: line,
      borderWidth: 0.8,
    });
    let cursor = this.y + height - 16;
    for (const row of titleLines) {
      this.page.drawText(row, { x: MARGIN + 12, y: cursor, size: 8, font: this.bold, color: accent });
      cursor -= 12;
    }
    cursor -= 4;
    for (const row of bodyLines) {
      this.page.drawText(row, { x: MARGIN + 12, y: cursor, size: 10, font: this.font, color: ink });
      cursor -= 14;
    }
    this.gap(10);
  }

  stats(items: Array<[string, string]>) {
    const usable = items.filter(([, value]) => value);
    if (usable.length === 0) return;
    const columns = Math.min(3, usable.length);
    const gap = 8;
    const boxWidth = (this.width - gap * (columns - 1)) / columns;
    const boxHeight = 48;

    for (let index = 0; index < usable.length; index += columns) {
      this.ensure(boxHeight + gap);
      const y = this.y - boxHeight;
      usable.slice(index, index + columns).forEach((item, col) => {
        const x = MARGIN + col * (boxWidth + gap);
        this.page.drawRectangle({ x, y, width: boxWidth, height: boxHeight, color: paper });
        this.page.drawText(item[0].toUpperCase(), {
          x: x + 10,
          y: y + 30,
          size: 7,
          font: this.bold,
          color: muted,
        });
        const value = wrap(this.bold, 10, item[1], boxWidth - 20)[0] || EMPTY;
        this.page.drawText(value, { x: x + 10, y: y + 14, size: 10, font: this.bold, color: ink });
      });
      this.y -= boxHeight + gap;
    }
  }

  bullets(items: string[]) {
    if (items.length === 0) {
      this.body(EMPTY);
      return;
    }
    for (const item of items) {
      this.drawText(`- ${item}`, { size: 10, lineHeight: 14 });
    }
  }

  bar(label: string, score: number) {
    this.ensure(28);
    this.drawText(`${label}  ${Math.round(score)}/100`, { size: 10, bold: true, lineHeight: 14 });
    const width = this.width;
    const height = 6;
    this.ensure(height + 8);
    this.y -= height;
    this.page.drawRectangle({ x: MARGIN, y: this.y, width, height, color: paper });
    this.page.drawRectangle({
      x: MARGIN,
      y: this.y,
      width: Math.max(2, (Math.min(100, Math.max(0, score)) / 100) * width),
      height,
      color: accent,
    });
    this.gap(10);
  }
}

function cover(writer: Writer, diagnostic: DiagnosticView) {
  writer.kicker("Growloja");
  writer.gap(6);
  writer.drawText("Mapa de Crescimento", { size: 11, color: muted, lineHeight: 16 });
  writer.gap(18);
  writer.h1(diagnostic.tradeName || diagnostic.companyName);
  writer.mutedText(
    `${formatDate(diagnostic.diagnosticDate)}  |  ${diagnostic.analyst || "Growloja"}  |  Diagnóstico concluído`,
  );
  if (diagnostic.isDemo) {
    writer.gap(8);
    writer.drawText("DEMONSTRAÇÃO - dados fictícios, não representam um cliente real.", {
      size: 9,
      bold: true,
      color: accent,
    });
  }
  writer.gap(22);

  const score = diagnostic.digitalMaturityScore;
  writer.ensure(110);
  writer.y -= 100;
  writer.page.drawRectangle({
    x: MARGIN,
    y: writer.y,
    width: writer.width,
    height: 100,
    color: ink,
  });
  writer.page.drawText("MATURIDADE DIGITAL", {
    x: MARGIN + 20,
    y: writer.y + 72,
    size: 8,
    font: writer.bold,
    color: accent,
  });
  writer.page.drawText(score == null ? "-" : String(score), {
    x: MARGIN + 20,
    y: writer.y + 32,
    size: 36,
    font: writer.bold,
    color: white,
  });
  writer.page.drawText("/100", {
    x: MARGIN + 20 + writer.bold.widthOfTextAtSize(score == null ? "-" : String(score), 36) + 6,
    y: writer.y + 38,
    size: 12,
    font: writer.font,
    color: white,
  });
  const insight = wrap(writer.font, 10, diagnostic.evolutionInsight, writer.width - 200);
  let insightY = writer.y + 58;
  for (const row of insight.slice(0, 4)) {
    writer.page.drawText(row, {
      x: MARGIN + 160,
      y: insightY,
      size: 10,
      font: writer.font,
      color: white,
    });
    insightY -= 14;
  }
  writer.gap(18);
  writer.mutedText("Indicador proprietário de diagnóstico - não é garantia de performance.");
  writer.gap(16);
  if (diagnostic.diagnosticStatement) {
    writer.card("Frase-síntese", diagnostic.diagnosticStatement);
  }
}

export async function renderDiagnosticPdf(diagnostic: DiagnosticView) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Mapa de Crescimento - ${diagnostic.tradeName || diagnostic.companyName}`);
  pdf.setAuthor("Growloja");
  pdf.setSubject("Diagnóstico de Crescimento");
  pdf.setCreator("Mapa de Crescimento Growloja");
  pdf.setLanguage("pt-BR");

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const writer = new Writer(pdf, font, bold);

  cover(writer, diagnostic);

  writer.h2("Resumo executivo");
  if (diagnostic.headline) writer.drawText(diagnostic.headline, { size: 13, bold: true, lineHeight: 18 });
  writer.gap(6);
  writer.body(diagnostic.executiveSummary || diagnostic.summaryDescription);
  writer.gap(10);
  if (diagnostic.keyFindings.length === 0) writer.body(EMPTY);
  for (const finding of diagnostic.keyFindings) {
    writer.card(finding.title, finding.description || EMPTY);
  }

  writer.h2("Raio-x do negócio");
  writer.stats([
    ["Ticket médio", text(diagnostic.business.averageTicket)],
    ["Volume", text(diagnostic.business.salesVolume)],
    ["Equipe", text(diagnostic.business.teamSize)],
    ["Faturamento", text(diagnostic.business.revenue)],
  ]);
  writer.card("Visão do negócio", orEmpty(diagnostic.business.overview));
  writer.card("Posição de mercado", orEmpty(diagnostic.business.marketPosition));
  writer.card("Canais", orEmpty(diagnostic.business.channels));
  if (diagnostic.business.mainProducts) writer.card("Principais produtos", diagnostic.business.mainProducts);
  if (diagnostic.business.operationalNotes) writer.card("Notas operacionais", diagnostic.business.operationalNotes);
  for (const metric of diagnostic.business.customMetrics) {
    writer.card(metric.label, [metric.value, metric.note].filter(Boolean).join(" - ") || EMPTY);
  }

  writer.h2("Perfil do cliente");
  writer.body(diagnostic.customer.profile);
  writer.gap(8);
  writer.card("Motivações", diagnostic.customer.motivations.join("\n") || EMPTY);
  writer.card("Barreiras", diagnostic.customer.barriers.join("\n") || EMPTY);
  writer.card("Canais de compra", diagnostic.customer.purchaseChannels.join("\n") || EMPTY);
  for (const insight of diagnostic.customer.insights) {
    writer.card(
      insight.title,
      [insight.description, insight.evidence && `Evidência: ${insight.evidence}`, insight.opportunity && `Oportunidade: ${insight.opportunity}`]
        .filter(Boolean)
        .join("\n") || EMPTY,
    );
  }

  writer.h2("Mix de produtos");
  if (diagnostic.products.length === 0) writer.body(EMPTY);
  for (const product of diagnostic.products) {
    writer.card(
      product.name,
      [
        product.category,
        `Potencial digital: ${level(product.digitalPotential)} | Demanda: ${level(product.demand)} | Margem: ${level(product.margin)}`,
        product.recommendation,
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  writer.h2("Concorrência");
  if (diagnostic.competitors.length === 0) writer.body(EMPTY);
  for (const competitor of diagnostic.competitors) {
    writer.card(
      competitor.name,
      [
        competitor.digitalPresence || competitor.positioning,
        competitor.strengths && `Forças: ${competitor.strengths}`,
        competitor.weaknesses && `Fraquezas: ${competitor.weaknesses}`,
      ]
        .filter(Boolean)
        .join("\n") || EMPTY,
    );
  }

  writer.h2("Presença digital");
  if (diagnostic.digitalChannels.length === 0) writer.body(EMPTY);
  for (const channel of diagnostic.digitalChannels) {
    writer.card(
      `${channel.label}  ${channel.score ?? "-"}/100  ·  ${channelStatus(channel.status)}`,
      [channel.analysis, channel.opportunity, channel.recommendation].filter(Boolean).join("\n") || EMPTY,
    );
  }

  writer.h2("Operação");
  writer.card(
    "Se amanhã chegassem 30 pedidos online, essa empresa conseguiria atender?",
    `${fulfill(diagnostic.operation.canFulfill30Orders)}\n${orEmpty(diagnostic.operation.fulfillmentExplanation)}`,
  );
  if (diagnostic.operation.areas.length === 0) writer.body(EMPTY);
  for (const area of diagnostic.operation.areas) {
    writer.bar(area.area, area.score ?? 0);
    if (area.observation) writer.mutedText(area.observation);
  }

  writer.h2("Pontuação Growloja");
  writer.drawText(
    diagnostic.digitalMaturityScore == null ? EMPTY : `${diagnostic.digitalMaturityScore} / 100`,
    { size: 22, bold: true, lineHeight: 28 },
  );
  writer.mutedText(diagnostic.evolutionInsight);
  writer.gap(10);
  if (diagnostic.maturityDimensions.length === 0) writer.body(EMPTY);
  for (const dimension of diagnostic.maturityDimensions) {
    writer.bar(dimension.name, dimension.score);
    if (dimension.description) writer.mutedText(dimension.description);
  }
  writer.gap(6);
  writer.mutedText("Indicador proprietário de diagnóstico - não é garantia de performance.");

  writer.h2("Oportunidades");
  writer.mutedText("Nem toda oportunidade merece ser executada agora.");
  writer.gap(8);
  writer.drawText("As 5 maiores oportunidades de crescimento", { size: 12, bold: true, lineHeight: 18 });
  writer.gap(6);
  if (diagnostic.topOpportunities.length === 0) writer.body(EMPTY);
  diagnostic.topOpportunities.forEach((item, index) => {
    writer.card(
      `${String(index + 1).padStart(2, "0")}  ${item.title}`,
      [item.description, `Impacto ${level(item.potential)} | Esforço ${level(item.effort)}`].filter(Boolean).join("\n"),
    );
  });

  writer.gap(6);
  writer.drawText("Matriz impacto x esforço", { size: 12, bold: true, lineHeight: 18 });
  writer.gap(6);
  const quadrants: Array<[string, DiagnosticView["opportunities"]]> = [
    ["Fazer agora", diagnostic.matrix.fazerAgora],
    ["Planejar", diagnostic.matrix.planejar],
    ["Experimentar", diagnostic.matrix.experimentar],
    ["Evitar por enquanto", diagnostic.matrix.evitar],
  ];
  for (const [title, items] of quadrants) {
    writer.card(title, items.length ? items.map((item) => item.title).join("\n") : "Nenhuma oportunidade neste quadrante.");
  }

  writer.h2("Plano de 90 dias");
  const phases = [
    ["0-30 dias · Fundação", diagnostic.plan.foundation],
    ["31-60 dias · Implementação", diagnostic.plan.implementation],
    ["61-90 dias · Otimização", diagnostic.plan.optimization],
  ] as const;
  for (const [title, items] of phases) {
    writer.card(
      title,
      items.length
        ? items.map((item) => `${item.title} (${planStatus(item.status)})`).join("\n")
        : EMPTY,
    );
  }

  writer.h2("Indicadores de evolução");
  if (diagnostic.kpis.length === 0) writer.body(EMPTY);
  for (const kpi of diagnostic.kpis) {
    const current = [kpi.currentValue, kpi.unit].filter(Boolean).join(" ");
    const target = kpi.targetValue ? `Meta: ${kpi.targetValue}` : "";
    writer.card(kpi.name, [current || EMPTY, target, kpi.description].filter(Boolean).join("\n"));
  }

  writer.h2("Conclusão");
  writer.body(diagnostic.generalConclusion || diagnostic.diagnosticStatement);

  const pages = pdf.getPages();
  pages.forEach((page, index) => {
    page.drawText(`Mapa de Crescimento Growloja  ·  ${index + 1}/${pages.length}`, {
      x: MARGIN,
      y: 24,
      size: 8,
      font,
      color: muted,
    });
  });

  return pdf.save();
}
