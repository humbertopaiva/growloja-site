"use client";

import { DiagnosticButton } from "@/components/DiagnosticButton";
import { useFoldCtaOutOfView } from "@/hooks/useFoldCtaOutOfView";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

export function MobileCTA() {
  const visible = useFoldCtaOutOfView();

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-ink/8 bg-paper/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition duration-300 ease-out md:hidden",
        "in-[.mobile-nav-open]:pointer-events-none in-[.mobile-nav-open]:translate-y-full in-[.mobile-nav-open]:opacity-0",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={!visible}
    >
      <DiagnosticButton source="mobile-sticky" className="w-full lg:w-full" size="md">
        {site.cta.primary}
      </DiagnosticButton>
    </div>
  );
}
