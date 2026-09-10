import type { CollectionConfig } from "payload";

export const Clients: CollectionConfig = {
  slug: "clients",
  labels: {
    singular: "Cliente",
    plural: "Clientes",
  },
  admin: {
    useAsTitle: "companyName",
    defaultColumns: ["companyName", "contactName", "email", "city", "updatedAt"],
    group: "Growloja",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      required: true,
      label: "Razão / nome da empresa",
    },
    {
      name: "tradeName",
      type: "text",
      label: "Nome fantasia",
    },
    {
      name: "segment",
      type: "text",
      label: "Segmento",
    },
    {
      type: "row",
      fields: [
        { name: "city", type: "text", label: "Cidade" },
        { name: "state", type: "text", label: "Estado" },
      ],
    },
    { name: "website", type: "text", label: "Site" },
    { name: "instagram", type: "text", label: "Instagram" },
    { name: "whatsapp", type: "text", label: "WhatsApp" },
    { name: "contactName", type: "text", label: "Contato" },
    { name: "email", type: "email", label: "E-mail" },
    {
      name: "leadStatus",
      type: "select",
      label: "Status do lead",
      defaultValue: "novo",
      options: [
        { label: "Novo", value: "novo" },
        { label: "Em contato", value: "em_contato" },
        { label: "Convertido", value: "convertido" },
      ],
    },
    {
      type: "group",
      name: "intake",
      label: "Pedido pelo site",
      admin: {
        description: "Respostas do formulário de diagnóstico.",
      },
      fields: [
        {
          name: "source",
          type: "text",
          label: "Origem",
          defaultValue: "formulario-diagnostico",
          admin: { readOnly: true },
        },
        {
          name: "vendeOnline",
          type: "select",
          label: "Já vende pela internet?",
          options: [
            { label: "Sim", value: "Sim" },
            { label: "Não", value: "Não" },
            { label: "Em parte", value: "Em parte" },
          ],
        },
        { name: "objetivo", type: "textarea", label: "Principal objetivo" },
        { name: "dificuldade", type: "textarea", label: "Principal dificuldade" },
        { name: "comoVende", type: "text", label: "Como vende hoje" },
        {
          name: "melhorar",
          type: "select",
          hasMany: true,
          label: "O que quer melhorar",
          options: [
            { label: "Começar a vender online", value: "Começar a vender online" },
            { label: "Aumentar vendas online", value: "Aumentar vendas online" },
            { label: "Melhorar a operação atual", value: "Melhorar a operação atual" },
            { label: "Aumentar conversão", value: "Aumentar conversão" },
            { label: "Melhorar marketing", value: "Melhorar marketing" },
            { label: "Organizar processos", value: "Organizar processos" },
            { label: "Outro", value: "Outro" },
          ],
        },
        { name: "melhorarOutro", type: "text", label: "Outro (detalhe)" },
        { name: "submittedAt", type: "date", label: "Enviado em" },
      ],
    },
  ],
};
