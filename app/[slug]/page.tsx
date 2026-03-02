import { notFound } from "next/navigation";
import { getPillarBySlug, isPillarSlug } from "@/data/pillars";
import { getProductCodesForPillar } from "@/data/pillarProducts";
import { getStaticProductSummaries } from "@/data/staticProductSummaries";
import { fetchProductsBulk } from "@/lib/viator-api";
import { PillarTemplate } from "@/components/PillarTemplate";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

const SITE_URL = "https://tyo365.com";
const DEFAULT_OG_IMAGE =
  "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/tyo365/tyo365%20tours%20and%20experiences%20in%20tokyo.png";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isPillarSlug(slug)) return {};
  const pillar = getPillarBySlug(slug);
  if (!pillar) return {};
  const title = `Book ${pillar.title} | Tyo365`;
  const description = `${pillar.description} Compare options and book with free cancellation.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${slug}`,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Tyo365 – Tours and experiences in Tokyo" }],
    },
    alternates: {
      canonical: `${SITE_URL}/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const { pillars } = await import("@/data/pillars");
  return pillars.map((p) => ({ slug: p.slug }));
}

export default async function PillarPage({ params }: Props) {
  const { slug } = await params;
  if (!isPillarSlug(slug)) notFound();
  const pillar = getPillarBySlug(slug);
  if (!pillar) notFound();

  let featuredProducts: Awaited<ReturnType<typeof fetchProductsBulk>> = [];
  const productCodes = getProductCodesForPillar(slug);
  if (productCodes.length > 0) {
    try {
      const fetched = await fetchProductsBulk(productCodes);
      const orderMap = new Map(productCodes.map((code, i) => [code, i]));
      featuredProducts = [...fetched].sort(
        (a, b) => (orderMap.get(a.productCode) ?? 999) - (orderMap.get(b.productCode) ?? 999)
      );
    } catch {
      // API failed; use placeholders
    }
  }

  const hasUsableProducts =
    featuredProducts.length > 0 && featuredProducts.some((p) => p.title && p.title.trim().length > 0);
  if (!hasUsableProducts && productCodes.length > 0) {
    featuredProducts = getStaticProductSummaries(productCodes, slug);
  }
  const passToTemplate =
    featuredProducts.length > 0 && featuredProducts.some((p) => p.title && p.title.trim().length > 0)
      ? featuredProducts
      : undefined;

  return (
    <>
      <PillarTemplate pillar={pillar} featuredProducts={passToTemplate} />
      <Footer />
    </>
  );
}
