import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, Sparkles } from "lucide-react";

export function NewsletterCTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-48 h-48 bg-pink-500 rounded-full blur-[96px]" />
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-500 rounded-full blur-[96px]" />
          </div>
          <div className="relative p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 border border-pink-500/20 px-4 py-1.5 text-sm text-pink-300 mb-4">
              <Sparkles className="h-4 w-4" />
              Stay Connected
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get the Latest from Sakura Nexus
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Weekly digest of the best anime, cultural insights, and community
              highlights delivered to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              action="/api/newsletter/subscribe"
              method="POST"
            >
              <div className="flex-1">
                <Input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="h-12"
                  required
                />
              </div>
              <Button size="lg" type="submit">
                <Mail className="h-4 w-4" />
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
