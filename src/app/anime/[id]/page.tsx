import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { ErrorMessage, EmptyState } from "@/components/ui/error-message";
import { Star, Tv, Clock, Heart, Bookmark, Share2, Play, ExternalLink, Users } from "lucide-react";
import { notFound } from "next/navigation";
import { getAnimeById } from "@/lib/jikan";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const result = await getAnimeById(id);
  if (!result) return { title: "Not Found" };
  const anime = result.data;
  return { title: anime.title, description: anime.synopsis?.slice(0, 160) || "" };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getAnimeById(id);
  
  if (!result) {
    notFound();
  }
  
  const anime = result.data;
  const genres = anime.genres?.map(g => g.name).join(", ") || "N/A";
  const studios = anime.studios?.[0]?.name || "Desconocido";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800">
        <div className="absolute inset-0 z-0">
          <Image
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-10" />
        </div>
        <div className="relative z-20 p-6 md:p-10 flex flex-col md:flex-row gap-8">
          <div className="w-48 h-64 rounded-xl overflow-hidden flex-shrink-0 relative">
            <Image
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              fill
              className="object-cover"
              sizes="192px"
              priority
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {anime.genres?.map((g) => <Badge key={g.mal_id}>{g.name}</Badge>)}
              <Badge variant="warning">{anime.status}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{anime.title}</h1>
            <p className="text-gray-400 text-lg mb-4">{anime.title_japanese}</p>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">{anime.synopsis}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 bg-yellow-500/10 rounded-lg px-3 py-1.5">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-bold">{anime.score ? (anime.score / 10).toFixed(2) : "N/A"}</span>
                <span className="text-gray-400">/ 10</span>
              </div>
              <span className="text-gray-400">Rank: <span className="text-white font-semibold">#{anime.rank || "N/A"}</span></span>
              <span className="text-gray-400">Popularity: <span className="text-white font-semibold">#{anime.popularity?.toLocaleString() || "N/A"}</span></span>
              <span className="text-gray-400"><Tv className="inline h-4 w-4 mr-1" />{anime.type}</span>
              <span className="text-gray-400"><Clock className="inline h-4 w-4 mr-1" />{anime.episodes || "?"} eps</span>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button><Heart className="h-4 w-4" /> Add to Favorites</Button>
              <Button variant="outline"><Bookmark className="h-4 w-4" /> Watchlist</Button>
              <Button variant="outline"><Share2 className="h-4 w-4" /> Share</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs tabs={[
            {
              id: "details", label: "Details",
              content: (
                <Card>
                  <CardContent className="p-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        ["Type", anime.type || "N/A"], 
                        ["Episodes", anime.episodes?.toString() || "N/A"],
                        ["Status", anime.status || "N/A"], 
                        ["Aired", anime.aired?.string || "N/A"],
                        ["Season", anime.season ? `${anime.season} ${anime.year}` : "N/A"], 
                        ["Duration", anime.duration || "N/A"],
                        ["Rating", anime.rating || "N/A"], 
                        ["Source", anime.source || "N/A"],
                        ["Studio", studios], 
                        ["Genres", genres],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <dt className="text-xs text-gray-500 uppercase tracking-wider">{label}</dt>
                          <dd className="text-sm text-white mt-0.5">{value}</dd>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ),
            },
            {
              id: "openings", label: "Openings & Endings",
              content: (
                <div className="space-y-3">
                  {anime.theme?.openings?.map((op, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <p className="font-medium text-white text-sm">{op}</p>
                        <p className="text-xs text-gray-400">Opening {i + 1}</p>
                      </CardContent>
                    </Card>
                  ))}
                  {(!anime.theme?.openings || anime.theme.openings.length === 0) && (
                    <p className="text-gray-500 text-center py-8">No hay openings registrados.</p>
                  )}
                </div>
              ),
            },
          ]} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Quick Info</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-400">Score</span><span className="text-white font-bold flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />{anime.score ? (anime.score / 10).toFixed(2) : "N/A"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Rank</span><span className="text-white">#{anime.rank || "N/A"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Popularity</span><span className="text-white">#{anime.popularity?.toLocaleString() || "N/A"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Type</span><span className="text-white">{anime.type || "N/A"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Episodes</span><span className="text-white">{anime.episodes || "?"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Studio</span><span className="text-pink-400">{studios}</span></div>
            </CardContent>
          </Card>

          {anime.trailer?.url && (
            <Card>
              <CardHeader><CardTitle className="text-base">Trailer</CardTitle></CardHeader>
              <CardContent>
                <a 
                  href={anime.trailer.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block aspect-video rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <div className="text-center">
                    <Play className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Official Trailer</p>
                    <p className="text-xs text-pink-400 hover:underline mt-1">Watch on YouTube <ExternalLink className="inline h-3 w-3" /></p>
                  </div>
                </a>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
