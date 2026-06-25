import { apiSuccess, apiError } from "@/lib/api-utils";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().min(1, "Search query required"),
  type: z.enum(["all", "anime", "news", "gallery", "community", "users"]).optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const type = searchParams.get("type") || "all";

    const parsed = searchSchema.safeParse({ q, type });
    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    // In production, search across all relevant tables
    const results = {
      query: q,
      type,
      results: [],
      total: 0,
    };

    return apiSuccess(results);
  } catch (error) {
    console.error("Search error:", error);
    return apiError("Search failed", 500);
  }
}
