export interface SubPage {
  label: string;
  href: string;
}

export interface Pillar {
  slug: string;
  title: string;
  description: string;
  subPages: SubPage[];
  relatedSlugs: string[];
  faqs: { question: string; answer: string }[];
  about?: string;
  insiderTips?: string[];
  whatToExpect?: string[];
  whoIsThisFor?: string | string[];
  highlights?: string[];
}

export const pillars: Pillar[] = [
  {
    slug: "walking-tours-in-tokyo",
    title: "Walking Tours in Tokyo",
    description:
      "Classic guided walking explorations of Tokyo's most iconic neighborhoods including Asakusa, Shibuya, Harajuku, Shinjuku, and historic Yanaka. Discover temples, hidden alleys, and local life on foot.",
    subPages: [
      { label: "Asakusa walking tours", href: "/walking-tours-in-tokyo/asakusa" },
      { label: "Shibuya & Harajuku tours", href: "/walking-tours-in-tokyo/shibuya-harajuku" },
      { label: "Shinjuku guided walks", href: "/walking-tours-in-tokyo/shinjuku" },
      { label: "Imperial Palace & historic Tokyo", href: "/walking-tours-in-tokyo/imperial-palace-historic" },
      { label: "Private & custom tours", href: "/walking-tours-in-tokyo/private-custom" },
      { label: "Food & bar walking experiences", href: "/walking-tours-in-tokyo/food-bar-experiences" },
    ],
    relatedSlugs: ["food-tours-in-tokyo", "transfers-in-tokyo", "photography-tours-in-tokyo"],
    about:
      "Walking tours are the best way to connect with Tokyo's neighborhoods. Local guides lead small groups through Asakusa's temple district, Shibuya's crossing and backstreets, Harajuku's youth culture, and historic areas like Yanaka. Most tours run 2–4 hours and cover history, culture, and hidden spots guidebooks miss. Choose morning or afternoon; some include food tastings or temple visits.",
    insiderTips: [
      "Book a few days ahead—popular neighborhoods like Asakusa and Harajuku fill quickly.",
      "Wear comfortable shoes; Tokyo walking tours cover 2–4 km with frequent stops.",
      "Morning tours often have fewer crowds; afternoon tours catch golden-hour light for photos.",
    ],
    whatToExpect: [
      "Meet your guide at a designated station or landmark.",
      "Walking at a relaxed pace with stops for stories, photos, and questions.",
      "Visit temples, shrines, backstreets, and local spots depending on the route.",
      "2–4 hours total; some tours include a short break or snack stop.",
    ],
    whoIsThisFor: [
      "First-time visitors who want orientation and context.",
      "Photographers looking for the best angles and local spots.",
      "Travelers who prefer small groups and local insights over bus tours.",
    ],
    highlights: [
      "Asakusa Senso-ji, Shibuya Crossing, Harajuku Takeshita-dori",
      "Local guides with neighborhood knowledge",
      "Small groups (usually under 10)",
      "2–4 hour options; morning and afternoon departures",
    ],
    faqs: [
      {
        question: "How long do Tokyo walking tours usually last?",
        answer: "Most Tokyo walking tours run 2–4 hours. Half-day options cover one or two neighborhoods in depth.",
      },
      {
        question: "Are Tokyo walking tours suitable for all fitness levels?",
        answer: "Yes. Tours move at a relaxed pace with frequent stops. Distances are typically 2–4 km. Check the tour description for any stairs or hills.",
      },
      {
        question: "What neighborhoods do Tokyo walking tours cover?",
        answer: "Popular areas include Asakusa, Shibuya, Harajuku, Shinjuku, Yanaka, and Ginza. Each tour focuses on one or two neighborhoods.",
      },
      {
        question: "Do walking tours include entrance fees to temples or attractions?",
        answer: "It varies. Some tours include temple or museum entry; others only cover the guide. Check the tour description for inclusions.",
      },
      {
        question: "What should I bring on a Tokyo walking tour?",
        answer: "Comfortable shoes, water, and weather-appropriate clothing. A hat and sunscreen are useful in summer. Your guide will advise if anything else is needed.",
      },
      {
        question: "Can I join a walking tour if I don't speak Japanese?",
        answer: "Yes. Most Tokyo walking tours are conducted in English or offer English-speaking guides. Book in advance to secure your preferred language.",
      },
    ],
  },
  {
    slug: "food-tours-in-tokyo",
    title: "Tokyo Food Tours",
    description:
      "Sushi tastings, izakaya crawls, market explorations, and local eatery experiences. Taste authentic Tokyo cuisine from Tsukiji and Toyosu to hidden izakayas in Shinjuku and Shibuya.",
    subPages: [
      { label: "Tsukiji & market tours", href: "/food-tours-in-tokyo/tsukiji-market" },
      { label: "Shinjuku food tours", href: "/food-tours-in-tokyo/shinjuku-food" },
      { label: "Izakaya crawls", href: "/food-tours-in-tokyo/izakaya-crawls" },
      { label: "Shinjuku bar hopping", href: "/food-tours-in-tokyo/shinjuku-bar-hopping" },
      { label: "Shibuya bar & food", href: "/food-tours-in-tokyo/shibuya-bar-food" },
      { label: "Night foodie tours", href: "/food-tours-in-tokyo/night-foodie-tours" },
    ],
    relatedSlugs: ["walking-tours-in-tokyo", "nightlife-bar-tours-in-tokyo", "transfers-in-tokyo"],
    about:
      "Tokyo food tours let you eat like a local. Options range from morning sushi and market tours at Tsukiji or Toyosu to evening izakaya crawls in Shinjuku, Shibuya, or Golden Gai. Ramen, gyoza, and street food tours cover casual favorites; upscale experiences focus on omakase and kaiseki. Most include multiple stops, with enough food for a full meal.",
    insiderTips: [
      "Book early—food tours have limited spots and sell out, especially for popular time slots.",
      "Come hungry; many tours replace a full meal. Dietary restrictions: mention when booking.",
      "Evening izakaya tours are best for groups; morning market tours suit early risers.",
    ],
    whatToExpect: [
      "Meet your guide at a train station or landmark.",
      "Walk to 3–5 food stops (market stalls, restaurants, izakayas).",
      "Tastings and small dishes at each stop; guide explains dishes and culture.",
      "2–4 hours total; enough food to replace a meal.",
    ],
    whoIsThisFor: [
      "Food lovers who want authentic Tokyo flavors beyond hotel restaurants.",
      "First-timers unsure where to eat; guides handle ordering and recommendations.",
      "Groups who want a fun, social dining experience.",
    ],
    highlights: [
      "Tsukiji/Toyosu market tours, sushi omakase, izakaya crawls",
      "Small groups; local guides who know the best spots",
      "2–4 hours; food included (enough for a meal)",
      "Vegetarian options on some tours—check when booking",
    ],
    faqs: [
      {
        question: "Is food included on Tokyo food tours?",
        answer: "Yes. Most tours include multiple tastings that add up to a full meal. Drinks may be included or available to purchase.",
      },
      {
        question: "Can vegetarians or vegans join Tokyo food tours?",
        answer: "Some tours offer vegetarian or vegan options. Contact the operator before booking to confirm.",
      },
      {
        question: "What's the difference between Tsukiji and Toyosu?",
        answer: "Tsukiji Outer Market still has shops and eateries; the famous tuna auction moved to Toyosu. Both offer excellent food tours.",
      },
      {
        question: "How many food stops are on a typical Tokyo food tour?",
        answer: "Most tours include 3–5 stops—market stalls, restaurants, or izakayas—with enough food to replace a meal.",
      },
      {
        question: "What time do Tokyo food tours start?",
        answer: "Market tours often start early (around 8–9 am). Izakaya and evening crawls typically start between 6–8 pm. Check your tour for the exact meeting time.",
      },
      {
        question: "Do I need to tip on Tokyo food tours?",
        answer: "Tipping is not customary in Japan. Your guide will appreciate a thank-you; extra payment is not expected.",
      },
    ],
  },
  {
    slug: "day-trips-from-tokyo",
    title: "Day Trips from Tokyo",
    description:
      "Escape the city with day trips to Mt. Fuji & Hakone, Kamakura & Enoshima, Nikko, Kawagoe, and more. Scenic railways, temples, onsens, and iconic views—all within easy reach of Tokyo.",
    subPages: [
      { label: "Mt. Fuji & Hakone", href: "/day-trips-from-tokyo/mt-fuji-hakone" },
      { label: "Mt. Fuji from Tokyo", href: "/day-trips-from-tokyo/mt-fuji-from-tokyo" },
      { label: "Private Mt. Fuji tours", href: "/day-trips-from-tokyo/private-mt-fuji" },
      { label: "Tokyo bus sightseeing", href: "/day-trips-from-tokyo/tokyo-bus-sightseeing" },
      { label: "Instagram-worthy Fuji", href: "/day-trips-from-tokyo/instagram-fuji" },
      { label: "Best day trips from Tokyo", href: "/day-trips-from-tokyo/best-day-trips-from-tokyo" },
    ],
    relatedSlugs: ["transfers-in-tokyo", "cruises-river-tours-in-tokyo", "photography-tours-in-tokyo"],
    about:
      "Tokyo is a gateway to Japan's best day-trip destinations. Mt. Fuji and Hakone offer views, onsens, and the Fuji Five Lakes. Kamakura and Enoshima combine temples, beaches, and coastal views. Nikko delivers shrines and waterfalls; Kawagoe feels like stepping back to Edo. Most tours include transport, guide, and key sights; some add lunch or optional activities.",
    insiderTips: [
      "Mt. Fuji visibility is best in winter and early morning; summer can be cloudy.",
      "Kamakura and Nikko get busy on weekends; weekday tours are often calmer.",
      "Hakone loop (train, cable car, boat) is a classic; book ahead for popular dates.",
    ],
    whatToExpect: [
      "Hotel or station pickup, or meet at a central Tokyo point.",
      "Coach or train transport to the destination (1–2 hours each way).",
      "Guided visits to temples, viewpoints, or attractions.",
      "6–10 hours total; some include lunch.",
    ],
    whoIsThisFor: [
      "Travelers who want to see Mt. Fuji, temples, or nature without overnight stays.",
      "First-timers who prefer organized transport and a fixed itinerary.",
      "Photographers and nature lovers.",
    ],
    highlights: [
      "Mt. Fuji viewpoints, Hakone loop, Kamakura temples, Nikko shrines",
      "Transport and guide included; some add lunch",
      "6–10 hour full-day tours",
      "Multiple destinations to choose from",
    ],
    faqs: [
      {
        question: "How far is Mt. Fuji from Tokyo?",
        answer: "About 2 hours by coach or train. Day trips typically include transport and key viewpoints.",
      },
      {
        question: "Can I see Mt. Fuji on a day trip?",
        answer: "Yes, weather permitting. Winter and early morning offer the best visibility. Tours go to viewing spots like Hakone and Fuji Five Lakes.",
      },
      {
        question: "Which day trip is best for temples?",
        answer: "Kamakura (Great Buddha, Hasedera) and Nikko (Toshogu Shrine) are top choices for temple and shrine experiences.",
      },
      {
        question: "Is lunch included on day trips from Tokyo?",
        answer: "Some tours include lunch; others leave time for you to buy food. Check the tour description for meal inclusions.",
      },
      {
        question: "What's the best day trip for first-time visitors?",
        answer: "Mt. Fuji and Hakone are very popular for iconic views and onsens. Kamakura is ideal for temples and the coast in a shorter trip.",
      },
      {
        question: "Do day trips include hotel pickup?",
        answer: "Many include pickup from central Tokyo hotels or a designated meeting point. Confirm pickup details when you book.",
      },
    ],
  },
  {
    slug: "private-tours-in-tokyo",
    title: "Private Tours in Tokyo",
    description:
      "Customized private tours for families, couples, and first-time travelers. Personal guides, flexible itineraries, and experiences tailored to your pace and interests.",
    subPages: [
      { label: "Private driver & car tours", href: "/private-tours-in-tokyo/private-driver-tours" },
      { label: "Private walking tours", href: "/private-tours-in-tokyo/private-walking-tours" },
      { label: "Private Fuji & Hakone", href: "/private-tours-in-tokyo/private-fuji-hakone" },
      { label: "Gardens & off-the-beaten-path", href: "/private-tours-in-tokyo/private-gardens-culture" },
      { label: "Half-day private tours", href: "/private-tours-in-tokyo/half-day-private" },
      { label: "Best private tours in Tokyo", href: "/private-tours-in-tokyo/best-private-tours-tokyo" },
    ],
    relatedSlugs: ["walking-tours-in-tokyo", "food-tours-in-tokyo", "transfers-in-tokyo"],
    about:
      "Private tours give you a dedicated guide and a schedule built around you. Perfect for families with kids, couples, or anyone who wants to go at their own pace. Guides adjust the route to your interests—more temples, more food, more shopping—and handle logistics like train tickets and reservations. Half-day and full-day options available.",
    insiderTips: [
      "Share interests and constraints when booking so your guide can tailor the day.",
      "Private tours often include pickup from your hotel; confirm when booking.",
      "Flexible itineraries mean you can add or skip stops as you go.",
    ],
    whatToExpect: [
      "Pickup at your hotel or a central meeting point.",
      "Guide with you for the full duration (half-day or full-day).",
      "Itinerary adapted to your interests and pace.",
      "Guides help with trains, ordering food, and local tips.",
    ],
    whoIsThisFor: [
      "Families who want a stress-free, kid-friendly day.",
      "Couples seeking a personalized, romantic experience.",
      "First-time visitors who want expert guidance and flexibility.",
    ],
    highlights: [
      "Dedicated guide; no shared groups",
      "Customizable itineraries (temples, food, shopping, culture)",
      "Hotel pickup available on many tours",
      "Half-day (4 hours) and full-day (6–8 hours) options",
    ],
    faqs: [
      {
        question: "How much do private Tokyo tours cost?",
        answer: "Prices vary by duration and group size. Half-day tours often start around $200–300 for a small group; full-day tours are higher.",
      },
      {
        question: "Can I customize the itinerary?",
        answer: "Yes. Share your interests when booking, and your guide will build a flexible plan. You can adjust on the day.",
      },
      {
        question: "Do private tours include transport?",
        answer: "Many include guide and itinerary; transport (trains, taxi) may be extra. Check the tour details when booking.",
      },
      {
        question: "How many people can join a private Tokyo tour?",
        answer: "Most private tours accommodate 1–6 people; some operators allow larger groups. Price may depend on group size.",
      },
      {
        question: "Can private tours accommodate accessibility needs?",
        answer: "Many guides can adjust routes and pace. Contact the operator before booking to discuss mobility or other needs.",
      },
      {
        question: "When should I book a private tour in Tokyo?",
        answer: "Booking at least a few days ahead is recommended. For peak seasons (cherry blossom, autumn leaves) book 1–2 weeks in advance.",
      },
    ],
  },
  {
    slug: "nightlife-bar-tours-in-tokyo",
    title: "Nightlife & Bar Tours in Tokyo",
    description:
      "Bar hopping in Shinjuku, Shibuya, and Golden Gai. Neon-lit food crawls, sake tastings, and local nightlife experiences led by guides who know the best spots.",
    subPages: [
      { label: "Shinjuku night tours", href: "/nightlife-bar-tours-in-tokyo/shinjuku-night-tours" },
      { label: "Kabukicho & hidden bars", href: "/nightlife-bar-tours-in-tokyo/kabukicho-hidden-bars" },
      { label: "Karaoke nights", href: "/nightlife-bar-tours-in-tokyo/karaoke-night-tokyo" },
      { label: "Sake & bar tours", href: "/nightlife-bar-tours-in-tokyo/sake-bar-tokyo" },
      { label: "Night drive experiences", href: "/nightlife-bar-tours-in-tokyo/night-drive-experiences" },
      { label: "Best nightlife & bar tours", href: "/nightlife-bar-tours-in-tokyo/best-nightlife-bar-tours" },
    ],
    relatedSlugs: ["food-tours-in-tokyo", "walking-tours-in-tokyo", "transfers-in-tokyo"],
    about:
      "Tokyo's nightlife is legendary—narrow alleys, tiny bars, neon signs, and a mix of salarymen, locals, and travelers. Bar tours and food crawls take you to Golden Gai's intimate bars, Shinjuku's maze-like streets, and Shibuya's lively spots. Guides help with ordering, explain local customs, and ensure you hit the best places. Most run 2–4 hours with 3–5 stops.",
    insiderTips: [
      "Evening start times (6–8 pm) are common; some tours include dinner-style bites.",
      "Golden Gai bars are small (6–10 seats); tours secure reservations.",
      "Cash is still preferred at many small bars; guides can help with ordering.",
    ],
    whatToExpect: [
      "Meet your guide at a Shinjuku or Shibuya station exit.",
      "Visit 3–5 bars or food spots; drinks and sometimes snacks included.",
      "Guidance on ordering, etiquette, and local culture.",
      "2–4 hours; evening start times.",
    ],
    whoIsThisFor: [
      "Travelers who want to experience Tokyo's famous nightlife safely.",
      "Solo visitors or small groups looking for a social evening.",
      "Anyone curious about Golden Gai, izakayas, and local drinking culture.",
    ],
    highlights: [
      "Golden Gai, Shinjuku, Shibuya bar crawls",
      "Local guides who know the best spots",
      "Drinks (and sometimes food) included",
      "2–4 hours; evening departures",
    ],
    faqs: [
      {
        question: "Are drinks included on Tokyo bar tours?",
        answer: "Most tours include drinks at 3–5 stops. Some add food; check the tour description for inclusions.",
      },
      {
        question: "What is Golden Gai?",
        answer: "A network of narrow alleys in Shinjuku with hundreds of tiny bars, each with its own character. A must-see for Tokyo nightlife.",
      },
      {
        question: "What's the legal drinking age in Japan?",
        answer: "20. You must be 20 or older to join bar tours and consume alcohol.",
      },
      {
        question: "How long do Tokyo bar tours last?",
        answer: "Most run 2–4 hours with 3–5 bar stops. Evening start times are typical (6–8 pm).",
      },
      {
        question: "Is Golden Gai safe for solo travelers?",
        answer: "Yes. Golden Gai is popular with tourists and locals. Joining a tour adds a guide and group; solo visits are also common.",
      },
      {
        question: "Do bar tours run every night?",
        answer: "Most operators run tours several nights a week. Book in advance to secure your preferred date and language.",
      },
    ],
  },
  {
    slug: "anime-pop-culture-tours-in-tokyo",
    title: "Anime & Pop Culture Tours in Tokyo",
    description:
      "Akihabara anime and gaming walks, manga shops, arcades, and themed cafes. Dive into Japan's pop culture scene with guides who share your passion.",
    subPages: [
      { label: "Akihabara anime tours", href: "/anime-pop-culture-tours-in-tokyo/akihabara-anime-tours" },
      { label: "Gaming & arcades", href: "/anime-pop-culture-tours-in-tokyo/anime-gaming-arcades" },
      { label: "Themed cafes & experiences", href: "/anime-pop-culture-tours-in-tokyo/themed-cafes-experiences" },
      { label: "Anime workshops", href: "/anime-pop-culture-tours-in-tokyo/anime-workshops" },
      { label: "Ikebukuro & full-day Akiba", href: "/anime-pop-culture-tours-in-tokyo/ikebukuro-full-day-akiba" },
      { label: "Best anime & pop culture tours", href: "/anime-pop-culture-tours-in-tokyo/best-anime-pop-culture" },
    ],
    relatedSlugs: ["photography-tours-in-tokyo", "walking-tours-in-tokyo", "theme-park-museum-tickets-in-tokyo"],
    about:
      "Tokyo is the heart of anime, manga, and gaming. Akihabara tours cover electronics, anime goods, manga stores, and arcades. Themed cafes (anime, character, maid) offer unique experiences. Guides help you find rare merchandise, navigate multi-floor buildings, and understand the culture. Perfect for fans and curious visitors alike.",
    insiderTips: [
      "Akihabara is dense—guides help you find the best shops without getting overwhelmed.",
      "Many arcades are cash-only; have yen ready.",
      "Themed cafes often have time limits and may require reservations.",
    ],
    whatToExpect: [
      "Meet in Akihabara or a nearby station.",
      "Visit anime shops, manga stores, arcades, and sometimes themed cafes.",
      "Guide explains culture, helps with recommendations, and navigates the district.",
      "2–4 hours; shopping at your own pace.",
    ],
    whoIsThisFor: [
      "Anime and manga fans who want to explore Akihabara with a local.",
      "Gamers interested in Japanese arcades and gaming culture.",
      "Anyone curious about Japan's pop culture scene.",
    ],
    highlights: [
      "Akihabara electronics, anime, manga, and gaming",
      "Themed cafes and character experiences",
      "Guides who share your interests",
      "2–4 hour tours; flexible for shopping",
    ],
    faqs: [
      {
        question: "What's in Akihabara?",
        answer: "Electronics, anime and manga shops, arcades, themed cafes, and otaku culture. It's Tokyo's main hub for pop culture.",
      },
      {
        question: "Do anime tours include shopping?",
        answer: "Yes. Most tours visit shops where you can browse and buy. Guides help with recommendations and locations.",
      },
      {
        question: "Are themed cafes included?",
        answer: "Some tours include a cafe stop; others focus on shops and arcades. Check the tour description for inclusions.",
      },
      {
        question: "How long do Akihabara tours last?",
        answer: "Most run 2–4 hours. You'll visit multiple stores and often an arcade or themed cafe. Time for shopping is usually included.",
      },
      {
        question: "Do I need to know Japanese for anime tours?",
        answer: "No. Guides explain in English and help with translations. Many shops have English signs or staff who can assist.",
      },
      {
        question: "Are anime tours suitable for kids?",
        answer: "Many are family-friendly. Some arcades and cafes have age restrictions. Check the tour description or ask the operator.",
      },
    ],
  },
  {
    slug: "transfers-in-tokyo",
    title: "Transfers in Tokyo",
    description:
      "Private airport transfers, Disney resort shuttles, and cruise port connections. Haneda and Narita to Tokyo, Tokyo to Yokohama Port, and Disneyland or DisneySea. Door-to-door with English-speaking drivers.",
    subPages: [
      { label: "Haneda Airport transfers", href: "/transfers-in-tokyo/haneda-airport" },
      { label: "Narita Airport transfers", href: "/transfers-in-tokyo/narita-airport" },
      { label: "Disney transfers", href: "/transfers-in-tokyo/disney-transfers" },
      { label: "Cruise port transfers", href: "/transfers-in-tokyo/cruise-port" },
      { label: "Yokohama Port & Haneda", href: "/transfers-in-tokyo/yokohama-haneda" },
      { label: "Best transfers in Tokyo", href: "/transfers-in-tokyo/best-transfers" },
    ],
    relatedSlugs: ["private-tours-in-tokyo", "day-trips-from-tokyo", "walking-tours-in-tokyo"],
    about:
      "Private transfers in Tokyo cover airport pickups and drop-offs (Haneda and Narita), hotel-to-Disneyland or DisneySea, and connections to Yokohama or Tokyo cruise ports. Door-to-door service with a dedicated driver—no shared shuttles or train changes with luggage. Ideal for families, cruise passengers, and anyone with early or late flights.",
    insiderTips: [
      "Book Haneda or Narita transfers with your flight details so the driver can allow for delays.",
      "For cruises, confirm your pier (Tokyo port or Yokohama) and ship when booking.",
      "Disney transfers can be one-way or round-trip; set a return time when you book.",
    ],
    whatToExpect: [
      "Meet your driver at arrivals (with name sign) or pickup at your hotel or address.",
      "Private vehicle—sedan or van depending on group size and luggage.",
      "Direct drop-off at airport terminal, Disney park, or cruise port. No shared stops.",
    ],
    whoIsThisFor: [
      "Travelers with heavy luggage or families who want door-to-door comfort.",
      "Cruise passengers needing port or airport connections.",
      "Anyone with early or late flights who prefers not to take trains.",
    ],
    highlights: [
      "Haneda and Narita airport transfers to/from Tokyo",
      "Disneyland and DisneySea private transfers",
      "Yokohama and Tokyo cruise port connections",
      "Private vehicle; English-speaking driver on many options",
    ],
    faqs: [
      {
        question: "How far in advance should I book a transfer?",
        answer: "Booking at least 24–48 hours ahead is recommended. For flights, provide your flight number so the operator can track delays.",
      },
      {
        question: "Is the price per person or per vehicle?",
        answer: "Private transfers are typically per vehicle. Check the product for maximum passengers and luggage capacity.",
      },
      {
        question: "What if my flight is delayed?",
        answer: "Most operators track flights or allow you to update. Check your confirmation for contact details. Some include a grace period.",
      },
      {
        question: "Do transfers include meet and greet at the airport?",
        answer: "Yes. The driver meets you in arrivals with a name sign. You don't need to find a taxi stand.",
      },
      {
        question: "Can I book a round-trip airport transfer?",
        answer: "Yes. Many products offer one-way or round-trip. Round-trip is often two one-ways or a combined option—check the product.",
      },
      {
        question: "Which Tokyo cruise port does the transfer go to?",
        answer: "Tokyo has cruise facilities (e.g. Harumi); Yokohama is a separate port. Book the product that matches your ship's departure or arrival port.",
      },
    ],
  },
  {
    slug: "photography-tours-in-tokyo",
    title: "Photography Tours in Tokyo",
    description:
      "Capture iconic Tokyo: Shibuya Crossing, temples, neon-lit streets, and cityscapes. Guided photo walks for all skill levels with tips from local photographers.",
    subPages: [
      { label: "Personal photographer", href: "/photography-tours-in-tokyo/personal-photographer" },
      { label: "Pro portraits & street shoots", href: "/photography-tours-in-tokyo/portrait-street-pro" },
      { label: "Kimono photoshoots", href: "/photography-tours-in-tokyo/kimono-photoshoots" },
      { label: "Instagram & phone shoots", href: "/photography-tours-in-tokyo/instagram-phone-shoots" },
      { label: "Tour and photoshoot", href: "/photography-tours-in-tokyo/tour-and-photoshoot" },
      { label: "Best photography tours", href: "/photography-tours-in-tokyo/best-photography-tours" },
    ],
    relatedSlugs: ["walking-tours-in-tokyo", "transfers-in-tokyo", "anime-pop-culture-tours-in-tokyo"],
    about:
      "Tokyo is a photographer's playground—Shibuya's crossing, Senso-ji's lanterns, Shinjuku's neon, and quiet temple gardens. Photo tours take you to the best angles and times, with guidance on composition and settings. Tours suit phone shooters and DSLR users; some focus on specific styles (street, night, temples).",
    insiderTips: [
      "Golden hour and blue hour tours offer the best light for cityscapes.",
      "Shibuya Crossing shots work from Starbucks or the surrounding pedestrian walkways.",
      "Bring a tripod for night photography if your tour includes long exposures.",
    ],
    whatToExpect: [
      "Meet at a landmark or station.",
      "Walk to 4–6 photo spots with optimal angles and timing.",
      "Tips on composition, settings, and local knowledge.",
      "2–4 hours; small groups for plenty of shooting time.",
    ],
    whoIsThisFor: [
      "Photographers who want the best locations and local insight.",
      "Instagrammers and content creators.",
      "Anyone with a camera or phone who wants better Tokyo shots.",
    ],
    highlights: [
      "Shibuya Crossing, temples, neon streets, cityscapes",
      "Local photographer or expert guide",
      "Composition and camera tips",
      "2–4 hours; golden hour and night options",
    ],
    faqs: [
      {
        question: "Do I need a professional camera?",
        answer: "No. Tours welcome phone and mirrorless/DSLR users. Guides adapt tips to your gear.",
      },
      {
        question: "When is the best time for Tokyo photography tours?",
        answer: "Golden hour (sunrise/sunset) and blue hour (after sunset) are ideal. Night tours capture neon-lit streets.",
      },
      {
        question: "Are photography tours good for beginners?",
        answer: "Yes. Guides explain composition and settings in simple terms. All skill levels welcome.",
      },
      {
        question: "How many photo spots does a typical tour cover?",
        answer: "Most tours visit 4–6 locations with the best angles and light. You'll have time to shoot at each stop.",
      },
      {
        question: "Can I use a tripod on Tokyo photography tours?",
        answer: "Some spots allow tripods; busy areas like Shibuya Crossing often don't. Your guide will advise. Night tours may include tripod-friendly locations.",
      },
      {
        question: "Do photography tours provide any equipment?",
        answer: "Tours typically don't include gear—bring your own camera or phone. Some operators offer optional rental; check when booking.",
      },
    ],
  },
  {
    slug: "cruises-river-tours-in-tokyo",
    title: "Cruises & River Tours in Tokyo",
    description:
      "Sumida River cruises, Tokyo Bay sightseeing, and water-based tours. See the city from a different angle—temples, skyscrapers, and waterfront views.",
    subPages: [
      { label: "Day & sunset boat cruises", href: "/cruises-river-tours-in-tokyo/day-sunset-boat" },
      { label: "Tokyo Bay afternoon & tea", href: "/cruises-river-tours-in-tokyo/tokyo-bay-afternoon-tea" },
      { label: "Yakatabune show & meal", href: "/cruises-river-tours-in-tokyo/yakatabune-show-meal" },
      { label: "Mt. Fuji & Lake Ashi cruises", href: "/cruises-river-tours-in-tokyo/lake-ashi-fuji" },
      { label: "Sunset party cruises", href: "/cruises-river-tours-in-tokyo/sunset-party" },
      { label: "Best cruises & river tours", href: "/cruises-river-tours-in-tokyo/best-cruises-river" },
    ],
    relatedSlugs: ["day-trips-from-tokyo", "photography-tours-in-tokyo", "transfers-in-tokyo"],
    about:
      "Tokyo's waterways offer a relaxing way to see the city. Sumida River cruises pass under bridges and past Skytree, Asakusa, and Tsukiji. Tokyo Bay cruises offer skyline views. Options range from 1-hour day cruises to evening dinner cruises. A different perspective from walking or train travel.",
    insiderTips: [
      "Sumida cruises connect Asakusa and Hinode/Odaiba—combine with land sightseeing.",
      "Evening cruises capture lit-up Skytree and skyline.",
      "Booking ahead secures the best time slots.",
    ],
    whatToExpect: [
      "Board at a pier (Asakusa, Hinode, or Odaiba area).",
      "Cruise along the Sumida or Tokyo Bay with commentary.",
      "Views of Skytree, Rainbow Bridge, and city skyline.",
      "1–2 hours typical; dinner cruises are longer.",
    ],
    whoIsThisFor: [
      "Travelers who want a relaxed, scenic break from walking.",
      "Families; boats are stroller-friendly.",
      "Photographers seeking water-level city views.",
    ],
    highlights: [
      "Sumida River and Tokyo Bay cruises",
      "Views of Skytree, Rainbow Bridge, and skyline",
      "1–2 hour day cruises; sunset and dinner options",
      "Commentary in English on most tours",
    ],
    faqs: [
      {
        question: "Where do Tokyo river cruises depart from?",
        answer: "Sumida cruises typically depart from Asakusa or Hinode Pier. Tokyo Bay cruises leave from Odaiba or nearby.",
      },
      {
        question: "How long do Tokyo cruises last?",
        answer: "Day cruises are usually 1–2 hours. Dinner cruises run 2–3 hours.",
      },
      {
        question: "Are Tokyo cruises good for kids?",
        answer: "Yes. Boats are stable and family-friendly. Kids enjoy the views and the novelty of being on the water.",
      },
      {
        question: "Do I need to book Tokyo cruises in advance?",
        answer: "Booking ahead is recommended for dinner cruises and popular time slots. Same-day tickets are often available for shorter day cruises.",
      },
      {
        question: "What can I see from a Sumida River cruise?",
        answer: "You'll pass Tokyo Skytree, Asakusa temple area, and riverside architecture. Commentary is usually provided in Japanese and English.",
      },
      {
        question: "Are Tokyo cruises wheelchair accessible?",
        answer: "Accessibility varies by boat. Contact the operator before booking if you need wheelchair access.",
      },
    ],
  },
  {
    slug: "cherry-blossom-tours-in-tokyo",
    title: "Top Tokyo Cherry Blossom Tours",
    description:
      "Tokyo cherry blossom (sakura) tours and hanami experiences. Guided walks, Meguro River, Yoyogi Park picnic and photoshoots, Kamakura sakura, and expert-led half-day or full-day tours. Book the best sakura season in Tokyo.",
    subPages: [
      { label: "Cherry blossom walking tours", href: "/cherry-blossom-tours-in-tokyo/cherry-blossom-walking" },
      { label: "Sakura expert tours", href: "/cherry-blossom-tours-in-tokyo/sakura-expert-tours" },
      { label: "Yoyogi Park sakura", href: "/cherry-blossom-tours-in-tokyo/yoyogi-park-sakura" },
      { label: "Kamakura cherry blossom", href: "/cherry-blossom-tours-in-tokyo/kamakura-sakura" },
      { label: "Private & charter options", href: "/cherry-blossom-tours-in-tokyo/private-charter-options" },
      { label: "Best cherry blossom tours", href: "/cherry-blossom-tours-in-tokyo/best-cherry-blossom-tokyo" },
    ],
    relatedSlugs: ["walking-tours-in-tokyo", "day-trips-from-tokyo", "photography-tours-in-tokyo"],
    about:
      "Cherry blossom season in Tokyo (typically late March–early April) is one of the best times to visit. Top sakura tours include guided walks along Meguro River, half-day or full-day tours with sakura experts, Yoyogi Park picnics and photoshoots, and day trips to Kamakura for temples and blossoms. Hanami (flower viewing) is a classic Japanese spring experience—book ahead for peak season.",
    insiderTips: [
      "Peak bloom varies each year; book tours that adapt to conditions. Late March–early April is typical.",
      "Meguro River and Ueno Park are iconic but crowded; expert or 'secrets' tours can show quieter spots.",
      "Yoyogi Park picnic and photoshoots are ideal for couples or families who want to sit and enjoy the blossoms.",
    ],
    whatToExpect: [
      "Meet your guide or photographer at the designated spot. Seasonal tours run in spring only.",
      "Walking tours: 2–4 hours along rivers, parks, or gardens. Full-day tours cover multiple spots with transport.",
      "Picnic or photoshoot: 1–2 hours in Yoyogi or similar. Kamakura tours are full-day from Tokyo.",
    ],
    whoIsThisFor: [
      "Travelers visiting Tokyo during cherry blossom season (late March–early April).",
      "Anyone who wants guided sakura viewing or hanami culture without planning the route.",
      "Couples or families who want a sakura picnic or professional photos among the blossoms.",
    ],
    highlights: [
      "Guided cherry blossom walks (Meguro, Tokyo parks, secrets spots)",
      "Sakura expert half-day and full-day tours",
      "Yoyogi Park picnic and private photoshoot",
      "Kamakura cherry blossom day trip; private Osaka or Fuji/Hakone options",
    ],
    faqs: [
      {
        question: "When is cherry blossom season in Tokyo?",
        answer: "Typically late March to early April. Peak bloom varies by year; tours run through the season and guides adapt to conditions.",
      },
      {
        question: "What is hanami?",
        answer: "Hanami means 'flower viewing'—enjoying the cherry blossoms, often with a picnic under the trees. A classic Japanese spring tradition.",
      },
      {
        question: "Do I need to book cherry blossom tours in advance?",
        answer: "Yes. Peak season is very popular. Book several weeks ahead for the best choice of dates and operators.",
      },
      {
        question: "What if the blossoms aren't in full bloom on my tour date?",
        answer: "Guides choose the best spots for that day's conditions. Tours run throughout the season; you'll still see blossoms at different stages.",
      },
      {
        question: "Are there cherry blossom tours outside Tokyo?",
        answer: "Yes. Kamakura cherry blossom full-day tours are popular. Some products also offer private charter to Fuji/Hakone (sakura possible in spring) or Osaka.",
      },
      {
        question: "Can I do a sakura photoshoot or picnic?",
        answer: "Yes. Options include private cherry blossom photoshoots in Yoyogi Park and sakura picnic experiences. Book for peak season dates.",
      },
    ],
  },
  {
    slug: "theme-park-museum-tickets-in-tokyo",
    title: "Theme Park & Museum Tickets in Tokyo",
    description:
      "Skip-the-line tickets for teamLab, digital art museums, Ghibli Museum, and theme parks. Pre-book and save time at Tokyo's top attractions.",
    subPages: [
      { label: "Disney tickets & transfer", href: "/theme-park-museum-tickets-in-tokyo/disney-tickets" },
      { label: "teamLab Planets VIP", href: "/theme-park-museum-tickets-in-tokyo/teamlab-planets" },
      { label: "Harry Potter Studio Tour", href: "/theme-park-museum-tickets-in-tokyo/harry-potter-studio" },
      { label: "Museums & family attractions", href: "/theme-park-museum-tickets-in-tokyo/museums-family" },
      { label: "Sumo & day tours", href: "/theme-park-museum-tickets-in-tokyo/sumo-day-experiences" },
      { label: "Best theme park & museum tickets", href: "/theme-park-museum-tickets-in-tokyo/best-theme-park-museum" },
    ],
    relatedSlugs: ["anime-pop-culture-tours-in-tokyo", "transfers-in-tokyo", "private-tours-in-tokyo"],
    about:
      "Tokyo's top attractions sell out fast. teamLab's immersive digital art experiences, the Ghibli Museum, and Disney parks require advance tickets. Pre-booking saves time and guarantees entry. Options include skip-the-line, timed entry, and combo tickets. Plan ahead—some venues release tickets months in advance.",
    insiderTips: [
      "teamLab Planets and Borderless are extremely popular; book at least 2–4 weeks ahead.",
      "Ghibli Museum tickets sell out quickly; often need to book on the 10th of the prior month.",
      "Disney tickets can be purchased in advance; check seasonal events.",
    ],
    whatToExpect: [
      "E-ticket or voucher delivered after booking.",
      "Present at entrance; skip queues where applicable.",
      "Timed entry for some attractions (teamLab, Ghibli).",
      "Valid for specified date; check cancellation policy.",
    ],
    whoIsThisFor: [
      "Travelers who want to visit teamLab, Ghibli, or Disney without hassle.",
      "Anyone who prefers to book in advance and avoid queues.",
      "Families and groups planning key attractions.",
    ],
    highlights: [
      "teamLab Borderless, teamLab Planets, Ghibli Museum",
      "Tokyo Disneyland and DisneySea",
      "Skip-the-line and timed entry options",
      "Pre-book and guarantee entry",
    ],
    faqs: [
      {
        question: "How far ahead should I book teamLab tickets?",
        answer: "At least 2–4 weeks in advance for popular dates. Weekdays and off-peak times have better availability.",
      },
      {
        question: "How do I get Ghibli Museum tickets?",
        answer: "Tickets are sold through authorized agents (e.g. JTB, Lawson) and often release on the 10th of the month before your visit. Book as soon as they open.",
      },
      {
        question: "Are Disney tickets included in tour packages?",
        answer: "Some day tours include Disney; others sell tickets only. Check the product description for what's included.",
      },
      {
        question: "What's the difference between teamLab Borderless and teamLab Planets?",
        answer: "Borderless is a large, maze-like space with immersive rooms. Planets is more compact with water and garden elements. Both are popular; book the one that fits your schedule.",
      },
      {
        question: "Can I get a refund if I cancel my attraction ticket?",
        answer: "Policies vary. Many tickets are non-refundable; some allow changes for a fee. Always check the terms before booking.",
      },
      {
        question: "Do skip-the-line tickets guarantee immediate entry?",
        answer: "They typically let you bypass the main queue. You may still have a short wait. Timed-entry tickets specify your slot—arrive within the window.",
      },
    ],
  },
  {
    slug: "workshops-hands-on-classes-in-tokyo",
    title: "Workshops & Hands-On Classes in Tokyo",
    description:
      "Sushi-making, pottery, traditional crafts, and other hands-on experiences. Learn from local experts in small-group or private sessions.",
    subPages: [
      { label: "Chopsticks & crafts", href: "/workshops-hands-on-classes-in-tokyo/chopsticks-crafts" },
      { label: "Knife making", href: "/workshops-hands-on-classes-in-tokyo/knife-making" },
      { label: "Kintsugi", href: "/workshops-hands-on-classes-in-tokyo/kintsugi" },
      { label: "Cooking classes", href: "/workshops-hands-on-classes-in-tokyo/cooking-classes" },
      { label: "Samurai & tea culture", href: "/workshops-hands-on-classes-in-tokyo/samurai-tea-culture" },
      { label: "Best workshops & classes", href: "/workshops-hands-on-classes-in-tokyo/best-workshops-classes" },
    ],
    relatedSlugs: ["transfers-in-tokyo", "food-tours-in-tokyo", "private-tours-in-tokyo"],
    about:
      "Hands-on workshops let you create something memorable. Sushi-making classes teach knife skills and rolling; pottery workshops let you shape and glaze your own piece. Traditional crafts (origami, indigo dyeing, washi paper) connect you with Japanese artisanal culture. Most sessions run 1–3 hours and are suitable for beginners.",
    insiderTips: [
      "Sushi classes often include eating what you make; come with an appetite.",
      "Pottery pieces may need to be fired and shipped—check if international shipping is available.",
      "Small groups (under 8) mean more individual attention.",
    ],
    whatToExpect: [
      "Meet at a studio or kitchen venue.",
      "Instruction and hands-on practice.",
      "Take home what you make (sushi you eat; pottery may be shipped).",
      "1–3 hours; materials and equipment provided.",
    ],
    whoIsThisFor: [
      "Travelers who want to learn a skill, not just observe.",
      "Families and couples looking for shared activities.",
      "Anyone interested in Japanese food or crafts.",
    ],
    highlights: [
      "Sushi-making, pottery, traditional crafts, cooking",
      "Small groups; English instruction",
      "1–3 hour sessions; take home your creation",
      "Beginner-friendly; no experience required",
    ],
    faqs: [
      {
        question: "Do I need experience for sushi-making?",
        answer: "No. Classes are designed for beginners. You'll learn basic techniques and make sushi you can eat.",
      },
      {
        question: "Can I take my pottery home?",
        answer: "Pieces need to be fired, which takes time. Some studios offer international shipping; others have pickup points.",
      },
      {
        question: "Are workshops suitable for children?",
        answer: "Many are family-friendly. Sushi and crafts often welcome kids; check age requirements when booking.",
      },
      {
        question: "How long do Tokyo workshops usually last?",
        answer: "Most run 1–3 hours. Sushi and cooking classes are often 2–3 hours; craft sessions vary. Check the tour details.",
      },
      {
        question: "Is English instruction available?",
        answer: "Yes. Many Tokyo workshops offer English-speaking instructors or guides. Confirm language when booking.",
      },
      {
        question: "Do I need to bring anything to a workshop?",
        answer: "Usually no. Materials and equipment are provided. Wear comfortable clothes; some pottery classes suggest bringing an apron or old shirt.",
      },
    ],
  },
];

const slugSet = new Set(pillars.map((p) => p.slug));

export function getPillarBySlug(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

export function isPillarSlug(slug: string): boolean {
  return slugSet.has(slug);
}

export function getRelatedPillars(pillar: Pillar): Pillar[] {
  return pillar.relatedSlugs
    .map((s) => getPillarBySlug(s))
    .filter((p): p is Pillar => p !== undefined);
}
