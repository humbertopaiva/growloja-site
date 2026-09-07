import type { Payload } from "payload";

type PostgresAdapterLike = {
  drizzle?: unknown;
  extensions?: { postgis?: boolean };
  requireDrizzleKit?: () => {
    pushSchema: (
      schema: unknown,
      drizzle: unknown,
      schemaNames?: string[],
      tablesFilter?: string[],
      extensionsFilter?: string[],
    ) => Promise<{
      apply: () => Promise<void> | void;
      hasDataLoss: boolean;
      warnings: string[];
    }>;
  };
  schema?: unknown;
  schemaName?: string;
  tablesFilter?: string[];
};

export async function ensureProductionSchema(payload: Payload) {
  if (process.env.NODE_ENV !== "production") return;

  const adapter = payload.db as PostgresAdapterLike;
  if (typeof adapter.requireDrizzleKit !== "function") return;

  payload.logger.info("Criando tabelas do Payload no Postgres...");

  const { pushSchema } = adapter.requireDrizzleKit();
  const { apply, hasDataLoss, warnings } = await pushSchema(
    adapter.schema,
    adapter.drizzle,
    adapter.schemaName ? [adapter.schemaName] : undefined,
    adapter.tablesFilter,
    adapter.extensions?.postgis ? ["postgis"] : undefined,
  );

  if (warnings?.length) {
    payload.logger.warn(warnings.join("\n"));
  }
  if (hasDataLoss) {
    payload.logger.warn("O ajuste de schema pode alterar dados existentes.");
  }

  await apply();
  payload.logger.info("Tabelas do Postgres prontas.");
}
