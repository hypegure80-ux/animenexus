import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import { Clock, ExternalLink } from "lucide-react";

const latestNews = [
  {
    id: "1",
    title: "New Studio Ghibli Film Announced for 2026 Release",
    excerpt:
      "The legendary animation studio reveals their next project, set to be directed by Hayao Miyazaki's protégé.",
    category: "Anime",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    imageColor: "from-emerald-900 to-teal-900",
  },
  {
    id: "2",
    title: "South Korea's K-Pop Industry Reaches New Global Heights",
    excerpt:
      "Record-breaking album sales and sold-out world tours mark another milestone year for Korean pop music.",
    category: "Music",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    imageColor: "from-pink-900 to-rose-900",
  },
  {
    id: "3",
    title: "Traditional Japanese Tea Ceremony Gains UNESCO Recognition",
    excerpt:
      "The ancient art of the Japanese tea ceremony is being considered for intangible cultural heritage status.",
    category: "Culture",
    date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    imageColor: "from-amber-900 to-yellow-900",
  },
  {
    id: "4",
    title: "China's Tech Industry: Breakthrough in AI Chip Development",
    excerpt:
      "A major leap in semiconductor technology positions China as a leading force in AI hardware innovation.",
    category: "Technology",
    date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    imageColor: "from-blue-900 to-cyan-900",
  },
  {
    id: "5",
    title: "Vietnamese Pho Named Among World's Best Street Foods",
    excerpt:
      "International culinary ranking places Vietnam's iconic noodle soup at the top of global street food.",
    category: "Gastronomy",
    date: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    imageColor: "from-orange-900 to-red-900",
  },
];

export function LatestNews() {
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
          <Link href={`/news/${latestNews[0].id}`} className="md:col-span-2 group">
            <Card className="h-full bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
              <div
                className={`h-48 bg-gradient-to-br ${latestNews[0].imageColor} flex items-end p-6 relative`}
              >
                <Badge className="absolute top-4 left-4">
                  {latestNews[0].category}
                </Badge>
              </div>
              <CardContent className="pt-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-pink-400 transition-colors">
                  {latestNews[0].title}
                </h3>
                <p className="text-gray-400 mt-2 line-clamp-2">
                  {latestNews[0].excerpt}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(latestNews[0].date)}
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Side */}
          <div className="space-y-4">
            {latestNews.slice(1, 4).map((news) => (
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
                          {formatRelativeTime(news.date)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            <Link
              href={`/news/${latestNews[4].id}`}
              className="group block"
            >
              <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20">
                <CardContent className="p-4">
                  <Badge variant="secondary" className="text-[10px] mb-2">
                    {latestNews[4].category}
                  </Badge>
                  <h4 className="font-medium text-white text-sm group-hover:text-pink-400 transition-colors line-clamp-2">
                    {latestNews[4].title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {formatRelativeTime(latestNews[4].date)}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
