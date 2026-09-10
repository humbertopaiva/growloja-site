export const site = {
  name: "Growloja",
  tagline: "Sua loja já vende. Vamos fazer sua operação vender melhor.",
  shortDescription:
    "Assessoria para pequenas e médias operações de varejo.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://growloja.com.br",
  lojee: {
    name: "Lojee",
    url: process.env.NEXT_PUBLIC_LOJEE_URL || "https://lojee.com.br",
  },
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
    title: "Growloja | Sua loja já vende. Vamos fazer sua operação vender melhor.",
    description:
      "A Growloja identifica gargalos e oportunidades e estrutura estratégias que conectam vendas, marketing e tecnologia para pequenas e médias operações de varejo. Diagnóstico gratuito e sem compromisso.",
  },
  cta: {
    primary: "Fazer diagnóstico gratuito",
    secondary: "Como funciona o diagnóstico",
    formSubmit: "Quero fazer meu diagnóstico",
    formHint: "Gratuito e sem compromisso.",
  },
  nav: [
    { href: "/#inicio", label: "Início" },
    { href: "/#o-que-fazemos", label: "O que fazemos" },
    { href: "/#estrategia", label: "Estratégia" },
    { href: "/diagnostico", label: "Diagnóstico" },
    { href: "/#contato", label: "Contato" },
  ],
  images: {
    hero: {
      src: "/images/hero-loja.jpg",
      alt: "Atendimento na loja: vendedor e cliente em um momento de confiança",
    },
    problema: {
      src: "/images/atendimento-confianca.jpg",
      alt: "Vendedora atendendo um cliente no balcão da loja",
    },
    operacao: {
      src: "/images/operacao.jpg",
      alt: "Equipe de varejo cuidando da operação real da loja",
    },
    fisicoDigital: {
      src: "/images/qr-loja.jpg",
      alt: "Cliente na loja física acessando uma oferta digital pelo celular",
    },
    cta: {
      src: "/images/donos-loja.jpg",
      alt: "Donos de loja na porta do negócio que já construíram",
    },
    diagnosticoHero: {
      src: "/images/diagnostico-hero-placeholder.jpg",
      alt: "Consultoria em uma loja de materiais de construção durante o diagnóstico",
    },
    imersao: {
      src: "/images/imersao.jpg",
      alt: "Conversa na loja durante a imersão no negócio",
    },
    diagnosticoClose: {
      src: "/images/diagnostico-close.jpg",
      alt: "Dona de loja no meio da operação que já construiu",
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
