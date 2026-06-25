import { db } from "@/db";
import { users } from "@/db/schema";
import { verifyPassword, createSession, setSessionCookie } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/api-utils";
import { eq, or } from "drizzle-orm";
import { z } from "zod";

const loginSchema = z.object({
  login: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    const { login, password } = parsed.data;

    const [user] = await db
      .select()
      .from(users)
      .where(
        or(eq(users.email, login.toLowerCase()), eq(users.username, login))
      )
      .limit(1);

    if (!user) {
      return apiError("Invalid credentials", 401);
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return apiError("Invalid credentials", 401);
    }

    const session = await createSession(user.id);
    await setSessionCookie(session.token, session.expiresAt);

    return apiSuccess({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return apiError("Internal server error", 500);
  }
}
