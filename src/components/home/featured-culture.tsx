import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorMessage, EmptyState } from "@/components/ui/error-message";
import {
  BookOpen,
  Landmark,
  Cherry,
  GraduationCap,
  Plane,
  Music,
  Film,
  Palette,
  Utensils,
} from "lucide-react";
import { supabase, Category } from "@/lib/supabase";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Landmark,
  Cherry,
  GraduationCap,
  Plane,
  Music,
  Film,
  Palette,
  Utensils,
};

const defaultTopics = [
  { name: "Japanese History", description: "From the Jomon period to modern Japan.", icon: "Landmark", slug: "history", color: "text-red-400", gradient: "from-red-500/20 to-orange-500/20" },
  { name: "Korean Traditions", description: "Discover Korean customs and celebrations.", icon: "Cherry", slug: "traditions", color: "text-blue-400", gradient: "from-blue-500/20 to-indigo-500/20" },
  { name: "Chinese Gastronomy", description: "A journey through regional cuisines.", icon: "Utensils", slug: "gastronomy", color: "text-red-400", gradient: "from-red-600/20 to-yellow-500/20" },
  { name: "Language Learning", description: "Resources for learning Asian languages.", icon: "GraduationCap", slug: "languages", color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20" },
  { name: "Tourism & Travel", description: "Guides to cities and attractions.", icon: "Plane", slug: "tourism", color: "text-cyan-400", gradient: "from-cyan-500/20 to-blue-500/20" },
  { name: "Asian Music", description: "From J-Pop and K-Pop to traditional.", icon: "Music", slug: "music", color: "text-purple-400", gradient: "from-purple-500/20 to-pink-500/20" },
  { name: "Cinema & Film", description: "Asian directors and releases.", icon: "Film", slug: "cinema", color: "text-amber-400", gradient: "from-amber-500/20 to-orange-500/20" },
  { name: "Art & Design", description: "Calligraphy and contemporary art.", icon: "Palette", slug: "art", color: "text-violet-400", gradient: "from-violet-500/20 to-fuchsia-500/20" },
];

export default async function FeaturedCulture() {
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .limit(8);

  // Usar datos de la DB si existen, sino usar defaultTopics
  const culturalTopics = categories && categories.length > 0
    ? categories.map((cat: Category) => ({
        name: cat.name,
        description: cat.description || "",
        icon: cat.icon || "BookOpen",
        slug: cat.slug,
        color: cat.color || "text-pink-400",
        gradient: "from-pink-500/20 to-purple-500/20",
      }))
    : defaultTopics;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Explore Asian Culture
            </h2>
            <p className="text-gray-400">
              Dive deep into the traditions, arts, and lifestyle of Asia
            </p>
          </div>
          <Link
            href="/culture"
            className="hidden sm:flex items-center gap-1 text-sm text-pink-400 hover:text-pink-300 transition-colors"
          >
            View All <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {culturalTopics.map((topic) => {
            const IconComponent = iconMap[topic.icon] || BookOpen;
            return (
              <Link key={topic.slug} href={`/culture/${topic.slug}`} className="group">
                <Card className="h-full bg-gray-900/40 hover:bg-gray-900/60 transition-all duration-300 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/5 cursor-pointer">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className={`h-6 w-6 ${topic.color}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{topic.name}</CardTitle>
                      <Badge variant="secondary" className="text-[10px]">
                        Asia
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {topic.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
