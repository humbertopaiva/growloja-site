import Link from "next/link";

export default function MapaNotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-6 py-16">
      <p className="text-xs uppercase tracking-[0.18em] text-accent-deep">Mapa de Crescimento</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight">Este diagnóstico não está disponível.</h1>
      <p className="mt-4 text-muted">
        O link pode estar incompleto, o diagnóstico ainda não foi publicado ou o acesso expirou.
      </p>
      <Link href="/" className="mt-8 w-fit rounded-full bg-ink px-5 py-3 text-sm text-white">
        Ir para o site
      </Link>
    </main>
  );
}
