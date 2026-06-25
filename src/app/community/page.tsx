import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Gamepad2, Globe, Plane, GraduationCap, Tv, Music, Plus, Users, Clock } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Community",
  description: "Join discussions on anime, culture, gaming, travel, and language learning.",
};

const sections = [
  { id: "anime", name: "Anime Discussion", desc: "Talk about your favorite shows, theories, and more", icon: Tv, threads: 3420, posts: 89000, color: "text-pink-400", bg: "bg-pink-500/10" },
  { id: "manga", name: "Manga & Light Novels", desc: "Discuss the latest chapters and releases", icon: MessageSquare, threads: 2180, posts: 54000, color: "text-purple-400", bg: "bg-purple-500/10" },
  { id: "gaming", name: "Gaming", desc: "Asian games, visual novels, gacha, and esports", icon: Gamepad2, threads: 1890, posts: 47000, color: "text-green-400", bg: "bg-green-500/10" },
  { id: "culture", name: "Asian Culture", desc: "Traditions, festivals, and cultural discussions", icon: Globe, threads: 1560, posts: 38000, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { id: "travel", name: "Travel & Tourism", desc: "Share travel tips, itineraries, and experiences", icon: Plane, threads: 1250, posts: 31000, color: "text-blue-400", bg: "bg-blue-500/10" },
  { id: "language", name: "Language Exchange", desc: "Learn Japanese, Chinese, Korean together", icon: GraduationCap, threads: 980, posts: 24000, color: "text-amber-400", bg: "bg-amber-500/10" },
  { id: "tech", name: "Technology", desc: "Asian tech, innovation, and industry news", icon: Globe, threads: 720, posts: 18000, color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { id: "music", name: "Music & Entertainment", desc: "J-Pop, K-Pop, C-Pop, and Asian entertainment", icon: Music, threads: 890, posts: 22000, color: "text-rose-400", bg: "bg-rose-500/10" },
];

const recentThreads = [
  { id: "1", title: "What's your favorite anime of the season?", section: "Anime Discussion", user: "otaku_master", replies: 45, date: new Date(Date.now() - 1 * 3600000).toISOString() },
  { id: "2", title: "Learning Japanese: Share your tips!", section: "Language Exchange", user: "nihongo_learner", replies: 32, date: new Date(Date.now() - 3 * 3600000).toISOString() },
  { id: "3", title: "Best ramen spots in Tokyo — recommendations?", section: "Travel & Tourism", user: "foodie_traveler", replies: 28, date: new Date(Date.now() - 6 * 3600000).toISOString() },
  { id: "4", title: "Solo Leveling anime vs manhwa discussion", section: "Anime Discussion", user: "webtoon_fan", replies: 67, date: new Date(Date.now() - 8 * 3600000).toISOString() },
];

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
          <p className="text-gray-400">Connect with enthusiasts from around the world</p>
        </div>
        <Link href="/community/new">
          <Button><Plus className="h-4 w-4 mr-1" /> New Thread</Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Forum Sections */}
          <h2 className="text-xl font-semibold text-white">Forum Sections</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {sections.map((s) => (
              <Link key={s.id} href={`/community/${s.id}`} className="group">
                <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                      <s.icon className={`h-5 w-5 ${s.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors text-sm">{s.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{s.desc}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                        <span>{s.threads.toLocaleString()} threads</span>
                        <span>{s.posts.toLocaleString()} posts</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Recent Threads */}
          <h2 className="text-xl font-semibold text-white mt-8">Recent Discussions</h2>
          <div className="space-y-2">
            {recentThreads.map((t) => (
              <Link key={t.id} href={`/community/thread/${t.id}`}>
                <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white text-sm hover:text-pink-400 transition-colors line-clamp-1">{t.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Badge variant="secondary" className="text-[10px]">{t.section}</Badge>
                        <span>by {t.user}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatRelativeTime(t.date)}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-3">{t.replies} replies</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><Users className="h-4 w-4 text-pink-400" /> Community Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Members</span><span className="text-white font-semibold">50,000+</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Threads</span><span className="text-white font-semibold">12,890</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Posts</span><span className="text-white font-semibold">323,000+</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Online Now</span><span className="text-green-400 font-semibold">342</span></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold text-white mb-3">Community Guidelines</h3>
              <ul className="text-xs text-gray-400 space-y-2">
                <li>• Be respectful and kind to others</li>
                <li>• No hate speech or harassment</li>
                <li>• No explicit or NSFW content</li>
                <li>• Stay on topic in discussions</li>
                <li>• No spam or self-promotion</li>
                <li>• Report rule violations to mods</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
