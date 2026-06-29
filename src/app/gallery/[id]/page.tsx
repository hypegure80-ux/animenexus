import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft, Heart, Eye, Download, Share2, MessageSquare } from "lucide-react";

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  user: string;
  likes: number;
  views: number;
  color: string;
  tags: string[];
};

const galleryData: Record<string, GalleryItem> = {
  "1": {
    id: "1",
    title: "Mount Fuji at Dawn",
    description: "A breathtaking view of Mount Fuji captured at sunrise, showing the mountain bathed in golden light as the first rays of sun pierce through the clouds.",
    imageUrl: "",
    category: "landscape",
    user: "traveler_jp",
    likes: 234,
    views: 1200,
    color: "from-blue-900 to-indigo-800",
    tags: ["japan", "mountain", "sunrise", "nature"],
  },
  "2": {
    id: "2",
    title: "Tokyo Shibuya Crossing",
    description: "The world-famous Shibuya crossing at night, captured from above to show the organized chaos.",
    imageUrl: "",
    category: "city",
    user: "urban_explorer",
    likes: 189,
    views: 980,
    color: "from-purple-900 to-pink-800",
    tags: ["japan", "tokyo", "night", "urban"],
  },
  "3": {
    id: "3",
    title: "Korean Street Food Market",
    description: "A vibrant scene from a traditional Korean street food market.",
    imageUrl: "",
    category: "food",
    user: "foodie_kr",
    likes: 312,
    views: 1500,
    color: "from-orange-900 to-red-800",
    tags: ["korea", "food", "market", "culture"],
  },
  "4": {
    id: "4",
    title: "Chinese New Year Lanterns",
    description: "Traditional red lanterns illuminating the streets during Chinese New Year celebrations.",
    imageUrl: "",
    category: "festival",
    user: "culture_lens",
    likes: 445,
    views: 2100,
    color: "from-red-900 to-yellow-800",
    tags: ["china", "festival", "lanterns", "new year"],
  },
  "5": {
    id: "5",
    title: "Seoul Palace Grounds",
    description: "The beautiful Gyeongbokgung Palace in Seoul.",
    imageUrl: "",
    category: "tourism",
    user: "wanderlust_kr",
    likes: 167,
    views: 890,
    color: "from-green-900 to-teal-800",
    tags: ["korea", "palace", "architecture", "history"],
  },
  "6": {
    id: "6",
    title: "Original: Sakura Spirit",
    description: "An original digital artwork featuring cherry blossoms.",
    imageUrl: "",
    category: "illustration",
    user: "artist_mia",
    likes: 523,
    views: 3200,
    color: "from-pink-900 to-rose-800",
    tags: ["sakura", "digital art", "anime", "original"],
  },
  "7": {
    id: "7",
    title: "Bangkok Floating Market",
    description: "The vibrant floating market in Bangkok.",
    imageUrl: "",
    category: "tourism",
    user: "traveler_th",
    likes: 201,
    views: 1100,
    color: "from-yellow-900 to-amber-800",
    tags: ["thailand", "market", "food", "travel"],
  },
  "8": {
    id: "8",
    title: "Traditional Tea Ceremony",
    description: "A meditative tea ceremony captured in a traditional Japanese tea house.",
    imageUrl: "",
    category: "other",
    user: "zen_photographer",
    likes: 387,
    views: 1800,
    color: "from-emerald-900 to-green-800",
    tags: ["japan", "tea ceremony", "culture", "meditation"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = galleryData[id];
  if (!item) return { title: "Not Found" };
  return { title: item.title, description: item.description };
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = galleryData[id];

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Image Not Found</h1>
        <p className="text-gray-400 mb-8">The image you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/gallery">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Gallery
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/gallery" className="inline-flex items-center text-sm text-gray-400 hover:text-pink-400 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Gallery
      </Link>

      <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 mb-8">
        <div className={`h-96 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
          <span className="text-6xl font-bold text-white/20">IMAGE</span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="capitalize">{item.category}</Badge>
            {item.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px]">#{tag}</Badge>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h1>
          <p className="text-gray-400">{item.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Avatar size="md" fallback={item.user.charAt(0).toUpperCase()} />
          <div>
            <p className="text-sm font-medium text-white">{item.user}</p>
            <p className="text-xs text-gray-500">Artist</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400 ml-auto">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" /> {item.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" /> {item.likes}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button>
          <Heart className="h-4 w-4 mr-2" /> Like
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" /> Download
        </Button>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" /> Share
        </Button>
        <Button variant="outline">
          <MessageSquare className="h-4 w-4 mr-2" /> Comment
        </Button>
      </div>
    </div>
  );
}