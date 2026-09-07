import Link from "next/link";
import { EmptyNote, MapaCard, Stat } from "@/components/mapa/ui";
import { OpportunityMatrix } from "@/components/mapa/OpportunityMatrix";
import { PdfButton } from "@/components/mapa/PdfButton";
import { emptyCopy, mapaPath } from "@/components/mapa/nav";
import type { DiagnosticView } from "@/lib/diagnostic/types";

const statusLabel: Record<string, string> = {
  published: "Diagnóstico concluído",
  completed: "Diagnóstico concluído",
  in_progress: "Em andamento",
  draft: "Rascunho",
  archived: "Arquivado",
};

const fulfillLabel: Record<string, string> = {
  sim: "Sim",
  parcialmente: "Parcialmente",
  nao: "Não",
};

const roleLabel: Record<string, string> = {
  entrada: "Produto de entrada",
  margem: "Produto de margem",
  recorrencia: "Produto de recorrência",
  conveniencia: "Produto de conveniência",
  complementar: "Produto complementar",
};

const channelStatusLabel: Record<string, string> = {
  forte: "Forte",
  adequado: "Adequado",
  atencao: "Atenção",
  critico: "Crítico",
  nao_aplicavel: "Não aplicável",
};

const planStatusLabel: Record<string, string> = {
  nao_iniciado: "Não iniciado",
  em_andamento: "Em andamento",
  concluido: "Concluído",
};

function formatDate(value?: string | null) {
  if (!value) return emptyCopy.missing;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR");
}

function level(value?: string | null) {
  if (value === "alto") return "Alto";
  if (value === "medio") return "Médio";
  if (value === "baixo") return "Baixo";
  return value || emptyCopy.missing;
}

function barWidth(value?: string | null) {
  if (value === "alto") return "88%";
  if (value === "medio") return "55%";
  if (value === "baixo") return "28%";
  return "0%";
}

