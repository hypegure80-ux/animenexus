import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { Calendar, MapPin, MessageSquare, FileText, Heart } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params;
  return { title: `@${username}` };
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  // In production, fetch from DB
  const profile = {
    username,
    displayName: username.charAt(0).toUpperCase() + username.slice(1),
    avatarUrl: null,
    bannerColor: "from-pink-900/50 via-purple-900/50 to-indigo-900/50",
    bio: "Anime enthusiast and Asian culture lover. Exploring the world one episode at a time.",
    location: "Tokyo, Japan",
    joinedDate: "2024-03-15",
    reputation: 234,
    stats: { posts: 45, threads: 12, favorites: 89, gallery: 8 },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Profile Header */}
      <div className={`relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br ${profile.bannerColor} border border-gray-800`}>
        <div className="h-32 md:h-48" />
        <div className="p-6 pt-0 -mt-12 flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <Avatar size="xl" src={profile.avatarUrl || undefined} fallback={profile.username} className="border-4 border-gray-950" />
          <div className="flex-1 pb-2">
            <h1 className="text-2xl font-bold text-white">{profile.displayName}</h1>
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
              <p className="text-sm text-gray-300">{profile.bio}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="h-4 w-4" /> {profile.location}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="h-4 w-4" /> Joined {profile.joinedDate}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Heart className="h-4 w-4" /> {profile.reputation} reputation
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-5">
              <h3 className="font-semibold text-white text-sm mb-3">Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(profile.stats).map(([key, value]) => (
                  <div key={key} className="text-center p-3 rounded-lg bg-gray-800/50">
                    <div className="text-lg font-bold text-white">{value}</div>
                    <div className="text-[10px] text-gray-400 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs tabs={[
            {
              id: "posts", label: "Posts",
              content: (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-white text-sm">My Thoughts on Solo Leveling Season 2</h4>
                        <p className="text-xs text-gray-400 mt-1">The animation quality has been incredible so far. The fight scenes...</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                          <span>2 days ago</span>
                          <span>24 likes</span>
                          <span>8 comments</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ),
            },
            { id: "threads", label: "Threads", content: <p className="text-gray-500 text-center py-8">No threads yet</p> },
            { id: "favorites", label: "Favorites", content: <p className="text-gray-500 text-center py-8">Favorites shown here</p> },
            { id: "gallery", label: "Gallery", content: <p className="text-gray-500 text-center py-8">Gallery items shown here</p> },
          ]} />
        </div>
      </div>
    </div>
  );
}
