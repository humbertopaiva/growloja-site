import { NextRequest, NextResponse } from "next/server";

type Payload = {
  nome?: string;
  empresa?: string;
  whatsapp?: string;
  email?: string;
  cidade?: string;
  segmento?: string;
  siteInstagram?: string;
  vendeOnline?: string;
  objetivo?: string;
  dificuldade?: string;
  comoVende?: string;
  comoVendeOutra?: string;
  melhorar?: string[];
  melhorarOutro?: string;
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
  const melhorar = Array.isArray(body.melhorar) ? body.melhorar : [];

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

  const lead = {
    ...body,
    nome,
    empresa,
    whatsapp,
    email,
    cidade,
    segmento,
    vendeOnline,
    objetivo,
    dificuldade,
    comoVende,
    melhorar,
    createdAt: new Date().toISOString(),
    source: "diagnostico-growloja",
  };

  const webhook = process.env.DIAGNOSTICO_WEBHOOK_URL;

  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "Falha no destino" }, { status: 502 });
    }
  } else {
    console.info("[diagnostico]", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
