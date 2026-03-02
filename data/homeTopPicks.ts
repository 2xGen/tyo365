/**
 * Builds 6 "Popular now" top picks for the homepage and best-tours page.
 * One top pick per category (first 6 categories that have Viator products).
 */
import { pillars } from "@/data/pillars";
import { getProductCodesForPillar } from "@/data/pillarProducts";
import { getStaticProductSummaries } from "@/data/staticProductSummaries";

export type HomeTopPick = {
  categorySlug: string;
  categoryTitle: string;
  productCode: string;
  title: string;
  fromPriceDisplay: string;
  imageUrl: string | null;
  href: string;
  isInternal: boolean;
};

/** Returns 6 top picks: one first product from each of the first 6 categories that have products. */
export function getHomeTopPicks(): HomeTopPick[] {
  const out: HomeTopPick[] = [];
  const categoriesWithProducts = pillars.filter(
    (p) => getProductCodesForPillar(p.slug).length > 0
  );
  const six = categoriesWithProducts.slice(0, 6);

  for (const pillar of six) {
    const codes = getProductCodesForPillar(pillar.slug);
    const productCode = codes[0];
    if (!productCode) continue;

    const summaries = getStaticProductSummaries([productCode], pillar.slug);
    const summary = summaries[0];
    if (!summary) continue;

    const href = summary.productUrl ?? `/${pillar.slug}`;
    const isInternal = typeof href === "string" && href.startsWith("/");

    out.push({
      categorySlug: pillar.slug,
      categoryTitle: pillar.title,
      productCode,
      title: summary.title,
      fromPriceDisplay: summary.fromPriceDisplay,
      imageUrl: summary.imageUrl ?? null,
      href,
      isInternal,
    });
  }

  return out;
}
