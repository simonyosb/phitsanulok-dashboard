"use client";

import { useState, useEffect } from "react";
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Phitsanulok BI</h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 rounded-lg border border-orange-200 text-[#f97316] text-sm font-medium hover:bg-orange-50 transition-colors cursor-pointer whitespace-nowrap">
            <TrendingUp className="h-4 w-4" />
            Edit Dashboard
          </div>
          <div className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm shadow-sm whitespace-nowrap">
            <span className="font-medium text-slate-700">March 2026</span>
          </div>
        </div>
      </header>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Avg Rating"
          value={avgRating}
          subtitle="Overall Score"
          icon={Star}
          change={{ value: "4.2★", positive: true }}
        />
        <StatCard
          title="Total Reviews"
          value={`+${totalReviews.toLocaleString()}`}
          subtitle="Response Rate"
          icon={MessageSquare}
          change={{ value: "12%", positive: true }}
        />
        <StatCard
          title="High Ratings"
          value={`${totalPlaces - lowRatingCount}`}
          subtitle="Target Completion"
          icon={Star}
          change={{ value: `${lowRatingCount} low`, positive: false }}
        />
      </div>

      {/* Charts + Categories Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Rating by Category Chart */}
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle>Rating Trends by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {mounted && (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData} barCategoryGap="25%">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0,0,0,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#94a3b8" }}
                  />
                  <YAxis
                    domain={[0, 5]}
                    ticks={[0, 1, 2, 3, 4, 5]}
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#94a3b8" }}
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
            )}
          </CardContent>
        </Card>

        {/* Category Donut */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-6">
              {/* Donut chart */}
              <div className="shrink-0">
                {mounted && (
                  <PieChart width={180} height={180}>
                    <Pie
                      data={pieData}
                      cx={90}
                      cy={90}
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                )}
              </div>
              {/* Legend */}
              <div className="w-full space-y-2.5">
                {categoryStats.map((stat) => {
                  const pct = Math.round((stat.count / totalPlaces) * 100);
                  return (
                    <div key={stat.category} className="flex items-center gap-2 text-sm">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: getCategoryColor(stat.category) }}
                      />
                      <span className="font-medium text-slate-700">{pct}%</span>
                      <span className="text-slate-500 truncate">{stat.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Area Distribution + Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {areaStats.map((area, i) => {
                const colors = ["#f97316", "#8b5cf6", "#c4b5fd", "#fb923c", "#a78bfa"];
                return (
                  <div key={area.area} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colors[i % colors.length] }}
                      />
                      <span className="font-medium text-slate-700">{area.area}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-600">{area.count}</span>
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-[#8b5cf6] text-xs font-semibold w-12 text-center">
                        {Math.round((area.count / totalPlaces) * 100)}%
                      </span>
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
              <TrendingUp className="h-4 w-4 text-green-500" />
              <CardTitle>Positive Keywords</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              {positiveKeywords.slice(0, 12).map((kw) => (
                <span
                  key={kw.keyword}
                  className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-200/60 px-3 py-1 text-xs font-medium text-orange-700 whitespace-nowrap"
                >
                  {kw.keyword}
                  <span className="text-[10px] text-orange-500 font-bold bg-white px-1.5 py-0.5 rounded-full">
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
              <CardTitle>Negative Keywords</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              {negativeKeywords.slice(0, 12).map((kw) => (
                <span
                  key={kw.keyword}
                  className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 border border-violet-200/60 px-3 py-1 text-xs font-medium text-violet-700 whitespace-nowrap"
                >
                  {kw.keyword}
                  <span className="text-[10px] text-violet-500 font-bold bg-white px-1.5 py-0.5 rounded-full">
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
              <Star className="h-4 w-4 text-orange-500" />
              <CardTitle>Top Rated Places</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100">
              {topRated.map((place, i) => (
                <div
                  key={place.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[12px] font-bold text-orange-600">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold truncate">
                        {place.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
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
              <CardTitle>Lowest Rated (B2B Leads)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100">
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
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-50 text-violet-500 font-medium border border-violet-100">
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
