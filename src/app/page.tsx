"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { places } from "@/data/places";
import {
  getCategoryStats,
  getAreaStats,
  getTopKeywords,
} from "@/data/stats";
import {
  getCategoryColor,
  getCategoryLabel,
  getRatingColor,
} from "@/lib/utils";
import {
  Building2,
  Star,
  MessageSquare,
  AlertTriangle,
  MapPin,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
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

  const topRated = [...places]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  const worstRated = [...places]
    .sort((a, b) => a.rating - b.rating)
    .slice(0, 5);

  // Prepare pie chart data
  const pieData = categoryStats.map((s) => ({
    name: s.name,
    value: s.count,
    color: getCategoryColor(s.category),
  }));

  // Prepare bar chart data with explicit fill
  const barData = categoryStats.map((s) => ({
    name: s.name,
    avgRating: s.avgRating,
    fill: getCategoryColor(s.category),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#2563eb] p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-50" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-blue-300 text-[12px] font-semibold uppercase tracking-[0.15em] mb-2">
              Dashboard Overview
            </p>
            <h1 className="text-[30px] font-extrabold tracking-tight leading-tight">
              Phitsanulok Business Intelligence
            </h1>
            <p className="text-blue-200/80 mt-2 text-[14px] max-w-lg">
              Market landscape, competitor analysis &amp; social listening
              for {totalPlaces} businesses across Phitsanulok province
            </p>
          </div>
          <div className="text-right hidden md:flex flex-col items-end gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/10">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[13px] font-semibold">Live Data</span>
            </div>
            <p className="text-[11px] text-blue-300/70">
              Google Maps via Apify · March 2026
            </p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Places"
          value={totalPlaces}
          subtitle="Tracked businesses"
          icon={Building2}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Avg Rating"
          value={avgRating}
          subtitle="Across all categories"
          icon={Star}
          iconBg="bg-amber-50"
          iconColor="text-amber-500"
        />
        <StatCard
          title="Total Reviews"
          value={totalReviews.toLocaleString()}
          subtitle="Google Maps reviews"
          icon={MessageSquare}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Low Rating (<4.0)"
          value={lowRatingCount}
          subtitle="Potential B2B leads"
          icon={AlertTriangle}
          iconBg="bg-red-50"
          iconColor="text-red-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[15px] font-semibold">
              Places by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              {/* Donut chart */}
              <div className="w-[160px] h-[160px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={72}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div className="flex-1 space-y-3 py-1">
                {categoryStats.map((stat) => (
                  <div key={stat.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-3 w-3 rounded-sm"
                        style={{ backgroundColor: getCategoryColor(stat.category) }}
                      />
                      <span className="text-[13px] font-medium text-[var(--foreground)]">
                        {stat.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[14px] font-bold tabular-nums">
                        {stat.count}
                      </span>
                      <span className="text-[11px] text-[var(--muted-foreground)] tabular-nums w-[60px] text-right">
                        ★ {stat.avgRating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[15px] font-semibold">
              Average Rating by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} barCategoryGap="25%">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b" }}
                />
                <YAxis
                  domain={[0, 5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b" }}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "12px",
                    padding: "8px 12px",
                  }}
                  formatter={(value: unknown) => [Number(value).toFixed(1), "Rating"]}
                />
                <Bar dataKey="avgRating" radius={[6, 6, 0, 0]} maxBarSize={48}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Area + Keywords Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[15px] font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--muted-foreground)]" />
              Places by Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3.5">
              {areaStats.map((area, i) => {
                const colors = [
                  "#3b82f6",
                  "#8b5cf6",
                  "#f59e0b",
                  "#10b981",
                  "#ec4899",
                ];
                const pct = Math.round((area.count / totalPlaces) * 100);
                return (
                  <div key={area.area}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-medium">
                        {area.area}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold tabular-nums">
                          {area.count}
                        </span>
                        <span className="text-[11px] text-[var(--muted-foreground)] tabular-nums">
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: colors[i % colors.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Positive Keywords */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <CardTitle className="text-[15px] font-semibold">
                Positive Keywords
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {positiveKeywords.slice(0, 12).map((kw) => (
                <span
                  key={kw.keyword}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 text-[11px] font-medium text-emerald-700"
                >
                  {kw.keyword}
                  <span className="text-[10px] text-emerald-500 font-bold">
                    {kw.count}
                  </span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Negative Keywords */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <CardTitle className="text-[15px] font-semibold">
                Negative Keywords
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {negativeKeywords.slice(0, 12).map((kw) => (
                <span
                  key={kw.keyword}
                  className="inline-flex items-center gap-1 rounded-full bg-red-50 border border-red-200/60 px-2.5 py-1 text-[11px] font-medium text-red-700"
                >
                  {kw.keyword}
                  <span className="text-[10px] text-red-400 font-bold">
                    {kw.count}
                  </span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top & Bottom Rated */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              <CardTitle className="text-[15px] font-semibold">
                Top Rated Places
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-100">
              {topRated.map((place, i) => (
                <div
                  key={place.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[12px] font-bold text-emerald-600">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold truncate">
                        {place.name}
                      </p>
                      <p className="text-[11px] text-[var(--muted-foreground)]">
                        {place.area} · {place.reviewCount} reviews
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <Badge
                      variant={
                        place.category as
                          | "hotel"
                          | "cafe"
                          | "restaurant"
                          | "clinic"
                          | "coworking"
                      }
                    >
                      {getCategoryLabel(place.category)}
                    </Badge>
                    <span
                      className="text-[15px] font-bold tabular-nums min-w-[32px] text-right"
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
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <CardTitle className="text-[15px] font-semibold">
                Lowest Rated (B2B Leads)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-100">
              {worstRated.map((place, i) => (
                <div
                  key={place.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[12px] font-bold text-red-600">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold truncate">
                        {place.name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {!place.hasWebsite && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 font-medium border border-red-100">
                            No website
                          </span>
                        )}
                        {!place.hasSocialMedia && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-50 text-orange-500 font-medium border border-orange-100">
                            No social
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <Badge
                      variant={
                        place.category as
                          | "hotel"
                          | "cafe"
                          | "restaurant"
                          | "clinic"
                          | "coworking"
                      }
                    >
                      {getCategoryLabel(place.category)}
                    </Badge>
                    <span
                      className="text-[15px] font-bold tabular-nums min-w-[32px] text-right"
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
