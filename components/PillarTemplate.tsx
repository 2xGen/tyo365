"use client";

import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import { CategoryIcon } from "./icons/CategoryIcons";
import type { Pillar } from "@/data/pillars";
import { getRelatedPillars } from "@/data/pillars";
import { getCategoryBookUrl } from "@/lib/booking";
import { featuredTours } from "@/data/featuredTours";
import type { ViatorProductSummary } from "@/lib/viator-api";
import { getListingByProductCode, categorySlugsWithListings } from "@/data/listings";

interface PillarTemplateProps {
  pillar: Pillar;
  /** When set, "Popular choices" shows these Viator products instead of placeholders */
  featuredProducts?: ViatorProductSummary[];
}

function FaqSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <details
          key={i}
          className="group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 hover:border-aru-cyan/50 hover:shadow-md open:border-aru-cyan open:shadow-md"
        >
          <summary className="px-6 py-5 font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
            <span className="pr-2">{faq.question}</span>
            <span className="shrink-0 w-11 h-11 rounded-xl bg-slate-100 text-aru-cyan flex items-center justify-center group-open:bg-aru-cyan group-open:text-white transition-all duration-200">
              <svg className="w-5 h-5 group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

const TOP_PICKS_COUNT = 4;

export function PillarTemplate({ pillar, featuredProducts }: PillarTemplateProps) {
  const related = getRelatedPillars(pillar);
  const showViatorCards = featuredProducts && featuredProducts.length > 0;
  const topPicks = showViatorCards ? featuredProducts!.slice(0, TOP_PICKS_COUNT) : [];
  const moreOptions = showViatorCards ? featuredProducts!.slice(TOP_PICKS_COUNT, 10) : [];
  const placeholderTours = featuredTours.filter((t) => t.categorySlug === pillar.slug).length >= 4
    ? featuredTours.filter((t) => t.categorySlug === pillar.slug).slice(0, 4)
    : featuredTours.slice(0, 4);

  return (
    <article className="min-h-screen bg-white">
      <FaqSchema faqs={pillar.faqs} />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Best tours in Tokyo", href: "/best-tours-in-tokyo" },
              { label: pillar.title },
            ]}
          />
        </div>
      </div>

      {/* Hero – light, spacious, with cyan tint */}
      <div className="relative bg-aru-cyan/5 overflow-hidden border-b border-aru-cyan/10">
        <div className="absolute inset-0 bg-dots-subtle pointer-events-none" aria-hidden />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-aru-cyan font-medium text-sm uppercase tracking-widest">
              Tours in Tokyo
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-8">
              <span className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white border-2 border-aru-cyan/20 text-aru-cyan flex items-center justify-center shadow-md shadow-aru-cyan/10">
                <CategoryIcon slug={pillar.slug} className="w-10 h-10" />
              </span>
              <div className="min-w-0">
                <h1
                  className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                >
                  {pillar.title}
                </h1>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/best-tours-in-tokyo"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-aru-cyan hover:text-aru-cyan-dark bg-aru-cyan/5 hover:bg-aru-cyan/10 transition-colors"
                  >
                    View all tours in Tokyo
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular choices – tour cards with book CTA */}
      <div className="bg-aru-orange/5 py-14 lg:py-20 border-y border-aru-orange/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <section aria-labelledby="picks-heading">
            <p className="text-sm font-medium text-aru-orange uppercase tracking-wider">Top picks</p>
            <h2 id="picks-heading" className="font-display font-bold text-2xl text-slate-900 mt-1 mb-8" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Popular choices — view &amp; book
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {showViatorCards
                ? topPicks.map((p) => {
                    const listing = categorySlugsWithListings.includes(pillar.slug) ? getListingByProductCode(pillar.slug, p.productCode) : null;
                    const cardHref = listing ? `/${pillar.slug}/${listing.slug}` : p.productUrl;
                    const cardClassName = "group flex flex-col rounded-2xl border-2 border-aru-orange/20 bg-white overflow-hidden text-left transition-all duration-300 hover:border-aru-orange hover:shadow-xl hover:shadow-aru-orange/10 hover:-translate-y-1";
                    const cardContent = (
                      <>
                        <div className="aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-aru-cyan/20 to-aru-orange/20">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-slate-400">
                              <svg className="w-16 h-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-aru-orange transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                            {p.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                            {p.rating > 0 && (
                              <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                                <svg className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {p.rating.toFixed(1)}
                              </span>
                            )}
                            {p.rating > 0 && p.reviewCount > 0 && <span className="text-slate-400">·</span>}
                            {p.reviewCount > 0 && (
                              <span className="text-slate-500">{p.reviewCount.toLocaleString("en-US")} reviews</span>
                            )}
                          </div>
                          {p.freeCancellation && (
                            <p className="mt-1 text-emerald-600 text-xs font-medium">Free cancellation</p>
                          )}
                          <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-slate-600 font-medium">{p.fromPriceDisplay}</p>
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
                    return listing ? (
                      <Link key={p.productCode} href={cardHref} className={cardClassName}>
                        {cardContent}
                      </Link>
                    ) : (
                      <a key={p.productCode} href={cardHref} target="_blank" rel="noopener noreferrer" className={cardClassName}>
                        {cardContent}
                      </a>
                    );
                  })
                : placeholderTours.map((tour) => (
                    <a
                      key={tour.id}
                      href={getCategoryBookUrl(pillar.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-2xl border-2 border-aru-orange/20 bg-white p-6 text-left transition-all duration-300 hover:border-aru-orange hover:shadow-xl hover:shadow-aru-orange/10 hover:-translate-y-1 min-h-0"
                    >
                      <div className="flex-1 min-h-0">
                        <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-aru-orange transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                          {tour.title}
                        </h3>
                        <p className="mt-2 text-slate-500 text-sm">{tour.fromPriceLabel ?? `From $${tour.fromPrice}`}</p>
                      </div>
                      <span className="mt-auto pt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-aru-orange group-hover:bg-aru-orange-dark transition-colors shadow-sm">
                        View &amp; Book
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </a>
                  ))}
            </div>
          </section>

          {/* More options – smaller cards (products 5–10 from same bulk call) */}
          {moreOptions.length > 0 && (
            <section aria-labelledby="more-options-heading" className="mt-14">
              <p className="text-sm font-medium text-aru-orange uppercase tracking-wider">More options</p>
              <h2 id="more-options-heading" className="font-display font-bold text-xl text-slate-900 mt-1 mb-6" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                More {pillar.title.toLowerCase().replace(/ in tokyo$/i, "")}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {moreOptions.map((p) => {
                  const listing = categorySlugsWithListings.includes(pillar.slug) ? getListingByProductCode(pillar.slug, p.productCode) : null;
                  const cardHref = listing ? `/${pillar.slug}/${listing.slug}` : p.productUrl;
                  const cardClassName = "group flex flex-col rounded-xl border border-aru-orange/20 bg-white overflow-hidden text-left transition-all duration-200 hover:border-aru-orange hover:shadow-lg hover:shadow-aru-orange/10";
                  const cardContent = (
                    <>
                      <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-aru-cyan/10 to-aru-orange/10">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-slate-400">
                            <svg className="w-10 h-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-aru-orange transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                          {p.title}
                        </h3>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-xs text-slate-500">
                          {p.rating > 0 && <span className="font-semibold text-slate-700">{p.rating.toFixed(1)}</span>}
                          {p.rating > 0 && p.reviewCount > 0 && " · "}
                          {p.reviewCount > 0 && <span>{p.reviewCount.toLocaleString("en-US")} reviews</span>}
                        </div>
                        <p className="mt-1 text-slate-600 text-sm font-medium">{p.fromPriceDisplay}</p>
                        <span className="mt-auto pt-3 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-aru-orange group-hover:bg-aru-orange-dark transition-colors shadow-sm">
                          View &amp; Book
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </>
                  );
                  return listing ? (
                    <Link key={p.productCode} href={cardHref} className={cardClassName}>
                      {cardContent}
                    </Link>
                  ) : (
                    <a key={p.productCode} href={cardHref} target="_blank" rel="noopener noreferrer" className={cardClassName}>
                      {cardContent}
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Guides – specific guides to narrow down options */}
      <div className="bg-aru-cyan/5 py-14 lg:py-20 border-b border-aru-cyan/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <section aria-labelledby="explore-heading">
            <p className="text-sm font-medium text-aru-cyan uppercase tracking-wider">Guides</p>
            <h2 id="explore-heading" className="font-display font-bold text-2xl text-slate-900 mt-1 mb-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Find the right option for you
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl">
              Use these guides to compare by style, time of day, or what&apos;s included—then come back here to see specific tours and book.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pillar.subPages.map((sub, i) => (
                <Link
                  key={i}
                  href={sub.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border-2 border-aru-cyan/20 bg-white px-6 py-5 font-medium text-slate-800 transition-all duration-200 hover:border-aru-cyan hover:shadow-lg hover:shadow-aru-cyan/10 hover:-translate-y-0.5"
                >
                  <span>{sub.label}</span>
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-aru-cyan/10 text-aru-cyan group-hover:bg-aru-cyan group-hover:text-white flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* About */}
      <div className="bg-white py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <section>
            <div className="rounded-2xl border-l-4 border-aru-cyan bg-aru-cyan/5 p-8 lg:p-10">
              <h2 className="font-display font-bold text-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                About {pillar.title.replace(/ in Tokyo$/, "")}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {pillar.about ?? "Tokyo offers a wide range of options for travelers. This page will be updated with detailed, helpful content to help you choose the right experience. We focus on clear comparisons and honest guidance so you can book with confidence."}
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Content cards: Insider tips, What to expect, Who is this for, Highlights */}
      <div className="bg-slate-50/80 py-14 lg:py-20 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
            {pillar.insiderTips && pillar.insiderTips.length > 0 && (
              <section className="rounded-2xl border-2 border-amber-200 bg-white p-6 lg:p-8 shadow-sm">
                <h2 className="font-display font-bold text-lg text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                  <span className="text-amber-600" aria-hidden>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                  </span>
                  Insider tips
                </h2>
                <ul className="space-y-3 text-slate-600 leading-relaxed">
                  {pillar.insiderTips.map((tip, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {pillar.whatToExpect && pillar.whatToExpect.length > 0 && (
              <section className="rounded-2xl border-2 border-aru-cyan/30 bg-white p-6 lg:p-8 shadow-sm">
                <h2 className="font-display font-bold text-lg text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                  <span className="text-aru-cyan" aria-hidden>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  </span>
                  What to expect
                </h2>
                <ol className="space-y-3 text-slate-600 leading-relaxed list-none">
                  {pillar.whatToExpect.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 font-semibold text-aru-cyan w-6">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
            {pillar.whoIsThisFor && (Array.isArray(pillar.whoIsThisFor) ? pillar.whoIsThisFor.length > 0 : pillar.whoIsThisFor.trim()) && (
              <section className="rounded-2xl border-2 border-emerald-200 bg-white p-6 lg:p-8 shadow-sm lg:col-span-2">
                <h2 className="font-display font-bold text-lg text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                  <span className="text-emerald-600" aria-hidden>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </span>
                  Who is this for?
                </h2>
                {Array.isArray(pillar.whoIsThisFor) ? (
                  <ul className="space-y-2 text-slate-600 leading-relaxed">
                    {pillar.whoIsThisFor.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-emerald-500" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-600 leading-relaxed">{pillar.whoIsThisFor}</p>
                )}
              </section>
            )}
            {pillar.highlights && pillar.highlights.length > 0 && (
              <section className="rounded-2xl border-2 border-aru-orange/20 bg-white p-6 lg:p-8 shadow-sm lg:col-span-2">
                <h2 className="font-display font-bold text-lg text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                  <span className="text-aru-orange" aria-hidden>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </span>
                  Highlights
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {pillar.highlights.map((h, i) => (
                    <li key={i}>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-aru-orange/10 text-aru-orange border border-aru-orange/20">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-aru-cyan/5 py-14 lg:py-20 border-y border-aru-cyan/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <section aria-labelledby="faq-heading">
            <p className="text-sm font-medium text-aru-cyan uppercase tracking-wider">Help</p>
            <h2 id="faq-heading" className="font-display font-bold text-2xl text-slate-900 mt-1 mb-8" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Frequently asked questions
            </h2>
            <FaqAccordion faqs={pillar.faqs} />
          </section>
        </div>
      </div>

      {/* Related categories – card style */}
      <div className="bg-aru-orange/5 py-14 lg:py-20 border-t-2 border-aru-orange/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <section aria-labelledby="related-heading">
            <p className="text-sm font-medium text-aru-orange uppercase tracking-wider">More to explore</p>
            <h2 id="related-heading" className="font-display font-bold text-2xl text-slate-900 mt-1 mb-8" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Related categories
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border-2 border-aru-orange/20 bg-white px-5 py-4 font-medium text-slate-800 transition-all duration-200 hover:border-aru-orange hover:bg-aru-orange hover:text-white hover:shadow-lg hover:shadow-aru-orange/20"
                >
                  <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-aru-orange/10 border border-aru-orange/20 text-aru-orange flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <CategoryIcon slug={p.slug} className="w-6 h-6" />
                  </span>
                  <span className="min-w-0 flex-1 group-hover:text-white transition-colors">{p.title}</span>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 shrink-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))}
            </div>
            <Link
              href="/best-tours-in-tokyo"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-aru-orange hover:bg-aru-orange-dark transition-colors shadow-md hover:shadow-lg"
            >
              View all tours in Tokyo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </section>
        </div>
      </div>
    </article>
  );
}
