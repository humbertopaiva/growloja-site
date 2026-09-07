"use client";

import { useState } from "react";
import { useFormFields } from "@payloadcms/ui";

export function ShareLinkField() {
  const shareToken = useFormFields(([fields]) => fields.shareToken?.value);
  const status = useFormFields(([fields]) => fields.status?.value);
  const [copied, setCopied] = useState(false);

  const token = typeof shareToken === "string" ? shareToken : "";
  const path = token ? `/mapa/${token}` : "";
  const href =
    typeof window !== "undefined" && path ? `${window.location.origin}${path}` : path;
  const canShare = status === "published" && Boolean(token);

  async function copy() {
    if (!href) return;
    await navigator.clipboard.writeText(href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="field-type">
      <label className="field-label">Compartilhar diagnóstico</label>
      <p style={{ margin: "8px 0 12px", color: "var(--theme-elevation-500)", fontSize: 13 }}>
        {canShare
          ? "Este é o link exclusivo do cliente. Ele não entra no sitemap e não deve ser indexado."
          : "Publique o diagnóstico para o link do cliente passar a funcionar. Você ainda pode visualizar como cliente."}
      </p>
      <code
        style={{
          display: "block",
          marginBottom: 12,
          padding: 10,
          borderRadius: 8,
          background: "var(--theme-elevation-50)",
          wordBreak: "break-all",
          fontSize: 12,
        }}
      >
        {href || "O token será gerado ao salvar."}
      </code>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button className="btn btn--size-small btn--style-secondary" type="button" disabled={!href} onClick={copy}>
          {copied ? "Link copiado" : "Copiar link"}
        </button>
        {href ? (
          <a className="btn btn--size-small btn--style-primary" href={href} target="_blank" rel="noreferrer">
            Visualizar como cliente
          </a>
        ) : null}
      </div>
    </div>
  );
}
