/**
 * Process scraped Apify data and merge with sample data
 * to create a complete dataset for the dashboard.
 *
 * Usage: npx tsx scripts/process-data.ts
 */

import * as fs from "fs";
import * as path from "path";

interface Place {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  openTime: string;
  closeTime: string;
  hasWebsite: boolean;
  hasSocialMedia: boolean;
  priceLevel: number;
  photos: number;
  topReviewKeywords: string[];
  reviews: {
    text: string;
    rating: number;
    date: string;
    language: string;
  }[];
  area: string;
}

// Assign area based on coordinates with distribution strategy
function assignArea(lat: number, lng: number, index: number): string {
  // Naresuan University area (south)
  if (lat < 16.76) return "Naresuan University";
  // Train Station area (southeast)
  if (lat < 16.82 && lng > 100.27) return "Train Station";
  // Nan River area (near the river, roughly lng > 100.26 and central lat)
  if (lng > 100.262 && lat >= 16.80 && lat < 16.825) return "Nan River";
  // Topland Plaza area (north-west quadrant)
  if (lat >= 16.825 && lng < 100.258) return "Topland Plaza";

  // For remaining City Center places, distribute some to other areas
  // to make the demo data more interesting
  const areas = [
    "City Center",
    "City Center",
    "Nan River",
    "Topland Plaza",
    "City Center",
    "Naresuan University",
    "City Center",
    "Train Station",
  ];
  return areas[index % areas.length];
}

// Determine if a place likely has social media based on review count and photos
function inferSocialMedia(place: Place): boolean {
  // Businesses with many reviews and photos likely have social media
  if (place.reviewCount > 200 && place.photos > 50) return true;
  if (place.photos > 100) return true;
  // Cafes and clinics usually have social media in Thailand
  if (
    (place.category === "cafe" || place.category === "clinic") &&
    place.reviewCount > 50
  )
    return true;
  return place.hasSocialMedia;
}

