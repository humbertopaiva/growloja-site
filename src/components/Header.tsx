"use client";

import { useEffect, useState } from "react";
import { DiagnosticButton } from "@/components/DiagnosticButton";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors",
        scrolled
          ? "border-ink/8 bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.25rem] md:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm text-ink/80 lg:flex">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <DiagnosticButton source="header" size="md">
            {site.cta.primary}
          </DiagnosticButton>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={cn("h-px w-4 bg-ink transition", open && "translate-y-[3.5px] rotate-45")} />
            <span className={cn("h-px w-4 bg-ink transition", open && "-translate-y-[3.5px] -rotate-45")} />
          </span>
        </button>
      </div>
      {open ? (
        <div className="border-t border-ink/8 bg-paper px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3 text-sm">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-1"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4">
            <DiagnosticButton source="header-mobile" className="w-full" size="md">
              {site.cta.primary}
            </DiagnosticButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
