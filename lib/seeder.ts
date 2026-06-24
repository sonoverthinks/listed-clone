import { prisma } from "./prisma";

export const seedListings = async (region: string, limit: string, apiKey: string) => {
  const fetchListings = async () => {
    const response = await fetch(
      `https://redfin-com-data.p.rapidapi.com/properties/search-sold?regionId=${region}&limit=${limit}&soldWithin=180&homeType=1%2C2%2C3%2C4`,
      {
        headers: {
          "x-rapidapi-key": apiKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };
  try {
    const listings = await fetchListings();
    console.log(`Starting to fetch data from redfin for region ${region}...`);
    console.log(`Fetched ${listings.data.length} listings`);

    // prepare for createMany
    const listingData = listings.data.map((listing: any) => ({
      url: listing.homeData.url,
      beds: listing.homeData.beds,
      baths: listing.homeData.baths,
      yearBuilt: listing.homeData.yearBuilt.yearBuilt,
      city: listing.homeData.addressInfo.city,
      state: listing.homeData.addressInfo.state,
      zip: listing.homeData.addressInfo.zip,
      hoaDues: listing.homeData.hoaDues.amount,
      regionId: region,
      sqrft: listing.homeData.sqftInfo.amount,
      lotSize: listing.homeData.lotSize.amount,
      propertyType: listing.homeData.listingMetadata.listingType,
      price: listing.homeData.priceInfo.amount,
      listDate: listing.homeData.daysOnMarket.listingAddedDate,
      lastSoldDate: listing.homeData.lastSaleData.lastSoldDate,
    }));

    console.log(`Mapped ${listingData.length} records`);
    // create new listings
    await prisma.property.createMany({
      data: listingData,
    });
    console.log(`Seeded region ${region} successfully`);
    return { success: true, count: listingData.length };
  } catch (error: any) {
    console.error(`Error seeding database for region ${region}:`, error);
    return { success: false, error: error.message };
  }
};

export const seedAll = async () => {
  const apiKey = (process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY || process.env.X_RAPIDAPI_KEY) as string;
  if (!apiKey) {
    throw new Error("RapidAPI key is not configured");
  }

  const regions = [
    { id: "6_14240", name: "Phoenix" },
    { id: "6_11203", name: "Los Angeles" },
    { id: "6_8903", name: "Houston" },
    { id: "6_16163", name: "Seattle" },
    { id: "6_2942", name: "Chicago" },
    { id: "6_11485", name: "Miami" },
  ];

  const results = [];
  try {
    for (const region of regions) {
      console.log(`Seeding ${region.name}...`);
      const res = await seedListings(region.id, "50", apiKey);
      results.push({ region: region.name, ...res });
    }
  } catch (error: any) {
    console.error("General seeding error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
  return results;
};
