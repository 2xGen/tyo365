# Tyo365 Style & Structure Reference

This document captures the design system and page patterns used on Tyo365 so we can recreate Tokyo-specific category, sub-category, and tour pages consistently.

**Current state:** Category pages (`/[slug]`), sub-category/tour pages (`/[slug]/[tourSlug]`), and the full tours-excursions and best-tours-in-tokyo content have been removed. The **templates and data modules are still in the repo** (e.g. `PillarTemplate`, `GuideTemplate`, `TourListingTemplate`, `data/pillars.ts`, `data/guides.ts`, listing files) for reference when building new Tokyo-specific pages. Use this doc and those components as the blueprint.

---

## Design tokens

### Colors (Japan / Tokyo palette)

- **Primary (brand red)** – torii/shrine red  
  - `aru-orange`: `#c41e3a`  
  - `aru-orange-dark`: `#9e1830` (hover states)  
  - Use for: primary CTA buttons, brand wordmark “Tyo”, key highlights, active nav.

- **Secondary (indigo)**  
  - `aru-cyan`: `#4338ca`  
  - `aru-cyan-dark`: `#3730a3` (hover)  
  - Use for: “365”, links, secondary buttons, category accents, focus rings.

- **Neutrals**  
  - Text: `text-slate-900` (headings), `text-slate-700`/`text-slate-600` (body), `text-slate-500` (muted).  
  - Backgrounds: `bg-white`, `bg-slate-50`, `bg-slate-100` for sections.  
  - Borders: `border-slate-200`, `border-slate-100`.

Defined in:
- `app/globals.css` (`:root` variables)
- `tailwind.config.ts` (`theme.extend.colors.aru`)

### Typography

- **Display (headings)**: `var(--font-display)` → **Outfit** (layout.tsx).  
  - Usage: `font-display font-bold`, often with `style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}` for reliability.
- **Body**: `var(--font-geist-sans)` → **DM Sans**.
- **Tagline / serif**: `var(--font-tagline)` → **Playfair Display** (e.g. hero tagline).  
  - Usage: `style={{ fontFamily: "var(--font-tagline), Georgia, serif" }}`.

Scale: hero `text-4xl`–`text-7xl`, page titles `text-3xl`–`text-5xl`, section titles `text-xl`–`text-3xl`, body `text-base`/`text-lg`.

### Layout & spacing

- **Container**: `container mx-auto px-4 sm:px-6 lg:px-8`.
- **Sections**: `py-12 lg:py-14` to `py-20 lg:py-28`.
- **Content width**: `max-w-3xl` (narrow copy), `max-w-4xl` (hero), `max-w-6xl` (grids).

### Backgrounds & patterns

- **Dot pattern (subtle)**: `bg-dots-subtle` – radial dots, low opacity. Used on hero and category hero areas.
- **Section contrast**: alternate `bg-white` and `bg-slate-50` or `bg-aru-cyan/5` for category heroes.

### Buttons & CTAs

- **Primary**: `bg-aru-orange hover:bg-aru-orange-dark text-white`, `rounded-2xl` or `rounded-xl`, `px-6 py-3` / `px-8 py-4`, `font-semibold`, `btn-lift` for hover lift.
- **Secondary**: `text-aru-cyan hover:text-aru-cyan-dark bg-aru-cyan/5 hover:bg-aru-cyan/10`, same rounding/padding.
- **Shadow**: primary often uses `shadow-lg shadow-aru-orange/20`.

### Cards

- **Tour/category cards**: `rounded-2xl border-2 border-aru-orange/20` or `border-slate-200`, `p-6`, hover `hover:border-aru-orange hover:shadow-xl hover:-translate-y-1`.
- **FAQ / accordion**: `rounded-2xl border border-slate-200`, `open:border-aru-cyan open:shadow-md`, summary with custom chevron in `rounded-xl bg-slate-100 text-aru-cyan` (open: `bg-aru-cyan text-white`).

---

## Page structure (for when we add Tokyo pages back)

### 1. Homepage

- **Hero**: full-width, `min-h-[85vh]`, centered copy, dot background, staggered fade-in-up animations (`animate-fade-in-up` + `animationDelay`).
- **Sections below**: e.g. top picks grid, category links, “Why book with us”, then Footer.

### 2. Category (pillar) page – `/[slug]`

