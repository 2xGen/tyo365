"use client";

import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import { CategoryIcon } from "./icons/CategoryIcons";
import type { GuidePage, GuidePick } from "@/data/guides";
import type { ViatorProductSummary } from "@/lib/viator-api";

export interface GuideTemplateProps {
  guide: GuidePage;
  categoryTitle: string;
  categoryHref: string;
  /** Each pick with its Viator data (image, price, title) */
  picksWithTours: { pick: GuidePick; tour: ViatorProductSummary | null }[];
  /** Up to 3 other sub-category (guide) pages in the same category to link to */
  relatedGuides?: { label: string; href: string }[];
}

export function GuideTemplate({
  guide,
  categoryTitle,
  categoryHref,
  picksWithTours,
  relatedGuides = [],
}: GuideTemplateProps) {
  const faqSchema =
    guide.faqs && guide.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <article className="min-h-screen bg-white">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Best tours in Tokyo", href: "/best-tours-in-tokyo" },
              { label: categoryTitle, href: categoryHref },
              { label: guide.title },
            ]}
          />
        </div>
      </div>

      {/* Hero – matches category page style */}
      <div className="relative bg-aru-cyan/5 overflow-hidden border-b border-aru-cyan/10">
        <div className="absolute inset-0 bg-dots-subtle pointer-events-none" aria-hidden />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-aru-cyan font-medium text-sm uppercase tracking-widest">
              {categoryTitle}
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-start gap-8">
              <span className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white border-2 border-aru-cyan/20 text-aru-cyan flex items-center justify-center shadow-md shadow-aru-cyan/10">
                <CategoryIcon slug={categoryHref.replace(/^\//, "")} className="w-10 h-10" />
              </span>
              <div className="min-w-0">
                <h1
                  className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                >
                  {guide.title}
                </h1>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                  {guide.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={categoryHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-aru-cyan hover:text-aru-cyan-dark bg-aru-cyan/5 hover:bg-aru-cyan/10 transition-colors"
                  >
                    Back to {categoryTitle}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our picks */}
      <div className="bg-aru-orange/5 py-14 lg:py-20 border-y border-aru-orange/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <section aria-labelledby="picks-heading">
            <p className="text-sm font-medium text-aru-orange uppercase tracking-wider">Our picks</p>
            <h2 id="picks-heading" className="font-display font-bold text-2xl text-slate-900 mt-1 mb-10" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Our best {guide.title.replace(/^Best\s+/i, "").replace(/s\s*$/, "").toLowerCase()} picks
            </h2>
            <div className="space-y-12">
              {picksWithTours.map(({ pick, tour }) => (
                <Link
                  key={pick.slug}
                  href={`${categoryHref}/${pick.slug}`}
                  className="group block rounded-2xl border-2 border-aru-orange/20 bg-white overflow-hidden transition-all duration-300 hover:border-aru-orange hover:shadow-xl hover:shadow-aru-orange/10"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-72 shrink-0 aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-gradient-to-br from-aru-cyan/20 to-aru-orange/20">
                      {tour?.imageUrl ? (
                        <img
                          src={tour.imageUrl}
                          alt=""
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400">
                          <svg className="w-16 h-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col flex-1 justify-center">
                      <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-aru-orange transition-colors" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                        {tour?.title ?? "View tour details"}
                      </h3>
                      {(tour?.rating ?? 0) > 0 && (tour?.reviewCount ?? 0) > 0 && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                          <span className="font-semibold text-slate-800">
                            {tour!.rating.toFixed(1)} · {tour!.reviewCount.toLocaleString("en-US")} reviews
                          </span>
                        </div>
                      )}
                      {tour?.fromPriceDisplay && (
                        <p className="mt-1 font-medium text-slate-700">{tour.fromPriceDisplay}</p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-aru-orange">
                        View full details &amp; book
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="px-6 sm:px-8 pb-6 pt-0">
                    <p className="text-slate-600 leading-relaxed">{pick.whyWePickIt}</p>
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-slate-800 mb-2">Best for:</p>
                      <ul className="space-y-1">
                        {pick.bestFor.map((item, i) => (
                          <li key={i} className="flex gap-2 text-slate-600 text-sm">
                            <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-aru-orange" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Intro + what to expect */}
      <div className="bg-white py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <p className="text-slate-600 leading-relaxed text-lg">
            {guide.intro}
          </p>
          {(guide.whyBlock || guide.whyMorning) && (
            <div className="mt-8 rounded-2xl border-l-4 border-amber-400 bg-amber-50/80 p-6">
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                {guide.whyBlock?.title ?? "Why choose a morning cruise?"}
              </h3>
              <p className="text-slate-700 leading-relaxed">{guide.whyBlock?.content ?? guide.whyMorning}</p>
            </div>
          )}
          <section className="mt-10">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              What to expect
            </h2>
            <ol className="space-y-4 text-slate-600 leading-relaxed">
              {guide.whatToExpect.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-aru-cyan/20 text-aru-cyan font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      {/* FAQ */}
      {guide.faqs && guide.faqs.length > 0 && (
        <div className="bg-aru-cyan/5 py-10 lg:py-14 border-y border-aru-cyan/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 id="faq-heading" className="font-display font-bold text-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {guide.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 hover:border-aru-cyan/50 open:border-aru-cyan open:shadow-md"
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
          </div>
        </div>
      )}

      {/* Related sub-categories (other guides in same category) */}
      {relatedGuides.length > 0 && (
        <div className="bg-slate-50/80 py-14 lg:py-20 border-y border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <section aria-labelledby="related-guides-heading">
              <h2 id="related-guides-heading" className="font-display font-bold text-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                More ways to explore
              </h2>
              <p className="text-slate-600 mb-6">
                Compare other {categoryTitle.toLowerCase()} options:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedGuides.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    className="group flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 font-medium text-slate-800 transition-all duration-200 hover:border-aru-cyan hover:shadow-lg hover:shadow-aru-cyan/10"
                  >
                    <span className="shrink-0 w-10 h-10 rounded-xl bg-aru-cyan/10 text-aru-cyan group-hover:bg-aru-cyan group-hover:text-white flex items-center justify-center transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1 group-hover:text-aru-cyan transition-colors line-clamp-2">{g.label}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Back to category + all tours */}
      <div className="bg-aru-cyan/5 py-14 lg:py-20 border-t border-aru-cyan/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <Link
            href={categoryHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-aru-cyan hover:bg-aru-cyan-dark transition-colors shadow-md hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            View all {categoryTitle}
          </Link>
          <p className="mt-4 text-sm text-slate-500">
            Compare all tours in this category and book with free cancellation.
          </p>
        </div>
      </div>
    </article>
  );
}
