"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { places } from "@/data/places";
import { getCategoryStats, getAreaStats } from "@/data/stats";
import { getCategoryColor, getCategoryLabel } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
} from "recharts";

export default function MarketPage() {
  const categoryStats = getCategoryStats();
  const areaStats = getAreaStats();

  // Saturation analysis: places per area per category
  const saturationData = areaStats.map((area) => {
    const areaPlaces = places.filter((p) => p.area === area.area);
    return {
      area: area.area,
      hotel: areaPlaces.filter((p) => p.category === "hotel").length,
      cafe: areaPlaces.filter((p) => p.category === "cafe").length,
      restaurant: areaPlaces.filter((p) => p.category === "restaurant").length,
      clinic: areaPlaces.filter((p) => p.category === "clinic").length,
      coworking: areaPlaces.filter((p) => p.category === "coworking").length,
      total: areaPlaces.length,
    };
  });

  // Rating distribution
  const ratingBuckets = [
    { range: "< 3.0", count: places.filter((p) => p.rating < 3.0).length },
    {
      range: "3.0 - 3.4",
      count: places.filter((p) => p.rating >= 3.0 && p.rating < 3.5).length,
    },
    {
      range: "3.5 - 3.9",
      count: places.filter((p) => p.rating >= 3.5 && p.rating < 4.0).length,
    },
    {
      range: "4.0 - 4.4",
      count: places.filter((p) => p.rating >= 4.0 && p.rating < 4.5).length,
    },
    {
      range: "4.5 - 5.0",
      count: places.filter((p) => p.rating >= 4.5).length,
    },
  ];

  // Scatter: rating vs review count
  const scatterData = places.map((p) => ({
    name: p.name,
    rating: p.rating,
    reviews: p.reviewCount,
    category: p.category,
  }));

  // Radar chart data
  const radarData = categoryStats.map((c) => ({
    category: getCategoryLabel(c.category),
    avgRating: c.avgRating,
    avgReviews: c.avgReviews / 100,
    count: c.count,
    websiteRate: c.websiteRate * 5,
  }));

  // Price level analysis
  const priceLevels = [1, 2, 3].map((level) => ({
    level: "$".repeat(level),
    count: places.filter((p) => p.priceLevel === level).length,
    avgRating: +(
      places
        .filter((p) => p.priceLevel === level)
        .reduce((sum, p) => sum + p.rating, 0) /
      places.filter((p) => p.priceLevel === level).length
    ).toFixed(1),
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Market Analysis</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Market landscape mapping and saturation assessment
        </p>
      </div>

      {/* Top Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {categoryStats.map((stat) => (
          <Card key={stat.category}>
            <CardContent className="p-4 text-center">
              <div
                className="w-3 h-3 rounded-full mx-auto mb-2"
                style={{ backgroundColor: getCategoryColor(stat.category) }}
              />
              <p className="text-2xl font-bold">{stat.count}</p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {getCategoryLabel(stat.category)}
              </p>
              <p className="text-sm font-medium mt-1">
                Avg ★ {stat.avgRating.toFixed(1)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Area Saturation */}
        <Card>
          <CardHeader>
            <CardTitle>Market Saturation by Area</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={saturationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="area" fontSize={11} angle={-20} textAnchor="end" height={60} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="hotel" stackId="a" fill={getCategoryColor("hotel")} name="Hotels" />
                <Bar dataKey="cafe" stackId="a" fill={getCategoryColor("cafe")} name="Cafes" />
                <Bar
                  dataKey="restaurant"
                  stackId="a"
                  fill={getCategoryColor("restaurant")}
                  name="Restaurants"
                />
                <Bar dataKey="clinic" stackId="a" fill={getCategoryColor("clinic")} name="Clinics" />
                <Bar
                  dataKey="coworking"
                  stackId="a"
                  fill={getCategoryColor("coworking")}
                  name="Co-working"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingBuckets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="range" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {ratingBuckets.map((entry, i) => (
                    <Cell
                      key={entry.range}
                      fill={
                        i <= 1
                          ? "#ef4444"
                          : i === 2
                          ? "#f59e0b"
                          : "#22c55e"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Rating vs Reviews Scatter */}
        <Card>
          <CardHeader>
            <CardTitle>Rating vs Review Count</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="rating" name="Rating" domain={[2, 5]} fontSize={12} />
                <YAxis dataKey="reviews" name="Reviews" fontSize={12} />
                <ZAxis range={[40, 200]} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                {["hotel", "cafe", "restaurant", "clinic", "coworking"].map(
                  (cat) => (
                    <Scatter
                      key={cat}
                      name={getCategoryLabel(cat)}
                      data={scatterData.filter((d) => d.category === cat)}
                      fill={getCategoryColor(cat)}
                    />
                  )
                )}
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Price Level Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Price Level Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceLevels}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="level" fontSize={14} />
                <YAxis yAxisId="left" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 5]} fontSize={12} />
                <Tooltip />
                <Bar yAxisId="left" dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Count" />
                <Bar yAxisId="right" dataKey="avgRating" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Avg Rating" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Gaps / Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Market Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {areaStats.map((area) => {
              const areaPlaces = places.filter((p) => p.area === area.area);
              const avgRating = +(
                areaPlaces.reduce((s, p) => s + p.rating, 0) / areaPlaces.length
              ).toFixed(1);
              const lowRated = areaPlaces.filter((p) => p.rating < 4.0).length;
              const noWebsite = areaPlaces.filter((p) => !p.hasWebsite).length;

              return (
                <div
                  key={area.area}
                  className="p-4 rounded-lg border border-[var(--border)]"
                >
                  <h4 className="font-medium text-sm">{area.area}</h4>
                  <p className="text-xs text-[var(--muted-foreground)] mb-3">
                    {area.count} places · Avg ★ {avgRating}
                  </p>
                  <div className="space-y-1">
                    {lowRated > 0 && (
                      <Badge variant="destructive" className="text-xs mr-1">
                        {lowRated} low-rated
                      </Badge>
                    )}
                    {noWebsite > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {noWebsite} no website
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
