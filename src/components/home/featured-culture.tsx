import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const culturalTopics = [
  {
    title: "Japanese History",
    description:
      "From the Jomon period to modern Japan — explore millennia of rich history.",
    icon: Landmark,
    href: "/culture/history",
    country: "Japan",
    gradient: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-400",
  },
  {
    title: "Korean Traditions",
    description:
      "Discover the customs, etiquette, and celebrations that define Korean culture.",
    icon: Cherry,
    href: "/culture/traditions",
    country: "South Korea",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
  },
  {
    title: "Chinese Gastronomy",
    description:
      "A journey through regional cuisines, from Sichuan to Cantonese.",
    icon: Utensils,
    href: "/culture/gastronomy",
    country: "China",
    gradient: "from-red-600/20 to-yellow-500/20",
    iconColor: "text-red-400",
  },
  {
    title: "Language Learning",
    description:
      "Resources for learning Japanese, Chinese, Korean and more.",
    icon: GraduationCap,
    href: "/culture/languages",
    country: "Asia",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    title: "Tourism & Travel",
    description:
      "Guides to cities, attractions, and hidden gems across Asia.",
    icon: Plane,
    href: "/culture/tourism",
    country: "Asia",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
  },
  {
    title: "Asian Music",
    description:
      "From J-Pop and K-Pop to traditional sounds and modern fusion.",
    icon: Music,
    href: "/culture/music",
    country: "Asia",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    title: "Cinema & Film",
    description:
      "Explore masterpieces from Asian directors and the latest releases.",
    icon: Film,
    href: "/culture/cinema",
    country: "Asia",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    title: "Art & Design",
    description:
      "Traditional calligraphy, digital art, and contemporary Asian art.",
    icon: Palette,
    href: "/culture/art",
    country: "Asia",
    gradient: "from-violet-500/20 to-fuchsia-500/20",
    iconColor: "text-violet-400",
  },
];

export function FeaturedCulture() {
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
          {culturalTopics.map((topic) => (
            <Link key={topic.href} href={topic.href} className="group">
              <Card className="h-full bg-gray-900/40 hover:bg-gray-900/60 transition-all duration-300 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/5 cursor-pointer">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <topic.icon className={`h-6 w-6 ${topic.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{topic.title}</CardTitle>
                    <Badge variant="secondary" className="text-[10px]">
                      {topic.country}
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
          ))}
        </div>
      </div>
    </section>
  );
}
