import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import type { PoolConfig } from "pg";

const dirname = path.dirname(fileURLToPath(import.meta.url));

function databaseUrl() {
  const fromEnv = (process.env.DATABASE_URI || process.env.DATABASE_URL || "").trim();
  if (fromEnv) return fromEnv;
  return `file:${path.resolve(dirname, "../../data/growloja.db").replace(/\\/g, "/")}`;
}

function isPostgres(url: string) {
  return url.startsWith("postgres://") || url.startsWith("postgresql://");
}

function postgresPool(connectionString: string): PoolConfig {
  let hostname = "";
  try {
    hostname = new URL(connectionString).hostname;
  } catch {
    hostname = "";
  }

  const sslFlag = process.env.DATABASE_SSL?.toLowerCase();
  const publicHost =
    hostname.endsWith(".rlwy.net") ||
    hostname.endsWith(".railway.app") ||
    hostname.includes("amazonaws.com");
  const internalHost =
    hostname.endsWith(".railway.internal") || hostname === "localhost" || hostname === "127.0.0.1";

  const useSsl =
    sslFlag === "true" || (sslFlag !== "false" && publicHost && !internalHost);

  return {
    connectionString,
    max: 10,
    ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
  };
}

export function createDbAdapter() {
  const url = databaseUrl();
  const push = process.env.PAYLOAD_DB_PUSH !== "false";

  if (isPostgres(url)) {
    return postgresAdapter({
      pool: postgresPool(url),
      push,
    });
  }

  return sqliteAdapter({
    client: { url },
    push,
  });
}
