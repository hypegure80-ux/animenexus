import { Hero } from "@/components/home/hero";
import { FeaturedCulture } from "@/components/home/featured-culture";
import { TrendingAnime } from "@/components/home/trending-anime";
import { LatestNews } from "@/components/home/latest-news";
import { CommunityHighlights } from "@/components/home/community-highlights";
import { NewsletterCTA } from "@/components/home/newsletter-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCulture />
      <TrendingAnime />
      <LatestNews />
      <CommunityHighlights />
      <NewsletterCTA />
    </>
  );
}
