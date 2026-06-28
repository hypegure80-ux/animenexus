import { NextResponse } from "next/server";
import { z } from "zod";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function apiPaginated<T>(
  items: T[],
  total: number,
  page: number,
  limit: number
) {
  return NextResponse.json({
    success: true,
    data: {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    },
  });
}

export function parseBody<T extends z.ZodType>(
  schema: T,
  body: unknown
): { success: true; data: z.infer<T> } | { success: false; error: string } {
  const result = schema.safeParse(body);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues.map((e) => e.message).join(", "),
    };
  }
  return { success: true, data: result.data };
}

export function parseSearchParams<T extends z.ZodType>(
  schema: T,
  url: string
): z.infer<T> {
  const { searchParams } = new URL(url);
  const params: Record<string, string | string[]> = {};
  searchParams.forEach((value, key) => {
    const existing = params[key];
    if (existing) {
      params[key] = Array.isArray(existing)
        ? [...existing, value]
        : [existing, value];
    } else {
      params[key] = value;
    }
  });
  return schema.parse(params);
}

export function buildQueryString(params: Record<string, string | number | undefined>): string {
  const filtered = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  return filtered.length ? `?${filtered.join("&")}` : "";
}

export async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit = {},
  timeoutMs = 8000
): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json() as Promise<T>;
  } finally {
    clearTimeout(id);
  }
}
