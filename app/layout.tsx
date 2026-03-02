import type { Metadata } from "next";
import { Outfit, DM_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { CookieConsentProvider } from "@/components/CookieConsentContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-tagline",
  display: "swap",
});

const SITE_URL = "https://tyo365.com";
const DEFAULT_OG_IMAGE =
  "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/aru365/Top%20tours%20in%20tokyo.png";
const defaultTitle = "Tyo365 – Book Best Tours in Tokyo | Food, Culture, Day Trips & Experiences";
const defaultDescription =
  "Tokyo's dedicated platform for booking the best tours and experiences. Find, compare, and book food tours, cultural experiences, day trips, and more — all in one place.";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tyo365",
  url: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  description: defaultDescription,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tyo365",
  url: SITE_URL,
  description: defaultDescription,
  publisher: { "@type": "Organization", name: "Tyo365", url: SITE_URL },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/best-tours-in-tokyo?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en",
    url: SITE_URL,
    siteName: "Tyo365",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Tyo365 – Tours and experiences in Tokyo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans min-h-screen">
        <CookieConsentProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <Header />
          {children}
          <Analytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
