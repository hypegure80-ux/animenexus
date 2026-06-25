import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Tv, BookOpen } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-950/40 via-gray-950 to-purple-950/40" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full blur-[128px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 border border-pink-500/20 px-4 py-1.5 text-sm text-pink-300 mb-6">
            <Sparkles className="h-4 w-4" />
            Discover Asian Culture & Anime
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Your Gateway to{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Asian Culture
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
            Explore the rich cultural heritage of Japan, China, South Korea, and
            beyond. Dive into anime, traditions, gastronomy, and connect with a
            passionate community.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/anime">
              <Button size="xl">
                <Tv className="h-5 w-5" />
                Explore Anime
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/culture">
              <Button variant="outline" size="xl">
                <BookOpen className="h-5 w-5" />
                Discover Culture
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { label: "Anime Titles", value: "2,500+" },
            { label: "Articles", value: "1,200+" },
            { label: "Community Members", value: "50K+" },
            { label: "Countries Covered", value: "15+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 text-center"
            >
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
