import { notFound } from "next/navigation";
import { getPillarBySlug, isPillarSlug } from "@/data/pillars";
import { getGuide, getGuideSlugsByCategory, getRelatedGuides } from "@/data/guides";
import {
  getTourListing,
  getTourListingsByCategory,
  categorySlugsWithListings,
} from "@/data/listings";
import { fetchProductsBulk, fetchProductDetails } from "@/lib/viator-api";
import { getViatorProductBookUrl } from "@/lib/booking";
import { getStaticProductSummaries } from "@/data/staticProductSummaries";
import { GuideTemplate } from "@/components/GuideTemplate";
import { TourListingTemplate } from "@/components/TourListingTemplate";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

const SITE_URL = "https://tyo365.com";
const DEFAULT_OG_IMAGE =
  "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/tyo365/tyo365%20tours%20and%20experiences%20in%20tokyo.png";

type Props = {
  params: Promise<{ slug: string; tourSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, tourSlug } = await params;
  if (!isPillarSlug(slug)) return {};
  const pillar = getPillarBySlug(slug);
  if (!pillar) return {};

  const guide = getGuide(slug, tourSlug);
  if (guide) {
    const title = `${guide.title} | ${pillar.title} | Tyo365`;
    const description = guide.description;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/${slug}/${tourSlug}`,
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Tyo365 – Tours in Tokyo" }],
      },
      alternates: { canonical: `${SITE_URL}/${slug}/${tourSlug}` },
    };
  }

  const listing = categorySlugsWithListings.includes(slug)
    ? getTourListing(slug, tourSlug)
    : null;
  if (listing) {
    const title = `${listing.seoTitle ?? listing.angle} | Tyo365`;
    const description = listing.metaDescription;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/${slug}/${tourSlug}`,
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Tyo365 – Tours in Tokyo" }],
      },
      alternates: { canonical: `${SITE_URL}/${slug}/${tourSlug}` },
    };
  }

  return {};
}

export async function generateStaticParams() {
  const { pillars } = await import("@/data/pillars");
  const { getGuideSlugsByCategory } = await import("@/data/guides");
  const { getTourListingsByCategory } = await import("@/data/listings");

  const params: { slug: string; tourSlug: string }[] = [];

  for (const pillar of pillars) {
    const guideSlugs = getGuideSlugsByCategory(pillar.slug);
    for (const gs of guideSlugs) {
      params.push({ slug: pillar.slug, tourSlug: gs });
    }

    const listings = getTourListingsByCategory(pillar.slug);
    for (const listing of listings) {
      params.push({ slug: pillar.slug, tourSlug: listing.slug });
    }
  }

  return params;
}

export default async function TourSlugPage({ params }: Props) {
  const { slug, tourSlug } = await params;

  if (!isPillarSlug(slug)) notFound();
  const pillar = getPillarBySlug(slug);
  if (!pillar) notFound();

  const categoryHref = `/${slug}`;
  const categoryTitle = pillar.title;

  // Check if it's a guide (sub-category) page
  const guide = getGuide(slug, tourSlug);
  if (guide) {
    const productCodes = guide.picks
      .map((p) => getTourListing(slug, p.slug)?.productCode)
      .filter((c): c is string => !!c);

    let summaries = await fetchProductsBulk(productCodes).catch(() => []);
    if (summaries.length === 0 && productCodes.length > 0) {
      summaries = getStaticProductSummaries(productCodes, slug);
    }

    const byCode = new Map(summaries.map((s) => [s.productCode, s]));
    const picksWithTours = guide.picks.map((pick) => {
      const listing = getTourListing(slug, pick.slug);
      const tour = listing ? byCode.get(listing.productCode) ?? null : null;
      return { pick, tour };
    });

    const relatedGuides = getRelatedGuides(slug, guide.slug, 3).map((g) => ({
      label: g.title,
      href: `${categoryHref}/${g.slug}`,
    }));

    return (
      <>
        <GuideTemplate
          guide={guide}
          categoryTitle={categoryTitle}
          categoryHref={categoryHref}
          picksWithTours={picksWithTours}
          relatedGuides={relatedGuides}
        />
        <Footer />
      </>
    );
  }

  // Check if it's a tour listing page
  const listing = categorySlugsWithListings.includes(slug)
    ? getTourListing(slug, tourSlug)
    : null;

  if (!listing) notFound();

  let liveData: Awaited<ReturnType<typeof fetchProductsBulk>>[number] | undefined = (
    await fetchProductsBulk([listing.productCode]).catch(() => [])
  )[0];
  if (!liveData) {
    const staticSummaries = getStaticProductSummaries([listing.productCode], slug);
    const staticOne = staticSummaries[0];
    if (staticOne) {
      liveData = {
        productCode: staticOne.productCode,
        title: staticOne.title,
        productUrl: getViatorProductBookUrl(staticOne.productCode),
        fromPriceDisplay: staticOne.fromPriceDisplay,
        fromPrice: undefined,
        reviewCount: staticOne.reviewCount,
        rating: staticOne.rating,
        imageUrl: staticOne.imageUrl,
        freeCancellation: staticOne.freeCancellation,
      };
    }
  }

  const allListings = getTourListingsByCategory(slug);
  const related = allListings.filter((l) => l.slug !== listing.slug).slice(0, 3);
  const relatedCodes = related.map((l) => l.productCode);
  const relatedSummaries = getStaticProductSummaries(relatedCodes, slug);
  const imageByCode = new Map(relatedSummaries.map((s) => [s.productCode, s.imageUrl ?? null]));
  const relatedListings = related.map((l) => ({
    listing: l,
    imageUrl: imageByCode.get(l.productCode) ?? null,
  }));

  const productDetails = await fetchProductDetails(listing.productCode).catch(() => null);
  const viatorItinerary = productDetails?.itinerary?.length ? productDetails.itinerary : undefined;

  return (
    <>
      <TourListingTemplate
        listing={listing}
        categoryTitle={categoryTitle}
        categoryHref={categoryHref}
        liveData={liveData ?? undefined}
        relatedListings={relatedListings}
        viatorItinerary={viatorItinerary}
      />
      <Footer />
    </>
  );
}
