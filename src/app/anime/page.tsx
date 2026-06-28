import type { Metadata } from "next";
import type { SearchParams } from "next/dist/lib/search-utils";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ErrorMessage, EmptyState } from "@/components/ui/error-message";
import { Star, Tv, Film, Clock, Search, TrendingUp, Calendar, Flame } from "lucide-react";
import { getTopAnime, searchAnime } from "@/lib/jikan";

export const metadata: Metadata = {
  title: "Anime Database",
  description: "Browse our extensive anime database with rankings, seasonal anime, reviews, and more.",
};

interface PageProps {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function AnimePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const query = params.q || "";
  
  const animeList = query ? await searchAnime(query) : await getTopAnime(page);

  if (!animeList) {
    return <ErrorMessage message="No se pudo cargar la lista de anime." />;
  }

  if (animeList.length === 0) {
    return <EmptyState message="No hay anime disponible." />;
  }

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
                        <Badge variant={anime.status === "airing" ? "success" : anime.status === "upcoming" ? "warning" : "secondary"} className="absolute top-3 right-3 capitalize">
                          {anime.status}
                        </Badge>
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                          {anime.title_english || anime.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{anime.title_japanese}</p>
                        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            {anime.score ? (anime.score / 10).toFixed(1) : "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            {anime.type === "Movie" ? <Film className="h-3 w-3" /> : <Tv className="h-3 w-3" />}
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
            ),
          },
        ]}
      />
    </div>
  );
}