- **Breadcrumbs**: `Home > Best tours in Tokyo > [Category name]` in a top bar `border-b border-slate-200`.
- **Hero block**: `bg-aru-cyan/5`, dot pattern, icon (e.g. CategoryIcon) in `w-20 h-20 rounded-2xl bg-white border-2 border-aru-cyan/20`, title + description, link to “View all tours”.
- **Content**: “Popular choices” (top 4 as large cards), “More options” (next 6 as smaller cards), sub-pages (guide links), “About [category]”, related categories, FAQ accordion.
- **Template**: `components/PillarTemplate.tsx`. Data: `data/pillars.ts` (Pillar: slug, title, description, subPages, relatedSlugs, faqs, about, insiderTips, whatToExpect, whoIsThisFor, highlights).

### 3. Sub-category (guide) page – `/[slug]/[tourSlug]` (guide)

- **Breadcrumbs**: Home > Best tours > Category > Guide title.
- **Layout**: intro copy, then “Top picks” (list of tours with image, title, price, CTA). Uses `GuideTemplate.tsx`. Data: `data/guides.ts` (Guide: slug, title, description, categorySlug, picks[] with slug/label).

### 4. Tour detail page – `/[slug]/[tourSlug]` (listing)

- **Same URL pattern** as guide; resolved by checking whether `tourSlug` is a guide slug or a listing slug.
- **Layout**: breadcrumbs, hero with image/title, key info (price, rating, duration, etc.), description, FAQ, related tours, CTA. Template: `TourListingTemplate.tsx`. Data: per-category listing files in `data/*Listings.ts` (TourListing: slug, productCode, seoTitle, angle, metaDescription, intro, faqs, etc.).

### 5. Best tours hub – `/best-tours-in-tokyo`

- Breadcrumbs, H1 “Find & book the best tours in Tokyo”, then “Top picks” (one tour per category), then “Browse by category” grid linking to each `/[slug]`.

### 6. All tours – `/tours-excursions`

- Filter by category, sort, paginated grid of tour cards (image, category label, title, price, rating, “View & Book”).

---

## Components to reuse for Tokyo pages

| Component | Purpose |
|-----------|---------|
| `Header` | Sticky nav: logo, Home, Top picks, All tours, Categories dropdown. |
| `Footer` | Brand, tagline, “More destinations”, category links, legal, 2xGen. |
| `Breadcrumbs` | `items: { label, href? }[]`. |
| `PillarTemplate` | Full category page: hero, top picks, more options, sub-pages, about, related, FAQ. |
| `GuideTemplate` | Guide/comparison page: intro + list of tour picks. |
| `TourListingTemplate` | Single tour detail: hero, info, description, FAQ, related, CTA. |
| `CategoryIcon` | Icon per category slug (map in `components/icons/CategoryIcons.tsx`). |
| `Hero` | Homepage hero with brand, tagline, CTA. |

---

## Data shape (reference)

- **Pillar** (`data/pillars.ts`): slug, title, description, subPages[], relatedSlugs[], faqs[], about?, insiderTips?, whatToExpect?, whoIsThisFor?, highlights[].
- **Guides** (`data/guides.ts`): slug, title, description, categorySlug, picks[] { slug, label }.
- **Listings** (e.g. `data/catamaranListings.ts`): slug, productCode, operator, seoTitle, angle, metaDescription, intro, faqs[], etc. Exported per-category; aggregated in `data/listings.ts` (getTourListing, getTourListingsByCategory, categorySlugsWithListings).
- **Product codes** (`data/pillarProducts.ts`): map of category slug → Viator product codes for “top picks” and “more options”.

---

## Animations

- `animate-fade-in-up`: opacity 0→1, translateY(20px)→0. Use with `animationDelay` and `animationFillMode: "forwards"` for staggered hero content.
- `animate-fade-in`, `animate-slide-up`, `animate-scale-in`: defined in tailwind.config.ts keyframes.

---

## SEO & metadata

- Every page: `title`, `description`, `openGraph`, `alternates.canonical`.
- Category/tour pages: JSON-LD (e.g. FAQPage) where relevant.
- Layout: organization and WebSite schema in layout.tsx.

Use this doc when adding new Tokyo-specific category, guide, or tour pages so the look and structure stay consistent.
