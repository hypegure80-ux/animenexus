"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  Home,
  BookOpen,
  Tv,
  Newspaper,
  Image,
  MessageSquare,
  User,
  LogOut,
  Settings,
  Shield,
  Globe,
  Music,
  Film,
  Utensils,
  GraduationCap,
  Plane,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AuthUser = {
  id: string;
  username: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  role: string;
};

interface NavbarProps {
  user?: AuthUser | null;
}

const mainNav = [
  { label: "Home", href: "/", icon: Home },
  { label: "Culture", href: "/culture", icon: BookOpen },
  { label: "Anime", href: "/anime", icon: Tv },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Gallery", href: "/gallery", icon: Image },
  { label: "Community", href: "/community", icon: MessageSquare },
];

const cultureDropdown = [
  { label: "History", href: "/culture/history", icon: BookOpen },
  { label: "Traditions", href: "/culture/traditions", icon: Heart },
  { label: "Gastronomy", href: "/culture/gastronomy", icon: Utensils },
  { label: "Languages", href: "/culture/languages", icon: GraduationCap },
  { label: "Tourism", href: "/culture/tourism", icon: Plane },
  { label: "Religion", href: "/culture/religion", icon: Globe },
  { label: "Music", href: "/culture/music", icon: Music },
  { label: "Cinema", href: "/culture/cinema", icon: Film },
  { label: "Technology", href: "/culture/technology", icon: Settings },
  { label: "Art", href: "/culture/art", icon: Image },
];

export function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cultureOpen, setCultureOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-white hover:text-pink-400 transition-colors"
        >
          <span className="text-2xl">🌸</span>
          <span className="hidden sm:inline bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Sakura Nexus
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainNav.map((item) => {
            if (item.href === "/culture") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setCultureOpen(true)}
                  onMouseLeave={() => setCultureOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    <ChevronDown className="h-3 w-3" />
                  </Link>
                  {cultureOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-gray-700 bg-gray-900 shadow-2xl py-2">
                      {cultureDropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <sub.icon className="h-4 w-4" />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Avatar
                  size="sm"
                  src={user.avatarUrl || undefined}
                  fallback={user.username}
                />
                <span className="hidden md:inline text-sm text-gray-300">
                  {user.displayName || user.username}
                </span>
              </button>
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-700 bg-gray-900 shadow-2xl py-2 z-50">
                    <Link
                      href={`/profile/${user.username}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Shield className="h-4 w-4" /> Admin Panel
                      </Link>
                    )}
                    <Link
                      href="/favorites"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Heart className="h-4 w-4" /> Favorites
                    </Link>
                    <hr className="my-1 border-gray-700" />
                    <form action="/api/auth/logout" method="POST">
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-gray-800 bg-gray-950 px-4 py-4 space-y-1">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          <hr className="my-2 border-gray-700" />
          {cultureDropdown.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors pl-6"
              onClick={() => setMobileOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
