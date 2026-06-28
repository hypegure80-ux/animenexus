import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorMessage, EmptyState } from "@/components/ui/error-message";
import { formatRelativeTime } from "@/lib/utils";
import { Clock, ExternalLink } from "lucide-react";
import { supabase, News } from "@/lib/supabase";

export default async function LatestNews() {
  const { data: latestNews, error } = await supabase
    .from("news")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    return <ErrorMessage message="No se pudieron cargar las noticias." />;
  }

  if (!latestNews || latestNews.length === 0) {
    return <EmptyState message="No hay noticias disponibles por el momento." />;
  }

  const featured = latestNews[0];
  const side = latestNews.slice(1, 5);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Latest News
            </h2>
            <p className="text-gray-400">
              Stay updated with Asian culture, anime, and technology
            </p>
          </div>
          <Link
            href="/news"
            className="hidden sm:flex items-center gap-1 text-sm text-pink-400 hover:text-pink-300 transition-colors"
          >
            All News <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Featured */}
          <Link href={`/news/${featured.id}`} className="md:col-span-2 group">
            <Card className="h-full bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
              <div
                className="h-48 bg-gradient-to-br from-emerald-900 to-teal-900 flex items-end p-6 relative"
              >
                <Badge className="absolute top-4 left-4">
                  {featured.category}
                </Badge>
              </div>
              <CardContent className="pt-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-pink-400 transition-colors">
                  {featured.title}
                </h3>
                <p className="text-gray-400 mt-2 line-clamp-2">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(featured.created_at)}
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Side */}
          <div className="space-y-4">
            {side.map((news) => (
              <Link key={news.id} href={`/news/${news.id}`} className="group block">
                <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <Badge variant="secondary" className="text-[10px] mb-2">
                          {news.category}
                        </Badge>
                        <h4 className="font-medium text-white text-sm group-hover:text-pink-400 transition-colors line-clamp-2">
                          {news.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(news.created_at)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
