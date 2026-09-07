"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useDiagnostic } from "@/components/diagnostic-context";
import { cn } from "@/lib/cn";
import { site } from "@/config/site";

type Props = {
  children?: ReactNode;
  source: string;
  variant?: "primary" | "accent" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

export function DiagnosticButton({
  children = site.cta.primary,
  source,
  variant = "primary",
  size = "lg",
  className,
}: Props) {
  const { open } = useDiagnostic();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={() => open(source)}
    >
      {children}
    </Button>
  );
}
