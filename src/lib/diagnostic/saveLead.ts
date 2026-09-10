import { getPayload } from "payload";
import config from "@payload-config";

export type DiagnosticLead = {
  nome: string;
  empresa: string;
  whatsapp: string;
  email: string;
  cidade: string;
  segmento: string;
  siteInstagram?: string;
  vendeOnline: string;
  objetivo: string;
  dificuldade: string;
  comoVende: string;
  comoVendeOutra?: string;
  melhorar: string[];
  melhorarOutro?: string;
};

function splitSiteInstagram(value = "") {
  const trimmed = value.trim();
  if (!trimmed) return {};
  if (trimmed.startsWith("@") || /instagram\.com/i.test(trimmed)) {
    return { instagram: trimmed };
  }
  if (trimmed.includes(".") || /^https?:\/\//i.test(trimmed)) {
    return { website: trimmed };
  }
  return { instagram: trimmed };
}

function formatIntakeNotes(lead: DiagnosticLead) {
  const comoVende =
    lead.comoVende === "Outra" && lead.comoVendeOutra?.trim()
      ? lead.comoVendeOutra.trim()
      : lead.comoVende;
  const melhorar = [...lead.melhorar];
  if (lead.melhorar.includes("Outro") && lead.melhorarOutro?.trim()) {
    melhorar.push(`Outro: ${lead.melhorarOutro.trim()}`);
  }

  return [
    `Nome: ${lead.nome}`,
    `Empresa: ${lead.empresa}`,
    `WhatsApp: ${lead.whatsapp}`,
    `E-mail: ${lead.email}`,
    `Cidade: ${lead.cidade}`,
    `Segmento: ${lead.segmento}`,
    lead.siteInstagram ? `Site / Instagram: ${lead.siteInstagram}` : null,
    `Já vende pela internet: ${lead.vendeOnline}`,
    `Como vende hoje: ${comoVende}`,
    `Objetivo: ${lead.objetivo}`,
    `Dificuldade: ${lead.dificuldade}`,
    `Quer melhorar: ${melhorar.join(", ")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function saveDiagnosticLead(lead: DiagnosticLead) {
  const payload = await getPayload({ config });
  const site = splitSiteInstagram(lead.siteInstagram);
  const comoVende =
    lead.comoVende === "Outra" && lead.comoVendeOutra?.trim()
      ? lead.comoVendeOutra.trim()
      : lead.comoVende;
  const existing = await payload.find({
    collection: "clients",
    where: { email: { equals: lead.email } },
    limit: 1,
    overrideAccess: true,
  });

  const clientData = {
    companyName: lead.empresa,
    tradeName: lead.empresa,
    contactName: lead.nome,
    email: lead.email,
    whatsapp: lead.whatsapp,
    city: lead.cidade,
    segment: lead.segmento,
    ...site,
    intake: {
      source: "formulario-diagnostico",
      vendeOnline: lead.vendeOnline,
      objetivo: lead.objetivo,
      dificuldade: lead.dificuldade,
      comoVende,
      melhorar: lead.melhorar,
      melhorarOutro: lead.melhorarOutro?.trim() || undefined,
      submittedAt: new Date().toISOString(),
    },
    ...(existing.docs[0] ? {} : { leadStatus: "novo" as const }),
  };

  const client = existing.docs[0]
    ? await payload.update({
        collection: "clients",
        id: existing.docs[0].id,
        data: clientData,
        overrideAccess: true,
      })
    : await payload.create({
        collection: "clients",
        data: clientData,
        overrideAccess: true,
      });

  const intakeNotes = formatIntakeNotes(lead);
  const openDiagnostic = await payload.find({
    collection: "diagnostics",
    where: {
      and: [
        { client: { equals: client.id } },
        { status: { in: ["draft", "in_progress"] } },
      ],
    },
    limit: 1,
    overrideAccess: true,
  });

  if (openDiagnostic.docs[0]) {
    await payload.update({
      collection: "diagnostics",
      id: openDiagnostic.docs[0].id,
      data: { intakeNotes },
      overrideAccess: true,
    });
  } else {
    await payload.create({
      collection: "diagnostics",
      overrideAccess: true,
      data: {
        title: `Diagnóstico — ${lead.empresa}`,
        client: client.id,
        status: "draft",
        intakeNotes,
      },
    });
  }

  return { clientId: client.id };
}
