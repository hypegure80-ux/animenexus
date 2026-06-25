import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
      <Card>
        <CardContent className="p-6 space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">1. Information We Collect</h2>
            <p>We collect information you provide when registering (email, username), content you submit (posts, comments, gallery uploads), and usage data (pages visited, interactions).</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">2. How We Use Information</h2>
            <p>We use your information to provide and improve our services, personalize content, moderate the platform, and communicate with you about your account.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">3. Content Ownership</h2>
            <p>You retain ownership of content you create. By posting, you grant us a license to display it. Gallery uploads must be your original work or properly licensed.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">4. Data Protection</h2>
            <p>We implement security measures to protect your data. Passwords are hashed, sessions are encrypted, and access is role-restricted.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">5. Contact</h2>
            <p>For privacy concerns, contact us at privacy@sakuranexus.com.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
