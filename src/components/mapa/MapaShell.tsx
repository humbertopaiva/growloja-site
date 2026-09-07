"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { mapaNav, mapaPath } from "@/components/mapa/nav";
import { PdfButton } from "@/components/mapa/PdfButton";
import { cn } from "@/lib/cn";

export function MapaShell({
  token,
  companyName,
  current,
  isDemo,
  isPreview,
  children,
}: {
  token: string;
  companyName: string;
  current: string;
  isDemo?: boolean;
  isPreview?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const currentItem = mapaNav.find((item) => item.slug === current) || mapaNav[0];

  return (
    <div className="min-h-full bg-paper">
      {isDemo ? (
        <div className="bg-accent px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.16em] text-ink">
          Demonstração · dados fictícios
        </div>
      ) : null}
      {isPreview ? (
        <div className="bg-ink px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.16em] text-white">
          Pré-visualização · ainda não publicado para o cliente
        </div>
      ) : null}
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="hidden w-64 shrink-0 border-r border-ink/8 bg-white p-6 lg:block">
          <Logo />
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted">Mapa de Crescimento</p>
          <p className="mt-2 text-sm font-medium">{companyName}</p>
          <nav className="mt-8 space-y-1 text-sm">
            {mapaNav.map((item) => (
              <Link
                key={item.slug}
                href={mapaPath(token, item.slug)}
                className={cn(
                  "block rounded-xl px-3 py-2 transition",
                  current === item.slug ? "bg-ink text-white" : "text-ink/70 hover:bg-paper",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-ink/8 bg-white px-4 py-3 lg:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                Mapa de Crescimento / {currentItem.label}
              </p>
              <p className="mt-1 hidden text-sm text-ink/70 sm:block">{companyName}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <PdfButton token={token} compact />
              </div>
              <button
                type="button"
                className="rounded-full border border-ink/10 px-4 py-2 text-sm lg:hidden"
                onClick={() => setOpen((value) => !value)}
              >
                Menu
              </button>
            </div>
          </header>
          {open ? (
            <nav className="border-b border-ink/8 bg-white px-4 py-3 lg:hidden">
              {mapaNav.map((item) => (
                <Link
                  key={item.slug}
                  href={mapaPath(token, item.slug)}
                  className="block py-2 text-sm"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 sm:hidden">
                <PdfButton token={token} compact />
              </div>
            </nav>
          ) : null}
          <div className="flex-1 px-4 py-8 md:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
