"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { CategoryIcon } from "@/components/icons/CategoryIcons";
import type { TourForExcursions, SortOption } from "@/data/toursExcursions";

type CategoryOption = { slug: string; title: string };

type Props = {
  tours: TourForExcursions[];
  categories: CategoryOption[];
  currentCategory: string;
  currentSort: SortOption;
  currentPage: number;
  totalPages: number;
  totalFilteredCount: number;
  pageTitle: string;
  pageDescription: string;
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name A–Z" },
  { value: "category", label: "Category" },
];

const TOURS_PER_PAGE = 21;

export function ToursExcursionsContent({
  tours,
  categories,
  currentCategory,
  currentSort,
  currentPage,
  totalPages,
  totalFilteredCount,
  pageTitle,
  pageDescription,
}: Props) {
  const router = useRouter();

  const buildUrl = useCallback(
    (opts: { category?: string; sort?: string; page?: number }) => {
      const params = new URLSearchParams();
      const cat = opts.category ?? currentCategory;
      const srt = opts.sort ?? currentSort;
      if (cat) params.set("category", cat);
      if (srt && srt !== "default") params.set("sort", srt);
      const pg = opts.page ?? 1;
      if (pg > 1) params.set("page", String(pg));
      const q = params.toString();
      return q ? `/tours-excursions?${q}` : "/tours-excursions";
    },
    [currentCategory, currentSort]
  );

  const setSort = useCallback(
    (sort: SortOption) => {
      router.push(buildUrl({ sort, page: 1 }));
      router.refresh();
    },
    [router, buildUrl]
  );

  const setCategory = useCallback(
    (category: string) => {
      router.push(buildUrl({ category, page: 1 }));
      router.refresh();
    },
    [router, buildUrl]
  );

  const startItem = totalFilteredCount <= 0 ? 0 : (currentPage - 1) * TOURS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * TOURS_PER_PAGE, totalFilteredCount);
  const showingText =
    totalFilteredCount <= 0
      ? "Showing 0 tours."
      : `Showing ${startItem}–${endItem} of ${totalFilteredCount} tours.`;

  return (
    <>
      {/* Hero (aru365 style): cyan tint, title, description, category filter */}
      <div className="bg-aru-cyan/5 border-b border-aru-cyan/10 py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1
            className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            {pageTitle}
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            {pageDescription}
          </p>
          {/* Category filter inside hero */}
          <section aria-label="Filter by category" className="mt-8">
            <label htmlFor="tours-category-filter" className="text-sm font-medium text-slate-700 block mb-2">
              Category
            </label>
            <select
              id="tours-category-filter"
              value={currentCategory}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm focus:border-aru-cyan focus:outline-none focus:ring-2 focus:ring-aru-cyan/20"
              aria-label="Filter by category"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </section>
        </div>
      </div>

      {/* Content: count + sort + grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-slate-600">
          {showingText}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="tours-sort" className="text-sm font-medium text-slate-700">
            Sort by
          </label>
          <select
            id="tours-sort"
            value={currentSort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm focus:border-aru-cyan focus:outline-none focus:ring-2 focus:ring-aru-cyan/20"
            aria-label="Sort tours"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {tours.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
          <p className="text-slate-600 font-medium">No tours match the selected category.</p>
          <Link
            href="/tours-excursions"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-aru-cyan hover:bg-aru-cyan-dark transition-colors"
          >
            Clear category filter
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => {
            const cardContent = (
              <>
                <div className="aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-slate-100">
                  {tour.imageUrl ? (
                    <Image
                      src={tour.imageUrl}
                      alt=""
                      width={400}
                      height={250}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400">
                      <CategoryIcon slug={tour.categorySlug} className="w-14 h-14" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-medium text-aru-orange uppercase tracking-wider">
                    {tour.categoryTitle}
                  </p>
                  <h2 className="font-display font-bold text-lg text-slate-900 mt-1 group-hover:text-aru-orange transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                    {tour.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                    {tour.rating > 0 && (
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                        <svg className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {tour.rating.toFixed(1)}
                      </span>
                    )}
                    {tour.rating > 0 && tour.reviewCount > 0 && <span className="text-slate-400">·</span>}
                    {tour.reviewCount > 0 && (
                      <span>{tour.reviewCount.toLocaleString("en-US")} reviews</span>
                    )}
                  </div>
                  <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-slate-600 font-medium text-sm">{tour.fromPriceDisplay}</p>
                    <span className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-aru-orange hover:bg-aru-orange-dark transition-colors shadow-sm">
                      View &amp; Book
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </>
            );
            const cardClassName =
              "group flex flex-col rounded-2xl border-2 border-slate-200 bg-white overflow-hidden text-left transition-all duration-300 hover:border-aru-orange hover:shadow-xl hover:shadow-aru-orange/10 hover:-translate-y-0.5 min-h-0";
            return tour.isInternal ? (
              <Link key={`${tour.categorySlug}-${tour.productCode}`} href={tour.href} className={cardClassName}>
                {cardContent}
              </Link>
            ) : (
              <a
                key={`${tour.categorySlug}-${tour.productCode}`}
                href={tour.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClassName}
              >
                {cardContent}
              </a>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
        >
          {currentPage <= 1 ? (
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 bg-slate-100"
              aria-disabled="true"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </span>
          ) : (
            <Link
              href={buildUrl({ page: currentPage - 1 })}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 hover:border-aru-cyan hover:text-aru-cyan transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </Link>
          )}
          <span className="px-4 py-2.5 text-sm text-slate-600 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage >= totalPages ? (
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 bg-slate-100"
              aria-disabled="true"
            >
              Next
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          ) : (
            <Link
              href={buildUrl({ page: currentPage + 1 })}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 hover:border-aru-cyan hover:text-aru-cyan transition-colors"
            >
              Next
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </nav>
      )}

      <div className="mt-12 flex justify-center">
        <Link
          href="/best-tours-in-tokyo"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-aru-cyan hover:bg-aru-cyan-dark transition-colors shadow-sm"
        >
          Browse by category
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      </div>
    </>
  );
}
