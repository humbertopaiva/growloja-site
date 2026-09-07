"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function PdfButton({ token, compact = false }: { token: string; compact?: boolean }) {
  const [loading, setLoading] = useState(false);

  async function download() {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/mapa-pdf/${encodeURIComponent(token)}`);
      if (!response.ok) throw new Error("pdf");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const header = response.headers.get("Content-Disposition") || "";
      const match = header.match(/filename="([^"]+)"/);
      link.href = url;
      link.download = match?.[1] || "mapa-de-crescimento.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.alert("Não foi possível baixar o diagnóstico agora. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={download}
      disabled={loading}
      className={cn(
        "rounded-full bg-ink text-sm text-white transition hover:opacity-90 disabled:opacity-60",
        compact ? "px-4 py-2" : "px-5 py-3",
      )}
    >
      {loading ? "Gerando PDF…" : "Baixar diagnóstico"}
    </button>
  );
}
