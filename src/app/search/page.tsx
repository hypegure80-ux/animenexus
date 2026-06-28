import type { Metadata } from "next";
import type { SearchParams } from "next/dist/lib/search-utils";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorMessage, EmptyState } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Tv, Star, Clock, Film } from "lucide-react";
import { searchAnime } from "@/lib/jikan";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across anime, articles, news, users, galleries, and forums.",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q || "";

  if (!query) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
        <form className="flex gap-3 mb-8">
          <div className="flex-1">
            <Input
              name="q"
              placeholder="Search anime..."
              className="h-12"
            />
          </div>
          <Button type="submit" size="lg"><Search className="h-5 w-5 mr-1" /> Search</Button>
        </form>
        <EmptyState message="Escribe algo para buscar" />
      </div>
    );
  }

  const results = await searchAnime(query);

  if (!results) {
    return <ErrorMessage message="Error al buscar. Intenta de nuevo." />;
  }

  if (results.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
        <form className="flex gap-3 mb-8">
          <div className="flex-1">
            <Input
              name="q"
              placeholder="Search anime..."
              className="h-12"
              defaultValue={query}
            />
          </div>
          <Button type="submit" size="lg"><Search className="h-5 w-5 mr-1" /> Search</Button>
        </form>
        <EmptyState message={`No se encontraron resultados para "${query}"`} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Search</h1>

      <form className="flex gap-3 mb-8">
        <div className="flex-1">
          <Input
            name="q"
            placeholder="Search anime..."
            className="h-12"
            defaultValue={query}
          />
        </div>
        <Button type="submit" size="lg"><Search className="h-5 w-5 mr-1" /> Search</Button>
      </form>

      <p className="text-gray-400 mb-4">{results.length} resultados para "{query}"</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((anime) => (
          <Link key={anime.mal_id} href={`/anime/${String(anime.mal_id)}`}>
            <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
              <div className="h-36 relative">
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title_english || anime.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-white line-clamp-1">{anime.title_english || anime.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    {anime.score ? (anime.score / 10).toFixed(1) : "N/A"}
                  </span>
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
