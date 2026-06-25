import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { formatRelativeTime } from "@/lib/utils";
import { Clock, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news on anime, Asian culture, technology, music, and more.",
};

const allNews = [
  { id: "1", title: "New Studio Ghibli Film Announced for 2026", excerpt: "The legendary animation studio reveals their next project, set to be directed by Hayao Miyazaki's protégé.", category: "Anime", date: new Date(Date.now() - 2 * 3600000).toISOString(), color: "from-emerald-900 to-teal-900" },
  { id: "2", title: "K-Pop Industry Reaches New Global Heights", excerpt: "Record-breaking album sales and sold-out world tours mark another milestone year.", category: "Music", date: new Date(Date.now() - 5 * 3600000).toISOString(), color: "from-pink-900 to-rose-900" },
  { id: "3", title: "Japanese Tea Ceremony Gains UNESCO Recognition", excerpt: "The ancient art being considered for intangible cultural heritage status.", category: "Culture", date: new Date(Date.now() - 8 * 3600000).toISOString(), color: "from-amber-900 to-yellow-900" },
  { id: "4", title: "China's Tech Industry: AI Chip Breakthrough", excerpt: "A major leap in semiconductor technology positions China as a leading force.", category: "Technology", date: new Date(Date.now() - 12 * 3600000).toISOString(), color: "from-blue-900 to-cyan-900" },
  { id: "5", title: "Vietnamese Pho Among World's Best Street Foods", excerpt: "International ranking places Vietnam's iconic noodle soup at the top.", category: "Gastronomy", date: new Date(Date.now() - 18 * 3600000).toISOString(), color: "from-orange-900 to-red-900" },
  { id: "6", title: "New One Piece Arc Breaking Records", excerpt: "The Egghead arc adaptation receives critical acclaim and record viewership.", category: "Anime", date: new Date(Date.now() - 24 * 3600000).toISOString(), color: "from-yellow-900 to-amber-900" },
  { id: "7", title: "Seoul's Digital Art Festival Returns", excerpt: "The annual celebration of digital art and technology returns to Seoul.", category: "Culture", date: new Date(Date.now() - 30 * 3600000).toISOString(), color: "from-purple-900 to-violet-900" },
  { id: "8", title: "Japanese Gaming Market Hits New Revenue High", excerpt: "Console and mobile gaming revenue in Japan reaches unprecedented levels.", category: "Gaming", date: new Date(Date.now() - 36 * 3600000).toISOString(), color: "from-red-900 to-pink-900" },
];

const categories = ["All", "Anime", "Culture", "Music", "Technology", "Gastronomy", "Gaming"];

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">News</h1>
      <p className="text-gray-400 mb-8">Stay updated with the latest from Asia and the anime world</p>

      <Tabs
        tabs={categories.map((cat) => ({
          id: cat.toLowerCase(),
          label: cat,
          content: (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allNews
                .filter((n) => cat === "All" || n.category === cat)
                .map((n) => (
                  <Link key={n.id} href={`/news/${n.id}`} className="group">
                    <Card className="h-full bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
                      <div className={`h-32 bg-gradient-to-br ${n.color} flex items-center justify-center relative`}>
                        <Badge className="absolute top-3 left-3">{n.category}</Badge>
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors line-clamp-2">{n.title}</h3>
                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{n.excerpt}</p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(n.date)}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          ),
        }))}
      />
    </div>
  );
}
