/**
 * Static snapshot of Viator-style product data for category "Popular choices" cards.
 * Used when the Viator API is unavailable (e.g. production without key or API failure)
 * so production shows the same tour cards as localhost.
 *
 * Shape matches ViatorProductSummary (title, fromPriceDisplay, rating, reviewCount, etc.).
 * productUrl: internal link when we have a listing; else from dump (productUrl) or getCategoryBookUrl().
 */
import type { ViatorProductSummary } from "@/lib/viator-api";
import { getListingByProductCode } from "@/data/listings";
import { getCategoryBookUrl, getViatorProductBookUrl } from "@/lib/booking";

/** Viator API snapshot: run `node scripts/dump-static-product-summaries.mjs` locally (with VIATOR_API_KEY in .env.local) to fill this file. Images and prices are taken from Viator only via this dump—no placeholders. Production then shows Viator titles, prices, ratings, and images without calling the API at runtime. */
import generatedStatic from "./staticProductSummariesGenerated.json";

const generatedByCode = generatedStatic as Record<
  string,
  { title: string; fromPriceDisplay: string; rating: number; reviewCount: number; imageUrl: string | null; freeCancellation: boolean; productUrl?: string | null }
>;

/**
 * Returns the Viator booking URL for a product in www.viator.com format (not shop.live.rc.viator.com).
 * Use for "View options & book" on single tour pages and anywhere we need a product booking link.
 */
export function getViatorProductUrl(productCode: string): string {
  return getViatorProductBookUrl(productCode);
}

/** Static card data per product code (fallback when no generated snapshot). */
const staticByCode: Record<
  string,
  {
    title: string;
    fromPriceDisplay: string;
    rating: number;
    reviewCount: number;
    imageUrl?: string | null;
    freeCancellation?: boolean;
  }
