import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/error-message";
import { Calendar, MapPin, MessageSquare, Heart } from "lucide-react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return { title: `@${username}` };
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !profile) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <EmptyState message="Usuario no encontrado" />
      </div>
    );
  }

  const displayName = profile.displayName || profile.username;
  const bannerColor = "from-pink-900/50 via-purple-900/50 to-indigo-900/50";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className={`relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br ${bannerColor} border border-gray-800`}>
        <div className="h-32 md:h-48" />
        <div className="p-6 pt-0 -mt-12 flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <Avatar size="xl" src={profile.avatarUrl || undefined} fallback={profile.username} className="border-4 border-gray-950" />
          <div className="flex-1 pb-2">
            <h1 className="text-2xl font-bold text-white">{displayName}</h1>
            <p className="text-gray-400">@{profile.username}</p>
          </div>
          <div className="flex gap-2">
            <Button><MessageSquare className="h-4 w-4 mr-1" /> Message</Button>
            <Button variant="outline"><Heart className="h-4 w-4 mr-1" /> Follow</Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <Card>
            <CardContent className="p-5 space-y-4">
              <p className="text-sm text-gray-300">{profile.bio || "Sin biografía"}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="h-4 w-4" /> {profile.location || "No especificada"}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="h-4 w-4" /> Joined {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Heart className="h-4 w-4" /> {profile.reputation || 0} reputation
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs tabs={[
            { id: "posts", label: "Posts", content: <p className="text-gray-500 text-center py-8">No posts yet</p> },
            { id: "threads", label: "Threads", content: <p className="text-gray-500 text-center py-8">No threads yet</p> },
            { id: "favorites", label: "Favorites", content: <p className="text-gray-500 text-center py-8">Favorites shown here</p> },
            { id: "gallery", label: "Gallery", content: <p className="text-gray-500 text-center py-8">Gallery items shown here</p> },
          ]} />
        </div>
      </div>
    </div>
  );
}
