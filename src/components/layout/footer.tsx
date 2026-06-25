import Link from "next/link";
import { Heart } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Home", href: "/" },
    { label: "Culture", href: "/culture" },
    { label: "Anime", href: "/anime" },
    { label: "News", href: "/news" },
    { label: "Gallery", href: "/gallery" },
    { label: "Community", href: "/community" },
  ],
  Culture: [
    { label: "History", href: "/culture/history" },
    { label: "Traditions", href: "/culture/traditions" },
    { label: "Gastronomy", href: "/culture/gastronomy" },
    { label: "Languages", href: "/culture/languages" },
    { label: "Tourism", href: "/culture/tourism" },
    { label: "Music", href: "/culture/music" },
  ],
  Anime: [
    { label: "Browse Anime", href: "/anime" },
    { label: "Seasonal", href: "/anime/seasonal" },
    { label: "Rankings", href: "/anime/rankings" },
    { label: "Reviews", href: "/anime/reviews" },
    { label: "Studios", href: "/anime/studios" },
  ],
  Legal: [
    { label: "About", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-pink-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-white"
          >
            <span>🌸</span>
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Sakura Nexus
            </span>
          </Link>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-pink-500 fill-pink-500" /> for
            Asian culture & anime enthusiasts
          </p>
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Sakura Nexus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
