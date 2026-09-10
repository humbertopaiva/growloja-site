import { NextRequest, NextResponse } from "next/server";
import { saveDiagnosticLead, type DiagnosticLead } from "@/lib/diagnostic/saveLead";

type Payload = Partial<DiagnosticLead> & {
  melhorar?: string[];
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Payload;

  const nome = body.nome?.trim() || "";
  const empresa = body.empresa?.trim() || "";
  const whatsapp = body.whatsapp?.trim() || "";
  const email = body.email?.trim() || "";
  const cidade = body.cidade?.trim() || "";
  const segmento = body.segmento?.trim() || "";
  const vendeOnline = body.vendeOnline?.trim() || "";
  const objetivo = body.objetivo?.trim() || "";
  const dificuldade = body.dificuldade?.trim() || "";
  const comoVende = body.comoVende?.trim() || "";
  const melhorar = Array.isArray(body.melhorar) ? body.melhorar.filter(Boolean) : [];

  if (
    !nome ||
    !empresa ||
    whatsapp.replace(/\D/g, "").length < 10 ||
    !isValidEmail(email) ||
    !cidade ||
    !segmento ||
    !vendeOnline ||
    !objetivo ||
    !dificuldade ||
    !comoVende ||
    melhorar.length === 0
  ) {
    return NextResponse.json({ ok: false, error: "Dados inválidos" }, { status: 400 });
  }

  const lead: DiagnosticLead = {
    nome,
    empresa,
    whatsapp,
    email,
    cidade,
    segmento,
    siteInstagram: body.siteInstagram?.trim() || "",
    vendeOnline,
    objetivo,
    dificuldade,
    comoVende,
    comoVendeOutra: body.comoVendeOutra?.trim() || "",
    melhorar,
    melhorarOutro: body.melhorarOutro?.trim() || "",
  };

  try {
    await saveDiagnosticLead(lead);
  } catch (error) {
    console.error("[diagnostico] falha ao salvar no Payload", error);
    return NextResponse.json({ ok: false, error: "Falha ao salvar" }, { status: 500 });
  }

  const webhook = process.env.DIAGNOSTICO_WEBHOOK_URL;
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, createdAt: new Date().toISOString(), source: "diagnostico-growloja" }),
    });

    if (!response.ok) {
      console.error("[diagnostico] webhook falhou", response.status);
    }
  }

  return NextResponse.json({ ok: true });
}
