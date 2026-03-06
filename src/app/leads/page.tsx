"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { places, type Place } from "@/data/places";
import { getCategoryLabel, getRatingColor } from "@/lib/utils";
import {
  Target,
  Globe,
  Star,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

function getLeadScore(place: Place): number {
  let score = 0;
  if (place.rating < 4.0) score += 30;
  if (place.rating < 3.5) score += 20;
  if (!place.hasWebsite) score += 25;
  if (!place.hasSocialMedia) score += 15;
  if (place.photos < 10) score += 10;
  return Math.min(score, 100);
}

function getLeadTier(score: number): { label: string; color: string } {
  if (score >= 70) return { label: "Hot Lead", color: "text-red-600" };
  if (score >= 50) return { label: "Warm Lead", color: "text-amber-600" };
  if (score >= 30) return { label: "Potential", color: "text-blue-600" };
  return { label: "Low Priority", color: "text-gray-500" };
}

function getPainPoints(place: Place): string[] {
  const points: string[] = [];
  if (place.rating < 3.5) points.push("Very low rating");
  else if (place.rating < 4.0) points.push("Below average rating");
  if (!place.hasWebsite) points.push("No website");
  if (!place.hasSocialMedia) points.push("No social media presence");
  if (place.photos < 5) points.push("Very few photos");
  else if (place.photos < 10) points.push("Low photo count");
  if (place.reviewCount < 50) points.push("Low review count");

  // Check for negative keywords
  const negativeKws = [
    "dirty", "slow", "expensive", "rude", "noise",
    "สกปรก", "ช้า", "แพง", "หยาบ", "เสียง",
  ];
  const hasNeg = place.topReviewKeywords.some((kw) =>
    negativeKws.some((n) => kw.toLowerCase().includes(n))
  );
  if (hasNeg) points.push("Negative review keywords present");

  return points;
}

function getOutreachMessage(place: Place): string {
  const painPoints = getPainPoints(place);
  if (!place.hasWebsite && !place.hasSocialMedia) {
    return `สวัสดีครับ ผมเห็นว่า ${place.name} มีรีวิวที่ดีหลายอัน แต่ยังไม่มีเว็บไซต์หรือโซเชียลมีเดีย — เราช่วยเพิ่มการเข้าถึงลูกค้าออนไลน์ได้ครับ`;
  }
  if (place.rating < 4.0) {
    return `สวัสดีครับ ผมเห็นว่า ${place.name} มีศักยภาพสูง แต่ rating อยู่ที่ ${place.rating} — เราช่วยปรับปรุงประสบการณ์ลูกค้าเพื่อเพิ่ม rating ได้ครับ`;
  }
  return `สวัสดีครับ ผมสนใจทำงานร่วมกับ ${place.name} ในการพัฒนาการตลาดออนไลน์ครับ`;
}

export default function LeadsPage() {
  const [filterTier, setFilterTier] = useState<string>("all");

  const leads = places
    .map((p) => ({
      ...p,
      leadScore: getLeadScore(p),
      tier: getLeadTier(getLeadScore(p)),
      painPoints: getPainPoints(p),
      outreach: getOutreachMessage(p),
    }))
    .filter((l) => l.leadScore > 0)
    .sort((a, b) => b.leadScore - a.leadScore);

  const filtered =
    filterTier === "all"
      ? leads
      : leads.filter((l) => l.tier.label === filterTier);

  const hotLeads = leads.filter((l) => l.leadScore >= 70).length;
  const warmLeads = leads.filter(
    (l) => l.leadScore >= 50 && l.leadScore < 70
  ).length;
  const noWebsite = leads.filter((l) => !l.hasWebsite).length;
  const noSocial = leads.filter((l) => !l.hasSocialMedia).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Lead Generation (B2B)</h1>
        <p className="text-[var(--muted-foreground)] mt-1">
          Identify businesses with clear pain points for personalized outreach
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{hotLeads}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Hot Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-2xl font-bold">{warmLeads}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Warm Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{noWebsite}</p>
                <p className="text-xs text-[var(--muted-foreground)]">No Website</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{noSocial}</p>
                <p className="text-xs text-[var(--muted-foreground)]">No Social Media</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {["all", "Hot Lead", "Warm Lead", "Potential", "Low Priority"].map(
          (tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(tier)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filterTier === tier
                  ? "bg-[var(--primary)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tier === "all" ? `All (${leads.length})` : tier}
            </button>
          )
        )}
      </div>

      {/* Lead Cards */}
      <div className="space-y-4">
        {filtered.map((lead) => (
          <Card key={lead.id}>
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{lead.name}</h3>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {lead.subcategory} · {lead.area}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-bold"
                          style={{ color: getRatingColor(lead.rating) }}
                        >
                          ★ {lead.rating}
                        </span>
                        <Badge
                          variant={
                            lead.category as
                              | "hotel"
                              | "cafe"
                              | "restaurant"
                              | "clinic"
                              | "coworking"
                          }
                        >
                          {getCategoryLabel(lead.category)}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">
                        {lead.reviewCount} reviews
                      </p>
                    </div>
                  </div>

                  {/* Lead Score Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${lead.tier.color}`}>
                        {lead.tier.label}
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)]">
                        Score: {lead.leadScore}/100
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${lead.leadScore}%`,
                          backgroundColor:
                            lead.leadScore >= 70
                              ? "#ef4444"
                              : lead.leadScore >= 50
                              ? "#f59e0b"
                              : "#3b82f6",
                        }}
                      />
                    </div>
                  </div>

                  {/* Pain Points */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {lead.painPoints.map((pp) => (
                      <span
                        key={pp}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-red-50 text-red-700 rounded-full"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {pp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outreach Suggestion */}
                <div className="lg:w-80 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs font-medium text-blue-900 mb-1">
                    Suggested Outreach Message
                  </p>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    {lead.outreach}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
