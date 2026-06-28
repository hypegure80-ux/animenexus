import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorMessage, EmptyState } from "@/components/ui/error-message";
import { Star, Tv, Film, Clock } from "lucide-react";
import { getTopAnime } from "@/lib/jikan";

export default async function TrendingAnime() {
  const trendingAnime = await getTopAnime(1);

  if (!trendingAnime) {
    return <ErrorMessage message="No se pudo cargar el contenido. Intenta más tarde." />;
  }

  if (trendingAnime.length === 0) {
    return <EmptyState message="No hay anime disponible por el momento." />;
  }

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
            <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`} className="group">
              <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
                <div className="h-40 relative">
                  <Image
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title_english || anime.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Badge
                    variant={anime.status === "airing" ? "success" : "warning"}
                    className="absolute top-3 right-3 capitalize"
                  >
                    {anime.status}
                  </Badge>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                    {anime.title_english || anime.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {anime.title_japanese}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      {anime.score ? (anime.score / 10).toFixed(1) : "N/A"}
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
                      {anime.episodes ? `${anime.episodes} eps` : "?"}
                    </span>
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
