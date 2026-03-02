/**
 * Per-tour listing data for the catamaran category (Option A).
 * Each of the 10 tours gets: slug, angle (sub-category/positioning), and SEO-rich content.
 *
 * Workflow:
 * 1. Run: node scripts/fetch-all-10-catamaran.mjs — review titles and descriptions.
 * 2. Assign each tour an "angle" (e.g. "Best for families", "Luxury lagoon sail", "Snorkeling focus").
 * 3. Choose a URL slug (short, readable, unique).
 * 4. Fill in metaDescription, intro, and optional sections for maximum SEO.
 */
export interface TourListing {
  /** URL slug (e.g. "jolly-pirate-afternoon-sail") — used in /catamaran-cruises-in-tokyo/[slug] */
  slug: string;
  /** Viator product code — must match pillarProducts for this pillar */
  productCode: string;
  /** Operator / supplier name (e.g. "Red Sail Sports - Aruba") */
  operator: string;
  /** Positioning label shown on category page and listing (e.g. "Best for families", "Luxury option") */
  angle: string;
  /** Optional: override Viator title for H1 and meta (otherwise use API title) */
  seoTitle?: string;
  /** Meta description (155–160 chars ideal) */
  metaDescription: string;
  /** First paragraph(s) — unique, keyword-rich intro (avoid duplicate with Viator description) */
  intro: string;
  /** Optional: "Why we recommend this tour" — 2–4 short paragraphs or bullets */
  whyWeRecommend?: string | string[];
  /** Optional: who this tour is best for */
  whoIsThisFor?: string | string[];
  /** Optional: key highlights (bullets) */
  highlights?: string[];
  /** Optional: tour-specific FAQs */
  faqs?: { question: string; answer: string }[];
  /** Optional: "Best for" bullets for semantic relevance (not the page identity) */
  bestFor?: string[];
  /** Optional: what's included (from Viator or copy); shown as bullet list */
  inclusions?: string[];
  /** Optional: itinerary steps — each item can be a stop name + description */
  itinerary?: { stop: string; description: string }[];
}

/** Category slug this listing belongs to (for routing and breadcrumbs) */
export const catamaranCategorySlug = "catamaran-cruises-in-tokyo";

/** Category slugs that have tour listing pages (for routing) */
export const categorySlugsWithListings: string[] = [catamaranCategorySlug];

/** Resolve a tour listing by category and tour slug; returns null if not found */
export function getTourListing(categorySlug: string, tourSlug: string): TourListing | null {
  if (categorySlug !== catamaranCategorySlug) return null;
  const listing = catamaranListings.find((l) => l.slug === tourSlug) ?? null;
  return listing;
}

/** All tour listings for a category (for generateStaticParams) */
export function getTourListingsByCategory(categorySlug: string): TourListing[] {
  if (categorySlug !== catamaranCategorySlug) return [];
  return catamaranListings;
}

/** Get listing by category + product code (for pillar cards: link to internal page when we have one) */
export function getListingByProductCode(categorySlug: string, productCode: string): TourListing | null {
  if (categorySlug !== catamaranCategorySlug) return null;
  return catamaranListings.find((l) => l.productCode === productCode) ?? null;
}

/**
 * All 10 catamaran tour listings. Match productCode order to pillarProducts for consistency.
 * Fill angle + content after reviewing scripts/catamaran-10-tours-summary.json (run fetch-all-10-catamaran.mjs).
 */
