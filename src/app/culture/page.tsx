import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/error-message";
import { BookOpen, Landmark, Utensils, GraduationCap, Plane, Music, Film, Palette, Globe, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Asian Culture",
  description: "Explore the rich cultural heritage of Japan, China, South Korea, and across Asia.",
};

export default async function CulturePage() {
  const { data: sections, error } = await supabase
    .from("culture_sections")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Asian Culture</h1>
          <p className="text-gray-400 max-w-2xl">Explore the diverse and rich cultural landscape of Asia — from ancient traditions to modern innovations across Japan, China, South Korea, and beyond.</p>
        </div>
        <EmptyState message="Contenido cultural en construcción" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Asian Culture</h1>
        <p className="text-gray-400 max-w-2xl">Explore the diverse and rich cultural landscape of Asia — from ancient traditions to modern innovations across Japan, China, South Korea, and beyond.</p>
      </div>

      {/* Featured Countries */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {[
          { name: "Japan", flag: "🇯🇵", desc: "Land of the Rising Sun", color: "from-red-500/10 to-red-600/10" },
          { name: "China", flag: "🇨🇳", desc: "Middle Kingdom", color: "from-yellow-500/10 to-red-500/10" },
          { name: "South Korea", flag: "🇰🇷", desc: "Land of Morning Calm", color: "from-blue-500/10 to-indigo-500/10" },
        ].map((c) => (
          <Link key={c.name} href={`/culture?country=${c.name.toLowerCase()}`}>
            <Card className={`h-full bg-gradient-to-br ${c.color} border-gray-700 hover:border-pink-500/30 transition-all duration-300`}>
              <CardContent className="p-6 text-center">
                <span className="text-4xl mb-3 block">{c.flag}</span>
                <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                <p className="text-sm text-gray-400">{c.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* All Sections */}
      <EmptyState message="Contenido cultural en construcción" />
    </div>
  );
}
