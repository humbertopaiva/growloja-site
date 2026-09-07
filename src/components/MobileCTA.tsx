"use client";

import { DiagnosticButton } from "@/components/DiagnosticButton";
import { site } from "@/config/site";

export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/8 bg-paper/95 p-3 backdrop-blur md:hidden">
      <DiagnosticButton source="mobile-sticky" className="w-full" size="md">
        {site.cta.primary}
      </DiagnosticButton>
    </div>
  );
}
