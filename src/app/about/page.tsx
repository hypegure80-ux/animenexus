import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe, Tv, Users, Shield } from "lucide-react";

export const metadata: Metadata = { title: "About" };

const values = [
  { icon: Globe, title: "Cultural Appreciation", desc: "We celebrate the rich diversity of Asian cultures with respect and authenticity." },
  { icon: Tv, title: "Anime Passion", desc: "Built by anime fans, for anime fans — we provide comprehensive, up-to-date anime information." },
  { icon: Users, title: "Community First", desc: "A safe, welcoming space for enthusiasts to connect, share, and learn from each other." },
  { icon: Shield, title: "Content Integrity", desc: "We respect intellectual property, promote original content, and maintain strict moderation." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <span className="text-4xl block mb-4">🌸</span>
        <h1 className="text-3xl font-bold text-white mb-4">About Sakura Nexus</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Sakura Nexus is a professional cultural portal and anime community platform dedicated to exploring and celebrating Asian culture.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            We created Sakura Nexus to bridge the gap between cultural education and entertainment. Our platform serves as both a comprehensive cultural encyclopedia and a vibrant anime community. We believe that understanding Asian cultures enriches the experience of enjoying anime and vice versa. Through our articles, galleries, forums, and anime database, we strive to create a respectful, informative, and engaging space for everyone interested in Asian culture.
          </p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold text-white mb-4">Our Values</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {values.map((v) => (
          <Card key={v.title}>
            <CardContent className="p-5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                <v.icon className="h-5 w-5 text-pink-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{v.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{v.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Join Us</h2>
          <p className="text-gray-400 mb-4">Be part of a growing community of culture enthusiasts and anime fans.</p>
          <div className="flex justify-center gap-2 text-gray-500 text-sm">
            <span>🌸 Japan</span><span>·</span><span>🇨🇳 China</span><span>·</span><span>🇰🇷 South Korea</span><span>·</span><span>And beyond</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
