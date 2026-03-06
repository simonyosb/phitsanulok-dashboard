"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { places } from "@/data/places";
import {
  getCategoryStats,
  getAreaStats,
  getTopKeywords,
} from "@/data/stats";
import { getCategoryColor, getCategoryLabel, getRatingColor } from "@/lib/utils";
import {
  Building2,
  Star,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  MapPin,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function OverviewPage() {
  const totalPlaces = places.length;
  const avgRating = (
    places.reduce((sum, p) => sum + p.rating, 0) / totalPlaces
  ).toFixed(1);
  const totalReviews = places.reduce((sum, p) => sum + p.reviewCount, 0);
  const lowRatingCount = places.filter((p) => p.rating < 4.0).length;

  const categoryStats = getCategoryStats();
  const areaStats = getAreaStats();
  const positiveKeywords = getTopKeywords("positive");
  const negativeKeywords = getTopKeywords("negative");

  const topRated = [...places].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const worstRated = [...places].sort((a, b) => a.rating - b.rating).slice(0, 5);

  return (
    <div>
      {/* Hero Header */}
      <div className="gradient-header rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Phitsanulok Business Intelligence</h1>
            <p className="text-blue-100 mt-1">
              Market landscape, competitor analysis, and social listening dashboard
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-blue-200">Data Source: Google Maps</p>
            <p className="text-sm text-blue-200">Updated: March 2026</p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Places"
          value={totalPlaces}
          subtitle="Tracked businesses"
          icon={Building2}
        />
        <StatCard
          title="Avg Rating"
          value={avgRating}
          subtitle="Across all categories"
          icon={Star}
          iconColor="text-amber-500"
        />
        <StatCard
          title="Total Reviews"
          value={totalReviews.toLocaleString()}
          subtitle="Google Maps reviews"
          icon={MessageSquare}
          iconColor="text-green-500"
        />
        <StatCard
          title="Low Rating (<4.0)"
          value={lowRatingCount}
          subtitle="Potential B2B leads"
          icon={AlertTriangle}
          iconColor="text-red-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Places by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  label={(props: any) => `${props.name} (${props.value})`}
                >
                  {categoryStats.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={getCategoryColor(entry.category)}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Average Rating by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis domain={[0, 5]} fontSize={12} />
                <Tooltip />
                <Bar dataKey="avgRating" radius={[6, 6, 0, 0]}>
                  {categoryStats.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={getCategoryColor(entry.category)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Area Distribution + Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Area Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Places by Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {areaStats.map((area) => (
                <div key={area.area} className="flex items-center justify-between">
                  <span className="text-sm">{area.area}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--primary)]"
                        style={{
                          width: `${(area.count / totalPlaces) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-6 text-right">
                      {area.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Positive Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Top Positive Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {positiveKeywords.slice(0, 12).map((kw) => (
                <Badge key={kw.keyword} variant="secondary" className="bg-green-50 text-green-700">
                  {kw.keyword} ({kw.count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Negative Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">Top Negative Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {negativeKeywords.slice(0, 12).map((kw) => (
                <Badge key={kw.keyword} variant="secondary" className="bg-red-50 text-red-700">
                  {kw.keyword} ({kw.count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top & Bottom Rated */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Top Rated Places</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topRated.map((place, i) => (
                <div
                  key={place.id}
                  className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[var(--muted-foreground)] w-5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{place.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {place.area}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={place.category as "hotel" | "cafe" | "restaurant" | "clinic" | "coworking"}>
                      {getCategoryLabel(place.category)}
                    </Badge>
                    <span
                      className="text-sm font-bold"
                      style={{ color: getRatingColor(place.rating) }}
                    >
                      {place.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">
              Lowest Rated (B2B Opportunities)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {worstRated.map((place, i) => (
                <div
                  key={place.id}
                  className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[var(--muted-foreground)] w-5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{place.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {!place.hasWebsite && (
                          <span className="text-xs text-red-500">No website</span>
                        )}
                        {!place.hasSocialMedia && (
                          <span className="text-xs text-red-500">No social</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={place.category as "hotel" | "cafe" | "restaurant" | "clinic" | "coworking"}>
                      {getCategoryLabel(place.category)}
                    </Badge>
                    <span
                      className="text-sm font-bold"
                      style={{ color: getRatingColor(place.rating) }}
                    >
                      {place.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
