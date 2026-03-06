"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { places, type Place } from "@/data/places";
import { getCategoryLabel, getRatingColor } from "@/lib/utils";
import {
  Star,
  Globe,
  Clock,
  Camera,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

export default function CompetitorsPage() {
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "name">("rating");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterArea, setFilterArea] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const areas = [...new Set(places.map((p) => p.area))];
  const categories = ["all", "hotel", "cafe", "restaurant", "clinic", "coworking"];

  const filtered = places
    .filter((p) => filterCategory === "all" || p.category === filterCategory)
    .filter((p) => filterArea === "all" || p.area === filterArea)
    .filter(
      (p) =>
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const mult = sortDir === "desc" ? -1 : 1;
      if (sortBy === "rating") return (a.rating - b.rating) * mult;
      if (sortBy === "reviews") return (a.reviewCount - b.reviewCount) * mult;
      return a.name.localeCompare(b.name) * mult;
    });

  const toggleSort = (field: "rating" | "reviews" | "name") => {
    if (sortBy === field) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }: { field: string }) =>
    sortBy === field ? (
      sortDir === "desc" ? (
        <ChevronDown className="h-3 w-3" />
      ) : (
        <ChevronUp className="h-3 w-3" />
      )
    ) : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Competitor Benchmarking</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Analyze competitors by rating, reviews, keywords, and digital presence
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search places..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 text-sm border border-[var(--border)] rounded-lg focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Categories" : getCategoryLabel(c)}
                </option>
              ))}
            </select>
            <select
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
              className="px-3 py-2 text-sm border border-[var(--border)] rounded-lg focus:outline-none"
            >
              <option value="all">All Areas</option>
              {areas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <span className="text-sm text-[var(--muted-foreground)]">
              {filtered.length} results
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] bg-gray-50">
                <th className="text-left p-3 text-xs font-medium text-[var(--muted-foreground)]">
                  <button
                    onClick={() => toggleSort("name")}
                    className="flex items-center gap-1 hover:text-[var(--foreground)]"
                  >
                    Place <SortIcon field="name" />
                  </button>
                </th>
                <th className="text-left p-3 text-xs font-medium text-[var(--muted-foreground)]">
                  Category
                </th>
                <th className="text-left p-3 text-xs font-medium text-[var(--muted-foreground)]">
                  Area
                </th>
                <th className="text-center p-3 text-xs font-medium text-[var(--muted-foreground)]">
                  <button
                    onClick={() => toggleSort("rating")}
                    className="flex items-center gap-1 hover:text-[var(--foreground)] mx-auto"
                  >
                    Rating <SortIcon field="rating" />
                  </button>
                </th>
                <th className="text-center p-3 text-xs font-medium text-[var(--muted-foreground)]">
                  <button
                    onClick={() => toggleSort("reviews")}
                    className="flex items-center gap-1 hover:text-[var(--foreground)] mx-auto"
                  >
                    Reviews <SortIcon field="reviews" />
                  </button>
                </th>
                <th className="text-center p-3 text-xs font-medium text-[var(--muted-foreground)]">
                  Hours
                </th>
                <th className="text-center p-3 text-xs font-medium text-[var(--muted-foreground)]">
                  Web
                </th>
                <th className="text-center p-3 text-xs font-medium text-[var(--muted-foreground)]">
                  Social
                </th>
                <th className="text-center p-3 text-xs font-medium text-[var(--muted-foreground)]">
                  Photos
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((place) => (
                <>
                  <tr
                    key={place.id}
                    className="border-b border-[var(--border)] hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() =>
                      setExpandedId(
                        expandedId === place.id ? null : place.id
                      )
                    }
                  >
                    <td className="p-3">
                      <div>
                        <p className="text-sm font-medium">{place.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {place.subcategory}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
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
                    </td>
                    <td className="p-3 text-sm">{place.area}</td>
                    <td className="p-3 text-center">
                      <span
                        className="text-sm font-bold"
                        style={{ color: getRatingColor(place.rating) }}
                      >
                        ★ {place.rating}
                      </span>
                    </td>
                    <td className="p-3 text-center text-sm">
                      {place.reviewCount}
                    </td>
                    <td className="p-3 text-center text-xs">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {place.openTime}-{place.closeTime}
                    </td>
                    <td className="p-3 text-center">
                      {place.hasWebsite ? (
                        <Globe className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-xs text-red-400">None</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {place.hasSocialMedia ? (
                        <span className="text-green-500 text-xs">✓</span>
                      ) : (
                        <span className="text-red-400 text-xs">✗</span>
                      )}
                    </td>
                    <td className="p-3 text-center text-sm">
                      <Camera className="h-3 w-3 inline mr-1" />
                      {place.photos}
                    </td>
                  </tr>
                  {expandedId === place.id && (
                    <tr key={`${place.id}-detail`}>
                      <td colSpan={9} className="p-4 bg-blue-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Top Review Keywords
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {place.topReviewKeywords.map((kw) => (
                                <Badge
                                  key={kw}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {kw}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Latest Reviews
                            </h4>
                            <div className="space-y-2">
                              {place.reviews.slice(0, 3).map((r, i) => (
                                <div
                                  key={i}
                                  className="text-xs bg-white rounded p-2"
                                >
                                  <span className="text-amber-500">
                                    {"★".repeat(r.rating)}
                                    {"☆".repeat(5 - r.rating)}
                                  </span>
                                  <span className="text-[var(--muted-foreground)] ml-2">
                                    {r.date}
                                  </span>
                                  <p className="mt-1">{r.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
