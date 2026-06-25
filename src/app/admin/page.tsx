import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, Flag, FileText, Newspaper, Image, MessageSquare, Settings, BarChart3, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Panel",
};

const stats = [
  { label: "Total Users", value: "12,450", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Pending Reports", value: "23", icon: Flag, color: "text-red-400", bg: "bg-red-500/10" },
  { label: "Published Articles", value: "1,240", icon: FileText, color: "text-green-400", bg: "bg-green-500/10" },
  { label: "News Items", value: "890", icon: Newspaper, color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Gallery Items", value: "560", icon: Image, color: "text-pink-400", bg: "bg-pink-500/10" },
  { label: "Forum Threads", value: "12,890", icon: MessageSquare, color: "text-cyan-400", bg: "bg-cyan-500/10" },
];

const adminSections = [
  { label: "User Management", href: "/admin/users", icon: Users, desc: "Manage users, roles, and sanctions" },
  { label: "Reports Queue", href: "/admin/reports", icon: Flag, desc: "Review and resolve content reports" },
  { label: "Content Moderation", href: "/admin/content", icon: FileText, desc: "Moderate articles, posts, and comments" },
  { label: "News Management", href: "/admin/news", icon: Newspaper, desc: "Manage news articles and sources" },
  { label: "Gallery Moderation", href: "/admin/gallery", icon: Image, desc: "Review and moderate gallery uploads" },
  { label: "Forum Management", href: "/admin/forums", icon: MessageSquare, desc: "Manage sections, threads, and replies" },
  { label: "Categories", href: "/admin/categories", icon: BarChart3, desc: "Manage content categories and tags" },
  { label: "Site Settings", href: "/admin/settings", icon: Settings, desc: "Configure site-wide settings" },
];

const recentReports = [
  { id: "1", target: "Comment by user_123", reason: "Harassment", status: "pending", date: "10 min ago" },
  { id: "2", target: "Gallery upload by artist_x", reason: "Copyright violation", status: "pending", date: "1 hour ago" },
  { id: "3", target: "Forum post by troll_account", reason: "Spam", status: "pending", date: "3 hours ago" },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
          <Shield className="h-5 w-5 text-pink-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400">Manage users, content, and site settings</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-gray-400">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Admin Sections */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Management</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {adminSections.map((s) => (
              <Link key={s.href} href={s.href}>
                <Card className="bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 hover:border-pink-500/20">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center`}>
                      <s.icon className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">{s.label}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Flag className="h-4 w-4 text-red-400" /> Recent Reports
              </CardTitle>
              <Link href="/admin/reports">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentReports.map((r) => (
                <div key={r.id} className="flex items-start justify-between gap-2 p-3 rounded-lg bg-gray-800/50">
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{r.target}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="danger" className="text-[10px]">{r.reason}</Badge>
                      <span className="text-[10px] text-gray-500">{r.date}</span>
                    </div>
                  </div>
                  <Badge variant="warning" className="text-[10px] capitalize">{r.status}</Badge>
                </div>
              ))}
              {recentReports.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No pending reports</p>
              )}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-400" /> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/users/new"><Button variant="outline" size="sm" className="w-full justify-start">+ Add New User</Button></Link>
              <Link href="/admin/news/new"><Button variant="outline" size="sm" className="w-full justify-start">+ Create News Article</Button></Link>
              <Link href="/admin/settings"><Button variant="outline" size="sm" className="w-full justify-start">⚙️ Site Configuration</Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
