import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROTECTED_ROUTES = ["/favorites", "/admin"];
const ADMIN_ROUTES = ["/admin"];
const AUTH_ROUTES = ["/login", "/register"];
const SESSION_COOKIE = "sakura_session";

async function getSessionFromCookies(request: NextRequest): Promise<{
  userId: string;
  role: "user" | "admin";
} | null> {
  const sessionCookie = request.cookies.get(SESSION_COOKIE);
  if (!sessionCookie?.value) return null;

  try {
    // El token es un nanoid guardado en la tabla sessions
    // Para verificar el rol, necesitamos hacer una query a la DB
    // Pero en middleware no podemos acceder a DB directamente en Edge Runtime
    // Por ahora, retornamos null y confiamos en el cliente
    // Una solución mejor sería store el role en un JWT o cookie separada
    return null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSessionFromCookies(request);

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  if (isProtected && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminRoute && session?.role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && session) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/favorites/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};