"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { conversionEvents, trackEvent } from "@/lib/analytics";
import { DiagnosticContext } from "@/components/diagnostic-context";
import { DiagnosticModal } from "./DiagnosticModal";

export { useDiagnostic } from "@/components/diagnostic-context";

export function DiagnosticProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((source = "unknown") => {
    setIsOpen(true);
    trackEvent(conversionEvents.formOpen, { source });
    trackEvent(conversionEvents.ctaClick, { source });
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <DiagnosticContext.Provider value={value}>
      {children}
      <DiagnosticModal />
    </DiagnosticContext.Provider>
  );
}
