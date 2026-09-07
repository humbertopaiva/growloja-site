import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f4f8",
          color: "#291a37",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#291a37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b177ff",
              fontSize: 20,
            }}
          >
            G
          </div>
          GROWLOJA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 920 }}>
          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1 }}>
            Colocamos sua empresa para vender pela internet.
          </div>
          <div style={{ fontSize: 26, color: "#6d6478", lineHeight: 1.4 }}>
            Implantação e crescimento de vendas para negócios que já existem no físico.
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#b177ff", fontWeight: 600 }}>
          Diagnóstico de Crescimento gratuito
        </div>
      </div>
    ),
    { ...size },
  );
}
