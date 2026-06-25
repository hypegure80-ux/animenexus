import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { Star, Tv, Clock, Heart, Bookmark, Share2, Play, ExternalLink, Users } from "lucide-react";
import { notFound } from "next/navigation";

const animeData: Record<string, {
  id: string; title: string; titleJapanese: string; synopsis: string;
  type: string; status: string; season: string; year: number;
  episodes: number; duration: string; rating: string;
  score: number; rank: number; popularity: number;
  genres: string[]; themes: string[];
  studio: string; studioId: string;
  sourceMaterial: string; aired: string;
  characters: { name: string; role: string; va: string }[];
  openings: { title: string; artist: string; type: string; youtubeUrl: string }[];
}> = {
  "1": {
    id: "1", title: "Demon Slayer: Infinity Castle", titleJapanese: "鬼滅の刃 無限城編",
    synopsis: "The epic conclusion to the Demon Slayer story arrives as the movie trilogy begins. Tanjiro and the Hashira face their greatest challenge yet within the depths of the Infinity Castle, where Muzan Kibutsuji awaits. The fate of humanity hangs in the balance as the final battle between demon slayers and demons reaches its climax.",
    type: "Movie", status: "upcoming", season: "spring", year: 2026,
    episodes: 1, duration: "2 hr 30 min", rating: "PG-13",
    score: 92, rank: 1, popularity: 2500000,
    genres: ["Action", "Supernatural", "Historical", "Dark Fantasy"],
    themes: ["Demons", "Martial Arts", "Tragedy"],
    studio: "ufotable", studioId: "1",
    sourceMaterial: "Manga", aired: "2026",
    characters: [
      { name: "Tanjiro Kamado", role: "Main", va: "Natsuki Hanae" },
      { name: "Nezuko Kamado", role: "Supporting", va: "Akari Kito" },
      { name: "Zenitsu Agatsuma", role: "Supporting", va: "Hiro Shimono" },
      { name: "Inosuke Hashibira", role: "Supporting", va: "Yoshitsugu Matsuoka" },
    ],
    openings: [
      { title: "Theme Song", artist: "LiSA", type: "opening", youtubeUrl: "https://youtube.com/watch?v=example" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const anime = animeData[id];
  if (!anime) return { title: "Not Found" };
  return { title: anime.title, description: anime.synopsis.slice(0, 160) };
}

export default async function AnimeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const anime = animeData[id];
  if (!anime) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-10" />
        <div className="relative z-20 p-6 md:p-10 flex flex-col md:flex-row gap-8">
          <div className="w-48 h-64 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center flex-shrink-0">
            <span className="text-7xl select-none">鬼</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {anime.genres.map((g) => <Badge key={g}>{g}</Badge>)}
              <Badge variant="warning">{anime.status}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{anime.title}</h1>
            <p className="text-gray-400 text-lg mb-4">{anime.titleJapanese}</p>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-2xl">{anime.synopsis}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 bg-yellow-500/10 rounded-lg px-3 py-1.5">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-white font-bold">{(anime.score / 10).toFixed(2)}</span>
                <span className="text-gray-400">/ 10</span>
              </div>
              <span className="text-gray-400">Rank: <span className="text-white font-semibold">#{anime.rank}</span></span>
              <span className="text-gray-400">Popularity: <span className="text-white font-semibold">#{anime.popularity.toLocaleString()}</span></span>
              <span className="text-gray-400"><Tv className="inline h-4 w-4 mr-1" />{anime.type}</span>
              <span className="text-gray-400"><Clock className="inline h-4 w-4 mr-1" />{anime.episodes} eps</span>
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
                        ["Type", anime.type], ["Episodes", anime.episodes.toString()],
                        ["Status", anime.status], ["Aired", anime.aired],
                        ["Season", `${anime.season} ${anime.year}`], ["Duration", anime.duration],
                        ["Rating", anime.rating], ["Source", anime.sourceMaterial],
                        ["Studio", anime.studio], ["Genres", anime.genres.join(", ")],
                        ["Themes", anime.themes.join(", ")],
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
              id: "characters", label: "Characters",
              content: (
                <div className="grid sm:grid-cols-2 gap-3">
                  {anime.characters.map((c) => (
                    <Card key={c.name}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                          <Users className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{c.name}</p>
                          <p className="text-xs text-gray-400">{c.role} · VA: {c.va}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ),
            },
            {
              id: "openings", label: "Openings & Endings",
              content: (
                <div className="space-y-3">
                  {anime.openings.map((o) => (
                    <Card key={o.title}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white text-sm">{o.title}</p>
                          <p className="text-xs text-gray-400">by {o.artist} · {o.type === "opening" ? "OP" : "ED"}</p>
                        </div>
                        <a href={o.youtubeUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm"><Play className="h-3 w-3 mr-1" /> Watch <ExternalLink className="h-3 w-3 ml-1" /></Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
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
              <div className="flex justify-between text-sm"><span className="text-gray-400">Score</span><span className="text-white font-bold flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />{(anime.score / 10).toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Rank</span><span className="text-white">#{anime.rank}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Popularity</span><span className="text-white">#{anime.popularity.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Type</span><span className="text-white">{anime.type}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Episodes</span><span className="text-white">{anime.episodes}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Studio</span><Link href={`/anime/studios/${anime.studioId}`} className="text-pink-400 hover:underline">{anime.studio}</Link></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Trailer</CardTitle></CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Official Trailer</p>
                  <a href="#" target="_blank" className="text-xs text-pink-400 hover:underline">Watch on YouTube <ExternalLink className="inline h-3 w-3" /></a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
