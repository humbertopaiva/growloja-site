import type { ReactNode } from "react";
import { emptyCopy } from "@/components/mapa/nav";

export function EmptyNote({ children = emptyCopy.missing }: { children?: string }) {
  return <p className="text-sm text-muted">{children}</p>;
}

export function MapaCard({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-3xl border border-ink/8 bg-white p-6">
      {title ? (
        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-accent-deep">{title}</h2>
      ) : null}
      {children}
    </article>
  );
}

export function Stat({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="rounded-2xl bg-paper p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-2 text-lg font-medium">{value || emptyCopy.missing}</p>
    </div>
  );
}
