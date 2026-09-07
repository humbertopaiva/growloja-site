import { cache } from "react";
import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { mapDiagnostic } from "./mapDiagnostic";
import type { DiagnosticView } from "./types";

export type ShareableDiagnostic = {
  diagnostic: DiagnosticView;
  isPreview: boolean;
};

export const getShareableDiagnostic = cache(async (token: string): Promise<ShareableDiagnostic | null> => {
  if (!token) return null;

  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "diagnostics",
    where: { shareToken: { equals: token } },
    depth: 2,
    limit: 1,
    overrideAccess: true,
  });

  const doc = result.docs[0] as { status?: string } | undefined;
  if (!doc) return null;

  const published = doc.status === "published";
  if (!published) {
    const { user } = await payload.auth({ headers: await headers() });
    if (!user) return null;
  }

  return {
    diagnostic: mapDiagnostic(doc as unknown as Record<string, unknown>),
    isPreview: !published,
  };
});

export async function getPublishedDiagnostic(token: string): Promise<DiagnosticView | null> {
  const result = await getShareableDiagnostic(token);
  return result?.diagnostic ?? null;
}
