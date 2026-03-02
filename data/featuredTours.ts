/**
 * Placeholder tours for category pages when no Viator data is available.
 * Each category has 4 placeholders so PillarTemplate can show cards.
 */
export interface FeaturedTour {
  id: string;
  title: string;
  fromPrice: string;
  fromPriceLabel?: string;
  categorySlug?: string;
}

const createPlaceholders = (
  slug: string,
  titles: [string, string, string, string],
  prices: [string, string, string, string]
): FeaturedTour[] =>
  titles.map((title, i) => ({
    id: `placeholder-${slug}-${i + 1}`,
    title,
    fromPrice: prices[i],
    fromPriceLabel: `From $${prices[i]}`,
    categorySlug: slug,
  }));

export const featuredTours: FeaturedTour[] = [
  ...createPlaceholders("walking-tours-in-tokyo", [
    "Asakusa Temple District Walking Tour",
    "Shibuya & Harajuku Culture Walk",
    "Shinjuku Backstreets Tour",
    "Yanaka Old Tokyo Walking Tour",
  ], ["45", "55", "50", "48"]),
  ...createPlaceholders("food-tours-in-tokyo", [
    "Tsukiji Market Food Tour",
    "Shinjuku Izakaya Crawl",
    "Sushi Making & Tasting",
    "Ramen & Gyoza Tour",
  ], ["95", "85", "120", "65"]),
  ...createPlaceholders("day-trips-from-tokyo", [
    "Mt. Fuji & Hakone Day Trip",
    "Kamakura & Enoshima Tour",
    "Nikko Temples Day Trip",
    "Kawagoe Little Edo Tour",
  ], ["140", "95", "115", "75"]),
  ...createPlaceholders("private-tours-in-tokyo", [
    "Private Full-Day Tokyo Tour",
    "Family-Friendly Private Tour",
    "Couples Custom Experience",
    "First-Time Tokyo Orientation",
  ], ["280", "320", "350", "250"]),
  ...createPlaceholders("nightlife-bar-tours-in-tokyo", [
    "Golden Gai Bar Hopping",
    "Shinjuku Neon Night Tour",
    "Shibuya Bar Crawl",
    "Sake Tasting Experience",
  ], ["75", "70", "65", "85"]),
  ...createPlaceholders("anime-pop-culture-tours-in-tokyo", [
    "Akihabara Anime Tour",
    "Gaming & Arcade Experience",
    "Themed Cafe & Culture Tour",
    "Manga & Collectibles Walk",
  ], ["55", "50", "60", "45"]),
  ...createPlaceholders("transfers-in-tokyo", [
    "Haneda Airport Private Transfer",
    "Narita Airport to Tokyo Transfer",
    "Disneyland/DisneySea Transfer",
    "Tokyo to Yokohama Cruise Port",
  ], ["45", "95", "55", "75"]),
  ...createPlaceholders("photography-tours-in-tokyo", [
    "Shibuya Crossing Photo Tour",
    "Temple & Shrine Photography",
    "Neon Night Photography",
    "Street Photography Walk",
  ], ["75", "70", "85", "65"]),
  ...createPlaceholders("cruises-river-tours-in-tokyo", [
    "Sumida River Cruise",
    "Tokyo Bay Sightseeing Cruise",
    "Sunset Dinner Cruise",
    "Evening Tokyo Bay Cruise",
  ], ["25", "35", "95", "45"]),
  ...createPlaceholders("cherry-blossom-tours-in-tokyo", [
    "Cherry Blossom Tour",
    "Meguro River Sakura Walking",
    "Sakura Expert Half-Day",
    "Yoyogi Park Sakura Picnic",
  ], ["55", "65", "60", "50"]),
  ...createPlaceholders("theme-park-museum-tickets-in-tokyo", [
    "teamLab Borderless Tickets",
    "Ghibli Museum Entry",
    "Tokyo Disneyland 1-Day",
    "teamLab Planets Tickets",
  ], ["45", "25", "75", "40"]),
  ...createPlaceholders("workshops-hands-on-classes-in-tokyo", [
    "Chopsticks Making Shinjuku",
    "Kintsugi Workshop Asakusa",
    "Sushi Making Class Asakusa",
    "Ramen Making Kabukicho",
  ], ["65", "70", "85", "75"]),
];
