import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

const cultureContent: Record<string, { title: string; description: string; body: string; articles: { title: string; excerpt: string; id: string }[] }> = {
  history: {
    title: "Asian History",
    description: "From the rise of ancient civilizations to the modern era, explore the rich history of Asia.",
    body: "Asia is home to some of the world's oldest continuous civilizations. From the Indus Valley Civilization and ancient China's dynasties to Japan's samurai era and Korea's Three Kingdoms period, the continent's history is vast and complex. The Silk Road connected East and West, facilitating the exchange of goods, ideas, and culture. The 20th century brought rapid modernization alongside devastating conflicts, leading to the dynamic, diverse Asia we know today.",
    articles: [
      { id: "1", title: "The Rise and Fall of the Samurai", excerpt: "Exploring the warrior class that shaped Japanese history for over 700 years." },
      { id: "2", title: "China's Great Wall: A Comprehensive History", excerpt: "From its earliest fortifications to its role as a modern symbol of China." },
      { id: "3", title: "The Three Kingdoms of Korea", excerpt: "Understanding the Goguryeo, Baekje, and Silla kingdoms that shaped Korean identity." },
    ],
  },
  traditions: {
    title: "Asian Traditions",
    description: "Customs, etiquette, festivals, and celebrations that define Asian cultures.",
    body: "Asian traditions are deeply rooted in thousands of years of history, philosophy, and cultural exchange. From the Japanese tea ceremony and Chinese New Year celebrations to Korean ancestral rites and Vietnamese Tet festivals, these customs continue to thrive in both their traditional forms and modern adaptations. Understanding these traditions provides insight into the values, social structures, and worldviews that shape Asian societies today.",
    articles: [
      { id: "1", title: "The Art of Japanese Tea Ceremony", excerpt: "Understanding chanoyu — the ritualized preparation of matcha tea." },
      { id: "2", title: "Lunar New Year Across Asia", excerpt: "How different Asian cultures celebrate the most important holiday of the year." },
    ],
  },
  gastronomy: {
    title: "Asian Gastronomy",
    description: "A journey through the diverse cuisines of Asia — from street food to haute cuisine.",
    body: "Asian cuisine is incredibly diverse, reflecting the continent's varied geography, climate, and cultural influences. From the umami-rich flavors of Japanese washoku and the bold spices of Sichuan cuisine to the fermented traditions of Korean hansik and the fresh herbs of Vietnamese cooking, Asian gastronomy offers an unparalleled culinary experience. Each region's cuisine tells a story of history, migration, trade, and innovation.",
    articles: [
      { id: "1", title: "Ramen: Japan's Comfort Food Revolution", excerpt: "From Chinese origins to global phenomenon — the story of ramen." },
      { id: "2", title: "The World of Korean Banchan", excerpt: "Understanding the small side dishes that accompany every Korean meal." },
    ],
  },
  languages: {
    title: "Asian Languages",
    description: "Resources for learning Japanese, Chinese, Korean, and other Asian languages.",
    body: "Asian languages represent some of the world's most widely spoken and historically significant linguistic traditions. Japanese, Chinese (Mandarin, Cantonese, and other varieties), Korean, Vietnamese, Thai, and many others offer unique challenges and rewards for language learners. Each language provides a window into the culture, thought patterns, and worldview of its speakers.",
    articles: [
      { id: "1", title: "Getting Started with Japanese", excerpt: "Hiragana, katakana, and basic grammar — your first steps in learning Japanese." },
      { id: "2", title: "Chinese Characters: A Beginner's Guide", excerpt: "Understanding radicals, stroke order, and the logic behind hanzi." },
    ],
  },
  tourism: {
    title: "Tourism & Travel",
    description: "Guides to cities, attractions, and hidden gems across Asia.",
    body: "Asia offers some of the world's most diverse and rewarding travel experiences. From the neon-lit streets of Tokyo and the ancient temples of Kyoto to the bustling markets of Bangkok and the serene landscapes of Vietnam's Ha Long Bay, the continent has something for every traveler. Modern megacities coexist with traditional villages, and ancient monuments stand alongside futuristic architecture.",
    articles: [
      { id: "1", title: "Tokyo Neighborhood Guide", excerpt: "From Shibuya to Asakusa — discovering Tokyo's distinct districts." },
      { id: "2", title: "Temples of Angkor Wat", excerpt: "A comprehensive guide to Cambodia's ancient temple complex." },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = cultureContent[slug];
  if (!data) return { title: "Not Found" };
  return { title: data.title, description: data.description };
}

export default async function CultureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = cultureContent[slug];
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/culture" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Culture
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{data.title}</h1>
      <p className="text-lg text-gray-400 mb-8">{data.description}</p>

      <Card className="mb-8">
        <CardContent className="p-6">
          <p className="text-gray-300 leading-relaxed">{data.body}</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold text-white mb-4">Related Articles</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {data.articles.map((a) => (
          <Link key={a.id} href={`/articles/${a.id}`}>
            <Card className="h-full bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20">
              <CardContent className="p-5">
                <h3 className="font-semibold text-white hover:text-pink-400 transition-colors">{a.title}</h3>
                <p className="text-sm text-gray-400 mt-2">{a.excerpt}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 min read</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> Sakura Nexus</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
