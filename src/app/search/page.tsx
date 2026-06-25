import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Tv, Newspaper, Image, MessageSquare, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across anime, articles, news, users, galleries, and forums.",
};

const searchResults = {
  anime: [
    { id: "1", title: "Demon Slayer", desc: "TV Series · 2021 · Score: 9.2" },
    { id: "2", title: "Jujutsu Kaisen", desc: "TV Series · 2023 · Score: 8.9" },
    { id: "3", title: "Demon Slayer: Mugen Train", desc: "Movie · 2020 · Score: 9.1" },
  ],
  news: [
    { id: "1", title: "Demon Slayer Season 4 Announced", desc: "New season confirmed for release later this year" },
    { id: "2", title: "Jujutsu Kaisen Manga Sales Soar", desc: "Record-breaking sales following anime adaptation" },
  ],
  gallery: [
    { id: "1", title: "Cherry Blossom Festival", desc: "by sakura_lover · 234 likes" },
    { id: "2", title: "Tokyo Nightscape", desc: "by urban_photographer · 189 likes" },
  ],
  community: [
    { id: "1", title: "Best anime of the decade?", desc: "Anime Discussion · 45 replies · by otaku_master" },
    { id: "2", title: "Learning Japanese together", desc: "Language Exchange · 32 replies · by nihongo_fan" },
  ],
  users: [
    { id: "1", title: "otaku_master", desc: "Member since 2024 · 234 posts" },
    { id: "2", title: "sakura_lover", desc: "Member since 2023 · 567 posts" },
  ],
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Search</h1>

      <form className="flex gap-3 mb-8">
        <div className="flex-1">
          <Input
            name="q"
            placeholder="Search anime, articles, users, and more..."
            className="h-12"
            defaultValue="Demon Slayer"
          />
        </div>
        <Button type="submit" size="lg"><Search className="h-5 w-5 mr-1" /> Search</Button>
      </form>

      <Tabs
        tabs={[
          {
            id: "all", label: "All Results",
            content: (
              <div className="space-y-6">
                {Object.entries(searchResults).flatMap(([type, results]) =>
                  results.map((r) => (
                    <SearchResultItem key={`${type}-${r.id}`} type={type} item={r} />
                  ))
                )}
              </div>
            ),
          },
          { id: "anime", label: "Anime", content: <SearchList type="anime" items={searchResults.anime} /> },
          { id: "news", label: "News", content: <SearchList type="news" items={searchResults.news} /> },
          { id: "gallery", label: "Gallery", content: <SearchList type="gallery" items={searchResults.gallery} /> },
          { id: "community", label: "Community", content: <SearchList type="community" items={searchResults.community} /> },
          { id: "users", label: "Users", content: <SearchList type="users" items={searchResults.users} /> },
        ]}
      />
    </div>
  );
}

function SearchResultItem({ type, item }: { type: string; item: { id: string; title: string; desc: string } }) {
  const icons: Record<string, React.ReactNode> = {
    anime: <Tv className="h-4 w-4 text-pink-400" />,
    news: <Newspaper className="h-4 w-4 text-blue-400" />,
    gallery: <Image className="h-4 w-4 text-purple-400" />,
    community: <MessageSquare className="h-4 w-4 text-green-400" />,
    users: <User className="h-4 w-4 text-amber-400" />,
  };
  const typeLabels: Record<string, string> = {
    anime: "Anime", news: "News", gallery: "Gallery", community: "Forum", users: "User",
  };

  return (
    <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300">
      <CardContent className="p-4 flex items-start gap-3">
        <div className="mt-0.5">{icons[type]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="text-[10px]">{typeLabels[type]}</Badge>
          </div>
          <h3 className="font-medium text-white hover:text-pink-400 transition-colors">{item.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function SearchList({ type, items }: { type: string; items: { id: string; title: string; desc: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <SearchResultItem key={item.id} type={type} item={item} />
      ))}
    </div>
  );
}