function main() {
  const scrapedPath = path.join(__dirname, "../src/data/scraped-places.json");
  const outputPath = path.join(__dirname, "../src/data/places.ts");

  if (!fs.existsSync(scrapedPath)) {
    console.error("No scraped data found. Run the Apify scraper first.");
    process.exit(1);
  }

  const rawScraped: Place[] = JSON.parse(
    fs.readFileSync(scrapedPath, "utf-8")
  );
  console.log(`Loaded ${rawScraped.length} raw scraped places`);

  // Filter out bad data: no rating, no name (address as name), etc.
  const scraped = rawScraped.filter((p) => {
    // Must have a valid rating > 0
    if (!p.rating || p.rating <= 0) {
      console.log(`  Filtered out (no rating): ${p.name}`);
      return false;
    }
    // Filter out places whose name looks like an address
    if (/^\d+\s+ม\.\d+/.test(p.name) || /^\d+\/\d+/.test(p.name)) {
      console.log(`  Filtered out (address name): ${p.name}`);
      return false;
    }
    // Must have at least 1 review
    if (!p.reviewCount || p.reviewCount <= 0) {
      console.log(`  Filtered out (no reviews): ${p.name}`);
      return false;
    }
    // Filter out government offices and non-business places
    const name = p.name.toLowerCase();
    const sub = (p.subcategory || "").toLowerCase();
    if (
      sub.includes("สถานที่ราชการ") ||
      sub.includes("government") ||
      name.includes("สำนักงาน") ||
      name.includes("ที่ดิน")
    ) {
      console.log(`  Filtered out (government): ${p.name}`);
      return false;
    }
    return true;
  });
  console.log(`After filtering: ${scraped.length} valid places`);

  // Enrich scraped data
  const enriched = scraped.map((place, i) => ({
    ...place,
    id: `place-${i + 1}`,
    area: assignArea(place.lat, place.lng, i),
    hasSocialMedia: inferSocialMedia(place),
    priceLevel: place.priceLevel || 2,
  }));

  // Check category distribution
  const catCounts: Record<string, number> = {};
  for (const p of enriched) {
    catCounts[p.category] = (catCounts[p.category] || 0) + 1;
  }
  console.log("\nScraped data category distribution:");
  for (const [cat, count] of Object.entries(catCounts)) {
    console.log(`  ${cat}: ${count}`);
  }

  // Check area distribution
  const areaCounts: Record<string, number> = {};
  for (const p of enriched) {
    areaCounts[p.area] = (areaCounts[p.area] || 0) + 1;
  }
  console.log("\nArea distribution after enrichment:");
  for (const [area, count] of Object.entries(areaCounts)) {
    console.log(`  ${area}: ${count}`);
  }

  // Supplement categories that are underrepresented with sample data
  // We need: hotel, cafe, restaurant, clinic, coworking
  const supplements: Place[] = [];

  if (!catCounts["coworking"] || catCounts["coworking"] < 3) {
    supplements.push(
      {
        id: "sup-cw-1",
        name: "HUB Phitsanulok Co-working",
        category: "coworking",
        subcategory: "co-working space",
        lat: 16.8258,
        lng: 100.26,
        rating: 4.3,
        reviewCount: 156,
        openTime: "08:00",
        closeTime: "22:00",
        hasWebsite: true,
        hasSocialMedia: true,
        priceLevel: 2,
        photos: 89,
        topReviewKeywords: [
          "wifi แรง",
          "ห้องประชุม",
          "meeting room",
          "นั่งทำงานดี",
          "ปลั๊กเยอะ",
        ],
        reviews: [
          {
            text: "co-working ที่ดีที่สุดในพิษณุโลก! wifi แรง ปลั๊กไฟเยอะ มีห้องประชุมให้ใช้ กาแฟฟรี",
            rating: 5,
            date: "2025-12-09",
            language: "th",
          },
          {
            text: "Best coworking space in Phitsanulok. Fast wifi, lots of power outlets, free coffee.",
            rating: 5,
            date: "2025-11-25",
            language: "en",
          },
          {
            text: "ดีมากสำหรับทำงานระยะไกล แต่ช่วงบ่ายคนเยอะ เสียงดังบ้าง",
            rating: 4,
            date: "2025-10-15",
            language: "th",
          },
        ],
        area: "City Center",
      },
      {
        id: "sup-cw-2",
        name: "JEAB Space",
        category: "coworking",
        subcategory: "co-working space",
        lat: 16.7438,
        lng: 100.1935,
        rating: 4.5,
        reviewCount: 198,
        openTime: "07:00",
        closeTime: "23:00",
        hasWebsite: true,
        hasSocialMedia: true,
        priceLevel: 1,
        photos: 123,
        topReviewKeywords: [
          "ราคานักศึกษา",
          "เปิดดึก",
          "wifi ดี",
          "student friendly",
          "นั่งสบาย",
        ],
        reviews: [
          {
            text: "co-working ราคาถูก เปิดถึง 5 ทุ่ม! wifi ดี มีโซนเงียบ เหมาะนักศึกษามาก",
            rating: 5,
            date: "2025-12-06",
            language: "th",
          },
          {
            text: "Great student-friendly coworking near NU. Open late, cheap prices.",
            rating: 5,
            date: "2025-11-18",
            language: "en",
          },
        ],
        area: "Naresuan University",
      },
      {
        id: "sup-cw-3",
        name: "The Desk PLK",
        category: "coworking",
        subcategory: "co-working space",
        lat: 16.822,
        lng: 100.265,
        rating: 4.0,
        reviewCount: 87,
        openTime: "09:00",
        closeTime: "20:00",
        hasWebsite: false,
        hasSocialMedia: true,
        priceLevel: 2,
        photos: 56,
        topReviewKeywords: [
          "วิวน้ำ",
          "สงบ",
          "quiet zone",
          "ริมน้ำ",
          "กาแฟดี",
        ],
        reviews: [
          {
            text: "co-working ริมแม่น้ำน่าน วิวสวย บรรยากาศสงบ เหมาะทำงานที่ต้องการสมาธิ",
            rating: 4,
            date: "2025-11-30",
            language: "th",
          },
          {
            text: "Riverside coworking with a great view. Quiet atmosphere.",
            rating: 4,
            date: "2025-10-22",
            language: "en",
          },
        ],
        area: "Nan River",
      },
      {
        id: "sup-cw-4",
        name: "WorkCafe Connect",
        category: "coworking",
        subcategory: "co-working cafe",
        lat: 16.8172,
        lng: 100.2718,
        rating: 4.2,
        reviewCount: 134,
        openTime: "07:30",
        closeTime: "21:00",
        hasWebsite: true,
        hasSocialMedia: true,
        priceLevel: 2,
        photos: 78,
        topReviewKeywords: [
          "cafe+coworking",
          "กาแฟอร่อย",
          "นั่งทำงาน",
          "power outlets",
          "ใกล้สถานี",
        ],
        reviews: [
          {
            text: "ร้านกาแฟ + co-working ใกล้สถานีรถไฟ กาแฟอร่อย wifi แรง ปลั๊กเยอะ",
            rating: 4,
            date: "2025-12-04",
            language: "th",
          },
          {
            text: "Cafe-coworking hybrid near the train station. Good coffee and reliable wifi.",
            rating: 4,
            date: "2025-11-12",
            language: "en",
          },
        ],
        area: "Train Station",
      },
      {
        id: "sup-cw-5",
        name: "Digital Nomad PLK",
        category: "coworking",
        subcategory: "co-working space",
        lat: 16.8245,
        lng: 100.2588,
        rating: 3.4,
        reviewCount: 56,
        openTime: "09:00",
        closeTime: "19:00",
        hasWebsite: false,
        hasSocialMedia: true,
        priceLevel: 1,
        photos: 23,
        topReviewKeywords: [
          "wifi ช้า",
          "ถูก",
          "เก้าอี้แข็ง",
          "basic",
          "พอใช้ได้",
        ],
        reviews: [
          {
            text: "ราคาถูกมาก แต่ wifi ช้ามาก ไม่เหมาะทำงานที่ต้อง video call เก้าอี้แข็ง",
            rating: 3,
            date: "2025-11-22",
            language: "th",
          },
          {
            text: "Very basic coworking. Cheap but wifi is unreliable.",
            rating: 2,
            date: "2025-10-15",
            language: "en",
          },
        ],
        area: "City Center",
      }
    );
  }

  if (!catCounts["clinic"] || catCounts["clinic"] < 3) {
    supplements.push(
      {
        id: "sup-cl-1",
        name: "Phitsanulok Skin Clinic",
        category: "clinic",
        subcategory: "aesthetic clinic",
        lat: 16.826,
        lng: 100.2595,
        rating: 4.4,
        reviewCount: 234,
        openTime: "10:00",
        closeTime: "20:00",
        hasWebsite: true,
        hasSocialMedia: true,
        priceLevel: 3,
        photos: 98,
        topReviewKeywords: [
          "หมอเก่ง",
          "ผิวสวย",
          "laser",
          "botox",
          "ราคาแพง",
        ],
        reviews: [
          {
            text: "หมอเก่ง ทำเลเซอร์หน้าใส ผิวดีขึ้นเห็นชัด แต่ราคาค่อนข้างแพง",
            rating: 5,
            date: "2025-12-07",
            language: "th",
          },
          {
            text: "Professional aesthetic clinic. Results are visible after just one session.",
            rating: 5,
            date: "2025-11-20",
            language: "en",
          },
        ],
        area: "City Center",
      },
      {
        id: "sup-cl-2",
        name: "Dr. Smile Dental Clinic",
        category: "clinic",
        subcategory: "dental clinic",
        lat: 16.827,
        lng: 100.2585,
        rating: 4.6,
        reviewCount: 267,
        openTime: "09:00",
        closeTime: "18:00",
        hasWebsite: true,
        hasSocialMedia: true,
        priceLevel: 2,
        photos: 45,
        topReviewKeywords: [
          "หมอฟัน",
          "ไม่เจ็บ",
          "painless",
          "สะอาด",
          "ราคาเป็นธรรม",
        ],
        reviews: [
          {
            text: "หมอฟันเก่งมาก ทำฟันไม่เจ็บเลย อุปกรณ์ทันสมัย สะอาดมาก",
            rating: 5,
            date: "2025-12-05",
            language: "th",
          },
          {
            text: "Best dentist in Phitsanulok. Modern equipment. Painless treatment.",
            rating: 5,
            date: "2025-11-22",
            language: "en",
          },
        ],
        area: "City Center",
      },
      {
        id: "sup-cl-3",
        name: "The Face Clinic Phitsanulok",
        category: "clinic",
        subcategory: "aesthetic clinic",
        lat: 16.8248,
        lng: 100.262,
        rating: 3.2,
        reviewCount: 89,
        openTime: "10:00",
        closeTime: "19:00",
        hasWebsite: false,
        hasSocialMedia: true,
        priceLevel: 2,
        photos: 23,
        topReviewKeywords: [
          "ผิดหวัง",
          "hard sell",
          "กดดัน",
          "ผลลัพธ์ไม่ดี",
          "ไม่แนะนำ",
        ],
        reviews: [
          {
            text: "ผิดหวังมาก พนักงาน hard sell มาก กดดันให้ซื้อคอร์ส ผลลัพธ์ไม่เห็นผล",
            rating: 2,
            date: "2025-12-01",
            language: "th",
          },
          {
            text: "Very pushy sales. Results were mediocre.",
            rating: 2,
            date: "2025-11-15",
            language: "en",
          },
        ],
        area: "City Center",
      },
      {
        id: "sup-cl-4",
        name: "Nara Beauty Clinic",
        category: "clinic",
        subcategory: "aesthetic clinic",
        lat: 16.8285,
        lng: 100.255,
        rating: 4.1,
        reviewCount: 178,
        openTime: "10:00",
        closeTime: "19:00",
        hasWebsite: false,
        hasSocialMedia: true,
        priceLevel: 2,
        photos: 67,
        topReviewKeywords: [
          "ฟิลเลอร์",
          "filler",
          "ราคาดี",
          "ปรึกษาฟรี",
          "พนักงานดี",
        ],
        reviews: [
          {
            text: "ทำฟิลเลอร์ที่นี่ ราคาดี พนักงานบริการดี หมอให้คำปรึกษาฟรี",
            rating: 4,
            date: "2025-12-03",
            language: "th",
          },
          {
            text: "Good value for filler treatments. Free consultation.",
            rating: 4,
            date: "2025-11-10",
            language: "en",
          },
        ],
        area: "Topland Plaza",
      },
      {
        id: "sup-cl-5",
        name: "Slim & Shape Center",
        category: "clinic",
        subcategory: "aesthetic clinic",
        lat: 16.8278,
        lng: 100.2545,
        rating: 3.5,
        reviewCount: 112,
        openTime: "10:00",
        closeTime: "20:00",
        hasWebsite: false,
        hasSocialMedia: true,
        priceLevel: 3,
        photos: 28,
        topReviewKeywords: [
          "ลดน้ำหนัก",
          "slimming",
          "แพงมาก",
          "ผลลัพธ์ช้า",
          "coolsculpting",
        ],
        reviews: [
          {
            text: "ทำ coolsculpting แพงมาก ผลลัพธ์ต้องรอ 2-3 เดือน",
            rating: 3,
            date: "2025-11-28",
            language: "th",
          },
          {
            text: "Expensive slimming treatments. Results take months to show.",
            rating: 3,
            date: "2025-10-20",
            language: "en",
          },
        ],
        area: "Topland Plaza",
      }
    );
  }

  // Combine
  const combined = [...enriched, ...supplements];

  // Re-assign IDs
  const final = combined.map((p, i) => ({
    ...p,
    id: `place-${i + 1}`,
  }));

  console.log(`\nFinal dataset: ${final.length} places`);

  // Final category distribution
  const finalCats: Record<string, number> = {};
  for (const p of final) {
    finalCats[p.category] = (finalCats[p.category] || 0) + 1;
  }
  console.log("\nFinal category distribution:");
  for (const [cat, count] of Object.entries(finalCats)) {
    console.log(`  ${cat}: ${count}`);
  }

  // Final area distribution
  const finalAreas: Record<string, number> = {};
  for (const p of final) {
    finalAreas[p.area] = (finalAreas[p.area] || 0) + 1;
  }
  console.log("\nFinal area distribution:");
  for (const [area, count] of Object.entries(finalAreas)) {
    console.log(`  ${area}: ${count}`);
  }

  // Generate TypeScript output
  const tsContent = `// Phitsanulok Province Business Intelligence Dashboard
// Data: Google Maps via Apify (${new Date().toISOString().split("T")[0]}) + supplementary data
// Total: ${final.length} places across ${Object.keys(finalCats).length} categories

export interface Review {
  text: string;
  rating: number;
  date: string;
  language: "th" | "en";
}

export interface Place {
  id: string;
  name: string;
  category: "hotel" | "cafe" | "restaurant" | "clinic" | "coworking";
  subcategory: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  openTime: string;
  closeTime: string;
  hasWebsite: boolean;
  hasSocialMedia: boolean;
  priceLevel: 1 | 2 | 3;
  photos: number;
  topReviewKeywords: string[];
  reviews: Review[];
  area: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const places: Place[] = ${JSON.stringify(final, null, 2)} as any;

export default places;
`;

  fs.writeFileSync(outputPath, tsContent);
  console.log(`\nWritten to ${outputPath}`);
}

main();
