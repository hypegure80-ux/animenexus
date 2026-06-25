import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { Clock, ArrowLeft, Share2, Heart, ExternalLink } from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  color: string;
  author: string;
  readTime: string;
};

const newsData: Record<string, NewsItem> = {
  "1": {
    id: "1",
    title: "New Studio Ghibli Film Announced for 2026 Release",
    excerpt: "The legendary animation studio reveals their next project, set to be directed by Hayao Miyazaki's protégé.",
    body: "In an exciting announcement that has sent waves through the anime community, Studio Ghibli has officially revealed their next major project. The film, currently untitled, is being directed by one of Miyazaki's closest protégés and is expected to continue the studio's tradition of breathtaking animation and heartfelt storytelling. This marks one of the most anticipated releases in the studio's history, with fans around the world eagerly awaiting more details about the project.",
    category: "Anime",
    date: new Date(Date.now() - 2 * 3600000).toISOString(),
    color: "from-emerald-900 to-teal-900",
    author: "Anime News Team",
    readTime: "5 min",
  },
  "2": {
    id: "2",
    title: "South Korea's K-Pop Industry Reaches New Global Heights",
    excerpt: "Record-breaking album sales and sold-out world tours mark another milestone year for Korean pop music.",
    body: "The K-pop industry continues its unprecedented global expansion with record-breaking album sales and sold-out world tours across multiple continents. Industry experts attribute this growth to strategic social media engagement and innovative visual content strategies employed by major entertainment companies.",
    category: "Music",
    date: new Date(Date.now() - 5 * 3600000).toISOString(),
    color: "from-pink-900 to-rose-900",
    author: "Music Correspondent",
    readTime: "4 min",
  },
  "3": {
    id: "3",
    title: "Traditional Japanese Tea Ceremony Gains UNESCO Recognition",
    excerpt: "The ancient art of the Japanese tea ceremony is being considered for intangible cultural heritage status.",
    body: "The traditional Japanese tea ceremony, known as 'Sadō' or 'The Way of Tea', is being considered for UNESCO Intangible Cultural Heritage status. This recognition would highlight the profound cultural significance of the practice, which embodies core principles of Japanese aesthetics and mindfulness.",
    category: "Culture",
    date: new Date(Date.now() - 8 * 3600000).toISOString(),
    color: "from-amber-900 to-yellow-900",
    author: "Culture Desk",
    readTime: "6 min",
  },
  "4": {
    id: "4",
    title: "China's Tech Industry: Breakthrough in AI Chip Development",
    excerpt: "A major leap in semiconductor technology positions China as a leading force in AI hardware innovation.",
    body: "Chinese tech companies have achieved a significant breakthrough in AI chip development, potentially reshaping the global semiconductor landscape. The new chips promise unprecedented performance for machine learning tasks while maintaining energy efficiency.",
    category: "Technology",
    date: new Date(Date.now() - 12 * 3600000).toISOString(),
    color: "from-blue-900 to-cyan-900",
    author: "Tech Reporter",
    readTime: "7 min",
  },
  "5": {
    id: "5",
    title: "Vietnamese Pho Named Among World's Best Street Foods",
    excerpt: "International culinary ranking places Vietnam's iconic noodle soup at the top of global street food.",
    body: "Vietnam's beloved pho has been recognized as one of the world's best street foods in an international culinary ranking. This recognition highlights the global appreciation for Vietnamese cuisine and its unique blend of flavors.",
    category: "Gastronomy",
    date: new Date(Date.now() - 18 * 3600000).toISOString(),
    color: "from-orange-900 to-red-900",
    author: "Food Critic",
    readTime: "3 min",
  },
  "6": {
    id: "6",
    title: "New One Piece Arc Breaking Records",
    excerpt: "The Egghead arc adaptation receives critical acclaim and record viewership.",
    body: "The latest arc of One Piece, set on the innovative Egghead island, has broken viewership records and received widespread critical acclaim for its animation quality and storytelling.",
    category: "Anime",
    date: new Date(Date.now() - 24 * 3600000).toISOString(),
    color: "from-yellow-900 to-amber-900",
    author: "Anime News Team",
    readTime: "5 min",
  },
  "7": {
    id: "7",
    title: "Seoul's Digital Art Festival Returns",
    excerpt: "The annual celebration of digital art and technology returns to Seoul.",
    body: "Seoul's prestigious Digital Art Festival returns with an expanded program featuring artists from around the world. The festival showcases the intersection of traditional Korean culture with cutting-edge digital technology.",
    category: "Culture",
    date: new Date(Date.now() - 30 * 3600000).toISOString(),
    color: "from-purple-900 to-violet-900",
    author: "Culture Desk",
    readTime: "4 min",
  },
  "8": {
    id: "8",
    title: "Japanese Gaming Market Hits New Revenue High",
    excerpt: "Console and mobile gaming revenue in Japan reaches unprecedented levels.",
    body: "Japan's gaming industry has reached a new revenue high, driven by strong console sales and the continued growth of mobile gaming. Both domestic and international titles have contributed to this remarkable performance.",
    category: "Gaming",
    date: new Date(Date.now() - 36 * 3600000).toISOString(),
    color: "from-red-900 to-pink-900",
    author: "Gaming Correspondent",
    readTime: "4 min",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const news = newsData[id];
  if (!news) return { title: "Not Found" };
  return { title: news.title, description: news.excerpt };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = newsData[id];

  if (!news) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link href="/news">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to News
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/news" className="inline-flex items-center text-sm text-gray-400 hover:text-pink-400 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to News
      </Link>

      <div className={`rounded-2xl overflow-hidden mb-8 bg-gradient-to-br ${news.color} border border-gray-800`}>
        <div className="p-8 md:p-12">
          <Badge className="mb-4">{news.category}</Badge>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">{news.title}</h1>
          <p className="text-lg text-gray-200 mb-6">{news.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <span>{news.author}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {formatRelativeTime(news.date)}
            </span>
            <span>{news.readTime} read</span>
          </div>
        </div>
      </div>

      <div className="prose prose-invert max-w-none mb-8">
        <p className="text-gray-300 text-lg leading-relaxed">{news.body}</p>
      </div>

      <div className="flex items-center gap-4 pt-8 border-t border-gray-800">
        <Button variant="outline" size="sm">
          <Heart className="h-4 w-4 mr-2" /> Like
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" /> Share
        </Button>
      </div>
    </div>
  );
}