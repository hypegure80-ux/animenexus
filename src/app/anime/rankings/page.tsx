import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Trophy, Tv } from "lucide-react";

export const metadata: Metadata = { title: "Anime Rankings" };

const rankings = [
  { rank: 1, title: "Frieren: Beyond Journey's End", score: 95, type: "TV", genres: ["Fantasy", "Drama"], color: "from-emerald-900 to-teal-900" },
  { rank: 2, title: "Demon Slayer: Infinity Castle", score: 92, type: "Movie", genres: ["Action", "Supernatural"], color: "from-blue-900 to-indigo-900" },
  { rank: 3, title: "Attack on Titan: The Final Chapters", score: 91, type: "TV", genres: ["Action", "Drama"], color: "from-slate-800 to-gray-900" },
  { rank: 4, title: "Chainsaw Man Movie", score: 90, type: "Movie", genres: ["Action", "Dark Fantasy"], color: "from-orange-900 to-red-900" },
  { rank: 5, title: "Jujutsu Kaisen Season 3", score: 89, type: "TV", genres: ["Action", "Supernatural"], color: "from-red-900 to-orange-900" },
  { rank: 6, title: "Solo Leveling Season 2", score: 88, type: "TV", genres: ["Action", "Fantasy"], color: "from-purple-900 to-violet-900" },
  { rank: 7, title: "Oshi no Ko Season 2", score: 88, type: "TV", genres: ["Drama", "Supernatural"], color: "from-pink-900 to-rose-900" },
  { rank: 8, title: "One Piece", score: 87, type: "TV", genres: ["Adventure", "Fantasy"], color: "from-yellow-900 to-amber-900" },
  { rank: 9, title: "Spy x Family Season 3", score: 86, type: "TV", genres: ["Comedy", "Action"], color: "from-green-900 to-teal-900" },
  { rank: 10, title: "My Hero Academia Final", score: 85, type: "TV", genres: ["Action", "Superhero"], color: "from-red-800 to-orange-800" },
];

export default function RankingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="h-8 w-8 text-yellow-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Top Rated Anime</h1>
          <p className="text-gray-400">The highest rated anime as voted by our community</p>
        </div>
      </div>

      <div className="space-y-2">
        {rankings.map((anime) => (
          <Link key={anime.rank} href={`/anime/${anime.rank}`}>
            <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 text-center">
                  <span className={`text-2xl font-bold ${anime.rank <= 3 ? "text-yellow-400" : "text-gray-500"}`}>
                    #{anime.rank}
                  </span>
                </div>
                <div className={`w-12 h-16 rounded-lg bg-gradient-to-br ${anime.color} flex items-center justify-center flex-shrink-0`}>
                  <Tv className="h-5 w-5 text-white/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white">{anime.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px]">{anime.type}</Badge>
                    {anime.genres.map((g) => <span key={g} className="text-[10px] text-gray-500">{g}</span>)}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-5 w-5 fill-yellow-400" />
                  <span className="font-bold text-white">{(anime.score / 10).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
