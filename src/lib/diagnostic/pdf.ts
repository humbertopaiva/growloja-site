import type { DiagnosticView } from "./types";
import { renderDiagnosticPdf as renderPdfBytes } from "./renderPdf";

export function canExportPdf() {
  return true;
}

export function pdfFileName(diagnostic: DiagnosticView) {
  const base = (diagnostic.tradeName || diagnostic.companyName || "diagnostico")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return `mapa-de-crescimento-${base || "diagnostico"}.pdf`;
}

export async function renderDiagnosticPdf(diagnostic: DiagnosticView) {
  return renderPdfBytes(diagnostic);
}

export async function exportDiagnosticPdf(diagnostic: DiagnosticView) {
  return renderDiagnosticPdf(diagnostic);
}
