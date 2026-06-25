import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Tv, Film, Clock } from "lucide-react";

const trendingAnime = [
  {
    id: "1",
    title: "Demon Slayer: Infinity Castle",
    titleJapanese: "鬼滅の刃",
    type: "Movie",
    score: 92,
    episodes: 1,
    coverColor: "from-blue-900 to-indigo-900",
    genres: ["Action", "Supernatural", "Historical"],
    status: "upcoming",
  },
  {
    id: "2",
    title: "Jujutsu Kaisen Season 3",
    titleJapanese: "呪術廻戦",
    type: "TV",
    score: 89,
    episodes: 24,
    coverColor: "from-red-900 to-orange-900",
    genres: ["Action", "Supernatural"],
    status: "upcoming",
  },
  {
    id: "3",
    title: "Solo Leveling Season 2",
    titleJapanese: "俺だけレベルアップな件",
    type: "TV",
    score: 88,
    episodes: 13,
    coverColor: "from-purple-900 to-violet-900",
    genres: ["Action", "Fantasy", "Adventure"],
    status: "airing",
  },
  {
    id: "4",
    title: "Chainsaw Man Movie",
    titleJapanese: "チェンソーマン",
    type: "Movie",
    score: 90,
    episodes: 1,
    coverColor: "from-orange-900 to-red-900",
    genres: ["Action", "Dark Fantasy"],
    status: "upcoming",
  },
  {
    id: "5",
    title: "Spy x Family Season 3",
    titleJapanese: "SPY×FAMILY",
    type: "TV",
    score: 86,
    episodes: 25,
    coverColor: "from-green-900 to-teal-900",
    genres: ["Comedy", "Action", "Slice of Life"],
    status: "airing",
  },
  {
    id: "6",
    title: "One Piece",
    titleJapanese: "ワンピース",
    type: "TV",
    score: 87,
    episodes: 1100,
    coverColor: "from-yellow-900 to-amber-900",
    genres: ["Adventure", "Action", "Fantasy"],
    status: "airing",
  },
];

export function TrendingAnime() {
  return (
    <section className="py-16 md:py-24 bg-gray-900/30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Trending Anime
            </h2>
            <p className="text-gray-400">
              The most popular anime right now
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/anime"
              className="hidden sm:flex items-center gap-1 text-sm text-pink-400 hover:text-pink-300 transition-colors"
            >
              Browse All <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingAnime.map((anime) => (
            <Link key={anime.id} href={`/anime/${anime.id}`} className="group">
              <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
                <div
                  className={`h-40 bg-gradient-to-br ${anime.coverColor} flex items-center justify-center relative`}
                >
                  <span className="text-6xl opacity-30 select-none">
                    {anime.titleJapanese}
                  </span>
                  <Badge
                    variant={anime.status === "airing" ? "success" : "warning"}
                    className="absolute top-3 right-3 capitalize"
                  >
                    {anime.status}
                  </Badge>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                    {anime.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {anime.titleJapanese}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      {(anime.score / 10).toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1">
                      {anime.type === "Movie" ? (
                        <Film className="h-3 w-3" />
                      ) : (
                        <Tv className="h-3 w-3" />
                      )}
                      {anime.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {anime.episodes} eps
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {anime.genres.slice(0, 3).map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
