import { NextResponse } from "next/server";
import { getShareableDiagnostic } from "@/lib/diagnostic/getPublishedDiagnostic";
import { pdfFileName, renderDiagnosticPdf } from "@/lib/diagnostic/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const result = await getShareableDiagnostic(token);
  if (!result) {
    return NextResponse.json({ error: "Diagnóstico não encontrado." }, { status: 404 });
  }

  try {
    const bytes = await renderDiagnosticPdf(result.diagnostic);
    const filename = pdfFileName(result.diagnostic);
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch (error) {
    console.error("Falha ao gerar PDF do diagnóstico", error);
    return NextResponse.json({ error: "Não foi possível gerar o PDF." }, { status: 500 });
  }
}
