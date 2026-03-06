// Phitsanulok Province BI Dashboard - Statistics & Helper Functions
import { places, type Place, type Review } from "./places";

// ============================================================
// CATEGORY DISTRIBUTION
// ============================================================

export interface CategoryStat {
  category: Place["category"];
  count: number;
  percentage: number;
}

export function getCategoryDistribution(): CategoryStat[] {
  const total = places.length;
  const counts: Record<string, number> = {};

  for (const place of places) {
    counts[place.category] = (counts[place.category] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([category, count]) => ({
      category: category as Place["category"],
      count,
      percentage: Math.round((count / total) * 1000) / 10,
    }))
    .sort((a, b) => b.count - a.count);
}

// ============================================================
// AVERAGE RATING BY CATEGORY
// ============================================================

export interface CategoryRating {
  category: Place["category"];
  averageRating: number;
  totalReviews: number;
  placesCount: number;
}

export function getAverageRatingByCategory(): CategoryRating[] {
  const grouped: Record<string, { ratings: number[]; reviews: number; count: number }> = {};

  for (const place of places) {
    if (!grouped[place.category]) {
      grouped[place.category] = { ratings: [], reviews: 0, count: 0 };
    }
    grouped[place.category].ratings.push(place.rating);
    grouped[place.category].reviews += place.reviewCount;
    grouped[place.category].count += 1;
  }

  return Object.entries(grouped)
    .map(([category, data]) => ({
      category: category as Place["category"],
      averageRating:
        Math.round(
          (data.ratings.reduce((sum, r) => sum + r, 0) / data.ratings.length) * 100
        ) / 100,
      totalReviews: data.reviews,
      placesCount: data.count,
    }))
    .sort((a, b) => b.averageRating - a.averageRating);
}

// ============================================================
// AREA DISTRIBUTION
// ============================================================

export interface AreaStat {
  area: string;
  count: number;
  categories: Record<string, number>;
  averageRating: number;
}

export function getAreaDistribution(): AreaStat[] {
  const grouped: Record<string, { places: Place[] }> = {};

  for (const place of places) {
    if (!grouped[place.area]) {
      grouped[place.area] = { places: [] };
    }
    grouped[place.area].places.push(place);
  }

  return Object.entries(grouped)
    .map(([area, data]) => {
      const categories: Record<string, number> = {};
      for (const p of data.places) {
        categories[p.category] = (categories[p.category] || 0) + 1;
      }

      return {
        area,
        count: data.places.length,
        categories,
        averageRating:
          Math.round(
            (data.places.reduce((sum, p) => sum + p.rating, 0) / data.places.length) *
              100
          ) / 100,
      };
    })
    .sort((a, b) => b.count - a.count);
}

// ============================================================
// KEYWORD ANALYSIS
// ============================================================

export interface KeywordStat {
  keyword: string;
  count: number;
  type: "positive" | "negative" | "neutral";
}

const POSITIVE_KEYWORDS = [
  "อร่อย", "สะอาด", "ดี", "สวย", "เก่ง", "friendly", "best", "excellent",
  "amazing", "must visit", "must try", "อร่อยมาก", "ประทับใจ", "คุ้มค่า",
  "บรรยากาศดี", "วิวดี", "วิวสวย", "กาแฟดี", "หมอเก่ง", "สะดวก",
  "painless", "ไม่เจ็บ", "อาหารเช้าดี", "wifi ดี", "wifi แรง",
  "ราคาดี", "คุ้ม", "beautiful", "stunning", "outstanding", "delicious",
  "fresh", "professional", "latte art", "Instagrammable", "aesthetic",
  "romantic", "heritage", "specialty coffee", "river view", "วิวแม่น้ำน่าน",
  "ของดีพิษณุโลก", "นั่งสบาย", "เปิดเช้า", "ปลั๊กเยอะ", "กาแฟฟรี",
  "ถ่ายรูปสวย", "homemade cake", "pour over", "single origin",
];

const NEGATIVE_KEYWORDS = [
  "แพง", "เก่า", "สกปรก", "ช้า", "เสียงดัง", "ร้อน", "เล็ก",
  "ผิดหวัง", "ธรรมดา", "ไม่แนะนำ", "overpriced", "old", "noisy",
  "basic", "nothing special", "hard sell", "กดดัน", "ยุงเยอะ",
  "wifi ช้า", "เก้าอี้แข็ง", "แอร์ไม่เย็น", "ผลลัพธ์ไม่ดี",
  "ต้องปรับปรุง", "needs renovation", "mediocre", "overrated",
  "คิวยาว", "รอนาน", "คนเยอะ", "หาที่นั่งยาก", "ปิดเร็ว",
  "เก่ามาก", "ไม่สะดวก", "ไม่มีเว็บไซต์", "ราคาแพง", "แพงมาก",
  "เนื้อบาง", "ไม่ค่อยอร่อย", "จืด", "ผักไม่สด",
];

export function getTopKeywords(
  type: "positive" | "negative"
): KeywordStat[] {
  const keywordList = type === "positive" ? POSITIVE_KEYWORDS : NEGATIVE_KEYWORDS;
  const keywordCounts: Record<string, number> = {};

  for (const place of places) {
    // Count from topReviewKeywords
    for (const kw of place.topReviewKeywords) {
      const kwLower = kw.toLowerCase();
      for (const target of keywordList) {
        if (kwLower.includes(target.toLowerCase()) || target.toLowerCase().includes(kwLower)) {
          keywordCounts[target] = (keywordCounts[target] || 0) + 1;
        }
      }
    }

    // Count from actual review text
    for (const review of place.reviews) {
      const textLower = review.text.toLowerCase();
      for (const target of keywordList) {
        if (textLower.includes(target.toLowerCase())) {
          keywordCounts[target] = (keywordCounts[target] || 0) + 1;
        }
      }
    }
  }

  return Object.entries(keywordCounts)
    .map(([keyword, count]) => ({
      keyword,
      count,
      type,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get all places in a specific category.
 */
export function getPlacesByCategory(category: Place["category"]): Place[] {
  return places.filter((p) => p.category === category);
}

/**
 * Get all places in a specific area/district.
 */
export function getPlacesByArea(area: string): Place[] {
  return places.filter((p) => p.area.toLowerCase() === area.toLowerCase());
}

/**
 * Get places below a given rating threshold -- useful for identifying B2B leads
 * that may need digital marketing or reputation management services.
 */
export function getLowRatingPlaces(threshold: number = 4.0): Place[] {
  return places
    .filter((p) => p.rating < threshold)
    .sort((a, b) => a.rating - b.rating);
}

/**
 * Get places that do not have a website -- useful for identifying
 * businesses that could benefit from web development services.
 */
export function getPlacesWithoutWebsite(): Place[] {
  return places.filter((p) => !p.hasWebsite);
}

/**
 * Get places that have no social media presence -- useful for identifying
 * businesses that could benefit from social media marketing.
 */
export function getPlacesWithoutSocialMedia(): Place[] {
  return places.filter((p) => !p.hasSocialMedia);
}

/**
 * Get places that lack both a website AND social media -- highest priority leads.
 */
export function getPlacesWithNoOnlinePresence(): Place[] {
  return places.filter((p) => !p.hasWebsite && !p.hasSocialMedia);
}

/**
 * Get the overall summary stats for the dashboard header.
 */
export interface DashboardSummary {
  totalPlaces: number;
  averageRating: number;
  totalReviews: number;
  placesWithoutWebsite: number;
  placesWithoutSocialMedia: number;
  placesWithNoOnlinePresence: number;
  lowRatingPlaces: number;
  highRatingPlaces: number;
  categoryBreakdown: CategoryStat[];
  areaBreakdown: AreaStat[];
}

export function getDashboardSummary(): DashboardSummary {
  const totalPlaces = places.length;
  const totalReviews = places.reduce((sum, p) => sum + p.reviewCount, 0);
  const averageRating =
    Math.round(
      (places.reduce((sum, p) => sum + p.rating, 0) / totalPlaces) * 100
    ) / 100;

  return {
    totalPlaces,
    averageRating,
    totalReviews,
    placesWithoutWebsite: getPlacesWithoutWebsite().length,
    placesWithoutSocialMedia: getPlacesWithoutSocialMedia().length,
    placesWithNoOnlinePresence: getPlacesWithNoOnlinePresence().length,
    lowRatingPlaces: getLowRatingPlaces(4.0).length,
    highRatingPlaces: places.filter((p) => p.rating >= 4.5).length,
    categoryBreakdown: getCategoryDistribution(),
    areaBreakdown: getAreaDistribution(),
  };
}

/**
 * Get price level distribution across all places.
 */
export interface PriceLevelStat {
  priceLevel: 1 | 2 | 3;
  label: string;
  count: number;
  percentage: number;
}

export function getPriceLevelDistribution(): PriceLevelStat[] {
  const total = places.length;
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0 };

  for (const place of places) {
    counts[place.priceLevel] += 1;
  }

  const labels: Record<number, string> = { 1: "$", 2: "$$", 3: "$$$" };

  return [1, 2, 3].map((level) => ({
    priceLevel: level as 1 | 2 | 3,
    label: labels[level],
    count: counts[level],
    percentage: Math.round((counts[level] / total) * 1000) / 10,
  }));
}

/**
 * Get review language distribution (Thai vs English).
 */
export interface LanguageStat {
  language: "th" | "en";
  count: number;
  percentage: number;
}

export function getReviewLanguageDistribution(): LanguageStat[] {
  let thCount = 0;
  let enCount = 0;

  for (const place of places) {
    for (const review of place.reviews) {
      if (review.language === "th") thCount++;
      else enCount++;
    }
  }

  const total = thCount + enCount;
  return [
    {
      language: "th",
      count: thCount,
      percentage: Math.round((thCount / total) * 1000) / 10,
    },
    {
      language: "en",
      count: enCount,
      percentage: Math.round((enCount / total) * 1000) / 10,
    },
  ];
}

// ============================================================
// PRE-COMPUTED STATS (for quick dashboard rendering)
// ============================================================

export const precomputedStats = {
  categoryDistribution: getCategoryDistribution(),
  averageRatingByCategory: getAverageRatingByCategory(),
  areaDistribution: getAreaDistribution(),
  topPositiveKeywords: getTopKeywords("positive"),
  topNegativeKeywords: getTopKeywords("negative"),
  priceLevelDistribution: getPriceLevelDistribution(),
  reviewLanguageDistribution: getReviewLanguageDistribution(),
  dashboardSummary: getDashboardSummary(),
};

export default precomputedStats;

// ============================================================
// BRIDGE FUNCTIONS (used by dashboard pages)
// ============================================================

export function getCategoryStats() {
  const grouped: Record<
    string,
    { count: number; totalRating: number; totalReviews: number; websiteCount: number }
  > = {};

  for (const place of places) {
    if (!grouped[place.category]) {
      grouped[place.category] = { count: 0, totalRating: 0, totalReviews: 0, websiteCount: 0 };
    }
    grouped[place.category].count += 1;
    grouped[place.category].totalRating += place.rating;
    grouped[place.category].totalReviews += place.reviewCount;
    if (place.hasWebsite) grouped[place.category].websiteCount += 1;
  }

  const categoryNames: Record<string, string> = {
    hotel: "Hotels",
    cafe: "Cafes",
    restaurant: "Restaurants",
    clinic: "Clinics",
    coworking: "Co-working",
  };

  return Object.entries(grouped).map(([category, data]) => ({
    category,
    name: categoryNames[category] || category,
    count: data.count,
    avgRating: +(data.totalRating / data.count).toFixed(1),
    avgReviews: Math.round(data.totalReviews / data.count),
    websiteRate: +(data.websiteCount / data.count).toFixed(2),
  }));
}

export function getAreaStats() {
  const grouped: Record<string, number> = {};
  for (const place of places) {
    grouped[place.area] = (grouped[place.area] || 0) + 1;
  }
  return Object.entries(grouped)
    .map(([area, count]) => ({ area, count }))
    .sort((a, b) => b.count - a.count);
}
