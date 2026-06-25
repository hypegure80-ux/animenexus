import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Landmark, Utensils, GraduationCap, Plane, Music, Film, Palette, Globe, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Asian Culture",
  description: "Explore the rich cultural heritage of Japan, China, South Korea, and across Asia.",
};

const sections = [
  { title: "History", desc: "Ancient civilizations to modern times across Asia", icon: Landmark, href: "/culture/history", country: "Asia", color: "text-amber-400", bg: "from-amber-500/20 to-yellow-500/20" },
  { title: "Traditions", desc: "Customs, etiquette, festivals, and celebrations", icon: Heart, href: "/culture/traditions", country: "Asia", color: "text-red-400", bg: "from-red-500/20 to-pink-500/20" },
  { title: "Gastronomy", desc: "Regional cuisines and traditional dishes", icon: Utensils, href: "/culture/gastronomy", country: "Asia", color: "text-orange-400", bg: "from-orange-500/20 to-red-500/20" },
  { title: "Languages", desc: "Japanese, Chinese, Korean, and learning resources", icon: GraduationCap, href: "/culture/languages", country: "Asia", color: "text-green-400", bg: "from-green-500/20 to-emerald-500/20" },
  { title: "Tourism", desc: "Cities, attractions, and travel guides", icon: Plane, href: "/culture/tourism", country: "Asia", color: "text-cyan-400", bg: "from-cyan-500/20 to-blue-500/20" },
  { title: "Religion", desc: "Buddhism, Shintoism, Taoism, and Asian beliefs", icon: Globe, href: "/culture/religion", country: "Asia", color: "text-indigo-400", bg: "from-indigo-500/20 to-violet-500/20" },
  { title: "Technology", desc: "Asian tech companies, innovations, and trends", icon: BookOpen, href: "/culture/technology", country: "Asia", color: "text-blue-400", bg: "from-blue-500/20 to-cyan-500/20" },
  { title: "Music", desc: "J-Pop, K-Pop, C-Pop, and traditional music", icon: Music, href: "/culture/music", country: "Asia", color: "text-purple-400", bg: "from-purple-500/20 to-pink-500/20" },
  { title: "Cinema", desc: "Asian movies, directors, and film reviews", icon: Film, href: "/culture/cinema", country: "Asia", color: "text-rose-400", bg: "from-rose-500/20 to-pink-500/20" },
  { title: "Art", desc: "Traditional, digital, and contemporary Asian art", icon: Palette, href: "/culture/art", country: "Asia", color: "text-violet-400", bg: "from-violet-500/20 to-purple-500/20" },
  { title: "Literature", desc: "Classical works and modern Asian literature", icon: BookOpen, href: "/culture/literature", country: "Asia", color: "text-yellow-400", bg: "from-yellow-500/20 to-amber-500/20" },
  { title: "Economy", desc: "Economic overview and major Asian industries", icon: Globe, href: "/culture/economy", country: "Asia", color: "text-teal-400", bg: "from-teal-500/20 to-green-500/20" },
];

export default function CulturePage() {
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="group">
            <Card className="h-full bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20">
              <CardContent className="p-5 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <s.icon className={`h-6 w-6 ${s.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors">{s.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{s.desc}</p>
                  <Badge variant="secondary" className="mt-2 text-[10px]">{s.country}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
