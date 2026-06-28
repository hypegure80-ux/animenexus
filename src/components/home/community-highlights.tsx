import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ErrorMessage, EmptyState } from "@/components/ui/error-message";
import {
  MessageSquare,
  Users,
  Gamepad2,
  Globe,
  Plane,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { supabase, ForumSection } from "@/lib/supabase";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Gamepad2,
  Globe,
  Plane,
  GraduationCap,
};

const defaultColors = [
  { color: "text-pink-400", bg: "bg-pink-500/10" },
  { color: "text-purple-400", bg: "bg-purple-500/10" },
  { color: "text-green-400", bg: "bg-green-500/10" },
  { color: "text-blue-400", bg: "bg-blue-500/10" },
  { color: "text-amber-400", bg: "bg-amber-500/10" },
  { color: "text-cyan-400", bg: "bg-cyan-500/10" },
];

export default async function CommunityHighlights() {
  const { data: forumSections, error } = await supabase
    .from("forum_sections")
    .select("*")
    .limit(6);

  if (error) {
    return <ErrorMessage message="Error cargando secciones del foro." />;
  }

  if (!forumSections || forumSections.length === 0) {
    return <EmptyState message="No hay secciones en el foro aún." />;
  }
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
          {forumSections.map((section, index) => {
            const colors = defaultColors[index % defaultColors.length];
            const IconComponent = section.icon ? iconMap[section.icon] || MessageSquare : MessageSquare;
            return (
              <Link
                key={section.id}
                href={`/community/${section.slug || section.id}`}
                className="group"
              >
                <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent
                          className={`h-5 w-5 ${colors.color}`}
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
                            {section.sort_order || 0} threads
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
