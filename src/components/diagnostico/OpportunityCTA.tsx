"use client";

import type { ReactNode } from "react";
import { DiagnosticButton } from "@/components/DiagnosticButton";
import { ButtonLink } from "@/components/ui/Button";

const LABEL = "Quero descobrir minhas oportunidades";

export function OpportunityCTA({
  source,
  href,
  variant = "accent",
  className,
}: {
  source: string;
  href?: string;
  variant?: "primary" | "accent" | "secondary" | "ghost";
  className?: string;
}) {
  if (href) {
    return (
      <ButtonLink href={href} variant={variant} size="lg" className={className}>
        {LABEL}
      </ButtonLink>
    );
  }

  return (
    <DiagnosticButton source={source} variant={variant} className={className}>
      {LABEL}
    </DiagnosticButton>
  );
}

export function OpportunityHint({
  children = "Diagnóstico inicial gratuito e sem compromisso.",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <p className={className ?? "mt-3 text-sm text-muted"}>{children}</p>;
}
