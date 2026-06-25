import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Image, Upload, Heart, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse cultural photography, landscapes, food, festivals, and anime artwork.",
};

const items = [
  { id: "1", title: "Mount Fuji at Dawn", category: "landscape", user: "traveler_jp", likes: 234, views: 1200, color: "from-blue-900 to-indigo-800" },
  { id: "2", title: "Tokyo Shibuya Crossing", category: "city", user: "urban_explorer", likes: 189, views: 980, color: "from-purple-900 to-pink-800" },
  { id: "3", title: "Korean Street Food Market", category: "food", user: "foodie_kr", likes: 312, views: 1500, color: "from-orange-900 to-red-800" },
  { id: "4", title: "Chinese New Year Lanterns", category: "festival", user: "culture_lens", likes: 445, views: 2100, color: "from-red-900 to-yellow-800" },
  { id: "5", title: "Seoul Palace Grounds", category: "tourism", user: "wanderlust_kr", likes: 167, views: 890, color: "from-green-900 to-teal-800" },
  { id: "6", title: "Original: Sakura Spirit", category: "illustration", user: "artist_mia", likes: 523, views: 3200, color: "from-pink-900 to-rose-800" },
  { id: "7", title: "Bangkok Floating Market", category: "tourism", user: "traveler_th", likes: 201, views: 1100, color: "from-yellow-900 to-amber-800" },
  { id: "8", title: "Traditional Tea Ceremony", category: "other", user: "zen_photographer", likes: 387, views: 1800, color: "from-emerald-900 to-green-800" },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gallery</h1>
          <p className="text-gray-400">Cultural photography, landscapes, and community artwork</p>
        </div>
        <Link href="/gallery/upload">
          <Button><Upload className="h-4 w-4 mr-1" /> Upload</Button>
        </Link>
      </div>

      <Tabs
        tabs={[
          { id: "all", label: "All" },
          { id: "landscape", label: "Landscapes" },
          { id: "city", label: "Cities" },
          { id: "food", label: "Food" },
          { id: "festival", label: "Festivals" },
          { id: "tourism", label: "Tourism" },
          { id: "illustration", label: "Illustrations" },
        ].map((tab) => ({
          id: tab.id,
          label: tab.label,
          content: (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {items
                .filter((i) => tab.id === "all" || i.category === tab.id)
                .map((item) => (
                  <Link key={item.id} href={`/gallery/${item.id}`} className="group">
                    <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
                      <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center relative`}>
                        <Image className="h-10 w-10 text-white/40" />
                        <Badge variant="secondary" className="absolute top-3 left-3 capitalize text-[10px]">{item.category}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-white text-sm group-hover:text-pink-400 transition-colors line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">by {item.user}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{item.likes}</span>
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{item.views}</span>
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