export function Overview({ diagnostic, token }: { diagnostic: DiagnosticView; token: string }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Diagnóstico de Crescimento
          </p>
          <h1 className="mt-2 text-4xl font-medium tracking-tight">{diagnostic.companyName}</h1>
          <p className="mt-3 text-muted">
            {formatDate(diagnostic.diagnosticDate)} · {statusLabel[diagnostic.status] || diagnostic.status}
          </p>
        </div>
        <PdfButton token={token} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <MapaCard>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Maturidade digital</p>
          <p className="mt-3 text-6xl font-medium">
            {diagnostic.digitalMaturityScore ?? "–"}
            <span className="text-2xl text-muted">/100</span>
          </p>
          <p className="mt-4 max-w-md text-muted">{diagnostic.evolutionInsight}</p>
          <p className="mt-4 text-xs text-muted">
            Indicador proprietário de diagnóstico — não é garantia de performance.
          </p>
        </MapaCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <MapaCard title="O que encontramos">
            <p className="text-lg font-medium">
              {diagnostic.keyFindings[0]?.title || emptyCopy.missing}
            </p>
          </MapaCard>
          <MapaCard title="Principais oportunidades">
            <p className="text-lg font-medium">
              {diagnostic.topOpportunities[0]?.title || emptyCopy.missing}
            </p>
          </MapaCard>
          <MapaCard title="Prioridade atual">
            <p className="text-lg font-medium">
              {diagnostic.topOpportunities.find((item) => item.priority === "agora")?.title ||
                diagnostic.topOpportunities[0]?.title ||
                emptyCopy.missing}
            </p>
          </MapaCard>
          <MapaCard title="Próximo passo">
            <p className="text-lg font-medium">
              {diagnostic.plan.foundation[0]?.title || emptyCopy.missing}
            </p>
          </MapaCard>
        </div>
      </div>

      <MapaCard title="O que você precisa saber">
        {diagnostic.keyFindings.length === 0 ? (
          <EmptyNote />
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {diagnostic.keyFindings.slice(0, 5).map((item) => (
              <div key={item.title} className="rounded-2xl bg-paper p-4">
                <p className="font-medium">{item.title}</p>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </MapaCard>

      {diagnostic.diagnosticStatement ? (
        <blockquote className="rounded-[28px] bg-ink p-8 text-2xl font-medium leading-tight text-white md:text-3xl">
          {diagnostic.diagnosticStatement}
        </blockquote>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Link
          href={mapaPath(token, "oportunidades")}
          className="rounded-full bg-ink px-5 py-3 text-sm text-white"
        >
          Ver oportunidades
        </Link>
        <Link href={mapaPath(token, "plano")} className="rounded-full border border-ink/15 px-5 py-3 text-sm">
          Ver plano de 90 dias
        </Link>
      </div>
    </div>
  );
}

export function BusinessSection({ diagnostic }: { diagnostic: DiagnosticView }) {
  const b = diagnostic.business;
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-medium tracking-tight">Raio-x do negócio</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Ticket médio" value={b.averageTicket} />
        <Stat label="Volume" value={b.salesVolume} />
        <Stat label="Equipe" value={b.teamSize} />
      </div>
      {b.revenue || b.mainProducts ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Stat label="Faturamento" value={b.revenue} />
          <MapaCard title="Principais produtos">
            {b.mainProducts ? <p>{b.mainProducts}</p> : <EmptyNote />}
          </MapaCard>
        </div>
      ) : null}
      <MapaCard title="Visão do negócio">
        {b.overview ? <p className="leading-relaxed">{b.overview}</p> : <EmptyNote />}
      </MapaCard>
      <div className="grid gap-4 md:grid-cols-2">
        <MapaCard title="Posição de mercado">
          {b.marketPosition ? <p>{b.marketPosition}</p> : <EmptyNote />}
        </MapaCard>
        <MapaCard title="Canais">
          {b.channels ? <p>{b.channels}</p> : <EmptyNote />}
        </MapaCard>
      </div>
      {b.operationalNotes ? (
        <MapaCard title="Notas operacionais">
          <p className="leading-relaxed">{b.operationalNotes}</p>
        </MapaCard>
      ) : null}
      {b.customMetrics.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {b.customMetrics.map((item) => (
            <Stat key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CustomerSection({ diagnostic }: { diagnostic: DiagnosticView }) {
  const c = diagnostic.customer;
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-medium tracking-tight">Perfil do cliente</h1>
      <MapaCard>{c.profile ? <p className="leading-relaxed">{c.profile}</p> : <EmptyNote />}</MapaCard>
      <div className="grid gap-4 md:grid-cols-3">
        <MapaCard title="Motivações">
          {c.motivations.length ? (
            <ul className="space-y-2 text-sm">{c.motivations.map((item) => <li key={item}>{item}</li>)}</ul>
          ) : (
            <EmptyNote />
          )}
        </MapaCard>
        <MapaCard title="Barreiras">
          {c.barriers.length ? (
            <ul className="space-y-2 text-sm">{c.barriers.map((item) => <li key={item}>{item}</li>)}</ul>
          ) : (
            <EmptyNote />
          )}
        </MapaCard>
        <MapaCard title="Canais de compra">
          {c.purchaseChannels.length ? (
            <ul className="space-y-2 text-sm">{c.purchaseChannels.map((item) => <li key={item}>{item}</li>)}</ul>
          ) : (
            <EmptyNote />
          )}
        </MapaCard>
      </div>
      {c.insights.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {c.insights.map((item) => (
            <MapaCard key={item.title} title={item.title}>
              {item.description ? <p className="text-sm leading-relaxed">{item.description}</p> : <EmptyNote />}
              {item.evidence ? <p className="mt-3 text-sm text-muted">Evidência: {item.evidence}</p> : null}
              {item.opportunity ? <p className="mt-2 text-sm">Oportunidade: {item.opportunity}</p> : null}
            </MapaCard>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProductsSection({ diagnostic }: { diagnostic: DiagnosticView }) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-medium tracking-tight">Mix de produtos</h1>
      {diagnostic.products.length === 0 ? (
        <EmptyNote />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {diagnostic.products.map((item) => (
            <MapaCard key={item.name} title={item.category || "Produto"}>
              <p className="text-xl font-medium">{item.name}</p>
              {item.roles.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.roles.map((role) => (
                    <span key={role} className="rounded-full bg-paper px-3 py-1 text-xs text-muted">
                      {roleLabel[role] || role}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="mt-4 space-y-3">
                {[
                  ["Potencial digital", item.digitalPotential],
                  ["Demanda", item.demand],
                  ["Margem", item.margin],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-muted">
                      <span>{label}</span>
                      <span>{level(value)}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-paper-2">
                      <div className="h-full rounded-full bg-accent" style={{ width: barWidth(value) }} />
                    </div>
                  </div>
                ))}
              </div>
              {item.recommendation ? <p className="mt-4 text-sm">{item.recommendation}</p> : null}
            </MapaCard>
          ))}
        </div>
      )}
    </div>
  );
}

export function CompetitorsSection({ diagnostic }: { diagnostic: DiagnosticView }) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-medium tracking-tight">Concorrência</h1>
      {diagnostic.competitors.length === 0 ? (
        <EmptyNote />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {diagnostic.competitors.map((item) => (
            <MapaCard key={item.name}>
              <h2 className="text-xl font-medium">{item.name}</h2>
              <p className="mt-3 text-sm text-muted">{item.digitalPresence || item.positioning}</p>
              {item.pricePosition || item.assortment ? (
                <p className="mt-2 text-sm text-muted">
                  {[item.pricePosition, item.assortment].filter(Boolean).join(" · ")}
                </p>
              ) : null}
              <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-accent">Forças</p>
                  <p className="mt-1">{item.strengths || emptyCopy.missing}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-accent">Fraquezas</p>
                  <p className="mt-1">{item.weaknesses || emptyCopy.missing}</p>
                </div>
              </div>
            </MapaCard>
          ))}
        </div>
      )}
    </div>
  );
}

export function DigitalSection({ diagnostic }: { diagnostic: DiagnosticView }) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-medium tracking-tight">Presença digital</h1>
      {diagnostic.digitalChannels.length === 0 ? (
        <EmptyNote />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {diagnostic.digitalChannels.map((item) => (
            <MapaCard key={item.channel + item.label} title={item.label}>
              <p className="text-3xl font-medium">{item.score ?? "–"}</p>
              <p className="mt-2 text-sm text-muted">
                {channelStatusLabel[item.status || ""] || item.status || emptyCopy.na}
              </p>
              <p className="mt-4 text-sm">{item.analysis || emptyCopy.missing}</p>
              {item.opportunity ? <p className="mt-3 text-sm text-muted">{item.opportunity}</p> : null}
              {item.recommendation ? <p className="mt-2 text-sm">{item.recommendation}</p> : null}
            </MapaCard>
          ))}
        </div>
      )}
    </div>
  );
}

export function OperationSection({ diagnostic }: { diagnostic: DiagnosticView }) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-medium tracking-tight">Operação</h1>
      <MapaCard title="Se amanhã chegassem 30 pedidos online, essa empresa conseguiria atender?">
        <p className="text-3xl font-medium">
          {fulfillLabel[diagnostic.operation.canFulfill30Orders || ""] || emptyCopy.missing}
        </p>
        <p className="mt-3 text-muted">
          {diagnostic.operation.fulfillmentExplanation || emptyCopy.missing}
        </p>
      </MapaCard>
      <div className="grid gap-4 md:grid-cols-2">
        {diagnostic.operation.areas.length === 0 ? (
          <div className="md:col-span-2">
            <EmptyNote />
          </div>
        ) : (
          diagnostic.operation.areas.map((item) => (
            <MapaCard key={item.area} title={item.area}>
              <p className="text-3xl font-medium">{item.score ?? "–"}</p>
              <p className="mt-3 text-sm">{item.observation || emptyCopy.missing}</p>
            </MapaCard>
          ))
        )}
      </div>
    </div>
  );
}

export function MaturitySection({ diagnostic }: { diagnostic: DiagnosticView }) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-medium tracking-tight">Pontuação Growloja</h1>
      <MapaCard>
        <p className="text-6xl font-medium">
          {diagnostic.digitalMaturityScore ?? "–"}
          <span className="text-2xl text-muted">/100</span>
        </p>
        <p className="mt-4 text-muted">{diagnostic.evolutionInsight}</p>
      </MapaCard>
      <div className="space-y-3">
        {diagnostic.maturityDimensions.map((item) => (
          <MapaCard key={item.name}>
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium">{item.name}</p>
              <p>{item.score}</p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper-2">
              <div className="h-full rounded-full bg-accent" style={{ width: `${item.score}%` }} />
            </div>
            {item.description ? <p className="mt-3 text-sm text-muted">{item.description}</p> : null}
          </MapaCard>
        ))}
      </div>
    </div>
  );
}

export function OpportunitiesSection({ diagnostic }: { diagnostic: DiagnosticView }) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-medium tracking-tight">Oportunidades</h1>
      <p className="max-w-2xl text-muted">Nem toda oportunidade merece ser executada agora.</p>
      <MapaCard title="As 5 maiores oportunidades de crescimento">
        {diagnostic.topOpportunities.length === 0 ? (
          <EmptyNote />
        ) : (
          <ol className="space-y-4">
            {diagnostic.topOpportunities.map((item, index) => (
              <li key={item.id} className="border-t border-ink/8 pt-4 first:border-0 first:pt-0">
                <p className="text-xs text-accent">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-1 text-lg font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
                  Impacto {level(item.potential)} · Esforço {level(item.effort)}
                </p>
                <a href={`#oportunidade-${item.id}`} className="mt-3 inline-block text-sm text-ink underline-offset-4 hover:underline">
                  Ver análise
                </a>
              </li>
            ))}
          </ol>
        )}
      </MapaCard>
      <OpportunityMatrix diagnostic={diagnostic} />
    </div>
  );
}

export function PlanSection({ diagnostic }: { diagnostic: DiagnosticView }) {
  const phases = [
    { key: "foundation", title: "0–30 dias", subtitle: "Fundação", items: diagnostic.plan.foundation },
    { key: "implementation", title: "31–60 dias", subtitle: "Implementação", items: diagnostic.plan.implementation },
    { key: "optimization", title: "61–90 dias", subtitle: "Otimização", items: diagnostic.plan.optimization },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-medium tracking-tight">Plano de 90 dias</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        {phases.map((phase) => (
          <MapaCard key={phase.key} title={phase.title}>
            <p className="mb-4 text-lg font-medium">{phase.subtitle}</p>
            {phase.items.length === 0 ? (
              <EmptyNote />
            ) : (
              <ul className="space-y-3 text-sm">
                {phase.items.map((item) => (
                  <li key={item.title} className="rounded-xl bg-paper px-3 py-2">
                    <p>{item.title}</p>
                    <p className="mt-1 text-xs text-muted">
                      {planStatusLabel[item.status || ""] || emptyCopy.missing}
                      {item.responsible ? ` · ${item.responsible}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </MapaCard>
        ))}
      </div>
    </div>
  );
}

export function KpisSection({ diagnostic }: { diagnostic: DiagnosticView }) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-medium tracking-tight">Indicadores de evolução</h1>
      {diagnostic.kpis.length === 0 ? (
        <EmptyNote />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {diagnostic.kpis.map((item) => (
            <Stat
              key={item.name}
              label={item.name}
              value={
                item.currentValue
                  ? `${item.currentValue}${item.unit ? ` ${item.unit}` : ""}${item.targetValue ? ` → ${item.targetValue}` : ""}`
                  : emptyCopy.missing
              }
            />
          ))}
        </div>
      )}
      {diagnostic.generalConclusion ? (
        <MapaCard title="Conclusão">
          <p className="leading-relaxed">{diagnostic.generalConclusion}</p>
        </MapaCard>
      ) : null}
    </div>
  );
}
