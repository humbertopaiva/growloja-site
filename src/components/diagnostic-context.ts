"use client";

import { createContext, useContext } from "react";

export type DiagnosticContextValue = {
  isOpen: boolean;
  open: (source?: string) => void;
  close: () => void;
};

export const DiagnosticContext = createContext<DiagnosticContextValue | null>(null);

export function useDiagnostic() {
  const ctx = useContext(DiagnosticContext);
  if (!ctx) {
    throw new Error("useDiagnostic deve ser usado dentro de DiagnosticProvider");
  }
  return ctx;
}
