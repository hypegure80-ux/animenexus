import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorMessage } from "@/components/ui/error-message";
import { Star, Trophy, Tv, Film } from "lucide-react";
import { getTopAnime } from "@/lib/jikan";

export const metadata: Metadata = { title: "Anime Rankings" };

export default async function RankingsPage() {
  const animeList = await getTopAnime(1);

  if (!animeList) {
    return <ErrorMessage message="Error al cargar los rankings." />;
  }

  const rankings = animeList.slice(0, 10);

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
        {rankings.map((anime, index) => (
          <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
            <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 text-center">
                  <span className={`text-2xl font-bold ${index < 3 ? "text-yellow-400" : "text-gray-500"}`}>
                    #{index + 1}
                  </span>
                </div>
                <div className="w-12 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title_english || anime.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white">{anime.title_english || anime.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px]">{anime.type}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-5 w-5 fill-yellow-400" />
                  <span className="font-bold text-white">{anime.score ? (anime.score / 10).toFixed(2) : "N/A"}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
