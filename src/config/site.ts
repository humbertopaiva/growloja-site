export const site = {
  name: "Growloja",
  tagline: "Colocamos sua empresa para vender pela internet.",
  shortDescription:
    "Implantação e crescimento de vendas pela internet para pequenas e médias empresas.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://growloja.com.br",
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5500000000000",
    email: process.env.NEXT_PUBLIC_EMAIL || "contato@growloja.com.br",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM || "https://instagram.com/growloja",
    whatsappMessage:
      process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
      "Olá, quero solicitar o Diagnóstico de Crescimento Growloja.",
  },
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
    gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  },
  seo: {
    title: "Growloja | Colocamos sua empresa para vender pela internet",
    description:
      "A Growloja estrutura, implanta e acompanha a operação digital de empresas tradicionais. Diagnóstico de crescimento gratuito e sem compromisso.",
  },
  cta: {
    primary: "Solicitar diagnóstico",
    secondary: "Como funciona",
    formSubmit: "Quero meu diagnóstico",
    formHint: "Gratuito e sem compromisso.",
  },
  nav: [
    { href: "/#inicio", label: "Início" },
    { href: "/#como-funciona", label: "Como funciona" },
    { href: "/#solucoes", label: "Soluções" },
    { href: "/diagnostico", label: "Diagnóstico" },
    { href: "/#contato", label: "Contato" },
  ],
  images: {
    problema: {
      src: "/images/problema.jpg",
      alt: "Dono de loja tradicional no fim do expediente, diante das prateleiras",
    },
    operacao: {
      src: "/images/operacao.jpg",
      alt: "Equipe de varejo cuidando da operação real da loja",
    },
    cta: {
      src: "/images/cta-final.jpg",
      alt: "Empreendedores na porta da loja física que já construíram",
    },
    imersao: {
      src: "/images/imersao.jpg",
      alt: "Conversa na loja durante a imersão no negócio",
    },
    diagnosticoClose: {
      src: "/images/diagnostico-close.jpg",
      alt: "Dono de loja tradicional no meio da operação que já construiu",
    },
  },
} as const;

export function whatsappUrl(message = site.contact.whatsappMessage) {
  const phone = site.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const segments = [
  "Materiais de construção",
  "Supermercado",
  "Suplementos",
  "Farmácia / drugstore",
  "Moda",
  "Cosméticos",
  "Varejo em geral",
  "Outro",
] as const;

export const sellChannels = [
  "Apenas loja física",
  "WhatsApp",
  "Instagram",
  "Site/e-commerce",
  "Marketplace",
  "Vários canais",
  "Outra",
] as const;

export const improveOptions = [
  "Começar a vender online",
  "Aumentar vendas online",
  "Melhorar a operação atual",
  "Aumentar conversão",
  "Melhorar marketing",
  "Organizar processos",
  "Outro",
] as const;
