import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
      <Card>
        <CardContent className="p-6 space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">1. Acceptance</h2>
            <p>By using Sakura Nexus, you agree to these terms. If you do not agree, do not use the platform.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">2. User Conduct</h2>
            <p>Users must not post prohibited content including pornography, hate speech, harassment, violence promotion, illegal content, or copyright-infringing material.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">3. Content Policy</h2>
            <p>Gallery uploads must be original creations or properly attributed. AI-generated content must be labeled. Copyrighted anime/manga images may not be uploaded as original work.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">4. Moderation</h2>
            <p>We reserve the right to remove content and suspend accounts that violate these terms. Users may appeal moderation decisions.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">5. Limitation of Liability</h2>
            <p>Sakura Nexus is provided &ldquo;as is&rdquo; without warranties. We are not liable for user-generated content.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
