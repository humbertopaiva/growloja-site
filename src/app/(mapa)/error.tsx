"use client";

export default function MapaError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-6">
      <p className="text-xs uppercase tracking-[0.18em] text-accent-deep">Mapa de Crescimento</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight">Não foi possível carregar este diagnóstico.</h1>
      <p className="mt-4 text-muted">Tente novamente. Se o link estiver correto, o diagnóstico pode estar temporariamente indisponível.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 w-fit rounded-full bg-ink px-5 py-3 text-sm text-white"
      >
        Tentar de novo
      </button>
    </main>
  );
}
