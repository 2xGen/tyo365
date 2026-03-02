import type { MetadataRoute } from "next";
import { pillars } from "@/data/pillars";
import { getGuideSlugsByCategory } from "@/data/guides";
import { getTourListingsByCategory } from "@/data/listings";
import { getToursExcursionsCategories } from "@/data/toursExcursions";

const SITE_URL = "https://tyo365.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: base, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/best-tours-in-tokyo`,
      lastModified: base,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tours-excursions`,
      lastModified: base,
      changeFrequency: "daily",
      priority: 0.85,
    },
    // Category-filtered tours-excursions URLs (canonical, indexable)
    ...getToursExcursionsCategories().map((c) => ({
      url: `${SITE_URL}/tours-excursions?category=${encodeURIComponent(c.slug)}`,
      lastModified: base,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/partner`,
      lastModified: base,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: base,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/2xgen`,
      lastModified: base,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = pillars.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: base,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guideAndListingPages: MetadataRoute.Sitemap = [];
  for (const pillar of pillars) {
    const guideSlugs = getGuideSlugsByCategory(pillar.slug);
    for (const gs of guideSlugs) {
      guideAndListingPages.push({
        url: `${SITE_URL}/${pillar.slug}/${gs}`,
        lastModified: base,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }
    const listings = getTourListingsByCategory(pillar.slug);
    for (const listing of listings) {
      guideAndListingPages.push({
        url: `${SITE_URL}/${pillar.slug}/${listing.slug}`,
        lastModified: base,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...categoryPages, ...guideAndListingPages];
}
