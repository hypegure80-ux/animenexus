import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getOptionalAuth } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sakura Nexus — Asian Culture & Anime Community",
    template: "%s | Sakura Nexus",
  },
  description:
    "Explore Asian culture, anime, and connect with a vibrant community. Discover Japan, China, South Korea, and more through articles, galleries, forums, and an extensive anime database.",
  keywords: [
    "anime",
    "asian culture",
    "japan",
    "china",
    "south korea",
    "community",
    "manga",
    "k-pop",
    "j-pop",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sakura Nexus",
    title: "Sakura Nexus — Asian Culture & Anime Community",
    description:
      "Explore Asian culture, anime, and connect with a vibrant community.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getOptionalAuth();

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased flex flex-col">
        <Navbar user={user} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
