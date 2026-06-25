import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star, Tv, Film, Clock, Search, TrendingUp, Calendar, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Anime Database",
  description: "Browse our extensive anime database with rankings, seasonal anime, reviews, and more.",
};

const animeData = [
  { id: "1", title: "Demon Slayer: Infinity Castle", jp: "鬼滅の刃", type: "Movie", score: 92, episodes: 1, status: "upcoming", genres: ["Action", "Supernatural", "Historical"], color: "from-blue-900 to-indigo-900" },
  { id: "2", title: "Jujutsu Kaisen Season 3", jp: "呪術廻戦", type: "TV", score: 89, episodes: 24, status: "upcoming", genres: ["Action", "Supernatural"], color: "from-red-900 to-orange-900" },
  { id: "3", title: "Solo Leveling Season 2", jp: "俺だけレベルアップな件", type: "TV", score: 88, episodes: 13, status: "airing", genres: ["Action", "Fantasy"], color: "from-purple-900 to-violet-900" },
  { id: "4", title: "Frieren: Beyond Journey's End", jp: "葬送のフリーレン", type: "TV", score: 95, episodes: 28, status: "completed", genres: ["Fantasy", "Drama", "Adventure"], color: "from-emerald-900 to-teal-900" },
  { id: "5", title: "Chainsaw Man Movie", jp: "チェンソーマン", type: "Movie", score: 90, episodes: 1, status: "upcoming", genres: ["Action", "Dark Fantasy"], color: "from-orange-900 to-red-900" },
  { id: "6", title: "Spy x Family Season 3", jp: "SPY×FAMILY", type: "TV", score: 86, episodes: 25, status: "airing", genres: ["Comedy", "Action"], color: "from-green-900 to-teal-900" },
  { id: "7", title: "One Piece", jp: "ワンピース", type: "TV", score: 87, episodes: 1100, status: "airing", genres: ["Adventure", "Action", "Fantasy"], color: "from-yellow-900 to-amber-900" },
  { id: "8", title: "Attack on Titan: The Final Chapters", jp: "進撃の巨人", type: "TV", score: 91, episodes: 2, status: "completed", genres: ["Action", "Drama", "Dark Fantasy"], color: "from-slate-800 to-gray-900" },
  { id: "9", title: "Oshi no Ko Season 2", jp: "【推しの子】", type: "TV", score: 88, episodes: 13, status: "completed", genres: ["Drama", "Supernatural"], color: "from-pink-900 to-rose-900" },
];

const topRated = [...animeData].sort((a, b) => b.score - a.score);
const mostPopular = [...animeData].sort((a, b) => b.episodes - a.episodes);
const airing = animeData.filter((a) => a.status === "airing");

export default function AnimePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Anime Database</h1>
        <p className="text-gray-400">Discover, track, and review your favorite anime</p>
      </div>

      {/* Quick Nav */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="/anime/seasonal"><Button variant="outline" size="sm"><Calendar className="h-4 w-4" /> Seasonal</Button></Link>
        <Link href="/anime/rankings"><Button variant="outline" size="sm"><TrendingUp className="h-4 w-4" /> Rankings</Button></Link>
        <Link href="/anime/reviews"><Button variant="outline" size="sm"><Star className="h-4 w-4" /> Reviews</Button></Link>
        <Link href="/anime/studios"><Button variant="outline" size="sm"><Film className="h-4 w-4" /> Studios</Button></Link>
        <Link href="/anime/search"><Button variant="secondary" size="sm"><Search className="h-4 w-4" /> Advanced Search</Button></Link>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          {
            id: "top",
            label: "🏆 Top Rated",
            content: (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topRated.map((a) => <AnimeCard key={a.id} anime={a} />)}
              </div>
            ),
          },
          {
            id: "popular",
            label: "🔥 Most Popular",
            content: (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mostPopular.map((a) => <AnimeCard key={a.id} anime={a} />)}
              </div>
            ),
          },
          {
            id: "airing",
            label: "📺 Currently Airing",
            content: (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {airing.map((a) => <AnimeCard key={a.id} anime={a} />)}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

function AnimeCard({ anime }: { anime: (typeof animeData)[0] }) {
  return (
    <Link href={`/anime/${anime.id}`} className="group">
      <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
        <div className={`h-36 bg-gradient-to-br ${anime.color} flex items-center justify-center relative`}>
          <span className="text-5xl opacity-30 select-none font-bold">{anime.jp}</span>
          <Badge variant={anime.status === "airing" ? "success" : anime.status === "upcoming" ? "warning" : "secondary"} className="absolute top-3 right-3 capitalize">
            {anime.status}
          </Badge>
        </div>
        <CardContent className="pt-4">
          <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors line-clamp-1">{anime.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{anime.jp}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />{(anime.score / 10).toFixed(1)}</span>
            <span className="flex items-center gap-1">{anime.type === "Movie" ? <Film className="h-3 w-3" /> : <Tv className="h-3 w-3" />}{anime.type}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{anime.episodes} eps</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {anime.genres.slice(0, 3).map((g) => <Badge key={g} variant="secondary" className="text-[10px]">{g}</Badge>)}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
