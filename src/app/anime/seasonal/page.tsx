import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorMessage, EmptyState } from "@/components/ui/error-message";
import { Star, Tv, Film, Clock, Calendar } from "lucide-react";
import { getSeasonalAnime, getCurrentSeason } from "@/lib/jikan";

export const metadata: Metadata = { title: "Seasonal Anime" };

export default async function SeasonalPage() {
  const { year, season } = getCurrentSeason();
  const animeList = await getSeasonalAnime(year, season);

  if (!animeList) {
    return <ErrorMessage message="No se pudo cargar la temporada actual." />;
  }

  if (animeList.length === 0) {
    return <EmptyState message="No hay anime para esta temporada." />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="h-8 w-8 text-pink-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Seasonal Anime</h1>
          <p className="text-gray-400">Currently airing and upcoming anime by season</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {animeList.map((anime) => (
          <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`} className="group">
            <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
              <div className="h-36 relative">
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title_english || anime.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Badge variant={anime.status === "airing" ? "success" : "warning"} className="absolute top-3 right-3 capitalize">{anime.status}</Badge>
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors line-clamp-1">{anime.title_english || anime.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />{anime.score ? (anime.score / 10).toFixed(1) : "N/A"}</span>
                  <span>{anime.type}</span>
                  <span>{anime.episodes ? `${anime.episodes} eps` : "?"}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
