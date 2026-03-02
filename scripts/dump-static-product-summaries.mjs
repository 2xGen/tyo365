/**
 * One-off: fetch all products from Viator API and write staticProductSummariesGenerated.json
 * so production can show real titles, prices, ratings, and images without calling the API.
 *
 * Run (from project root, with VIATOR_API_KEY in .env.local):
 *   node scripts/dump-static-product-summaries.mjs
 *
 * Uses production API by default. For sandbox: VIATOR_API_BASE_URL=https://api.sandbox.viator.com/partner
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Load .env.local
const envPath = path.join(root, ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8").replace(/\r\n/g, "\n");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq > 0) {
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      process.env[key] = val;
    }
  }
}

const apiKey = process.env.VIATOR_API_KEY;
const base = process.env.VIATOR_API_BASE_URL || "https://api.viator.com/partner";
const JPY_TO_USD = Number(process.env.VIATOR_JPY_TO_USD) || 150;
const DEBUG = process.env.DEBUG === "1" || process.env.DEBUG === "true";

function isJPY(currency) {
  if (!currency || typeof currency !== "string") return false;
  const c = currency.toUpperCase().trim();
  return c === "JPY" || c === "YEN" || c === "¥";
}

function toDisplayUsd(amount, currency) {
  return isJPY(currency) ? amount / JPY_TO_USD : amount;
}

if (!apiKey) {
  console.error("Missing VIATOR_API_KEY in .env.local");
  process.exit(1);
}

// Collect all product codes from pillarProducts.ts
const pillarPath = path.join(root, "data", "pillarProducts.ts");
const pillarContent = fs.readFileSync(pillarPath, "utf8");
const codeMatches = pillarContent.matchAll(/"([A-Za-z0-9]+)"\s*(?:,|\/\/)/g);
const allCodes = [...new Set([...codeMatches].map((m) => m[1]))].filter(
  (c) => c.length >= 4 && /\d/.test(c) && !["Record", "string", "length"].includes(c)
);
console.log("Product codes to fetch:", allCodes.length);

const BATCH = 50;
const out = {};

function getFirstImageUrl(images) {
  if (!images?.length) return null;
  const img = images.find((i) => i.isCover === true) ?? images[0];
  if (!img) return null;
  const variants = img.variants;
  if (Array.isArray(variants) && variants.length > 0) {
    const withUrl = variants.filter((v) => typeof v?.url === "string");
    if (withUrl.length > 0) {
      const best = withUrl.reduce((a, b) => {
        const areaA = (a.width || 0) * (a.height || 0);
        const areaB = (b.width || 0) * (b.height || 0);
        return areaB > areaA ? b : a;
      });
      return best.url;
    }
  }
  if (img.url) return img.url;
  if (img.imageUrl) return img.imageUrl;
  return null;
}

for (let i = 0; i < allCodes.length; i += BATCH) {
  const batch = allCodes.slice(i, i + BATCH);
  const url = `${base}/products/bulk`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;version=2.0",
      "Accept-Language": "en-US",
      "exp-api-key": apiKey,
    },
    body: JSON.stringify({ productCodes: batch }),
  });
  if (!res.ok) {
    console.error("Bulk API error:", res.status, await res.text());
    process.exit(1);
  }
  const data = await res.json();
  if (!Array.isArray(data)) {
    console.error("Unexpected bulk response");
    process.exit(1);
  }
  for (const item of data) {
    const code = item.productCode || "(no code)";
    if (item.status !== "ACTIVE") {
      if (DEBUG) console.warn("Skip (status):", code, "status=", item.status);
      continue;
    }
    if (!item.productCode) {
      if (DEBUG) console.warn("Skip (no productCode):", item.title || code);
      continue;
    }
    // Some products (e.g. tickets/attractions like teamLab) may not return productUrl in bulk API
    const productUrl = item.productUrl || `https://www.viator.com/tours/Tokyo/d334-${item.productCode}`;
    if (!item.productUrl && DEBUG) console.warn("Missing productUrl, using fallback for:", item.productCode);
    const pricing = item.pricingInfo ?? {};
    const currency = typeof pricing.currency === "string" ? pricing.currency : undefined;
    // Use Viator's product-level "from price": prefer summary (e.g. "From $31.00"), then priceFrom/fromPrice
    // Convert JPY to USD so output is always in USD
    let fromPriceDisplay;
    if (typeof pricing.summary === "string" && pricing.summary.trim()) {
      const s = pricing.summary.trim();
      if (/^(from\s+)?\$?\d+/i.test(s)) {
        const numPart = s.replace(/^from\s+/i, "").trim();
        fromPriceDisplay = numPart.startsWith("$") ? `Price from ${numPart} USD` : `Price from $${numPart} USD`;
      } else if (/¥|JPY|Yen/i.test(s) && /\d+/.test(s)) {
        const num = parseInt(s.replace(/\D/g, ""), 10);
        if (!isNaN(num)) {
          const usd = Math.round(toDisplayUsd(num, "JPY"));
          fromPriceDisplay = `Price from $${usd} USD`;
        } else {
          fromPriceDisplay = `Price from ${s}`;
        }
      } else {
        fromPriceDisplay = `Price from ${s}`;
      }
    } else {
      let priceFrom =
        typeof pricing.priceFrom === "number"
          ? pricing.priceFrom
          : typeof pricing.fromPrice === "number"
            ? pricing.fromPrice
            : pricing.recommendedRetailPrice ?? pricing.minPrice;
      if (priceFrom === undefined && Array.isArray(pricing.ageBands) && pricing.ageBands.length > 0) {
        const prices = pricing.ageBands
          .map((b) => b.recommendedRetailPrice ?? b.price)
          .filter((n) => typeof n === "number");
        if (prices.length > 0) priceFrom = Math.min(...prices);
      }
      if (typeof priceFrom === "number") {
        const usd = Math.round(toDisplayUsd(priceFrom, currency));
        fromPriceDisplay = `Price from $${usd} USD`;
      } else {
        fromPriceDisplay = "Price from (see options)";
      }
    }
    const totalReviews = Number(item.reviews?.totalReviews) || 0;
    const averageRating =
      Number(item.reviews?.averageRating) || Number(item.reviews?.combinedAverageRating) || 0;
    const imageUrl = getFirstImageUrl(item.images);
    const policyText = String(item.cancellationPolicy?.type ?? "") + String(item.cancellationPolicy?.description ?? "");
    const freeCancellation = /free/i.test(policyText);
    out[item.productCode] = {
      title: item.title ?? "Tour",
      fromPriceDisplay,
      rating: averageRating,
      reviewCount: totalReviews,
      imageUrl: imageUrl || null,
      freeCancellation,
      productUrl: productUrl || null,
    };
  }
  console.log("Fetched batch", Math.floor(i / BATCH) + 1, "/", Math.ceil(allCodes.length / BATCH));
}

// Override with schedule summary.fromPrice when present (Viator's official "from price", not min of all bands)
const schedUrl = `${base}/availability/schedules/bulk`;
const schedRes = await fetch(schedUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json;version=2.0",
    "Accept-Language": "en-US",
    "exp-api-key": apiKey,
  },
  body: JSON.stringify({ productCodes: allCodes }),
});
if (schedRes.ok) {
  const schedData = await schedRes.json();
  const list = schedData?.availabilitySchedules ?? [];
  for (const schedule of list) {
    const code = schedule.productCode;
    if (!code || !out[code]) continue;
    const current = out[code].fromPriceDisplay || "";
    const hasProductPrice =
      current && !current.includes("(see options)") && /\d/.test(current);
    if (hasProductPrice) continue;
    const rawPrice = schedule.summary?.fromPrice;
    if (typeof rawPrice === "number" && rawPrice > 0) {
      // Schedule API often doesn't return currency; amounts >= 3000 are typically JPY (Tokyo)
      const usd = Math.round(toDisplayUsd(rawPrice, rawPrice >= 3000 ? "JPY" : undefined));
      out[code].fromPriceDisplay = `Price from $${usd} USD`;
    }
  }
  console.log("Applied schedule summary.fromPrice for", list.length, "products");
}

const outPath = path.join(root, "data", "staticProductSummariesGenerated.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
console.log("Wrote", outPath, "with", Object.keys(out).length, "products");

const missing = allCodes.filter((c) => !out[c]);
if (missing.length > 0) {
  console.warn("Requested but missing from API output (" + missing.length + "):", missing.slice(0, 20).join(", ") + (missing.length > 20 ? " ..." : ""));
  if (DEBUG && missing.length > 0) {
    console.warn("Tip: If a product is missing, the bulk API may not return it (e.g. different catalog). Try single-product fetch: node scripts/fetch-viator-single-product.mjs <productCode>");
  }
}
