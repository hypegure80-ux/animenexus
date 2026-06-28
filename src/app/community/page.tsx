import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/error-message";
import { Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Community",
  description: "Join discussions on anime, culture, gaming, travel, and language learning.",
};

export default async function CommunityPage() {
  // Try to fetch from Supabase
  const { data: sections, error: sectionsError } = await supabase
    .from("forum_sections")
    .select("*")
    .order("sort_order", { ascending: true });

  const { data: threads, error: threadsError } = await supabase
    .from("forum_threads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  // If either query fails, show "under construction" state
  if (sectionsError || threadsError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
            <p className="text-gray-400">Connect with enthusiasts from around the world</p>
          </div>
        </div>
        <EmptyState message="La comunidad está en construcción" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
          <p className="text-gray-400">Connect with enthusiasts from around the world</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-white">Forum Sections</h2>
          <EmptyState message="La comunidad está en construcción" />
        </div>

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
