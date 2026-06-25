import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  MessageSquare,
  Users,
  Gamepad2,
  Globe,
  Plane,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const forumSections = [
  {
    id: "1",
    name: "Anime Discussion",
    description: "Talk about your favorite anime, theories, and more",
    icon: MessageSquare,
    threads: 3420,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    id: "2",
    name: "Manga & Light Novels",
    description: "Discuss the latest chapters and novel releases",
    icon: MessageSquare,
    threads: 2180,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    id: "3",
    name: "Gaming",
    description: "Asian games, visual novels, gacha, and more",
    icon: Gamepad2,
    threads: 1890,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    id: "4",
    name: "Travel & Tourism",
    description: "Share travel tips, itineraries, and experiences",
    icon: Plane,
    threads: 1250,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    id: "5",
    name: "Language Exchange",
    description: "Learn Japanese, Chinese, Korean with native speakers",
    icon: GraduationCap,
    threads: 980,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    id: "6",
    name: "General Culture",
    description: "Discuss Asian traditions, festivals, and lifestyle",
    icon: Globe,
    threads: 1560,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

export function CommunityHighlights() {
  return (
    <section className="py-16 md:py-24 bg-gray-900/30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Join the Community
            </h2>
            <p className="text-gray-400">
              Connect with thousands of enthusiasts
            </p>
          </div>
          <Link
            href="/community"
            className="hidden sm:flex items-center gap-1 text-sm text-pink-400 hover:text-pink-300 transition-colors"
          >
            All Forums <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {forumSections.map((section) => (
            <Link
              key={section.id}
              href={`/community/${section.id}`}
              className="group"
            >
              <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg ${section.bg} flex items-center justify-center flex-shrink-0`}
                    >
                      <section.icon
                        className={`h-5 w-5 ${section.color}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white group-hover:text-pink-400 transition-colors">
                        {section.name}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {section.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary" className="text-[10px]">
                          {section.threads.toLocaleString()} threads
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
