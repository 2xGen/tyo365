import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HomeTopPicks } from "@/components/HomeTopPicks";
import { HomeCategories } from "@/components/HomeCategories";
import { WhyBookWithUs } from "@/components/WhyBookWithUs";
import { Footer } from "@/components/Footer";
import { getHomeTopPicks } from "@/data/homeTopPicks";

const SITE_URL = "https://tyo365.com";
const DEFAULT_OG_IMAGE =
  "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/aru365/tokyo%20best%20tours%20and%20excursions.jpg";

export const metadata: Metadata = {
  title: "Tyo365 – Book Best Tours in Tokyo | Food, Culture, Day Trips & Experiences",
  description:
    "Tokyo's dedicated platform for booking the best tours and experiences. Find, compare, and book food tours, cultural experiences, day trips, and more — all in one place.",
  openGraph: {
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Tyo365 – Tours and experiences in Tokyo" }],
  },
  alternates: { canonical: SITE_URL },
};

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tyo365 – Book Best Tours in Tokyo",
  url: SITE_URL,
  description:
    "Tokyo's dedicated platform for booking the best tours and experiences. Find, compare, and book food tours, cultural experiences, day trips, and more.",
  isPartOf: { "@type": "WebSite", name: "Tyo365", url: SITE_URL },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <Hero />
      <HomeTopPicks topPicks={getHomeTopPicks()} />
      <HomeCategories />
      <WhyBookWithUs />
      <Footer />
    </main>
  );
}
