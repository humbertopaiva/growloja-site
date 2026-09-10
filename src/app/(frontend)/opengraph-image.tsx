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
          background: "#f3f1ea",
          color: "#171a16",
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
              background: "#171a16",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b5e766",
              fontSize: 20,
            }}
          >
            G
          </div>
          GROWLOJA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 920 }}>
          <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.12 }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#719d17", fontWeight: 600 }}>
          Diagnóstico de Crescimento gratuito
        </div>
      </div>
    ),
    { ...size },
  );
}
