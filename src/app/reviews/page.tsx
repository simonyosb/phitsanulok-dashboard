"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { places } from "@/data/places";
import { getTopKeywords } from "@/data/stats";
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

export default function ReviewsPage() {
  const positiveKeywords = getTopKeywords("positive");
  const negativeKeywords = getTopKeywords("negative");

  // All reviews flattened
  const allReviews = places.flatMap((p) =>
    p.reviews.map((r) => ({ ...r, placeName: p.name, category: p.category }))
  );

  const positiveReviews = allReviews
    .filter((r) => r.rating >= 4)
    .sort((a, b) => b.rating - a.rating);
  const negativeReviews = allReviews
    .filter((r) => r.rating <= 3)
    .sort((a, b) => a.rating - b.rating);

  // Language distribution
  const thaiReviews = allReviews.filter((r) => r.language === "th").length;
  const enReviews = allReviews.filter((r) => r.language === "en").length;

  // Rating distribution of reviews
  const reviewRatingDist = [1, 2, 3, 4, 5].map((r) => ({
    rating: `${r} ★`,
    count: allReviews.filter((rev) => rev.rating === r).length,
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Review Insights</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Review mining — extract actionable insights from customer reviews
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{allReviews.length}</p>
            <p className="text-xs text-[var(--muted-foreground)]">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {positiveReviews.length}
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">Positive (4-5★)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {negativeReviews.length}
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">Negative (1-3★)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">
              {thaiReviews}/{enReviews}
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">Thai / English</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Review Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Review Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={reviewRatingDist}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="rating" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {reviewRatingDist.map((entry, i) => (
                    <Cell
                      key={entry.rating}
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

        {/* Keyword Frequency */}
        <Card>
          <CardHeader>
            <CardTitle>Top Positive Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={positiveKeywords.slice(0, 10)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" fontSize={12} />
                <YAxis
                  dataKey="keyword"
                  type="category"
                  fontSize={11}
                  width={100}
                />
                <Tooltip />
                <Bar dataKey="count" fill="#22c55e" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Negative Keywords Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-red-700">
            Top Negative Keywords (Pain Points)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={negativeKeywords.slice(0, 10)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" fontSize={12} />
              <YAxis
                dataKey="keyword"
                type="category"
                fontSize={11}
                width={120}
              />
              <Tooltip />
              <Bar dataKey="count" fill="#ef4444" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Content Strategy Suggestions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Content Strategy Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-green-700 mb-3">
                Words customers use (use in marketing)
              </h4>
              <div className="flex flex-wrap gap-2">
                {positiveKeywords.slice(0, 15).map((kw) => (
                  <div
                    key={kw.keyword}
                    className="px-3 py-1.5 rounded-lg bg-green-50 border border-green-200"
                  >
                    <span className="text-sm font-medium text-green-800">
                      {kw.keyword}
                    </span>
                    <span className="text-xs text-green-600 ml-1">
                      ×{kw.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-red-700 mb-3">
                Common complaints (opportunities to fix)
              </h4>
              <div className="flex flex-wrap gap-2">
                {negativeKeywords.slice(0, 15).map((kw) => (
                  <div
                    key={kw.keyword}
                    className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200"
                  >
                    <span className="text-sm font-medium text-red-800">
                      {kw.keyword}
                    </span>
                    <span className="text-xs text-red-600 ml-1">
                      ×{kw.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Best Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {positiveReviews.slice(0, 8).map((r, i) => (
                <div key={i} className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{r.placeName}</span>
                    <span className="text-xs text-amber-500">
                      {"★".repeat(r.rating)}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">Worst Reviews (Pain Points)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {negativeReviews.slice(0, 8).map((r, i) => (
                <div key={i} className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{r.placeName}</span>
                    <span className="text-xs text-amber-500">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
