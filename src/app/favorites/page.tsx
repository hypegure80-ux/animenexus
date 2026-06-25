import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Heart, Tv, FileText, Image, MessageSquare } from "lucide-react";

export const metadata: Metadata = { title: "My Favorites" };

const favorites = {
  anime: [
    { id: "1", title: "Demon Slayer", type: "TV", score: 92 },
    { id: "2", title: "Jujutsu Kaisen", type: "TV", score: 89 },
    { id: "3", title: "Frieren", type: "TV", score: 95 },
  ],
  articles: [
    { id: "1", title: "The History of Japanese Tea Ceremony" },
    { id: "2", title: "Exploring Seoul's Hidden Cafes" },
  ],
  gallery: [
    { id: "1", title: "Mount Fuji at Dawn", user: "traveler_jp" },
  ],
  threads: [
    { id: "1", title: "Best anime of the season?", section: "Anime Discussion" },
  ],
};

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-8 w-8 text-pink-400 fill-pink-400" />
        <h1 className="text-3xl font-bold text-white">My Favorites</h1>
      </div>

      <Tabs tabs={[
        { id: "anime", label: `Anime (${favorites.anime.length})`, content: <FavList type="anime" icon={<Tv className="h-4 w-4 text-pink-400" />} items={favorites.anime.map(a => ({ ...a, desc: `${a.type} · Score: ${(a.score / 10).toFixed(1)}`, link: `/anime/${a.id}` }))} /> },
        { id: "articles", label: `Articles (${favorites.articles.length})`, content: <FavList type="article" icon={<FileText className="h-4 w-4 text-blue-400" />} items={favorites.articles.map(a => ({ ...a, desc: "Article", link: `/articles/${a.id}` }))} /> },
        { id: "gallery", label: `Gallery (${favorites.gallery.length})`, content: <FavList type="gallery" icon={<Image className="h-4 w-4 text-purple-400" />} items={favorites.gallery.map(g => ({ ...g, desc: `by ${g.user}`, link: `/gallery/${g.id}` }))} /> },
        { id: "threads", label: `Threads (${favorites.threads.length})`, content: <FavList type="thread" icon={<MessageSquare className="h-4 w-4 text-green-400" />} items={favorites.threads.map(t => ({ ...t, desc: t.section, link: `/community/thread/${t.id}` }))} /> },
      ]} />
    </div>
  );
}

function FavList({ type, icon, items }: { type: string; icon: React.ReactNode; items: { id: string; title: string; desc: string; link: string }[] }) {
  if (items.length === 0) {
    return <p className="text-gray-500 text-center py-8">No favorites yet. Start exploring and saving!</p>;
  }
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Link key={item.id} href={item.link}>
          <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-800">{icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white text-sm hover:text-pink-400 transition-colors">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <Heart className="h-4 w-4 text-pink-400 fill-pink-400" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
