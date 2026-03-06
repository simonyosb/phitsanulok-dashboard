/**
 * Apify Google Maps Scraper Integration
 *
 * This script uses Apify's Google Maps Scraper actor to pull business data
 * from Google Maps for Phitsanulok province.
 *
 * Prerequisites:
 * 1. Sign up at https://apify.com
 * 2. Get your API token from Settings > Integrations
 * 3. Set APIFY_TOKEN environment variable
 *
 * Usage:
 *   npx tsx scripts/apify-scraper.ts
 */

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = "nwua9Gu5YrADL7ZDj"; // Google Maps Scraper actor

interface ApifyInput {
  searchStringsArray: string[];
  locationQuery: string;
  maxCrawledPlaces: number;
  language: string;
  maxReviews: number;
  includeReviews: boolean;
  includeImages: boolean;
  includeOpeningHours: boolean;
}

interface ApifyPlace {
  title: string;
  categoryName: string;
  address: string;
  location: { lat: number; lng: number };
  totalScore: number;
  reviewsCount: number;
  openingHours: { day: string; hours: string }[];
  website: string | null;
  url: string;
  imageUrls: string[];
  reviews: {
    text: string;
    stars: number;
    publishedAtDate: string;
    likesCount: number;
  }[];
}

const SEARCH_QUERIES = [
  "hotel in Phitsanulok",
  "boutique hotel Phitsanulok",
  "cafe in Phitsanulok",
  "coffee shop Phitsanulok",
  "restaurant in Phitsanulok",
  "ร้านอาหาร พิษณุโลก",
  "clinic Phitsanulok",
  "คลินิก พิษณุโลก",
  "co-working space Phitsanulok",
  "โรงแรม พิษณุโลก",
  "คาเฟ่ พิษณุโลก",
];

async function runScraper() {
  if (!APIFY_TOKEN) {
    console.error("Error: APIFY_TOKEN environment variable is required");
    console.log("Set it with: export APIFY_TOKEN=your_token_here");
    process.exit(1);
  }

  console.log("Starting Apify Google Maps Scraper...");
  console.log(`Searching for ${SEARCH_QUERIES.length} queries in Phitsanulok`);

  const input: ApifyInput = {
    searchStringsArray: SEARCH_QUERIES,
    locationQuery: "Phitsanulok, Thailand",
    maxCrawledPlaces: 100,
    language: "th",
    maxReviews: 10,
    includeReviews: true,
    includeImages: true,
    includeOpeningHours: true,
  };

  // Start the actor run
  const runResponse = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR_ID}/runs?token=${APIFY_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }
  );

  if (!runResponse.ok) {
    throw new Error(`Failed to start actor: ${runResponse.statusText}`);
  }

  const run = await runResponse.json();
  const runId = run.data.id;
  console.log(`Actor run started: ${runId}`);

  // Wait for completion
  let status = "RUNNING";
  while (status === "RUNNING" || status === "READY") {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const statusResponse = await fetch(
      `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`
    );
    const statusData = await statusResponse.json();
    status = statusData.data.status;
    console.log(`Status: ${status}`);
  }

  if (status !== "SUCCEEDED") {
    throw new Error(`Actor run failed with status: ${status}`);
  }

  // Fetch results
  const datasetId = run.data.defaultDatasetId;
  const resultsResponse = await fetch(
    `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}&format=json`
  );
  const results: ApifyPlace[] = await resultsResponse.json();

  console.log(`\nFetched ${results.length} places from Google Maps`);

  // Transform to our format
  const transformed = transformPlaces(results);

  // Write output
  const outputPath = "./src/data/scraped-places.json";
  const fs = await import("fs");
  fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2));
  console.log(`\nSaved ${transformed.length} places to ${outputPath}`);
  console.log(
    "Run the processing script next: npx tsx scripts/process-data.ts"
  );
}

function categorizePlace(place: ApifyPlace): string {
  const name = (place.title + " " + place.categoryName).toLowerCase();
  if (
    name.includes("hotel") ||
    name.includes("โรงแรม") ||
    name.includes("resort") ||
    name.includes("hostel")
  )
    return "hotel";
  if (
    name.includes("cafe") ||
    name.includes("coffee") ||
    name.includes("คาเฟ่") ||
    name.includes("กาแฟ")
  )
    return "cafe";
  if (
    name.includes("clinic") ||
    name.includes("คลินิก") ||
    name.includes("aesthetic") ||
    name.includes("beauty")
  )
    return "clinic";
  if (name.includes("co-working") || name.includes("coworking"))
    return "coworking";
  return "restaurant";
}

function transformPlaces(raw: ApifyPlace[]) {
  return raw.map((place, i) => ({
    id: `place-${i + 1}`,
    name: place.title,
    category: categorizePlace(place),
    subcategory: place.categoryName || "Unknown",
    lat: place.location?.lat || 16.82,
    lng: place.location?.lng || 100.26,
    rating: place.totalScore || 0,
    reviewCount: place.reviewsCount || 0,
    openTime: "08:00",
    closeTime: "22:00",
    hasWebsite: !!place.website,
    hasSocialMedia: false, // Would need separate check
    priceLevel: 2 as 1 | 2 | 3,
    photos: place.imageUrls?.length || 0,
    topReviewKeywords: extractKeywords(place.reviews || []),
    reviews: (place.reviews || []).slice(0, 10).map((r) => ({
      text: r.text || "",
      rating: r.stars || 3,
      date: r.publishedAtDate || new Date().toISOString().split("T")[0],
      language: /[ก-๙]/.test(r.text || "") ? ("th" as const) : ("en" as const),
    })),
    area: "Phitsanulok City",
  }));
}

function extractKeywords(
  reviews: { text: string; stars: number }[]
): string[] {
  const words: Record<string, number> = {};
  const stopWords = new Set([
    "the",
    "is",
    "at",
    "in",
    "a",
    "an",
    "and",
    "or",
    "of",
    "to",
    "for",
    "it",
    "was",
    "ที่",
    "ของ",
    "และ",
    "จะ",
    "ได้",
    "ก็",
    "เป็น",
    "มี",
    "ไม่",
    "กับ",
    "ให้",
  ]);

  for (const review of reviews) {
    if (!review.text) continue;
    const tokens = review.text
      .toLowerCase()
      .split(/[\s,.!?;:]+/)
      .filter((w) => w.length > 2 && !stopWords.has(w));
    for (const token of tokens) {
      words[token] = (words[token] || 0) + 1;
    }
  }

  return Object.entries(words)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);
}

runScraper().catch(console.error);
