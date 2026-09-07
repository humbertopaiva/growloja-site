"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { improveOptions, segments, sellChannels, site } from "@/config/site";
import { conversionEvents, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type FormState = {
  nome: string;
  empresa: string;
  whatsapp: string;
  email: string;
  cidade: string;
  segmento: string;
  siteInstagram: string;
  vendeOnline: string;
  objetivo: string;
  dificuldade: string;
  comoVende: string;
  comoVendeOutra: string;
  melhorar: string[];
  melhorarOutro: string;
};

const initialState: FormState = {
  nome: "",
  empresa: "",
  whatsapp: "",
  email: "",
  cidade: "",
  segmento: "",
  siteInstagram: "",
  vendeOnline: "",
  objetivo: "",
  dificuldade: "",
  comoVende: "",
  comoVendeOutra: "",
  melhorar: [],
  melhorarOutro: "",
};

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink/12 bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25";

function validate(data: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (!data.nome.trim()) errors.nome = "Informe seu nome.";
  if (!data.empresa.trim()) errors.empresa = "Informe o nome da empresa.";
  if (!data.whatsapp.trim() || data.whatsapp.replace(/\D/g, "").length < 10) {
    errors.whatsapp = "Informe um WhatsApp válido.";
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Informe um e-mail válido.";
  }
  if (!data.cidade.trim()) errors.cidade = "Informe a cidade.";
  if (!data.segmento) errors.segmento = "Selecione o segmento.";
  if (!data.vendeOnline) errors.vendeOnline = "Selecione uma opção.";
  if (!data.objetivo.trim()) errors.objetivo = "Informe o principal objetivo.";
  if (!data.dificuldade.trim()) errors.dificuldade = "Informe a principal dificuldade.";
  if (!data.comoVende) errors.comoVende = "Selecione como você vende hoje.";
  if (data.comoVende === "Outra" && !data.comoVendeOutra.trim()) {
    errors.comoVendeOutra = "Descreva como você vende hoje.";
  }
  if (data.melhorar.length === 0) {
    errors.melhorar = "Selecione pelo menos uma opção.";
  }
  if (data.melhorar.includes("Outro") && !data.melhorarOutro.trim()) {
    errors.melhorarOutro = "Descreva o que você gostaria de melhorar.";
  }

  return errors;
}

export function DiagnosticForm({ onSuccess }: { onSuccess?: () => void }) {
  const [data, setData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (!started) {
      setStarted(true);
      trackEvent(conversionEvents.formStart);
    }
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleMelhorar(option: string) {
    const next = data.melhorar.includes(option)
      ? data.melhorar.filter((item) => item !== option)
      : [...data.melhorar, option];
    update("melhorar", next);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate(data);
    setErrors(nextErrors);
    setServerError("");

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    trackEvent(conversionEvents.formSubmit);

    try {
      const response = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Falha no envio");
      }

      trackEvent(conversionEvents.formSuccess, { lead: true });
      setSuccess(true);
      onSuccess?.();
    } catch {
      setServerError("Não foi possível enviar agora. Tente novamente em instantes.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center md:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Diagnóstico solicitado
        </p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight text-ink">
          Recebemos suas informações.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Vamos analisar seu cenário e entrar em contato para os próximos passos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nome" error={errors.nome}>
          <input
            className={inputClass}
            value={data.nome}
            onChange={(e) => update("nome", e.target.value)}
            autoComplete="name"
          />
        </Field>
        <Field label="Empresa" error={errors.empresa}>
          <input
            className={inputClass}
            value={data.empresa}
            onChange={(e) => update("empresa", e.target.value)}
            autoComplete="organization"
          />
        </Field>
        <Field label="WhatsApp" error={errors.whatsapp}>
          <input
            className={inputClass}
            value={data.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
          />
        </Field>
        <Field label="E-mail" error={errors.email}>
          <input
            className={inputClass}
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
        </Field>
        <Field label="Cidade" error={errors.cidade}>
          <input
            className={inputClass}
            value={data.cidade}
            onChange={(e) => update("cidade", e.target.value)}
            autoComplete="address-level2"
          />
        </Field>
        <Field label="Segmento" error={errors.segmento}>
          <select
            className={cn(inputClass, "bg-white")}
            value={data.segmento}
            onChange={(e) => update("segmento", e.target.value)}
          >
            <option value="">Selecione</option>
            {segments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Site / Instagram">
        <input
          className={inputClass}
          value={data.siteInstagram}
          onChange={(e) => update("siteInstagram", e.target.value)}
          placeholder="site.com.br ou @instagram"
        />
      </Field>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          A empresa já vende pela internet?
        </legend>
        <div className="flex flex-wrap gap-2">
          {["Sim", "Não", "Em parte"].map((option) => (
            <label
              key={option}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm transition",
                data.vendeOnline === option
                  ? "border-accent bg-accent-soft text-ink"
                  : "border-ink/12 bg-white hover:border-ink/25",
              )}
            >
              <input
                type="radio"
                className="sr-only"
                name="vendeOnline"
                value={option}
                checked={data.vendeOnline === option}
                onChange={() => update("vendeOnline", option)}
              />
              {option}
            </label>
          ))}
        </div>
        {errors.vendeOnline ? (
          <p className="mt-1 text-xs text-red-600">{errors.vendeOnline}</p>
        ) : null}
      </fieldset>

      <Field label="Qual principal objetivo?" error={errors.objetivo}>
        <input
          className={inputClass}
          value={data.objetivo}
          onChange={(e) => update("objetivo", e.target.value)}
        />
      </Field>

      <Field label="Qual principal dificuldade hoje?" error={errors.dificuldade}>
        <input
          className={inputClass}
          value={data.dificuldade}
          onChange={(e) => update("dificuldade", e.target.value)}
        />
      </Field>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          Como você vende atualmente?
        </legend>
        <div className="flex flex-wrap gap-2">
          {sellChannels.map((option) => (
            <label
              key={option}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm transition",
                data.comoVende === option
                  ? "border-accent bg-accent-soft text-ink"
                  : "border-ink/12 bg-white hover:border-ink/25",
              )}
            >
              <input
                type="radio"
                className="sr-only"
                name="comoVende"
                value={option}
                checked={data.comoVende === option}
                onChange={() => update("comoVende", option)}
              />
              {option}
            </label>
          ))}
        </div>
        {data.comoVende === "Outra" ? (
          <input
            className={cn(inputClass, "mt-3")}
            placeholder="Descreva"
            value={data.comoVendeOutra}
            onChange={(e) => update("comoVendeOutra", e.target.value)}
          />
        ) : null}
        {errors.comoVende || errors.comoVendeOutra ? (
          <p className="mt-1 text-xs text-red-600">
            {errors.comoVende || errors.comoVendeOutra}
          </p>
        ) : null}
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink">
          O que você gostaria de melhorar?
        </legend>
        <div className="flex flex-wrap gap-2">
          {improveOptions.map((option) => (
            <label
              key={option}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm transition",
                data.melhorar.includes(option)
                  ? "border-accent bg-accent-soft text-ink"
                  : "border-ink/12 bg-white hover:border-ink/25",
              )}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={data.melhorar.includes(option)}
                onChange={() => toggleMelhorar(option)}
              />
              {option}
            </label>
          ))}
        </div>
        {data.melhorar.includes("Outro") ? (
          <input
            className={cn(inputClass, "mt-3")}
            placeholder="Descreva"
            value={data.melhorarOutro}
            onChange={(e) => update("melhorarOutro", e.target.value)}
          />
        ) : null}
        {errors.melhorar || errors.melhorarOutro ? (
          <p className="mt-1 text-xs text-red-600">
            {errors.melhorar || errors.melhorarOutro}
          </p>
        ) : null}
      </fieldset>

      {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}

      <div className="pt-2">
        <Button type="submit" variant="accent" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "Enviando..." : site.cta.formSubmit}
        </Button>
        <p className="mt-3 text-center text-sm text-muted">{site.cta.formHint}</p>
      </div>
    </form>
  );
}
