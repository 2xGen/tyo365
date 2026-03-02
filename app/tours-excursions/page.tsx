import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { ToursExcursionsContent } from "@/components/ToursExcursionsContent";
import {
  getAllToursForExcursionsPage,
  getToursExcursionsCategories,
  sortToursForExcursions,
  type SortOption,
} from "@/data/toursExcursions";
import { getPillarBySlug } from "@/data/pillars";
import type { Metadata } from "next";

const SITE_URL = "https://tyo365.com";

const VALID_SORTS: SortOption[] = ["default", "price-asc", "price-desc", "name", "category"];

const TOURS_PER_PAGE = 21;

const DEFAULT_TITLE = "Tours & Experiences in Tokyo | Tyo365";
const DEFAULT_DESCRIPTION =
  "Browse and book all tours and experiences in Tokyo. Filter by category, sort by price or name. Walking tours, food tours, day trips, and more.";

/** Ensure category/sort query params are read on every request (no static cache). */
export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category?.trim() ?? "";
  const pageParam = params.page?.trim() ?? "";
  const pageNum = Math.max(1, parseInt(pageParam, 10) || 1);
  const pillar = category ? getPillarBySlug(category) : null;

  const allTours = getAllToursForExcursionsPage();
  const filteredCount = category
    ? allTours.filter((t) => t.categorySlug === category).length
    : allTours.length;
  const totalPages = Math.max(1, Math.ceil(filteredCount / TOURS_PER_PAGE));
  const page = Math.min(pageNum, totalPages);

  const title = pillar
    ? `Book ${pillar.title} | Tyo365`
    : DEFAULT_TITLE;
  const description = pillar
    ? `${pillar.description} Compare options and book with free cancellation.`
    : DEFAULT_DESCRIPTION;

  const searchParamsObj = new URLSearchParams();
  if (category) searchParamsObj.set("category", category);
  if (page > 1) searchParamsObj.set("page", String(page));
  const canonical = `${SITE_URL}/tours-excursions${searchParamsObj.toString() ? `?${searchParamsObj}` : ""}`;

  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;
  const prevParams = new URLSearchParams();
  if (category) prevParams.set("category", category);
  if (prevPage && prevPage > 1) prevParams.set("page", String(prevPage));
  const nextParams = new URLSearchParams();
  if (category) nextParams.set("category", category);
  nextParams.set("page", String(nextPage));

  const alternates: Metadata["alternates"] = {
    canonical,
    ...(prevPage && {
      prev: `${SITE_URL}/tours-excursions${prevParams.toString() ? `?${prevParams}` : ""}`,
    }),
    ...(nextPage && {
      next: `${SITE_URL}/tours-excursions?${nextParams}`,
    }),
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
    },
    alternates,
  };
}

function ToursExcursionsInner({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; page?: string };
}) {
  const allTours = getAllToursForExcursionsPage();
  const category = searchParams.category?.trim() ?? "";
  const sortParam = (searchParams.sort?.trim() ?? "default") as SortOption;
  const sort: SortOption = VALID_SORTS.includes(sortParam) ? sortParam : "default";
  const pageParam = searchParams.page?.trim() ?? "";
  const pageNum = Math.max(1, parseInt(pageParam, 10) || 1);
  const pillar = category ? getPillarBySlug(category) : null;

  const filtered = category
    ? allTours.filter((t) => t.categorySlug === category)
    : allTours;
  const sortedTours = sortToursForExcursions(filtered, sort);
  const totalFilteredCount = sortedTours.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / TOURS_PER_PAGE));
  const currentPage = Math.min(pageNum, totalPages);
  const startIndex = (currentPage - 1) * TOURS_PER_PAGE;
  const tours = sortedTours.slice(startIndex, startIndex + TOURS_PER_PAGE);

  const categories = getToursExcursionsCategories();

  const pageTitle = pillar
    ? pillar.title
    : "Tours & experiences in Tokyo";
  const pageDescription = pillar
    ? pillar.description
    : "Browse all tours and experiences in Tokyo. Filter by category or sort by price and name. Walking tours, food tours, day trips, and more.";

  const searchParamsForUrl = new URLSearchParams();
  if (category) searchParamsForUrl.set("category", category);
  if (currentPage > 1) searchParamsForUrl.set("page", String(currentPage));
  const canonicalUrl = `${SITE_URL}/tours-excursions${searchParamsForUrl.toString() ? `?${searchParamsForUrl}` : ""}`;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pageTitle,
    description: pageDescription.slice(0, 300),
    url: canonicalUrl,
    numberOfItems: totalFilteredCount,
    itemListElement: tours.map((tour, i) => ({
      "@type": "ListItem",
      position: startIndex + i + 1,
      item: {
        "@type": "TouristAttraction",
        name: tour.title,
        url: tour.href.startsWith("/") ? `${SITE_URL}${tour.href}` : tour.href,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ToursExcursionsContent
        tours={tours}
        categories={categories}
        currentCategory={category}
        currentSort={sort}
        currentPage={currentPage}
        totalPages={totalPages}
        totalFilteredCount={totalFilteredCount}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
    </>
  );
}

function getBreadcrumbItems(category: string) {
  const pillar = category ? getPillarBySlug(category) : null;
  const items = [
    { label: "Home", href: "/" },
    { label: "Best tours in Tokyo", href: "/best-tours-in-tokyo" },
    category && pillar
      ? { label: "Tours & experiences", href: "/tours-excursions" }
      : { label: "Tours & experiences" },
  ];
  if (category && pillar) {
    items.push({ label: pillar.title });
  }
  return items;
}

export default async function ToursExcursionsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category?.trim() ?? "";
  const breadcrumbItems = getBreadcrumbItems(category);

  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} baseUrl={SITE_URL} />
          </div>
        </div>
        <ToursExcursionsInner searchParams={params} />
      </main>
      <Footer />
    </>
  );
}