> = {
  // Catamaran (first 4 = top picks – real data so production matches localhost)
  "119085P1": {
    title: "Dolphin Catamaran Snorkel and Sail with Open Bar",
    fromPriceDisplay: "Price from $44 USD",
    rating: 4.7,
    reviewCount: 2382,
    imageUrl: null,
    freeCancellation: true,
  },
  "2785MORSNORKEL": {
    title: "Half-Day Snorkel Sail Tour with Caribbean Lunch",
    fromPriceDisplay: "Price from $85 USD",
    rating: 4.8,
    reviewCount: 720,
    imageUrl: null,
    freeCancellation: true,
  },
  "6593P7": {
    title: "Luxury Lagoon Cruise with Onboard Chef and Signature Cocktails",
    fromPriceDisplay: "Price from $149 USD",
    rating: 4.8,
    reviewCount: 248,
    imageUrl: null,
    freeCancellation: true,
  },
  "8936P1": {
    title: "Arusun Catamaran Sail with Snorkeling in Aruba",
    fromPriceDisplay: "Price from $35 USD",
    rating: 4.8,
    reviewCount: 2449,
    imageUrl: null,
    freeCancellation: true,
  },
  // Catamaran more options
  "444239P8": {
    title: "Tropical Sailing Experience with BBQ Lunch or BBQ Dinner in Aruba",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "47607P3": {
    title: "Premium Catamaran Morning Sail: Snorkeling, Mimosas and Brunch",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "47607P2": {
    title: "Premium Catamaran Afternoon Sail: Snorkeling and Lunch",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "37387P3": {
    title: "Aruba Jolly Pirate Afternoon Sail with Snorkeling",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "2785AFTSNORKEL": {
    title: "Antilla Shipwreck and Catalina Bay Snorkel Sail",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "6593P8": {
    title: "Iconic Aruba Sail and Snorkel Experience",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  // Sunset and dinner (first 4)
  "2785DINNER": {
    title: "Aruba Dinner Cruise by Catamaran",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "8936P5": {
    title: "Aruba Sunset Sail – The Arusun Catamaran",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "245508": {
    title: "Palm Pleasure Sunset Sail",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "119085P2": {
    title: "Catamaran Dolphin Sunset Cruise in Aruba",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  // Sunset more
  "6593DINNER": {
    title: "Aruba Sunset Cruise and Seaside Dinner",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "47607P4": {
    title: "Aruba Happy Hour Sunset Sail",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "6593P10": {
    title: "Aruba Sunset Sail Experience",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "2785SUNSET": {
    title: "Aruba Sunset Catamaran Cruise",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "37387P2": {
    title: "Sunset Pirate Cruise in Aruba",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "6593P14": {
    title: "Havanas Sunset Cruise",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  // Snorkeling
  "325347P2": { title: "Discover Scuba Diving on Aruba's Reef", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "186518P5": { title: "Discover Snorkeling Mangel Halto", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "325347P3": { title: "Turtle Spotting Snorkeling Excursion", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5567676P3": { title: "Aruba Turtle Spotting Snorkeling Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // ATV
  "6841P7": { title: "Natural Pool and Cave Explorer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "6687ATV": { title: "Aruba ATV Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "137607P10": { title: "Aruba ATV Tours Single and Double Seater 4-Hour Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "47774P3": { title: "Aruba's Secret Beach and Cave Pool UTV and ATV Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Island sightseeing
  "6593P16": { title: "Aruba Natural Wonders Jeep Tour Caves and Natural Pool", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "7389P1": { title: "Aruba Island Sightseeing Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "137607P19": { title: "Aruba Private Luxury Jeep Tours", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "441143P1": { title: "National Park Safari Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Photoshoots
  "5628877P6": { title: "Aruba Golden Hour Beach Photoshoot", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5616292P5": { title: "Family Couple and Engagement Photography", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "474314P1": { title: "Clear Kayak Shoot LUX", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5563642P1": { title: "Professional Sunset Photoshoot", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Horseback
  "7927P1": { title: "Small Group Beach Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "14261P1": { title: "Natural Pool Horseback Riding", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "13835P20": { title: "Sunset Rock Formation Countryside and Beach", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "7927P13": { title: "Ecological and Beach Horseback Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Romantic
  "6593P11": { title: "Exclusive Dinner Cruise", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5493518P1": { title: "Eagle Beach Romantic Sunset Picnic Cabana", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5493518P2": { title: "Beach Romantic Sunset Photoshoot Picnic Cabana", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Private & luxury
  "171319P1": { title: "VIP Airport Hosting Arrival", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "171319P2": { title: "VIP Airport Hosting Departure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "6687P7": { title: "VIP Luxury SUV Airport Transfer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5492822P1": { title: "Private Round Trip Airport Transfer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Airport transfers (Aruba) — fallback until you run dump; run `node scripts/dump-static-product-summaries.mjs` for Viator images & live prices
  "12431P5": { title: "Private Airport Transportation Services", fromPriceDisplay: "Price from $45 USD", rating: 0, reviewCount: 0, imageUrl: null },
  "2455AUAAPTRND": { title: "Roundtrip Aruba Airport Transfer", fromPriceDisplay: "Price from $75 USD", rating: 0, reviewCount: 0, imageUrl: null },
  "332620P2": { title: "Private Transfers", fromPriceDisplay: "Price from $40 USD", rating: 0, reviewCount: 0, imageUrl: null },
  "242476P1": { title: "AyCaramba Transfer and Private Tour Aruba", fromPriceDisplay: "Price from $120 USD", rating: 0, reviewCount: 0, imageUrl: null },
  "3046AUAAPTRND": { title: "Roundtrip Aruba Airport Private Transfer", fromPriceDisplay: "Price from $80 USD", rating: 0, reviewCount: 0, imageUrl: null },
  "5597840P1": { title: "Aruba Private Airport Transfer", fromPriceDisplay: "Price from $42 USD", rating: 0, reviewCount: 0, imageUrl: null },
  "7389P5": { title: "One-Way Private Airport Transfer", fromPriceDisplay: "Price from $38 USD", rating: 0, reviewCount: 0, imageUrl: null },
  "5568850P2": { title: "Private Airport Transfers", fromPriceDisplay: "Price from $40 USD", rating: 0, reviewCount: 0, imageUrl: null },
  // Sea Glass Island (Aruba) — fallback until dump
  "419440P1": { title: "Sea Glass Island Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "122173P3": { title: "Kayak Tour to Seaglass Island", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "358117P3": { title: "Sea Glass Island and Clear Kayak Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "300281P10": { title: "Sea Glass Island Kayak Tour Afternoon", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "358117P10": { title: "Sea Glass Island Tour By Boat", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "300281P7": { title: "Sea Glass Island Kayak Sunset Snorkeling Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "300281P12": { title: "Sea Glass Island Kayak Tour Morning Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Water sports (Aruba) — fallback until dump
  "119085P5": { title: "Water Skiing and Wakeboarding", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "137607P22": { title: "Aruba Jet Ski Rental", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "119085P3": { title: "Flyboarding and Jetovator 30 min", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "119085P4": { title: "Jet Ski Waverunner Rental", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "102406P1": { title: "Parasailing", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "119085P6": { title: "Tube Ride 15 minutes", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "8936P2": { title: "Aruba Parasailing Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Walking tours in Tokyo
  "465886P4": { title: "Tokyo Asakusa All-in-One Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "456539P2": { title: "Customized and Personalized Tour with New Local Friends in Tokyo", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "21490P2": { title: "Tokyo Private Custom Full-Day Walking Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "175777P17": { title: "Shibuya Walking Tour: Famous Crossing and Hachi the Dog Stories", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "465886P20": { title: "Tokyo Imperial Palace East Garden Historical Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5507368P3": { title: "Shinjuku Authentic Food Experience in Tokyo", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "92136P35": { title: "Tokyo Half-day Private Custom Tour with National Licensed Guide", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "456539P20": { title: "Asakusa Private Food Walking Tour for Family - Lunch and 5 Bites", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "465886P1": { title: "Tokyo Local Bar Hopping Tour in Shibuya", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5924TYOCUSTOM": { title: "Private Custom Tour: Tokyo in a Day", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Food tours in Tokyo (additional codes not in walking)
  "87037P2": { title: "Izakaya Food Tour in Shinjuku", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5507368P6": { title: "Tokyo Shinjuku Food and Drink Inclusive Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "465886P5": { title: "Best of Tsukiji Food Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "456539P1": { title: "Explore Aesthetic Nights of Japanese Food and Izakaya at Shinjuku", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "63670P33": { title: "Tokyo Night Foodie Tour in Shinjuku", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "63670P1": { title: "Tokyo Bar Hopping Tour in Shinjuku - Hidden Bars in Food Alleys", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "21490P9": { title: "Food Tour at the Tsukiji Fish Market", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "63670P2": { title: "Tokyo Bar Hopping Tour in Shibuya - Deep Indoor Food Alley", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Day trips from Tokyo
  "444978P1": { title: "Mount Fuji Full-Day Tour from Tokyo with English-Speaking Guide", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "28575P2": { title: "1-Day Amazing Tokyo Bus Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "100913P13": { title: "From Tokyo: Mt. Fuji Full-Day Sightseeing Trip", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5523026P35": { title: "Mt. Fuji and Hakone Day Trip: Cruise, Springs and Pagoda View", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "442126P2": { title: "Mount Fuji Private Sightseeing Tour with Driver-Photographer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "444978P11": { title: "Mount Fuji Sightseeing Full-Day Tour from Tokyo or Shinjuku", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "444978P12": { title: "From Tokyo: Mount Fuji Sightseeing Full-Day Trip", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "43454P72": { title: "Amazing Mt. Fuji and Hakone Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5489818P14": { title: "Instagram-Worthy 1-Day Trip to Mount Fuji From Tokyo", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Private tours in Tokyo
  "5610480P1": { title: "Tokyo Private Custom Tour with Bilingual Driver-Guide", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "88165P1": { title: "Tokyo Private Chauffeur Driving Sightseeing Tour with English-Speaking Driver", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "92136P142": { title: "Tokyo Off-the-Beaten-Path Full-Day Private Tour with Nationally Licensed Guide", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "30791P656": { title: "A Half-Day in Tokyo with a Local: Private and Personalized", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "65053P1": { title: "1-Day Tokyo Private Sightseeing Tour with English-Speaking Driver", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "442126P1": { title: "Full-Day Tokyo Private Tour by Car or Van with English-Speaking Driver", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "65053P9": { title: "1-Day Private Mt. Fuji Tour Charter with English-Speaking Driver", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "92136P76": { title: "Tokyo Best Japanese Gardens Private Custom Tour with National Licensed Guide", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "437186P2": { title: "Hakone & Fuji: Relaxation, Onsen, Arts and Nature Private Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Nightlife & bar tours in Tokyo
  "5523026P1": { title: "Tokyo Shinjuku Must-See Night Walking Tour with Free Original Video", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5587308P16": { title: "All-Nighter: Sing, Drink and Dance with Local Japanese Uni Students", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5625159P2": { title: "Tokyo Night Drive: Wangan Expressway and Daikoku PA", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "133677P11": { title: "Shinjuku Kabukicho Tour with Smappa Licensed Guide", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "416969P13": { title: "Shinjuku Night Explorer: Private Tour to Hidden Bars", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5548260P14": { title: "Private Karaoke Bar Tour with All-You-Can-Drink in Roppongi", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "477979P28": { title: "Tokyo Shinjuku Private Vibrant District Walking Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5570284P10": { title: "Anime Karaoke Night: Tokyo Snack Bar Experience with Dinner", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5603323P7": { title: "Tokyo Nightlife: Bar Hopping and Private Karaoke (3 Spots)", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5505608P4": { title: "Tokyo Bar and Sake Tour at OKUROJI", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Anime & pop culture tours in Tokyo
  "478596P7": { title: "Tokyo Shinjuku Anime Food Tour: Eat Iconic Dishes and Explore the Scene", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "477979P10": { title: "Tokyo Akihabara Pop Culture and Tradition Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "176858P1": { title: "Akiba Tailor-Made Tour for Anime Fans", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "63670P17": { title: "Akihabara Anime and Gaming Adventure Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "27666P91": { title: "Anime Studio Visit and Workshop", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "454343P8": { title: "Tokyo Akihabara Anime, Manga, Video Games and Hidden Gems Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5608668P2": { title: "Anime Cel Painting Workshop with Anime Coloring Artist in Tokyo", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "454343P3": { title: "Tokyo Akihabara Anime, Manga, Video Games and Maid Cafe Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5499730P1": { title: "Ikebukuro Anime and Game Culture Experience Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "100234P15": { title: "Full-Day Akihabara Anime and Manga Tour with Food and Drinks", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Photography Tours in Tokyo (first 4 = top picks)
  "387479P2": { title: "1h On-Location Shooting Service: Keep Your Memories in Pictures", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "411983P2": { title: "Edgy Unique Portraits by Pro Tokyo Photographer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "113473P3": { title: "Travel Tokyo with Your Own Personal Photographer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5571237P1": { title: "Beautiful Kimono Photoshoot in Tokyo (Includes Kimono Rental)", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5600128P1": { title: "Street Photoshoot at Tokyo Iconic Spots with Pro Photographer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "478377P1": { title: "Harajuku Kimono Shibui", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "438096P1": { title: "Tokyo Tour and Photoshoot Experience", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "486024P2": { title: "Tokyo Asakusa Rental Kimono Experience", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "92136P233": { title: "Tokyo Full-Day Instagram Highlights Private Tour with Nationally Licensed Guide", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "387479P33": { title: "Snap Photo Shoot in Tokyo: Aesthetic Photoshoot with Your Phone", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Transfers in Tokyo (first 4 = top picks)
  "5539078P1": { title: "Haneda Airport (HND) Private Transfer to/from Tokyo City", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "405101P97": { title: "Tokyo City Private Departure Transfers to Haneda Airport (HND)", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "103893P3": { title: "Private Arrival Transfer from Narita Airport (NRT) to Central Tokyo", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5498004P31": { title: "Disneyland or DisneySea Transfer to/from Tokyo with English Driver", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "405101P96": { title: "Itami Airport Private Arrival Transfers to Osaka City", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5514894P34": { title: "Tokyo Hotel Private Transfer to/from Disneyland or DisneySea", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "405101P33": { title: "Tokyo City Private Departure Transfers to Yokohama Port", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "128285P3257": { title: "Private Transfer from Tokyo Hotels to Tokyo Cruise Port", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "236027P12": { title: "Transfer from Yokohama to Haneda Airport (HND) by Private Car", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "128285P3256": { title: "Private Transfer from Tokyo Port to Narita International Airport (NRT)", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Cruises & River Tours in Tokyo (first 4 = top picks)
  "185570P10": { title: "Tokyo Day Time and Sunset Boat Cruise", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "2142TYO_F800_F820": { title: "Mt. Fuji, Lake Ashi, and Bullet Train Day Trip from Tokyo", fromPriceDisplay: "From $148.75 per person", rating: 4.2, reviewCount: 7460, imageUrl: "https://dynamic-media.tacdn.com/media/photo-o/2e/c8/81/de/caption.jpg?w=1400&h=1000&s=1" },
  "242747P122": { title: "Tokyo Bay Afternoon Cruise with Tea Time and the Symphony", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5546930P9": { title: "Tokyo Sunset Boat Party with Music, Drinks, and Vibes", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "475203P4": { title: "Tokyo Cruise with Japanese Show, Meal, and Tokyo Tower Ticket", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "467897P1": { title: "Tokyo Spectacular View Cruising: 90-Minute Sightseeing", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "90714P48": { title: "Mt. Fuji 5th Station, Owakudani, Ropeway, Pirate Ship, and Outlet Shopping", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "2142TYO_F880_F830": { title: "Mt. Fuji Day Trip including Lake Ashi Sightseeing Cruise from Tokyo", fromPriceDisplay: "From $121.88 per person", rating: 4, reviewCount: 1288, imageUrl: "https://dynamic-media.tacdn.com/media/photo-o/2e/c0/ac/76/caption.jpg?w=1100&h=800&s=1" },
  "475203P12": { title: "Tokyo Bay Cruise: Yakatabune with Japan Dance and Free Drinks", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "475203P15": { title: "Tokyo Yakatabune Day Cruise with Kimono Dance, Meal (Optional), and Drinks", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Cherry Blossom Tours in Tokyo (first 4 = top picks)
  "297993P2": { title: "Cherry Blossom Tour in Tokyo", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "133677P10": { title: "Licensed Guide: Tokyo Meguro Cherry Blossom Walking Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "438480P11": { title: "Tokyo Cherry Blossom Half-Day Tour with a Local Sakura Expert", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "30791P459": { title: "Cherry Blossom Secrets: Sakura in Tokyo", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "412164P83": { title: "Private Cherry Blossom Photoshoot in Yoyogi Park", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5497662P3": { title: "Cherry Blossom Season: Tokyo Sakura Picnic in Yoyogi Park", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "485648P3": { title: "Conquer Tokyo's Best Cherry Blossom Spots in One Day", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "438480P16": { title: "Kamakura Cherry Blossom Full-Day Tour with a Local Expert Guide", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "235563P16": { title: "Private Osaka Tour with English-Speaking Driver (Up to 6 Travelers)", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5575721P14": { title: "Private Chartered Tour to Mt. Fuji or Hakone with English-Speaking Driver", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Theme Park & Museum Tickets in Tokyo (first 4 = top picks)
  "13441P127": { title: "Disneyland or DisneySea 1-Day Passport and Private Transfer from Tokyo", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5571523P10": { title: "VIP Tokyo Disneyland Day Trip: Private Car and Local Expert Guide", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5570267P17": { title: "Tokyo Guided Tour: teamLab Planets and Toyosu Fish Market", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "242747P78": { title: "Tokyo Warner Bros. Studio Tour: The Making of Harry Potter – Ticket", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5514894P44": { title: "Mt. Fuji and Hakone: Five Must-Visit Spots Day Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5514894P6": { title: "N Seoul Tower and Love Lock Ticket Package", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "366941P143": { title: "Madame Tussauds Tokyo – Admission Ticket", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "121570P1": { title: "Tokyo Fuji Art Museum: Special Ticket – Leonard Foujita", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "366941P118": { title: "LEGOLAND Discovery Center Tokyo, Japan – Ticket", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "27666P84": { title: "Sumo Tournament Experience in Tokyo", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Workshops & Hands-On Classes in Tokyo (first 4 = top picks)
  "465886P35": { title: "Tokyo Shinjuku Chopsticks Making Experience Workshop", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "465886P43": { title: "Tokyo Asakusa Kintsugi Gold Repair Workshop", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "209829P1": { title: "Samurai Theater Tokyo", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "445447P25": { title: "Popular Sushi Making Class in Asakusa", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5523026P31": { title: "Tokyo Chopstick Making Workshop with Artisan", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "465886P46": { title: "Asakusa Traditional Japanese Knife Making Workshop", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "13441P60": { title: "Kintsugi Experience in Tokyo", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5558402P1": { title: "Asakusa Tea Ceremony Matcha Experience (Near Skytree)", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "434142P2": { title: "Authentic Ramen Making Experience in Kabukicho", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5524798P3": { title: "Forge Your Own Knife in Asakusa", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
};

/** JPY→USD rate for normalizing generated JSON that may have stored JPY as dollar amount (e.g. 13000 → 87). */
const JPY_TO_USD = 150;

/**
 * If fromPriceDisplay looks like a JPY value stored as USD (e.g. "Price from $13000 USD"), convert to actual USD.
 */
function normalizePriceDisplay(display: string): string {
  const m = display.match(/Price from \$(\d+) USD/);
  if (!m) return display;
  const amount = parseInt(m[1], 10);
  if (amount >= 2000) return `Price from $${Math.round(amount / JPY_TO_USD)} USD`;
  return display;
}

/**
 * Returns static product summaries for the given product codes and category.
 * Used when the Viator API returns no data so production shows the same cards as localhost.
 * Builds productUrl: internal link when we have a listing; else Viator product URL from dump (productUrl) or category URL.
 */
export function getStaticProductSummaries(
  productCodes: string[],
  categorySlug: string
): ViatorProductSummary[] {
  const out: ViatorProductSummary[] = [];
  const categoryBookUrl = getCategoryBookUrl(categorySlug);
  for (const code of productCodes) {
    const generated = generatedByCode[code];
    const fallback = staticByCode[code];
    const data = generated ?? fallback;
    if (!data) continue;
    const listing = getListingByProductCode(categorySlug, code);
    const title = listing?.seoTitle ?? data.title;
    const productUrl = listing
      ? `/${categorySlug}/${listing.slug}`
      : getViatorProductBookUrl(code);
    // Use fallback image when primary data has no image (e.g. dump script didn't return imageUrl for this product)
    const imageUrl = data.imageUrl ?? fallback?.imageUrl ?? null;
    out.push({
      productCode: code,
      title,
      productUrl,
      fromPriceDisplay: normalizePriceDisplay(data.fromPriceDisplay),
      reviewCount: data.reviewCount,
      rating: data.rating,
      imageUrl,
      freeCancellation: data.freeCancellation ?? false,
    });
  }
  return out;
}
