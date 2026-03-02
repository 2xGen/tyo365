import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryIcon } from "@/components/icons/CategoryIcons";
import { Footer } from "@/components/Footer";
import { HomeTopPicks } from "@/components/HomeTopPicks";
import { pillars } from "@/data/pillars";
import { getHomeTopPicks } from "@/data/homeTopPicks";
import type { Metadata } from "next";

const SITE_URL = "https://tyo365.com";

export const metadata: Metadata = {
  title: "Best Tours in Tokyo | Tyo365",
  description:
    "Find and book the best tours in Tokyo. Walking tours, food tours, day trips, cultural experiences, and more. Compare options and book with free cancellation.",
  openGraph: {
    url: `${SITE_URL}/best-tours-in-tokyo`,
  },
  alternates: { canonical: `${SITE_URL}/best-tours-in-tokyo` },
};

export default function BestToursPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Best tours in Tokyo" },
              ]}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <header className="max-w-3xl mb-12">
            <h1
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              Find &amp; book the best <span className="text-aru-orange">tours</span> in Tokyo
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              See top options across 12 curated categories. Walking tours, food tours, day trips, cultural experiences, and more. Compare and book with free cancellation.
            </p>
          </header>

          <HomeTopPicks topPicks={getHomeTopPicks()} />

          <section aria-labelledby="categories-heading" className="mt-16">
            <h2 id="categories-heading" className="font-display font-bold text-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Browse by category
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
              {pillars.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group flex flex-col rounded-2xl border-2 border-slate-200 bg-slate-50/30 p-6 text-left transition-all duration-300 hover:border-aru-cyan hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span className="flex-shrink-0 w-14 h-14 rounded-2xl bg-aru-cyan/10 text-aru-cyan flex items-center justify-center mb-4 group-hover:bg-aru-cyan group-hover:text-white transition-colors">
                    <CategoryIcon slug={p.slug} className="w-7 h-7" />
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-aru-cyan transition-colors" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                    {p.title}
                  </h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed flex-grow">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-aru-cyan group-hover:bg-aru-cyan-dark transition-colors shadow-sm">
                      View &amp; Book
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
