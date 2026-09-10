"use client";

import { useState } from "react";
import type { DiagnosticView } from "@/lib/diagnostic/types";
import { EmptyNote } from "@/components/mapa/ui";
import { cn } from "@/lib/cn";

const quadrants = [
  { key: "fazerAgora", title: "Fazer agora", hint: "Alto impacto · baixo esforço" },
  { key: "planejar", title: "Planejar", hint: "Alto impacto · alto esforço" },
  { key: "experimentar", title: "Experimentar", hint: "Baixo impacto · baixo esforço" },
  { key: "evitar", title: "Evitar por enquanto", hint: "Baixo impacto · alto esforço" },
] as const;

export function OpportunityMatrix({ diagnostic }: { diagnostic: DiagnosticView }) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedItem = diagnostic.opportunities.find((item) => item.id === selected);

  if (diagnostic.opportunities.length === 0) {
    return <EmptyNote />;
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        {quadrants.map((quadrant) => {
          const items = diagnostic.matrix[quadrant.key];
          return (
            <section key={quadrant.key} className="rounded-3xl border border-ink/8 bg-white p-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent-deep">{quadrant.title}</p>
              <p className="mt-1 text-sm text-muted">{quadrant.hint}</p>
              <ul className="mt-4 space-y-2">
                {items.length === 0 ? (
                  <li className="text-sm text-muted">Nenhuma oportunidade neste quadrante.</li>
                ) : (
                  items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        id={`oportunidade-${item.id}`}
                        onClick={() => setSelected(item.id)}
                        className={cn(
                          "w-full rounded-2xl border px-3 py-2 text-left text-sm transition",
                          selected === item.id
                            ? "border-accent bg-accent-soft"
                            : "border-ink/8 hover:border-ink/20",
                        )}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </section>
          );
        })}
      </div>
      {selectedItem ? (
        <article className="rounded-3xl bg-ink p-6 text-white">
          <p className="text-xs uppercase tracking-[0.16em] text-accent">Detalhe</p>
          <h3 className="mt-2 text-2xl font-medium">{selectedItem.title}</h3>
          <p className="mt-3 text-white/75">{selectedItem.description || "Sem descrição adicional."}</p>
          {selectedItem.recommendation ? (
            <p className="mt-4 text-sm text-white/80">{selectedItem.recommendation}</p>
          ) : null}
        </article>
      ) : null}
    </div>
  );
}
