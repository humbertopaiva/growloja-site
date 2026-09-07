import type { CollectionConfig } from "payload";

export const Clients: CollectionConfig = {
  slug: "clients",
  labels: {
    singular: "Cliente",
    plural: "Clientes",
  },
  admin: {
    useAsTitle: "companyName",
    defaultColumns: ["companyName", "segment", "city", "updatedAt"],
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
  ],
};
