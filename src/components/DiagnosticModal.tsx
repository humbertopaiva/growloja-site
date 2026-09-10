"use client";

import { useEffect } from "react";
import { useDiagnostic } from "@/components/diagnostic-context";
import { DiagnosticForm } from "@/components/DiagnosticForm";

export function DiagnosticModal() {
  const { isOpen, close } = useDiagnostic();

  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center">
      <button
        type="button"
        aria-label="Fechar formulário"
        className="absolute inset-0 bg-ink/50"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnostico-title"
        className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-paper p-5 shadow-2xl md:max-w-2xl md:rounded-3xl md:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-deep">
              Diagnóstico de Crescimento Growloja
            </p>
            <h2 id="diagnostico-title" className="mt-2 text-2xl font-medium tracking-tight">
              Vamos entender o seu negócio
            </h2>
            <p className="mt-2 text-sm text-muted">
              Preencha os dados. É gratuito e sem compromisso.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-xl leading-none"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        <DiagnosticForm />
      </div>
    </div>
  );
}
