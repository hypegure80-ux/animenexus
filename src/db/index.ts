import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

function createPool() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required. Please set DATABASE_URL in your environment variables.");
  }
  return new Pool({
    connectionString: databaseUrl,
  });
}

// Lazy initialization - pool is created on first use
let _pool: Pool | null = null;

function getPool(): Pool {
  if (!_pool) {
    _pool = globalForDb.__arenaNextJsPostgresqlPool ?? createPool();
    if (process.env.NODE_ENV !== "production") {
      globalForDb.__arenaNextJsPostgresqlPool = _pool;
    }
  }
  return _pool;
}

// db getter with lazy initialization
let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!_db) {
    _db = drizzle(getPool());
  }
  return _db;
}

// Re-export db for backwards compatibility (throws helpful error if not initialized)
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop) {
    const actualDb = getDb();
    return (actualDb as any)[prop];
  }
});
