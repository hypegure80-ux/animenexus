import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorMessage, EmptyState } from "@/components/ui/error-message";
import { formatRelativeTime } from "@/lib/utils";
import { Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news on anime, Asian culture, technology, music, and more.",
};

export default async function NewsPage() {
  const { data: allNews, error } = await supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("publishedAt", { ascending: false })
    .limit(20);

  if (error) {
    return <ErrorMessage message="Error al cargar las noticias." />;
  }

  if (!allNews || allNews.length === 0) {
    return <EmptyState message="No hay noticias disponibles por el momento." />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">News</h1>
      <p className="text-gray-400 mb-8">Stay updated with the latest from Asia and the anime world</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allNews.map((n) => (
          <Link key={n.id} href={`/news/${n.id}`} className="group">
            <Card className="h-full bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
              {n.coverImage && (
                <div className="h-32 relative bg-gray-800">
                  <img src={n.coverImage} alt={n.title} className="w-full h-full object-cover" />
                </div>
              )}
              {!n.coverImage && (
                <div className="h-32 bg-gradient-to-br from-pink-900 to-purple-900 flex items-center justify-center" />
              )}
              <Badge className="absolute top-3 left-3">News</Badge>
              <CardContent className="pt-4">
                <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors line-clamp-2">{n.title}</h3>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">{n.excerpt}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(n.publishedAt)}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
