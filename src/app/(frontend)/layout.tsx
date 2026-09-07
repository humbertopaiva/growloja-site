import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { DiagnosticProvider } from "@/components/DiagnosticProvider";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s | ${site.name}`,
  },
  description: site.seo.description,
  applicationName: site.name,
  keywords: [
    "vender pela internet",
    "implantação de e-commerce",
    "vendas online para varejo",
    "diagnóstico de crescimento",
    "operação digital",
    "PME",
    "Growloja",
  ],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#291a37",
  width: "device-width",
  initialScale: 1,
};

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full bg-paper font-sans text-ink">
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Analytics />
        <JsonLd />
        <DiagnosticProvider>{children}</DiagnosticProvider>
      </body>
    </html>
  );
}
