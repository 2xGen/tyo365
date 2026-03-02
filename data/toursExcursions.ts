/**
 * Data for the /tours-excursions page: all tours across all categories with summary info.
 * Used for the full catalog with category filter and sorting.
 * Only includes Tokyo categories (pillars); Aruba/legacy categories are excluded.
 */
import { categorySlugsWithListings, getTourListingsByCategory } from "@/data/listings";
import { getPillarBySlug, pillars } from "@/data/pillars";
import { getStaticProductSummaries } from "@/data/staticProductSummaries";

/** Tokyo-only category slugs (pillars that have listings). Used so we never show Aruba tours. */
const tokyoCategorySlugs = new Set(
  categorySlugsWithListings.filter((slug) => getPillarBySlug(slug))
);

/** Category options for the tours-excursions filter (Tokyo pillars that have listings). */
export function getToursExcursionsCategories(): { slug: string; title: string }[] {
  return pillars
    .filter((p) => tokyoCategorySlugs.has(p.slug))
    .map((p) => ({ slug: p.slug, title: p.title }));
}

export type TourForExcursions = {
  categorySlug: string;
  categoryTitle: string;
  productCode: string;
  slug: string;
  title: string;
  fromPriceDisplay: string;
  /** Numeric price for sorting (parsed from display or 0) */
  fromPriceNumber: number;
  imageUrl: string | null;
  href: string;
  isInternal: boolean;
  rating: number;
  reviewCount: number;
};

/** Parse "Price from $87 USD" to 87 for sorting; returns 0 if not parseable */
function parsePriceFromDisplay(display: string): number {
  const m = display.match(/\$(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

/**
 * Returns all tours from Tokyo categories only (pillars with listings).
 * Aruba/legacy listing categories are excluded.
 */
export function getAllToursForExcursionsPage(): TourForExcursions[] {
  const result: TourForExcursions[] = [];
  for (const categorySlug of categorySlugsWithListings) {
    if (!tokyoCategorySlugs.has(categorySlug)) continue;
    const pillar = getPillarBySlug(categorySlug);
    const categoryTitle = pillar?.title ?? categorySlug;
    const listings = getTourListingsByCategory(categorySlug);
    if (listings.length === 0) continue;
    const productCodes = listings.map((l) => l.productCode);
    const summaries = getStaticProductSummaries(productCodes, categorySlug);
    const summaryByCode = new Map(summaries.map((s) => [s.productCode, s]));
    for (const listing of listings) {
      const summary = summaryByCode.get(listing.productCode);
      if (!summary) continue;
      const href = summary.productUrl ?? `/${categorySlug}`;
      result.push({
        categorySlug,
        categoryTitle,
        productCode: listing.productCode,
        slug: listing.slug,
        title: summary.title,
        fromPriceDisplay: summary.fromPriceDisplay,
        fromPriceNumber: summary.fromPrice ?? parsePriceFromDisplay(summary.fromPriceDisplay),
        imageUrl: summary.imageUrl ?? null,
        href,
        isInternal: href.startsWith("/"),
        rating: summary.rating,
        reviewCount: summary.reviewCount,
      });
    }
  }
  return result;
}

export type SortOption = "default" | "price-asc" | "price-desc" | "name" | "category";

export function sortToursForExcursions(
  tours: TourForExcursions[],
  sort: SortOption
): TourForExcursions[] {
  const copy = [...tours];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.fromPriceNumber - b.fromPriceNumber);
    case "price-desc":
      return copy.sort((a, b) => b.fromPriceNumber - a.fromPriceNumber);
    case "name":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "category":
      return copy.sort((a, b) =>
        a.categoryTitle.localeCompare(b.categoryTitle) || a.title.localeCompare(b.title)
      );
    default:
      return copy;
  }
}
