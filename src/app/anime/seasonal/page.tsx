import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Star, Tv, Film, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = { title: "Seasonal Anime" };

const seasonalData = {
  winter: [
    { id: "1", title: "Solo Leveling Season 2", type: "TV", score: 88, eps: "12/13", genres: ["Action", "Fantasy"], status: "airing", color: "from-purple-900 to-violet-900" },
    { id: "2", title: "Spy x Family Season 3", type: "TV", score: 86, eps: "10/25", genres: ["Comedy", "Action"], status: "airing", color: "from-green-900 to-teal-900" },
  ],
  spring: [
    { id: "3", title: "Demon Slayer: Infinity Castle", type: "Movie", score: 92, eps: "1", genres: ["Action", "Supernatural"], status: "upcoming", color: "from-blue-900 to-indigo-900" },
    { id: "4", title: "My Hero Academia Final Season", type: "TV", score: 85, eps: "25", genres: ["Action", "Superhero"], status: "upcoming", color: "from-red-900 to-orange-900" },
  ],
  summer: [
    { id: "5", title: "One Punch Man Season 3", type: "TV", score: 88, eps: "12", genres: ["Action", "Comedy"], status: "upcoming", color: "from-yellow-900 to-amber-900" },
  ],
  fall: [
    { id: "6", title: "Chainsaw Man Movie", type: "Movie", score: 90, eps: "1", genres: ["Action", "Dark Fantasy"], status: "upcoming", color: "from-orange-900 to-red-900" },
  ],
};

export default function SeasonalPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="h-8 w-8 text-pink-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Seasonal Anime</h1>
          <p className="text-gray-400">Currently airing and upcoming anime by season</p>
        </div>
      </div>

      <Tabs tabs={Object.entries(seasonalData).map(([season, anime]) => ({
        id: season,
        label: `${season.charAt(0).toUpperCase() + season.slice(1)} ${new Date().getFullYear()}`,
        content: (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {anime.map((a) => (
              <Link key={a.id} href={`/anime/${a.id}`} className="group">
                <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
                  <div className={`h-36 bg-gradient-to-br ${a.color} flex items-center justify-center relative`}>
                    <span className="text-3xl font-bold opacity-20">{a.title.split(":")[0]}</span>
                    <Badge variant={a.status === "airing" ? "success" : "warning"} className="absolute top-3 right-3 capitalize">{a.status}</Badge>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors line-clamp-1">{a.title}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />{(a.score / 10).toFixed(1)}</span>
                      <span>{a.type}</span>
                      <span>{a.eps} eps</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {a.genres.map((g) => <Badge key={g} variant="secondary" className="text-[10px]">{g}</Badge>)}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ),
      }))} />
    </div>
  );
}
