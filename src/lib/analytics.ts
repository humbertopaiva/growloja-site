type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }
}

export const conversionEvents = {
  ctaClick: "cta_solicitar_diagnostico",
  formOpen: "diagnostico_form_open",
  formStart: "diagnostico_form_start",
  formSubmit: "diagnostico_form_submit",
  formSuccess: "diagnostico_lead",
} as const;
