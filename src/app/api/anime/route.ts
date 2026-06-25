import { apiSuccess, apiError } from "@/lib/api-utils";
import { z } from "zod";

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
  status: z.enum(["airing", "completed", "upcoming", "cancelled"]).optional(),
  season: z.enum(["winter", "spring", "summer", "fall"]).optional(),
  year: z.coerce.number().optional(),
  genre: z.string().optional(),
  sort: z.enum(["score", "popularity", "title", "year"]).default("score"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = querySchema.parse(Object.fromEntries(searchParams));

    // In production, query the anime table with filters, sorting, pagination
    return apiSuccess({
      items: [],
      pagination: {
        page: params.page,
        limit: params.limit,
        total: 0,
        totalPages: 0,
        hasMore: false,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError(error.issues[0].message, 400);
    }
    return apiError("Failed to fetch anime", 500);
  }
}
