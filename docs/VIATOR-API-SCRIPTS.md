# Viator API scripts

Scripts that fetch data from the Viator Partner API for static dumps, debugging, and content planning. All scripts load `.env.local` from the project root for `VIATOR_API_KEY`.

**Required env (in `.env.local`):**

- `VIATOR_API_KEY` – your Viator Partner API key (required for all scripts)

**Optional:**

- `VIATOR_API_BASE_URL` – API base. Omit for production (`https://api.viator.com/partner`). For sandbox: `https://api.sandbox.viator.com/partner`

---

## 1. Dump static product summaries (main script for the site)

**Script:** `scripts/dump-static-product-summaries.mjs`

**What it does:** Reads all product codes from `data/pillarProducts.ts`, calls Viator `POST /products/bulk` (and `POST /availability/schedules/bulk` for “from” prices), and writes **`data/staticProductSummariesGenerated.json`**. That file is used at build time so production can show real titles, prices, ratings, and images without calling the API at runtime.

**Run:**

```bash
node scripts/dump-static-product-summaries.mjs
```

**Requirements:** `VIATOR_API_KEY` in `.env.local`. Uses **production** API by default. For sandbox, set `VIATOR_API_BASE_URL=https://api.sandbox.viator.com/partner`.

**Output:** `data/staticProductSummariesGenerated.json` – one entry per product code with `title`, `fromPriceDisplay`, `rating`, `reviewCount`, `imageUrl`, `freeCancellation`, `productUrl`.

---

## 2. Fetch a single product (itinerary + full response)

**Script:** `scripts/fetch-viator-single-product.mjs`

**What it does:** Fetches one product via `GET /products/{productCode}` and writes the full JSON to `scripts/viator-single-product-response.json`. Useful for inspecting **itinerary** (e.g. `itinerary.itineraryItems`) and other fields when building listing content.

**Run:**

```bash
node scripts/fetch-viator-single-product.mjs [productCode]
```

**Example:**

```bash
node scripts/fetch-viator-single-product.mjs 465886P4
```

**Default:** If you omit the code, it uses `37387P3` (Jolly Pirate). Uses **sandbox** by default; override with `VIATOR_API_BASE_URL` if needed.

**Output:** `scripts/viator-single-product-response.json` (full API response). Itinerary is under `itinerary.itineraryItems[]` with `title` and `description` per step.

---

## 3. Fetch bulk (debug pricing/structure)

**Script:** `scripts/fetch-viator-bulk.mjs`

**What it does:** Calls `POST /products/bulk` and `POST /availability/schedules/bulk` for a small hardcoded list of product codes. Used to inspect response shape (e.g. `pricingInfo`, `reviews`) and how “from” price is derived from schedules.

**Run:**

```bash
node scripts/fetch-viator-bulk.mjs
```

**Output:** Logs to console (no file). Uses **sandbox** by default.

---

## 4. Fetch all 10 catamaran products (legacy / Aruba)

**Script:** `scripts/fetch-all-10-catamaran.mjs`

**What it does:** Fetches 10 catamaran product codes via bulk API, writes full response to `scripts/catamaran-10-tours-full-response.json` and a short summary to `scripts/catamaran-10-tours-summary.json`. Originally for Aruba catamaran content; product codes in the script are Aruba-specific.

**Run:**

```bash
node scripts/fetch-all-10-catamaran.mjs
```

**Output:**  
- `scripts/catamaran-10-tours-full-response.json` (full bulk response, includes itinerary per product)  
- `scripts/catamaran-10-tours-summary.json` (title, description excerpt, reviews, etc.)

Uses **sandbox** by default.

---

## Itinerary on the site

- **At runtime:** Tour detail pages call `fetchProductDetails(productCode)` from `lib/viator-api.ts` (GET single product). If the API returns an itinerary, it is passed as `viatorItinerary` to `TourListingTemplate` and shown in the “Itinerary” section.
- **Fallback:** If the API returns no itinerary (or is off), the template uses `listing.itinerary` from the listing data (e.g. `data/walkingToursListings.ts`). All walking tour listings include a static `itinerary` array so the section always has content.
- **To inspect Viator itinerary for a Tokyo walking tour:**  
  `node scripts/fetch-viator-single-product.mjs 465886P4`  
  then open `scripts/viator-single-product-response.json` and check `itinerary.itineraryItems`.
