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
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] p-7 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-[13px] font-medium uppercase tracking-wider mb-1">Dashboard</p>
            <h1 className="text-[28px] font-bold tracking-tight">Phitsanulok Business Intelligence</h1>
            <p className="text-blue-200 mt-1 text-[15px]">
              Market landscape, competitor analysis &amp; social listening
            </p>
          </div>
          <div className="text-right hidden md:block space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[13px] font-medium">Live Data</span>
            </div>
            <p className="text-[12px] text-blue-300 mt-2">Google Maps via Apify · Mar 2026</p>
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
          iconColor="text-amber-600"
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
          title="Low Rating (&lt;4.0)"
          value={lowRatingCount}
          subtitle="Potential B2B leads"
          icon={AlertTriangle}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution - Custom visual */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[15px]">Places by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((stat) => (
                <div key={stat.category}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: getCategoryColor(stat.category) }}
                      />
                      <span className="text-[13px] font-medium">{stat.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-bold">{stat.count}</span>
                      <span className="text-[11px] text-[var(--muted-foreground)]">
                        Avg ★ {stat.avgRating}
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(stat.count / totalPlaces) * 100}%`,
                        backgroundColor: getCategoryColor(stat.category),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rating by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[15px]">Average Rating by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={categoryStats} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 5]} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="avgRating" radius={[8, 8, 0, 0]} barSize={40}>
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

      {/* Area + Keywords Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[15px] flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[var(--muted-foreground)]" />
              Places by Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {areaStats.map((area, i) => {
                const colors = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ec4899"];
                return (
                  <div key={area.area}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[13px] font-medium">{area.area}</span>
                      <span className="text-[13px] font-bold">{area.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(area.count / totalPlaces) * 100}%`,
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
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <CardTitle className="text-[15px]">Positive Keywords</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {positiveKeywords.slice(0, 12).map((kw) => (
                <span
                  key={kw.keyword}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[12px] font-medium text-emerald-700"
                >
                  {kw.keyword}
                  <span className="text-emerald-500">{kw.count}</span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Negative Keywords */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <CardTitle className="text-[15px]">Negative Keywords</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {negativeKeywords.slice(0, 12).map((kw) => (
                <span
                  key={kw.keyword}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 border border-red-100 px-2.5 py-1 text-[12px] font-medium text-red-700"
                >
                  {kw.keyword}
                  <span className="text-red-400">{kw.count}</span>
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
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <CardTitle className="text-[15px]">Top Rated Places</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {topRated.map((place, i) => (
                <div
                  key={place.id}
                  className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-[12px] font-bold text-emerald-600">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold">{place.name}</p>
                      <p className="text-[11px] text-[var(--muted-foreground)]">{place.area}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={place.category as "hotel" | "cafe" | "restaurant" | "clinic" | "coworking"}>
                      {getCategoryLabel(place.category)}
                    </Badge>
                    <span
                      className="text-[14px] font-bold min-w-[32px] text-right"
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
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <CardTitle className="text-[15px]">Lowest Rated (B2B Leads)</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {worstRated.map((place, i) => (
                <div
                  key={place.id}
                  className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-[12px] font-bold text-red-600">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold">{place.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {!place.hasWebsite && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-50 text-red-500 font-medium">No website</span>
                        )}
                        {!place.hasSocialMedia && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-50 text-red-500 font-medium">No social</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={place.category as "hotel" | "cafe" | "restaurant" | "clinic" | "coworking"}>
                      {getCategoryLabel(place.category)}
                    </Badge>
                    <span
                      className="text-[14px] font-bold min-w-[32px] text-right"
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