export const catamaranListings: TourListing[] = [
  {
    slug: "dolphin-catamaran-snorkel-open-bar",
    productCode: "119085P1",
    operator: "Delphi Watersports",
    seoTitle: "Dolphin Catamaran Snorkel and Sail with Open Bar",
    angle: "Open bar & two snorkel stops (Antilla + Boca Catalina)",
    metaDescription: "Dolphin catamaran snorkel and sail in Aruba with open bar, Antilla wreck and Boca Catalina reef. Snacks, gear & water slide included. Book with free cancellation.",
    intro: "The Dolphin catamaran snorkel and sail is one of Aruba’s most popular half-day trips: two snorkel stops at the Antilla shipwreck and Boca Catalina, plus open bar, snacks, and a water slide. Ideal if you want a packed 3-hour experience with minimal hassle.",
    bestFor: [
      "Families with teens who want snorkeling and fun (water slide, rope swing)",
      "Groups looking for a lively atmosphere and open bar",
      "First-time snorkelers (gear and instruction included)",
      "Travelers who want the Antilla wreck and Boca Catalina in one 3-hour trip",
    ],
    inclusions: [
      "Spinning water slide",
      "Unlimited drinks (open bar)",
      "Wraps & tropical fruit",
      "Use of snorkelling equipment",
      "Rope swing",
      "Local guide",
      "All fees and taxes",
      "Access to restrooms",
    ],
    faqs: [
      {
        question: "How long is the Dolphin catamaran snorkel and sail?",
        answer: "The tour lasts about 3 hours, including two snorkel stops at the Antilla shipwreck and Boca Catalina reef, plus time for the water slide and rope swing.",
      },
      {
        question: "Is food and drink included on the Dolphin catamaran?",
        answer: "Yes. The tour includes an open bar (unlimited drinks) and snacks such as tuna or chicken wraps and tropical fruit. All fees and taxes are included.",
      },
      {
        question: "Where does the Dolphin catamaran depart from?",
        answer: "Delphi Watersports operates from in front of the Hyatt Regency towel hut on the beach. Check your confirmation for the exact meeting point and time.",
      },
      {
        question: "Do I need to know how to snorkel?",
        answer: "No. The friendly crew will teach you to snorkel if needed. Snorkelling equipment is provided, and you can also enjoy the water slide and rope swing without snorkelling.",
      },
      {
        question: "Can I book the Dolphin catamaran with free cancellation?",
        answer: "Booking terms depend on the operator and date. Check the booking page for the latest cancellation policy; many Aruba catamaran tours offer free cancellation when you book in advance.",
      },
    ],
    itinerary: [
      {
        stop: "Delphi Watersports (Hyatt Regency)",
        description: "Check in at Delphi Watersports in front of the Hyatt Regency towel hut on the beach. Meet your crew, then board the Dolphin catamaran for a 3-hour adventure to two of Aruba’s top snorkel spots, with open bar, snacks, and a water slide on board.",
      },
      {
        stop: "SS Antilla Shipwreck",
        description: "Sail for about 20 minutes to the Antilla, one of the Caribbean’s largest wrecks. This WWII German freighter rests in shallow waters and is packed with marine life. Spend roughly 45 minutes snorkelling around the hull—the crew will guide you and provide instruction if needed.",
      },
      {
        stop: "Boca Catalina",
        description: "Cruise to the shallow reef at Boca Catalina for your second snorkel stop. Spot colourful fish and coral in calm, clear water. After about 40 minutes, the crew calls everyone back for the rope swing, water slide, light lunch, and open bar before sailing back to Palm Beach.",
      },
    ],
  },
  {
    slug: "half-day-snorkel-sail-caribbean-lunch",
    productCode: "2785MORSNORKEL",
    operator: "Red Sail Sports - Aruba",
    seoTitle: "Half-Day Snorkel Sail Tour with Caribbean Lunch",
    angle: "Half-day sail with Caribbean lunch & three snorkel stops",
    metaDescription: "Half-day catamaran snorkel sail in Aruba with Caribbean lunch buffet, open bar, and three stops: Antilla wreck, Catalina Bay, Malmok. Red Sail Sports. Book online.",
    intro: "Explore the SS Antilla, one of the Caribbean’s largest shipwrecks, on this half-day snorkeling cruise. Board a luxury catamaran and sail to three top spots—Catalina Bay, the Antilla wreck, and Malmok Reef—teeming with parrotfish, angelfish, stingrays, and colourful coral. A Caribbean lunch buffet and open bar are served on board, and the crew provides snorkel instruction and equipment. Hotel pickup is available for an extra fee.",
    highlights: [
      "Half-day cruise with lunch and snorkeling",
      "Snorkel the SS Antilla wreck in Catalina Bay",
      "Wide variety of tropical fish and marine life",
      "Optional hotel transportation (extra cost)",
    ],
    bestFor: [
      "Guests who want a full half-day on the water (4 hours)",
      "Snorkelers who want three different sites in one trip",
      "Anyone who wants a Caribbean lunch buffet and open bar included",
      "Groups and families looking for a reliable, well-run catamaran",
    ],
    inclusions: [
      "Luxury catamaran sail",
      "3 snorkel stops (Antilla wreck, Catalina Bay, Malmok Reef)",
      "Caribbean lunch buffet",
      "Open bar",
      "Morning snack",
      "Snorkel equipment and instruction (on request)",
      "Gratuities",
      "Hotel pickup (optional, extra cost—contact operator after booking)",
    ],
    itinerary: [
      {
        stop: "Piet's Pier Bar",
        description: "Board one of Red Sail’s luxury catamarans for a half-day exploring Aruba’s underwater world. You’ll visit three snorkel spots—Boca Catalina, the Antilla shipwreck, and Malmok—plus enjoy a Caribbean lunch buffet and open bar on board. The crew offers tropical music, storytelling, and a watchful eye for empty glasses.",
      },
      {
        stop: "Boca Catalina",
        description: "Your first snorkel stop is shallow Catalina Bay, ideal for beginners. Use the swimming ladder or waterslide to enter the water, practise with the gear (instruction provided), and spot colourful fish and young coral before heading to the Antilla wreck.",
      },
      {
        stop: "SS Antilla Shipwreck",
        description: "Dive into crystal-clear waters around the Antilla, among the Caribbean’s largest wrecks. This WWII German freighter rests mostly intact, surrounded by sea anemones, tube sponges, and coral. Expect parrotfish, angelfish, southern stingrays, yellowtail snapper, queen flounder, and trumpet fish.",
      },
      {
        stop: "Malmok Reef",
        description: "Explore Malmok’s vibrant reef, known for clear water and colourful marine life. Swim among tropical fish and coral formations in another of Aruba’s top snorkel spots before sailing back to shore.",
      },
    ],
    faqs: [
      { question: "How long is the half-day snorkel sail?", answer: "The tour is about 4 hours, with three snorkel stops at the Antilla shipwreck, Catalina Bay, and Malmok Bay, plus a Caribbean lunch buffet and open bar." },
      { question: "Is lunch included?", answer: "Yes. A Caribbean-inspired lunch buffet and open bar with cocktails, sodas, and juices are included." },
      { question: "Do I need my own snorkel gear?", answer: "No. Snorkel equipment and instruction (on request) are provided. A morning snack is also included." },
      { question: "Who operates this tour?", answer: "Red Sail Sports – Aruba runs this half-day catamaran sail. Check your confirmation for departure point and time." },
    ],
  },
  {
    slug: "luxury-lagoon-cruise-chef-cocktails",
    productCode: "6593P7",
    operator: "Pelican Aruba",
    angle: "Luxury option — onboard chef & signature cocktails",
    metaDescription: "Luxury lagoon cruise in Aruba with onboard chef, grilled lunch, signature cocktails and kayaks. Teak schooner along the south coast. Pelican Aruba. Book now.",
    intro: "The Luxury Lagoon Cruise stands out with an onboard chef grilling lunch, hand-crafted cocktails, and a teak schooner along Aruba’s south coast. Add snorkeling, kayaking, or rope swinging. Ideal for couples and small groups who want a premium, relaxed sail.",
    bestFor: [
      "Couples and small groups wanting a premium sail",
      "Travelers who want an onboard chef and grilled lunch",
      "Anyone who enjoys kayaking, snorkeling, or rope swinging in one trip",
      "Guests looking for hand-crafted cocktails and a teak schooner",
    ],
    inclusions: [
      "Buffet lunch (grilled on board by chef)",
      "Kayak",
      "Unlimited drinks (open bar)",
      "Professional guide",
      "All taxes, fees and handling charges",
      "Rope swinging",
      "Use of snorkelling equipment",
      "Light breakfast / fruits pinchos / olive & cheese",
      "Glass of Champagne",
    ],
    faqs: [
      { question: "What makes the Luxury Lagoon Cruise different?", answer: "Pelican Aruba’s Luxury Lagoon Cruise features an onboard chef who grills lunch on sight, hand-crafted cocktails, and a teak schooner along Aruba’s south coast. You can also kayak, snorkel, or use the rope swing." },
      { question: "Is food and drink included?", answer: "Yes. The tour includes a light breakfast (fruits, pinchos, olive & cheese), a buffet lunch grilled by the chef, Champagne, and unlimited drinks (open bar)." },
      { question: "Can I kayak on this tour?", answer: "Yes. Kayaks are available as part of the experience, along with snorkelling equipment and rope swinging." },
      { question: "Where does the cruise sail?", answer: "The teak schooner cruises along Aruba’s southern coast. Check your booking for the exact departure point." },
    ],
    itinerary: [
      {
        stop: "Departure",
        description: "Board the teak schooner and set sail along Aruba’s southern coast. Enjoy a light breakfast—fruits, pinchos, olive and cheese—with a glass of Champagne and cool refreshments from the bar. Find a lounge, soak up the sun, or try the rope swing.",
      },
      {
        stop: "Spanish Lagoon",
        description: "Cruise past the picturesque Spanish Lagoon and Aruba’s coastline. Take in the views while your onboard chef grills lunch. Opt for a swim, guided snorkel, or kayak exploration. Hand-crafted cocktails and Caribbean music set the mood.",
      },
      {
        stop: "Lunch & Return",
        description: "Savour the freshly grilled buffet lunch as you sail. Relax on deck, enjoy another round from the open bar, and soak in the scenery before returning to the marina.",
      },
    ],
  },
  {
    slug: "arusun-catamaran-sail-snorkeling",
    productCode: "8936P1",
    operator: "Aruba Watersports Center",
    seoTitle: "Arusun Catamaran Sail with Snorkeling in Aruba",
    angle: "Short & sweet 2.5-hour sail on a 65-foot catamaran",
    metaDescription: "Arusun catamaran sail and snorkeling in Aruba — 2.5 hours on a 65-foot catamaran with open bar and snorkel gear. Aruba Watersports Center. Book with free cancellation.",
    intro: "The Arusun is a 65-foot catamaran offering a compact 2.5-hour sail with snorkeling and open bar. No long day required: you get clear water, marine life, and a relaxed vibe in one short trip. Great for first-timers and anyone with a busy schedule.",
    bestFor: [
      "First-timers who want a short, low-commitment sail",
      "Anyone with a busy schedule (only 2.5 hours)",
      "Travelers who want open bar and snorkeling without a full-day trip",
      "Guests who prefer a smaller, relaxed catamaran experience",
    ],
    inclusions: [
      "Snacks",
      "Use of snorkelling equipment",
      "Unlimited open bar (whisky, rum, vodka, juices, soda, water)",
    ],
    faqs: [
      { question: "How long is the Arusun catamaran sail?", answer: "The Arusun sail lasts about 2.5 hours, including time for snorkeling and enjoying the open bar. It’s one of the shorter catamaran options in Aruba." },
      { question: "What is included on the Arusun?", answer: "The tour includes snacks, use of snorkelling equipment, and an unlimited open bar (whisky, rum, vodka, juices, soda, and water)." },
      { question: "Where does the Arusun depart from?", answer: "The Arusun is operated by Aruba Watersports Center. Your confirmation will include the exact departure location and check-in time." },
      { question: "Is the Arusun good for beginners?", answer: "Yes. The 2.5-hour length and relaxed vibe make it a good fit for first-timers and anyone who doesn’t want a long day on the water." },
    ],
    itinerary: [
      {
        stop: "Aruba Watersports Center",
        description: "Check in at the desk, then take a short zodiac ride from the pier to the Arusun, a 65-foot catamaran built for sailing. The captain welcomes you, gives a safety briefing, and hoists the sails. The first mate is ready to serve drinks from the open bar.",
      },
      {
        stop: "Snorkel Stops",
        description: "Sail to two of Aruba’s best snorkel spots—typically the Antilla shipwreck and Boca Catalina Bay. The Arusun’s marine nets, bar, and shaded seating make for a relaxed ride. Gear and instruction are included for first-timers.",
      },
      {
        stop: "Return Sail",
        description: "Enjoy snacks and unlimited drinks from the open bar as you sail back along the coast. The compact 2.5-hour format leaves plenty of time for the rest of your day.",
      },
    ],
  },
  {
    slug: "tropical-sailing-bbq-lunch-dinner",
    productCode: "444239P8",
    operator: "Tropical Sailing Aruba",
    seoTitle: "Tropical Sailing Experience with BBQ Lunch or BBQ Dinner in Aruba",
    angle: "Tropical sail with BBQ lunch or dinner & sunset option",
    metaDescription: "Tropical sailing experience in Aruba with BBQ lunch or dinner, snorkeling at Mangel Halto, and sunset sail option. Premium open bar. Tropical Sailing Aruba.",
    intro: "Tropical Sailing Aruba runs morning and afternoon sails from Varadero Marina, with a BBQ lunch or early dinner at Mangel Halto and snorkeling. Choose an afternoon slot for a sunset sail. A good fit if you want a full meal on the water and a flexible schedule.",
    bestFor: [
      "Travelers who want a full BBQ meal (lunch or dinner) on the water",
      "Anyone who wants a sunset sail option",
      "Guests who prefer vegan, vegetarian, pescatarian or gluten-free options (ask when booking)",
      "Snorkelers who want to explore Mangel Halto Reef",
    ],
    inclusions: [
      "Premium open bar",
      "Use of snorkelling equipment",
      "BBQ lunch (morning sail) or BBQ dinner (afternoon sail)",
      "Vegan, vegetarian, pescatarian and gluten-free options (on request)",
    ],
    faqs: [
      { question: "Can I do a sunset sail?", answer: "Yes. Tropical Sailing Aruba offers afternoon sails that can include a sunset; the afternoon sail includes a BBQ dinner. Morning sails include a BBQ lunch." },
      { question: "Where does the Tropical Sailing experience depart?", answer: "The tour departs from Varadero Marina Aruba. You’ll cruise past Spanish Lagoon and the Aruba Desalination Plant before snorkeling at Mangel Halto Reef." },
      { question: "Is there a vegetarian or vegan option?", answer: "Yes. Ask for vegan, vegetarian, pescatarian, and gluten-free options when booking or at check-in." },
      { question: "What is included?", answer: "The tour includes a premium open bar, snorkelling equipment, and a BBQ lunch (morning) or BBQ dinner (afternoon sail)." },
    ],
    itinerary: [
      {
        stop: "Varadero Marina",
        description: "Optional hotel pickup brings you to Varadero Aruba Marina & Boatyard. Board the sailboat and set off for a 4-hour experience along Aruba’s south coast. Morning sails include BBQ lunch; afternoon sails include BBQ dinner and a sunset view.",
      },
      {
        stop: "Spanish Lagoon & Flamingo Island",
        description: "Cruise past the Spanish Lagoon and the iconic Flamingo Island. Enjoy the views, premium open bar, and the Caribbean sky reflected in the clear water. Vegan, vegetarian, pescatarian, and gluten-free options are available on request.",
      },
      {
        stop: "Mangel Halto Reef",
        description: "Drop anchor at Mangel Halto Reef for snorkelling among colourful fish and coral. Spend about an hour exploring the underwater gardens, then enjoy your BBQ meal on board before sailing back to the marina.",
      },
    ],
  },
  {
    slug: "premium-catamaran-morning-brunch-mimosas",
    productCode: "47607P3",
    operator: "Octopus Snorkeling, Sailing & Sunset Tours",
    seoTitle: "Premium Catamaran Morning Sail: Snorkeling, Mimosas and Brunch",
    angle: "Morning brunch & mimosas sail",
    metaDescription: "Premium catamaran morning sail in Aruba with brunch, mimosas and two snorkel stops. Intimate group, cushioned seating, open bar. Octopus Aruba. Book online.",
    intro: "Start the day with Octopus’s morning sail: brunch-style appetizers, mimosas, and two snorkel stops. Small group, cushioned seats, and drinks brought to you. Best for guests who prefer a relaxed morning on the water with food and snorkeling included.",
    bestFor: [
      "Guests who want a morning sail with brunch and mimosas",
      "Small groups (up to 34) who want cushioned seating and service to your seat",
      "Snorkelers who want two top spots without a long day",
      "Anyone who wants an Octopus Aruba souvenir included",
    ],
    inclusions: [
      "Breakfast / brunch appetizers",
      "Unlimited drinks (open cocktail bar, including mimosas)",
      "Use of snorkel equipment and instruction",
      "Octopus souvenir",
      "Safety life jackets",
      "Certified first responder, captain and crew",
      "Access to restroom on board",
    ],
    faqs: [
      { question: "What is included on the Octopus morning sail?", answer: "The tour includes brunch-style appetizers, mimosas, unlimited drinks from the open bar, snorkel equipment and instruction, and an Octopus Aruba souvenir. Drinks are brought to your seat." },
      { question: "How many people are on the boat?", answer: "Octopus limits the group to about 34 guests, with cushioned lounge seats and unobstructed sea views. There’s no need to queue at the bar—the crew serves drinks to you." },
      { question: "Do I get a souvenir?", answer: "Yes. Each guest receives a high-quality Octopus Aruba souvenir as a keepsake." },
      { question: "Where does the morning sail go?", answer: "The catamaran visits two of Aruba’s best snorkel spots. Check your confirmation for the exact departure point and times." },
    ],
    itinerary: [
      {
        stop: "SS Antilla Shipwreck",
        description: "Set sail with brunch appetizers and mimosas. Your first stop is the famous Antilla wreck—a 400-foot WWII German freighter that sank over 60 years ago and remains largely intact. Spend about 45 minutes snorkelling with angelfish, parrotfish, and tropical species around the hull. The crew guides and assists beginners.",
      },
      {
        stop: "Catalina Bay",
        description: "Sail to the shallow waters of Catalina Bay for your second snorkel stop. Spot angelfish, damselfish, octopuses, sea fans, and coral in calm, clear water. The crew works with new snorkelers for a safe, enjoyable experience. About 45 minutes here.",
      },
      {
        stop: "Coastal Sail & Return",
        description: "Relax with drinks brought to your seat as you sail along Aruba’s coastline. Enjoy the Caribbean views before returning to the marina. Each guest receives an Octopus Aruba souvenir.",
      },
    ],
  },
  {
    slug: "premium-catamaran-afternoon-sail-lunch",
    productCode: "47607P2",
    operator: "Octopus Snorkeling, Sailing & Sunset Tours",
    seoTitle: "Premium Catamaran Afternoon Sail: Snorkeling and Lunch",
    angle: "Afternoon sail with lunch & intimate group size",
    metaDescription: "Premium catamaran afternoon sail in Aruba with lunch, open bar and two snorkel stops. Cushioned seats, 34 guests max. Octopus Aruba. Free cancellation.",
    intro: "Octopus’s afternoon sail combines lunch appetizers, open bar, and two snorkel stops with cushioned seating and a small group (up to 34). Drinks are served to your seat. Ideal for those who want an afternoon trip with comfort and no rush.",
    bestFor: [
      "Guests who prefer an afternoon sail with lunch",
      "Small groups who want cushioned seats and drinks served to them",
      "Snorkelers who want two top spots with maximum comfort",
      "Anyone who wants an Octopus souvenir and a relaxed vibe",
    ],
    inclusions: [
      "Lunch appetizers",
      "Unlimited drinks (open cocktail bar)",
      "Use of snorkel equipment and instruction",
      "Octopus souvenir",
      "Safety life jackets",
      "Professional guide, certified first responder, captain and crew",
      "Access to restroom on board",
    ],
    faqs: [
      { question: "What is included on the Octopus afternoon sail?", answer: "The tour includes lunch appetizers, unlimited drinks from the open bar (including Aruba Arriba and spirits), snorkel equipment and instruction, and an Octopus Aruba souvenir. The crew brings drinks to your seat." },
      { question: "How big is the group?", answer: "The afternoon sail has an intimate group size of up to 34 guests, with cushioned lounge seats and no one sitting behind you." },
      { question: "Is lunch a full meal?", answer: "The tour includes lunch appetizers served to your seat. For a full buffet-style lunch, check Red Sail’s half-day sail; Octopus focuses on appetizers and open bar." },
      { question: "Can I cancel for free?", answer: "Many Octopus Aruba tours offer free cancellation when you book in advance. Check the booking page for the latest policy for your date." },
    ],
    itinerary: [
      {
        stop: "Coastal Sail",
        description: "Board Octopus’s catamaran and set sail with lunch appetizers and a toast. Cruise along Aruba’s coastline—warm, clear water, tropical fish, and coral set the scene. Drinks are served to your cushioned seat; no queuing at the bar.",
      },
      {
        stop: "Catalina Bay",
        description: "Your first snorkel stop is shallow Catalina Bay. Spot angelfish, damselfish, octopuses, sea fans, and coral. New to snorkelling? The crew will help you get comfortable. Spend about 45 minutes in the water.",
      },
      {
        stop: "SS Antilla Shipwreck",
        description: "Snorkel the famous Antilla wreck—a 400-foot WWII German freighter resting in crystal-clear water. Explore for about 45 minutes, then relax with drinks as you sail back. Each guest receives an Octopus souvenir.",
      },
    ],
  },
  {
    slug: "jolly-pirate-afternoon-sail-snorkeling",
    productCode: "37387P3",
    operator: "Jolly Pirates Sailing Cruises & Snorkeling",
    seoTitle: "Aruba Jolly Pirate Afternoon Sail with Snorkeling",
    angle: "Pirate schooner with rope swing & three snorkel sites",
    metaDescription: "Jolly Pirate afternoon sail and snorkel in Aruba on an 85-foot teak schooner. Three sites: Malmok, Boca Catalina, Antilla wreck. Open bar, rope swing. Book now.",
    intro: "Sail on Jolly Pirates’ 85-foot teak schooner to three sites: Malmok Reef, Boca Catalina, and the Antilla wreck. Snorkel at two and use the famous rope swing at the third. Open bar and shade on deck. A classic choice for families and groups who want a fun, themed sail.",
    bestFor: [
      "Families and groups who want a fun, themed pirate sail",
      "Anyone who wants the famous Jolly Pirates rope swing",
      "Snorkelers who want three sites (Malmok, Boca Catalina, Antilla) in one trip",
      "Guests who want shade, seating and open bar on a teak schooner",
    ],
    inclusions: [
      "Rope swing",
      "Unlimited drinks (open bar)",
      "Professional guide",
      "Use of snorkelling equipment",
      "Access to two restrooms on board",
    ],
    faqs: [
      { question: "What is the Jolly Pirate ship like?", answer: "Jolly Pirates use an 85-foot teak schooner with ample shade and seating under a large canopy by the bar, plus space to sunbathe on the teak deck. It’s one of Aruba’s most recognizable pirate-style sails." },
      { question: "How many snorkel sites do we visit?", answer: "The tour visits three sites: Malmok Reef, Boca Catalina, and the Antilla shipwreck. You can snorkel at two and use the rope swing at the third." },
      { question: "Is the rope swing included?", answer: "Yes. The ship’s rope swing is a highlight—you’ll have time to use it at one of the three stops. Snorkelling gear and open bar are also included." },
      { question: "Where does Jolly Pirates depart from?", answer: "Jolly Pirates Sailing Cruises & Snorkeling operates from a marina in Aruba. Your confirmation will include the exact pier and check-in time." },
    ],
    itinerary: [
      {
        stop: "Malmok Reef",
        description: "Board the 85-foot teak schooner at the marina. Sail to the first of three sites—Malmok Reef—known for clear water and colourful marine life. Snorkel, swim, or simply relax on the nets and deck.",
      },
      {
        stop: "Boca Catalina",
        description: "Cruise to Boca Catalina, a shallow bay ideal for snorkelling. Spot angelfish, parrotfish, and coral. You’ll visit two of the three sites for snorkelling and use the third for the famous rope swing.",
      },
      {
        stop: "Antilla Shipwreck & Rope Swing",
        description: "Head to the Antilla wreck—one of Aruba’s most famous snorkel spots—or save this stop for the rope swing. Channel your inner pirate as you swing into the Caribbean. Open bar, shade under the canopy, and plenty of teak deck space round out the afternoon.",
      },
    ],
  },
  {
    slug: "antilla-shipwreck-catalina-bay-snorkel-sail",
    productCode: "2785AFTSNORKEL",
    operator: "Red Sail Sports - Aruba",
    seoTitle: "Antilla Shipwreck and Catalina Bay Snorkel Sail",
    angle: "Antilla wreck & Catalina Bay snorkel sail",
    metaDescription: "Antilla shipwreck and Catalina Bay snorkel sail in Aruba. 3-hour catamaran cruise with Red Sail Sports. Sun, sailing and two top snorkel sites. Book with free cancellation.",
    intro: "This 3-hour Red Sail Sports cruise focuses on two of Aruba’s best snorkel sites: the Antilla shipwreck and Catalina Bay. A straightforward afternoon of sun, sailing, and snorkeling with no frills — perfect if you want to hit the highlights without a long day.",
    bestFor: [
      "Snorkelers who want to see the Antilla wreck and Catalina Bay in one trip",
      "Guests who want a 3-hour sail without a full half-day",
      "Anyone who wants open bar and bite-sized appetizers included",
      "Travelers looking for a simple, well-run two-stop itinerary",
    ],
    inclusions: [
      "Snorkelling equipment and instruction",
      "Open bar",
      "Luxury catamaran tour with 2 snorkel stops (Antilla, Catalina Bay)",
      "Bite-sized appetizers",
    ],
    faqs: [
      { question: "What snorkel sites does this tour visit?", answer: "The 3-hour cruise visits two sites: Catalina Bay (calm water, angelfish and colorful marine life) and the Antilla Shipwreck, one of Aruba’s most famous snorkel spots, with angelfish, yellowtail snapper, stingrays and morays around the WWII freighter." },
      { question: "How long is the tour?", answer: "The tour is about 3 hours, with two snorkel stops, open bar, and bite-sized appetizers on a luxury catamaran." },
      { question: "Is food and drink included?", answer: "Yes. The tour includes an open bar and bite-sized appetizers. For a full lunch buffet, see Red Sail’s half-day snorkel sail." },
      { question: "Who operates this sail?", answer: "Red Sail Sports – Aruba operates this catamaran snorkel sail. Check your booking for departure point and time." },
    ],
    itinerary: [
      {
        stop: "Boarding",
        description: "Board one of Red Sail’s luxury catamarans for a 3-hour afternoon cruise. Bite-sized appetizers and a fully stocked open bar await. You’ll visit two of Aruba’s best snorkel spots: the Antilla shipwreck and Boca Catalina.",
      },
      {
        stop: "Catalina Bay",
        description: "Your first stop is Catalina Bay—a small, sheltered bay off Aruba’s northwestern coast. Shallow, calm waters (about 15 feet deep) make it ideal for practising. Spot queen angelfish, blue parrotfish, damselfish, and coral. Instruction included.",
      },
      {
        stop: "SS Antilla Shipwreck",
        description: "Snorkel the Antilla wreck, a thriving artificial reef. Visibility is typically 30–50 feet. The wreck starts about 10 feet below the surface. Expect yellowtail snapper, butterfly fish, southern stingrays, green morays, barracudas, and schools of white grunts. Sail back to Palm Beach with drinks from the open bar.",
      },
    ],
  },
  {
    slug: "iconic-aruba-sail-snorkel-experience",
    productCode: "6593P8",
    operator: "Pelican Aruba",
    seoTitle: "Iconic Aruba Sail and Snorkel Experience",
    angle: "Classic sail & snorkel at marine sanctuary & Antilla",
    metaDescription: "Iconic Aruba sail and snorkel experience: catamaran to marine sanctuary, Catalina Bay and Antilla wreck. Pelican Aruba. Spacious boat, all gear included. Book online.",
    intro: "Pelican Aruba’s Iconic Sail and Snorkel takes you by catamaran to the marine sanctuary, Catalina Bay, and the Antilla wreck. Spacious boat, gear included, and a classic Aruba itinerary. Suits anyone looking for a reliable, well-run sail to the island’s most famous snorkel spots.",
    bestFor: [
      "Anyone who wants the classic Aruba snorkel itinerary (marine sanctuary, Catalina Bay, Antilla)",
      "Guests who prefer a spacious catamaran and professional guides",
      "Eco-conscious travelers (recognized by Sustainable Travel International)",
      "Snorkelers who want National Geographic–grade equipment",
    ],
    inclusions: [
      "Unlimited drinks (open bar)",
      "Alcoholic beverages",
      "Snacks",
      "Use of snorkelling equipment (National Geographic Snorkeling Equipment)",
      "Professional guides",
    ],
    faqs: [
      { question: "What makes the Iconic Sail and Snorkel sustainable?", answer: "Pelican Aruba’s Iconic experience is recognized by Sustainable Travel International. The tour uses National Geographic Snorkeling Equipment and follows responsible practices." },
      { question: "Which sites do we visit?", answer: "The catamaran sails to the marine sanctuary, Catalina Bay, and the famous Antilla shipwreck—three of Aruba’s top snorkel spots in one trip." },
      { question: "Is snorkel gear provided?", answer: "Yes. National Geographic Snorkeling Equipment is provided, along with professional guides, open bar, and snacks." },
      { question: "How long is the Iconic sail?", answer: "Check the booking page for current duration. The tour includes sailing time plus snorkeling at the marine sanctuary, Catalina Bay, and the Antilla wreck." },
    ],
    itinerary: [
      {
        stop: "Marine Sanctuary & Catalina Bay",
        description: "Board Pelican’s spacious catamaran and sail to the marine sanctuary and Catalina Bay. This tour is recognized by Sustainable Travel International and uses National Geographic Snorkeling Equipment. Spot colourful fish and coral in clear, protected waters.",
      },
      {
        stop: "SS Antilla Shipwreck",
        description: "Snorkel the famous Antilla shipwreck—one of Aruba’s best underwater sites. The WWII freighter is encrusted with coral and home to parrotfish, angelfish, stingrays, and more. Take memorable photos with the tropical fish; all equipment is included.",
      },
      {
        stop: "Return Sail",
        description: "Relax on deck with snacks and drinks from the open bar as you sail back. Professional guides ensure a smooth, enjoyable experience from start to finish.",
      },
    ],
  },
];
