/**
 * Viator product codes per pillar. Used when Viator API is connected.
 * Empty arrays = PillarTemplate shows placeholder cards until Tokyo products are added.
 */
export const pillarProductCodes: Record<string, string[]> = {
  "walking-tours-in-tokyo": [
    "465886P4",   // Tokyo Asakusa All-in-One (top pick 1)
    "456539P2",   // Customized Personalized Tour Local Friends (top pick 2)
    "21490P2",    // Tokyo Private Custom Full-Day (top pick 3)
    "175777P17",  // Shibuya Walking Tour Crossing Hachi (top pick 4)
    "465886P20",  // Imperial Palace East Garden
    "5507368P3",  // Shinjuku Authentic Food
    "92136P35",   // Tokyo Half-day Private Custom
    "456539P20",  // Asakusa Private Food Walking Tour Family
    "465886P1",   // Tokyo Local Bar Hopping Shibuya
    "5924TYOCUSTOM", // Private Custom Tour Tokyo in a Day
  ],
  "food-tours-in-tokyo": [
    "5507368P3",   // Shinjuku Authentic Food (top pick 1)
    "465886P1",    // Tokyo Local Bar Hopping Shibuya (top pick 2)
    "87037P2",     // Izakaya Food Tour Shinjuku (top pick 3)
    "5507368P6",   // Tokyo Shinjuku Food and Drink Inclusive (top pick 4)
    "465886P5",    // Best of Tsukiji Food Tour
    "456539P1",    // Explore Aesthetic Nights Izakaya Shinjuku
    "63670P33",    // Tokyo Night Foodie Tour Shinjuku
    "63670P1",     // Tokyo Bar Hopping Shinjuku Hidden Bars
    "21490P9",     // Food Tour Tsukiji Fish Market
    "63670P2",     // Tokyo Bar Hopping Shibuya Food Alley
  ],
  "day-trips-from-tokyo": [
    "444978P1",     // Mount Fuji Full-day Tour English Guide (top pick 1)
    "28575P2",      // 1-Day Amazing Tokyo Bus Tour (top pick 2)
    "100913P13",    // From Tokyo Mt. Fuji Full-Day Sightseeing (top pick 3)
    "5523026P35",   // Mt. Fuji and Hakone Day Trip Cruise Springs Pagoda (top pick 4)
    "442126P2",     // Mount Fuji Private Sightseeing Driver-Photographer
    "444978P11",    // Mount Fuji Sightseeing Full-day Tokyo or Shinjuku
    "444978P12",    // From Tokyo Mount Fuji Sightseeing Full-Day
    "43454P72",     // Amazing Mt. Fuji and Hakone Tour
    "5924TYOCUSTOM", // Private Custom Tour Tokyo in a Day
    "5489818P14",   // Instagram-Worthy 1-Day Trip Mt. Fuji From Tokyo
  ],
  "private-tours-in-tokyo": [
    "5610480P1",   // Tokyo Private Custom Bilingual Driver (top pick 1)
    "21490P2",     // Tokyo Private Custom Full-Day Walking (top pick 2)
    "88165P1",     // Tokyo Private Chauffeur Driving Sightseeing (top pick 3)
    "92136P142",   // Tokyo Off-the-Beaten-Path Private Licensed Guide (top pick 4)
    "30791P656",   // Half-Day Tokyo with a Local Private Personalized
    "65053P1",     // 1-Day Tokyo Private Sightseeing Driver
    "442126P1",    // Full-Day Tokyo Private Tour Car Van
    "65053P9",     // 1-Day Private Mt. Fuji Charter Driver
    "92136P76",    // Tokyo Best Japanese Gardens Private Licensed Guide
    "437186P2",    // Hakone Fuji Relaxation Onsen Arts Nature Private
  ],
  "nightlife-bar-tours-in-tokyo": [
    "5523026P1",   // Tokyo Shinjuku Must-See Night Walking (top pick 1)
    "5587308P16",  // All-Nighter Sing Drink Dance Uni Students (top pick 2)
    "5625159P2",   // Tokyo Night Drive Wangan Daikoku PA (top pick 3)
    "133677P11",   // Shinjuku Kabukicho Smappa Licensed Guide (top pick 4)
    "416969P13",   // Shinjuku Night Explorer Private Hidden Bars
    "5548260P14",  // Private Karaoke Bar Tour Roppongi All-You-Can-Drink
    "477979P28",   // Tokyo Shinjuku Private Vibrant District Walking
    "5570284P10",  // Anime Karaoke Night Tokyo Snack Bar Dinner
    "5603323P7",   // Tokyo Nightlife Bar Hopping Private Karaoke
    "5505608P4",   // Tokyo Bar and Sake Tour OKUROJI
  ],
  "anime-pop-culture-tours-in-tokyo": [
    "478596P7",    // Tokyo Shinjuku Anime Food Tour (top pick 1)
    "477979P10",   // Tokyo Akihabara Pop Culture and Tradition (top pick 2)
    "176858P1",    // Akiba Tailor-made for Anime Fans (top pick 3)
    "63670P17",    // Akihabara Anime and Gaming Adventure (top pick 4)
    "27666P91",    // Anime Studio Visit and Workshop
    "454343P8",    // Tokyo Akihabara Anime Manga Hidden Gems
    "5608668P2",   // Anime Cel Painting Workshop
    "454343P3",    // Tokyo Akihabara Anime Manga Maid Cafe
    "5499730P1",   // Ikebukuro Anime and Game Culture
    "100234P15",   // Full-Day Akihabara Anime Manga Food and Drinks
  ],
  "transfers-in-tokyo": [
    "5539078P1",   // Haneda Airport Private Transfer to/from Tokyo City (top pick 1)
    "405101P97",   // Tokyo City Private Departure to Haneda (top pick 2)
    "103893P3",    // Private Arrival Narita to Tokyo (top pick 3)
    "5498004P31",  // Disneyland/DisneySea Transfer English Driver (top pick 4)
    "405101P96",   // Itami Airport to Osaka City
    "5514894P34",  // Tokyo Hotel Private Transfer Disneyland/DisneySea
    "405101P33",   // Tokyo to Yokohama Port
    "128285P3257", // Tokyo Hotels to Tokyo Cruise Port
    "236027P12",  // Yokohama to HND Airport Private Car
    "128285P3256", // Tokyo Port to Narita Airport
  ],
  "photography-tours-in-tokyo": [
    "387479P2",    // 1h On-Location Shooting Service (top pick 1)
    "411983P2",    // Edgy Unique Portraits Pro Tokyo Photographer (top pick 2)
    "113473P3",    // Travel Tokyo Personal Photographer (top pick 3)
    "5571237P1",   // Beautiful Kimono Photoshoot Tokyo (top pick 4)
    "5600128P1",   // Street Photoshoot Tokyo Iconic Spots
    "478377P1",    // Harajuku Kimono Shibui
    "438096P1",    // Tokyo Tour and Photoshoot Experience
    "486024P2",    // Tokyo Asakusa Rental Kimono
    "92136P233",   // Tokyo Full-Day Instagram Highlights Private
    "387479P33",   // Snap Photo Shoot Tokyo Phone
  ],
  "cruises-river-tours-in-tokyo": [
    "185570P10",        // Tokyo Day Time and Sunset Boat Cruise (top pick 1)
    "2142TYO_F800_F820", // Mt Fuji Lake Ashi Bullet Train Day Trip (top pick 2)
    "242747P122",        // Tokyo Bay Afternoon Cruise Tea Symphony (top pick 3)
    "5546930P9",         // Tokyo Sunset Boat Party (top pick 4)
    "475203P4",          // Tokyo Cruise Japanese Show Meal Tokyo Tower
    "467897P1",          // Tokyo spectacular view cruising 90min
    "90714P48",          // Mt Fuji 5th Station Owakudani Pirate Ship Outlet
    "2142TYO_F880_F830", // Mt Fuji Day Trip Lake Ashi Cruise
    "475203P12",         // Tokyo Bay Yakatabune JapanDance Free drinks
    "475203P15",         // Tokyo Yakatabune Day Cruise Kimono Dance Meal
  ],
  "cherry-blossom-tours-in-tokyo": [
    "297993P2",   // Cherry Blossom Tour (top pick 1)
    "133677P10",  // Licensed Guide Meguro Cherry Blossom Walking (top pick 2)
    "438480P11",  // Tokyo Cherry Blossom Half-Day Sakura Expert (top pick 3)
    "30791P459",  // Cherry Blossom Secrets Sakura Tokyo (top pick 4)
    "412164P83",  // Private Cherry Blossom Photoshoot Yoyogi Park
    "5497662P3",  // Cherry Blossom Season Sakura Picnic Yoyogi Park
    "485648P3",   // Conquer Tokyos Best Cherry Blossom Spots One Day
    "438480P16",  // Kamakura Cherry Blossom Full-Day Local Expert
    "235563P16",  // Private Osaka Tour English Speaking Driver
    "5575721P14", // Private Chartered Tour Mt Fuji or Hakone English Driver
  ],
  "theme-park-museum-tickets-in-tokyo": [
    "13441P127",   // Disneyland/DisneySea 1-Day Passport + Private Transfer (top pick 1)
    "5571523P10",  // VIP Tokyo Disneyland Day Trip Private Car Guide (top pick 2)
    "5570267P17",  // Tokyo Guided Tour teamLab Planets + Toyosu Fish Market (top pick 3)
    "242747P78",   // Warner Bros Studio Tour Harry Potter Tokyo (top pick 4)
    "5514894P44",  // Mt Fuji and Hakone Five Must-Visit Spots Day Tour
    "5514894P6",   // N Seoul Tower and Love Lock Ticket Package
    "366941P143",  // Madame Tussauds Tokyo
    "121570P1",    // Tokyo Fuji Art Museum Leonard Foujita
    "366941P118",  // LEGOLAND Discovery Center Tokyo
    "27666P84",    // Sumo Tournament Experience Tokyo
  ],
  "workshops-hands-on-classes-in-tokyo": [
    "465886P35",   // Tokyo Shinjuku Chopsticks Making (top pick 1)
    "465886P43",   // Tokyo Asakusa Kintsugi Gold Repair (top pick 2)
    "209829P1",    // Samurai Theater Tokyo (top pick 3)
    "445447P25",   // Sushi Making Class Asakusa (top pick 4)
    "5523026P31",  // Tokyo Chopstick Making with Artisan
    "465886P46",   // Asakusa Traditional Japanese Knife Making
    "13441P60",    // Kintsugi Experience Tokyo
    "5558402P1",   // Asakusa Tea Ceremony Matcha Experience
    "434142P2",    // Authentic Ramen Making Kabukicho
    "5524798P3",   // Forge Your Own Knife Asakusa
  ],
};

export function getProductCodesForPillar(slug: string): string[] {
  return pillarProductCodes[slug] ?? [];
}
