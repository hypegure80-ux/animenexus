import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword, createSession, setSessionCookie } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/api-utils";
import { eq } from "drizzle-orm";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    const { email, password, username } = parsed.data;

    // Check existing
    const [existingEmail] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existingEmail) {
      return apiError("Email already registered", 409);
    }

    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (existingUser) {
      return apiError("Username already taken", 409);
    }

    const passwordHash = await hashPassword(password);

    const [user] = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        passwordHash,
        username,
        displayName: username,
      })
      .returning({ id: users.id });

    const session = await createSession(user.id);
    await setSessionCookie(session.token, session.expiresAt);

    return apiSuccess({ message: "Registration successful" }, 201);
  } catch (error) {
    console.error("Register error:", error);
    return apiError("Internal server error", 500);
  }
}
