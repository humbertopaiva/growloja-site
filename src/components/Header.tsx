"use client";

import { useEffect, useState } from "react";
import { DiagnosticButton } from "@/components/DiagnosticButton";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuOpen = open && entered;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-open", open);
    return () => document.body.classList.remove("mobile-nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const timeout = window.setTimeout(() => setEntered(true), 20);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function closeMenu() {
    setEntered(false);
  }

  function toggleMenu() {
    if (open) closeMenu();
    else setOpen(true);
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors",
          scrolled || open
            ? "border-ink/8 bg-paper"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.25rem] md:px-8">
          <Logo onClick={closeMenu} />
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
            className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={toggleMenu}
          >
            <span className="sr-only">Menu</span>
            <span className="flex h-3.5 w-4 flex-col justify-between">
              <span
                className={cn(
                  "block h-px w-4 origin-center bg-ink transition duration-300 ease-out",
                  menuOpen && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-ink transition duration-200 ease-out",
                  menuOpen && "scale-x-0 opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 origin-center bg-ink transition duration-300 ease-out",
                  menuOpen && "-translate-y-[6px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="menu-mobile"
          className={cn(
            "fixed inset-0 z-[45] flex h-dvh w-full flex-col bg-paper pt-16 lg:hidden",
            "transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            menuOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-full opacity-0",
          )}
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.propertyName !== "opacity") return;
            if (!entered) setOpen(false);
          }}
        >
          <nav className="flex flex-1 flex-col justify-center px-6 sm:px-8">
            {site.nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b border-ink/8 py-5 text-3xl font-medium tracking-tight text-ink transition duration-500 ease-out",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
                )}
                style={{ transitionDelay: menuOpen ? `${120 + index * 60}ms` : "0ms" }}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div
            className="px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8"
            onClick={closeMenu}
          >
            <DiagnosticButton source="header-mobile" className="w-full lg:w-full" size="lg">
              {site.cta.primary}
            </DiagnosticButton>
          </div>
        </div>
      ) : null}
    </>
  );
}
