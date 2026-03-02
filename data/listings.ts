/**
 * Unified tour listings module for categories with custom listing pages.
 * Aggregates catamaran, sunset, snorkeling, and ATV listings for routing and display.
 */
import type { TourListing } from "./catamaranListings";
import {
  catamaranCategorySlug,
  catamaranListings,
} from "./catamaranListings";
import {
  sunsetCategorySlug,
  sunsetListings,
} from "./sunsetListings";
import {
  snorkelingCategorySlug,
  snorkelingListings,
} from "./snorkelingListings";
import {
  atvCategorySlug,
  atvListings,
} from "./atvListings";
import {
  islandSightseeingCategorySlug,
  islandSightseeingListings,
} from "./islandSightseeingListings";
import {
  privateLuxuryCategorySlug,
  privateLuxuryListings,
} from "./privateLuxuryListings";
import {
  romanticExperiencesCategorySlug,
  romanticExperiencesListings,
} from "./romanticExperiencesListings";
import {
  horsebackRidingCategorySlug,
  horsebackRidingListings,
} from "./horsebackRidingListings";
import {
  photoshootsCategorySlug,
  photoshootsListings,
} from "./photoshootsListings";
import {
  airportTransfersCategorySlug,
  airportTransfersListings,
} from "./airportTransfersListings";
import {
  seaGlassCategorySlug,
  seaGlassListings,
} from "./seaGlassListings";
import {
  waterSportsCategorySlug,
  waterSportsListings,
} from "./waterSportsListings";
import {
  walkingToursCategorySlug,
  walkingToursListings,
} from "./walkingToursListings";
import {
  foodToursCategorySlug,
  foodToursListings,
} from "./foodToursListings";
import {
  dayTripsFromTokyoCategorySlug,
  dayTripsFromTokyoListings,
} from "./dayTripsFromTokyoListings";
import {
  privateToursCategorySlug,
  privateToursListings,
} from "./privateToursListings";
import {
  nightlifeBarToursCategorySlug,
  nightlifeBarToursListings,
} from "./nightlifeBarToursListings";
import {
  animePopCultureCategorySlug,
  animePopCultureListings,
} from "./animePopCultureListings";
import {
  photographyToursCategorySlug,
  photographyToursListings,
} from "./photographyToursListings";
import {
  transfersCategorySlug,
  transfersListings,
} from "./transfersListings";
import {
  cruisesRiverToursCategorySlug,
  cruisesRiverToursListings,
} from "./cruisesRiverToursListings";
import {
  cherryBlossomToursCategorySlug,
  cherryBlossomToursListings,
} from "./cherryBlossomToursListings";
import {
  themeParkMuseumTicketsCategorySlug,
  themeParkMuseumTicketsListings,
} from "./themeParkMuseumTicketsListings";
import {
  workshopsHandsOnCategorySlug,
  workshopsHandsOnListings,
} from "./workshopsHandsOnListings";

export type { TourListing };

const listingMap: Record<string, TourListing[]> = {
  [catamaranCategorySlug]: catamaranListings,
  [sunsetCategorySlug]: sunsetListings,
  [snorkelingCategorySlug]: snorkelingListings,
  [atvCategorySlug]: atvListings,
  [islandSightseeingCategorySlug]: islandSightseeingListings,
  [privateLuxuryCategorySlug]: privateLuxuryListings,
  [romanticExperiencesCategorySlug]: romanticExperiencesListings,
  [horsebackRidingCategorySlug]: horsebackRidingListings,
  [photoshootsCategorySlug]: photoshootsListings,
  [airportTransfersCategorySlug]: airportTransfersListings,
  [seaGlassCategorySlug]: seaGlassListings,
  [waterSportsCategorySlug]: waterSportsListings,
  [walkingToursCategorySlug]: walkingToursListings,
  [foodToursCategorySlug]: foodToursListings,
  [dayTripsFromTokyoCategorySlug]: dayTripsFromTokyoListings,
  [privateToursCategorySlug]: privateToursListings,
  [nightlifeBarToursCategorySlug]: nightlifeBarToursListings,
  [animePopCultureCategorySlug]: animePopCultureListings,
  [photographyToursCategorySlug]: photographyToursListings,
  [transfersCategorySlug]: transfersListings,
  [cruisesRiverToursCategorySlug]: cruisesRiverToursListings,
  [cherryBlossomToursCategorySlug]: cherryBlossomToursListings,
  [themeParkMuseumTicketsCategorySlug]: themeParkMuseumTicketsListings,
  [workshopsHandsOnCategorySlug]: workshopsHandsOnListings,
};

/** Category slugs that have tour listing pages (for routing) */
export const categorySlugsWithListings: string[] = [
  catamaranCategorySlug,
  sunsetCategorySlug,
  snorkelingCategorySlug,
  atvCategorySlug,
  islandSightseeingCategorySlug,
  privateLuxuryCategorySlug,
  romanticExperiencesCategorySlug,
  horsebackRidingCategorySlug,
  photoshootsCategorySlug,
  airportTransfersCategorySlug,
  seaGlassCategorySlug,
  waterSportsCategorySlug,
  walkingToursCategorySlug,
  foodToursCategorySlug,
  dayTripsFromTokyoCategorySlug,
  privateToursCategorySlug,
  nightlifeBarToursCategorySlug,
  animePopCultureCategorySlug,
  photographyToursCategorySlug,
  transfersCategorySlug,
  cruisesRiverToursCategorySlug,
  cherryBlossomToursCategorySlug,
  themeParkMuseumTicketsCategorySlug,
  workshopsHandsOnCategorySlug,
];

/** Resolve a tour listing by category and tour slug; returns null if not found */
export function getTourListing(
  categorySlug: string,
  tourSlug: string
): TourListing | null {
  const listings = listingMap[categorySlug];
  if (!listings) return null;
  return listings.find((l) => l.slug === tourSlug) ?? null;
}

/** All tour listings for a category (for generateStaticParams) */
export function getTourListingsByCategory(
  categorySlug: string
): TourListing[] {
  const listings = listingMap[categorySlug];
  return listings ?? [];
}

/** Get listing by category + product code (for pillar cards: link to internal page when we have one) */
export function getListingByProductCode(
  categorySlug: string,
  productCode: string
): TourListing | null {
  const listings = listingMap[categorySlug];
  if (!listings) return null;
  return listings.find((l) => l.productCode === productCode) ?? null;
}
