import { getDb } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  // Check if DATABASE_URL is configured
  if (!process.env.DATABASE_URL) {
    return Response.json({
      ok: false,
      status: "missing_config",
      message: "DATABASE_URL is not configured",
    }, { status: 503 });
  }

  try {
    const db = getDb();
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, status: "healthy" });
  } catch (error) {
    console.error("Health check error:", error);
    return Response.json({
      ok: false,
      status: "error",
      message: error instanceof Error ? error.message : "Database connection failed",
    }, { status: 503 });
  }
}
