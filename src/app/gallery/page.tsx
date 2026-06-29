import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ErrorMessage, EmptyState } from "@/components/ui/error-message";
import { Image as ImageIcon, Heart, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse cultural photography, landscapes, food, festivals, and anime artwork.",
};

export default async function GalleryPage() {
  const { data: items, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gallery</h1>
            <p className="text-gray-400">Cultural photography, landscapes, and community artwork</p>
          </div>
        </div>
        <EmptyState message="La galería está en construcción" />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gallery</h1>
            <p className="text-gray-400">Cultural photography, landscapes, and community artwork</p>
          </div>
        </div>
        <EmptyState message="La galería está en construcción" />
      </div>
    );
  }

  const categories = ["all", "landscape", "city", "food", "festival", "tourism", "illustration"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gallery</h1>
          <p className="text-gray-400">Cultural photography, landscapes, and community artwork</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-pink-900 to-purple-900 flex items-center justify-center relative">
              {item.image_url ? (
                <Image src={item.image_url} alt={item.title} fill className="object-cover" />
              ) : (
                <ImageIcon className="h-10 w-10 text-white/40" />
              )}
              <Badge variant="secondary" className="absolute top-3 left-3 capitalize text-[10px]">{item.category}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-white text-sm line-clamp-1">{item.title}</h3>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{item.like_count || 0}</span>
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{item.view_count || 0}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
