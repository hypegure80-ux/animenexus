import { apiSuccess, apiError } from "@/lib/api-utils";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    const { email } = parsed.data;

    // TODO: In production, save to database or send to email service
    // For now, simulate successful subscription

    return apiSuccess({
      message: "Successfully subscribed to newsletter",
      email,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return apiError("Failed to subscribe", 500);
  }
}